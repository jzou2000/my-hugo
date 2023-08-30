---
title: Java Container amazoncorretto
nav: amazoncorretto
---

Amazon offers useful docker images for different JRE versions, i.e. amazoncorretto, which is based on amazonlinux:2, which is based on centos/rhel.

```sh
j17$ cat /etc/os-release
NAME="Amazon Linux"
VERSION="2"
ID="amzn"
ID_LIKE="centos rhel fedora"
VERSION_ID="2"
PRETTY_NAME="Amazon Linux 2"
ANSI_COLOR="0;33"
CPE_NAME="cpe:2.3:o:amazon:amazon_linux:2"
HOME_URL="https://amazonlinux.com/"
```

Unfortunately some commn utilities are not include, e.g. ``ping``

## Find out what package contains ping
```sh
j17$ yum whatprovides ping
Loaded plugins: ovl, priorities
8 packages excluded due to repository priority protections
AmazonCorretto/x86_64/filelists_db                                                               |  80 kB  00:00:00
amzn2-core/2/x86_64/filelists_db                                                                 |  54 MB  00:00:15
iputils-20160308-10.amzn2.x86_64 : Network monitoring tools including ping
Repo        : amzn2-core
Matched from:
Filename    : /bin/ping



iputils-20160308-10.amzn2.0.2.x86_64 : Network monitoring tools including ping
Repo        : amzn2-core
Matched from:
Filename    : /bin/ping



iputils-20160308-10.amzn2.x86_64 : Network monitoring tools including ping
Repo        : amzn2-core
Matched from:
Filename    : /usr/bin/ping



iputils-20160308-10.amzn2.0.2.x86_64 : Network monitoring tools including ping
Repo        : amzn2-core
Matched from:
Filename    : /usr/bin/ping

```

