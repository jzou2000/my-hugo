---
title: Debugger
nav: debugger
date: 2019-05-27
tags: [debugger, dbx, gdb, lldb]
---


# IBM dbx

## Reference
* [IBM Knowledge Center: Using the dbx debug program](https://www.ibm.com/support/knowledgecenter/en/ssw_aix_72/com.ibm.aix.cmds2/dbx.htm)
* [DBX Howto Guide](https://edoras.sdsu.edu/doc/dbx.html)
* [Tutorial on Dbx (AIX)](http://delphiwww.cern.ch/~dellib/tutorial/node22.html)

## Syntax


```bash
dbx [options] objectFile [coreFile]

-a processID
-B debugFile, alternative debug file
-c commandFile, run dbx commands before reading stdin
-I directory, directories for searching source files
-E debugEnvironment
-p oldPath=newPath:...
-u
-F        , turn off lazy read mode
-L        , keep linkage symbols
-r        , run object file immediately and exit dbx if it ends successfully
-x        , (fortran) prevents from stripping trailing underscore
-v        , skip the validity checking
-C coreFile
```



## Subcommands

* use "help" to list all subcommands
* use "help command" to get usage details

This is just a list of most common subcommands

|command|description|
|:---|:---|
|/|search forward in current source file for pattern|
|?|search backward|
|assign|assign a value to variable|
|call|run code|
|catch|start trapping a signal|
|clear|remove all stops|
|condition|display condition variables|
|cont|continue execute|
|delete|remove traces/stops|
|disable|disable traces/stops|
|display memory|display memory contents|
|down|move down in stack|
|dump|display names and values of variables|
|enable|enable traces/stops|
|fd|display file descriptor|
|file|change current source file|
|frame|change current stack frame number|
|list|display lines of current source file|
|next|run next|
|print|print expression|
|quit|quit dbx|
|rerun|re-run|
|return|run until return|
|run|start to run application|
|sh|run shell|
|source|read dbx command from a file|
|step|run step|
|stop|stop running|
|thdata|display thread-specific data|
|thread|display and control threads|
|trace|print tracing info|
|up|move stack up|
|whatis|display the declaration|
|where|displays call stack|
|which|display full qualification of an identifier|


# Solaris Dbx

## Reference
* [Oracle Manual](https://docs.oracle.com/cd/E18659_01/html/821-1380/blawp.html)

## Common Commands
* run:
        run [args] [<input] [>output]
        attach pid
        next
        step
        cont [at 124]
        when at 123
* breakpoints:
        stop at
        when at
        trace at
* call stack:
        where [-f][-h][-l][-q][-v][_tno_]
        up [n]
        down [n]
* display:
        print
        display
        watch
        assign var=value
* runtime checking
* fix and continue
* threads:
    threads
        * event
        > current thread
        t@num thread-id
* signals



# get traceback (with thread)

## gdb (linux/hpux)

```bash
command-options:
-quiet    supress banner
-batch    exit after commands (list of -x command)
          gdb -batch -ex 'thread apply all bt' app core
--args    pass application command-line arguments
```

set logging file _file_
threads-related commands

* thread _tno_
* info threads
* thread apply [_tno_|all] _args_


## dbx/solaris

options:
-c cmds         execute commands before prompting
-s file         use as startup file (~/.dbxrc)

step 1:
```bash
    threads
        get ids of all thread

    dbx -qc 'threads;exit' app core > threads.txt

    pattern to get thread id
    ^\s+(t@\d+)
```

step 2:
```bash
    for each thread (id)
    thread id
    where -h -l -v
        -h hidden frame
        -l with library name
        -v verbose with line# and args
```
## dbx/aix

where all
    show back-traces of all threads

## lldb/osx

thread bracktrace all
bt all
