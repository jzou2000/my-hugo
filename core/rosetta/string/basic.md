---
title: String Basic
nav: basic
weight: 10
---

|lang     |c++         |java      |python         |js            |lua           |perl|
|:--------|:-----------|:---------|:--------------|:-------------|:-------------|:------------|
|concat   |+           |+         | +             |+             |              |             |
|length   |s.size()    |          |len(s)         |s.length      |              |             |
|empty    |s.empty()   |s.IsEmpty()|not s         |              |              |             |
|substring|s.substr(off,len)|     |s[off,len]     |s.slice(start,end)              |              |             |
|duplicate|s * n       |s.duplicate(n)|s * n      |s.repeat(n)   |              |             |
|replace  |            |          |               |              |              |             |
|padding  |            |          |s.rjust(n, c)  |s.padStart(n,c)|              |             |
|         |            |          |s.ljust(n, c)  |s.padEnd(n, c)|              |             |
|strip    |            |          |s.lstrip()     |s.trimStart()      |              |             |
|         |            |          |s.rstrip()     |s.trimEnd()      |              |             |
|         |            |          |s.strip()      |s.trim()      |              |             |
|to-string|            |          |               |              |              |             |
|parse    |            |          |               |              |              |             |
|append   |push_back   |          |               |              |              |             |
|prepend  |shift       |          |               |              |              |             |
|shift    |shift       |          |               |              |              |             |
|lower    |            |          |s.lower()      |s.toLowerCase()   |              |             |
|upper    |            |          |s.upper()      |s.toUpperCase()   |              |             |
|parse    |            |          |               |s.valueOf()  |              |             |
|split    |            |          |s.split(sep, limit)|s.split(sep, limit)|              |             |


&nbsp;

|lang     |c++         |java      |python         |js            |lua           |perl|
|:--------|:-----------|:---------|:--------------|:-------------|:-------------|:------------|
|find     |s.find_first_of(c)   |          |               |s.indexOf(c)|              |             |
|         |s.find_last_of(c)|          |               |s.lastIndexOf(c)|              |             |
|compare  |s1 == s2    |s1.equals(s2)|s1 == s2    |s1 == s2      |              |             |
|         |s.compare   |          |               |              |              |             |
|startsWith|           |          |               |s.startsWith()|              |             |
|endsWith |            |          |               |s.endsWith()  |              |             |
|parse    |            |          |               |              |              |             |
|parse    |            |          |               |              |              |             |
|parse    |            |          |               |              |              |             |
|parse    |            |          |               |              |              |             |
|parse    |            |          |               |              |              |             |
|parse    |            |          |               |              |              |             |
|parse    |            |          |               |              |              |             |


js
* ``s.indexOf(searchValue, [fromIndex])`` returns index or ``-1``
* ``s.search(regex)`` returns index of the first match or ``-1``
* ``s.match(regex)``
  * all matches
  * index
  * groups
* ``s.replace(regex/oldval, new_string/func)``
* includes()

## C++

* push_back
* pop
* find_first_of
* find_last_of
* find_first_not_of
* find_last_not_of

