---
title: Show Commits That Touch A Path
nav: path
---


Without ``path`` arguments, ``git log`` command shows information of each commits
in sequence, with latest commit first.

```sh
git log <options>
```
where options can be use to pick the range of commits, the content of information
or format of dispaly.

If we add ``<path>`` argument, ``log`` shows commits that **touch** the ``<path>``.
The argument ``<path>`` can be a file or a directory.

```sh
git log <options> [--] <path>
```

### Common options

``-p``
: show file(s) diff, or patch as well


``--name-status``
: show changed file(s), make sense only if the path is a directory


``--full-diff``
: by default, ``-p`` option lets ``log`` shows only items that ``<path>`` includes,
with ``--full-diff``, ``log`` shows all files in each commits that touch ``<path>``.



