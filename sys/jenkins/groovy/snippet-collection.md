---
title: Snippet - collection
nav: snippet - collection
---

## concate two arrays

```groovy
basic = ['string a', 'string b']
ext = ['ext1', 'ext2']

param=(ext + basic)
nsize = param.size()

random = new Random()
def el = { param[Math.abs(random.nextInt()) % nsize]}

println "${param}: ${nsize} elements"
for (x in (1..3)) {
    v = el()
	println "${x} ${v}"
}
```

```
[ext1, ext2, string a, string b]: 4 elements
1 string b
2 string a
3 string b
```

## map

```groovy
choice = [
    win: ['w10', 'w11', 'w2016'],
    dm:  ['unixodbc', 'iodbc'],
    'dm-osx': ['2.3.11', '3.52.8'],
]
random = new Random()
def pick(set, n=null) {
    def sz = set ? set.size() : 0
    return sz ? set[n !== null ? n : Math.abs(random.nextInt())%sz] : null
}
for (key in ['win', 'dm', 'dmc']) {
    values = choice[key]
    println("${key}: ${values}")
    if (values) {
        print '     '
        for (n = 0; n < 5; ++n) {
        	print(" ${pick(values)}")
        }
        println()
    }
}
```

```
win: [w10, w11, w2016]
      w2016 w10 w10 w2016 w2016
dm: [unixodbc, iodbc]
      unixodbc unixodbc unixodbc unixodbc iodbc
dmc: null
```