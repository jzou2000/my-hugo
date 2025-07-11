---
title: Revert
nav: revert
---

If you want to undo a specific commit, but keep the later commits, you can use the ``git revert`` command with the commit ID. This will create a new commit that reverses the changes made by the original commit. For example, if you want to undo commit ``5798ee7c``, you can run:

```sh
git revert 5798ee7c
```

This will not affect the history of your branch, but it will add a new commit that undoes the previous one. You can also revert multiple commits by using a range of commit IDs.
