---
title: P4 info
nav: p4 info
---

```
    info -- Display client/server information

    p4 info [-s]

        Info lists information about the current client (user name,
        client name, applicable client root, client current directory,
        and the client IP address) and some server information (server
        IP address, server root, date, uptime, version and license data).

        The -s option produces 'short' output that omits any information
        that requires a database lookup such as the client root).
```

Sample result
```sh
jasonz@VANLWIN0056:/mnt/c/wks/touchstone/booster/it$ p4 info
User name: jasonz
Client name: jasonz_wsl
Client host: VANLWIN0056
Client root: /home/jasonz/wks
Current directory: /mnt/c/wks/touchstone/booster/it
Peer address: 10.160.100.12:51098
Client address: 10.160.100.12
Server address: perforce.simba.ad:1666
Server root: D:\Perforce\
Server date: 2023/03/29 12:15:09 -0700 Pacific Daylight Time
Server uptime: 640:41:18
Server version: P4D/NTX64/2021.1/2156517 (2021/07/14)
ServerID: master
Server services: commit-server
Server license: Simba Technologies Incorporated 180 users (support ends 2023/10/25) (expires 2023/10/25)
Server license-ip: 192.168.100.204:1666
Case Handling: insensitive
```

short version, which lacks client-root
```sh
jasonz@VANLWIN0056:/mnt/c/wks/touchstone/booster/it$ p4 info -s
User name: jasonz
Client name: jasonz_wsl
Client host: VANLWIN0056
Current directory: /mnt/c/wks/touchstone/booster/it
Peer address: 10.160.100.12:51102
Client address: 10.160.100.12
Server address: perforce.simba.ad:1666
Server root: D:\Perforce\
Server date: 2023/03/29 12:15:48 -0700 Pacific Daylight Time
Server uptime: 640:41:57
Server version: P4D/NTX64/2021.1/2156517 (2021/07/14)
ServerID: master
Server services: commit-server
Server license: Simba Technologies Incorporated 180 users (support ends 2023/10/25) (expires 2023/10/25)
Server license-ip: 192.168.100.204:1666
Case Handling: insensitive
```
