---
title: Branch Exercise 2
nav: branch ex2
---

## Topics
* branch and remote
* rebase
* merge

## Steps

## create an empty repo, clone and make initial commit.

```sh
$ export REPO=`pwd`/repo
$ mkdir -p $REPO
$ git init --bare $REPO/branch.git
$ git clone $REOP/branch.git
$ cd branch
$ git config --list --show-origin
file:/home/jasonz/.gitconfig    user.name=Jason Zou
file:/home/jasonz/.gitconfig    user.email=jason.zou@insightsoftware.com
file:/home/jasonz/.gitconfig    credential.helper=store
file:/home/jasonz/.gitconfig    core.whitespace=cr-at-eol
file:/home/jasonz/.gitconfig    core.editor=vim
file:.git/config        core.repositoryformatversion=0
file:.git/config        core.filemode=true
file:.git/config        core.bare=false
file:.git/config        core.logallrefupdates=true
file:.git/config        remote.origin.url=/home/jasonz/codex/git/repo/branch.git
file:.git/config        remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
file:.git/config        branch.master.remote=origin
file:.git/config        branch.master.merge=refs/heads/master
$ cat > quote.txt
To be, or not to be, that is the question:
$ git add .
$ git commit -m 'initial version'
$ git log
commit 181c8033e9aeab9bc8f4248a414b1bcfbbb61085 (HEAD -> master)
Author: Jason Zou <jason.zou@insightsoftware.com>
Date:   Fri Sep 15 14:38:31 2023 -0700

    initial version
$ git push
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 262 bytes | 262.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To /home/jasonz/codex/git/repo/branch.git
 * [new branch]      master -> master
```
* make a branch

## make a branch

### make a branch from remote
```sh
# make sure your local repo is updated
git fetch origin

# checkout branch-name
git chechout -b branch-name origin/branch-name 
```