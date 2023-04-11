---
title: Variables and String
nav: vars and string
---

## Define and Reference

```cmd
set mystr=hello, world
echo %mystr%
```

* Don't put spaces between variable and equal sign ``=``
* unlike **``bash``**, anything after ``=`` is the value of the variable
* reference the variable by putting ``%`` at both ends of the variable (``bash`` syntax ``${var}``)
* special cases
  * command-line arguments: ``%* %0 %1 %2 ...``
  * loop iterator variable: ``%%x``

## Examples

str.bat
```cmd
@echo off
set mystr=hello, world
echo %mystr%

:: string left
set newstr=left 5 (%mystr:~0,5%)
echo %newstr%

:: string right
set newstr=right 7 (%mystr:~-7%)
echo %newstr%

:: string replace
set newstr=replace %mystr:l=L%
echo %newstr%

```

The result
```cmd
C:\tmp\bat.ex>str.bat
hello, world
left 5 (hello)
right 7 (, world)
replace heLLo, worLd

```


