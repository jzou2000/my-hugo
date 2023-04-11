---
title: Change Centos5 Using Vault Repo
nav: centos5-vault
---

After centos5 retired, it is not easy to add packages using regular repo, use vault repo instead.

Here're steps

1. Remove all .repo inside /etc/yum.repos.d/ directory
2. Create a new repo file /etc/yum.repos.d/CentOS-Vault.repo 
   ```ini
   [base]
   name=CentOS-$releasever - Base
   #mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=os
   #baseurl=http://mirror.centos.org/centos/$releasever/os/$basearch/
   baseurl=http://vault.centos.org/5.11/os/i386/
   gpgcheck=1
   gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-5
   #released updates
   [updates]
   name=CentOS-$releasever - Updates
   mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=updates
   #baseurl=http://mirror.centos.org/centos/$releasever/updates/$basearch/
   gpgcheck=1
   enabled=0
   gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-5
   #additional packages that may be useful
   [extras]
   name=CentOS-$releasever - Extras
   #mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=extras
   #baseurl=http://mirror.centos.org/centos/$releasever/extras/$basearch/
   baseurl=http://vault.centos.org/5.11/extras/i386/
   gpgcheck=1
   gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-5
   ```
3. Now execute-
   ```sh
   yum update
   ```
4. Add Epel-Repository (optional)
   ```sh
   wget http://vault.centos.org/5.11/extras/i386/RPMS/epel-release-5-4.noarch.rpm
   rpm -Uvh epel-release-5-4.noarch.rpm
   yum update
   ```

[src](https://tweenpath.net/centos-5-repository-fix-using-vault-centos-org/)

Similar steps are applicable when centos 6 retires on Nov 30, 2020.
