---
title: Pitfall - Big Five
nav: big 5
---

In Big-Five (or Big-Three in prev-11) theory, we need to define copy/move constructors and assign/move operators
(along with destructor, virtual if derived classes are expected).

The question is, in the derived class, do we need to define them,
especially when we don't have extra data members and actions in derived class?
If we do define them, what pitfalls can be?

## copy/move constructor

Not necessary if your derived class doesn't have extra members and actions to care about,
beause by default the compiler will use member-to-member-copy method to generate copy constructor,
as long as the base class hanles copy/move correctly, everything is fine.

If you do need to define your own copy/move constructor, the common pattern is error-proved.
```c++
Derived::Derived(const Derived& other) : Base(other) //, other member variables initialization
{
    // do something in derived class
}
```


## assign/move operator

The same with copy/move constructor, if you don't need them, the default version (that the compiler generates) works.
However, if you do need your onw version, don't forget call assign/move operator of the base class,
the compiler won't do it for you, and the method look weird.

```c++
Derived& Derived::operator(const Derived& other)
{
    if (this != &other) {
        // IMPORTANT: call base assign/move operator
        *((Base*)this) = *((Base*)&other);

        // do something in derived class
    }
    return *this;
}
```

## Example

Here is an example ``big3.cpp``

```c++
#include <iostream>
#include <string>

using namespace std;

static int seed_ = 1;

// template <typename T>
// ostream& operator<<(ostream& os, const T& o) {
//     return o.dump(os);
// }

#define FRIEND_OS(T)    friend ostream& operator<< (ostream&, const T&)
#define INST_OS(T)    ostream& operator << (ostream& os, const T& o) { return o.dump(os, #T); }

class Base {
public:
    Base() : id_(seed_++), name_() {
        cout << "    ++++" << *this << endl;
    }
    Base(const string& name) : id_(seed_++), name_(name) {
        cout << "    ++++" << *this << endl;
    }
    Base(const Base& other) : id_(seed_++), name_(other.name_) {
        cout << "    ++++" << *this << " copyied from " << other << endl;
    }
    virtual ~Base() {
        cout << "    ----" << *this << endl;
    }
    Base& operator=(const Base& other)
    {
        if (this != &other) {
            name_ = other.name_ + "=";
            cout << "    assign: " << *this << " from " << other << endl;
        } else {
            cout << "    assign: " << *this << " from self" << endl;
        }
        return *this;
    }

protected:
    virtual ostream& dump(ostream& os, const char* class_name) const {
        os << class_name << "." << id_;
        if (!name_.empty()) os << "(" << name_ << ")";
        return os;
    }

    FRIEND_OS(Base);

protected:
    int id_;
    string name_;    
};
INST_OS(Base)

class Derived : public Base
{
public:
    Derived() : Base(), ref_(id_ + 100) {
        cout << "++++" << *this << endl;
    }
    Derived(const string& name) : Base(name), ref_(id_ + 100) {
        cout << "++++" << *this << endl;
    }
    Derived(const Derived& other) : Base(other), ref_(other.ref_) {
        cout << "++++" << *this << endl;
    }
    ~Derived()
    {
        cout << "----" << *this << endl;
    }
    Derived& operator=(const Derived& other)
    {
        if (this != &other) {
            *((Base*)this) = *((Base*)&other);
            ref_ = other.ref_ + 20000;
            cout << "assign: " << *this << " from " << other << endl;
        } else {
            cout << "assign: " << *this << " from self" << endl;
        }
        return *this;
    }
    
    FRIEND_OS(Derived);

protected:
    virtual ostream& dump(ostream& os, const char* class_name) const {
        os << class_name << "." << id_ << "[" << ref_ << "]";
        if (!name_.empty()) os << "(" << name_ << ")";
        return os;
    }

protected:
    int ref_;
};
INST_OS(Derived)


class Simple : public Base
{
public:
    Simple() : Base(), ref_(id_ + 100) {
        cout << "++++" << *this << endl;
    }
    Simple(const string& name) : Base(name), ref_(id_ + 100) {
        cout << "++++" << *this << endl;
    }
    ~Simple()
    {
        cout << "----" << *this << endl;
    }
    
    FRIEND_OS(Simple);

protected:
    virtual ostream& dump(ostream& os, const char* class_name) const {
        os << class_name << "." << id_ << "[" << ref_ << "]";
        if (!name_.empty()) os << "(" << name_ << ")";
        return os;
    }

protected:
    int ref_;
};
INST_OS(Simple)

class LittleSimple : public Base
{
public:
    LittleSimple() : Base(), ref_(id_ + 100) {
        cout << "++++" << *this << endl;
    }
    LittleSimple(const string& name) : Base(name), ref_(id_ + 100) {
        cout << "++++" << *this << endl;
    }
    ~LittleSimple()
    {
        cout << "----" << *this << endl;
    }

    LittleSimple& operator=(const LittleSimple& other)
    {
        if (this != &other) {
            ref_ = other.ref_ + 50000;
            cout << "assign: " << *this << " from " << other << endl;
        } else {
            cout << "assign: " << *this << " from self" << endl;
        }
        return *this;
    }
    
    FRIEND_OS(LittleSimple);

protected:
    virtual ostream& dump(ostream& os, const char* class_name) const {
        os << class_name << "." << id_ << "[" << ref_ << "]";
        if (!name_.empty()) os << "(" << name_ << ")";
        return os;
    }

protected:
    int ref_;
};
INST_OS(LittleSimple)

template <typename T>
void test_simple_copy_assign()
{

    cout << "------------------ test simple copy and assign:" << endl;
    {
        cout << "create 3 objects" << endl;
        T a, b("vancouver"), c("richmond");

        cout << endl << "---- copy constructor: d(b)" << endl;
        T d(b);

        cout << endl << "----- assign from itself b=b" << endl;
        b = b;

        cout << endl << "----- assign a=c" << endl;
        a = c;

        cout << endl << "out of scope" << endl;
    }
    cout << "--------- test simple done" << endl << endl;
}

int main(int argc, char* argv[])
{
    {
        Base ba, bb("adam");

        test_simple_copy_assign<Derived>();
        test_simple_copy_assign<Simple>();
        test_simple_copy_assign<LittleSimple>();

        cout << "---------test done" << endl;
    }
    return 0;
}

```

