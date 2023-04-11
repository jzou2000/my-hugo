---
title: Using Static and Shared Libraries Across Platforms
date: 2019-03-29
nav: static/shared libs
tags: [static, shared, library, platform]
---

[Using Static and Shared Libraries Across Platforms](http://www.fortran-2000.com/ArnaudRecipes/sharedlib.html)


## linker (ld) staticlly or dynamically

hpux
```bash
-a search       whether shared or archive libraries are searched with -l option
                search=archive|shared|archive_shared|shared_archive|default
                pass to aCC
                -Wl,-a,archive  -lmy_archive -Wl,-a,shared_archive
-b              create a shared library rather than a normal executable file
```


osx
```bash
-dylib          produce a mach-o shared library with file type MH_DYLIB
-search_dylibs_first
```

## tools

<div class='code'>
ldd    linux,solaris,hupx,aix
otool  osx
        otool -L file
</div>
