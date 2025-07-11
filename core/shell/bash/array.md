---
title: Array and Dictionary
nav: array
---


```bash
####### array
declare -a w
w[1]=hello
w[2]=good

echo ${w[1]}

####### dictionary
declare -A d
d[good]=day
d[bad]=night

echo ${d[good]}
```

|brace expansion|example         |result          |description|
|---------------|----------------|----------------|--------------|
|${!var[*]}     |${!w[*]}        |1 2             |index of array $var that have set|
|${!var[@]}     |${!w[@]}        |1 2             |index of array $var that have set|
|${!var[*]}     |${!d[*]}        |good bad        |key of dictionary $var that have set|
|${!var[@]}     |${!d[@]}        |good bad        |key of dictionary $var that have set|
|${#var[*]}     |${#w[*]}        |2               |length of array/dictionary $var|
|${#var[@]}     |${#d[@]}        |2               |length of array/dictionary $var|
