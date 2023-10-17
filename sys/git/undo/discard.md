---
title: Discard After a Commit
nav: discard
---

If you want to **discard** all the changes you made after a certain commit, you can use the command
``git reset --hard`` with the commit ID. This will reset your current branch to the specified commit and **erase any later commits** from the history.

For example, if you want to revert to commit 0ad5a7a6, you can run:
```sh
git reset --hard 0ad5a7a6
```

Note:
* use with careful, it deletes **permanently**.
