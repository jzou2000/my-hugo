---
title: Git Submodule
nav: submodule
date: 2019-04-17
tags: [git, submodule]
---

## Prepare Root Repo and Clone It

See details at [Push Excercise]({{<ref "push-ex.md">}})


## Add submodule
Delete and clone repo dave from adam

```bash
$ cd $REPO
$ rm -rf dave
$ git clone adam dave --bare
```

Remove dave from susan

```bash
$ cd $EX/susan
$ git remote remove origin
```


Add susan as submodule of dave

```bash
$ cd $EX
$ git clone $REPO/dave
$ cd dave
$ git submodule add $EX/susan susan
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   .gitmodules
	new file:   susan

$ ls
books  readme  susan
$ git commit -m 'add submodule susan'
[master 92389bf] add submodule susan
 2 files changed, 4 insertions(+)
 create mode 100644 .gitmodules
 create mode 160000 susan

$ git log
commit 92389bfbf3943e2f830f409d2c33197e17486ba7
Author: Jason Zou <jzou2000@gmail.com>
Date:   Mon Apr 15 17:35:11 2019 -0700

    add submodule susan

commit eb9ad62b26faf73c024e5c15b0b39bf68d82f7be
Author: Jason Zou <jzou2000@gmail.com>
Date:   Mon Apr 15 16:32:19 2019 -0700

    first commit


$ cd susan
$ git log
commit 23221f81f98add2a30527ead0ddbd04b67554ee0
Author: Jason Zou <jzou2000@gmail.com>
Date:   Mon Apr 15 16:51:19 2019 -0700

    susan 1st commit
```

## Get a Working Copy with Submodule

Another working folder of dave, which clone dave and all its submodules

```bash
$ cd $EX
$ git clone --recursive $REPO/dave dave2
```

Alternatively, you can update submodules manually

```bash
$ cd $EX
$ git clone $REPO/dave dave3
$ cd dave3/susan # the submodule folder is empty
$ git submodule update --init --recursive
```

## Update Submodule

Since the submodule is independent from the super-repo (that is why submodule is introduced),
the repo of submodule remote can be changed in 
* changed from the repo itself
* changed through super-repo

### Submoduel Repo Is Updated Alone

```bash
$ cd $EX/susan
$ cat >> memo  # append some lines
$ git add memo
$ git commit -m 'susan 2nd commit'
[master bfb0af0] susan 2nd commit
 1 file changed, 2 insertions(+)
jzou@debian9:~/codex/git/susan$ ls
log  memo

$ git log
commit bfb0af058256c07c600e90f5bf761ef4c9ceba4d
Author: Jason Zou <jzou2000@gmail.com>
Date:   Mon Apr 15 17:54:51 2019 -0700

    susan 2nd commit

commit 23221f81f98add2a30527ead0ddbd04b67554ee0
Author: Jason Zou <jzou2000@gmail.com>
Date:   Mon Apr 15 16:51:19 2019 -0700

    susan 1st commit

```

To reflect the change of the submodule repo, the super-project must pull the change

