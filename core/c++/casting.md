---
title: casting
tags: [c++, casting, datatype]
---

## solaris issue

app.cpp
{{<highlight cpp "linenos=yes">}}
#include <iostream>

using namespace std;

template <class T>
void foo(const T& v1, const T& v2, const char* msg)
{
    cout << "v1=" << v1 << ", v2=" << v2 << ", msg=" << msg << endl;
}

template <class T>
void bar(T v1, T v2, const char* msg)
{
    cout << "v1=" << v1 << ", v2=" << v2 << ", msg=" << msg << endl;
}

template <class T>
void ptr(T* v1, T* v2, const char* msg)
{
    cout << "v1=" << *v1 << ", v2=" << *v2 << ", msg=" << msg << endl;
}

int main()
{
    cout << "start" << endl;
    unsigned fail = 0;
    cout << "&fail=" << &fail << endl;
    foo(static_cast<unsigned>(1), fail, "this is a test ref");
    bar(static_cast<unsigned>(1), fail, "this is a test val");
    ptr(&fail, &fail, "this is a test ptr");
    cout << "end" << endl;
    return 0;
}

{{</highlight>}}

with gcc 4.9.2

```bash
-bash-3.2$ g++ -o app -g app.cpp
-bash-3.2$ dbx app
For information about new features see `help changes'
To remove this message, put `dbxenv suppress_startup_message 8.0' in your .dbxrc
Reading app
Reading ld.so.1
Reading libstdc++.so.6.0.20
Reading libm.so.2
Reading librt.so.1
Reading libgcc_s.so.1
Reading libc.so.1
Reading libaio.so.1
Reading libmd.so.1
(dbx) stop at 8
(2) stop at "app.cpp":8
(dbx) stop at 14
(3) stop at "app.cpp":14
(dbx) stop at 20
(4) stop at "app.cpp":20
(dbx) run
Running: app 
(process id 2058)
Reading libc_psr.so.1
start
&fail=0xffbffa58
stopped in foo<unsigned> at line 8 in file "app.cpp"
    8       cout << "v1=" << v1 << ", v2=" << v2 << ", msg=" << msg << endl;
(dbx) where
=>[1] foo<unsigned>(v1 = 1U, v2 = 0, msg = 0x11298 "this is a test ref"), line 8 in "app.cpp"
  [2] main(), line 28 in "app.cpp"
(dbx) c
c: not found
(dbx) cont
v1=1, v2=0, msg=this is a test ref
stopped in bar<unsigned> at line 14 in file "app.cpp"
   14       cout << "v1=" << v1 << ", v2=" << v2 << ", msg=" << msg << endl;
(dbx) where
=>[1] bar<unsigned>(v1 = 1U, v2 = 0, msg = 0x112b0 "this is a test val"), line 14 in "app.cpp"
  [2] main(), line 29 in "app.cpp"
(dbx) cont
v1=1, v2=0, msg=this is a test val
stopped in ptr<unsigned> at line 20 in file "app.cpp"
   20       cout << "v1=" << *v1 << ", v2=" << *v2 << ", msg=" << msg << endl;
(dbx) where
=>[1] ptr<unsigned>(v1 = 0xffbffa58, v2 = 0xffbffa58, msg = 0x112c8 "this is a test ptr"), line 20 in "app.cpp"
  [2] main(), line 30 in "app.cpp"
(dbx) 

```

gdb on linux

```bash
(gdb) break 8
Breakpoint 1 at 0xb46: file app.cpp, line 8.
(gdb) run
Starting program: /mnt/huge/jzou/codex/mk/cast/app 
start
&fail=0x7fffffffe118

Breakpoint 1, foo<unsigned int> (v1=@0x7fffffffe11c: 1, v2=@0x7fffffffe118: 0, 
    msg=0x555555554d92 "this is a test ref") at app.cpp:8
8	    cout << "v1=" << v1 << ", v2=" << v2 << ", msg=" << msg << endl;
(gdb) b 14
Breakpoint 2 at 0x555555554bdc: file app.cpp, line 14.
(gdb) b 20
Breakpoint 3 at 0x555555554c6e: file app.cpp, line 20.
(gdb) c
Continuing.
v1=1, v2=0, msg=this is a test ref

Breakpoint 2, bar<unsigned int> (v1=1, v2=0, 
    msg=0x555555554da5 "this is a test val") at app.cpp:14
14	    cout << "v1=" << v1 << ", v2=" << v2 << ", msg=" << msg << endl;
(gdb) c
Continuing.
v1=1, v2=0, msg=this is a test val

Breakpoint 3, ptr<unsigned int> (v1=0x7fffffffe118, v2=0x7fffffffe118, 
    msg=0x555555554db8 "this is a test ptr") at app.cpp:20
20	    cout << "v1=" << *v1 << ", v2=" << *v2 << ", msg=" << msg << endl;
(gdb) 
```