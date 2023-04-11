---
title: Link Failure on AIX
date: 2019-11-15
description:
tags: [aix, link, tips, lib, c++, constructor]
nav: link C++ archieves on AIX
summary: AIX linker calls all static constructors in archieves ignoring whether that module is imported or not, which leads to unused modules are forced to be pulled into the target application. This is a different behavior from other compilers.
---

## The Problem

An archieve (static library) is a collection of object files.
An application pulls required modules (object files) from one or more archieves at link time.
That common practice works perfectly fine for me on different platforms
(linux, osx, solaris, aix, hpux, and .etc) for years,
until recently I got a link failure surprisingly on AIX with the latest xlC compiler.

The linker complains that some symbols are missing,
and those symbols are dependencies from modules (.o files)
that are not used by the target application.
It _looks like_ the whole archieve is pulled instead of just modules required,
but the problem does not **always** happen.

Further investigation shows that all unexpected pulls happen
if the module contains static C++ constructor(s).
Here are files that demonstrates the problem. I'll build and run on linux and AIX for comparing.

Makefile
```makefile
# Makefile
os := $(shell uname -s)

ifneq (,$(findstring AIX,$(os)))
  CC      := xlc
  CXX     := xlC
  LD      := xlC
  CFLAGS  := -I.
  LDFLAGS := -L.
  ARFLAGS := -rv
  AR      := ar
else
  CC      := gcc
  CXX     := g++
  LD      := g++
  CFLAGS  := -I.
  LDFLAGS := -L.
  ARFLAGS := rv
  AR      := ar
endif

OBJ := main.o foo.o bar.o nouse.o nouse_ctor.o
APP := app1 app2 app3
.PHONY: all clean

all: libs | apps

clean: ; rm -rf *.o *.a $(APP)

apps: $(APP)
app1: main.o libmya.a; $(LD) -o $@ $(LDFLAGS) $< -lmya
app2: main.o libmyb.a; $(LD) -o $@ $(LDFLAGS) $< -lmyb
app3: main.o libmyc.a; $(LD) -o $@ $(LDFLAGS) $< -lmyc

libs: libmya.a libmyb.a libmyc.a
libmya.a: foo.o bar.o; $(AR) $(ARFLAGS) $@ $?
libmyb.a: foo.o bar.o nouse.o; $(AR) $(ARFLAGS) $@ $?
libmyc.a: foo.o bar.o nouse_ctor.o; $(AR) $(ARFLAGS) $@ $?


.cpp.o:; $(CXX) -c $(CFLAGS) $<

```

main.cpp - this app only calls ``foo()`` and ``bar()``. It will be linked with three libraries as described below.
```cpp
// main.cpp
#include "a.h"

int main()
{
    std::cout << "------start" << std::endl;
    foo("hello");
    bar("world");
    std::cout << "------end" << std::endl;
    return 0;
}
```

a.h
```cpp
#ifndef _a_h
#define _a_h

#include <iostream>

// a simple object that can be used to show the invoking of constructors
template <class T>
class A {
public:
    A(T n) : v_(n) { std::cout << "A::" << v_ << std::endl; }
    ~A() { std::cout << "~A::" << v_ << std::endl; }
    T value() const { return v_; }
private:
    T v_;
};

extern void foo(const char*);
extern void bar(const char*);
extern void nouse();

#endif
```

foo.cpp
```cpp
#include "a.h"
using namespace std;

void foo(const char* n)
{
    cout << "foo: " << n << endl;
}
```

bar.cpp
```cpp
#include "a.h"
using namespace std;

namespace {
    A<int> a(10);
}

void bar(const char* n)
{
    cout << "bar: " << n << ", a=" << a.value() << endl;
}
```

nouse.cpp - this module is not used (if it exists in an archive), and it has some external depends.

```cpp
#include <iostream>

extern void something();
void nouse()
{
    std::cout << "nouse: start" << std::endl;
    something();
    std::cout << "nouse: end" << std::endl;
}
```

nouse_ctor.cpp - this module is not used (if it exists in an archive) like above, in addition, it has one constructor.

```cpp
#include "a.h"

namespace {
    A<const char*> a("nouse_ctor");
}
extern void something();
void nouse_ctor()
{
    std::cout << "nouse_ctor: start, a=" << a.value() << std::endl;
    something();
    std::cout << "nouse_ctor: end" << std::endl;
}
```

Scenarios of archieves linked to the application.

|Libs|Modules|Description|
|----|-------|-----------|
|libmya.a|foo.o bar.o|contains ONLY required modules. Succeed on all platforms.|
|libmyb.a|foo.o bar.o nouse.o|contains non-required modules, which have other dependencies but there is no static constructor. Succeed on all platforms.|
|libmyc.a|foo.o bar.o nouse_ctor.o|similar to above lib, but there are static constructors. Fail on AIX.|

Build and run on linux with g++

