---
title: pywin32
nav: pywin32
weight: 100
description: introduce pywin32 module
---

## Summary

* [website on github](https://github.com/mhammond/pywin32)
* [Online document](http://timgolden.me.uk/pywin32-docs/PyWin32.html)
* Install and Document

  ```bash
  pip install pywin32
  ```
* There is no ``pywin32`` actually (i.e. you can't import ``pywin32``), pywin32 package actually consists of a lot of modules, followings are the most common used
  * win32con - WIN32 constants that are used by many modules (strange enough that it is not mentioned in any documents)
  * win32api - general win32 APIs
  * win32process - process related APIs
  * win32event - event related APIs
  * more ...
* misc
  * since build 222, the home site is moved from sourceforge to github
  * build 228 is the last build that support python2 

## Example

Quite often, on Windows platform, we want to launch a process under ``procdump``, which is a utility in ``sysinternals`` that can generate minidump file at anytime, and especially when the process crashes.

In normal case of ``subprocess``, you get the process exit code by calling ``proc.wait()`` method. However it won't work if your target application is launched indirectly by ``procdump``, because ``proc.wait()`` returns the exit code of ``procdump``, not your application's. You have to get those information directly from Win32 APIs.

Code snippet that shows the usage of pywin32

```python {hl_lines=["3-5",19,20,26,27]}
import subprocess

import win32con      # win32 api constants
import win32api
import win32process

# ... some startup actions

cmd = ['procdump',
       '-e',                 # create mini-dump at uncaught execptions
       '-x', path_to_run,
       app_binary_pathname,
       *list_of_args
      ]
procdump_proc = subprocess.Popen(cmd, stdout=subprocess.PIPE) # need to get stdout, for fetching pid of launched app process
app_pid = get_pid_from_procdump_stdout(procdump_proc)  # see details in [subproess](subprocess#procdump)

# hopefully the app has not crashed/terminated so soon yet
app_process_handle = win32api.OpenProcess(
    win32con.PROCESS_QUERY_INFORMATION | win32con.PROCESS_VM_READ, False, app_pid)

# ... now the script and subprocess (procdump and app) are running asynchronously
# ... sometime later, the app terminates (including crashes)

# the handle is still valid (due to non-zero reference count)
app_exit_code = win32process.GetExitCodeProcess(app_process_handle)
win32api.CloseHandle(app_process_handle)


```
