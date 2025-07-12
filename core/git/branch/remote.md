---
title: Remote Branch
nav: remote branch
---

## Checkout from a remote branch

```sh
# git checkout -b <local-branch-name> <remote>/<remote-branch-name>
git checkout -b issue-312 origin/issue-312
```

* in common the remote repo is ``origin``, but it can be any remote repo
* local-branch-name can be different from remote-branch-name,
  but you should have reason to do so.


## Upload to a remote branch

```sh
# git push -u <remote> <remote-branch-name>
git push -u origin issu-312

# later
git push
```