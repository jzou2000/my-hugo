---
title: Common Log Options
nav: options
---

|option           |description|
|:--------------  |:----------------------|
|``--oneline``    |Shorthand for ``--pretty=oneline --abbrev-commit`` used together.|
|``--pretty``     |output format, e.g. ``--pretty='%h %d %s'``|
|``-5``           |latest 5 committs (i.e. first 5 committs in the log output)|
|``-p``           |generate patch|
|``--name-only``  |list changed file name(s) for each commit|
|``--name-status``|not only names, but also their status, e.g. A-add, M-modify, D-delete|


## Examples

```sh
git log --pretty='%h %d %s'
```
