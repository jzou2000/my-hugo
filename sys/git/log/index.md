---
title: log
nav: log
---

## common usage
```sh
git log --pretty='%h %d %s'
```
The most common options
|option |description|
|:-----|:----------------------|
|``--oneline``  |Shorthand for ``--pretty=oneline --abbrev-commit`` used together.|
|``--pretty`` |output format, e.g. ``--pretty='%h %d %s'``|
|``-5``       |latest 5 committs (i.e. first 5 committs in the log output)|
|``-p``       |generate patch|
|``--name-only``|list changed file name(s) for each commit|

## Recipes

### -graph 

This option adds a nice little ASCII graph showing your branch and merge history:

```sh
$ git log --oneline --graph
*   dc9233c (HEAD -> master) merge branch chinese into master
|\  
| * 6be89ec (chinese) rev.3 in branch chinese
* | 63b80a9 rev.4 in master, 2 changes with one conflict with rev.3 in branch chinese
|/  
* 7c69103 rev.2 add a line in sample.txt
* 3a17ac5 rev.1 init
```

### Limit Output

* by count
  * ``-<n>`` last **n** commits
* by time
  * ``--since`` and ``--until``
  * ``--since=2.weeks`` commits in the last 2 weeks
  * ``--until=2008-01-05`` commits until the date 2008-01-05
* a specified file
  ``git log -- /path/to/file``


### -S
``-S <string>``
Look for differences that change the number of occurrences of the specified string
(i.e. addition/deletion) in a file.

Similar options
* ``-G <regex>``
* ``--pickaxe-all`` When ``-S`` or ``-G`` finds a change, show all the changes in that changeset, not just the files that contain the change.
* ``--pickaxe-regex`` treat string in ``-S`` as extended regex.

### Interested part in a file

```
-L<start>,<end>:<file>
-L:<funcname>:<file>
  Trace the evolution of the line range given by <start>,<end>, or by the function name regex <funcname>, within the <file>.
```

### Revision Range

* ``rev1..rev2``

  revision from ``rev1`` (excluded) to ``rev2`` (included)

* ``rev^[n]``

  A suffix ^ to a revision parameter means the first parent of that commit object.
  
  ^n means the n-th parent.

* ``rev^..rev``

  show only ``rev``, i.e. between ``before rev`` to ``rev``

  equivalent to ``rev -1``
  

### Files changed

```sh
$ git log eeca^..eeca --raw
commit eeca68b5be45f23cbcfad086d890b8a50c172d27
Author: Jason Zou <jzou2000@gmail.com>
Date:   Tue Mar 1 13:25:12 2022 -0800

    mega upgrade to support dynamic encoding

    * odbc
      * common operators on extended odbc types
      * odbc_var - variant and its descentants (wrappers for all odbc types)
      * odbc traits
      * more odbc apis
    * tk
      * improved ustr
      * add generic buf
      * template to_string
    * mk
      * minor expression improvement
      * changet test dependencies

:100755 100755 bf016ce 2e091fc M        .gitignore
:100644 100644 042e33b 15fb616 M        extra/duk/Makefile
:100644 100644 a159178 c82ae9e M        extra/jso/Makefile
:100644 100644 e2a996f 3f33615 M        extra/mymod/Makefile
:100644 100644 ca72d9b 5c618df M        extra/odemo/Makefile
:100644 100644 b4d4638 a47b935 M        extra/odemo/odemo.cpp
:100644 100644 0cf25df 27251cf M        include/InfInt.h
:000000 100644 0000000 0e13111 A        include/buf.h
:100644 100644 e11372a e075b12 M        include/odbc/api.h
:100644 100644 681a6a1 e3c2a25 M        include/odbc/ctype.h
```

### Pretty Formats

* oneline
  ```
  <hash> <title line>
  ```
* short
  ```
  commit <hash>
  Author: <author>

  <title line>
  ```
* medium
  ```
  commit <hash>
  Author: <author>
  Date: <author date>

  <title line>

  <full commit text>
  ```
* format string
  * ``%n`` new line
  * ``%h`` abbreviated commit hash, ``%H`` commit hash
  * ``%an`` author name, ``%ad`` author date, ``%as`` author date short (YYYY-MM-DD)
  * ``%cn`` committer name, ...
  * ``%d`` ref name
  * ``%s`` subject
  * ``%b`` body

## Diff Format

