---
title: Make Toolchains with Docker
date: 2019-03-19
nav: make toolchains with docker
tags: [docker, cheatsheet, develop, toolchain, gcc44]
weight: 50
---

## Task Requirement

We need a centos5 container with following packages:
* gcc44 and g++44 that can build both 64 and 32 bit app
* python2.7 with PyYAML module
* perl 5.8+

## Tips

* The latest open-ssl (e.g. v1.1.1 at write time) is not supported by old distro (e.g. centos5), so it is wise to download (src) modules into the working folder before running docker build instead of doing so in Dockerfile if openssl is used (e.g. by curl).
* Instead of invoking ``yum install`` in docker file to pull packages from online repository, it is better to download all required rpm and use ``yum localinstall`` to install from rpm files. This is espetially benefitial if we need to run docker builder multiple times (e.g. debugging or for different configurations).
* Docker command ``ADD`` expends tar/gz files automatically, so **DO NOT** run ``tar`` or ``ungzip`` to extract archieves.

## Download required packages

1. Prepare a repo file ``CentOS-Vault.repo`` that points to the vault-repo (centos5 has retired from the standard repo)
1. Run docker command to launch a centos:5 container
   ```bash
   docker run -it --rm -v `pwd`:/x -e UID=`id -u` GID=`id -g` centos:5
   ```
1. In the container, run script ``/x/get-rpm.sh`` to download required packages
1. In the host, get python2.7 source (the latest openssl is not supported by centos5)
   ```sh
   curl https://www.python.org/ftp/python/2.7.18/Python-2.7.18.tgz -o Python-2.7.18.tgz
   ```
