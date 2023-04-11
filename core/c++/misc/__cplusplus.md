---
title: Compiler Predefined Macro __cplusplus
nav: __cplusplus
---

**``__cplusplus``** defines the C++ standard, in format of yyyymm, e.g.
|__cplusplus|C++ standard|
|:---------:|:----------:|
|199711L    |C++98       |
|201103L    |C++11       |
|201402L    |C++14       |
|201703L    |C++17       |
|202002L    |C++20       |

* unless specified ``-std=c++11`` or any new standard, most compiler (even they actually support new features, e.g. vsc or clang), ``__cplusplus`` default value is ``199711L``
* To let VisualStudio C++ update actual ``__cplusplus``, you need to set ``/Zc:__cplusplus`` option. To change the default c++ standard (c++14 by default), for example c++17, you need also set ``/std:c++17`` option. [MS msvc-170](https://learn.microsoft.com/en-us/cpp/build/reference/zc-cplusplus?view=msvc-170)

In C++ source code, if we want so features that only available in C++11, use code snippet like this
```c++
#if __cplusplus >= 201103L

// some code valid for C++11 and up.

#endif
```

