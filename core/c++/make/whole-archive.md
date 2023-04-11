---
title: link whole archive statically
---

## Why

By default, only objects that contain (directly) referenced symbols are extracted to the target executable (either an application or a shared object) from an archive by the linker. It is possible that required objects are not linked in some special cases, when they are not directly referenced but are invoked indirectly at runtime, such as:

* objects created by factory pattern.
* callbacks through pointers
* place-holders that will be invoked by applications (as a shared object) or external linked shared objects (as a host application)

## How

The linker has a pair of options to turn on/off the behavior of extracting the whole archive

* -Wl,--whole-archive
* -Wl,--no-whole-archive

If you don't want to include the whole archive, for example, you just want to include given symbols, you can use

```sh
 -u symbol
```

to the compiler/linker that the symbol is not referenced.

