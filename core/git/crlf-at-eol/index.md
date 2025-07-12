---
title: CRLF at end of line in diff
nav: crlf-at-eol
description: let git diff ignore CRLF at eol
tags: git, diff
---

It is nasty to see ^M at end of each line, especially when they are in color.
![crlf-at-eol](crlf-at-eol.png)

Here is the solution.
```sh
$ git config --global core.whitespace cr-at-eol
```
* you don't need ``-w`` or ``--ignore-cr-at-eol`` if you just don't want let them visible and don't care the difference.
![crlf-at-eol-2](crlf-at-eol-2.png)

