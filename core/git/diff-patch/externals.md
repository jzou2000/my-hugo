---
title: External Tree
nav: externals
---

Sometimes we want to diff and patch an external tree, i.e. not in git, for example,
we have folked a repo, but we want to keep updated with the original repo.

* this is different from branch, which is in the same git repo.

We can use posix utility ``diff`` and ``patch`` to achieve the purpose.

1. Compare two trees (folders recursively) and generate patch file.
   The patch file is the command (explained by ``patch``) that convert ``.`` to ``$other_tree``
   ```sh
   diff -x '.git' --new-file -aur . $other_tree > ../to-be-other_tree.patch
   ```
   Options explain
   * ``-r`` recursively
   * ``-a`` treat all files as text
   * ``-u`` unified context, used by ``patch``
   * ``-x`` pattern to be ignored. We don't want to access ``.git`` bobs in two folders
   * ``--new-file`` treat missing file as empty, this will create files that exist only in ``$other_tree``
     and remove files that exist only in ``.``
2. Apply the patch file to the current folder
   ```sh
   patch -p0 < ../to-be-other_tree.patch
   ```
   option explain:
   * ``-p<num>, --strip=num`` Strip the smallest prefix containing num leading slashes
     from each file name found in the patch file.

Note:
* the patch file shouldn't be saved in the current folder