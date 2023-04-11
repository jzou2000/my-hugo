---
title: Epsilon
nav: epsilon
description: approximately compare two floats/doubles
---

We know two floats or doubles can not be compared exactly, but **how close** are considered **equal**?

The anwser is **epsilon**. Although you can define your own constant espsilon to any precision you want,
the system, or the compiler has a **default** value as ``std::numeric_limits<T>::epsilon()``.

epsilon.cpp
```c++
#include <iostream>
#include <string>
#include <sstream>
#include <iomanip>      // setprecision
#include <limits>       // numeric_limits<T>::epsilon()
#include <cstdlib>      // atof, stod, strtod
#include <cctype>       // isdigit

using namespace std;

int main(int argc, char* argv[])
{
    double epsilon_f = numeric_limits<float>::epsilon();
    cout << "numeric_limits<float>::epsilon()=" << epsilon_f << endl;
    double epsilon = numeric_limits<double>::epsilon();
    cout << "numeric_limits<double>::epsilon()=" << epsilon << endl;

    streamsize default_precision = cout.precision();
    cout << "default precision=" << default_precision << endl << endl;


    if (argc > 1) {
        const char* s = argv[1];
        double v;
        int precision = (argc > 2) ? atoi(argv[2]) : 0;

        cout << "string: " << s << endl;
        istringstream is(s);
        is >> v;
        cout << "double: " << v << endl;

        if (precision <= 0) {
            precision = 0;
            for (const char* cp = s; *cp; ++cp) {
                if (isdigit(*cp)) ++precision;
            }
        }
        if (precision != default_precision) {
            cout << "    setprecision(" << precision << ")" << endl;
            cout << setprecision(precision);
        }
        cout << "double: " << v << endl;

        // other string --> double
        cout << "atof    " << atof(s) << endl;
        cout << "strtod  " << strtod(s, NULL) << endl;
        cout << "stod    " << stod(s) << endl;
        
        if (precision != default_precision)
            cout << setprecision(default_precision);
        cout << endl;
    }

    return 0;
}
```

Compile and execute.
```sh
$ g++ -o e1 epsilon.cpp

$ ./e1 912.3111098255415
numeric_limits<float>::epsilon()=1.19209e-007
numeric_limits<double>::epsilon()=2.22045e-016
default precision=6

string: 912.3111098255415
double: 912.311
    setprecision(16)
double: 912.3111098255415
atof    912.3111098255415
strtod  912.3111098255415
stod    912.3111098255415


# the "effective" precision is limited by system epsilon
$ ./e1 912.3111098255415678
numeric_limits<float>::epsilon()=1.19209e-007
numeric_limits<double>::epsilon()=2.22045e-016
default precision=6

string: 912.3111098255415678
double: 912.311
    setprecision(19)
double: 912.3111098255416209
atof    912.3111098255416209
strtod  912.3111098255416209
stod    912.3111098255416209

```

