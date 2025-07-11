---
title: Setup Git Upstream
nav: setup upstream
date: 2019-03-01
tags: [git, upstream]
---


# Create An Upstream Repo

There are two types of repositories:

* bare: repositories do not have a working copy and you can push to them, for example, repositories that you get in github. Bare repositories work as upstreams.
* non-bare: repositories that you are working on, with a working copy. Repositories that you clone or init are non-bare by default. You can't (by default) and shouldn't push to non-bare repos.

Note: technically, you can push to a non-bare repo (see below), but that is not a common practice.

You can create a repo as a bare repo, or convert a non-bare repo to bare.

## Create A Bare Repo
Initialize a bare repo

```bash
git init --bare
```

Clone a repo as a bare repo, which does not have a default remote _origin_ repo.
```bash
git clone --bare
```

## Convert A Non-bare Repo To Bare Repo
```bash
# delete any working copies if applicable
# e.g. rm -rf *
# and leave .git/ only
git config --bool core.bare true
```

# Start by Setting-up Upstream Repo
The common practice for a formal project is to initialize a upstream repo firstly.
Everyone (even you might be the only one) then clones it and pulls/pushes to it.

# Setup An Upstream Repo From An Existing Working Reop
In the real world, you probably often start a project locally by initializing a repo locally. After a bunch of commits, you decide to make it public. Now you need to setup an upstream repo from your existing working repo.

## Clone As Bare
```bash
git clone my-working-repo-url my-upstream-repo-name --bare
```

## Push To An Upstream
In case you own your upstream repo facility
```bash
git init --bare
```
Or you create a new repo from github.

Then set the new repo as the upstream repo of the working repo, and push to it.
```bash
git remote add my-upstream-name my-upstream-url
git push --set-upstream my-upstream-name master
```
