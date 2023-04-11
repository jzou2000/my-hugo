---
title: GMake Recipes
date: 2020-03-05
nav: gmake recipes
tags: [make, gmake, recipe]
weight: 11
---

## Check if two variables equal

Surprisingly, gmake doesn't have function to check to variables equal.
This guarentee works
```make
$(and $(findstring $a,$b),$(findstring $b,$a))
```
however, following solution works in most cases

```make
eq      = $(findstring __$1__,__$2__)
iseq    = $(if $(call eq,$1,$2),eq,ne)

a:=abc
b:=b
$(info [$a] $(call iseq,$a,$b) [$b])
a:=abc
b:=abc b
$(info [$a] $(call iseq,$a,$b) [$b])
a:=abc b
b:=abc b
$(info [$a] $(call iseq,$a,$b) [$b])

all: ;@:
```
Result
```sh
[abc] != [b]
[abc] != [abc b]
[abc b] == [abc b]
```

## Check if a variable in a list

Two functions can achieve this task:

* ``findstring`` returns the substring if exists
* ``filter`` returns matched word in the word-list.

``filter`` is more accurate.

```make
# in-list.mk

os   := osx10_15
set1 := Aosx10_15 osx10_14 osx10_13
set2 := osx10_15 osx10_14 osx10_13
set3 := windows solaris aix linux

$(info findstring)
$(info set1=$(findstring $(os), $(set1)))
$(info set2=$(findstring $(os), $(set2)))
$(info set3=$(findstring $(os), $(set3)))

$(info )
$(info filter)
$(info set1=$(filter $(os), $(set1)))
$(info set2=$(filter $(os), $(set2)))
$(info set3=$(filter $(os), $(set3)))

all: ; @:
```
The result
```sh
make -f in-list.mk
findstring
set1=osx10_15
set2=osx10_15
set3=

filter
set1=
set2=osx10_15
set3=
```

## If-else assignment

```make
# c expression: cflags += is_debug ? DEBUG : NODEBUG

CFLAGS += -D$(if $(is_debug),DEBUG,NODEBUG)
```

## Join list

Example usage is to build PATH from a list.

```make
_empty_ :=
_space_ := $(_empty_) $(_empty_)

# python expression: sep.join(list), e.g. ' '.join(['a', 'b', 'c'])
_join = $(strip $(subst $(_space_),$(2),$(strip $(1))))

a := a b   c

$(info sep=    [$(call _join,$a)])
b :=,
$(info sep=,   [$(call _join,$a,$b)])
$(info sep=:   [$(call _join,$a,:)])

all:;@:
```

The result is
```txt
sep=    [abc]
sep=,   [a,b,c]
sep=:   [a:b:c]
```

## Unique - Remove duplications in the list

Two temp variables are used: ``$_`` and ``$_t``.
``$_t`` is initialized as empty, for each element of the list, add the element ``$_`` in to ``$_t`` if it is not already in ``$_t``.

```make
define _unique
$(strip
  $(eval _t:=)
  $(foreach _,$(1),$(if $(filter $(_),$(_t)),,$(eval _t += $(_))))\
  $(_t)
)
endef

c := a.c b.cxx c.c a.c cc.h v.hpp cc.h b.c

$(info unique-c=[$(call _uniqueue,$(c))])

all:;@:

```

The result is:
```txt
unique-c=[a.c b.cxx c.c cc.h v.hpp b.c]
```

## Absolute path checking

You bet the string doesn't contain ____/

```make
$(findstring ____/,____$(1))
```


## Makefile that is invoked from the command-line and that directly import this file

Whenever gmake parses a makefile, it pushes the file into the array of **``$(MAKEFILE_LIST)``**.
When you invoke a command
```sh
gmake -f my-make-file
```
``my-make-file`` is the first element in the array **``$(MAKEFILE_LIST)``**, and every **``include``** command
push a new file into the list.

* ``$(firstword $(MAKEFILE_LIST))`` is the toplevel makefile, i.e. ``my-make-file``
* ``$(lastword $(MAKEFILE_LIST))`` is the file that directly includes the current file.

## absolute path of the makefile

```makefile
$(dir $(abspath $(firstword $(MAKEFILE_LIST))))
```

## convert comma(,) in a string into space( )

By converting commas into spaces, we can apply **``foreach``** command to iterate each element
```makefile
#
# convert comma (,) in a string into space ( )
#
# pass input string in variable str
#
# ex:
# make -f comma.mk str=' ut, core, name,file,,world '
str ?= ut, core, name,file,,world # default value

.comma :=    ,
s = $(strip $(subst $(.comma), ,$(str)))
$(info str=[$(str)])
$(info s=[$(s)])
$(foreach _,$s,$(info i=[$_]))

all:; @:
```

The result is
```sh
$ make -f comma.mk str=' ut, core, name,file,, '
str=[ut, core, name,file,, ]
s=[ut core name file]
i=[ut]
i=[core]
i=[name]
i=[file]```
