---
title: Recipes
nav: recipes
---


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

