---
title: Tag
nav: tag
---

Before tag
```sh
$ git log --oneline
dc9233c (HEAD -> master) merge branch chinese into master
63b80a9 rev.4 in master, 2 changes with one conflict with rev.3 in branch chinese
6be89ec (chinese) rev.3 in branch chinese
7c69103 rev.2 add a line in sample.txt
3a17ac5 rev.1 init
```

## Make a tag at 7c691
```sh
$ git tag -a v.2 -m 'version 2' 7c691
$ git tag
v.2
$ git log --oneline --graph
*   dc9233c (HEAD -> master) merge branch chinese into master
|\  
| * 6be89ec (chinese) rev.3 in branch chinese
* | 63b80a9 rev.4 in master, 2 changes with one conflict with rev.3 in branch chinese
|/  
* 7c69103 (tag: v.2) rev.2 add a line in sample.txt
* 3a17ac5 rev.1 init
```
* without hash, tag is put at HEAD

## Show a tag
```sh
$ git show v.2
tag v.2
Tagger: Jason Zou <jzou2000@gmail.com>
Date:   Tue Jan 25 20:54:22 2022 -0800

version 2

commit 7c69103c83abc5c22215bebf9ced9b3b43dd08ae (tag: v.2)
Author: Jason Zou <jzou2000@gmail.com>
Date:   Thu Jan 20 16:42:28 2022 -0800

    rev.2 add a line in sample.txt

diff --git a/sample.txt b/sample.txt
index 467dc13..06efcc6 100644
--- a/sample.txt
+++ b/sample.txt
@@ -1 +1,2 @@
 rev.1 init version
+rev.2 2nd version
```

## Share a tag or tags

Push one tag ``v.2`` to remote
```sh
$ git push origin v.2
```

Push all tags
```sh
$ git push origin --tags
```

## Delete a tag

Delete a local tag
```sh
$ git tag -d <tag-name>
```

Delete a remote tag, two ways
```sh
$ git push origin :refs/tags/<tag-name>
```
or
```sh
$ git push origin --delete <tag-name>
```

## Checkout a tag

```sh
$ git checkout <tag-name>
```
