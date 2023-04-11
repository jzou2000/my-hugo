---
title: Nm - Show Symbols of a Module
nav: inspect module symbols
description: a utility to display symbols of a moudle
---

## NM

**nm** is a utility on posix systems that can list symbols of a module, such as .o, .a, .so, and excutables.
Here are common options
|option|long-option|description|
|:-----|:--------------|------------------------------------------|
|-A    |--print-file-name|filename the symbol is found, useful on archive|
|-o    |               |the same with -A|
|-C    |--demangle``[=style]``|demangle C++ names|
|-g    |--external-only|external symbols can be accessed by external modules|
|-l    |--line-numbers |show filename:line for each name, if the debug information is found in the module|
|-u    |--undefined-only|external symbols referenced|
|      |--defined-only |only defined symbols for each object file|

The most common types of symbols (upper-case for external symbols)
|type  |description|
|------|:-------------------------|
|B     |in BSS session|
|C     |common symbols are uninitialized data|
|D     |in the initialized data section|
|I     |an indirect reference to another symbol|
|R     |in read-only section|
|T     |in the text (code) section|
|V     |a weak object.  When a weak defined symbol is linked with a normal defined symbol, the normal defined symbol is used with no error.|
|U     |undefined|
|W     |a weak symbol that has not been specifically tagged as a weak object symbol, e.g. std:: symbols of C++ library|


## Examples

### shared-object mymod.o

* external-only
* demangle C++ symbols
* with filename:line

```bash
nm -gCol mymod.so

mymod.so:                 w _ITM_deregisterTMCloneTable
mymod.so:                 w _ITM_registerTMCloneTable
mymod.so:                 U _Unwind_Resume@@GCC_3.0
mymod.so:0000000000004d9d T tfactory(char const*)       /home/jasonz/codex/cpp/excpp/exnew/mymod.cpp:10
mymod.so:                 U B::B(unsigned long)
mymod.so:                 U B::B()
mymod.so:                 U B::B(B const&)
mymod.so:                 U B::B(unsigned long)
mymod.so:                 U B::B()
mymod.so:                 U B::~B()
mymod.so:                 U B::operator=(B const&)
mymod.so:000000000000545c T C::C(C const&)      /home/jasonz/codex/cpp/excpp/exnew/c.cpp:31
mymod.so:00000000000052e2 T C::C(unsigned long) /home/jasonz/codex/cpp/excpp/exnew/c.cpp:27
mymod.so:00000000000051c6 T C::C()      /home/jasonz/codex/cpp/excpp/exnew/c.cpp:23
mymod.so:000000000000545c T C::C(C const&)      /home/jasonz/codex/cpp/excpp/exnew/c.cpp:31
mymod.so:00000000000052e2 T C::C(unsigned long) /home/jasonz/codex/cpp/excpp/exnew/c.cpp:27
mymod.so:00000000000051c6 T C::C()      /home/jasonz/codex/cpp/excpp/exnew/c.cpp:23
mymod.so:00000000000055dc T C::~C()     /home/jasonz/codex/cpp/excpp/exnew/c.cpp:35
mymod.so:00000000000055dc T C::~C()     /home/jasonz/codex/cpp/excpp/exnew/c.cpp:35
mymod.so:0000000000005680 T C::operator=(C const&)      /home/jasonz/codex/cpp/excpp/exnew/c.cpp:39
mymod.so:00000000000069b6 W __gnu_cxx::new_allocator<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> > >::deallocate(std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >*, unsigned long)     /usr/include/c++/9/ext/new_allocator.h:119
mymod.so:0000000000006a2a W __gnu_cxx::new_allocator<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> > >::allocate(unsigned long, void const*)    /usr/include/c++/9/ext/new_allocator.h:102
mymod.so:00000000000069a2 W __gnu_cxx::new_allocator<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> > >::new_allocator(__gnu_cxx::new_allocator<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> > > const&)        /usr/include/c++/9/ext/new_allocator.h:83
mymod.so:0000000000006356 W __gnu_cxx::new_allocator<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> > >::new_allocator() /usr/include/c++/9/ext/new_allocator.h:80
mymod.so:00000000000069a2 W __gnu_cxx::new_allocator<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> > >::new_allocator(__gnu_cxx::new_allocator<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> > > const&)        /usr/include/c++/9/ext/new_allocator.h:83

... and more ...
```

Enhanced with following commands, we get much better result
* defined-only
* filter-out __system__ symbols, e.g. glibc, c++, stl

```bash
nm -gCl --defined-only mymod.so| grep -Ev '(GLIBC|CXX|std::)'
0000000000004d9d T tfactory(char const*)        /home/jasonz/codex/cpp/excpp/exnew/mymod.cpp:10
000000000000545c T C::C(C const&)       /home/jasonz/codex/cpp/excpp/exnew/c.cpp:31
00000000000052e2 T C::C(unsigned long)  /home/jasonz/codex/cpp/excpp/exnew/c.cpp:27
00000000000051c6 T C::C()       /home/jasonz/codex/cpp/excpp/exnew/c.cpp:23
000000000000545c T C::C(C const&)       /home/jasonz/codex/cpp/excpp/exnew/c.cpp:31
00000000000052e2 T C::C(unsigned long)  /home/jasonz/codex/cpp/excpp/exnew/c.cpp:27
00000000000051c6 T C::C()       /home/jasonz/codex/cpp/excpp/exnew/c.cpp:23
00000000000055dc T C::~C()      /home/jasonz/codex/cpp/excpp/exnew/c.cpp:35
00000000000055dc T C::~C()      /home/jasonz/codex/cpp/excpp/exnew/c.cpp:35
0000000000005680 T C::operator=(C const&)       /home/jasonz/codex/cpp/excpp/exnew/c.cpp:39
0000000000005764 T C::show() const      /home/jasonz/codex/cpp/excpp/exnew/c.cpp:48
0000000000009db8 V typeinfo for C
000000000000718a V typeinfo name for C
0000000000009da0 V vtable for C
0000000000004d59 T operator delete[](void*)     /home/jasonz/codex/cpp/excpp/exnew/mymod.cpp:8
0000000000004d15 T operator delete(void*)       /home/jasonz/codex/cpp/excpp/exnew/mymod.cpp:8
000000000000619b W operator delete(void*, void*)        /usr/include/c++/9/new:179
0000000000004cb7 T operator new[](unsigned long)        /home/jasonz/codex/cpp/excpp/exnew/mymod.cpp:8
0000000000004c59 T operator new(unsigned long)  /home/jasonz/codex/cpp/excpp/exnew/mymod.cpp:8
0000000000006185 W operator new(unsigned long, void*)   /usr/include/c++/9/new:173
```

Usually undefined symbols are those referenced in shared libraries.

```bash
 nm -gCl -u mymod.so| grep -Ev '(GLIBC|CXX|std::)'
                 w _ITM_deregisterTMCloneTable
                 w _ITM_registerTMCloneTable
                 U _Unwind_Resume@@GCC_3.0
                 U B::B(unsigned long)
                 U B::B()
                 U B::B(B const&)
                 U B::B(unsigned long)
                 U B::B()
                 U B::~B()
                 U B::operator=(B const&)
                 U B::buf() const
                 U B::size() const
                 U typeinfo for B
                 w __gmon_start__
```
for example, ``B::*`` are defined in ``libutil.so`` when ``mymod.so`` is linked with
```make
mymod.so: mymod.o c.o libutil.so
	$(CXX) -o $@ -shared $(filter %.o, $^)  -lutil
```