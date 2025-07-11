---
title: Variable Transform 
nav: transform
tags: [bash, parameters, transform]
---


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

## Recipes

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
