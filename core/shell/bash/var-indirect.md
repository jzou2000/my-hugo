---
title: Indirect Varaiable
nav: indirect var
---

**Indirect variable** is a variable that its name is the value of another variable.

```bash
#! /bin/bash

# demonstrate the usage of indrect variables
#    ${!F}       value of a variable that its name is value of variable F
#
A=aloha
A1=a1
B=banana
C=
D=delta

function exports
{
    for f in $*; do
        echo $f=${!f}
        export $f=${!f}
    done
}

exports A A1 B C D

# ${!A*}    means list of names of all variables that have name start with A 
echo A-all=${!A*}
```

Run result
```bash
jasonz@VANLWIN0056:~/codex/bash$ . var-indirect.sh 
A=aloha
A1=a1
B=banana
C=
D=delta
A-all=A A1
jasonz@VANLWIN0056:~/codex/bash$ echo $A
aloha
```