1. (optional) get [PyYAML-5.3.1.tar.gz](https://pyyaml.org/download/pyyaml/PyYAML-5.3.1.tar.gz) (later versions drop supports for Python2) source
   * latest pip stops support of python2

```ini
# CentOS-Vault.repo
#
# The mirror system uses the connecting IP address of the client and the
# update status of each mirror to pick mirrors that are updated to and
# geographically close to the client.  You should use this for CentOS updates
# unless you are manually picking other mirrors.
#
#

#---- Packages previously released as 5.10, and its updates
[base]
name=CentOS-$releasever - Base
baseurl=http://vault.centos.org/5.11/os/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-5

[updates]
name=CentOS-$releasever - Updates
baseurl=http://vault.centos.org/5.11/updates/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-5

[extras]
name=CentOS-$releasever - Extras
baseurl=http://vault.centos.org/5.11/extras/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-5
```



In the container, run ``/x/get-rpm.sh``

```bash
# Download all rpm required to build agent5
#
# run in a container from centos:5
# with CentOS-Vault.repo at cwd

repo="/etc/yum.repos.d/CentOS-[a-zA-UW-Z]*.repo /etc/yum.repos.d/lib*.repo"
cp CentOS-Vault.repo /etc/yum.repos.d/
rm -f /etc/yum.repos.d/CentOS-[a-zA-UW-Z]*.repo /etc/yum.repos.d/lib*.repo \
  && yum -y update \
  && yum -y downgrade libselinux \
  && yum -y install yum-utils

cc="gcc44 gcc44-c++ glibc-devel libstdc++44-devel libgcc.i386 glibc-devel.i386 libstdc++44-devel.i386"
devel="zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel gdbm-devel libpcap-devel xz-devel expat-devel"
util="m4 make which perl"

cd /x
yumdownloader --resolve $cc $devel $util

# change owner/group if wished
chown $UID *.rpm
chgrp $GID *.rpm
```


## Build docker image ``agent5``

```docker
FROM centos:5

WORKDIR /home

COPY CentOS-Vault.repo /etc/yum.repos.d/
ADD Python-2.7.18.tgz PyYAML-5.3.1.tar.gz *.rpm /home/
RUN rm -f /etc/yum.repos.d/CentOS-[a-zA-UW-Z]*.repo /etc/yum.repos.d/lib*.repo \
  && yum -y update \
  && yum -y downgrade libselinux \
  && yum -y localinstall *.rpm \
  && cd Python-2.7.18 \
  && ./configure --enable-optimizations CC=gcc44 \
  && make altinstall \
  && cd ../PyYAML-* \
  && python2.7 setup.py install \
  && cd .. \
  && rm -rf *

ENTRYPOINT [ "/bin/bash" ]
```

In the folder that contains above ``Dockerfile`` and all required rpm and source packages, run following build command

```sh
docker build -t agent5 .
```
The whole building time is about 190 seconds, including about 40 seconds to install all rpms, on Windows 10 WSL with i7@1.9Ghz, 32G RAM.

Here is the buil result
```sh
$ docker images
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
agent5       latest    de71db7d7f59   1 minute ago   760MB
node         alpine    65db8a8f7b03   6 days ago     112MB
centos       5         1ae98b2c895d   4 years ago    285MB
```

## Build ``agent6`` from CentOS6

CentOS6 is still supported in the valid repo with following changes
* glibc version is updated
* gcc 4.4.7 is the default devel package
* python version 2.6.6

so we don't need to replace vault-repo and only need to add devel packages for 32 bits. Others steps are the same with centos:5

```bash
# Download all rpm required to build agent5
#
# run in a container from centos:5
# with CentOS-Vault.repo at cwd

yum -y update \
  && yum -y downgrade libselinux \
  && yum -y install yum-utils

cc="gcc-c++ glibc-devel libstdc++-devel glibc-devel.i686 libstdc++-devel.i686"
devel="zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel gdbm-devel libpcap-devel xz-devel expat-devel"
util="m4 make which perl"
# debian
#  apt-get install g++-multilib libc6-dev-i686

cd /x
yumdownloader --resolve $cc $devel $util

# change owner/group if wished
chown $UID *.rpm
chgrp $GID *.rpm
```

```docker
FROM centos:6

WORKDIR /home

ADD Python-2.7.18.tgz PyYAML-5.3.1.tar.gz *.rpm /home/
RUN yum -y update \
  && yum -y downgrade libselinux \
  && yum -y localinstall *.rpm \
  && cd Python-2.7.18 \
  && ./configure --enable-optimizations \
  && make altinstall \
  && cd ../PyYAML-* \
  && python2.7 setup.py install \
  && cd .. \
  && rm -rf *

ENTRYPOINT [ "/bin/bash" ]
```
* since gcc 4.4.7 is default, you don't need to set CC in python configuration

The build command
```sh
docker build -t agent6 .
```

## Misc

Checking 32 bits app building is enabled.

```cpp
// bit.cpp
#include <iostream>

using namespace std;

int main()
{
    int a;
    cout << "sizeof(int)=" << sizeof(int)
         << " sizeof(long)=" << sizeof(long)
         << " sizeof(long long)=" << sizeof(long long)
         << " sizeof(void*)=" << sizeof(void*)
         << endl;
    return 0;
}
```

```bash
g++ -o b bit.cpp
g++ -o b32 -m32 bit.cpp
```

## centos7

```sh
$ ls -F
ockerfile  get-rpm.sh*  rpms/  run.sh*
```

get-rpm.sh
```sh
#! /bin/bash

# Download all rpm required to build agent:7
#
# run in a container from centos:7
# docker run -it --rm -v $(pwd)/rpms:/x -v $(pwd):/m -e UID=$(id -u) -e GID=$(id -g) centos:7 /m/get-rpm.sh
#



yum -y update \
  && yum -y downgrade libselinux \
  && yum -y install yum-utils

cc="gcc gcc-c++ glibc-devel libstdc++-devel"
devel="zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel gdbm-devel libpcap-devel xz-devel expat-devel"
util="m4 make which perl perl-Data-Dump PyYAML"

cd /x
yumdownloader --resolve $cc $devel $util

# change owner/group if wished
chown $UID *.rpm
chgrp $GID *.rpm
```

The Dockerfile
```dockerfile
FROM centos:7

WORKDIR /home

# cc="gcc gcc-c++ glibc-devel libstdc++-devel"
# devel="zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel gdbm-devel libpcap-devel xz-devel expat-devel"
# util="m4 make which perl perl-Data-Dump PyYAML"

ADD rpms/*.rpm /home/
RUN yum -y update \
  && yum -y downgrade libselinux \
  && yum -y localinstall *.rpm \
  && rm -rf *

ENTRYPOINT [ "/bin/bash" ]

```

run.sh
```sh
docker build -t agent:7 .
```



gcc4.8
```
cc="gcc gcc-c++ glibc-devel libstdc++-devel"
yumdownloader --resolve $cc

(1/10): glibc-devel-2.17-323.el7_9.i686.rpm            | 1.1 MB   00:02
(2/10): libgcc-4.8.5-44.el7.i686.rpm                   | 111 kB   00:00
(3/10): glibc-devel-2.17-323.el7_9.x86_64.rpm          | 1.1 MB   00:03
(4/10): libstdc++-4.8.5-44.el7.i686.rpm                | 319 kB   00:00
(5/10): gcc-c++-4.8.5-44.el7.x86_64.rpm                | 7.2 MB   00:03
(6/10): glibc-2.17-323.el7_9.i686.rpm                  | 4.3 MB   00:04
(7/10): libstdc++-devel-4.8.5-44.el7.x86_64.rpm        | 1.5 MB   00:01
(8/10): nss-softokn-freebl-3.53.1-6.el7_9.i686.rpm     | 322 kB   00:01
(9/10): libstdc++-devel-4.8.5-44.el7.i686.rpm          | 1.5 MB   00:03
(10/10): gcc-4.8.5-44.el7.x86_64.rpm                   |  16 MB   00:13
```

```
devel="zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel gdbm-devel libpcap-devel xz-devel expat-devel"
yumdownloader --resolve $devel

(1/39): bzip2-libs-1.0.6-13.el7.i686.rpm               |  40 kB   00:00
(2/39): bzip2-devel-1.0.6-13.el7.x86_64.rpm            | 218 kB   00:00
(3/39): gdbm-1.10-8.el7.i686.rpm                       |  70 kB   00:00
(4/39): expat-devel-2.1.0-12.el7.x86_64.rpm            |  57 kB   00:00
(5/39): gdbm-devel-1.10-8.el7.i686.rpm                 |  47 kB   00:00
(6/39): expat-devel-2.1.0-12.el7.i686.rpm              |  57 kB   00:00
(7/39): expat-2.1.0-12.el7.i686.rpm                    |  81 kB   00:00
(8/39): gdbm-devel-1.10-8.el7.x86_64.rpm               |  47 kB   00:00
(9/39): bzip2-devel-1.0.6-13.el7.i686.rpm              | 218 kB   00:00
(10/39): keyutils-libs-1.5.8-3.el7.i686.rpm            |  25 kB   00:00
(11/39): libpcap-1.5.3-12.el7.i686.rpm                 | 138 kB   00:00
(12/39): krb5-devel-1.15.1-50.el7.i686.rpm             | 272 kB   00:00
(13/39): libkadm5-1.15.1-50.el7.i686.rpm               | 179 kB   00:00
(14/39): libselinux-2.5-15.el7.i686.rpm                | 166 kB   00:00
(15/39): libcom_err-1.42.9-19.el7.i686.rpm             |  42 kB   00:00
(16/39): libpcap-devel-1.5.3-12.el7.i686.rpm           | 118 kB   00:00
(17/39): krb5-libs-1.15.1-50.el7.i686.rpm              | 811 kB   00:00
(18/39): libverto-0.2.5-4.el7.i686.rpm                 |  16 kB   00:00
(19/39): libsepol-2.5-10.el7.i686.rpm                  | 294 kB   00:00
(20/39): ncurses-libs-5.9-14.20130511.el7_4.i686.rpm   | 316 kB   00:00
(21/39): ncurses-devel-5.9-14.20130511.el7_4.x86_64.rp | 712 kB   00:00
(22/39): libpcap-devel-1.5.3-12.el7.x86_64.rpm         | 118 kB   00:00
(23/39): openssl-libs-1.0.2k-21.el7_9.i686.rpm         | 997 kB   00:00
(24/39): ncurses-devel-5.9-14.20130511.el7_4.i686.rpm  | 712 kB   00:00
(25/39): pcre-8.32-17.el7.i686.rpm                     | 420 kB   00:00
(26/39): readline-devel-6.2-11.el7.i686.rpm            | 139 kB   00:00
(27/39): readline-devel-6.2-11.el7.x86_64.rpm          | 139 kB   00:00
(28/39): sqlite-devel-3.7.17-8.el7_7.1.i686.rpm        | 104 kB   00:00
(29/39): sqlite-3.7.17-8.el7_7.1.i686.rpm              | 397 kB   00:00
(30/39): readline-6.2-11.el7.i686.rpm                  | 189 kB   00:00
(31/39): xz-devel-5.2.2-1.el7.i686.rpm                 |  46 kB   00:00
(32/39): sqlite-devel-3.7.17-8.el7_7.1.x86_64.rpm      | 104 kB   00:00
(33/39): openssl-devel-1.0.2k-21.el7_9.i686.rpm        | 1.5 MB   00:01
(34/39): xz-devel-5.2.2-1.el7.x86_64.rpm               |  46 kB   00:00
(35/39): zlib-devel-1.2.7-19.el7_9.i686.rpm            |  50 kB   00:00
(36/39): xz-libs-5.2.2-1.el7.i686.rpm                  | 109 kB   00:00
(37/39): openssl-devel-1.0.2k-21.el7_9.x86_64.rpm      | 1.5 MB   00:01
(38/39): zlib-1.2.7-19.el7_9.i686.rpm                  |  91 kB   00:00
(39/39): zlib-devel-1.2.7-19.el7_9.x86_64.rpm          |  50 kB   00:00
```

util (except perl)
```
util="m4 make which perl perl-Data-Dump PyYAML"
yumdownloader --resolve $util

(1/33): libyaml-0.1.4-11.el7_0.x86_64.rpm                |  55 kB  00:00:00
(2/33): PyYAML-3.10-11.el7.x86_64.rpm                    | 153 kB  00:00:01
(3/33): m4-1.4.16-10.el7.x86_64.rpm                      | 256 kB  00:00:01
(4/33): perl-Carp-1.26-244.el7.noarch.rpm                |  19 kB  00:00:00
(5/33): perl-Exporter-5.68-3.el7.noarch.rpm              |  28 kB  00:00:00
(6/33): perl-File-Path-2.09-2.el7.noarch.rpm             |  26 kB  00:00:00
(7/33): make-3.82-24.el7.x86_64.rpm                      | 421 kB  00:00:02
(8/33): perl-File-Temp-0.23.01-3.el7.noarch.rpm          |  56 kB  00:00:00
(9/33): perl-Getopt-Long-2.40-3.el7.noarch.rpm           |  56 kB  00:00:00
(10/33): perl-Filter-1.49-3.el7.x86_64.rpm               |  76 kB  00:00:00
(11/33): perl-HTTP-Tiny-0.033-3.el7.noarch.rpm           |  38 kB  00:00:00
(12/33): perl-PathTools-3.40-5.el7.x86_64.rpm            |  82 kB  00:00:00
(13/33): groff-base-1.22.2-8.el7.x86_64.rpm              | 942 kB  00:00:03
(14/33): perl-Pod-Perldoc-3.20-4.el7.noarch.rpm          |  87 kB  00:00:00
(15/33): perl-Pod-Usage-1.63-3.el7.noarch.rpm            |  27 kB  00:00:00
(16/33): perl-Scalar-List-Utils-1.27-248.el7.x86_64.rpm  |  36 kB  00:00:00
(17/33): perl-Pod-Simple-3.28-4.el7.noarch.rpm           | 216 kB  00:00:00
(18/33): perl-Pod-Escapes-1.04-299.el7_9.noarch.rpm      |  52 kB  00:00:01
(19/33): perl-Socket-2.010-5.el7.x86_64.rpm              |  49 kB  00:00:00
(20/33): perl-Text-ParseWords-3.29-4.el7.noarch.rpm      |  14 kB  00:00:00
(21/33): perl-Storable-2.45-3.el7.x86_64.rpm             |  77 kB  00:00:00
(22/33): perl-Time-HiRes-1.9725-3.el7.x86_64.rpm         |  45 kB  00:00:00
(23/33): perl-constant-1.27-2.el7.noarch.rpm             |  19 kB  00:00:00
(24/33): perl-Time-Local-1.2300-2.el7.noarch.rpm         |  24 kB  00:00:00
(25/33): perl-macros-5.16.3-299.el7_9.x86_64.rpm         |  44 kB  00:00:00
(26/33): perl-parent-0.225-244.el7.noarch.rpm            |  12 kB  00:00:00
(27/33): perl-threads-1.87-4.el7.x86_64.rpm              |  49 kB  00:00:00
(28/33): perl-podlators-2.5.1-3.el7.noarch.rpm           | 112 kB  00:00:00
(29/33): perl-Encode-2.51-7.el7.x86_64.rpm               | 1.5 MB  00:00:04
(30/33): which-2.20-7.el7.x86_64.rpm                     |  41 kB  00:00:00
(31/33): perl-threads-shared-1.43-6.el7.x86_64.rpm       |  39 kB  00:00:00
(32/33): perl-libs-5.16.3-299.el7_9.x86_64.rpm           | 690 kB  00:00:01
(33/33): perl-5.16.3-299.el7_9.x86_64.rpm                | 8.0 MB  00:00:09
```
