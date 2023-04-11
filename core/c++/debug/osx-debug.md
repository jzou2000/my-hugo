---
title: Debugging on OSX
date: 2019-09-10
categories: admin
tags: [debug, osx, SIP, protection]
---

## SIP (System Integrity Protection)

SIP is introduced in OS X EI Capitan.
Turn it off to debug an app. [Turn off SIP](https://www.imore.com/how-turn-system-integrity-protection-macos)

Note:
On some old version of OSX (e.g. 10.9) extra command is required:

```bash
$ sudo /usr/sbin/DevToolsSecurity --enable
Password:
Developer mode is now enabled.
```
