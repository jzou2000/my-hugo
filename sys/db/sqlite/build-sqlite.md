---
title: Build SQLite And SQLiteODBC From Source
date: 2019-09-17
nav: build from source
tags: [build, sqlite]
categories: [database, sqlite]
---

## Build SQLite

Get [source](https://www.sqlite.org) and show configurations

```bash
tar xzf sqlite.tar.gz
# source at ./sqlite
sqlite/configure -h

jzou@debian9:~/pkg/sqlite.build/m32$ ../../sqlite/configure -h
`configure' configures sqlite 3.29.0 to adapt to many kinds of systems.

Usage: ../../sqlite/configure [OPTION]... [VAR=VALUE]...

To assign environment variables (e.g., CC, CFLAGS...), specify them as
VAR=VALUE.  See below for descriptions of some of the useful variables.

Defaults for the options are specified in brackets.

Configuration:
  -h, --help              display this help and exit
      --help=short        display options specific to this package
      --help=recursive    display the short help of all the included packages
  -V, --version           display version information and exit
  -q, --quiet, --silent   do not print `checking ...' messages
      --cache-file=FILE   cache test results in FILE [disabled]
  -C, --config-cache      alias for `--cache-file=config.cache'
  -n, --no-create         do not create output files
      --srcdir=DIR        find the sources in DIR [configure dir or `..']

Installation directories:
  --prefix=PREFIX         install architecture-independent files in PREFIX
                          [/usr/local]
  --exec-prefix=EPREFIX   install architecture-dependent files in EPREFIX
                          [PREFIX]

By default, `make install' will install all the files in
`/usr/local/bin', `/usr/local/lib' etc.  You can specify
an installation prefix other than `/usr/local' using `--prefix',
for instance `--prefix=$HOME'.

For better control, use the options below.

Fine tuning of the installation directories:
  --bindir=DIR            user executables [EPREFIX/bin]
  --sbindir=DIR           system admin executables [EPREFIX/sbin]
  --libexecdir=DIR        program executables [EPREFIX/libexec]
  --sysconfdir=DIR        read-only single-machine data [PREFIX/etc]
  --sharedstatedir=DIR    modifiable architecture-independent data [PREFIX/com]
  --localstatedir=DIR     modifiable single-machine data [PREFIX/var]
  --libdir=DIR            object code libraries [EPREFIX/lib]
  --includedir=DIR        C header files [PREFIX/include]
  --oldincludedir=DIR     C header files for non-gcc [/usr/include]
  --datarootdir=DIR       read-only arch.-independent data root [PREFIX/share]
  --datadir=DIR           read-only architecture-independent data [DATAROOTDIR]
  --infodir=DIR           info documentation [DATAROOTDIR/info]
  --localedir=DIR         locale-dependent data [DATAROOTDIR/locale]
  --mandir=DIR            man documentation [DATAROOTDIR/man]
  --docdir=DIR            documentation root [DATAROOTDIR/doc/sqlite]
  --htmldir=DIR           html documentation [DOCDIR]
  --dvidir=DIR            dvi documentation [DOCDIR]
  --pdfdir=DIR            pdf documentation [DOCDIR]
  --psdir=DIR             ps documentation [DOCDIR]

System types:
  --build=BUILD     configure for building on BUILD [guessed]
  --host=HOST       cross-compile to build programs to run on HOST [BUILD]

Optional Features:
  --disable-option-checking  ignore unrecognized --enable/--with options
  --disable-FEATURE       do not include FEATURE (same as --enable-FEATURE=no)
  --enable-FEATURE[=ARG]  include FEATURE [ARG=yes]
  --enable-shared[=PKGS]  build shared libraries [default=yes]
  --enable-static[=PKGS]  build static libraries [default=yes]
  --enable-fast-install[=PKGS]
                          optimize for fast installation [default=yes]
  --disable-libtool-lock  avoid locking (might break parallel builds)
  --disable-largefile     omit support for large files
  --disable-threadsafe    Disable mutexing
  --enable-releasemode    Support libtool link to release mode
  --enable-tempstore      Use an in-ram database for temporary tables
                          (never,no,yes,always)
  --disable-tcl           do not build TCL extension
  --enable-editline       enable BSD editline support
  --disable-readline      disable readline support
  --enable-debug          enable debugging & verbose explain
  --disable-amalgamation  Disable the amalgamation and instead build all files
                          separately
  --disable-load-extension
                          Disable loading of external extensions
  --enable-memsys5        Enable MEMSYS5
  --enable-memsys3        Enable MEMSYS3
  --enable-fts3           Enable the FTS3 extension
  --enable-fts4           Enable the FTS4 extension
  --enable-fts5           Enable the FTS5 extension
  --enable-json1          Enable the JSON1 extension
  --enable-update-limit   Enable the UPDATE/DELETE LIMIT clause
  --enable-geopoly        Enable the GEOPOLY extension
  --enable-rtree          Enable the RTREE extension
  --enable-session        Enable the SESSION extension
  --enable-gcov           Enable coverage testing using gcov

Optional Packages:
  --with-PACKAGE[=ARG]    use PACKAGE [ARG=yes]
  --without-PACKAGE       do not use PACKAGE (same as --with-PACKAGE=no)
  --with-pic              try to use only PIC/non-PIC objects [default=use
                          both]
  --with-gnu-ld           assume the C compiler uses GNU ld [default=no]
  --with-tcl=DIR          directory containing tcl configuration
                          (tclConfig.sh)
  --with-readline-lib     specify readline library
  --with-readline-inc     specify readline include paths

Some influential environment variables:
  CC          C compiler command
  CFLAGS      C compiler flags
  LDFLAGS     linker flags, e.g. -L<lib dir> if you have libraries in a
              nonstandard directory <lib dir>
  LIBS        libraries to pass to the linker, e.g. -l<library>
  CPPFLAGS    (Objective) C/C++ preprocessor flags, e.g. -I<include dir> if
              you have headers in a nonstandard directory <include dir>
  CPP         C preprocessor
  TCLLIBDIR   Where to install tcl plugin

Use these variables to override the choices made by `configure' or to help
it to find libraries and programs with nonstandard names/locations.

Report bugs to the package provider.

```


Build 64-bit (default on 64bit system)

```bash
mkdir -p sqlite.build/x64
cd sqlite.build
P=`pwd`
cd x64

# don't create .so files
../../sqlite/configure --prefix=$P -disable-shared 
make
make install

```

Build 32-bit

```bash
cd $P
mkdir m32
cd m32
# there's no libreadline 32bits installed on my system

../../sqlite/configure --prefix=$P/32 --disable-shared --disable-readline CFLAGS=-m32
make
make install

```


## Build sqliteodbc

Notes:
* sqlite odbc driver relies on sqlite package. It can be built without sqlite at build time,
  the driver will load sqlite library at runtime.
* to ``embed`` sqlite into the driver, which makes the driver less dependent,
  specify the sqlite source code with ``--with-sqlite=path/to/sqlite/source``
* iodbc driver requires ``pthread``, however the configure script can't add it (it supposed to be
  able to do so by setting LIBS macro, a bug?), so add it (after ``-ldl``) in the generated ``Makefile``.
  * the driver can be built any way, however it assumes your applications are linked with ``-lpthread``,
    but even ``iodbctest`` from the driver manager doesn't.
* unfortunately, sqlite odbc driver doesn't support **shadow-build**,
  you have to build from source folder, which is not convenient if you want different builds,
  such as 32/64 or release/debug.

Get [source](http://www.ch-werner.de/sqliteodbc/) and configure. 

```bash
../../sqliteodbc-0.9996/configure -h
`configure' configures this package to adapt to many kinds of systems.

Usage: ../../sqliteodbc-0.9996/configure [OPTION]... [VAR=VALUE]...

To assign environment variables (e.g., CC, CFLAGS...), specify them as
VAR=VALUE.  See below for descriptions of some of the useful variables.

Defaults for the options are specified in brackets.

Configuration:
  -h, --help              display this help and exit
      --help=short        display options specific to this package
      --help=recursive    display the short help of all the included packages
  -V, --version           display version information and exit
  -q, --quiet, --silent   do not print `checking...' messages
      --cache-file=FILE   cache test results in FILE [disabled]
  -C, --config-cache      alias for `--cache-file=config.cache'
  -n, --no-create         do not create output files
      --srcdir=DIR        find the sources in DIR [configure dir or `..']

Installation directories:
  --prefix=PREFIX         install architecture-independent files in PREFIX
                          [/usr/local]
  --exec-prefix=EPREFIX   install architecture-dependent files in EPREFIX
                          [PREFIX]

By default, `make install' will install all the files in
`/usr/local/bin', `/usr/local/lib' etc.  You can specify
an installation prefix other than `/usr/local' using `--prefix',
for instance `--prefix=$HOME'.

For better control, use the options below.

Fine tuning of the installation directories:
  --bindir=DIR            user executables [EPREFIX/bin]
  --sbindir=DIR           system admin executables [EPREFIX/sbin]
  --libexecdir=DIR        program executables [EPREFIX/libexec]
  --sysconfdir=DIR        read-only single-machine data [PREFIX/etc]
  --sharedstatedir=DIR    modifiable architecture-independent data [PREFIX/com]
  --localstatedir=DIR     modifiable single-machine data [PREFIX/var]
  --libdir=DIR            object code libraries [EPREFIX/lib]
  --includedir=DIR        C header files [PREFIX/include]
  --oldincludedir=DIR     C header files for non-gcc [/usr/include]
  --datarootdir=DIR       read-only arch.-independent data root [PREFIX/share]
  --datadir=DIR           read-only architecture-independent data [DATAROOTDIR]
  --infodir=DIR           info documentation [DATAROOTDIR/info]
  --localedir=DIR         locale-dependent data [DATAROOTDIR/locale]
  --mandir=DIR            man documentation [DATAROOTDIR/man]
  --docdir=DIR            documentation root [DATAROOTDIR/doc/PACKAGE]
  --htmldir=DIR           html documentation [DOCDIR]
  --dvidir=DIR            dvi documentation [DOCDIR]
  --pdfdir=DIR            pdf documentation [DOCDIR]
  --psdir=DIR             ps documentation [DOCDIR]

System types:
  --build=BUILD     configure for building on BUILD [guessed]
  --host=HOST       cross-compile to build programs to run on HOST [BUILD]

Optional Features:
  --disable-option-checking  ignore unrecognized --enable/--with options
  --disable-FEATURE       do not include FEATURE (same as --enable-FEATURE=no)
  --enable-FEATURE[=ARG]  include FEATURE [ARG=yes]
  --enable-shared[=PKGS]  build shared libraries [default=yes]
  --enable-static[=PKGS]  build static libraries [default=yes]
  --enable-fast-install[=PKGS]
                          optimize for fast installation [default=yes]
  --disable-libtool-lock  avoid locking (might break parallel builds)
  --enable-winterface     make SQL*W() functions

Optional Packages:
  --with-PACKAGE[=ARG]    use PACKAGE [ARG=yes]
  --without-PACKAGE       do not use PACKAGE (same as --with-PACKAGE=no)
  --with-pic              try to use only PIC/non-PIC objects [default=use
                          both]
  --with-gnu-ld           assume the C compiler uses GNU ld [default=no]
  --with-sqlite=DIR       use SQLite header/lib from DIR
  --with-sqlite3=DIR      use SQLite3 hdr/lib from DIR
  --with-sqlite4=DIR      use SQLite4 hdr/src from DIR
  --with-libxml2=SCR      use xml2-config script SCR
  --with-odbc=DIR         use ODBC header/libs from DIR
  --with-dls              dlopen SQLite3/SQLite4 lib

Some influential environment variables:
  CC          C compiler command
  CFLAGS      C compiler flags
  LDFLAGS     linker flags, e.g. -L<lib dir> if you have libraries in a
              nonstandard directory <lib dir>
  LIBS        libraries to pass to the linker, e.g. -l<library>
  CPPFLAGS    C/C++/Objective C preprocessor flags, e.g. -I<include dir> if
              you have headers in a nonstandard directory <include dir>
  CPP         C preprocessor

Use these variables to override the choices made by `configure' or to help
it to find libraries and programs with nonstandard names/locations.

```


Build 32bit version for UnixODBC.

```bash
./configure --prefix=$HOME/pkg/sqliteodbc32 --with-odbc=$HOME/odbc/32/unixodbc --with-sqlite3=$HOME/pkg/sqlite.build/32s CFLAGS=-m32

# DON'T FORGET TO ADD -lpthread in Makefile
# ODBC_LIB =      -ldl  -lpthread
make

# the results locates at .libs
ls -l .libs
-rwxr-xr-x 1 jzou jzou 1120888 Sep 17 13:42 libsqlite3odbc-0.9996.so
-rw-r--r-- 1 jzou jzou  220248 Sep 17 13:42 libsqlite3odbc.a
lrwxrwxrwx 1 jzou jzou      20 Sep 17 13:42 libsqlite3odbc.la -> ../libsqlite3odbc.la
-rw-r--r-- 1 jzou jzou    1064 Sep 17 13:42 libsqlite3odbc.lai
lrwxrwxrwx 1 jzou jzou      24 Sep 17 13:42 libsqlite3odbc.so -> libsqlite3odbc-0.9996.so
-rw-r--r-- 1 jzou jzou  218588 Sep 17 13:42 sqlite3odbc.o

# surprisely, sqliteodbc depends on odbcinst
ldd libsqlite3odbc.so
    linux-gate.so.1 (0xf771e000)
    libodbcinst.so.2 => /mnt/huge/jzou/odbc/32/unixodbc/lib/libodbcinst.so.2 (0xf760b000)
    libdl.so.2 => /lib32/libdl.so.2 (0xf75e6000)
    libpthread.so.0 => /lib32/libpthread.so.0 (0xf75c9000)
    libc.so.6 => /lib32/libc.so.6 (0xf7411000)
    /lib/ld-linux.so.2 (0xf7720000)

```

Because the driver is DM dependent, let's build for iodbc

```bash
./configure --with-odbc=$HOME/odbc/32/iodbc --with-sqlite3=$HOME/pkg/sqlite.build/32s CFLAGS=-m32
make

ls -l .libs
-rwxr-xr-x 1 jzou jzou 1120668 Sep 17 15:02 libsqlite3odbc-0.9996.so
-rw-r--r-- 1 jzou jzou  216622 Sep 17 15:02 libsqlite3odbc.a
lrwxrwxrwx 1 jzou jzou      20 Sep 17 15:02 libsqlite3odbc.la -> ../libsqlite3odbc.la
-rw-r--r-- 1 jzou jzou    1084 Sep 17 15:02 libsqlite3odbc.lai
lrwxrwxrwx 1 jzou jzou      24 Sep 17 15:02 libsqlite3odbc.so -> libsqlite3odbc-0.9996.so
-rw-r--r-- 1 jzou jzou  215004 Sep 17 15:02 sqlite3odbc.o

ldd .libs/libsqlite3odbc.so
    linux-gate.so.1 (0xf7754000)
    libpthread.so.0 => /lib32/libpthread.so.0 (0xf761b000)
    libiodbcinst.so.2 => /mnt/huge/jzou/odbc/32/iodbc/lib/libiodbcinst.so.2 (0xf7603000)
    libdl.so.2 => /lib32/libdl.so.2 (0xf75fe000)
    libc.so.6 => /lib32/libc.so.6 (0xf7446000)
    /lib/ld-linux.so.2 (0xf7756000)


```

