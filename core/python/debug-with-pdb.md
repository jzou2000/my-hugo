---
title: Debug Python Script With Pdb
date: 2019-08-15
nav: pdb
tags: [debug, python, pdb]
---

Just like gdb is still used for C/C++ programmer, pdb is still useful although we have many IDE tools like pycharm or vs-code.
Gdb/pdb sometimes is the only choice in on-site environment when more advanced tools are not available or allowed.

## Enable/Start pdb

````bash
python -m pdb your_script.py
````

## Common Commands
|Command           |Description|
|------------------|--------------------------------|
|c(ont(inue))      |continue                        |
|w(here)           |print stack trace (reversed)|
|b(reak) [fln\|func[,condition]]|set break point, fln=file:line, ``break`` without args lists all breakpoints|
|tbreak ...        |temporary break|
|cl(ear) [fln\|bp#]...|clear breakpoint, all without args|
|s(tep)            |step in|
|n(ext)            |next|
|unt(il)           |until line or out of current frame|
|r(eturn)          |until the current frame|
|p expr            |print expr|
|pp expr           |print using pprint|

** See full-list below.

### Setting Breakpoints

* file:line#
* function, e.g. pkg.mod.foo
* list all breakpoints if no args
* to break at a module, import that module first
  ```
  (Pdb) import mymodule
  (Pdb) b mymodule.foo
  ```

### Common Workflow
1. invoke pdb (use ```-m pdb```)
2. set breakpoints (use ```b, tbreak```)
3. continue (use ```c```)
4. check values (use ```p, pp```)
5. interactive run (use ```s,n,unt,r,cl,b,tbreak,p,pp```)
   * gdb:watch can be implemnted with commands
     ```
     (Pdb) commands 1
     (com) print expr
     (com) end
     (Pdb)
     ```
6. clear all breakpoints and continue (use ```cl, c```)
6. or abort (use ```q```)


## Full-list of Commands
|Command           |Description|
|------------------|--------------------------------|
|h(elp)            |
|c(ont(inue))      |continue                        |
|w(here)           |print stack trace (reversed)|
|d(own)            |move current frame 1 level down|
|u(p)              |move current frame up|
|b(reak) [fln\|func[,condition]]|set break point, fln=file:line|
|tbreak ...        |temporary break|
|cl(ear) [fln\|bp#]...|clear breakpoint|
|disable bp# ...   | disable bp|
|enable bp# ...    | enable|
|ignore bp# [count]|ignore bp# times|
|condition bp# [expr]|when expr is true |
|commands bp#      |execute commands when bp# is hit|
|s(tep)            |step in|
|n(ext)            |next|
|unt(il)           |until line or out of current frame|
|r(eturn)          |until the current frame|
|j(ump) ln#        |set the next line to ln#, only at top frame|
|l(ist) [first[,last]]|list source in the current file|
|a(rgs)            |print argument list of the current func|
|p expr            |print expr|
|pp expr           |print using pprint|
|alias [name [command]]|create command alias|
|unalias name      |delete alias|
|[!]statement      |execute one-line statement|
|run [args...]     |restart the debugged script|
|q(uit)            |quit from the debugger and abort|

