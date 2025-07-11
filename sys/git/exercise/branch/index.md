---
title: branch exercise
nav: branch
---

1. initial version
   ```sh
   $ cat > sample.txt
   $ git add sample.txt
   $ git commit -m 'rev.1 init'
   $ git log --pretty=oneline
   3a17ac533446296fb5da502cebfab0a26e446fa7 (HEAD -> master) rev.1 init
   ```
1. make rev2
   ```sh
   $ cat >> sample.txt
   $ git add sample.txt
   $ git commit -m 'rev.2 add a line in sample.txt'
   $ git log --pretty=oneline
   7c69103c83abc5c22215bebf9ced9b3b43dd08ae (HEAD -> master) rev.2 add a line in sample.txt
   3a17ac533446296fb5da502cebfab0a26e446fa7 rev.1 init
   $ git log --pretty='%h %d %s'
   7c69103  (HEAD -> master) rev.2 add a line in sample.txt
   3a17ac5  rev.1 init
    ```
1. make a branch
   ```sh
   $ git checkout -b chinese
   Switched to a new branch 'chinese'
   $ git log --pretty='%h %d %s'
   7c69103  (HEAD -> chinese, master) rev.2 add a line in sample.txt
   3a17ac5  rev.1 init
   $ cat >> sample.txt
   $ cat sample.txt
   rev.1 init version
   rev.2 2nd version
   rev.3 汉字
   $ git add sample.txt
   $ git commit -m 'rev.3 in branch chinese'
   $ git log --pretty='%h %d %s'
   6be89ec  (HEAD -> chinese) rev.3 in branch chinese
   7c69103  (master) rev.2 add a line in sample.txt
   3a17ac5  rev.1 init
    ```
1. switch back to master
   ```sh
   $ git checkout master
   $ git log --pretty='%h %d %s'
   7c69103  (HEAD -> master) rev.2 add a line in sample.txt
   3a17ac5  rev.1 init
   $ cat sample.txt
   rev.1 init version
   rev.2 2nd version
   $ vim sample.txt
   $ cat sample.txt
   rev.1 init version
   rev.4 add a new line (no conflict)
   rev.2 2nd version
   rev.4 a new line conflicts with rev.3
   $ git commit -m 'rev.4 in master, 2 changes with one conflict with rev.3 in branch chinese'
   $ git log --pretty='%h %d %s' --graph
   * 63b80a9  (HEAD -> master) rev.4 in master, 2 changes with one conflict with rev.3 in branch chinese
   * 7c69103  rev.2 add a line in sample.txt
   * 3a17ac5  rev.1 init
   ```
1. optional: show diff between two branch
   ```sh
   $ git diff chinese master
   diff --git a/sample.txt b/sample.txt
   index fe486c1..1b34183 100644
   --- a/sample.txt
   +++ b/sample.txt
   @@ -1,3 +1,4 @@
    rev.1 init version
   +rev.4 add a new line (no conflict)
    rev.2 2nd version
   -rev.3 汉字
   +rev.4 a new line conflicts with rev.3
   ```
1. switch to branch chinese, show content, then back to master
   ```sh
   $ git checkout chinese
   $ git log --pretty='%h %d %s' --graph
   * 6be89ec  (HEAD -> chinese) rev.3 in branch chinese
   * 7c69103  rev.2 add a line in sample.txt
   * 3a17ac5  rev.1 init
   $ cat sample.txt
   rev.1 init version
   rev.2 2nd version
   rev.3 汉字
   $ git checkout master
   ```
1. merge with chinese
   ```sh
   $ git merge chinese
   Auto-merging sample.txt
   CONFLICT (content): Merge conflict in sample.txt
   Automatic merge failed; fix conflicts and then commit the result.
   $ git diff
   diff --cc sample.txt
   index 1b34183,fe486c1..0000000
   --- a/sample.txt
   +++ b/sample.txt
   @@@ -1,4 -1,3 +1,8 @@@
     rev.1 init version
    +rev.4 add a new line (no conflict)
     rev.2 2nd version
   ++<<<<<<< HEAD
    +rev.4 a new line conflicts with rev.3
   ++=======
   + rev.3 汉字
   ++>>>>>>> chinese
   $ # merge manually
   $ vim sample.txt
   $ git diff
   diff --cc sample.txt
   index 1b34183,fe486c1..0000000
   --- a/sample.txt
   +++ b/sample.txt
   @@@ -1,4 -1,3 +1,5 @@@
     rev.1 init version
    +rev.4 add a new line (no conflict)
     rev.2 2nd version
   - rev.4 a new line conflicts with rev.3
   + rev.3 汉字
   ++rev.4 a new line conflicts with rev.3, now move after rev.3
   $ git add sample.txt
   $ git commit -m 'merge branch chinese into master'
   $ git log --pretty='%h %d %s' --graph
   *   dc9233c  (HEAD -> master) merge branch chinese into master
   |\  
   | * 6be89ec  (chinese) rev.3 in branch chinese
   * | 63b80a9  rev.4 in master, 2 changes with one conflict with rev.3 in branch chinese
   |/  
   * 7c69103  rev.2 add a line in sample.txt
   * 3a17ac5  rev.1 init
   $ git checkout chinese
   Switched to branch 'chinese'
   jasonz@VANLWIN0056:~/codex/git$ git log --pretty='%h %d %s' --graph
   * 6be89ec  (HEAD -> chinese) rev.3 in branch chinese
   * 7c69103  rev.2 add a line in sample.txt
   * 3a17ac5  rev.1 init
   $ git checkout master
   ```
1. list branches
   ```sh
   $ git branch
     chinese
   * master
   ```
1. change branch name
   ```sh
   $ git branch --move old_name new_name
   ```
1. push to remote
   ```sh
   $ git push --set-upstream origin <branch-name>
   ```