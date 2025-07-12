---
title: Get DM Information
nav: dm info
---

## unixODBC

```txt
nm libodbc.so
...
r id_string.1
...
t __info_as_string
t __find_lib_name
b single_lib_name


```
Note: all symbols are "local", i.e. not visible to other modules
* t: text
* b: bss (0 initialized)
* r: read-only

source
```txt
config.h
PACKAGE_NAME "unixODBC"
PACKAGE_STRING "unixODBC 2.3.8"
PACKAGE_VERSION "2.3.8"
```

