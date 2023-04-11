---
title: .gitignore
nav: .gitignore
---

```txt
# this is a comment

# ignore build outputs
*.o
*.so
*.a
*.obj
*.pdb
*.dll
*.lib


# anything under folders anywhere that start with test and build
test*/
build*/

# anything start with dot, anywhere
.*

```

* blank lines are ignored
* comment: first non-white char is ``#``
* tailing whites are ignored unless quoted by backslash ``\``
* optional prefix ``!`` neglect pattern
* slash ``/`` is used as path separator
* a patten matches both files and directories, unless it ends with ``/``, which mathces directory only.
* wildcards ``*``, ``?`` and ``[a-zA-Z]`` act the same with glob, except ``/``
* ``**`` means anything (including zero)
  * leading ``**/`` matches all directories
  * trailing ``/**`` matches everything inside
  * middle ``a/**/b`` matches zero or any directories between ``a`` and ``b``


Pattern	Example matches	Explanation*
|pattern        |example matches             |explanation|
|:--------------|:---------------------------|:-----------------|
|``**/logs``    |logs/debug.log              |prepend a pattern with a double asterisk to match directories anywhere in the repository|
|               |logs/monday/foo.bar         ||
|               |build/logs/debug.log        ||
|``**/logs/debug.log``|logs/debug.log        |longer pattern|
|               |build/logs/debug.log        ||
|               |**not** logs/build/debug.log||
|``*.log``      |debug.log                   |glob ``*``|
|               |foo.log                     ||
|               |.log                        ||
|               |logs/debug.log              ||
|``*.log``      |                            |*.log **but not** important.log|
|``!important.log``|                         |exclude above pattern|
|``trace.log``  |important/trace.log         |re-enable trace.log|
|debug.log      |debug.log                   |files matche in any folders|
|               |logs/debug.log              ||
|debug[!01].log |debug2.log                  |``!`` except selections|
|``logs``       |logs                        |not ends with a slash: file or directory, snippet anywhere|
|               |logs/debug.log              ||
|               |logs/latest/foo.bar         ||
|               |build/logs                  ||
|               |build/logs/debug.log        ||
|logs/          |logs/debug.log              |ends with a slash, directory only (still any where)|
|               |logs/latest/foo.bar         ||
|               |build/logs/foo.bar          ||
|               |build/logs/latest/debug.log ||

Note:
* Due to a performance-related quirk in Git, you can not negate a file that is ignored due to a pattern matching a directory, so ``logs/important.log`` is still matched (ignored) in this example.
  ```txt
  logs/
  !logs/important.log
  ```
