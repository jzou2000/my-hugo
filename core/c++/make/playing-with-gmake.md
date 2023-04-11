---
title: Playing With GNUMake
nav: playground
date: 2019-09-26
tags: [playground, gnu, make, gmake]
weight: 10
---

## and

```makefile
# test $(and c1,c2,c3,...N)
# return N or '' if any of them is empty
#
# e.g.
# make -f and.mk A=a B=b C=

result = $(and $(A),$(B),$(C))
$(info result=$(result))
all:;@:
```

```sh
$ make -f and.mk A=a
result=
$ make -f and.mk A=a B=b
result=
$ make -f and.mk A=a B=b C=c
result=c
$ make -f and.mk B=b C=c
result=
$
```

## or - fallbacks

```makefile
# test $(or c1,c2,c3,...N)
# return '' or the first non-empty
#
# e.g.
# make -f and.mk A=a B=b C=

result = $(or $(A),$(B),$(C))
$(info result=$(result))
all:;@:
```

```sh
$ make -f or.mk A=a B=b C=
result=a
$ make -f or.mk B=b C=
result=b
$ make -f or.mk
result=
```

A common usage of **``or``** function is to assgin value with ordered fallbacks

```makefile

# $or short-cut return when anyone is not empty
#     or return empty if all are empty
#
# it can be used to offer fallback values in order
#
$(info set icu.dir if ICU_DIR or T3_DIR/icu or error)
icu.dir  := $(or $(ICU_DIR),\
                 $(or $(T3_DIR),$(error T3_DIR not defined))/icu)

$(info icu.dir=$(icu.dir))

all: ; @echo icu=$(icu.dir)
```

## filter

```makefile
# Return matched token(s) that match one of patterns
#
# e.g.
# make -f filter.mk A=Univeral

result := $(filter universal Universal,$(A))
$(info result=$(result))
all: ; @:
```

```sh
$ make -f filter.mk A=Universal
result=Universal
$ make -f filter.mk A=universal
result=universal
$ make -f filter.mk A='universal solar Universal'
result=universal Universal
$ make -f filter.mk A='niversal solar Universals'
result=
```

## findstring

```make
# Return substring if it is found
#
# e.g.
# make -f findstring.mk A=osx11

result := $(findstring osx,$(A))
$(info result=$(result))
all: ; @:
```

```sh
$ make -f findstring.mk A='osx11'
result=osx
$ make -f findstring.mk A='apple osx11'
result=osx
$ make -f findstring.mk A='apple fosx11'
result=osx
$ make -f findstring.mk A='apple fsx11'
result=
```

## special variables

```makefile
$(info some special variables)

$(info MAKEFILES=$(MAKEFILES))
$(info MAKELEVEL=$(MAKELEVEL))

# whenever a makefile is parsing (such as include),
# it is appended into MAKEFILE_LIST array
$(info MAKEFILE_LIST=$(MAKEFILE_LIST))

$(info .DEFAULT_GOAL=$(.DEFAULT_GOAL))

# used to include other makefile,
# however changing it won't affect include in CURRENT file
$(info .INCLUDE_DIRS=$(.INCLUDE_DIRS))

# list of (current) variable names when it is invoked
$(info .VARIABLES=$(.VARIABLES))

all: ; @:
```

