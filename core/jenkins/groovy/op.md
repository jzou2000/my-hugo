---
title: Operator
nav: operator
---

### ternary
```groovy
result = string ? 'Found' : 'Not found'
```

### elvis
```groovy
display_name = user.name ?: 'Anonymous'
atomic_number ?= 2

env = [bb: '3.x', name: 'who']
branch = env.b ?: "1.0"
println("branch=${branch}")             // branch=1.0
```

### pattern
```groovy
p = ~'foo'                            // single or double quotes
p = ~$/dollar/slashy $ string /$      // the dollar-slashy string lets you use slashes and the dollar sign without having to escape them
p = ~"${pattern}"                     // GString
```

* use escape prefix for ``(?i)`` case-insensitive match, e.g. ``/(?i)windows``

### find
returns java.util.regex.Matcher object, found if a **substring** matches the pattern
```groovy
m = text =~ /RE/

name = 'windows'
name =~ /win/           // found
name =~ /ind/           // found
name =~ /abc/           // not found
```



### match
returns bool, true only if the **whole string** matches the pattern
```groovy
m = text ==~ /RE/

name = 'windows'
name ==~ /win/              // false
name ==~ /indows/           // false
name ==~ /win.*/            // true
```
