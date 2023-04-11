---
title: grep
nav: grep
---


```sh
grep [OPTION] [PATTERN | -e PATTERN | -f FILE] FILES ...
```

Common options
|options       |description|
|:-------------|:---------------|
|-e RE         |usually used for multiple patterns, or when RE contains leading dash|
|-r            |recursively search|
|-E            |--extended-regexp|
|-P            |--perl-regexp (experimental)|
|-i            |--ignore-case|
|-v            |--invert-match|
|-f FILE       |read patterns from FILE|
|-n            |--line-number, add line-number of matched line(s) in output|
|-l            |list only name of files that contain the pattern|
|--include=GLOB|search only files that match the glob pattern|
|--exclude=GLOB|skip files that match the glob|
|--exclude-dir=DIR|skip dirs of pattern in recursive search|

Recipes
* search py files recursively from the current folder, find all lines that contain the pattern ``procdump``
  ```sh
  grep -r --include='*.py' procdump
  ```
* similar to above, but list only name of files, each name appears once.
  ```sh
  grep -r --include='*.py' -l procdump
  ```

