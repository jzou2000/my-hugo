---
title: Deprecated Linux Commands And Their Replacements
nav: deprecated and replacements
tags: [deprecated, replacement, debian, linux]
---

Debian 9

## Network

|Deprecated Command|Replacement Command(s)|
|---|---|
|arp|ip n (ip neighbor)|
|ifconfig|ip a (ip addr), ip link, ip -s (ip -stats)|
|iptunnel| ip tunnel|
|iwconfig|iw|
|nameif|ip link, ifrename|
|netstat|ss, ip route (for netstat -r), ip -s link (for netstat -i), ip maddr (for netstat -g)|
|route|ip r (ip route)|

Source: [Doug Vitale Tech Blog](https://dougvitale.wordpress.com/2011/12/21/deprecated-linux-networking-commands-and-their-replacements/)