```bash
# switch to working folder of the submodule, pull the latest change from the repo
$ cd $EX/dave/susan
$ git pull
Updating 23221f8..bfb0af0
Fast-forward
 memo | 2 ++
 1 file changed, 2 insertions(+)

# show what is changed
$ git log
commit bfb0af058256c07c600e90f5bf761ef4c9ceba4d
Author: Jason Zou <jzou2000@gmail.com>
Date:   Mon Apr 15 17:54:51 2019 -0700

    susan 2nd commit

commit 23221f81f98add2a30527ead0ddbd04b67554ee0
Author: Jason Zou <jzou2000@gmail.com>
Date:   Mon Apr 15 16:51:19 2019 -0700

    susan 1st commit



# what is changed from the perspective of the super-project

jzou@debian9:~/codex/git/dave/susan$ cd ..
jzou@debian9:~/codex/git/dave$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   susan (new commits)

no changes added to commit (use "git add" and/or "git commit -a")



# stage/commit/push the super-project

jzou@debian9:~/codex/git/dave$ git add susan
jzou@debian9:~/codex/git/dave$ git commit -m 'update submodule susan'
[master 1dc86d9] update submodule susan
 1 file changed, 1 insertion(+), 1 deletion(-)
jzou@debian9:~/codex/git/dave$ git log
commit 1dc86d957e2ca9b15beebb551b8b9c2ed4d5d95b
Author: Jason Zou <jzou2000@gmail.com>
Date:   Wed Apr 17 12:45:43 2019 -0700

    update submodule susan

commit 92389bfbf3943e2f830f409d2c33197e17486ba7
Author: Jason Zou <jzou2000@gmail.com>
Date:   Mon Apr 15 17:35:11 2019 -0700

    add submodule susan

commit eb9ad62b26faf73c024e5c15b0b39bf68d82f7be
Author: Jason Zou <jzou2000@gmail.com>
Date:   Mon Apr 15 16:32:19 2019 -0700

    first commit
jzou@debian9:~/codex/git/dave$ git push
Counting objects: 2, done.
Delta compression using up to 2 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (2/2), 251 bytes | 0 bytes/s, done.
Total 2 (delta 1), reused 0 (delta 0)
To /home/jzou/codex/git/repo/dave
   92389bf..1dc86d9  master -> master

```

### Get Updates In A Working Copy

```bash
cd $EX/dave4
git pull
git submodule update
```

Here are the actual commands execution and outputs

```bash
jzou@debian9:~/codex/git/dave4$ git pull
remote: Counting objects: 2, done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 2 (delta 1), reused 0 (delta 0)
Unpacking objects: 100% (2/2), done.
From /home/jzou/codex/git/repo/dave
   92389bf..1dc86d9  master     -> origin/master
Updating 92389bf..1dc86d9
Fast-forward
 susan | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
jzou@debian9:~/codex/git/dave4$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   susan (new commits)

no changes added to commit (use "git add" and/or "git commit -a")
jzou@debian9:~/codex/git/dave4$ git log
commit 1dc86d957e2ca9b15beebb551b8b9c2ed4d5d95b
Author: Jason Zou <jzou2000@gmail.com>
Date:   Wed Apr 17 12:45:43 2019 -0700

    update submodule susan

commit 92389bfbf3943e2f830f409d2c33197e17486ba7
Author: Jason Zou <jzou2000@gmail.com>
Date:   Mon Apr 15 17:35:11 2019 -0700

    add submodule susan

commit eb9ad62b26faf73c024e5c15b0b39bf68d82f7be
Author: Jason Zou <jzou2000@gmail.com>
Date:   Mon Apr 15 16:32:19 2019 -0700

    first commit
jzou@debian9:~/codex/git/dave4$ git diff
diff --git a/susan b/susan
index bfb0af0..23221f8 160000
--- a/susan
+++ b/susan
@@ -1 +1 @@
-Subproject commit bfb0af058256c07c600e90f5bf761ef4c9ceba4d
+Subproject commit 23221f81f98add2a30527ead0ddbd04b67554ee0
jzou@debian9:~/codex/git/dave4$ git submodule update
Submodule path 'susan': checked out 'bfb0af058256c07c600e90f5bf761ef4c9ceba4d'
jzou@debian9:~/codex/git/dave4$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working tree clean
jzou@debian9:~/codex/git/dave4$ git log
commit 1dc86d957e2ca9b15beebb551b8b9c2ed4d5d95b
Author: Jason Zou <jzou2000@gmail.com>
Date:   Wed Apr 17 12:45:43 2019 -0700

    update submodule susan

commit 92389bfbf3943e2f830f409d2c33197e17486ba7
Author: Jason Zou <jzou2000@gmail.com>
Date:   Mon Apr 15 17:35:11 2019 -0700

    add submodule susan

commit eb9ad62b26faf73c024e5c15b0b39bf68d82f7be
Author: Jason Zou <jzou2000@gmail.com>
Date:   Mon Apr 15 16:32:19 2019 -0700

    first commit
jzou@debian9:~/codex/git/dave4$ cd susan
jzou@debian9:~/codex/git/dave4/susan$ ls
log  memo
jzou@debian9:~/codex/git/dave4/susan$ cat memo
My Memo

add one line.
jzou@debian9:~/codex/git/dave4/susan$ 

```