## Install the packge
```sh
j17$ yum install -y iputils-20160308-10.amzn2.0.2.x86_64
Loaded plugins: ovl, priorities
8 packages excluded due to repository priority protections
Resolving Dependencies
--> Running transaction check
---> Package iputils.x86_64 0:20160308-10.amzn2.0.2 will be installed
--> Processing Dependency: systemd for package: iputils-20160308-10.amzn2.0.2.x86_64
--> Processing Dependency: systemd for package: iputils-20160308-10.amzn2.0.2.x86_64
--> Processing Dependency: systemd for package: iputils-20160308-10.amzn2.0.2.x86_64
--> Processing Dependency: libidn.so.11(LIBIDN_1.0)(64bit) for package: iputils-20160308-10.amzn2.0.2.x86_64
--> Processing Dependency: libidn.so.11()(64bit) for package: iputils-20160308-10.amzn2.0.2.x86_64
--> Running transaction check
---> Package libidn.x86_64 0:1.28-4.amzn2.0.2 will be installed
---> Package systemd.x86_64 0:219-78.amzn2.0.22 will be installed
--> Processing Dependency: systemd-libs = 219-78.amzn2.0.22 for package: systemd-219-78.amzn2.0.22.x86_64
--> Processing Dependency: kmod >= 18-4 for package: systemd-219-78.amzn2.0.22.x86_64
--> Processing Dependency: libpam.so.0(LIBPAM_1.0)(64bit) for package: systemd-219-78.amzn2.0.22.x86_64
--> Processing Dependency: libkmod.so.2(LIBKMOD_5)(64bit) for package: systemd-219-78.amzn2.0.22.x86_64
--> Processing Dependency: libdw.so.1(ELFUTILS_0.158)(64bit) for package: systemd-219-78.amzn2.0.22.x86_64
--> Processing Dependency: libdw.so.1(ELFUTILS_0.130)(64bit) for package: systemd-219-78.amzn2.0.22.x86_64
--> Processing Dependency: libdw.so.1(ELFUTILS_0.122)(64bit) for package: systemd-219-78.amzn2.0.22.x86_64
--> Processing Dependency: libcryptsetup.so.4(CRYPTSETUP_1.0)(64bit) for package: systemd-219-78.amzn2.0.22.x86_64
--> Processing Dependency: dbus for package: systemd-219-78.amzn2.0.22.x86_64
--> Processing Dependency: acl for package: systemd-219-78.amzn2.0.22.x86_64
--> Processing Dependency: /usr/sbin/groupadd for package: systemd-219-78.amzn2.0.22.x86_64
--> Processing Dependency: libqrencode.so.3()(64bit) for package: systemd-219-78.amzn2.0.22.x86_64
--> Processing Dependency: libpam.so.0()(64bit) for package: systemd-219-78.amzn2.0.22.x86_64
--> Processing Dependency: liblz4.so.1()(64bit) for package: systemd-219-78.amzn2.0.22.x86_64
--> Processing Dependency: libkmod.so.2()(64bit) for package: systemd-219-78.amzn2.0.22.x86_64
--> Processing Dependency: libdw.so.1()(64bit) for package: systemd-219-78.amzn2.0.22.x86_64
--> Processing Dependency: libcryptsetup.so.4()(64bit) for package: systemd-219-78.amzn2.0.22.x86_64
--> Processing Dependency: libaudit.so.1()(64bit) for package: systemd-219-78.amzn2.0.22.x86_64
--> Running transaction check
---> Package acl.x86_64 0:2.2.51-14.amzn2 will be installed
---> Package audit-libs.x86_64 0:2.8.1-3.amzn2.1 will be installed
--> Processing Dependency: libcap-ng.so.0()(64bit) for package: audit-libs-2.8.1-3.amzn2.1.x86_64
---> Package cryptsetup-libs.x86_64 0:1.7.4-4.amzn2 will be installed
--> Processing Dependency: libdevmapper.so.1.02(DM_1_02_97)(64bit) for package: cryptsetup-libs-1.7.4-4.amzn2.x86_64
--> Processing Dependency: libdevmapper.so.1.02(Base)(64bit) for package: cryptsetup-libs-1.7.4-4.amzn2.x86_64
--> Processing Dependency: libdevmapper.so.1.02()(64bit) for package: cryptsetup-libs-1.7.4-4.amzn2.x86_64
---> Package dbus.x86_64 1:1.10.24-7.amzn2.0.3 will be installed
--> Processing Dependency: dbus-libs(x86-64) = 1:1.10.24-7.amzn2.0.3 for package: 1:dbus-1.10.24-7.amzn2.0.3.x86_64
--> Processing Dependency: libdbus-1.so.3(LIBDBUS_PRIVATE_1.10.24)(64bit) for package: 1:dbus-1.10.24-7.amzn2.0.3.x86_64
--> Processing Dependency: libdbus-1.so.3(LIBDBUS_1_3)(64bit) for package: 1:dbus-1.10.24-7.amzn2.0.3.x86_64
--> Processing Dependency: libdbus-1.so.3()(64bit) for package: 1:dbus-1.10.24-7.amzn2.0.3.x86_64
---> Package elfutils-libs.x86_64 0:0.176-2.amzn2 will be installed
--> Processing Dependency: default-yama-scope for package: elfutils-libs-0.176-2.amzn2.x86_64
---> Package kmod.x86_64 0:25-3.amzn2.0.2 will be installed
---> Package kmod-libs.x86_64 0:25-3.amzn2.0.2 will be installed
---> Package lz4.x86_64 0:1.7.5-2.amzn2.0.1 will be installed
---> Package pam.x86_64 0:1.1.8-23.amzn2.0.1 will be installed
--> Processing Dependency: libpwquality >= 0.9.9 for package: pam-1.1.8-23.amzn2.0.1.x86_64
--> Processing Dependency: cracklib-dicts >= 2.8 for package: pam-1.1.8-23.amzn2.0.1.x86_64
--> Processing Dependency: libcrack.so.2()(64bit) for package: pam-1.1.8-23.amzn2.0.1.x86_64
---> Package qrencode-libs.x86_64 0:3.4.1-3.amzn2.0.2 will be installed
---> Package shadow-utils.x86_64 2:4.1.5.1-24.amzn2.0.2 will be installed
--> Processing Dependency: libsemanage.so.1(LIBSEMANAGE_1.0)(64bit) for package: 2:shadow-utils-4.1.5.1-24.amzn2.0.2.x86_64
--> Processing Dependency: libsemanage.so.1()(64bit) for package: 2:shadow-utils-4.1.5.1-24.amzn2.0.2.x86_64
---> Package systemd-libs.x86_64 0:219-78.amzn2.0.22 will be installed
--> Running transaction check
---> Package cracklib.x86_64 0:2.9.0-11.amzn2.0.2 will be installed
--> Processing Dependency: gzip for package: cracklib-2.9.0-11.amzn2.0.2.x86_64
---> Package cracklib-dicts.x86_64 0:2.9.0-11.amzn2.0.2 will be installed
---> Package dbus-libs.x86_64 1:1.10.24-7.amzn2.0.3 will be installed
---> Package device-mapper-libs.x86_64 7:1.02.170-6.amzn2.5 will be installed
--> Processing Dependency: device-mapper = 7:1.02.170-6.amzn2.5 for package: 7:device-mapper-libs-1.02.170-6.amzn2.5.x86_64
---> Package elfutils-default-yama-scope.noarch 0:0.176-2.amzn2 will be installed
---> Package libcap-ng.x86_64 0:0.7.5-4.amzn2.0.4 will be installed
---> Package libpwquality.x86_64 0:1.2.3-5.amzn2 will be installed
---> Package libsemanage.x86_64 0:2.5-11.amzn2 will be installed
--> Processing Dependency: libustr-1.0.so.1(USTR_1.0.1)(64bit) for package: libsemanage-2.5-11.amzn2.x86_64
--> Processing Dependency: libustr-1.0.so.1(USTR_1.0)(64bit) for package: libsemanage-2.5-11.amzn2.x86_64
--> Processing Dependency: libustr-1.0.so.1()(64bit) for package: libsemanage-2.5-11.amzn2.x86_64
--> Running transaction check
---> Package device-mapper.x86_64 7:1.02.170-6.amzn2.5 will be installed
--> Processing Dependency: util-linux >= 2.23 for package: 7:device-mapper-1.02.170-6.amzn2.5.x86_64
---> Package gzip.x86_64 0:1.5-10.amzn2.0.1 will be installed
---> Package ustr.x86_64 0:1.0.4-16.amzn2.0.3 will be installed
--> Running transaction check
---> Package util-linux.x86_64 0:2.30.2-2.amzn2.0.11 will be installed
--> Processing Dependency: libuuid = 2.30.2-2.amzn2.0.11 for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Processing Dependency: libsmartcols = 2.30.2-2.amzn2.0.11 for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Processing Dependency: libmount = 2.30.2-2.amzn2.0.11 for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Processing Dependency: libfdisk = 2.30.2-2.amzn2.0.11 for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Processing Dependency: libblkid = 2.30.2-2.amzn2.0.11 for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Processing Dependency: libutempter.so.0(UTEMPTER_1.1)(64bit) for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Processing Dependency: libsmartcols.so.1(SMARTCOLS_2.30)(64bit) for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Processing Dependency: libsmartcols.so.1(SMARTCOLS_2.29)(64bit) for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Processing Dependency: libsmartcols.so.1(SMARTCOLS_2.28)(64bit) for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Processing Dependency: libsmartcols.so.1(SMARTCOLS_2.27)(64bit) for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Processing Dependency: libsmartcols.so.1(SMARTCOLS_2.25)(64bit) for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Processing Dependency: libfdisk.so.1(FDISK_2.30)(64bit) for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Processing Dependency: libfdisk.so.1(FDISK_2.29)(64bit) for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Processing Dependency: libfdisk.so.1(FDISK_2.28)(64bit) for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Processing Dependency: libfdisk.so.1(FDISK_2.27)(64bit) for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Processing Dependency: libfdisk.so.1(FDISK_2.26)(64bit) for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Processing Dependency: libutempter.so.0()(64bit) for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Processing Dependency: libsmartcols.so.1()(64bit) for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Processing Dependency: libfdisk.so.1()(64bit) for package: util-linux-2.30.2-2.amzn2.0.11.x86_64
--> Running transaction check
---> Package libblkid.x86_64 0:2.30.2-2.amzn2.0.7 will be updated
---> Package libblkid.x86_64 0:2.30.2-2.amzn2.0.11 will be an update
---> Package libfdisk.x86_64 0:2.30.2-2.amzn2.0.11 will be installed
---> Package libmount.x86_64 0:2.30.2-2.amzn2.0.7 will be updated
---> Package libmount.x86_64 0:2.30.2-2.amzn2.0.11 will be an update
---> Package libsmartcols.x86_64 0:2.30.2-2.amzn2.0.11 will be installed
---> Package libutempter.x86_64 0:1.1.6-4.amzn2.0.2 will be installed
---> Package libuuid.x86_64 0:2.30.2-2.amzn2.0.7 will be updated
---> Package libuuid.x86_64 0:2.30.2-2.amzn2.0.11 will be an update
--> Finished Dependency Resolution

Dependencies Resolved

========================================================================================================================
 Package                                Arch              Version                           Repository             Size
========================================================================================================================
Installing:
 iputils                                x86_64            20160308-10.amzn2.0.2             amzn2-core            147 k
Installing for dependencies:
 acl                                    x86_64            2.2.51-14.amzn2                   amzn2-core             82 k
 audit-libs                             x86_64            2.8.1-3.amzn2.1                   amzn2-core             99 k
 cracklib                               x86_64            2.9.0-11.amzn2.0.2                amzn2-core             80 k
 cracklib-dicts                         x86_64            2.9.0-11.amzn2.0.2                amzn2-core            3.6 M
 cryptsetup-libs                        x86_64            1.7.4-4.amzn2                     amzn2-core            224 k
 dbus                                   x86_64            1:1.10.24-7.amzn2.0.3             amzn2-core            245 k
 dbus-libs                              x86_64            1:1.10.24-7.amzn2.0.3             amzn2-core            167 k
 device-mapper                          x86_64            7:1.02.170-6.amzn2.5              amzn2-core            297 k
 device-mapper-libs                     x86_64            7:1.02.170-6.amzn2.5              amzn2-core            326 k
 elfutils-default-yama-scope            noarch            0.176-2.amzn2                     amzn2-core             33 k
 elfutils-libs                          x86_64            0.176-2.amzn2                     amzn2-core            293 k
 gzip                                   x86_64            1.5-10.amzn2.0.1                  amzn2-core            129 k
 kmod                                   x86_64            25-3.amzn2.0.2                    amzn2-core            111 k
 kmod-libs                              x86_64            25-3.amzn2.0.2                    amzn2-core             59 k
 libcap-ng                              x86_64            0.7.5-4.amzn2.0.4                 amzn2-core             25 k
 libfdisk                               x86_64            2.30.2-2.amzn2.0.11               amzn2-core            238 k
 libidn                                 x86_64            1.28-4.amzn2.0.2                  amzn2-core            209 k
 libpwquality                           x86_64            1.2.3-5.amzn2                     amzn2-core             84 k
 libsemanage                            x86_64            2.5-11.amzn2                      amzn2-core            152 k
 libsmartcols                           x86_64            2.30.2-2.amzn2.0.11               amzn2-core            155 k
 libutempter                            x86_64            1.1.6-4.amzn2.0.2                 amzn2-core             25 k
 lz4                                    x86_64            1.7.5-2.amzn2.0.1                 amzn2-core             99 k
 pam                                    x86_64            1.1.8-23.amzn2.0.1                amzn2-core            715 k
 qrencode-libs                          x86_64            3.4.1-3.amzn2.0.2                 amzn2-core             50 k
 shadow-utils                           x86_64            2:4.1.5.1-24.amzn2.0.2            amzn2-core            1.1 M
 systemd                                x86_64            219-78.amzn2.0.22                 amzn2-core            5.0 M
 systemd-libs                           x86_64            219-78.amzn2.0.22                 amzn2-core            409 k
 ustr                                   x86_64            1.0.4-16.amzn2.0.3                amzn2-core             96 k
 util-linux                             x86_64            2.30.2-2.amzn2.0.11               amzn2-core            2.3 M
Updating for dependencies:
 libblkid                               x86_64            2.30.2-2.amzn2.0.11               amzn2-core            191 k
 libmount                               x86_64            2.30.2-2.amzn2.0.11               amzn2-core            213 k
 libuuid                                x86_64            2.30.2-2.amzn2.0.11               amzn2-core             80 k

Transaction Summary
========================================================================================================================
Install  1 Package  (+29 Dependent packages)
Upgrade             (  3 Dependent packages)

Total download size: 17 M
Downloading packages:
Delta RPMs disabled because /usr/bin/applydeltarpm not installed.
(1/33): audit-libs-2.8.1-3.amzn2.1.x86_64.rpm                                                    |  99 kB  00:00:00
(2/33): acl-2.2.51-14.amzn2.x86_64.rpm                                                           |  82 kB  00:00:00
(3/33): cracklib-2.9.0-11.amzn2.0.2.x86_64.rpm                                                   |  80 kB  00:00:00
(4/33): cryptsetup-libs-1.7.4-4.amzn2.x86_64.rpm                                                 | 224 kB  00:00:00
(5/33): dbus-1.10.24-7.amzn2.0.3.x86_64.rpm                                                      | 245 kB  00:00:00
(6/33): dbus-libs-1.10.24-7.amzn2.0.3.x86_64.rpm                                                 | 167 kB  00:00:00
(7/33): device-mapper-1.02.170-6.amzn2.5.x86_64.rpm                                              | 297 kB  00:00:00
(8/33): device-mapper-libs-1.02.170-6.amzn2.5.x86_64.rpm                                         | 326 kB  00:00:00
(9/33): elfutils-default-yama-scope-0.176-2.amzn2.noarch.rpm                                     |  33 kB  00:00:00
(10/33): elfutils-libs-0.176-2.amzn2.x86_64.rpm                                                  | 293 kB  00:00:00
(11/33): gzip-1.5-10.amzn2.0.1.x86_64.rpm                                                        | 129 kB  00:00:00
(12/33): iputils-20160308-10.amzn2.0.2.x86_64.rpm                                                | 147 kB  00:00:00
(13/33): kmod-25-3.amzn2.0.2.x86_64.rpm                                                          | 111 kB  00:00:00
(14/33): kmod-libs-25-3.amzn2.0.2.x86_64.rpm                                                     |  59 kB  00:00:00
(15/33): cracklib-dicts-2.9.0-11.amzn2.0.2.x86_64.rpm                                            | 3.6 MB  00:00:01
(16/33): libblkid-2.30.2-2.amzn2.0.11.x86_64.rpm                                                 | 191 kB  00:00:00
(17/33): libcap-ng-0.7.5-4.amzn2.0.4.x86_64.rpm                                                  |  25 kB  00:00:00
(18/33): libfdisk-2.30.2-2.amzn2.0.11.x86_64.rpm                                                 | 238 kB  00:00:00
(19/33): libidn-1.28-4.amzn2.0.2.x86_64.rpm                                                      | 209 kB  00:00:00
(20/33): libpwquality-1.2.3-5.amzn2.x86_64.rpm                                                   |  84 kB  00:00:00
(21/33): libmount-2.30.2-2.amzn2.0.11.x86_64.rpm                                                 | 213 kB  00:00:00
(22/33): libsemanage-2.5-11.amzn2.x86_64.rpm                                                     | 152 kB  00:00:00
(23/33): libsmartcols-2.30.2-2.amzn2.0.11.x86_64.rpm                                             | 155 kB  00:00:00
(24/33): libutempter-1.1.6-4.amzn2.0.2.x86_64.rpm                                                |  25 kB  00:00:00
(25/33): libuuid-2.30.2-2.amzn2.0.11.x86_64.rpm                                                  |  80 kB  00:00:00
(26/33): lz4-1.7.5-2.amzn2.0.1.x86_64.rpm                                                        |  99 kB  00:00:00
(27/33): qrencode-libs-3.4.1-3.amzn2.0.2.x86_64.rpm                                              |  50 kB  00:00:00
(28/33): pam-1.1.8-23.amzn2.0.1.x86_64.rpm                                                       | 715 kB  00:00:00
(29/33): shadow-utils-4.1.5.1-24.amzn2.0.2.x86_64.rpm                                            | 1.1 MB  00:00:00
(30/33): systemd-libs-219-78.amzn2.0.22.x86_64.rpm                                               | 409 kB  00:00:00
(31/33): ustr-1.0.4-16.amzn2.0.3.x86_64.rpm                                                      |  96 kB  00:00:00
(32/33): util-linux-2.30.2-2.amzn2.0.11.x86_64.rpm                                               | 2.3 MB  00:00:01
(33/33): systemd-219-78.amzn2.0.22.x86_64.rpm                                                    | 5.0 MB  00:00:02
------------------------------------------------------------------------------------------------------------------------
Total                                                                                   3.4 MB/s |  17 MB  00:00:04
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Updating   : libuuid-2.30.2-2.amzn2.0.11.x86_64                                                                  1/36
  Updating   : libblkid-2.30.2-2.amzn2.0.11.x86_64                                                                 2/36
  Installing : libcap-ng-0.7.5-4.amzn2.0.4.x86_64                                                                  3/36
  Installing : audit-libs-2.8.1-3.amzn2.1.x86_64                                                                   4/36
  Updating   : libmount-2.30.2-2.amzn2.0.11.x86_64                                                                 5/36
  Installing : lz4-1.7.5-2.amzn2.0.1.x86_64                                                                        6/36
  Installing : libfdisk-2.30.2-2.amzn2.0.11.x86_64                                                                 7/36
  Installing : kmod-libs-25-3.amzn2.0.2.x86_64                                                                     8/36
  Installing : acl-2.2.51-14.amzn2.x86_64                                                                          9/36
  Installing : kmod-25-3.amzn2.0.2.x86_64                                                                         10/36
  Installing : ustr-1.0.4-16.amzn2.0.3.x86_64                                                                     11/36
  Installing : libsemanage-2.5-11.amzn2.x86_64                                                                    12/36
  Installing : 2:shadow-utils-4.1.5.1-24.amzn2.0.2.x86_64                                                         13/36
  Installing : libutempter-1.1.6-4.amzn2.0.2.x86_64                                                               14/36
  Installing : libsmartcols-2.30.2-2.amzn2.0.11.x86_64                                                            15/36
  Installing : qrencode-libs-3.4.1-3.amzn2.0.2.x86_64                                                             16/36
  Installing : libidn-1.28-4.amzn2.0.2.x86_64                                                                     17/36
  Installing : gzip-1.5-10.amzn2.0.1.x86_64                                                                       18/36
  Installing : cracklib-2.9.0-11.amzn2.0.2.x86_64                                                                 19/36
  Installing : cracklib-dicts-2.9.0-11.amzn2.0.2.x86_64                                                           20/36
  Installing : libpwquality-1.2.3-5.amzn2.x86_64                                                                  21/36
  Installing : pam-1.1.8-23.amzn2.0.1.x86_64                                                                      22/36
  Installing : util-linux-2.30.2-2.amzn2.0.11.x86_64                                                              23/36
  Installing : 7:device-mapper-1.02.170-6.amzn2.5.x86_64                                                          24/36
  Installing : 7:device-mapper-libs-1.02.170-6.amzn2.5.x86_64                                                     25/36
  Installing : cryptsetup-libs-1.7.4-4.amzn2.x86_64                                                               26/36
  Installing : elfutils-libs-0.176-2.amzn2.x86_64                                                                 27/36
  Installing : systemd-libs-219-78.amzn2.0.22.x86_64                                                              28/36
  Installing : 1:dbus-libs-1.10.24-7.amzn2.0.3.x86_64                                                             29/36
  Installing : systemd-219-78.amzn2.0.22.x86_64                                                                   30/36
Failed to get D-Bus connection: Operation not permitted
  Installing : elfutils-default-yama-scope-0.176-2.amzn2.noarch                                                   31/36
  Installing : 1:dbus-1.10.24-7.amzn2.0.3.x86_64                                                                  32/36
  Installing : iputils-20160308-10.amzn2.0.2.x86_64                                                               33/36
  Cleanup    : libmount-2.30.2-2.amzn2.0.7.x86_64                                                                 34/36
  Cleanup    : libblkid-2.30.2-2.amzn2.0.7.x86_64                                                                 35/36
  Cleanup    : libuuid-2.30.2-2.amzn2.0.7.x86_64                                                                  36/36
  Verifying  : gzip-1.5-10.amzn2.0.1.x86_64                                                                        1/36
  Verifying  : elfutils-default-yama-scope-0.176-2.amzn2.noarch                                                    2/36
  Verifying  : libuuid-2.30.2-2.amzn2.0.11.x86_64                                                                  3/36
  Verifying  : libutempter-1.1.6-4.amzn2.0.2.x86_64                                                                4/36
  Verifying  : cracklib-2.9.0-11.amzn2.0.2.x86_64                                                                  5/36
  Verifying  : 1:dbus-1.10.24-7.amzn2.0.3.x86_64                                                                   6/36
  Verifying  : cryptsetup-libs-1.7.4-4.amzn2.x86_64                                                                7/36
  Verifying  : libidn-1.28-4.amzn2.0.2.x86_64                                                                      8/36
  Verifying  : 7:device-mapper-1.02.170-6.amzn2.5.x86_64                                                           9/36
  Verifying  : 1:dbus-libs-1.10.24-7.amzn2.0.3.x86_64                                                             10/36
  Verifying  : libcap-ng-0.7.5-4.amzn2.0.4.x86_64                                                                 11/36
  Verifying  : lz4-1.7.5-2.amzn2.0.1.x86_64                                                                       12/36
  Verifying  : qrencode-libs-3.4.1-3.amzn2.0.2.x86_64                                                             13/36
  Verifying  : libsmartcols-2.30.2-2.amzn2.0.11.x86_64                                                            14/36
  Verifying  : libpwquality-1.2.3-5.amzn2.x86_64                                                                  15/36
  Verifying  : 7:device-mapper-libs-1.02.170-6.amzn2.5.x86_64                                                     16/36
  Verifying  : util-linux-2.30.2-2.amzn2.0.11.x86_64                                                              17/36
  Verifying  : cracklib-dicts-2.9.0-11.amzn2.0.2.x86_64                                                           18/36
  Verifying  : libblkid-2.30.2-2.amzn2.0.11.x86_64                                                                19/36
  Verifying  : libfdisk-2.30.2-2.amzn2.0.11.x86_64                                                                20/36
  Verifying  : pam-1.1.8-23.amzn2.0.1.x86_64                                                                      21/36
  Verifying  : iputils-20160308-10.amzn2.0.2.x86_64                                                               22/36
  Verifying  : audit-libs-2.8.1-3.amzn2.1.x86_64                                                                  23/36
  Verifying  : ustr-1.0.4-16.amzn2.0.3.x86_64                                                                     24/36
  Verifying  : kmod-25-3.amzn2.0.2.x86_64                                                                         25/36
  Verifying  : acl-2.2.51-14.amzn2.x86_64                                                                         26/36
  Verifying  : libsemanage-2.5-11.amzn2.x86_64                                                                    27/36
  Verifying  : elfutils-libs-0.176-2.amzn2.x86_64                                                                 28/36
  Verifying  : 2:shadow-utils-4.1.5.1-24.amzn2.0.2.x86_64                                                         29/36
  Verifying  : kmod-libs-25-3.amzn2.0.2.x86_64                                                                    30/36
  Verifying  : systemd-libs-219-78.amzn2.0.22.x86_64                                                              31/36
  Verifying  : libmount-2.30.2-2.amzn2.0.11.x86_64                                                                32/36
  Verifying  : systemd-219-78.amzn2.0.22.x86_64                                                                   33/36
  Verifying  : libblkid-2.30.2-2.amzn2.0.7.x86_64                                                                 34/36
  Verifying  : libuuid-2.30.2-2.amzn2.0.7.x86_64                                                                  35/36
  Verifying  : libmount-2.30.2-2.amzn2.0.7.x86_64                                                                 36/36

Installed:
  iputils.x86_64 0:20160308-10.amzn2.0.2

Dependency Installed:
  acl.x86_64 0:2.2.51-14.amzn2                             audit-libs.x86_64 0:2.8.1-3.amzn2.1
  cracklib.x86_64 0:2.9.0-11.amzn2.0.2                     cracklib-dicts.x86_64 0:2.9.0-11.amzn2.0.2
  cryptsetup-libs.x86_64 0:1.7.4-4.amzn2                   dbus.x86_64 1:1.10.24-7.amzn2.0.3
  dbus-libs.x86_64 1:1.10.24-7.amzn2.0.3                   device-mapper.x86_64 7:1.02.170-6.amzn2.5
  device-mapper-libs.x86_64 7:1.02.170-6.amzn2.5           elfutils-default-yama-scope.noarch 0:0.176-2.amzn2
  elfutils-libs.x86_64 0:0.176-2.amzn2                     gzip.x86_64 0:1.5-10.amzn2.0.1
  kmod.x86_64 0:25-3.amzn2.0.2                             kmod-libs.x86_64 0:25-3.amzn2.0.2
  libcap-ng.x86_64 0:0.7.5-4.amzn2.0.4                     libfdisk.x86_64 0:2.30.2-2.amzn2.0.11
  libidn.x86_64 0:1.28-4.amzn2.0.2                         libpwquality.x86_64 0:1.2.3-5.amzn2
  libsemanage.x86_64 0:2.5-11.amzn2                        libsmartcols.x86_64 0:2.30.2-2.amzn2.0.11
  libutempter.x86_64 0:1.1.6-4.amzn2.0.2                   lz4.x86_64 0:1.7.5-2.amzn2.0.1
  pam.x86_64 0:1.1.8-23.amzn2.0.1                          qrencode-libs.x86_64 0:3.4.1-3.amzn2.0.2
  shadow-utils.x86_64 2:4.1.5.1-24.amzn2.0.2               systemd.x86_64 0:219-78.amzn2.0.22
  systemd-libs.x86_64 0:219-78.amzn2.0.22                  ustr.x86_64 0:1.0.4-16.amzn2.0.3
  util-linux.x86_64 0:2.30.2-2.amzn2.0.11

Dependency Updated:
  libblkid.x86_64 0:2.30.2-2.amzn2.0.11   libmount.x86_64 0:2.30.2-2.amzn2.0.11   libuuid.x86_64 0:2.30.2-2.amzn2.0.11

Complete!
```
