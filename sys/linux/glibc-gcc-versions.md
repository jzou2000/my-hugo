---
title: Versions of Distros
nav: distros versions
---


## glibc and default gcc

|version     |code name   |release   |maintenance|kernel     |glibc    |gcc|comment|
|------------|------------|----------|-----------|-----------|---------|-------|-------|
|centos 5    |            |2007-04-12|2017-03|2.6.18-398 |2.5      |4.1.2  |5.11|
|centos 6    |            |2011-07-10|2020-11|2.6.32-754 |2.12     |4.4.7  |6.10|
|centos 7    |            |2014-07-07|2024-06|3.10.0-1160|2.17     |4.8.5  |7.9-2009|
|centos 8    |            |2019-09-24|2029-05|4.18.0-193 |2.28     |8.3.1  |8.2-2004|
|ubuntu 14.04|Trusty Tahr  |2014-04-17|2019-04|3.13       |         |       |        |
|ubuntu 16.04|Xenial Xerus |2016-04-21|2021-04|4.4        |         |       |        |
|ubuntu 18.04|Bionic Beaver|2018-04-26|2023-04|4.15       |         |       |        |
|ubuntu 20.04|Focal Fossa  |2020-04-23|2025-04|5.4        |         |       |        |
|debian 7    |Wheezy     |2013-05-04|2018-05|3.2        |         |       |        |
|debian 8    |Jessie     |2015-04-25|2020-06|3.16       |         |       |        |
|debian 9    |Stretch    |2017-06-17|2022-06|4.9        |         |       |        |
|debian 10   |Buster     |2019-07-06|2024   |4.19       |         |       |        |
|debian 11   |Bullseye   |2020-04-23|       |           |         |       |        |

Main features
* debian 7, Wheezy
  * UEFI
* debian 8, Jessie
  * systemd by default
  * arm64, ppc64le
* debian 9, Stretch
  * drop i586 (pentium), i686, ppc
* debian 10, Buster
  * UEFI secure boot

Just for fun, really old debians

|version     |code name   |release   |maintenance|kernel     |glibc    |gcc|comment|
|------------|------------|----------|-----------|-----------|---------|-------|-------|
|debian 1    |Buzz       |1996      |       |2.0        |         |       |        |
|debian 2    |Hamm       |1998      |       |2.0.34     |         |       |        |
|debian 3    |Woody      |2002      |       |2.2.20     |         |       |        |
|debian 4    |Etch       |2007      |       |2.6.18     |         |       |        |
|debian 5    |Lenny      |2009      |       |2.6.26     |         |       |        |
|debian 6    |Squeeze    |2011-02-06|2016-02|2.6.32     |         |       |        |

## get glibc version

```sh
ldd --version
```

Alternatively, check glibc that is used by the current bash
```sh
lsof -p $$ | grep libc
```

Using C program
```c
#include <stdio.h>
#include <stdlib.h>
#include <gnu/libc-version.h>

int main(int argc, char *argv[]) {
  printf("glibc version: %s\n", gnu_get_libc_version());
  return 0;
}
```