```bash
jzou@debian9:~/codex/cpp/aix$ make
g++ -c -I. foo.cpp
g++ -c -I. bar.cpp
ar rv libmya.a foo.o bar.o
ar: creating libmya.a
a - foo.o
a - bar.o
g++ -c -I. nouse.cpp
ar rv libmyb.a foo.o bar.o nouse.o
ar: creating libmyb.a
a - foo.o
a - bar.o
a - nouse.o
g++ -c -I. nouse_ctor.cpp
ar rv libmyc.a foo.o bar.o nouse_ctor.o
ar: creating libmyc.a
a - foo.o
a - bar.o
a - nouse_ctor.o
g++ -c -I. main.cpp
g++ -o app1 -L. main.o -lmya
g++ -o app2 -L. main.o -lmyb
g++ -o app3 -L. main.o -lmyc
jzou@debian9:~/codex/cpp/aix$ ./app1
A::10
------start
foo: hello
bar: world, a=10
------end
~A::10
jzou@debian9:~/codex/cpp/aix$ ./app2
A::10
------start
foo: hello
bar: world, a=10
------end
~A::10
jzou@debian9:~/codex/cpp/aix$ ./app3
A::10
------start
foo: hello
bar: world, a=10
------end
~A::10
jzou@debian9:~/codex/cpp/aix$ 
```


Build and run on AIX with xlC 13.1
{{<highlight bash "hl_lines=23-27">}}
-bash-4.2$ gmake
xlC -c -I. foo.cpp
xlC -c -I. bar.cpp
ar -rv libmya.a foo.o bar.o
ar: Creating an archive file libmya.a.
a - foo.o
a - bar.o
xlC -c -I. nouse.cpp
ar -rv libmyb.a foo.o bar.o nouse.o
ar: Creating an archive file libmyb.a.
a - foo.o
a - bar.o
a - nouse.o
xlC -c -I. nouse_ctor.cpp
ar -rv libmyc.a foo.o bar.o nouse_ctor.o
ar: Creating an archive file libmyc.a.
a - foo.o
a - bar.o
a - nouse_ctor.o
xlC -c -I. main.cpp
xlC -o app1 -L. main.o -lmya
xlC -o app2 -L. main.o -lmyb
xlC -o app3 -L. main.o -lmyc
ld: 0711-317 ERROR: Undefined symbol: .something()
ld: 0711-345 Use the -bloadmap or -bnoquiet option to obtain more information.
Makefile:33: recipe for target 'app3' failed
gmake: *** [app3] Error 8
-bash-4.2$ ./app1
A::10
------start
foo: hello
bar: world, a=10
------end
~A::10
-bash-4.2$ ./app2
A::10
------start
foo: hello
bar: world, a=10
------end
~A::10
{{</highlight>}}

## The Solution

In IBM xlC compiler manual

> ### -qtwolink (C++ only)
> #### Purpose
> Minimizes the number of static constructors included from libraries and object
> files.
>
> When -qnotwolinkis in effect, all static constructors in .o files and object files are
> invoked. This generates larger executable files, but ensures that placing a .o file in
> a library does not change the behavior of a program.
>
> Normally, the compiler links in all static constructors defined anywhere in the
> object (.o) files and library (.a) files. The -qtwolink option makes link time longer,
> but linking is compatible with older versions of C or C++ compilers.
> 
> #### Defaults
>     -qnotwolink
> #### Usage
>     Before using -qtwolink, make sure that any .o files placed in an archive do not
>     change the behavior of the program.


Add that option in the linker flag as below:
{{<highlight makefile "hl_lines=8">}}

os := $(shell uname -s)

ifneq (,$(findstring AIX,$(os)))
  CC      := xlc
  CXX     := xlC
  LD      := xlC
  CFLAGS  := -I.
  LDFLAGS := -L. -qtwolink
  ARFLAGS := -rv
  AR      := ar
else
  CC      := gcc
  CXX     := g++
  LD      := g++
  CFLAGS  := -I.
  LDFLAGS := -L.
  ARFLAGS := rv
  AR      := ar
endif
{{</highlight>}}

Clean, then build and run again on AIX:
```bash
-bash-4.2$ gmake clean
rm -rf *.o *.a app1 app2 app3
-bash-4.2$ gmake
xlC -c -I. foo.cpp
xlC -c -I. bar.cpp
ar -rv libmya.a foo.o bar.o
ar: Creating an archive file libmya.a.
a - foo.o
a - bar.o
xlC -c -I. nouse.cpp
ar -rv libmyb.a foo.o bar.o nouse.o
ar: Creating an archive file libmyb.a.
a - foo.o
a - bar.o
a - nouse.o
xlC -c -I. nouse_ctor.cpp
ar -rv libmyc.a foo.o bar.o nouse_ctor.o
ar: Creating an archive file libmyc.a.
a - foo.o
a - bar.o
a - nouse_ctor.o
xlC -c -I. main.cpp
xlC -o app1 -L. -qtwolink main.o -lmya
xlC -o app2 -L. -qtwolink main.o -lmyb
xlC -o app3 -L. -qtwolink main.o -lmyc
-bash-4.2$ ./app1
A::10
------start
foo: hello
bar: world, a=10
------end
~A::10
-bash-4.2$ ./app2
A::10
------start
foo: hello
bar: world, a=10
------end
~A::10
-bash-4.2$ ./app3
A::10
------start
foo: hello
bar: world, a=10
------end
~A::10
-bash-4.2$ 
```

