---
title: Shared Object Miscelleous
nav: shared object
date: 2019-10-07
tags: [share, object, debug, dll]
---

It is well known that ```LD_LIBRARY_PATY``` is used to specified the search paths for shared objects (dynamically loaded libraries, equivalent to DLL on Windows). However there are other environment varaibles that are also useful.

## LD_DEBUG

Let's say an application ```app``` will load some shared objects. Set ```LD_DEBUG=help``` shows the usage of this variable.

```bash
export LD_DEBUG=help
$ app
Valid options for the LD_DEBUG environment variable are:

  libs        display library search paths
  reloc       display relocation processing
  files       display progress for input file
  symbols     display symbol table processing
  bindings    display information about symbol binding
  versions    display version dependencies
  scopes      display scope information
  all         all previous options combined
  statistics  display relocation statistics
  unused      determined unused DSOs
  help        display this help message and exit

To direct the debugging output into a file instead of standard output
a filename can be specified using the LD_DEBUG_OUTPUT environment variable.
$
```

In the following example, the option ``files`` helps to trace the files of loading, which shows why jso.so fails to be loaded.

```bash
jzou@debian9:~/wks/stk/b$ export LD_DEBUG=files
jzou@debian9:~/wks/stk/b$ duk2 t.js
     14977:	
     14977:	WARNING: Unsupported flag value(s) of 0x8000000 in DT_FLAGS_1.
     14977:	
     14977:	file=libdl.so.2 [0];  needed by duk2 [0]
     14977:	file=libdl.so.2 [0];  generating link map
     14977:	  dynamic: 0x00007fa27211ed88  base: 0x00007fa271f1c000   size: 0x00000000002030f0
     14977:	    entry: 0x00007fa271f1cd80  phdr: 0x00007fa271f1c040  phnum:                  7
     14977:	
     14977:	
     14977:	file=libm.so.6 [0];  needed by duk2 [0]
     14977:	file=libm.so.6 [0];  generating link map
     14977:	  dynamic: 0x00007fa271f1ad88  base: 0x00007fa271c18000   size: 0x00000000003030e8
     14977:	    entry: 0x00007fa271c1d680  phdr: 0x00007fa271c18040  phnum:                  7
     14977:	
     14977:	
     14977:	file=libc.so.6 [0];  needed by duk2 [0]
     14977:	file=libc.so.6 [0];  generating link map
     14977:	  dynamic: 0x00007fa271c11ba0  base: 0x00007fa271879000   size: 0x000000000039e960
     14977:	    entry: 0x00007fa271899400  phdr: 0x00007fa271879040  phnum:                 10
     14977:	
     14977:	
     14977:	calling init: /lib/x86_64-linux-gnu/libc.so.6
     14977:	
     14977:	
     14977:	calling init: /lib/x86_64-linux-gnu/libm.so.6
     14977:	
     14977:	
     14977:	calling init: /lib/x86_64-linux-gnu/libdl.so.2
     14977:	
     14977:	
     14977:	initialize program: duk2
     14977:	
     14977:	
     14977:	transferring control: duk2
     14977:	
     14977:	
     14977:	file=jso.so [0];  dynamically loaded by duk2 [0]
     14977:	file=jso.so [0];  generating link map
     14977:	  dynamic: 0x00007fa2718719d8  base: 0x00007fa271516000   size: 0x00000000003621c8
     14977:	    entry: 0x00007fa2715a1140  phdr: 0x00007fa271516040  phnum:                  7
     14977:	
     14977:	
     14977:	file=libpthread.so.0 [0];  needed by /mnt/huge/jzou/wks/stk/b/jso.so [0]
     14977:	file=libpthread.so.0 [0];  generating link map
     14977:	  dynamic: 0x00007fa271510d50  base: 0x00007fa2712f9000   size: 0x000000000021c448
     14977:	    entry: 0x00007fa2712ff150  phdr: 0x00007fa2712f9040  phnum:                  9
     14977:	
     14977:	
     14977:	file=libodbc.so [0];  needed by /mnt/huge/jzou/wks/stk/b/jso.so [0]
     14977:	file=libodbc.so [0];  generating link map
     14977:	  dynamic: 0x00007fa272316100  base: 0x00007fa272195000   size: 0x0000000000189198
     14977:	    entry: 0x00007fa27219c080  phdr: 0x00007fa272195040  phnum:                  5
     14977:	
     14977:	
     14977:	file=libstdc++.so.6 [0];  needed by /mnt/huge/jzou/wks/stk/b/jso.so [0]
     14977:	file=libstdc++.so.6 [0];  generating link map
     14977:	  dynamic: 0x00007fa2712f1d48  base: 0x00007fa270f77000   size: 0x0000000000381260
     14977:	    entry: 0x00007fa2710027e0  phdr: 0x00007fa270f77040  phnum:                  8
     14977:	
     14977:	
     14977:	file=libgcc_s.so.1 [0];  needed by /mnt/huge/jzou/wks/stk/b/jso.so [0]
     14977:	file=libgcc_s.so.1 [0];  generating link map
     14977:	  dynamic: 0x00007fa270f75dd8  base: 0x00007fa270d60000   size: 0x0000000000216430
     14977:	    entry: 0x00007fa270d62a90  phdr: 0x00007fa270d60040  phnum:                  7
     14977:	
     14977:	/mnt/huge/jzou/wks/stk/b/jso.so: error: symbol lookup error: undefined symbol: _ZTVN14sbicu_58__sb6413UnicodeStringE (fatal)
     14977:	
     14977:	file=/mnt/huge/jzou/wks/stk/b/jso.so [0];  destroying link map
     14977:	
     14977:	file=/mnt/huge/jzou/odbc/unixodbc/lib/libodbc.so [0];  destroying link map
Catch: TypeError: module not found: jso
end
     14977:	
     14977:	calling fini: duk2 [0]
     14977:	
     14977:	
     14977:	calling fini: /lib/x86_64-linux-gnu/libdl.so.2 [0]
     14977:	
     14977:	
     14977:	calling fini: /lib/x86_64-linux-gnu/libm.so.6 [0]
     14977:	
jzou@debian9:~/wks/stk/b$ 
```
