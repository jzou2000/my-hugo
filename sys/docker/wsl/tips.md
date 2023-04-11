---
title: WSL 2 tips
---

## WSL 2 Features

## Install WSL 2

## Accessing Files between WSL and Windows Host

* From WSL - Windows hosts volumns are mounted at ``/mnt``, e.g. ``/mnt/c`` for driver ``C:``.
* From Windows host - WSL distro file system is mount as ``\\wsl$\{distro}``, where ``{distro}``
  is the WSL distro name, e.g. ``unbuntu`` or ``debian``


## WSL GUI

### VcXsrv

VcXsrv is an open source X server on Windows, with GPL license.

Note:
* allow it access Windows Firewall, use either of these solutions
  * enable access from private/domain/public at the first time launch, or
  * change it through following path in Windows Settings
    *  Update & Security
    *  Windows Security
    *  Firewall & network protection
    *  Allow an app through firewall
    *  find VcXsrv in "allowed apps and features" list, and enable all of Domain/Private/Public
 * can we disable firewall for all WSL?

### Set DISPLAY in WSL

Because WSL is a virtual machine inside the Windows host, we can't access the X server that runs on Windows host as ``localhost``. However, by default WSL uses Windows host as nameserver,
adding following lines in ``$HOME/.bash_profile``


```bash
export WINHOST=$(grep nameserver /etc/resolv.conf | sed 's/nameserver //')
export DISPLAY=$WINHOST:0
```

## Access host network driver

Suppose we have ``/mnt/m`` created and we want to mount driver ``M:`` to ``/mnt/m``

```bash
mount -t drvfs M: /mnt/m
```
