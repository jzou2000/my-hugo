---
title: subprocess
nav: subprocess
weight: 100
---

``subprocess`` is a super-set and is intended to replace
* os.system
* os.spawn*

## Stdout and Exit Code

|method    | return | comment | description |
|----------|--------|---------|-------------|
|run(args,kwargs)|CompletedProcess object|since 3.5|run and wait for sub-process to complete, supercede followings|
|call(args,kwargs)|exit code |obsolete|equivalent to run().returncode|
|check_call(args, kwargs)|exit code|obsolete|similar to call(), raise ``CalledProcessError`` if exit-code non-zero|
|check_output(args, kwargs)|stdout in string|obsolete|similar to check_call except returning stdout as string instead of exit code|

Note
* All above methods block the **current** script, wait for the sub process to complete.

## Encoding

In python2, bytes and (ascii) characters are not distinguished, however in python3, if you don't specify the encoding in kwargs, the output (stdout and/or stderr) are byte-arrays, you have to decode them by yourself, which is not very interesting unless you have reasons.

```python
stdout_result = check_output(['my_app', 'args'], encoding='utf-8')
```

## Run Asynchronously

Using ``Popen`` method gives you flexibility to run sub-process asynchronously
* read stdout/stderr by setting them to subprocess.PIPE
* send data through stdin by calling communication
* create threads to feed stdin and/or fetch stdout/stderr or other tasks while the **main** script keep working

## Windows


### Signals

On Windows, the only supported signals are

* 
### procdump
