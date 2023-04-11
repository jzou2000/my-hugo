---
title: Condition and Branch
nav: if .. else
---

## Syntax

```cmd
if condition (stmts) [else (stmts)]
```

* the parenthese is optional if the statement is a single command 

## Example

```cmd
@echo off

set a=hello

if defined a (echo a is defined as %a%) else (echo a is not defined)
if defined b (echo b is defined as %b%) else (echo b is not defined)

echo.

```

Result
```cmd
C:\tmp\bat.ex>if.bat
a is defined as hello
b is not defined

```

