---
title: Shared Object and soname
date: 2019-09-26
tags: [dll, soname, shared]
---


## Useful command
* objdump - display information from object files
* nm - list symbols from object files

### objdump

|option|description|
|----|----|
|-p,--private-headers|needed for showing SONAME, dependencies, etc|
|-t,--syms|symbols|
|-C,--demangle|demangle C++ names|

## SONAME

SONAME is the 'logical' name of a shared object, which is saved in the target binary when it is linked with a .so file, i.e. the linker use ``libname.so`` to resolve ``-lname`` and write its soname in the target file. When the target is executed, the dl loader use the soname to locate the shared object.

Use this option to set soname for the linker
```bash
$(LD) -Wl,-soname,$(the_name) -o $@ $^ -lname
```
Note:
llvm linker uses different option name for this
```bash
# for clang/llvm
$(LD) -Wl,-install_name,$(the_name) -o $@ $^ -lname
```

Following is an example to show soname and dependencies of a shared object
```bash
$ objdump -p libzdm.so

libzdm.so:     file format elf64-x86-64

Program Header:
    LOAD off    0x0000000000000000 vaddr 0x0000000000000000 paddr 0x0000000000000000 align 2**21
         filesz 0x000000000000509c memsz 0x000000000000509c flags r-x
    LOAD off    0x0000000000005dd0 vaddr 0x0000000000205dd0 paddr 0x0000000000205dd0 align 2**21
         filesz 0x0000000000000250 memsz 0x0000000000000258 flags rw-
 DYNAMIC off    0x0000000000005de8 vaddr 0x0000000000205de8 paddr 0x0000000000205de8 align 2**3
         filesz 0x00000000000001f0 memsz 0x00000000000001f0 flags rw-
    NOTE off    0x00000000000001c8 vaddr 0x00000000000001c8 paddr 0x00000000000001c8 align 2**2
         filesz 0x0000000000000024 memsz 0x0000000000000024 flags r--
EH_FRAME off    0x0000000000003888 vaddr 0x0000000000003888 paddr 0x0000000000003888 align 2**2
         filesz 0x00000000000004d4 memsz 0x00000000000004d4 flags r--
   STACK off    0x0000000000000000 vaddr 0x0000000000000000 paddr 0x0000000000000000 align 2**4
         filesz 0x0000000000000000 memsz 0x0000000000000000 flags rw-
   RELRO off    0x0000000000005dd0 vaddr 0x0000000000205dd0 paddr 0x0000000000205dd0 align 2**0
         filesz 0x0000000000000230 memsz 0x0000000000000230 flags r--

Dynamic Section:
  NEEDED               libpthread.so.0
  NEEDED               libdl.so.2
  NEEDED               libstdc++.so.6
  NEEDED               libm.so.6
  NEEDED               libgcc_s.so.1
  NEEDED               libc.so.6
  SONAME               libodbc.so
  INIT                 0x0000000000002258
  FINI                 0x000000000000387c
  INIT_ARRAY           0x0000000000205dd0
  INIT_ARRAYSZ         0x0000000000000008
  FINI_ARRAY           0x0000000000205dd8
  FINI_ARRAYSZ         0x0000000000000008
  GNU_HASH             0x00000000000001f0
  STRTAB               0x0000000000001630
  SYMTAB               0x0000000000000700
  STRSZ                0x00000000000009fe
  SYMENT               0x0000000000000018
  PLTGOT               0x0000000000206000
  RELA                 0x0000000000002198
  RELASZ               0x00000000000000c0
  RELAENT              0x0000000000000018
  VERNEED              0x0000000000002178
  VERNEEDNUM           0x0000000000000001
  VERSYM               0x000000000000202e
  RELACOUNT            0x0000000000000003

Version References:
  required from libc.so.6:
    0x09691a75 0x00 02 GLIBC_2.2.5

```


Ref:

* [Shared Libraries](http://tldp.org/HOWTO/Program-Library-HOWTO/shared-libraries.html)
* [stackoverflow.com](https://stackoverflow.com/questions/12637841/what-is-the-soname-option-for-building-shared-libraries-for)


