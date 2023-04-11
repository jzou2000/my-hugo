---
title: Loop
nav: loop
---

## Syntax
```cmd
for %%x in (list) do (commands)
```

* parenthese is optional if there's only one command
* parenthese around list is required
* list can be literal or a variable, separated by space, comma or semi-comma


## Example

```cmd
@echo off

echo loop argv: (%*)
for %%x in (%*) do echo %%x

set str=hello, world; c:\windows; "c:\program files"
echo loop str=(%str%)
for %%x in (%str%) do echo str token: %%x

echo loop literal string a,b, c;d
for %%x in (a,b, c;d) do echo loop literal: %%x

```

Result
```cmd
C:\tmp\bat.ex>loop.cmd
loop argv: ()
loop str=(hello, world; c:\windows; "c:\program files")
str token: hello
str token: world
str token: c:\windows
str token: "c:\program files"
loop literal string a,b, c;d
loop literal: a
loop literal: b
loop literal: c
loop literal: d

```