---
title: Rule Of the Big Five
nav: big-five-rule
---

C++ uses **RAII** to manage resources, as a general guide of safe design or implementation,
if you implement any of these five members, you'd better (or you have to) implement all of them.

* destructor
* copy constructor
* assignment operator
* move constructor
* move assignment operator

The reason behind this rule is that the compiler offers default implementation if they are not explicitly defined.
The default implementation is member-wise-copy (for copy/assignment) or nothing (for destructor),
which is usually **NOT** what you want if you have reason to define one of them.

(For compilers before C++11, only the first three are required, so it was also called **Rule of the Big Three** at that time).

Reference: [Rules Of the Big Five](https://www.feabhas.com/sites/default/files/2016-06/Rule%20of%20the%20Big%20Five.pdf)