---
title: Some P4 Recipes
nav: p4 recipes
date: 2020-05-08
---

## List files that are changed between repo and workspace

The standard perforce workflow is to checkout files (in a checklist,
and p4 makes them writable), modify them, and commit the changelist.
However, sometimes files are changed without notifying perforce,
such as edit and save by force. ``p4 diff`` usually compares only 
checked-out files, but ``-f`` forces to compare all files.

```sh
p4 diff -f //path/...
```

Other useful options are

|Options|Description|
|--------|-----------|
|-Od     |list only files that are changed|
|-f      |diff every file, opened and unopened|
||**display option**|
|-ds     |summary, i.e. list file name only|
|-db     |ignore whites changes|
|-dw     |ignore whites |
|-dl     |ignore line-ending|
||**select filter** (can't mix them)|
|-sa     |opened: changed or deleted |
|-sb     |opened: changed for integrate, resolved|
|-sr     |opened: unchanged |
|-sd     |unopened: deleted|
|-se     |unopened: changed |
|-sl     |unopened: every unopened files, with status of: same, diff, missing|


```sh

jzou@debian9:~/wks/stk$ p4 diff -f //stk/Trunk/extra/odemo/...
==== //stk/Trunk/extra/odemo/Makefile#4 - /home/jzou/wks/stk/extra/odemo/Makefile ====
==== //stk/Trunk/extra/odemo/odemo.cpp#2 - /home/jzou/wks/stk/extra/odemo/odemo.cpp ====
86a87
>         isIODBC = UStr::GetDefaultCodeUnitSize() == 4;
jzou@debian9:~/wks/stk$ 
jzou@debian9:~/wks/stk$ p4 diff -f -Od //stk/Trunk/extra/odemo/...
==== //stk/Trunk/extra/odemo/odemo.cpp#2 - /home/jzou/wks/stk/extra/odemo/odemo.cpp ====
86a87
>         isIODBC = UStr::GetDefaultCodeUnitSize() == 4;
jzou@debian9:~/wks/stk$ 
jzou@debian9:~/wks/stk$ 
jzou@debian9:~/wks/stk$ p4 diff -f -sa //stk/Trunk/extra/odemo/...
/home/jzou/wks/stk/extra/odemo/odemo.cpp
jzou@debian9:~/wks/stk$ 

```

## Checkout files into a changelist for editing

To checkout files, use ``p4 edit`` command

```sh
p4 edit -c 1234 //*/path/to/file

```

## List changelists

```sh
p4 changes [opts] [path]

    -s status         pending, shelved, submitted
    -c client
    -u user
    -e cl#            changelist above (include) cl#

```

## List files of a label

```sh
p4 file //*/prj/*/path/...@label
```
Note
* for efficiency, ``//*/path/...`` does not work
