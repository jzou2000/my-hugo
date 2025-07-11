---
title: Pkgs.org
nav: pkgs.org
---

[Pkgs.org](https://pkgs.org/) is **NOT** a package repo, it is a pakcage search engine.
After a package is found, you need to go to the actual package repository to download or install.
But usually pkgs.org contains **Install Howto** section.


## Example

gcc-11 is not in standard package of centos7 (which is 4.8),
we can find [one package](https://centos.pkgs.org/7/centos-sclo-rh-x86_64/devtoolset-11-gcc-c++-11.2.1-9.1.el7.x86_64.rpm.html) on CentOS SCLo RH repository through pkgs.org

Beyond the source and download links,
here is the install info

```txt
1. Install CentOS SCLo RH repository:
    yum install centos-release-scl-rh

2. Install devtoolset-11-gcc-c++ rpm package:
    yum install -y devtoolset-11-gcc-c++
```

However, that is not enough because scl (software collections) packages
are not installed at the **standard** location.
Here is a full [scl usage guide](https://www.softwarecollections.org/en/docs/) from its website.

```bash
yum install centos-release-scl
yum-config-manager --enable rhel-server-rhscl-7-rpms
yum install devtoolset-11-gcc-c++
scl enable devtoolset-11 bash
```