The result is
```sh
$ g++ -o big3 big3.cpp
$ ./big3
    ++++Base.1
    ++++Base.2(adam)
------------------ test simple copy and assign:
create 3 objects
    ++++Base.3
++++Derived.3[103]
    ++++Base.4(vancouver)
++++Derived.4[104](vancouver)
    ++++Base.5(richmond)
++++Derived.5[105](richmond)

---- copy constructor: d(b)
    ++++Base.6(vancouver) copyied from Base.4[104](vancouver)
++++Derived.6[104](vancouver)

----- assign from itself b=b
assign: Derived.4[104](vancouver) from self

----- assign a=c
    assign: Base.3[103](richmond=) from Base.5[105](richmond)
assign: Derived.3[20105](richmond=) from Derived.5[105](richmond)

out of scope
----Derived.6[104](vancouver)
    ----Base.6(vancouver)
----Derived.5[105](richmond)
    ----Base.5(richmond)
----Derived.4[104](vancouver)
    ----Base.4(vancouver)
----Derived.3[20105](richmond=)
    ----Base.3(richmond=)
--------- test simple done

------------------ test simple copy and assign:
create 3 objects
    ++++Base.7
++++Simple.7[107]
    ++++Base.8(vancouver)
++++Simple.8[108](vancouver)
    ++++Base.9(richmond)
++++Simple.9[109](richmond)

---- copy constructor: d(b)
    ++++Base.10(vancouver) copyied from Base.8[108](vancouver)

----- assign from itself b=b
    assign: Base.8[108](vancouver) from self

----- assign a=c
    assign: Base.7[107](richmond=) from Base.9[109](richmond)

out of scope
----Simple.10[108](vancouver)
    ----Base.10(vancouver)
----Simple.9[109](richmond)
    ----Base.9(richmond)
----Simple.8[108](vancouver)
    ----Base.8(vancouver)
----Simple.7[109](richmond=)
    ----Base.7(richmond=)
--------- test simple done

------------------ test simple copy and assign:
create 3 objects
    ++++Base.11
++++LittleSimple.11[111]
    ++++Base.12(vancouver)
++++LittleSimple.12[112](vancouver)
    ++++Base.13(richmond)
++++LittleSimple.13[113](richmond)

---- copy constructor: d(b)
    ++++Base.14(vancouver) copyied from Base.12[112](vancouver)

----- assign from itself b=b
assign: LittleSimple.12[112](vancouver) from self

----- assign a=c
assign: LittleSimple.11[50113] from LittleSimple.13[113](richmond)

out of scope
----LittleSimple.14[112](vancouver)
    ----Base.14(vancouver)
----LittleSimple.13[113](richmond)
    ----Base.13(richmond)
----LittleSimple.12[112](vancouver)
    ----Base.12(vancouver)
----LittleSimple.11[50113]
    ----Base.11
--------- test simple done

---------test done
    ----Base.2(adam)
    ----Base.1
$ 
```
