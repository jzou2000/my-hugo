---
title: Build 32bit Applications on 64bit Debian
date: 2019-03-18
nav: build 32-bit apps
tags: [debian, 64, 32]
---

On 64bit Debian system, default gcc/g++ development packages support developing 64bit application only. You need 32bit libs to build applications in 32bit.

```bash
sudo apt-get install g++-multilib

Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following additional packages will be installed:
  g++-6-multilib gcc-6-multilib gcc-multilib lib32asan3 lib32atomic1 lib32cilkrts5 lib32gcc-6-dev
  lib32gcc1 lib32gomp1 lib32itm1 lib32mpx2 lib32quadmath0 lib32stdc++-6-dev lib32stdc++6
  lib32ubsan0 libc-dev-bin libc6 libc6-dbg libc6-dev libc6-dev-i386 libc6-dev-x32 libc6-i386
  libc6-x32 libx32asan3 libx32atomic1 libx32cilkrts5 libx32gcc-6-dev libx32gcc1 libx32gomp1
  libx32itm1 libx32quadmath0 libx32stdc++-6-dev libx32stdc++6 libx32ubsan0 linux-libc-dev
Suggested packages:
  lib32stdc++6-6-dbg libx32stdc++6-6-dbg glibc-doc
The following NEW packages will be installed:
  g++-6-multilib g++-multilib gcc-6-multilib gcc-multilib lib32asan3 lib32atomic1 lib32cilkrts5
  lib32gcc-6-dev lib32gcc1 lib32gomp1 lib32itm1 lib32mpx2 lib32quadmath0 lib32stdc++-6-dev
  lib32stdc++6 lib32ubsan0 libc6-dev-i386 libc6-dev-x32 libc6-i386 libc6-x32 libx32asan3
  libx32atomic1 libx32cilkrts5 libx32gcc-6-dev libx32gcc1 libx32gomp1 libx32itm1 libx32quadmath0
  libx32stdc++-6-dev libx32stdc++6 libx32ubsan0
The following packages will be upgraded:
  libc-dev-bin libc6 libc6-dbg libc6-dev linux-libc-dev
5 upgraded, 31 newly installed, 0 to remove and 182 not upgraded.
Need to get 32.5 MB of archives.
After this operation, 84.3 MB of additional disk space will be used.
Do you want to continue? [Y/n] y
```

After multilib is installed, build your app with -m32 options for 32bit
```bash
g++ -o app32 -m32 app.cpp

```
