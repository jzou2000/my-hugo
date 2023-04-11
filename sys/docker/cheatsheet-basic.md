---
title: Docker Cheatsheet - Basic
date: 2019-03-19
nav: cheatsheet - basic
tags: [docker, cheatsheet]
weight: 2
---

# Get Information

```bash
docker --version
docker info
docker images ls
docker container ls -all
```


# Container

```bash
docker run [OPTIONS] IMAGE [COMMAND] [ARGS...]

-d --detach

```

Most common options

|option|default|description|
|------|-------|-----------|
|-d, --detach||run in background|
|-e, --env||set environment varialbes, e.g. -e MYVAR=foo -e VAR1|
|--env-file||read env vars from a file|
|--expose||expose a port or a range of ports|
|-h,--hostname||container host name|
|-i,--interactive||keep stdin open even if not attached|
|-l,--label||set meta data on a container|
|--name||assign a name to the container|
|-p,--pulish||publish a container's port(s) to the host, e.g. -p 80:8080|
|-t,--tty||allocate a pseudo-tty|
|-v,--volume||bind mount a volume|
|-w,--workdir||working directory inside the container|


# Image

## Common Images

|tag|download|install|
|----|---:|---:|
|debian:9-slim|22m|55.3m|
|centos:6|70m|194m|


# Packages


## build older gcc from source

```bash
sudo apt build-dep gcc
wget https://ftp.gnu.org/gnu/gcc/gcc-4.8.5/gcc-4.8.5.tar.bz2
tar xaf gcc-4.8.5.tar.bz2
mkdir build
cd build
../gcc-4.8.5/configure --prefix=$HOME/gcc48 \
                       --enable-languages=c,c++ \
                       --disable-nls \
                       --disable-multilib
make -j$(nproc)
make install
```
