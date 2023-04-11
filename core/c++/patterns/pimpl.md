---
title: Private Implementation
nav: pimpl
---

## What is Pimpl

## Pitfalls

* Explicit destructor should be implemented in the source file where Pimpl is defined and implemented,
  otherwise the compiler fails to delete Pimpl object. For example
  ```c++
  // in file a.h
  class A {
      A();
      ~A() {}
  private:
      class Pimpl;
      //Pimpl* u;
      std::unique_ptr<Pimpl> u;
  };
  ```
  and
  ```c++
  class A::Pimpl {
      friend class A;
      Pimpl() ...
      // unless using unique_ptr, ~Pimpl should be public (or accessible by owner that deletes it)
      ~Pimpl() ...
  };
  A::A() : u(new A::Pimpl()) {}
  // A::~A() should be implemented here (even it is empty), when A::Pimpl is deleted
  ```
* Because of **Rule of the Big Five** (or **Rule of the Big Three** before C++11), you have to define 

## Advantage and Disadvantage

