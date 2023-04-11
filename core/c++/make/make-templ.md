---
title: A Makefile Template
nav: make template
description:
weight: 100
---

## Module Variables

|Variable    |Required| Default|Example  |Description                         |
|------------|--------|--------|---------|------------------------------------|
|NAME        |yes     |        |mymod    |name of module, target name is generated from the module name|
|BINNAME     |        |        |         |override the convention of target name, see below notes|
|TYPE        |yes     |        |lib      |bin, lib, so, (none)                |
|SRCS        |        |.       |         |directories that contain source code|
|SUBS        |        |        |         |list of sub modules                 |
|DEPENDS     |        |        |         |list of depends                     |
|DEFS        |        |        |-Djs     |compiler defines                    |
|LDEF        |        |        |-Dpic    |linker defines                      |
|INCS        |        |        |a/inc b/c|list of include paths, without -I leading|
|LIBS        |        |        |-labc    |list of libs with -l, include -L if needed|
|OBJS        |        |        |a.o v    |list of extra objects. If an item v is not ended with .o, expand to v/*.o |
|ROOT        |        |        |         |read-only, set by the template to path to the toplevel makefile |
|MKDEP_FLAGS |        |-MM     |         |compliler flags that generate depend file (.d) from source (.c,cxx)|
|INSTALL_INC |        |        |1        |install include/ (override by INSTALL_INC_DIR)|
|INSTALL_LIB |        |        |1        |install lib/ (override by INSTALL_LIB_DIR)|
|INSTALL_BIN |        |        |1        |install bin/ (override by INSTALL_BIN_DIR)|
|INSTALL_DAT |        |        |1        |install etc/ (override by INSTALL_DAT_DIR)|

Note

* SRCS automatically exclude include/, folders starting with . or _ or tmp.
* By default convention, the target name is set according to the module type
  * so - lib$(NAME).so
  * lib - lib$(NAME).a
  * bin - $(NAME)
* OBJ_EXTRA: extra .o files that are linked into the target. Some secenario are:
  * part of .o files from external depends
  * subs/depends are not libs/shared-objects
  * .o files are linked into the target even they are not explicitly referenced (e.g. referenced by static constructors)
* variables prefix:
  * OS_ OS level variables
  * EXT_ external resources
  * PRJ_ project level
  

## Defined Functions

|Function|Syntax                   |Description|
|--------|------------------------ |----------------------------------|
|_join   |call _join, list,sep     |join list by sep (default=:)|
|_relpath|call _replpath,list,base |return a list of base-relative path, base=ROOT|
|_pathname|call _pathname,list     |strip tailing / for each in list if applicable|
|_eq     |call _eq,v1,v2           |if v1 eques v2|
|_mkinc  |call _mkinc,list,base    |prepend base/ to list unless it is abspath, base=mod.root|
|_exclude|call _exclude,src,pattern|exclude pattern from src, both are lists|
|_unique |call _unique,list        |remove duplicated words in the list, without order change|
|_print  |call _print,val,title    |print val if not empty, title=|
|_vprint |call _vprint,val,title   |the same with _print, if VERBOSE|
|_println|call _println,list,title |print list, one line by each word|
|_vprintln|call _vprintln,list,title|the same with _println, if VERBOSE|
|_olist  |call _olist,list         |list .o files, expand to $v/*.o if $v is not ended by .o|
|_merge  |call _merge,name,dfl     |merge and unique: merge name with prefix OS_,EXT_,PRJ_|

