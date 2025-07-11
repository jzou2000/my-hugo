---
title: tar
nav: tar
description: Some useful recipes for using tar
keywords: [tar, recipe]
---


Tar is often used to pack a group of files in a single package (and vice versa).

## Change Directory

```bash
-C, --directory=DIR
    Change  to  DIR  before performing any operations.  This option is order-sensitive, i.e. it affects all
    options that follow.
```
Use Case

We want to extract files to a directory other than the current folder
```bash
tar xf path/package.tar -C other-folder
```
Note: the order matters
```bash
tar -C other-folder xf package.tar
```
find package.tar at ``other-folder`` **and** extract to that folder.


## Strip Leading (Path) Components

```bash
# strip the first 3 components from file names on extraction
tar xf package.tar --strip-components=3
```

Use Case

Some packages contain long *extra* components in all file names, such as
```
centos7/gcc4_8/release32/...
```
and we want to strip that extra part on extracted files.

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

