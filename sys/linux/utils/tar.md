---
title: tar
nav: tar
description: Some useful recipes for using tar
keywords: [tar, recipe]
---


Tar is often used to pack a group of files in a single package (and vice versa).

## Choose only a subset of files

Tar has options to exclude files by pattern, but not
to include files. However it has an option that picks
files from a file, which can be either predefined
static file (manually edit or whatever) or generate dynamice by some powerful file picker such as ``find``.

Following example tar all xml files in the current folder.

```bash
find * -name '*.xml' | tar cvf my.tar --files-from -
```

Note:

* ``find`` generates a list of files to stdout
* ``tar`` picks files from specified file ``-``, or stdin, which is piped from ``find``.
* related options
  ```bash
  -T, --files-from=FILE
      get names from FILE
  -X, --exclude-from=FILE
      exclude patterns listed in FILE
  ```