```sh
$ make -f special-var.mk
some special variables
MAKEFILES=
MAKELEVEL=0
MAKEFILE_LIST= special-var.mk
.DEFAULT_GOAL=
.INCLUDE_DIRS=/usr/include /usr/local/include /usr/include
.VARIABLES=<D ?F WSLENV .SHELLFLAGS CWEAVE NVM_INC ?D @D @F CURDIR SHELL RM CO _ PREPROCESS.F LINK.m LINK.o OUTPUT_OPTION COMPILE.cpp MAKEFILE_LIST GNUMAKEFLAGS LINK.p XDG_DATA_DIRS CC CHECKOUT,v CPP LINK.cc P4CLIENT MAKE_HOST PATH LD TEXI2DVI YACC COMPILE.mod ARFLAGS LINK.r LINT COMPILE.f LINT.c YACC.m NVM_BIN YACC.y AR .FEATURES TANGLE GET %F DISPLAY COMPILE.F CTANGLE .LIBPATTERNS LINK.C PWD .LOADED LINK.S PREPROCESS.r WSL_INTEROP LINK.c WT_SESSION LINK.s HOME P4USER LOGNAME NVM_CD_FLAGS P4BIN ^D MAKELEVEL COMPILE.m MAKE SHLVL AS PREPROCESS.S COMPILE.p MAKE_VERSION USER FC .DEFAULT_GOAL NAME %D WEAVE MAKE_COMMAND LINK.cpp F77 OLDPWD .VARIABLES PC *F COMPILE.def LEX MAKEFLAGS MFLAGS *D NVM_DIR LEX.l LEX.m +D COMPILE.r MAKE_TERMOUT +F M2C WT_PROFILE_ID MAKEFILES COMPILE.cc <F CXX COFLAGS COMPILE.C HOSTTYPE ^F COMPILE.S LINK.F SUFFIXES COMPILE.c COMPILE.s .INCLUDE_DIRS .RECIPEPREFIX MAKEINFO MAKE_TERMERR OBJC TEX LANG TERM F77FLAGS P4PORT LINK.f WSL_DISTRO_NAME WINHOST
```

## dot variable, export variables, import and sub-make

var-include.mk
```make
# include a snippet, variables defined there can be accessed here

$(info include two files, variables are passed between includes)
include var-dot.mk
include var-inc2.mk

$(info main)
$(info $(empty)    is.local=$(is.local))
$(info $(empty)    NAME=$(NAME))

$(info then call $(MAKE) to check what are exported and passed)
$(info $(empty))

all: sub;@:
sub: ; $(MAKE) -f var-sub.mk
```

var-dot.mk
```make
# variables defined here are "local"
# they can't be exported because there are illegal characters, e.g. dot

is.local := not-exported
NAME     := name-exported
empty    :=

$(info $(empty)    var-dot.mk     is.local=$(is.local), NAME=$(NAME))
$(info $(empty)                   all variables are exported)

export
```

var-inc2.mk
```make
# this file is included after var-dot.mk
# let's see what is available

$(info $(empty)    var-inc2.mk    is.local=$(is.local), NAME=$(NAME))
```

var-sub.mk
```make
# a sub-make that can't access local vars in parent

$(info this is a sub-make, i.e. invoking make in a makefile)
$(info variables with dot in name can't be exported and passed)
$(info sub make is.local=$(is.local))
$(info sub make NAME=$(NAME))
all:;@:          
```

The result is
```sh
$ make -f var-include.mk
include two files, variables are passed between includes
    var-dot.mk     is.local=not-exported, NAME=name-exported
                   all variables are exported
    var-inc2.mk    is.local=not-exported, NAME=name-exported
main
    is.local=not-exported
    NAME=name-exported
then call make to check what are exported and passed

make -f var-sub.mk
make[1]: Entering directory '/home/jasonz/codex/mk'
this is a sub-make, i.e. invoking make in a makefile
variables with dot in name can't be exported and passed
sub make is.local=
sub make NAME=name-exported
make[1]: Leaving directory '/home/jasonz/codex/mk'
$
```

## var - not set or empty

```make
# test two way of setting default value
#    v ?= v2                v:=v2 only when v is not set
#    v := $(or v1,v2)       v:=v2 when v1 is not set or v1 is empty
#
# e.g.
#                               # A                    B
# make -f var.mk                # unixodbc-2.3.1       iodbc-3.52.15
# A= make -f var.mk             #                      iodbc-3.52.15
# A=abc make -f var.mk          # abc                  iodbc-3.52.15
# B= make -f var.mk             # unixodbc-2.3.1       iodbc-3.52.15
# B=abc make -f var.mk          # unixodbc-2.3.1       abc

A  ?= unixodbc-2.3.1
$(info A=$(A))
B := $(or $(B),iodbc-3.52.15)
$(info B=$(B))
all:;@:
```

```sh
$ make -f var.mk
A=unixodbc-2.3.1
B=iodbc-3.52.15
$ A= B= make -f var.mk
A=
B=iodbc-3.52.15
$ A=iodbc B=unixodbc make -f var.mk
A=iodbc
B=unixodbc
```
