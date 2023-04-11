---
title: Create a Docker Image of Debian with Qemu for Arm
nav: create debian10qemu-arm
---

In Touchstone project we need a docker image that hosts on debian10, with QEMU user-static mode for ARM (armhf and aarch64).
Packages need to be installed are g++ devel (8.3) with gdb.

## pull debian10
```sh
jasonz@VANLWIN0056:~$ docker pull debian:10
10: Pulling from library/debian
d8a6bce2a40c: Pull complete
Digest: sha256:2d356e1e22c0902f88ef65cb7159ecd5a96feb62345747edfd4324b0d83a2923
Status: Downloaded newer image for debian:10
docker.io/library/debian:10
jasonz@VANLWIN0056:~$ docker images
REPOSITORY                   TAG       IMAGE ID       CREATED         SIZE
debian                       10        f03c282363a3   3 days ago      114MB

```


## download deb packages

```sh
root@d1db8268abb6:/dkr/deb10# apt install -d -o=dir::cache=`pwd` qemu-user
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following additional packages will be installed:
  binfmt-support libcapstone3 libglib2.0-0 libglib2.0-data libicu63 libpipeline1 libxml2 lsb-base qemu-user-binfmt shared-mime-info
  xdg-user-dirs
Suggested packages:
  sudo
The following NEW packages will be installed:
  binfmt-support libcapstone3 libglib2.0-0 libglib2.0-data libicu63 libpipeline1 libxml2 lsb-base qemu-user qemu-user-binfmt
  shared-mime-info xdg-user-dirs
0 upgraded, 12 newly installed, 0 to remove and 0 not upgraded.
Need to get 22.7 MB of archives.
After this operation, 142 MB of additional disk space will be used.
Do you want to continue? [Y/n] y
Get:1 http://deb.debian.org/debian buster/main amd64 libicu63 amd64 63.1-6+deb10u3 [8293 kB]
Get:2 http://deb.debian.org/debian-security buster/updates/main amd64 libxml2 amd64 2.9.4+dfsg1-7+deb10u5 [690 kB]
Get:3 http://deb.debian.org/debian buster/main amd64 libpipeline1 amd64 1.5.1-2 [31.2 kB]
Get:4 http://deb.debian.org/debian buster/main amd64 lsb-base all 10.2019051400 [28.4 kB]
Get:5 http://deb.debian.org/debian buster/main amd64 binfmt-support amd64 2.2.0-2 [70.0 kB]
Get:6 http://deb.debian.org/debian buster/main amd64 libcapstone3 amd64 4.0.1+really+3.0.5-1 [444 kB]
Get:7 http://deb.debian.org/debian-security buster/updates/main amd64 libglib2.0-0 amd64 2.58.3-2+deb10u4 [1259 kB]
Get:8 http://deb.debian.org/debian-security buster/updates/main amd64 libglib2.0-data all 2.58.3-2+deb10u4 [1110 kB]
Get:9 http://deb.debian.org/debian-security buster/updates/main amd64 qemu-user amd64 1:3.1+dfsg-8+deb10u9 [9989 kB]
Get:10 http://deb.debian.org/debian-security buster/updates/main amd64 qemu-user-binfmt amd64 1:3.1+dfsg-8+deb10u9 [2648 B]
Get:11 http://deb.debian.org/debian buster/main amd64 shared-mime-info amd64 1.10-1 [766 kB]
Get:12 http://deb.debian.org/debian buster/main amd64 xdg-user-dirs amd64 0.17-2 [53.8 kB]
Fetched 22.7 MB in 4s (6465 kB/s)
Download complete and in download only mode



root@d1db8268abb6:/dkr/deb10# ls -lh archives/
total 22M
-rw-r--r-- 1 root root  69K Feb 10  2019 binfmt-support_2.2.0-2_amd64.deb
-rw-r--r-- 1 root root 434K Feb 28  2019 libcapstone3_4.0.1+really+3.0.5-1_amd64.deb
-rw-r--r-- 1 root root 1.3M Sep 15 12:29 libglib2.0-0_2.58.3-2+deb10u4_amd64.deb
-rw-r--r-- 1 root root 1.1M Sep 15 12:14 libglib2.0-data_2.58.3-2+deb10u4_all.deb
-rw-r--r-- 1 root root 8.0M Dec 24  2021 libicu63_63.1-6+deb10u3_amd64.deb
-rw-r--r-- 1 root root  31K Feb 10  2019 libpipeline1_1.5.1-2_amd64.deb
-rw-r--r-- 1 root root 675K Oct 30 15:28 libxml2_2.9.4+dfsg1-7+deb10u5_amd64.deb
-rw-r----- 1 root root    0 Mar  5 01:01 lock
-rw-r--r-- 1 root root  28K May 16  2019 lsb-base_10.2019051400_all.deb
drwx------ 2 _apt root 4.0K Mar  5 01:02 partial
-rw-r--r-- 1 root root 2.6K Sep  3  2022 qemu-user-binfmt_1%3a3.1+dfsg-8+deb10u9_amd64.deb
-rw-r--r-- 1 root root 9.6M Sep  3  2022 qemu-user_1%3a3.1+dfsg-8+deb10u9_amd64.deb
-rw-r--r-- 1 root root 748K Sep 25  2018 shared-mime-info_1.10-1_amd64.deb
-rw-r--r-- 1 root root  53K Dec 28  2018 xdg-user-dirs_0.17-2_amd64.deb



root@d1db8268abb6:/dkr/deb10# apt install -yd -o=dir::cache=`pwd` qemu-user-static binfmt-support build-essential
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following additional packages will be installed:
  binutils binutils-common binutils-x86-64-linux-gnu bzip2 cpp cpp-8 dirmngr dpkg-dev fakeroot g++ g++-8 gcc gcc-8 gnupg gnupg-l10n
  gnupg-utils gpg gpg-agent gpg-wks-client gpg-wks-server gpgconf gpgsm libalgorithm-diff-perl libalgorithm-diff-xs-perl
  libalgorithm-merge-perl libasan5 libassuan0 libatomic1 libbinutils libc-dev-bin libc6-dev libcc1-0 libdpkg-perl libfakeroot
  libfile-fcntllock-perl libgcc-8-dev libgdbm-compat4 libgdbm6 libgomp1 libisl19 libitm1 libksba8 libldap-2.4-2 libldap-common
  liblocale-gettext-perl liblsan0 libmpc3 libmpfr6 libmpx2 libnpth0 libperl5.28 libpipeline1 libquadmath0 libreadline7 libsasl2-2
  libsasl2-modules libsasl2-modules-db libsqlite3-0 libssl1.1 libstdc++-8-dev libtsan0 libubsan1 linux-libc-dev lsb-base make
  manpages manpages-dev netbase patch perl perl-modules-5.28 pinentry-curses readline-common xz-utils
Suggested packages:
  binutils-doc bzip2-doc cpp-doc gcc-8-locales dbus-user-session libpam-systemd pinentry-gnome3 tor debian-keyring g++-multilib
  g++-8-multilib gcc-8-doc libstdc++6-8-dbg gcc-multilib autoconf automake libtool flex bison gdb gcc-doc gcc-8-multilib
  libgcc1-dbg libgomp1-dbg libitm1-dbg libatomic1-dbg libasan5-dbg liblsan0-dbg libtsan0-dbg libubsan1-dbg libmpx2-dbg
  libquadmath0-dbg parcimonie xloadimage scdaemon glibc-doc sensible-utils git bzr gdbm-l10n libsasl2-modules-gssapi-mit
  | libsasl2-modules-gssapi-heimdal libsasl2-modules-ldap libsasl2-modules-otp libsasl2-modules-sql libstdc++-8-doc make-doc
  man-browser ed diffutils-doc perl-doc libterm-readline-gnu-perl | libterm-readline-perl-perl libb-debug-perl liblocale-codes-perl
  pinentry-doc sudo readline-doc
The following NEW packages will be installed:
  binfmt-support binutils binutils-common binutils-x86-64-linux-gnu build-essential bzip2 cpp cpp-8 dirmngr dpkg-dev fakeroot g++
  g++-8 gcc gcc-8 gnupg gnupg-l10n gnupg-utils gpg gpg-agent gpg-wks-client gpg-wks-server gpgconf gpgsm libalgorithm-diff-perl
  libalgorithm-diff-xs-perl libalgorithm-merge-perl libasan5 libassuan0 libatomic1 libbinutils libc-dev-bin libc6-dev libcc1-0
  libdpkg-perl libfakeroot libfile-fcntllock-perl libgcc-8-dev libgdbm-compat4 libgdbm6 libgomp1 libisl19 libitm1 libksba8
  libldap-2.4-2 libldap-common liblocale-gettext-perl liblsan0 libmpc3 libmpfr6 libmpx2 libnpth0 libperl5.28 libpipeline1
  libquadmath0 libreadline7 libsasl2-2 libsasl2-modules libsasl2-modules-db libsqlite3-0 libssl1.1 libstdc++-8-dev libtsan0
  libubsan1 linux-libc-dev lsb-base make manpages manpages-dev netbase patch perl perl-modules-5.28 pinentry-curses
  qemu-user-static readline-common xz-utils
0 upgraded, 77 newly installed, 0 to remove and 0 not upgraded.
Need to get 89.5 MB/89.6 MB of archives.
After this operation, 469 MB of additional disk space will be used.
Get:1 http://deb.debian.org/debian buster/main amd64 perl-modules-5.28 all 5.28.1-6+deb10u1 [2873 kB]
Get:2 http://deb.debian.org/debian buster/main amd64 libgdbm6 amd64 1.18.1-4 [64.7 kB]
Get:3 http://deb.debian.org/debian buster/main amd64 libgdbm-compat4 amd64 1.18.1-4 [44.1 kB]
Get:4 http://deb.debian.org/debian buster/main amd64 libperl5.28 amd64 5.28.1-6+deb10u1 [3894 kB]
Get:5 http://deb.debian.org/debian buster/main amd64 perl amd64 5.28.1-6+deb10u1 [204 kB]
Get:6 http://deb.debian.org/debian buster/main amd64 liblocale-gettext-perl amd64 1.07-3+b4 [18.9 kB]
Get:7 http://deb.debian.org/debian-security buster/updates/main amd64 libssl1.1 amd64 1.1.1n-0+deb10u4 [1551 kB]
Get:8 http://deb.debian.org/debian buster/main amd64 netbase all 5.6 [19.4 kB]
Get:9 http://deb.debian.org/debian buster/main amd64 readline-common all 7.0-5 [70.6 kB]
Get:10 http://deb.debian.org/debian-security buster/updates/main amd64 bzip2 amd64 1.0.6-9.2~deb10u2 [48.5 kB]
Get:11 http://deb.debian.org/debian-security buster/updates/main amd64 libsqlite3-0 amd64 3.27.2-3+deb10u2 [641 kB]
Get:12 http://deb.debian.org/debian buster/main amd64 manpages all 4.16-2 [1295 kB]
Get:13 http://deb.debian.org/debian buster/main amd64 xz-utils amd64 5.2.4-1+deb10u1 [183 kB]
Get:14 http://deb.debian.org/debian buster/main amd64 binutils-common amd64 2.31.1-16 [2073 kB]
Get:15 http://deb.debian.org/debian buster/main amd64 libbinutils amd64 2.31.1-16 [478 kB]
Get:16 http://deb.debian.org/debian buster/main amd64 binutils-x86-64-linux-gnu amd64 2.31.1-16 [1823 kB]
Get:17 http://deb.debian.org/debian buster/main amd64 binutils amd64 2.31.1-16 [56.8 kB]
Get:18 http://deb.debian.org/debian-security buster/updates/main amd64 libc-dev-bin amd64 2.28-10+deb10u2 [276 kB]
Get:19 http://deb.debian.org/debian-security buster/updates/main amd64 linux-libc-dev amd64 4.19.269-1 [1553 kB]
Get:20 http://deb.debian.org/debian-security buster/updates/main amd64 libc6-dev amd64 2.28-10+deb10u2 [2693 kB]
Get:21 http://deb.debian.org/debian buster/main amd64 libisl19 amd64 0.20-2 [587 kB]
Get:22 http://deb.debian.org/debian buster/main amd64 libmpfr6 amd64 4.0.2-1 [775 kB]
Get:23 http://deb.debian.org/debian buster/main amd64 libmpc3 amd64 1.1.0-1 [41.3 kB]
Get:24 http://deb.debian.org/debian buster/main amd64 cpp-8 amd64 8.3.0-6 [8914 kB]
Get:25 http://deb.debian.org/debian buster/main amd64 cpp amd64 4:8.3.0-1 [19.4 kB]
Get:26 http://deb.debian.org/debian buster/main amd64 libcc1-0 amd64 8.3.0-6 [46.6 kB]
Get:27 http://deb.debian.org/debian buster/main amd64 libgomp1 amd64 8.3.0-6 [75.8 kB]
Get:28 http://deb.debian.org/debian buster/main amd64 libitm1 amd64 8.3.0-6 [27.7 kB]
Get:29 http://deb.debian.org/debian buster/main amd64 libatomic1 amd64 8.3.0-6 [9032 B]
Get:30 http://deb.debian.org/debian buster/main amd64 libasan5 amd64 8.3.0-6 [362 kB]
Get:31 http://deb.debian.org/debian buster/main amd64 liblsan0 amd64 8.3.0-6 [131 kB]
Get:32 http://deb.debian.org/debian buster/main amd64 libtsan0 amd64 8.3.0-6 [283 kB]
Get:33 http://deb.debian.org/debian buster/main amd64 libubsan1 amd64 8.3.0-6 [120 kB]
Get:34 http://deb.debian.org/debian buster/main amd64 libmpx2 amd64 8.3.0-6 [11.4 kB]
Get:35 http://deb.debian.org/debian buster/main amd64 libquadmath0 amd64 8.3.0-6 [133 kB]
Get:36 http://deb.debian.org/debian buster/main amd64 libgcc-8-dev amd64 8.3.0-6 [2298 kB]
Get:37 http://deb.debian.org/debian buster/main amd64 gcc-8 amd64 8.3.0-6 [9452 kB]
Get:38 http://deb.debian.org/debian buster/main amd64 gcc amd64 4:8.3.0-1 [5196 B]
Get:39 http://deb.debian.org/debian buster/main amd64 libstdc++-8-dev amd64 8.3.0-6 [1532 kB]
Get:40 http://deb.debian.org/debian buster/main amd64 g++-8 amd64 8.3.0-6 [9752 kB]
Get:41 http://deb.debian.org/debian buster/main amd64 g++ amd64 4:8.3.0-1 [1644 B]
Get:42 http://deb.debian.org/debian buster/main amd64 make amd64 4.2.1-1.2 [341 kB]
Get:43 http://deb.debian.org/debian buster/main amd64 libdpkg-perl all 1.19.8 [1415 kB]
Get:44 http://deb.debian.org/debian buster/main amd64 patch amd64 2.7.6-3+deb10u1 [126 kB]
Get:45 http://deb.debian.org/debian buster/main amd64 dpkg-dev all 1.19.8 [1776 kB]
Get:46 http://deb.debian.org/debian buster/main amd64 build-essential amd64 12.6 [7576 B]
Get:47 http://deb.debian.org/debian buster/main amd64 libassuan0 amd64 2.5.2-1 [49.4 kB]
Get:48 http://deb.debian.org/debian buster/main amd64 libreadline7 amd64 7.0-5 [151 kB]
Get:49 http://deb.debian.org/debian buster/main amd64 gpgconf amd64 2.2.12-1+deb10u2 [510 kB]
Get:50 http://deb.debian.org/debian-security buster/updates/main amd64 libksba8 amd64 1.3.5-2+deb10u2 [102 kB]
Get:51 http://deb.debian.org/debian buster/main amd64 libsasl2-modules-db amd64 2.1.27+dfsg-1+deb10u2 [69.2 kB]
Get:52 http://deb.debian.org/debian buster/main amd64 libsasl2-2 amd64 2.1.27+dfsg-1+deb10u2 [106 kB]
Get:53 http://deb.debian.org/debian buster/main amd64 libldap-common all 2.4.47+dfsg-3+deb10u7 [90.1 kB]
Get:54 http://deb.debian.org/debian buster/main amd64 libldap-2.4-2 amd64 2.4.47+dfsg-3+deb10u7 [224 kB]
Get:55 http://deb.debian.org/debian buster/main amd64 libnpth0 amd64 1.6-1 [18.4 kB]
Get:56 http://deb.debian.org/debian buster/main amd64 dirmngr amd64 2.2.12-1+deb10u2 [712 kB]
Get:57 http://deb.debian.org/debian buster/main amd64 libfakeroot amd64 1.23-1 [45.9 kB]
Get:58 http://deb.debian.org/debian buster/main amd64 fakeroot amd64 1.23-1 [85.8 kB]
Get:59 http://deb.debian.org/debian buster/main amd64 gnupg-l10n all 2.2.12-1+deb10u2 [1009 kB]
Get:60 http://deb.debian.org/debian buster/main amd64 gnupg-utils amd64 2.2.12-1+deb10u2 [861 kB]
Get:61 http://deb.debian.org/debian buster/main amd64 gpg amd64 2.2.12-1+deb10u2 [865 kB]
Get:62 http://deb.debian.org/debian buster/main amd64 pinentry-curses amd64 1.1.0-2 [64.5 kB]
Get:63 http://deb.debian.org/debian buster/main amd64 gpg-agent amd64 2.2.12-1+deb10u2 [617 kB]
Get:64 http://deb.debian.org/debian buster/main amd64 gpg-wks-client amd64 2.2.12-1+deb10u2 [485 kB]
Get:65 http://deb.debian.org/debian buster/main amd64 gpg-wks-server amd64 2.2.12-1+deb10u2 [478 kB]
Get:66 http://deb.debian.org/debian buster/main amd64 gpgsm amd64 2.2.12-1+deb10u2 [604 kB]
Get:67 http://deb.debian.org/debian buster/main amd64 gnupg all 2.2.12-1+deb10u2 [715 kB]
Get:68 http://deb.debian.org/debian buster/main amd64 libalgorithm-diff-perl all 1.19.03-2 [47.9 kB]
Get:69 http://deb.debian.org/debian buster/main amd64 libalgorithm-diff-xs-perl amd64 0.04-5+b1 [11.8 kB]
Get:70 http://deb.debian.org/debian buster/main amd64 libalgorithm-merge-perl all 0.08-3 [12.7 kB]
Get:71 http://deb.debian.org/debian buster/main amd64 libfile-fcntllock-perl amd64 0.22-3+b5 [35.4 kB]
Get:72 http://deb.debian.org/debian buster/main amd64 libsasl2-modules amd64 2.1.27+dfsg-1+deb10u2 [104 kB]
Get:73 http://deb.debian.org/debian buster/main amd64 manpages-dev all 4.16-2 [2232 kB]
Get:74 http://deb.debian.org/debian-security buster/updates/main amd64 qemu-user-static amd64 1:3.1+dfsg-8+deb10u9 [21.1 MB]
Fetched 89.5 MB in 15s (6160 kB/s)
Download complete and in download only mode







root@d1db8268abb6:/dkr/deb10# apt install -yd -o=dir::cache=`pwd` g++-aarch64-linux-gnu binutils-aarch64-linux-gnu binutils-aarch64-linux-gnu-dbg
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following additional packages will be installed:
  binutils-common cpp-8-aarch64-linux-gnu cpp-aarch64-linux-gnu g++-8-aarch64-linux-gnu gcc-8-aarch64-linux-gnu
  gcc-8-aarch64-linux-gnu-base gcc-8-cross-base gcc-aarch64-linux-gnu libasan5-arm64-cross libatomic1-arm64-cross libc6-arm64-cross
  libc6-dev-arm64-cross libcc1-0 libgcc-8-dev-arm64-cross libgcc1-arm64-cross libgomp1-arm64-cross libisl19 libitm1-arm64-cross
  liblsan0-arm64-cross libmpc3 libmpfr6 libstdc++-8-dev-arm64-cross libstdc++6-arm64-cross libtsan0-arm64-cross
  libubsan1-arm64-cross linux-libc-dev-arm64-cross
Suggested packages:
  binutils-doc gcc-8-locales cpp-doc gcc-8-doc libstdc++6-8-dbg-arm64-cross libgcc1-dbg-arm64-cross libgomp1-dbg-arm64-cross
  libitm1-dbg-arm64-cross libatomic1-dbg-arm64-cross libasan5-dbg-arm64-cross liblsan0-dbg-arm64-cross libtsan0-dbg-arm64-cross
  libubsan1-dbg-arm64-cross libmpx2-dbg-arm64-cross libquadmath0-dbg-arm64-cross make manpages-dev autoconf automake libtool flex
  bison gdb-aarch64-linux-gnu gcc-doc
The following NEW packages will be installed:
  binutils-aarch64-linux-gnu binutils-aarch64-linux-gnu-dbg binutils-common cpp-8-aarch64-linux-gnu cpp-aarch64-linux-gnu
  g++-8-aarch64-linux-gnu g++-aarch64-linux-gnu gcc-8-aarch64-linux-gnu gcc-8-aarch64-linux-gnu-base gcc-8-cross-base
  gcc-aarch64-linux-gnu libasan5-arm64-cross libatomic1-arm64-cross libc6-arm64-cross libc6-dev-arm64-cross libcc1-0
  libgcc-8-dev-arm64-cross libgcc1-arm64-cross libgomp1-arm64-cross libisl19 libitm1-arm64-cross liblsan0-arm64-cross libmpc3
  libmpfr6 libstdc++-8-dev-arm64-cross libstdc++6-arm64-cross libtsan0-arm64-cross libubsan1-arm64-cross linux-libc-dev-arm64-cross
0 upgraded, 29 newly installed, 0 to remove and 0 not upgraded.
Need to get 86.1 MB/89.6 MB of archives.
After this operation, 194 MB of additional disk space will be used.
Get:1 http://deb.debian.org/debian buster/main amd64 binutils-aarch64-linux-gnu amd64 2.31.1-16 [2905 kB]
Get:2 http://deb.debian.org/debian buster/main amd64 binutils-aarch64-linux-gnu-dbg amd64 2.31.1-16 [54.6 MB]
Get:3 http://deb.debian.org/debian buster/main amd64 gcc-8-aarch64-linux-gnu-base amd64 8.3.0-2cross1 [190 kB]
Get:4 http://deb.debian.org/debian buster/main amd64 cpp-8-aarch64-linux-gnu amd64 8.3.0-2cross1 [6251 kB]
Get:5 http://deb.debian.org/debian buster/main amd64 cpp-aarch64-linux-gnu amd64 4:8.3.0-1 [16.5 kB]
Get:6 http://deb.debian.org/debian buster/main amd64 gcc-8-cross-base all 8.3.0-2cross1 [185 kB]
Get:7 http://deb.debian.org/debian buster/main amd64 libc6-arm64-cross all 2.28-7cross1 [1312 kB]
Get:8 http://deb.debian.org/debian buster/main amd64 libgcc1-arm64-cross all 1:8.3.0-2cross1 [34.2 kB]
Get:9 http://deb.debian.org/debian buster/main amd64 libgomp1-arm64-cross all 8.3.0-2cross1 [66.3 kB]
Get:10 http://deb.debian.org/debian buster/main amd64 libitm1-arm64-cross all 8.3.0-2cross1 [23.6 kB]
Get:11 http://deb.debian.org/debian buster/main amd64 libatomic1-arm64-cross all 8.3.0-2cross1 [8620 B]
Get:12 http://deb.debian.org/debian buster/main amd64 libstdc++6-arm64-cross all 8.3.0-2cross1 [325 kB]
Get:13 http://deb.debian.org/debian buster/main amd64 libasan5-arm64-cross all 8.3.0-2cross1 [321 kB]
Get:14 http://deb.debian.org/debian buster/main amd64 liblsan0-arm64-cross all 8.3.0-2cross1 [117 kB]
Get:15 http://deb.debian.org/debian buster/main amd64 libtsan0-arm64-cross all 8.3.0-2cross1 [255 kB]
Get:16 http://deb.debian.org/debian buster/main amd64 libubsan1-arm64-cross all 8.3.0-2cross1 [110 kB]
Get:17 http://deb.debian.org/debian buster/main amd64 libgcc-8-dev-arm64-cross all 8.3.0-2cross1 [833 kB]
Get:18 http://deb.debian.org/debian buster/main amd64 gcc-8-aarch64-linux-gnu amd64 8.3.0-2cross1 [6681 kB]
Get:19 http://deb.debian.org/debian buster/main amd64 linux-libc-dev-arm64-cross all 4.19.20-1cross1 [1209 kB]
Get:20 http://deb.debian.org/debian buster/main amd64 libc6-dev-arm64-cross all 2.28-7cross1 [2322 kB]
Get:21 http://deb.debian.org/debian buster/main amd64 libstdc++-8-dev-arm64-cross all 8.3.0-2cross1 [1484 kB]
Get:22 http://deb.debian.org/debian buster/main amd64 g++-8-aarch64-linux-gnu amd64 8.3.0-2cross1 [6821 kB]
Get:23 http://deb.debian.org/debian buster/main amd64 gcc-aarch64-linux-gnu amd64 4:8.3.0-1 [1456 B]
Get:24 http://deb.debian.org/debian buster/main amd64 g++-aarch64-linux-gnu amd64 4:8.3.0-1 [1176 B]
Fetched 86.1 MB in 20s (4322 kB/s)
Download complete and in download only mode






root@d1db8268abb6:/dkr/deb10# apt install -yd -o=dir::cache=`pwd` g++-arm-linux-gnueabihf binutils-arm-linux-gnueabihf binutils-arm-linux-gnueabihf-dbg
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following additional packages will be installed:
  binutils-common cpp-8-arm-linux-gnueabihf cpp-arm-linux-gnueabihf g++-8-arm-linux-gnueabihf gcc-8-arm-linux-gnueabihf
  gcc-8-arm-linux-gnueabihf-base gcc-8-cross-base gcc-arm-linux-gnueabihf libasan5-armhf-cross libatomic1-armhf-cross
  libc6-armhf-cross libc6-dev-armhf-cross libcc1-0 libgcc-8-dev-armhf-cross libgcc1-armhf-cross libgomp1-armhf-cross libisl19
  libmpc3 libmpfr6 libstdc++-8-dev-armhf-cross libstdc++6-armhf-cross libubsan1-armhf-cross linux-libc-dev-armhf-cross
Suggested packages:
  binutils-doc gcc-8-locales cpp-doc gcc-8-doc libstdc++6-8-dbg-armhf-cross libgcc1-dbg-armhf-cross libgomp1-dbg-armhf-cross
  libitm1-dbg-armhf-cross libatomic1-dbg-armhf-cross libasan5-dbg-armhf-cross liblsan0-dbg-armhf-cross libtsan0-dbg-armhf-cross
  libubsan1-dbg-armhf-cross libmpx2-dbg-armhf-cross libquadmath0-dbg-armhf-cross make manpages-dev autoconf automake libtool flex
  bison gdb-arm-linux-gnueabihf gcc-doc
The following NEW packages will be installed:
  binutils-arm-linux-gnueabihf binutils-arm-linux-gnueabihf-dbg binutils-common cpp-8-arm-linux-gnueabihf cpp-arm-linux-gnueabihf
  g++-8-arm-linux-gnueabihf g++-arm-linux-gnueabihf gcc-8-arm-linux-gnueabihf gcc-8-arm-linux-gnueabihf-base gcc-8-cross-base
  gcc-arm-linux-gnueabihf libasan5-armhf-cross libatomic1-armhf-cross libc6-armhf-cross libc6-dev-armhf-cross libcc1-0
  libgcc-8-dev-armhf-cross libgcc1-armhf-cross libgomp1-armhf-cross libisl19 libmpc3 libmpfr6 libstdc++-8-dev-armhf-cross
  libstdc++6-armhf-cross libubsan1-armhf-cross linux-libc-dev-armhf-cross
0 upgraded, 26 newly installed, 0 to remove and 0 not upgraded.
Need to get 85.6 MB/89.3 MB of archives.
After this operation, 185 MB of additional disk space will be used.
Get:1 http://deb.debian.org/debian buster/main amd64 binutils-arm-linux-gnueabihf amd64 2.31.1-16 [2834 kB]
Get:2 http://deb.debian.org/debian buster/main amd64 binutils-arm-linux-gnueabihf-dbg amd64 2.31.1-16 [54.3 MB]
Get:3 http://deb.debian.org/debian buster/main amd64 gcc-8-arm-linux-gnueabihf-base amd64 8.3.0-2cross1 [190 kB]
Get:4 http://deb.debian.org/debian buster/main amd64 cpp-8-arm-linux-gnueabihf amd64 8.3.0-2cross1 [6554 kB]
Get:5 http://deb.debian.org/debian buster/main amd64 cpp-arm-linux-gnueabihf amd64 4:8.3.0-1 [16.5 kB]
Get:6 http://deb.debian.org/debian buster/main amd64 libc6-armhf-cross all 2.28-7cross1 [1170 kB]
Get:7 http://deb.debian.org/debian buster/main amd64 libgcc1-armhf-cross all 1:8.3.0-2cross1 [37.1 kB]
Get:8 http://deb.debian.org/debian buster/main amd64 libgomp1-armhf-cross all 8.3.0-2cross1 [63.1 kB]
Get:9 http://deb.debian.org/debian buster/main amd64 libatomic1-armhf-cross all 8.3.0-2cross1 [6580 B]
Get:10 http://deb.debian.org/debian buster/main amd64 libstdc++6-armhf-cross all 8.3.0-2cross1 [301 kB]
Get:11 http://deb.debian.org/debian buster/main amd64 libasan5-armhf-cross all 8.3.0-2cross1 [330 kB]
Get:12 http://deb.debian.org/debian buster/main amd64 libubsan1-armhf-cross all 8.3.0-2cross1 [103 kB]
Get:13 http://deb.debian.org/debian buster/main amd64 libgcc-8-dev-armhf-cross all 8.3.0-2cross1 [612 kB]
Get:14 http://deb.debian.org/debian buster/main amd64 gcc-8-arm-linux-gnueabihf amd64 8.3.0-2cross1 [6974 kB]
Get:15 http://deb.debian.org/debian buster/main amd64 linux-libc-dev-armhf-cross all 4.19.20-1cross1 [1212 kB]
Get:16 http://deb.debian.org/debian buster/main amd64 libc6-dev-armhf-cross all 2.28-7cross1 [2148 kB]
Get:17 http://deb.debian.org/debian buster/main amd64 libstdc++-8-dev-armhf-cross all 8.3.0-2cross1 [1556 kB]
Get:18 http://deb.debian.org/debian buster/main amd64 g++-8-arm-linux-gnueabihf amd64 8.3.0-2cross1 [7133 kB]
Get:19 http://deb.debian.org/debian buster/main amd64 gcc-arm-linux-gnueabihf amd64 4:8.3.0-1 [1456 B]
Get:20 http://deb.debian.org/debian buster/main amd64 g++-arm-linux-gnueabihf amd64 4:8.3.0-1 [1180 B]
Fetched 85.6 MB in 16s (5340 kB/s)
Download complete and in download only mode






root@d1db8268abb6:/dkr/deb10# apt install -yd -o=dir::cache=`pwd` gdb-multiarch
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following additional packages will be installed:
  bzip2 file gdb libbabeltrace1 libc6-dbg libdw1 libexpat1 libglib2.0-0 libglib2.0-data libicu63 libipt2 libmagic-mgc libmagic1
  libmpdec2 libpopt0 libpython3.7 libpython3.7-minimal libpython3.7-stdlib libreadline7 libsqlite3-0 libssl1.1 libxml2 mime-support
  readline-common shared-mime-info xdg-user-dirs xz-utils
Suggested packages:
  bzip2-doc gdb-doc gdbserver readline-doc
The following NEW packages will be installed:
  bzip2 file gdb gdb-multiarch libbabeltrace1 libc6-dbg libdw1 libexpat1 libglib2.0-0 libglib2.0-data libicu63 libipt2 libmagic-mgc
  libmagic1 libmpdec2 libpopt0 libpython3.7 libpython3.7-minimal libpython3.7-stdlib libreadline7 libsqlite3-0 libssl1.1 libxml2
  mime-support readline-common shared-mime-info xdg-user-dirs xz-utils
0 upgraded, 28 newly installed, 0 to remove and 0 not upgraded.
Need to get 23.3 MB/38.1 MB of archives.
After this operation, 126 MB of additional disk space will be used.
Get:1 http://deb.debian.org/debian buster/main amd64 libmagic-mgc amd64 1:5.35-4+deb10u2 [242 kB]
Get:2 http://deb.debian.org/debian buster/main amd64 libmagic1 amd64 1:5.35-4+deb10u2 [118 kB]
Get:3 http://deb.debian.org/debian buster/main amd64 file amd64 1:5.35-4+deb10u2 [66.4 kB]
Get:4 http://deb.debian.org/debian buster/main amd64 mime-support all 3.62 [37.2 kB]
Get:5 http://deb.debian.org/debian buster/main amd64 libdw1 amd64 0.176-1.1 [235 kB]
Get:6 http://deb.debian.org/debian buster/main amd64 libpopt0 amd64 1.16-12 [49.4 kB]
Get:7 http://deb.debian.org/debian buster/main amd64 libbabeltrace1 amd64 1.5.6-2+deb10u1 [172 kB]
Get:8 http://deb.debian.org/debian-security buster/updates/main amd64 libexpat1 amd64 2.2.6-2+deb10u6 [108 kB]
Get:9 http://deb.debian.org/debian buster/main amd64 libipt2 amd64 2.0-2 [41.7 kB]
Get:10 http://deb.debian.org/debian-security buster/updates/main amd64 libpython3.7-minimal amd64 3.7.3-2+deb10u4 [589 kB]
Get:11 http://deb.debian.org/debian buster/main amd64 libmpdec2 amd64 2.4.2-2 [87.2 kB]
Get:12 http://deb.debian.org/debian-security buster/updates/main amd64 libpython3.7-stdlib amd64 3.7.3-2+deb10u4 [1733 kB]
Get:13 http://deb.debian.org/debian-security buster/updates/main amd64 libpython3.7 amd64 3.7.3-2+deb10u4 [1498 kB]
Get:14 http://deb.debian.org/debian buster/main amd64 gdb amd64 8.2.1-2+b3 [3133 kB]
Get:15 http://deb.debian.org/debian buster/main amd64 gdb-multiarch amd64 8.2.1-2+b3 [3573 kB]
Get:16 http://deb.debian.org/debian-security buster/updates/main amd64 libc6-dbg amd64 2.28-10+deb10u2 [11.6 MB]
Fetched 23.3 MB in 4s (5355 kB/s)
Download complete and in download only mode







root@d1db8268abb6:/dkr/deb10# apt install -yd -o=dir::cache=`pwd` python3 python3-pip perl
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following additional packages will be installed:
  binutils binutils-common binutils-x86-64-linux-gnu build-essential bzip2 ca-certificates cpp cpp-8 dbus dh-python dirmngr
  dpkg-dev fakeroot file g++ g++-8 gcc gcc-8 gir1.2-glib-2.0 gnupg gnupg-l10n gnupg-utils gpg gpg-agent gpg-wks-client
  gpg-wks-server gpgconf gpgsm libalgorithm-diff-perl libalgorithm-diff-xs-perl libalgorithm-merge-perl libapparmor1 libasan5
  libassuan0 libatomic1 libbinutils libc-dev-bin libc6-dev libcc1-0 libdbus-1-3 libdpkg-perl libexpat1 libexpat1-dev libfakeroot
  libfile-fcntllock-perl libgcc-8-dev libgdbm-compat4 libgdbm6 libgirepository-1.0-1 libglib2.0-0 libglib2.0-data libgomp1 libicu63
  libisl19 libitm1 libksba8 libldap-2.4-2 libldap-common liblocale-gettext-perl liblsan0 libmagic-mgc libmagic1 libmpc3 libmpdec2
  libmpfr6 libmpx2 libnpth0 libperl5.28 libpython3-dev libpython3-stdlib libpython3.7 libpython3.7-dev libpython3.7-minimal
  libpython3.7-stdlib libquadmath0 libreadline7 libsasl2-2 libsasl2-modules libsasl2-modules-db libsqlite3-0 libssl1.1
  libstdc++-8-dev libtsan0 libubsan1 libxml2 linux-libc-dev lsb-base make manpages manpages-dev mime-support netbase openssl patch
  perl-modules-5.28 pinentry-curses python-pip-whl python3-asn1crypto python3-cffi-backend python3-crypto python3-cryptography
  python3-dbus python3-dev python3-distutils python3-entrypoints python3-gi python3-keyring python3-keyrings.alt python3-lib2to3
  python3-minimal python3-pkg-resources python3-secretstorage python3-setuptools python3-six python3-wheel python3-xdg python3.7
  python3.7-dev python3.7-minimal readline-common shared-mime-info xdg-user-dirs xz-utils
Suggested packages:
  binutils-doc bzip2-doc cpp-doc gcc-8-locales default-dbus-session-bus | dbus-session-bus dbus-user-session libpam-systemd
  pinentry-gnome3 tor debian-keyring g++-multilib g++-8-multilib gcc-8-doc libstdc++6-8-dbg gcc-multilib autoconf automake libtool
  flex bison gdb gcc-doc gcc-8-multilib libgcc1-dbg libgomp1-dbg libitm1-dbg libatomic1-dbg libasan5-dbg liblsan0-dbg libtsan0-dbg
  libubsan1-dbg libmpx2-dbg libquadmath0-dbg parcimonie xloadimage scdaemon glibc-doc sensible-utils git bzr gdbm-l10n
  libsasl2-modules-gssapi-mit | libsasl2-modules-gssapi-heimdal libsasl2-modules-ldap libsasl2-modules-otp libsasl2-modules-sql
  libstdc++-8-doc make-doc man-browser ed diffutils-doc perl-doc libterm-readline-gnu-perl | libterm-readline-perl-perl
  libb-debug-perl liblocale-codes-perl pinentry-doc python3-doc python3-tk python3-venv python-crypto-doc python-cryptography-doc
  python3-cryptography-vectors python-dbus-doc python3-dbus-dbg gnome-keyring libkf5wallet-bin gir1.2-gnomekeyring-1.0
  python-secretstorage-doc python-setuptools-doc python3.7-venv python3.7-doc binfmt-support readline-doc
The following NEW packages will be installed:
  binutils binutils-common binutils-x86-64-linux-gnu build-essential bzip2 ca-certificates cpp cpp-8 dbus dh-python dirmngr
  dpkg-dev fakeroot file g++ g++-8 gcc gcc-8 gir1.2-glib-2.0 gnupg gnupg-l10n gnupg-utils gpg gpg-agent gpg-wks-client
  gpg-wks-server gpgconf gpgsm libalgorithm-diff-perl libalgorithm-diff-xs-perl libalgorithm-merge-perl libapparmor1 libasan5
  libassuan0 libatomic1 libbinutils libc-dev-bin libc6-dev libcc1-0 libdbus-1-3 libdpkg-perl libexpat1 libexpat1-dev libfakeroot
  libfile-fcntllock-perl libgcc-8-dev libgdbm-compat4 libgdbm6 libgirepository-1.0-1 libglib2.0-0 libglib2.0-data libgomp1 libicu63
  libisl19 libitm1 libksba8 libldap-2.4-2 libldap-common liblocale-gettext-perl liblsan0 libmagic-mgc libmagic1 libmpc3 libmpdec2
  libmpfr6 libmpx2 libnpth0 libperl5.28 libpython3-dev libpython3-stdlib libpython3.7 libpython3.7-dev libpython3.7-minimal
  libpython3.7-stdlib libquadmath0 libreadline7 libsasl2-2 libsasl2-modules libsasl2-modules-db libsqlite3-0 libssl1.1
  libstdc++-8-dev libtsan0 libubsan1 libxml2 linux-libc-dev lsb-base make manpages manpages-dev mime-support netbase openssl patch
  perl perl-modules-5.28 pinentry-curses python-pip-whl python3 python3-asn1crypto python3-cffi-backend python3-crypto
  python3-cryptography python3-dbus python3-dev python3-distutils python3-entrypoints python3-gi python3-keyring
  python3-keyrings.alt python3-lib2to3 python3-minimal python3-pip python3-pkg-resources python3-secretstorage python3-setuptools
  python3-six python3-wheel python3-xdg python3.7 python3.7-dev python3.7-minimal readline-common shared-mime-info xdg-user-dirs
  xz-utils
0 upgraded, 126 newly installed, 0 to remove and 0 not upgraded.
Need to get 56.7 MB/142 MB of archives.
After this operation, 446 MB of additional disk space will be used.
Get:1 http://deb.debian.org/debian-security buster/updates/main amd64 python3.7-minimal amd64 3.7.3-2+deb10u4 [1736 kB]
Get:2 http://deb.debian.org/debian buster/main amd64 python3-minimal amd64 3.7.3-1 [36.6 kB]
Get:3 http://deb.debian.org/debian-security buster/updates/main amd64 python3.7 amd64 3.7.3-2+deb10u4 [330 kB]
Get:4 http://deb.debian.org/debian buster/main amd64 libpython3-stdlib amd64 3.7.3-1 [20.0 kB]
Get:5 http://deb.debian.org/debian buster/main amd64 python3 amd64 3.7.3-1 [61.5 kB]
Get:6 http://deb.debian.org/debian buster/main amd64 libapparmor1 amd64 2.13.2-10 [94.7 kB]
Get:7 http://deb.debian.org/debian-security buster/updates/main amd64 libdbus-1-3 amd64 1.12.24-0+deb10u1 [218 kB]
Get:8 http://deb.debian.org/debian-security buster/updates/main amd64 dbus amd64 1.12.24-0+deb10u1 [240 kB]
Get:9 http://deb.debian.org/debian-security buster/updates/main amd64 openssl amd64 1.1.1n-0+deb10u4 [855 kB]
Get:10 http://deb.debian.org/debian buster/main amd64 ca-certificates all 20200601~deb10u2 [166 kB]
Get:11 http://deb.debian.org/debian buster/main amd64 python3-lib2to3 all 3.7.3-1 [76.7 kB]
Get:12 http://deb.debian.org/debian buster/main amd64 python3-distutils all 3.7.3-1 [142 kB]
Get:13 http://deb.debian.org/debian buster/main amd64 dh-python all 3.20190308 [99.3 kB]
Get:14 http://deb.debian.org/debian buster/main amd64 libgirepository-1.0-1 amd64 1.58.3-2 [92.8 kB]
Get:15 http://deb.debian.org/debian buster/main amd64 gir1.2-glib-2.0 amd64 1.58.3-2 [143 kB]
Get:16 http://deb.debian.org/debian-security buster/updates/main amd64 libexpat1-dev amd64 2.2.6-2+deb10u6 [155 kB]
Get:17 http://deb.debian.org/debian-security buster/updates/main amd64 libpython3.7-dev amd64 3.7.3-2+deb10u4 [48.4 MB]
Get:18 http://deb.debian.org/debian buster/main amd64 libpython3-dev amd64 3.7.3-1 [20.1 kB]
Get:19 http://deb.debian.org/debian buster/main amd64 python-pip-whl all 18.1-5 [1591 kB]
Get:20 http://deb.debian.org/debian buster/main amd64 python3-asn1crypto all 0.24.0-1 [78.2 kB]
Get:21 http://deb.debian.org/debian buster/main amd64 python3-cffi-backend amd64 1.12.2-1 [79.7 kB]
Get:22 http://deb.debian.org/debian buster/main amd64 python3-crypto amd64 2.6.1-9+b1 [263 kB]
Get:23 http://deb.debian.org/debian buster/main amd64 python3-six all 1.12.0-1 [15.7 kB]
Get:24 http://deb.debian.org/debian-security buster/updates/main amd64 python3-cryptography amd64 2.6.1-3+deb10u4 [218 kB]
Get:25 http://deb.debian.org/debian buster/main amd64 python3-dbus amd64 1.2.8-3 [103 kB]
Get:26 http://deb.debian.org/debian-security buster/updates/main amd64 python3.7-dev amd64 3.7.3-2+deb10u4 [513 kB]
Get:27 http://deb.debian.org/debian buster/main amd64 python3-dev amd64 3.7.3-1 [1264 B]
Get:28 http://deb.debian.org/debian buster/main amd64 python3-entrypoints all 0.3-1 [5508 B]
Get:29 http://deb.debian.org/debian buster/main amd64 python3-gi amd64 3.30.4-1 [180 kB]
Get:30 http://deb.debian.org/debian buster/main amd64 python3-secretstorage all 2.3.1-2 [14.2 kB]
Get:31 http://deb.debian.org/debian buster/main amd64 python3-keyring all 17.1.1-1 [43.1 kB]
Get:32 http://deb.debian.org/debian buster/main amd64 python3-keyrings.alt all 3.1.1-1 [18.2 kB]
Get:33 http://deb.debian.org/debian buster/main amd64 python3-pip all 18.1-5 [171 kB]
Get:34 http://deb.debian.org/debian buster/main amd64 python3-pkg-resources all 40.8.0-1 [153 kB]
Get:35 http://deb.debian.org/debian buster/main amd64 python3-setuptools all 40.8.0-1 [306 kB]
Get:36 http://deb.debian.org/debian buster/main amd64 python3-wheel all 0.32.3-2 [19.4 kB]
Get:37 http://deb.debian.org/debian buster/main amd64 python3-xdg all 0.25-5 [35.9 kB]
Fetched 56.7 MB in 9s (6301 kB/s)
Download complete and in download only mode






root@d1db8268abb6:/dkr/deb10# ls -lh archives/
total 348M
-rw-r--r-- 1 root root  69K Feb 10  2019 binfmt-support_2.2.0-2_amd64.deb
-rw-r--r-- 1 root root  53M Mar 22  2019 binutils-aarch64-linux-gnu-dbg_2.31.1-16_amd64.deb
-rw-r--r-- 1 root root 2.8M Mar 22  2019 binutils-aarch64-linux-gnu_2.31.1-16_amd64.deb
-rw-r--r-- 1 root root  52M Mar 22  2019 binutils-arm-linux-gnueabihf-dbg_2.31.1-16_amd64.deb
-rw-r--r-- 1 root root 2.8M Mar 22  2019 binutils-arm-linux-gnueabihf_2.31.1-16_amd64.deb
-rw-r--r-- 1 root root 2.0M Mar 22  2019 binutils-common_2.31.1-16_amd64.deb
-rw-r--r-- 1 root root 1.8M Mar 22  2019 binutils-x86-64-linux-gnu_2.31.1-16_amd64.deb
-rw-r--r-- 1 root root  56K Mar 22  2019 binutils_2.31.1-16_amd64.deb
-rw-r--r-- 1 root root 7.4K Mar  1  2019 build-essential_12.6_amd64.deb
-rw-r--r-- 1 root root  48K Sep 16 07:29 bzip2_1.0.6-9.2~deb10u2_amd64.deb
-rw-r--r-- 1 root root 162K Jan 28  2021 ca-certificates_20200601~deb10u2_all.deb
-rw-r--r-- 1 root root 6.0M Feb 27  2019 cpp-8-aarch64-linux-gnu_8.3.0-2cross1_amd64.deb
-rw-r--r-- 1 root root 6.3M Feb 27  2019 cpp-8-arm-linux-gnueabihf_8.3.0-2cross1_amd64.deb
-rw-r--r-- 1 root root 8.6M Apr  6  2019 cpp-8_8.3.0-6_amd64.deb
-rw-r--r-- 1 root root  17K Mar  1  2019 cpp-aarch64-linux-gnu_4%3a8.3.0-1_amd64.deb
-rw-r--r-- 1 root root  17K Mar  1  2019 cpp-arm-linux-gnueabihf_4%3a8.3.0-1_amd64.deb
-rw-r--r-- 1 root root  19K Mar  1  2019 cpp_4%3a8.3.0-1_amd64.deb
-rw-r--r-- 1 root root 235K Oct 10 14:42 dbus_1.12.24-0+deb10u1_amd64.deb
-rw-r--r-- 1 root root  97K Mar  8  2019 dh-python_3.20190308_all.deb
-rw-r--r-- 1 root root 696K Jul  1  2022 dirmngr_2.2.12-1+deb10u2_amd64.deb
-rw-r--r-- 1 root root 1.7M May 24  2022 dpkg-dev_1.19.8_all.deb
-rw-r--r-- 1 root root  84K Jul  1  2018 fakeroot_1.23-1_amd64.deb
-rw-r--r-- 1 root root  65K Jan 28  2021 file_1%3a5.35-4+deb10u2_amd64.deb
-rw-r--r-- 1 root root 6.6M Feb 27  2019 g++-8-aarch64-linux-gnu_8.3.0-2cross1_amd64.deb
-rw-r--r-- 1 root root 6.9M Feb 27  2019 g++-8-arm-linux-gnueabihf_8.3.0-2cross1_amd64.deb
-rw-r--r-- 1 root root 9.4M Apr  6  2019 g++-8_8.3.0-6_amd64.deb
-rw-r--r-- 1 root root 1.2K Mar  1  2019 g++-aarch64-linux-gnu_4%3a8.3.0-1_amd64.deb
-rw-r--r-- 1 root root 1.2K Mar  1  2019 g++-arm-linux-gnueabihf_4%3a8.3.0-1_amd64.deb
-rw-r--r-- 1 root root 1.7K Mar  1  2019 g++_4%3a8.3.0-1_amd64.deb
-rw-r--r-- 1 root root 186K Feb 27  2019 gcc-8-aarch64-linux-gnu-base_8.3.0-2cross1_amd64.deb
-rw-r--r-- 1 root root 6.4M Feb 27  2019 gcc-8-aarch64-linux-gnu_8.3.0-2cross1_amd64.deb
-rw-r--r-- 1 root root 186K Feb 27  2019 gcc-8-arm-linux-gnueabihf-base_8.3.0-2cross1_amd64.deb
-rw-r--r-- 1 root root 6.7M Feb 27  2019 gcc-8-arm-linux-gnueabihf_8.3.0-2cross1_amd64.deb
-rw-r--r-- 1 root root 181K Feb 28  2019 gcc-8-cross-base_8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root 9.1M Apr  6  2019 gcc-8_8.3.0-6_amd64.deb
-rw-r--r-- 1 root root 1.5K Mar  1  2019 gcc-aarch64-linux-gnu_4%3a8.3.0-1_amd64.deb
-rw-r--r-- 1 root root 1.5K Mar  1  2019 gcc-arm-linux-gnueabihf_4%3a8.3.0-1_amd64.deb
-rw-r--r-- 1 root root 5.1K Mar  1  2019 gcc_4%3a8.3.0-1_amd64.deb
-rw-r--r-- 1 root root 3.5M Oct 14  2019 gdb-multiarch_8.2.1-2+b3_amd64.deb
-rw-r--r-- 1 root root 3.0M Oct 14  2019 gdb_8.2.1-2+b3_amd64.deb
-rw-r--r-- 1 root root 140K Jan 11  2019 gir1.2-glib-2.0_1.58.3-2_amd64.deb
-rw-r--r-- 1 root root 986K Jul  1  2022 gnupg-l10n_2.2.12-1+deb10u2_all.deb
-rw-r--r-- 1 root root 842K Jul  1  2022 gnupg-utils_2.2.12-1+deb10u2_amd64.deb
-rw-r--r-- 1 root root 699K Jul  1  2022 gnupg_2.2.12-1+deb10u2_all.deb
-rw-r--r-- 1 root root 603K Jul  1  2022 gpg-agent_2.2.12-1+deb10u2_amd64.deb
-rw-r--r-- 1 root root 474K Jul  1  2022 gpg-wks-client_2.2.12-1+deb10u2_amd64.deb
-rw-r--r-- 1 root root 467K Jul  1  2022 gpg-wks-server_2.2.12-1+deb10u2_amd64.deb
-rw-r--r-- 1 root root 845K Jul  1  2022 gpg_2.2.12-1+deb10u2_amd64.deb
-rw-r--r-- 1 root root 498K Jul  1  2022 gpgconf_2.2.12-1+deb10u2_amd64.deb
-rw-r--r-- 1 root root 590K Jul  1  2022 gpgsm_2.2.12-1+deb10u2_amd64.deb
-rw-r--r-- 1 root root  47K Aug 25  2018 libalgorithm-diff-perl_1.19.03-2_all.deb
-rw-r--r-- 1 root root  12K Nov  1  2018 libalgorithm-diff-xs-perl_0.04-5+b1_amd64.deb
-rw-r--r-- 1 root root  13K Nov 21  2015 libalgorithm-merge-perl_0.08-3_all.deb
-rw-r--r-- 1 root root  93K Mar 30  2019 libapparmor1_2.13.2-10_amd64.deb
-rw-r--r-- 1 root root 314K Feb 28  2019 libasan5-arm64-cross_8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root 322K Feb 28  2019 libasan5-armhf-cross_8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root 354K Apr  6  2019 libasan5_8.3.0-6_amd64.deb
-rw-r--r-- 1 root root  49K Dec 15  2018 libassuan0_2.5.2-1_amd64.deb
-rw-r--r-- 1 root root 8.5K Feb 28  2019 libatomic1-arm64-cross_8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root 6.5K Feb 28  2019 libatomic1-armhf-cross_8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root 8.9K Apr  6  2019 libatomic1_8.3.0-6_amd64.deb
-rw-r--r-- 1 root root 168K Aug 25  2019 libbabeltrace1_1.5.6-2+deb10u1_amd64.deb
-rw-r--r-- 1 root root 468K Mar 22  2019 libbinutils_2.31.1-16_amd64.deb
-rw-r--r-- 1 root root 270K Oct 17 13:59 libc-dev-bin_2.28-10+deb10u2_amd64.deb
-rw-r--r-- 1 root root 1.3M Feb 27  2019 libc6-arm64-cross_2.28-7cross1_all.deb
-rw-r--r-- 1 root root 1.2M Feb 27  2019 libc6-armhf-cross_2.28-7cross1_all.deb
-rw-r--r-- 1 root root  12M Oct 17 13:59 libc6-dbg_2.28-10+deb10u2_amd64.deb
-rw-r--r-- 1 root root 2.3M Feb 27  2019 libc6-dev-arm64-cross_2.28-7cross1_all.deb
-rw-r--r-- 1 root root 2.1M Feb 27  2019 libc6-dev-armhf-cross_2.28-7cross1_all.deb
-rw-r--r-- 1 root root 2.6M Oct 17 13:59 libc6-dev_2.28-10+deb10u2_amd64.deb
-rw-r--r-- 1 root root 434K Feb 28  2019 libcapstone3_4.0.1+really+3.0.5-1_amd64.deb
-rw-r--r-- 1 root root  46K Apr  6  2019 libcc1-0_8.3.0-6_amd64.deb
-rw-r--r-- 1 root root 213K Oct 10 14:42 libdbus-1-3_1.12.24-0+deb10u1_amd64.deb
-rw-r--r-- 1 root root 1.4M May 24  2022 libdpkg-perl_1.19.8_all.deb
-rw-r--r-- 1 root root 230K May 28  2019 libdw1_0.176-1.1_amd64.deb
-rw-r--r-- 1 root root 152K Oct 27 22:26 libexpat1-dev_2.2.6-2+deb10u6_amd64.deb
-rw-r--r-- 1 root root 106K Oct 27 22:26 libexpat1_2.2.6-2+deb10u6_amd64.deb
-rw-r--r-- 1 root root  45K Jul  1  2018 libfakeroot_1.23-1_amd64.deb
-rw-r--r-- 1 root root  35K Nov  1  2018 libfile-fcntllock-perl_0.22-3+b5_amd64.deb
-rw-r--r-- 1 root root 814K Feb 28  2019 libgcc-8-dev-arm64-cross_8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root 598K Feb 28  2019 libgcc-8-dev-armhf-cross_8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root 2.2M Apr  6  2019 libgcc-8-dev_8.3.0-6_amd64.deb
-rw-r--r-- 1 root root  34K Feb 28  2019 libgcc1-arm64-cross_1%3a8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root  37K Feb 28  2019 libgcc1-armhf-cross_1%3a8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root  44K Mar 12  2019 libgdbm-compat4_1.18.1-4_amd64.deb
-rw-r--r-- 1 root root  64K Mar 12  2019 libgdbm6_1.18.1-4_amd64.deb
-rw-r--r-- 1 root root  91K Jan 11  2019 libgirepository-1.0-1_1.58.3-2_amd64.deb
-rw-r--r-- 1 root root 1.3M Sep 15 12:29 libglib2.0-0_2.58.3-2+deb10u4_amd64.deb
-rw-r--r-- 1 root root 1.1M Sep 15 12:14 libglib2.0-data_2.58.3-2+deb10u4_all.deb
-rw-r--r-- 1 root root  65K Feb 28  2019 libgomp1-arm64-cross_8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root  62K Feb 28  2019 libgomp1-armhf-cross_8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root  75K Apr  6  2019 libgomp1_8.3.0-6_amd64.deb
-rw-r--r-- 1 root root 8.0M Dec 24  2021 libicu63_63.1-6+deb10u3_amd64.deb
-rw-r--r-- 1 root root  41K Sep  8  2018 libipt2_2.0-2_amd64.deb
-rw-r--r-- 1 root root 573K Aug 14  2018 libisl19_0.20-2_amd64.deb
-rw-r--r-- 1 root root  24K Feb 28  2019 libitm1-arm64-cross_8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root  28K Apr  6  2019 libitm1_8.3.0-6_amd64.deb
-rw-r--r-- 1 root root 100K Dec 24 15:25 libksba8_1.3.5-2+deb10u2_amd64.deb
-rw-r--r-- 1 root root 220K May 16  2022 libldap-2.4-2_2.4.47+dfsg-3+deb10u7_amd64.deb
-rw-r--r-- 1 root root  88K May 16  2022 libldap-common_2.4.47+dfsg-3+deb10u7_all.deb
-rw-r--r-- 1 root root  19K Nov  1  2018 liblocale-gettext-perl_1.07-3+b4_amd64.deb
-rw-r--r-- 1 root root 114K Feb 28  2019 liblsan0-arm64-cross_8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root 128K Apr  6  2019 liblsan0_8.3.0-6_amd64.deb
-rw-r--r-- 1 root root 237K Jan 28  2021 libmagic-mgc_1%3a5.35-4+deb10u2_amd64.deb
-rw-r--r-- 1 root root 115K Jan 28  2021 libmagic1_1%3a5.35-4+deb10u2_amd64.deb
-rw-r--r-- 1 root root  41K Jan 23  2018 libmpc3_1.1.0-1_amd64.deb
-rw-r--r-- 1 root root  86K Apr 23  2018 libmpdec2_2.4.2-2_amd64.deb
-rw-r--r-- 1 root root 757K Feb  1  2019 libmpfr6_4.0.2-1_amd64.deb
-rw-r--r-- 1 root root  12K Apr  6  2019 libmpx2_8.3.0-6_amd64.deb
-rw-r--r-- 1 root root  18K Jul 17  2018 libnpth0_1.6-1_amd64.deb
-rw-r--r-- 1 root root 3.8M Jul 24  2020 libperl5.28_5.28.1-6+deb10u1_amd64.deb
-rw-r--r-- 1 root root  31K Feb 10  2019 libpipeline1_1.5.1-2_amd64.deb
-rw-r--r-- 1 root root  49K Jan 11  2019 libpopt0_1.16-12_amd64.deb
-rw-r--r-- 1 root root  20K Mar 26  2019 libpython3-dev_3.7.3-1_amd64.deb
-rw-r--r-- 1 root root  20K Mar 26  2019 libpython3-stdlib_3.7.3-1_amd64.deb
-rw-r--r-- 1 root root  47M Oct 31 19:59 libpython3.7-dev_3.7.3-2+deb10u4_amd64.deb
-rw-r--r-- 1 root root 576K Oct 31 19:59 libpython3.7-minimal_3.7.3-2+deb10u4_amd64.deb
-rw-r--r-- 1 root root 1.7M Oct 31 19:59 libpython3.7-stdlib_3.7.3-2+deb10u4_amd64.deb
-rw-r--r-- 1 root root 1.5M Oct 31 19:59 libpython3.7_3.7.3-2+deb10u4_amd64.deb
-rw-r--r-- 1 root root 130K Apr  6  2019 libquadmath0_8.3.0-6_amd64.deb
-rw-r--r-- 1 root root 148K May  5  2018 libreadline7_7.0-5_amd64.deb
-rw-r--r-- 1 root root 104K Feb 25  2022 libsasl2-2_2.1.27+dfsg-1+deb10u2_amd64.deb
-rw-r--r-- 1 root root  68K Feb 25  2022 libsasl2-modules-db_2.1.27+dfsg-1+deb10u2_amd64.deb
-rw-r--r-- 1 root root 102K Feb 25  2022 libsasl2-modules_2.1.27+dfsg-1+deb10u2_amd64.deb
-rw-r--r-- 1 root root 627K Sep 14 06:59 libsqlite3-0_3.27.2-3+deb10u2_amd64.deb
-rw-r--r-- 1 root root 1.5M Feb 20 10:59 libssl1.1_1.1.1n-0+deb10u4_amd64.deb
-rw-r--r-- 1 root root 1.5M Feb 28  2019 libstdc++-8-dev-arm64-cross_8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root 1.5M Feb 28  2019 libstdc++-8-dev-armhf-cross_8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root 1.5M Apr  6  2019 libstdc++-8-dev_8.3.0-6_amd64.deb
-rw-r--r-- 1 root root 318K Feb 28  2019 libstdc++6-arm64-cross_8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root 295K Feb 28  2019 libstdc++6-armhf-cross_8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root 249K Feb 28  2019 libtsan0-arm64-cross_8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root 277K Apr  6  2019 libtsan0_8.3.0-6_amd64.deb
-rw-r--r-- 1 root root 108K Feb 28  2019 libubsan1-arm64-cross_8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root 101K Feb 28  2019 libubsan1-armhf-cross_8.3.0-2cross1_all.deb
-rw-r--r-- 1 root root 118K Apr  6  2019 libubsan1_8.3.0-6_amd64.deb
-rw-r--r-- 1 root root 675K Oct 30 15:28 libxml2_2.9.4+dfsg1-7+deb10u5_amd64.deb
-rw-r--r-- 1 root root 1.2M Feb 27  2019 linux-libc-dev-arm64-cross_4.19.20-1cross1_all.deb
-rw-r--r-- 1 root root 1.2M Feb 27  2019 linux-libc-dev-armhf-cross_4.19.20-1cross1_all.deb
-rw-r--r-- 1 root root 1.5M Dec 21 18:45 linux-libc-dev_4.19.269-1_amd64.deb
-rw-r----- 1 root root    0 Mar  5 01:01 lock
-rw-r--r-- 1 root root  28K May 16  2019 lsb-base_10.2019051400_all.deb
-rw-r--r-- 1 root root 333K Aug  4  2018 make_4.2.1-1.2_amd64.deb
-rw-r--r-- 1 root root 2.2M May  7  2019 manpages-dev_4.16-2_all.deb
-rw-r--r-- 1 root root 1.3M May  7  2019 manpages_4.16-2_all.deb
-rw-r--r-- 1 root root  37K Feb  9  2019 mime-support_3.62_all.deb
-rw-r--r-- 1 root root  19K Feb 10  2019 netbase_5.6_all.deb
-rw-r--r-- 1 root root 835K Feb 20 10:59 openssl_1.1.1n-0+deb10u4_amd64.deb
drwx------ 2 _apt root 4.0K Mar  5 01:08 partial
-rw-r--r-- 1 root root 124K Jul 27  2019 patch_2.7.6-3+deb10u1_amd64.deb
-rw-r--r-- 1 root root 2.8M Jul 24  2020 perl-modules-5.28_5.28.1-6+deb10u1_all.deb
-rw-r--r-- 1 root root 200K Jul 24  2020 perl_5.28.1-6+deb10u1_amd64.deb
-rw-r--r-- 1 root root  64K Apr 17  2019 pinentry-curses_1.1.0-2_amd64.deb
-rw-r--r-- 1 root root 1.6M Mar 30  2019 python-pip-whl_18.1-5_all.deb
-rw-r--r-- 1 root root  77K Dec 23  2017 python3-asn1crypto_0.24.0-1_all.deb
-rw-r--r-- 1 root root  78K Feb 27  2019 python3-cffi-backend_1.12.2-1_amd64.deb
-rw-r--r-- 1 root root 257K Jun 29  2018 python3-crypto_2.6.1-9+b1_amd64.deb
-rw-r--r-- 1 root root 214K Feb 22 17:21 python3-cryptography_2.6.1-3+deb10u4_amd64.deb
-rw-r--r-- 1 root root 101K Jan 29  2019 python3-dbus_1.2.8-3_amd64.deb
-rw-r--r-- 1 root root 1.3K Mar 26  2019 python3-dev_3.7.3-1_amd64.deb
-rw-r--r-- 1 root root 139K Mar 26  2019 python3-distutils_3.7.3-1_all.deb
-rw-r--r-- 1 root root 5.4K Jan 16  2019 python3-entrypoints_0.3-1_all.deb
-rw-r--r-- 1 root root 176K Dec 14  2018 python3-gi_3.30.4-1_amd64.deb
-rw-r--r-- 1 root root  43K Dec 31  2018 python3-keyring_17.1.1-1_all.deb
-rw-r--r-- 1 root root  18K Dec 28  2018 python3-keyrings.alt_3.1.1-1_all.deb
-rw-r--r-- 1 root root  75K Mar 26  2019 python3-lib2to3_3.7.3-1_all.deb
-rw-r--r-- 1 root root  36K Mar 26  2019 python3-minimal_3.7.3-1_amd64.deb
-rw-r--r-- 1 root root 167K Mar 30  2019 python3-pip_18.1-5_all.deb
-rw-r--r-- 1 root root 150K Feb  9  2019 python3-pkg-resources_40.8.0-1_all.deb
-rw-r--r-- 1 root root  14K Aug 28  2016 python3-secretstorage_2.3.1-2_all.deb
-rw-r--r-- 1 root root 299K Feb  9  2019 python3-setuptools_40.8.0-1_all.deb
-rw-r--r-- 1 root root  16K Dec 10  2018 python3-six_1.12.0-1_all.deb
-rw-r--r-- 1 root root  19K Feb  8  2019 python3-wheel_0.32.3-2_all.deb
-rw-r--r-- 1 root root  36K Feb 17  2019 python3-xdg_0.25-5_all.deb
-rw-r--r-- 1 root root 501K Oct 31 19:59 python3.7-dev_3.7.3-2+deb10u4_amd64.deb
-rw-r--r-- 1 root root 1.7M Oct 31 19:59 python3.7-minimal_3.7.3-2+deb10u4_amd64.deb
-rw-r--r-- 1 root root 323K Oct 31 19:59 python3.7_3.7.3-2+deb10u4_amd64.deb
-rw-r--r-- 1 root root  61K Mar 26  2019 python3_3.7.3-1_amd64.deb
-rw-r--r-- 1 root root 2.6K Sep  3  2022 qemu-user-binfmt_1%3a3.1+dfsg-8+deb10u9_amd64.deb
-rw-r--r-- 1 root root  21M Sep  3  2022 qemu-user-static_1%3a3.1+dfsg-8+deb10u9_amd64.deb
-rw-r--r-- 1 root root 9.6M Sep  3  2022 qemu-user_1%3a3.1+dfsg-8+deb10u9_amd64.deb
-rw-r--r-- 1 root root  69K May  5  2018 readline-common_7.0-5_all.deb
-rw-r--r-- 1 root root 748K Sep 25  2018 shared-mime-info_1.10-1_amd64.deb
-rw-r--r-- 1 root root  53K Dec 28  2018 xdg-user-dirs_0.17-2_amd64.deb
-rw-r--r-- 1 root root 180K Apr 11  2022 xz-utils_5.2.4-1+deb10u1_amd64.deb


root@d1db8268abb6:/dkr/deb10# du -sh archives/
348M    archives/


```





