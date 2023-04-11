---
title: GDB recipes
nav: gdb recipes
---

## common command

* bt
* run, next, step, continue, finish, until
* break, bt(where), up/down
* l(list)
* p print
* break, tbreak
  * break loc if con
  * rbreak regex - on functions matched regex
  * info breakpoints
  * clear n - range
  * condition bnum expre
  * command range...
     ...
    end
  * save breakpoints [filename]
* watch, rwatch(for read), awatch (read+write), info watchpoints
* catch, tcatch


## TUI - TextWindow UI

Four windows - command and source are available by default
* command - regular gdb command
* source - source code
* assemble
* register

Key binding
* C-x a   enter/leave TUI
* C-x o   switch active window (e.g. source code, command)
* C-L     refresh
* C-x s   toggle single-key mode
  * c continue
  * d down
  * f finish
  * n next
  * q quit single-key mode
  * r run
  * s step
  * u up
  * v info locals
  * w where

## source path

* dir pathname - insert pathname into source path list
* set directories path-list - set source path list
* set substitute-path from to - useful if the compile platform is different from debug platform
  ```
  (gdb) set substitute-path /usr/src /mnt/cross
  ```
  * ``unset substitute-path [path]``
  * ``show  substitute-path [path]``

## data

* display expr
  * display/fmt expr
  * undisplay dnum - delete, disable, enable
  * info display
* generate core
  ``gcore file```
* memory
  * x/nfu addr
    * n - repeat
    * f - fmt (x-hex, d-dec, u-, o, t, a, c, f, s)
    * u - unit (b-byte, h-halfword(2), w-word(4), g-giantword(8))

## remote debug

