---
title: Using perf
nav: perf
---


Note:
WSL can't run (standard) perf, instead install ``linux-tools-generic``.

1. record sampling with call-graph
   ```sh
   export PERF=/usr/lib/linux-tools/5.4.0-84-generic/perf
   $PERF record -g app app-args
   ```
   the perf sampling data is saved in ``perf.data`` after the app terminates **normally**.
1. decode ``perf.data``
   ```sh
   $PERF report -U > result.txt
   ```
   ``-U`` ignores unknown (usually system calls) entries.
