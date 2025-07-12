---
title: Cross Build (arm)
nav: cross dev arm
---

Reference
* [Azeria Labs](https://azeria-labs.com/arm-on-x86-qemu-user/#:~:text=Voil%C3%A0%2C%20our%20statically%20linked%20aarch64,Yes%2C%20we%20can.)

## sample app

```sh
root@6c62d0585aee:/home# g++ -o hello hello.cpp
root@6c62d0585aee:/home# ./hello
Hello, world!
root@6c62d0585aee:/home# file hello
hello: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=4efdb8ce46bc97ed30278a3dd3cd6958af3ed5ce, for GNU/Linux 3.2.0, not stripped
root@6c62d0585aee:/home# g++ -o hello32 -m32 hello.cpp
In file included from hello.cpp:1:
/usr/include/c++/10/iostream:38:10: fatal error: bits/c++config.h: No such file or directory
   38 | #include <bits/c++config.h>
      |          ^~~~~~~~~~~~~~~~~~
compilation terminated.
root@6c62d0585aee:/home# ldd hello
        linux-vdso.so.1 (0x00007ffe121b9000)
        libstdc++.so.6 => /usr/lib/x86_64-linux-gnu/libstdc++.so.6 (0x00007f22f2042000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f22f1e69000)
        libm.so.6 => /lib/x86_64-linux-gnu/libm.so.6 (0x00007f22f1d25000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f22f2216000)
        libgcc_s.so.1 => /lib/x86_64-linux-gnu/libgcc_s.so.1 (0x00007f22f1d0b000)
root@6c62d0585aee:/home#
#



## install cross support

apt packages
* gcc-arm-linux-gnueabihf 

```sh
apt install dpkg-cross
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  binutils binutils-common binutils-x86-64-linux-gnu build-essential bzip2 ca-certificates cpp cpp-10 cross-config dirmngr dpkg-dev fakeroot file
  fontconfig-config fonts-dejavu-core g++ g++-10 gcc gcc-10 gnupg gnupg-l10n gnupg-utils gpg gpg-agent gpg-wks-client gpg-wks-server gpgconf gpgsm
  libalgorithm-diff-perl libalgorithm-diff-xs-perl libalgorithm-merge-perl libasan6 libassuan0 libatomic1 libauthen-sasl-perl libbinutils libbrotli1
  libbsd0 libc-dev-bin libc-devtools libc6-dev libcc1-0 libclone-perl libconfig-auto-perl libconfig-inifiles-perl libcrypt-dev libctf-nobfd0 libctf0
  libdata-dump-perl libdebian-dpkgcross-perl libdeflate0 libdpkg-perl libencode-locale-perl libexpat1 libfakeroot libfile-fcntllock-perl
  libfile-homedir-perl libfile-listing-perl libfile-which-perl libfont-afm-perl libfontconfig1 libfreetype6 libgcc-10-dev libgd3 libgdbm-compat4 libgdbm6
  libgomp1 libgpm2 libhtml-form-perl libhtml-format-perl libhtml-parser-perl libhtml-tagset-perl libhtml-tree-perl libhttp-cookies-perl
  libhttp-daemon-perl libhttp-date-perl libhttp-message-perl libhttp-negotiate-perl libicu67 libio-html-perl libio-socket-ssl-perl libio-string-perl
  libisl23 libitm1 libjbig0 libjpeg62-turbo libksba8 libldap-2.4-2 libldap-common liblocale-gettext-perl liblsan0 liblwp-mediatypes-perl
  liblwp-protocol-https-perl libmagic-mgc libmagic1 libmailtools-perl libmd0 libmpc3 libmpfr6 libncursesw6 libnet-http-perl libnet-smtp-ssl-perl
  libnet-ssleay-perl libnpth0 libnsl-dev libperl5.32 libpng16-16 libquadmath0 libreadline8 libsasl2-2 libsasl2-modules libsasl2-modules-db libsqlite3-0
  libstdc++-10-dev libtiff5 libtimedate-perl libtirpc-dev libtry-tiny-perl libtsan0 libubsan1 liburi-perl libwebp6 libwww-perl libwww-robotrules-perl
  libx11-6 libx11-data libxau6 libxcb1 libxdmcp6 libxml-libxml-perl libxml-namespacesupport-perl libxml-parser-perl libxml-sax-base-perl
  libxml-sax-expat-perl libxml-sax-perl libxml-simple-perl libxml2 libxpm4 libyaml-0-2 libyaml-libyaml-perl libyaml-perl linux-libc-dev make manpages
  manpages-dev netbase openssl patch perl perl-modules-5.32 perl-openssl-defaults pinentry-curses readline-common sensible-utils ucf xz-utils
Suggested packages:
  binutils-doc bzip2-doc cpp-doc gcc-10-locales dbus-user-session libpam-systemd pinentry-gnome3 tor binutils-multiarch debian-keyring g++-multilib
  g++-10-multilib gcc-10-doc gcc-multilib autoconf automake libtool flex bison gdb gcc-doc gcc-10-multilib parcimonie xloadimage scdaemon
  libdigest-hmac-perl libgssapi-perl glibc-doc git bzr libgd-tools gdbm-l10n gpm libcrypt-ssleay-perl libsasl2-modules-gssapi-mit
  | libsasl2-modules-gssapi-heimdal libsasl2-modules-ldap libsasl2-modules-otp libsasl2-modules-sql libstdc++-10-doc libauthen-ntlm-perl
  libxml-sax-expatxs-perl libyaml-shell-perl make-doc man-browser ed diffutils-doc perl-doc libterm-readline-gnu-perl | libterm-readline-perl-perl
  libtap-harness-archive-perl pinentry-doc readline-doc
The following NEW packages will be installed:
  binutils binutils-common binutils-x86-64-linux-gnu build-essential bzip2 ca-certificates cpp cpp-10 cross-config dirmngr dpkg-cross dpkg-dev fakeroot
  file fontconfig-config fonts-dejavu-core g++ g++-10 gcc gcc-10 gnupg gnupg-l10n gnupg-utils gpg gpg-agent gpg-wks-client gpg-wks-server gpgconf gpgsm
  libalgorithm-diff-perl libalgorithm-diff-xs-perl libalgorithm-merge-perl libasan6 libassuan0 libatomic1 libauthen-sasl-perl libbinutils libbrotli1
  libbsd0 libc-dev-bin libc-devtools libc6-dev libcc1-0 libclone-perl libconfig-auto-perl libconfig-inifiles-perl libcrypt-dev libctf-nobfd0 libctf0
  libdata-dump-perl libdebian-dpkgcross-perl libdeflate0 libdpkg-perl libencode-locale-perl libexpat1 libfakeroot libfile-fcntllock-perl
  libfile-homedir-perl libfile-listing-perl libfile-which-perl libfont-afm-perl libfontconfig1 libfreetype6 libgcc-10-dev libgd3 libgdbm-compat4 libgdbm6
  libgomp1 libgpm2 libhtml-form-perl libhtml-format-perl libhtml-parser-perl libhtml-tagset-perl libhtml-tree-perl libhttp-cookies-perl
  libhttp-daemon-perl libhttp-date-perl libhttp-message-perl libhttp-negotiate-perl libicu67 libio-html-perl libio-socket-ssl-perl libio-string-perl
  libisl23 libitm1 libjbig0 libjpeg62-turbo libksba8 libldap-2.4-2 libldap-common liblocale-gettext-perl liblsan0 liblwp-mediatypes-perl
  liblwp-protocol-https-perl libmagic-mgc libmagic1 libmailtools-perl libmd0 libmpc3 libmpfr6 libncursesw6 libnet-http-perl libnet-smtp-ssl-perl
  libnet-ssleay-perl libnpth0 libnsl-dev libperl5.32 libpng16-16 libquadmath0 libreadline8 libsasl2-2 libsasl2-modules libsasl2-modules-db libsqlite3-0
  libstdc++-10-dev libtiff5 libtimedate-perl libtirpc-dev libtry-tiny-perl libtsan0 libubsan1 liburi-perl libwebp6 libwww-perl libwww-robotrules-perl
  libx11-6 libx11-data libxau6 libxcb1 libxdmcp6 libxml-libxml-perl libxml-namespacesupport-perl libxml-parser-perl libxml-sax-base-perl
  libxml-sax-expat-perl libxml-sax-perl libxml-simple-perl libxml2 libxpm4 libyaml-0-2 libyaml-libyaml-perl libyaml-perl linux-libc-dev make manpages
  manpages-dev netbase openssl patch perl perl-modules-5.32 perl-openssl-defaults pinentry-curses readline-common sensible-utils ucf xz-utils
0 upgraded, 157 newly installed, 0 to remove and 0 not upgraded.
Need to get 102 MB of archives.
After this operation, 369 MB of additional disk space will be used.
Do you want to continue? [Y/n] y
Get:1 http://deb.debian.org/debian bullseye/main amd64 perl-modules-5.32 all 5.32.1-4+deb11u2 [2823 kB]
Get:2 http://deb.debian.org/debian bullseye/main amd64 libgdbm6 amd64 1.19-2 [64.9 kB]
Get:3 http://deb.debian.org/debian bullseye/main amd64 libgdbm-compat4 amd64 1.19-2 [44.7 kB]
Get:4 http://deb.debian.org/debian bullseye/main amd64 libperl5.32 amd64 5.32.1-4+deb11u2 [4106 kB]
Get:5 http://deb.debian.org/debian bullseye/main amd64 perl amd64 5.32.1-4+deb11u2 [293 kB]
Get:6 http://deb.debian.org/debian bullseye/main amd64 liblocale-gettext-perl amd64 1.07-4+b1 [19.0 kB]
Get:7 http://deb.debian.org/debian bullseye/main amd64 readline-common all 8.1-1 [73.7 kB]
Get:8 http://deb.debian.org/debian bullseye/main amd64 libreadline8 amd64 8.1-1 [169 kB]
Get:9 http://deb.debian.org/debian bullseye/main amd64 netbase all 6.3 [19.9 kB]
Get:10 http://deb.debian.org/debian bullseye/main amd64 sensible-utils all 0.0.14 [14.8 kB]
Get:11 http://deb.debian.org/debian bullseye/main amd64 bzip2 amd64 1.0.8-4 [49.3 kB]
Get:12 http://deb.debian.org/debian-security bullseye-security/main amd64 openssl amd64 1.1.1n-0+deb11u4 [853 kB]
Get:13 http://deb.debian.org/debian bullseye/main amd64 ca-certificates all 20210119 [158 kB]
Get:14 http://deb.debian.org/debian bullseye/main amd64 libmagic-mgc amd64 1:5.39-3 [273 kB]
Get:15 http://deb.debian.org/debian bullseye/main amd64 libmagic1 amd64 1:5.39-3 [126 kB]
Get:16 http://deb.debian.org/debian bullseye/main amd64 file amd64 1:5.39-3 [69.1 kB]
Get:17 http://deb.debian.org/debian bullseye/main amd64 manpages all 5.10-1 [1412 kB]
Get:18 http://deb.debian.org/debian bullseye/main amd64 ucf all 3.0043 [74.0 kB]
Get:19 http://deb.debian.org/debian bullseye/main amd64 xz-utils amd64 5.2.5-2.1~deb11u1 [220 kB]
Get:20 http://deb.debian.org/debian bullseye/main amd64 binutils-common amd64 2.35.2-2 [2220 kB]
Get:21 http://deb.debian.org/debian bullseye/main amd64 libbinutils amd64 2.35.2-2 [570 kB]
Get:22 http://deb.debian.org/debian bullseye/main amd64 libctf-nobfd0 amd64 2.35.2-2 [110 kB]
Get:23 http://deb.debian.org/debian bullseye/main amd64 libctf0 amd64 2.35.2-2 [53.2 kB]
Get:24 http://deb.debian.org/debian bullseye/main amd64 binutils-x86-64-linux-gnu amd64 2.35.2-2 [1809 kB]
Get:25 http://deb.debian.org/debian bullseye/main amd64 binutils amd64 2.35.2-2 [61.2 kB]
Get:26 http://deb.debian.org/debian bullseye/main amd64 libc-dev-bin amd64 2.31-13+deb11u5 [276 kB]
Get:27 http://deb.debian.org/debian-security bullseye-security/main amd64 linux-libc-dev amd64 5.10.162-1 [1576 kB]
Get:28 http://deb.debian.org/debian bullseye/main amd64 libcrypt-dev amd64 1:4.4.18-4 [104 kB]
Get:29 http://deb.debian.org/debian bullseye/main amd64 libtirpc-dev amd64 1.3.1-1+deb11u1 [191 kB]
Get:30 http://deb.debian.org/debian bullseye/main amd64 libnsl-dev amd64 1.3.0-2 [66.4 kB]
Get:31 http://deb.debian.org/debian bullseye/main amd64 libc6-dev amd64 2.31-13+deb11u5 [2359 kB]
Get:32 http://deb.debian.org/debian bullseye/main amd64 libisl23 amd64 0.23-1 [676 kB]
Get:33 http://deb.debian.org/debian bullseye/main amd64 libmpfr6 amd64 4.1.0-3 [2012 kB]
Get:34 http://deb.debian.org/debian bullseye/main amd64 libmpc3 amd64 1.2.0-1 [45.0 kB]
Get:35 http://deb.debian.org/debian bullseye/main amd64 cpp-10 amd64 10.2.1-6 [8528 kB]
Get:36 http://deb.debian.org/debian bullseye/main amd64 cpp amd64 4:10.2.1-1 [19.7 kB]
Get:37 http://deb.debian.org/debian bullseye/main amd64 libcc1-0 amd64 10.2.1-6 [47.0 kB]
Get:38 http://deb.debian.org/debian bullseye/main amd64 libgomp1 amd64 10.2.1-6 [99.9 kB]
Get:39 http://deb.debian.org/debian bullseye/main amd64 libitm1 amd64 10.2.1-6 [25.8 kB]
Get:40 http://deb.debian.org/debian bullseye/main amd64 libatomic1 amd64 10.2.1-6 [9008 B]
Get:41 http://deb.debian.org/debian bullseye/main amd64 libasan6 amd64 10.2.1-6 [2065 kB]
Get:42 http://deb.debian.org/debian bullseye/main amd64 liblsan0 amd64 10.2.1-6 [828 kB]
Get:43 http://deb.debian.org/debian bullseye/main amd64 libtsan0 amd64 10.2.1-6 [2000 kB]
Get:44 http://deb.debian.org/debian bullseye/main amd64 libubsan1 amd64 10.2.1-6 [777 kB]
Get:45 http://deb.debian.org/debian bullseye/main amd64 libquadmath0 amd64 10.2.1-6 [145 kB]
Get:46 http://deb.debian.org/debian bullseye/main amd64 libgcc-10-dev amd64 10.2.1-6 [2328 kB]
Get:47 http://deb.debian.org/debian bullseye/main amd64 gcc-10 amd64 10.2.1-6 [17.0 MB]
Get:48 http://deb.debian.org/debian bullseye/main amd64 gcc amd64 4:10.2.1-1 [5192 B]
Get:49 http://deb.debian.org/debian bullseye/main amd64 libstdc++-10-dev amd64 10.2.1-6 [1741 kB]
Get:50 http://deb.debian.org/debian bullseye/main amd64 g++-10 amd64 10.2.1-6 [9380 kB]
Get:51 http://deb.debian.org/debian bullseye/main amd64 g++ amd64 4:10.2.1-1 [1644 B]
Get:52 http://deb.debian.org/debian bullseye/main amd64 make amd64 4.3-4.1 [396 kB]
Get:53 http://deb.debian.org/debian bullseye/main amd64 libdpkg-perl all 1.20.12 [1551 kB]
Get:54 http://deb.debian.org/debian bullseye/main amd64 patch amd64 2.7.6-7 [128 kB]
Get:55 http://deb.debian.org/debian bullseye/main amd64 dpkg-dev all 1.20.12 [2312 kB]
Get:56 http://deb.debian.org/debian bullseye/main amd64 build-essential amd64 12.9 [7704 B]
Get:57 http://deb.debian.org/debian bullseye/main amd64 cross-config all 2.6.18+nmu1 [31.5 kB]
Get:58 http://deb.debian.org/debian bullseye/main amd64 libassuan0 amd64 2.5.3-7.1 [50.5 kB]
Get:59 http://deb.debian.org/debian bullseye/main amd64 gpgconf amd64 2.2.27-2+deb11u2 [548 kB]
Get:60 http://deb.debian.org/debian-security bullseye-security/main amd64 libksba8 amd64 1.5.0-3+deb11u2 [123 kB]
Get:61 http://deb.debian.org/debian bullseye/main amd64 libsasl2-modules-db amd64 2.1.27+dfsg-2.1+deb11u1 [69.1 kB]
Get:62 http://deb.debian.org/debian bullseye/main amd64 libsasl2-2 amd64 2.1.27+dfsg-2.1+deb11u1 [106 kB]
Get:63 http://deb.debian.org/debian bullseye/main amd64 libldap-2.4-2 amd64 2.4.57+dfsg-3+deb11u1 [232 kB]
Get:64 http://deb.debian.org/debian bullseye/main amd64 libnpth0 amd64 1.6-3 [19.0 kB]
Get:65 http://deb.debian.org/debian bullseye/main amd64 dirmngr amd64 2.2.27-2+deb11u2 [763 kB]
Get:66 http://deb.debian.org/debian bullseye/main amd64 libconfig-inifiles-perl all 3.000003-1 [52.1 kB]
Get:67 http://deb.debian.org/debian bullseye/main amd64 libio-string-perl all 1.08-3.1 [11.8 kB]
Get:68 http://deb.debian.org/debian bullseye/main amd64 libicu67 amd64 67.1-7 [8622 kB]
Get:69 http://deb.debian.org/debian bullseye/main amd64 libxml2 amd64 2.9.10+dfsg-6.7+deb11u3 [693 kB]
Get:70 http://deb.debian.org/debian bullseye/main amd64 libxml-namespacesupport-perl all 1.12-1.1 [14.9 kB]
Get:71 http://deb.debian.org/debian bullseye/main amd64 libxml-sax-base-perl all 1.09-1.1 [20.7 kB]
Get:72 http://deb.debian.org/debian bullseye/main amd64 libxml-sax-perl all 1.02+dfsg-1 [59.0 kB]
Get:73 http://deb.debian.org/debian bullseye/main amd64 libxml-libxml-perl amd64 2.0134+dfsg-2+b1 [337 kB]
Get:74 http://deb.debian.org/debian bullseye/main amd64 libexpat1 amd64 2.2.10-2+deb11u5 [98.2 kB]
Get:75 http://deb.debian.org/debian bullseye/main amd64 liburi-perl all 5.08-1 [90.6 kB]
Get:76 http://deb.debian.org/debian bullseye/main amd64 libencode-locale-perl all 1.05-1.1 [13.2 kB]
Get:77 http://deb.debian.org/debian bullseye/main amd64 libtimedate-perl all 2.3300-2 [39.3 kB]
Get:78 http://deb.debian.org/debian bullseye/main amd64 libhttp-date-perl all 6.05-1 [10.4 kB]
Get:79 http://deb.debian.org/debian bullseye/main amd64 libfile-listing-perl all 6.14-1 [12.4 kB]
Get:80 http://deb.debian.org/debian bullseye/main amd64 libhtml-tagset-perl all 3.20-4 [13.0 kB]
Get:81 http://deb.debian.org/debian bullseye/main amd64 libhtml-parser-perl amd64 3.75-1+b1 [105 kB]
Get:82 http://deb.debian.org/debian bullseye/main amd64 libhtml-tree-perl all 5.07-2 [213 kB]
Get:83 http://deb.debian.org/debian bullseye/main amd64 libio-html-perl all 1.004-2 [16.1 kB]
Get:84 http://deb.debian.org/debian bullseye/main amd64 liblwp-mediatypes-perl all 6.04-1 [19.9 kB]
Get:85 http://deb.debian.org/debian bullseye/main amd64 libhttp-message-perl all 6.28-1 [79.6 kB]
Get:86 http://deb.debian.org/debian bullseye/main amd64 libhttp-cookies-perl all 6.10-1 [19.6 kB]
Get:87 http://deb.debian.org/debian bullseye/main amd64 libhttp-negotiate-perl all 6.01-1 [12.8 kB]
Get:88 http://deb.debian.org/debian bullseye/main amd64 perl-openssl-defaults amd64 5 [7360 B]
Get:89 http://deb.debian.org/debian bullseye/main amd64 libnet-ssleay-perl amd64 1.88-3+b1 [321 kB]
Get:90 http://deb.debian.org/debian bullseye/main amd64 libio-socket-ssl-perl all 2.069-1 [215 kB]
Get:91 http://deb.debian.org/debian bullseye/main amd64 libnet-http-perl all 6.20-1 [25.1 kB]
Get:92 http://deb.debian.org/debian bullseye/main amd64 liblwp-protocol-https-perl all 6.10-1 [12.2 kB]
Get:93 http://deb.debian.org/debian bullseye/main amd64 libtry-tiny-perl all 0.30-1 [23.3 kB]
Get:94 http://deb.debian.org/debian bullseye/main amd64 libwww-robotrules-perl all 6.02-1 [12.9 kB]
Get:95 http://deb.debian.org/debian bullseye/main amd64 libwww-perl all 6.52-1 [192 kB]
Get:96 http://deb.debian.org/debian bullseye/main amd64 libxml-parser-perl amd64 2.46-2 [206 kB]
Get:97 http://deb.debian.org/debian bullseye/main amd64 libxml-sax-expat-perl all 0.51-1 [12.0 kB]
Get:98 http://deb.debian.org/debian bullseye/main amd64 libxml-simple-perl all 2.25-1 [72.0 kB]
Get:99 http://deb.debian.org/debian bullseye/main amd64 libyaml-perl all 1.30-1 [67.7 kB]
Get:100 http://deb.debian.org/debian bullseye/main amd64 libconfig-auto-perl all 0.44-1.1 [19.0 kB]
Get:101 http://deb.debian.org/debian bullseye/main amd64 libfile-which-perl all 1.23-1 [16.6 kB]
Get:102 http://deb.debian.org/debian bullseye/main amd64 libfile-homedir-perl all 1.006-1 [43.8 kB]
Get:103 http://deb.debian.org/debian bullseye/main amd64 libdebian-dpkgcross-perl all 2.6.18+nmu1 [30.5 kB]
Get:104 http://deb.debian.org/debian bullseye/main amd64 dpkg-cross all 2.6.18+nmu1 [41.6 kB]
Get:105 http://deb.debian.org/debian bullseye/main amd64 libfakeroot amd64 1.25.3-1.1 [47.0 kB]
Get:106 http://deb.debian.org/debian bullseye/main amd64 fakeroot amd64 1.25.3-1.1 [87.0 kB]
Get:107 http://deb.debian.org/debian bullseye/main amd64 fonts-dejavu-core all 2.37-2 [1069 kB]
Get:108 http://deb.debian.org/debian bullseye/main amd64 fontconfig-config all 2.13.1-4.2 [281 kB]
Get:109 http://deb.debian.org/debian bullseye/main amd64 gnupg-l10n all 2.2.27-2+deb11u2 [1086 kB]
Get:110 http://deb.debian.org/debian bullseye/main amd64 gnupg-utils amd64 2.2.27-2+deb11u2 [905 kB]
Get:111 http://deb.debian.org/debian bullseye/main amd64 libsqlite3-0 amd64 3.34.1-3 [797 kB]
Get:112 http://deb.debian.org/debian bullseye/main amd64 gpg amd64 2.2.27-2+deb11u2 [928 kB]
Get:113 http://deb.debian.org/debian bullseye/main amd64 libncursesw6 amd64 6.2+20201114-2 [132 kB]
Get:114 http://deb.debian.org/debian bullseye/main amd64 pinentry-curses amd64 1.1.0-4 [64.9 kB]
Get:115 http://deb.debian.org/debian bullseye/main amd64 gpg-agent amd64 2.2.27-2+deb11u2 [669 kB]
Get:116 http://deb.debian.org/debian bullseye/main amd64 gpg-wks-client amd64 2.2.27-2+deb11u2 [524 kB]
Get:117 http://deb.debian.org/debian bullseye/main amd64 gpg-wks-server amd64 2.2.27-2+deb11u2 [516 kB]
Get:118 http://deb.debian.org/debian bullseye/main amd64 gpgsm amd64 2.2.27-2+deb11u2 [645 kB]
Get:119 http://deb.debian.org/debian bullseye/main amd64 gnupg all 2.2.27-2+deb11u2 [825 kB]
Get:120 http://deb.debian.org/debian bullseye/main amd64 libalgorithm-diff-perl all 1.201-1 [43.3 kB]
Get:121 http://deb.debian.org/debian bullseye/main amd64 libalgorithm-diff-xs-perl amd64 0.04-6+b1 [12.0 kB]
Get:122 http://deb.debian.org/debian bullseye/main amd64 libalgorithm-merge-perl all 0.08-3 [12.7 kB]
Get:123 http://deb.debian.org/debian bullseye/main amd64 libauthen-sasl-perl all 2.1600-1.1 [45.4 kB]
Get:124 http://deb.debian.org/debian bullseye/main amd64 libbrotli1 amd64 1.0.9-2+b2 [279 kB]
debconf: falling back to frontend: Readline

Creating config file /etc/perl/XML/SAX/ParserDetails.ini with new version
Setting up libnet-smtp-ssl-perl (1.04-1) ...
Setting up libmailtools-perl (2.21-1) ...
Setting up libxml-libxml-perl (2.0134+dfsg-2+b1) ...
update-perl-sax-parsers: Registering Perl SAX parser XML::LibXML::SAX::Parser with priority 50...
update-perl-sax-parsers: Registering Perl SAX parser XML::LibXML::SAX with priority 50...
update-perl-sax-parsers: Updating overall Perl SAX parser modules info file...
debconf: unable to initialize frontend: Dialog
debconf: (No usable dialog-like program is installed, so the dialog based frontend cannot be used. at /usr/share/perl5/Debconf/FrontEnd/Dialog.pm line 78.)
debconf: falling back to frontend: Readline
Replacing config file /etc/perl/XML/SAX/ParserDetails.ini with new version
Setting up libhttp-daemon-perl (6.12-1+deb11u1) ...
Setting up libxml-simple-perl (2.25-1) ...
Setting up libconfig-auto-perl (0.44-1.1) ...
Setting up libdebian-dpkgcross-perl (2.6.18+nmu1) ...
Setting up dpkg-cross (2.6.18+nmu1) ...
Setting up liblwp-protocol-https-perl (6.10-1) ...
Setting up libwww-perl (6.52-1) ...
Setting up libxml-parser-perl:amd64 (2.46-2) ...
Setting up libxml-sax-expat-perl (0.51-1) ...
update-perl-sax-parsers: Registering Perl SAX parser XML::SAX::Expat with priority 50...
update-perl-sax-parsers: Updating overall Perl SAX parser modules info file...
debconf: unable to initialize frontend: Dialog
debconf: (No usable dialog-like program is installed, so the dialog based frontend cannot be used. at /usr/share/perl5/Debconf/FrontEnd/Dialog.pm line 78.)
debconf: falling back to frontend: Readline
Replacing config file /etc/perl/XML/SAX/ParserDetails.ini with new version
Processing triggers for libc-bin (2.31-13+deb11u5) ...
Processing triggers for ca-certificates (20210119) ...
Updating certificates in /etc/ssl/certs...
0 added, 0 removed; done.
Running hooks in /etc/ca-certificates/update.d...
done.
```











