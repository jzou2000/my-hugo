---
title: Pitfalls - template
nav: pitfall - template
---

## this

Because template is at source level, there's no information of the external base class,
``this->`` is required to reference members of base class that are not in the scope.
Following is an example:

```c++
#include <vector>

template <typename T>
class my_vector : public std::vector<T>
{
    size_t length() const
    {
        // this would fail because the compiler doesn't know
        // where size() comes from before instantiating
        // return size();
        return this->size();
    }
};

```

