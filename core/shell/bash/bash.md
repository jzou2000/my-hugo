---
title: Bash Recipes - Parameter 
nav: bash - parameters
tags: [bash, parameters, expansion]
---


## Transform

```bash
os=linux
osx=darwin
osb=
```

|brace expansion|example         |result          |c equivalent|description|
|:--------------|:---------------|:---------------|:-----------|:-------------|
|${var:-word}   |${os:-aix}      |linux           |``var ? var : word``|$var or word|
|               |${osb:-aix}     |aix             |            |(osb is null)|
|               |${osc}:-aix}    |aix             |            |(osc is unset)|
|${var:=word}   |${os:=aix}      |linux           |``var = var ? var : word``|$var or word (with assignment)|
|               |${osb:=aix}     |aix             |            |in addition osb=aix|
|${var:+word}   |${os:+aix}      |aix             |``var ? word : null``|word if $var else null|
|               |${osb:+aix}     |                |            |(osb is null)|
|${var:?word}   |${osb:?aix}     |                |``var ? var : print word, exit``|if $var is unset or null, print word in stdout and exit if non-interactive, else return $var|
|               |${os:?aix}      |linux           |            |       |
|${!prefix*}    |${!os*}         |os osb osx      |            |name of variables whose names begin with prefix|
|${!prefix@}    |${!os*}         |os osb osx      |            |name of variables whose names begin with prefix|
|${#var}        |${#os}          |5               |            |length of $var |



Note

* the difference between * and @ is that, when expansion appears in double quotes, * expands to a single word (separeated by IFS), while @ expands to a separate word for each variable.

### recipes

* set default value
  ```bash
  : ${var:=default}
  ```
* **``var = cond ? a : b``** set different values by condition
  assume var is not set
  ```bash
  var=${cond:+a}       # var = cond ? a : null
  : ${var:=b}          # var = var ? var : b
  ```
* append **PATH**
  ```bash
  PATH=$PATH${PATH:+:}$value
  # PATH = PATH ? "PATH:value" : "value"
  ```
* show something only if var is set
  ```bash
  # only add -v option if map is set
  docker start ${map:+-v $map} ...
  ```
* concatenate multiple options
  ```bash
  vmap="$vmap ${m1:+-v $m1} ${m2:+-v $m2}"
  ```

## String Operation

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


## Array and Dictionary

```bash
# array
declare -a w
w[1]=hello
w[2]=good

# dictionary
declare -A d
d[good]=day
d[bad]=night
```

|brace expansion|example         |result          |description|
|---------------|----------------|----------------|--------------|
|${!var[*]}     |${!w[*]}        |1 2             |index of array $var that have set|
|${!var[@]}     |${!w[@]}        |1 2             |index of array $var that have set|
|${!var[*]}     |${!d[*]}        |good bad        |key of dictionary $var that have set|
|${!var[@]}     |${!d[@]}        |good bad        |key of dictionary $var that have set|
|${#var[*]}     |${#w[*]}        |2               |length of array/dictionary $var|
|${#var[@]}     |${#d[@]}        |2               |length of array/dictionary $var|


## Here Doc

Simple case

```bash

cat << EOF
some text
more text
EOF

```

Use in pipes

```bash

cat << EOF |
some text
more text
EOF
grep some

```

or alternatively

```bash
cat << EOF | grep some
some text
more text
EOF

```
