---
title: Template Variadic
nav: template variadic
---

## Variable Arguments

```cpp
#include <iostream>
#include <cstdlib>

using namespace std;

//----------------------------------------------------------------------
// function sum accept any number of args, add (operator+) them together
//-----------------------------------------------------------------------
// recurisve stopper
template <typename T>
T sum(T v)
{
    return v;
}
// recursive calls
template <typename T, typename... Args>
T sum(T first, Args...args)
{
    return first + sum(args...);
}


//----------------------------------------------------------------------
// get environment variable, with fallback names
//-----------------------------------------------------------------------
// recursive stopper
const char* env(const char* name)
{
    return getenv(name);
}
// recursive calls
template <typename... Args>
const char* env(const char* prime, Args... args)
{
    const char* value = env(prime);
    if (value) return value;
    return env(args...);
}


int main(int args, char* argv[])
{
    // 1+2+3+4=4
    cout << "sum=" << sum(1, 2, 3, 4) << endl;

    // get env ME, or GOOD, or USER
    cout << "env=" << env("ME", "GOOD", "USER") << endl;
    
    return 0;
}
```

Build and run
```sh
jasonz@VANLWIN0056:~/codex/cpp$ make ex-templ-var-args
g++ -g -I. -std=c++11   -c -o ex-templ-var-args.o ex-templ-var-args.cpp
g++ -o ex-templ-var-args ex-templ-var-args.o
jasonz@VANLWIN0056:~/codex/cpp$ ./ex-templ-var-args
sum=10
env=jasonz
jasonz@VANLWIN0056:~/codex/cpp$ ME=zou ./ex-templ-var-args
sum=10
env=zou
jasonz@VANLWIN0056:~/codex/cpp$ ME=zou GOOD=zj ./ex-templ-var-args
sum=10
env=zou
jasonz@VANLWIN0056:~/codex/cpp$ ME= GOOD=zj ./ex-templ-var-args
sum=10
env=
jasonz@VANLWIN0056:~/codex/cpp$  GOOD=zj ./ex-templ-var-args
sum=10
env=zj
jasonz@VANLWIN0056:~/codex/cpp$   ./ex-templ-var-args
sum=10
env=jasonz
```

Note:
* C++ compiler actually instantiates template recursively
  ```sh
  jasonz@VANLWIN0056:~/codex/cpp$ nm ex-templ-var-args
  jasonz@VANLWIN0056:~/codex/cpp$ nm ex-templ-var-args | c++filt
  ... (omitted)
  00000000000013d2 W char const* env<char const*>(char const*, char const*)
  000000000000135c W char const* env<char const*, char const*>(char const*, char const*, char const*)
  00000000000011e9 T env(char const*)
  0000000000001435 W int sum<int>(int)
  0000000000001412 W int sum<int, int>(int, int)
  00000000000013a7 W int sum<int, int, int>(int, int, int)
  000000000000132b W int sum<int, int, int, int>(int, int, int, int)
  00000000000012c5 t __static_initialization_and_destruction_0(int, int)
  0000000000001207 T main
  ... (omitted)
  ```
