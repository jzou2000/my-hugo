---
title: files - list files
nav: files
---


## Basic Usage

```sh
p4 files <repo-path>/...[@filter]
```

## Examples in different scenarios

```sh

# tagged by a label, e.g. SnowflakeODBC_3.1.2
p4 files //depo/foo/...@SnowflakeODBC_3.1.2

# in a range of CL (change list), e.g. from 1234 to 1600
p4 files //depo/foo/...@1234,1600


# in a single CL, e.g. 1234
p4 files //depo/foo/...@1234,1234
# or
p4 files //depo/foo/...@=1234

# in a shelve, e.g. 1234
# note: there isn't such kind of "shelve range"
p4 files //depo/foo/...@=1234


# up to a CL, e.g. 12
p4 files //depo/foo/...@12


# all revisions of all repos that exists on Mar 10, 2011
p4 files @2011/03/10


# changed during an interval, e.g. 8am-5pm on Mar 31, 2011
p4 files @2011/03/31:08:00,@2011/03/31:17:00

```



