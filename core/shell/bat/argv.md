---
title: Command-line Arguments
nav: argv
---

Command-line arguments use different syntax from regular variables

* ``%0`` - the script itself
* ``%*`` - all command-line args (i.e. ``sys.argv[1:]`` in python)
* ``%1`` - the first command-line arg, and so on upto ``%9``

```cmd
@echo off

:: set
echo all args (%*)
for %%x in (%*) do ( echo    %%x)

echo arg 0 (%0)

echo arg 1 (%1)
echo arg 2 (%2)
shift
echo after shift arg 1 (%1)

:: following command print an empty line
:: in fact character : can be replaced by and of .[](;/=+
echo:

```

Result
```cmd
C:\tmp\bat.ex>args.cmd a b c
all args (a b c)
   a
   b
   c
arg 0 (args.cmd)
arg 1 (a)
arg 2 (b)
after shift arg 1 (b)


C:\tmp\bat.ex>args.cmd a
all args (a)
   a
arg 0 (args.cmd)
arg 1 (a)
arg 2 ()
after shift arg 1 ()


C:\tmp\bat.ex>args.cmd
all args ()
arg 0 (args.cmd)
arg 1 ()
arg 2 ()
after shift arg 1 ()


```

