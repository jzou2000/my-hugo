---
title: Run glibc Applications on Alpine
date: 2019-03-28
tags: [docker, glibc, alpine]
nav: glibc + alpine
weight: 100
---

# The Problem

Alpine is musl-based, however most existing applications are glibc-based. Rebuilding everything with musl is an ideal and clean solution, but that be not practical (e.g. sources/dependencies are not availalbe) or not economical (e.g. not enough resources or in a tight schedule) or other reasons.

Let's face it, alpine/musl is good (size, security, ...) but we still need to run glibc-apps on alpine.

There are bunch of solutions already:

* custom built glibc for alpine - [alpine-pkg-glibc](https://github.comsgerrand/alpine-pkg-glibc)
* image with above glibc pre-installed - [frolvlad/alpine-glibc](https://hub.docker.com/r/frolvlad/alpine-glibc)
* [My Alpine Desktop - setting up for development](https://blog.overops.com/my-alpine-desktop-setting-up-a-software-development-environment-on-alpine-linux/)

# Analysis

An application binary needs following supports (beyond its own codes) for the kernel to load and execute:

* the loader, which is always linked with absolute path
* other shared-objects with relative path, seached from default path and LD_LIBRARY_PATH, such as
  * c libs
  * c++ libs
  * other libs such as libm, libdl, libpthread, etc

Here is ldd result of "hello" in c:

```bash
ldd hello
	linux-vdso.so.1 (0x00007fff74be3000)
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f5ea9cef000)
	/lib64/ld-linux-x86-64.so.2 (0x00007f5eaa290000)
```


Here is ldd result of "hello" in c++:

```bash
ldd hello-cpp
	linux-vdso.so.1 (0x00007ffd0ddfc000)
	libstdc++.so.6 => /usr/lib/x86_64-linux-gnu/libstdc++.so.6 (0x00007f43d679b000)
	libm.so.6 => /lib/x86_64-linux-gnu/libm.so.6 (0x00007f43d6497000)
	libgcc_s.so.1 => /lib/x86_64-linux-gnu/libgcc_s.so.1 (0x00007f43d6280000)
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f43d5ee1000)
	/lib64/ld-linux-x86-64.so.2 (0x00007f43d6b1d000)
```


In each case, the first entry is kernel-calls from vdso (virtual so from kernel), the last enty is the application loader, in between are libraries (dynamically) linked, explicitly or implicitly.

# The Solution

By putting glibc-based supporting libraries in the docker container, glibc-based applications can run from musl-based alpine containers.

* use ldd on _regular_ linux box to find out what libs are required
* put loader (the last one) in the container, at the exact path (usually /lib64 for 64-bit app or /lib for 32-bit app)
* put other libs (except vdso) in a folder in LD_LIBRARY_PATH
* launch the app

All libs can be passed to the container by either volumn, host-mount or adding to the docker image.

