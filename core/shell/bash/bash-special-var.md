---
title: Bash Special Variables
nav: bash special vars
---


|var|description|
|-------------|-------------------------|
|``$0``       | name of script executing |
|``$N``       | position option Nth, N=1,2,3,..|
|``$@``       | all arguments |
|``$*``       | all arguments (joined by $IFS) |
|``$#``       | number of arguments |
|``$?``       | return code of previous command |
|``$!``       | pid of previous background command|
|``$$``       | pid of current shell |
|``$-``       | options of current shell |
|``$_``       | last argument of last command|


Note:
* ``kill -0 pid`` doesn't send signal to pid, used to check if pid exists (return 0 if existing)