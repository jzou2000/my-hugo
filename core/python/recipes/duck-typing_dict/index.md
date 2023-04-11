---
title: Duck-typing Dict
nav: duck-typing dict
---

ex-obj-dict.py
```python
from __future__ import print_function
"""
Demonstrate duck-typing for dict-like class.

1. Create __dict__ dictionary before creating any members
2. Implement following interfaces, which are required for dict context, such as d[key], for key in d:
    __setitem__(key, value)
    __getitem__(key)
    __delitem__(key)
    __iter__()
    __len__()
3. In addition, implement common methods of dict
    get(key, fallback=None)
    items()

Alternatively, by deriving from collections.abc.Mapping:
* __dict__ is not required to be created
* context interfaces are forced to be implemented
* get(), items() are not required (implemented already by Mapping)

"""

try:
    from collections.abc import Mapping
except ImportError as e:
    # No module named abc
    from collections import Mapping

_id = 0

class A(object):
    def __init__(self, name):
        global _id
        super(A, self).__init__()       # this is optional, but preferred

        # create __dict__ before creating any other members
        # all members after __dict__ will be added automatically to __dict__
        self.__dict__ = {}

        self.name = name
        self.id = _id
        _id += 1

    def __setitem__(self, key, value):
        self.__dict__[key] = value

    def __getitem__(self, key):
        return self.__dict__[key]

    def __delitem__(self, key):
        del self.__dict__[key]

    def __iter__(self):
        return iter(self.__dict__)

    def __len__(self):
        return len(self.__dict__)

    def get(self, key, fallback=None):
        return self.__dict__.get(key, fallback)
    
    def items(self):
        return self.__dict__.items()

    def show(self):
        print('A::({})={}'.format(self.id, self.name))


class B(Mapping):
    def __init__(self, name):
        global _id
        # no need to create __dict__
        self.name = name
        self.id = _id
        _id += 1

    def __setitem__(self, key, value):
        self.__dict__[key] = value

    def __getitem__(self, key):
        return self.__dict__[key]

    def __delitem__(self, key):
        del self.__dict__[key]

    def __iter__(self):
        return iter(self.__dict__)

    def __len__(self):
        return len(self.__dict__)

    # no need get(), items() either


if __name__ == '__main__':

    def show(obj):
        print('iterate keys: for .. in')
        for i in obj:
            print('    {}: {}'.format(i, obj[i]))
        print('iterate keys: for .. in .items()')
        for k, v in obj.items():
            print('    {}: {}'.format(k, v))
        print('get')
        for i in ('name', 'age'):
            print('    get({})={}'.format(i, adam.get(i)))

    adam = A('Adam')
    bob = A('Bob')

    print('=========start')
    adam.show()
    bob.show()

    show(adam)
    print('-----B------')
    show(B('b-adam'))

    print('--------------end')
```

Result
```sh
$ python ex-obj-dict.py
=========start
A::(0)=Adam
A::(1)=Bob
iterate keys: for .. in
    name: Adam
    id: 0
iterate keys: for .. in .items()
    name: Adam
    id: 0
get
    get(name)=Adam
    get(age)=None
-----B------
iterate keys: for .. in
    name: b-adam
    id: 2
iterate keys: for .. in .items()
    name: b-adam
    id: 2
get
    get(name)=Adam
    get(age)=None
--------------end
```