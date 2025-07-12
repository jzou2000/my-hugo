---
title: Restore
nav: restore
---

## Before Commit

If you modified a file or a path, which is not staged yet, and you want to restore it

```sh
$ git restore the_file
```

If the file is staged, you should first unstage it

```sh
$ git restore --staged the_file
```


## After Commit

If you want to **restore** a single file or a folder to an old version, you can use the ``git checkout`` command with the commit ID and the file or folder path. This will overwrite the current version of the file or folder with the old one.

For example, if you want to restore the file ``README.md`` to the version from commit ``0ad5a7a6``, you can run:

```sh
git checkout 0ad5a7a6 README.md
```

This will **not affect the history** of your branch, but it will change the **contents of your working directory**. You can then decide whether to commit or discard those changes.

