---
title: diff
nav: diff
---

Compare files or folders.

```sh
diff [OPTIONS] FILES
```

## Common Options

|option      |description |
|:-----------|:--------------|
|``-q,--brief``  |report only when files differ|
|``-u,--unified[=NUM]``|output unified context (used by ``patch``), with ``NUM`` (default 3) lines|
|``-y,--side-by-side``|output in two columns|
|``-r,--recursive``|recursively compare any subdirectories found|
|``-N,--new-file``|treat absent files as empty|
|``-a,--text``|treat all files as text|
|``--strip-trailing-cr``|strip trailing carriage return on input, useful on comparing files between linux and windows|
|

## Ignore Cases


|option      |description |
|:-----------|:--------------|
|``--suppress-blank-empty``||
|``-i,--ignore-case``|ignore cases differences in file contents|
|``-E,--ignore-tab-expansion``|ignore changes due to tab expansion|
|``-Z,--ignore-trailing-space``||
|``-b,--ignore-space-change``||
|``-w,--ignore-all-space``||
|``-B,--ignore-blank-lines``||
|``-I,--ignore-matching-lines=RE``|ignore changes where all lines match ``RE``|


## Less Common Options

|option      |description |
|:-----------|:--------------|
|``-n,--rcs``|RCS format diff|
|``-x,--exclude=PAT``|exclude files that match the pattern ``PAT``|
|``-X,--exclude-from=FILE``|exclude files that match any patterns in ``FILE``|
|``--from-file=FILE1``|define from files in FILE1|
|``--to-file=FILE2``|define to files in FILE1|
