---
title: Build unixODBC from source
nav: build unixodbc
description: build unixodbc from source
---

## Get Source

The source of the latest unixODBC can be found on its [official website](http://www.unixodbc.org).
At the writing moment, the latest version is 2.3.9.

* get package from official site (you need the version number)
  ```sh
  wget http://www.unixodbc.org/unixODBC-2.3.6.tar.gz
  ```
* get from a git clone (tags start from 2.3.2)
  ```sh
  git clone https://github.com/lurcher/unixODBC.git
  ```
* earlier version, e.g. v2.3.1 can be found at [linuxfromscratch](http://www.linuxfromscratch.org/blfs/view/7.4/general/unixodbc.html)


## Build Script mkuo.sh

UnixODBC supports shadow-building, which means you can configure/build it from a folder other than its source.
Here are **standard** steps:
* configure. Use ``--srcdir=path/to/source`` to specify the source unless build from source (not recommended)
* make
* make install

Use following shell script to make life even easier:
* build for 32/64 bit
* debug/release target

```bash

#! /bin/bash

# Build unixODBC (release/debug 32/64) and pack them into tgz.
#
# The script generates the results and intermediates at
# the working folder, which can be different from the source.
# The source by default is .. (i.e. create a sub-folder
# under the source and build there unless -s is given)
#

OPTIND=1

ECHO=
S=..
E=
CFG_OPT=--disable-readline # many OLD systems don't have readline library


function build_bits()
{
  if [[ ! -z "$_32" ]]; then build $1 32; fi
  if [[ ! -z "$_64" ]]; then build $1 64; fi
}

function build()
{
  if [[ "$1" == "d" ]]; then
    g='-g'
  else
    g=
  fi
  $ECHO $S/configure --prefix=`pwd`/$1$2 ${CFG_OPT} CFLAGS="-m$2 $g"
  $ECHO make clean install
  $ECHO pushd $1$2
  $ECHO tar czvf ../unixODBC$E-$1$2.tgz *
  $ECHO popd
}

function show_help()
{
cat << EOF
Build unixODBC (for different configurations) and pack them into tgz.
Shadow build from a sub-directory under the source unless the source
directory is specified.

mkts [ options ]
    -h      help
    -y      dry
    -s      source directory (default is $S)
    -e      name suffix in the output tar (unixODBC\$e-\$cfg.tgz)
    -R      enable readline (disable by default)
    -a      all (32/64 release/debug)
    -3      32 bit only
    -6      64 bit only (default)
    -r      release only (default)
    -d      debug only
EOF
}


while getopts "h?yrd36aRs:e:" opt; do
    case "$opt" in
    h|\?)       show_help; exit 1;;
    y)          ECHO=echo;;
    s)          S=${OPTARG};;
    e)          E=${OPTARG};;
    R)          CFG_OPT=;;
    a)          _32=1
                _64=1
                _debug=1
                _release=1;;
    3)          _32=1;;
    6)          _64=1;;
    r)          _release=1;;
    d)          _debug=1;;
    *)  echo "unknown options"; exit 2;;
    esac
done
shift $((OPTIND-1))


if [[ -z "$_32" && -z "$_64" ]]; then _64=1; fi
if [[ -z "$_debug" && -z "$_release" ]]; then _release=1; fi

if [ ! -z "$_debug" ]; then
  build_bits d
fi
if [ ! -z "$_release" ]; then
  build_bits r
fi


```
