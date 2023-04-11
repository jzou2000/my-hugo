---
title: Implicit Type Convertion In Overload
nav: implicit type convertion
description: implicit type convertion in overload functions, especially in constructor
---

## Use Case


## Examples

overload-implicit.cpp
```c++
#include <iostream>
using namespace std;

/*
test overload implicit convertion, especially in constructor

*/

class A
{
public:
    explicit A(int v) {  cout << "A.ctor int: " << v << endl;}
    A(short v) {  cout << "A.ctor short: " << v << endl;}
    A(const char* v) { cout << "A.ctor const char*: " << v << endl; }
    A(const unsigned char* v) { cout << "A.ctor const unsigned char*: " << v << endl; }
    A(const void* v) { cout << "A.ctor const void*: " << v << endl; }

};

struct S {
    int a;
    char b;
};

int main(int argc, char* argv[])
{
    S   stt;
    int i = 100;
    short s = 200;
    const void* p = (const void*) argv[0];
    cout << "p=" << p << endl;

    A a((short)5);
    A a3(5);
    A a2(s);
    A b(0);
    A c("hello");
    A d((unsigned char*) "hello");
    A e(&i);
    A f(argv);
    A g((const void*)argv[0]);
    cout << "--------&stt" << endl;
    A h(&stt);

    return 0;
}

```

```sh
jasonz@VANLWIN0056:~/codex/cpp$ g++ -o overload-implicit -std=c++98 overload-implicit.cpp 
jasonz@VANLWIN0056:~/codex/cpp$ ./overload-implicit 
p=0x7ffcf9eedddc
A.ctor short: 5
A.ctor int: 5
A.ctor short: 200
A.ctor int: 0
A.ctor const char*: hello
A.ctor const unsigned char*: hello
A.ctor const void*: 0x7ffcf9eed554
A.ctor const void*: 0x7ffcf9eed668
A.ctor const void*: 0x7ffcf9eedddc
--------&stt
A.ctor const void*: 0x7ffcf9eed560
```
