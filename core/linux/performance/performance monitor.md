---
title: Performance Monitors
nav: performance monitors
---

Ref:
* [The Geek Stuff - Performance Monitoring Toools](https://www.thegeekstuff.com/2011/12/linux-performance-monitoring-tools/)
* [Brendan's Linux Performance](https://www.brendangregg.com/linuxperf.html)

## WSL/ubuntu

``perf`` doesn't work after installing in WSL2/ubuntu.
```text
sudo apt install linux-oem-5.6-tools-common
perf

WARNING: perf not found for kernel 4.19.128-microsoft

  You may need to install the following packages for this specific kernel:
    linux-tools-4.19.128-microsoft-standard
    linux-cloud-tools-4.19.128-microsoft-standard

  You may also want to install one of the following packages to keep up to date:
    linux-tools-standard
    linux-cloud-tools-standard
```

No lucks to install ``linux-tools-4.19.128-microsoft-standard``, not build from [microsoft perf source](https://mirrors.edge.kernel.org/pub/linux/kernel/tools/perf).

One alternative from [stack overflow](https://stackoverflow.com/questions/60237123/is-there-any-method-to-run-perf-under-wsl) by installing
``linux-tools-generic`` and run from ``/usr/lib/linux-tools/5.4.0-84-generic/perf``


## Optimization Hints

* get the program work first
* work only on big-time-suckers (at least firstly). It's meaningless to improve 2ms of 2-minutes-run-app.

## Using gprof

Ref
* [TheGeekStuff](https://www.thegeekstuff.com/2012/08/gprof-tutorial/)
* [gprof quick start guide](https://web.eecs.umich.edu/~sugih/pointers/gprof_quick.html)

Steps
1. build the program using ``-pg`` option, both compiling and linking. This will instrument gprof performance count.
   * keep other flags unchanged, e.g. optimization flags, as you want to profile you program ``as it is``.
1. run the program as usual, this will generate a file ``gmon.out`` at the current folder.
1. run gprof tool to decode data
   ```sh
   gprof app [gmon.out] > result.txt
   ```
1. analyzing gprof output
   * flat profile
   * call graph

### gprof result

* -D option?

## OProfile

* operf
* opreport

## perf

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
