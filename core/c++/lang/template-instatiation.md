---
title: Template Instantiation
nav: template instantiation
---

## Template

```c++
template <typename T>
class Trait
{
public:
    typedef T   type;
    static const size_t  size;
    static const char* const name;
};
```

## Instantiation

Explicit instantiation - instantiate class only
```c++
template class Trait<char>;
template class Trait<unsigned int>;

```

Implicit instantiation  - instantiate class **AND** object of the class
```c++
Trait<char> varChar;
Trait<long> varLong;
```

Define static members
```c++
template<> const size_t Trait<char>::size = sizeof(char);
template<> const char* const Trait<char>::name = "char";

template<> const size_t Trait<unsigned int>::size = sizeof(unsigned int);
template<> const char* const Trait<unsigned int>::name = "unsigned int";
```

