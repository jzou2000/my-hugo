---
title: Debug Bash Script
nav: debug
---

## Use Bash Internal Command ``set``

|option|description|
|:-----|:----------|
|-v    |turn on verbose mode|
|-x    |print command before execute it|
|-o pipefail|check pipeline failure|

Tips:
* put ``set -x`` at head of the script to trace all commands
* wrap the interested section
  ```bash
  set -xv
  # interested section
  set +xv
  ```
* use in launch shell without modifying the target script
  ```bash
  bash -x script.sh
  ```

## Other Useful Tips

* insert ``echo`` at interested location to print info
* Use ``-n`` flag to check syntax without executing
  ```bash
  bash -n script.sh
  ```
* Use ``PS4`` to display line number
  ```bash
  PS4='$LINENO: '
  ```
* Use ``trap`` to trap signals
  ```bash
  trap "echo signal caught!" SIGINT SIGTERM
  ```

## Use bashdb

[bashdb](https://bashdb.sourceforge.net/) is a source-code debugger for bash that follows the gdb command syntax


## References

* [Maxat Akbanov - How to debug Bash scripts](https://brain2life.hashnode.dev/how-to-debug-bash-scripts)
* [FossLinux - 15 essential Bash debugging techniques and tools](https://www.fosslinux.com/104144/essential-bash-debugging-techniques-and-tools.htm)
