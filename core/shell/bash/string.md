---
title: String Operation
nav: string
---


```bash
val=wks/perf/perf_2019.sln
v2=abcABC123ABCabc
os=linux
```
|brace expansion|example         |result          |description|
|---------------|----------------|----------------|--------------|
|${#var}        |${#val}         |22              |length of string $var|
|${var:position}|${val:9}        |perf_2019.sln   |substring from position (0-based) to end|
|${var:pos:leng}|${val:9:4}      |perf            |substring from pos of length leng, negative length from right|
|${var#pattern} |${val#*/}       |perf/perf_2019.sln|remove shortest match of pattern from front of $var|
|${var##pattern}|${val##*/}      |perf_2019.sln   |remove longest match of pattern from front of $var|
|${var%pattern} |${val%/*}       |wks/perf        |remove shortest match of pattern from back of $var|
|${var%%pattern}|${val%%/*}      |wks             |remove longest match of pattern from back of $var|
|${var/pat/replacement}|${val/_2019/_vs2019}|wks/perf/perf_vs2019.sln|replace 1st match of pattern in $var with replacement|
|${var//pat/replacement}|${val//abc/00}|00ABC123ABC00|replace all matches of pattern in $var with replacement|
|${var/#pat/replacement}|${val/#abc/00}|00ABC123ABCabc|replace front end match of $var with replacement|
|${var/#pat/replacement}|${val/%abc/00}|abcABC123ABC00|replace back end match of $var with replacement|
|${var^pattern} |${os^?}         |Linux           |convert to uppercase if 1st char matches pattern|
|               |${os^u}         |linux           |(l doesn't match u)|
|${var^^pattern}|${os^^?}        |LINUX           |convert to uppercase for all char that matches pattern|
|               |${v2^^a}        |AbcABC123ABCAbc |(all a are converted)|
|${var,pattern} |                |                |convert to lowercase if 1st char matches pattern|
|${var,,pattern}|                |                |convert to lowercase if each char matches pattern|