some tools in package

readelf binutils-linux-gnu    (binutils-aarch64-linux-gnu, binutils-multiarch (for armhf))

arm-none-linux-gnueabi-objdump -x $1 | grep NEEDED
/usr/bin/arm-linux-gnueabihf-readelf -a /opt/icu-71.1.x/release32/lib/libicudata_sb32.so.71

icuio:
ELF Header:
  Magic:   7f 45 4c 46 01 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF32
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              DYN (Shared object file)
  Machine:                           ARM
  Version:                           0x1
  Entry point address:               0x2780
  Start of program headers:          52 (bytes into file)
  Start of section headers:          48364 (bytes into file)
  Flags:                             0x5000400, Version5 EABI, hard-float ABI
  Size of this header:               52 (bytes)
  Size of program headers:           32 (bytes)
  Number of program headers:         7
  Size of section headers:           40 (bytes)
  Number of section headers:         29
  Section header string table index: 28

icudata:
ELF Header:
  Magic:   7f 45 4c 46 01 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF32
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              DYN (Shared object file)
  Machine:                           ARM
  Version:                           0x1
  Entry point address:               0x184
  Start of program headers:          52 (bytes into file)
  Start of section headers:          31318488 (bytes into file)
  Flags:                             0x5000200, Version5 EABI, soft-float ABI
  Size of this header:               52 (bytes)
  Size of program headers:           32 (bytes)
  Number of program headers:         6
  Size of section headers:           40 (bytes)
  Number of section headers:         12
  Section header string table index: 11


aarch64-linux-gnu-readelf
/opt/icu-71.1.x/release64/lib

icudata
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              DYN (Shared object file)
  Machine:                           AArch64
  Version:                           0x1
  Entry point address:               0x239
  Start of program headers:          64 (bytes into file)
  Start of section headers:          31322656 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           56 (bytes)
  Number of program headers:         6
  Size of section headers:           64 (bytes)
  Number of section headers:         12
  Section header string table index: 11

icuio
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              DYN (Shared object file)
  Machine:                           AArch64
  Version:                           0x1
  Entry point address:               0x36b0
  Start of program headers:          64 (bytes into file)
  Start of section headers:          74528 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           56 (bytes)
  Number of program headers:         7
  Size of section headers:           64 (bytes)
  Number of section headers:         29
  Section header string table index: 28

## dockfile
