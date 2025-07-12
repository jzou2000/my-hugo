---
title: Download Packages Without Installing them
nav: download packages
---

Package managers (e.g. apt, yum) search the package repositories, download packages (and their dependencies) and install them.
What if we want to just download them without installation? These are scenarios:

* we want to install those packages on many systems or hosts
* we want to repeat to install them for debugging purpose or different version, such as docker images

## rpm for redhat, centos and so on

### yum-utils

```bash
[root@0268aef3d0ef x]# yum -y install yum-utils
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
Setting up Install Process
Resolving Dependencies
--> Running transaction check
---> Package yum-utils.noarch 0:1.1.16-21.el5.centos set to be updated
--> Finished Dependency Resolution

Dependencies Resolved

========================================================================================================================
 Package                    Arch                    Version                                 Repository             Size
========================================================================================================================
Installing:
 yum-utils                  noarch                  1.1.16-21.el5.centos                    base                   74 k

Transaction Summary
========================================================================================================================
Install       1 Package(s)
Upgrade       0 Package(s)

Total download size: 74 k
Is this ok [y/N]: y
Downloading Packages:
yum-utils-1.1.16-21.el5.centos.noarch.rpm                                                        |  74 kB     00:00
Running rpm_check_debug
Running Transaction Test
Finished Transaction Test
Transaction Test Succeeded
Running Transaction
  Installing     : yum-utils                                                                                        1/1

Installed:
  yum-utils.noarch 0:1.1.16-21.el5.centos

Complete!
```

Now try to download gcc44 (itself)
```bash
[root@0268aef3d0ef x]# yumdownloader gcc44
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
gcc44-4.4.7-1.el5.x86_64.rpm                                                                     |  12 MB     00:08
[root@0268aef3d0ef x]# ls
Dockerfile  gcc44-4.4.7-1.el5.x86_64.rpm
[root@0268aef3d0ef x]# ls -al
total 12452
drwxr-xr-x 2 1094144924 1093140993     4096 Mar  9 22:22 .
drwxr-xr-x 1 root       root           4096 Mar  9 22:20 ..
-rw-r--r-- 1 root       root       12735725 Jan 10  2013 gcc44-4.4.7-1.el5.x86_64.rpm
```

If we want to download a package with all its dependents:
```bash
[root@0268aef3d0ef x]# yumdownloader --resolve gcc44
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
--> Running transaction check
---> Package gcc44.x86_64 0:4.4.7-1.el5 set to be updated
--> Processing Dependency: libgomp = 4.4.7-1.el5 for package: gcc44
--> Processing Dependency: glibc-devel >= 2.2.90-12 for package: gcc44
--> Processing Dependency: binutils220 for package: gcc44
--> Processing Dependency: libgmpxx.so.3()(64bit) for package: gcc44
--> Processing Dependency: libgmp.so.3()(64bit) for package: gcc44
--> Processing Dependency: libgomp.so.1()(64bit) for package: gcc44
--> Running transaction check
---> Package binutils220.x86_64 0:2.20.51.0.2-5.29.el5 set to be updated
---> Package glibc-devel.x86_64 0:2.5-123.el5_11.3 set to be updated
--> Processing Dependency: glibc-headers = 2.5-123.el5_11.3 for package: glibc-devel
--> Processing Dependency: glibc-headers for package: glibc-devel
---> Package gmp.x86_64 0:4.1.4-10.el5 set to be updated
---> Package libgomp.x86_64 0:4.4.7-1.el5 set to be updated
--> Running transaction check
---> Package glibc-headers.x86_64 0:2.5-123.el5_11.3 set to be updated
--> Processing Dependency: kernel-headers >= 2.2.1 for package: glibc-headers
--> Processing Dependency: kernel-headers for package: glibc-headers
--> Running transaction check
---> Package kernel-headers.x86_64 0:2.6.18-419.el5 set to be updated
--> Finished Dependency Resolution
./gcc44-4.4.7-1.el5.x86_64.rpm already exists and appears to be complete
gmp-4.1.4-10.el5.x86_64.rpm                                                                      | 201 kB     00:00
glibc-devel-2.5-123.el5_11.3.x86_64.rpm                                                          | 2.4 MB     00:01
libgomp-4.4.7-1.el5.x86_64.rpm                                                                   |  71 kB     00:00
glibc-headers-2.5-123.el5_11.3.x86_64.rpm                                                        | 602 kB     00:00
kernel-headers-2.6.18-419.el5.x86_64.rpm                                                         | 1.5 MB     00:01
binutils220-2.20.51.0.2-5.29.el5.x86_64.rpm                                                      | 986 kB     00:00
[root@0268aef3d0ef x]# ls -al
total 18356
drwxr-xr-x 2 1094144924 1093140993     4096 Mar  9 22:25 .
drwxr-xr-x 1 root       root           4096 Mar  9 22:20 ..
-rw-r--r-- 1 root       root        1009201 Feb 22  2012 binutils220-2.20.51.0.2-5.29.el5.x86_64.rpm
-rw-r--r-- 1 1094144924 root       12735725 Jan 10  2013 gcc44-4.4.7-1.el5.x86_64.rpm
-rw-r--r-- 1 root       root        2547087 Aug 17  2015 glibc-devel-2.5-123.el5_11.3.x86_64.rpm
-rw-r--r-- 1 root       root         616924 Aug 17  2015 glibc-headers-2.5-123.el5_11.3.x86_64.rpm
-rw-r--r-- 1 root       root         205765 Nov 19  2007 gmp-4.1.4-10.el5.x86_64.rpm
-rw-r--r-- 1 root       root        1583685 Feb 25  2017 kernel-headers-2.6.18-419.el5.x86_64.rpm
-rw-r--r-- 1 root       root          72734 Jan 10  2013 libgomp-4.4.7-1.el5.x86_64.rpm
[root@0268aef3d0ef x]#
```

### yum-plugin-downloadonly

* Note: this plug-in is not supported in centos5

```bash
# yum install yum-plugin-downloadonly
# yum install --downloadonly <package-name>
# yum install --downloadonly --downloaddir=<directory> <package-name>
```
* without ``--downloaddir``, by default the packages are saved in ``/var/cache/yum/``




## apt for ubuntu, debian and so on

* use ``--download-only`` or ``-d`` option of ``apt-get``
  ```
  -d, --download-only
     Download only; package files are only retrieved, not unpacked or installed.
     Configuration Item: APT::Get::Download-Only.
  ```
  * ``apt-get -d`` doesn't download things if they have installed already. Use ``apt download <package_name>`` instead.
* Don't forget the option ``-o``, which lets you download anywhere you want,
  although you have to create ``archives``, ``lock`` and ``partial`` first (the command prints what's needed).
  ```bash
  apt-get install -d -o=dir::cache=/tmp whateveryouwant
  ```

