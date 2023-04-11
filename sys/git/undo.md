---
title: Undo
nav: undo
---

## Undo modified file

```sh
$ git restore the_file
```

## Unstaging a stage file

```sh
$ git restore --staged the_file
```

## Update the latest commit

* commit too early
* modify commit description


```sh
$ git commit -m 'some description'
$ git add forgotten_files
$ git commit --amend
```
