---
title: Push Exercise
nav: push exercise
date: 2019-04-15
tags: [git, push]
---

## Plan

```bash
export EX=~/codex/git
export REPO=$EX/repo
mkdir -p $REPO
```




## Setup Root Repo

```bash
$ cd $REPO
$ mkdir adam
$ cd adam
$ git init --bare

$ cd $EX
$ git clone $REPO/adam
$ # add something and make 1st commit
$ cat > readme
$ mkdir books
$ cat > books/chap1
$ git add readme books
$ git commit -m 'fist commit'

$ # push to repo
$ git push
```


## Create A clone of Root Repo

```bash
$ cd $REPO
$ git clone adam dave --bare
$ cd dave
$ git log
commit eb9ad62b26faf73c024e5c15b0b39bf68d82f7be
Author: Jason Zou <jzou2000@gmail.com>
Date:   Mon Apr 15 16:32:19 2019 -0700

    first commit

$ cd $EX
$ git clone dave

$ mkdir susan; cd susan
$ cat > memo # and type something
$ mkdir log
$ cat > log/syslog
$ git add memo log
$ git commit -m 'susan 1st commit'
$ git log
commit 23221f81f98add2a30527ead0ddbd04b67554ee0
Author: Jason Zou <jzou2000@gmail.com>
Date:   Mon Apr 15 16:51:19 2019 -0700

    susan 1st commit


```

Now push my work folder to the repo dave, -f (force) is used,
otherwise git denies to push because susan is not cloned from dave.

```bash
$ git remote add origin $REPO/dave
$ git remote -v
origin	/home/jzou/codex/git/repo/dave (fetch)
origin	/home/jzou/codex/git/repo/dave (push)
$ git push -f --set-upstream origin master
Counting objects: 5, done.
Delta compression using up to 2 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (5/5), 316 bytes | 0 bytes/s, done.
Total 5 (delta 0), reused 0 (delta 0)
To /home/jzou/codex/git/repo/dave
 + eb9ad62...23221f8 master -> master (forced update)
Branch master set up to track remote branch master from origin.

```

Now go back to repo dave

```bash
$ cd $REPO/dave
$ git log
commit 23221f81f98add2a30527ead0ddbd04b67554ee0
Author: Jason Zou <jzou2000@gmail.com>
Date:   Mon Apr 15 16:51:19 2019 -0700

    susan 1st commit
```
Notice that the original content is lost because -f is used to overwrite everything


