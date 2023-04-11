---
title: Change Docker Storage
nav: change docker storage
description: Change docker storage to a new mount point with more space.
date: 2020-02-18
weight: 4
---

## Purpose

By default docker save all its data, including images, containers, etc at ``/var/lib/docker``

```bash {hl_lines=["1","40"]}
jzou@debian9: $ docker info
Client:
 Debug Mode: false

Server:
 Containers: 1
  Running: 1
  Paused: 0
  Stopped: 0
 Images: 8
 Server Version: 19.03.5
 Storage Driver: overlay2
  Backing Filesystem: extfs
  Supports d_type: true
  Native Overlay Diff: true
 Logging Driver: json-file
 Cgroup Driver: cgroupfs
 Plugins:
  Volume: local
  Network: bridge host ipvlan macvlan null overlay
  Log: awslogs fluentd gcplogs gelf journald json-file local logentries splunk syslog
 Swarm: inactive
 Runtimes: runc
 Default Runtime: runc
 Init Binary: docker-init
 containerd version: b34a5c8af56e510852c35414db4c1f4fa6172339
 runc version: 3e425f80a8c931f88e6d94a8c831b9d5aa481657
 init version: fec3683
 Security Options:
  seccomp
   Profile: default
 Kernel Version: 4.9.0-11-amd64
 Operating System: Debian GNU/Linux 9 (stretch)
 OSType: linux
 Architecture: x86_64
 CPUs: 4
 Total Memory: 7.8GiB
 Name: debian9
 ID: Z5OY:DTAL:AOIB:RPYL:LORM:JXOI:4SRW:U3ZY:5VD5:4URZ:6WQ3:ZR67
 Docker Root Dir: /var/lib/docker
 Debug Mode: false
 Username: jzou2000
 Registry: https://index.docker.io/v1/
 Labels:
 Experimental: false
 Insecure Registries:
  127.0.0.0/8
 Live Restore Enabled: false

WARNING: No swap limit support

```

Quite often there isn't enough space on /var and you want to move it to some mount point with huge space.

## HOW-TO

1. Stop docker
   ```bash
   sudo systemctl stop docker
   ```
1. Edit docker daemon configuration file ``/lib/systemd/system/docker.service``, find the line ``ExecStart=...``
   then add option ``-g``
   ```bash
   #backup original line, add new -g option
   #ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
   ExecStart=/usr/bin/dockerd -g /mnt/huge/docker -H fd:// --containerd=/run/containerd/containerd.sock
   ```
1. Copy old content to the new location
   ```bash
   sudo rsync -aqxP /var/lib/docker/ /mnt/huge/docker/
   # make sure that docker uses the new location instead of the old one
   sudo mv /var/lib/docker /var/lib/docker.bak
   ```
1. Restart docker
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl start docker
   ```
1. (optional) Remove original backup after everything goes fine.

Reference:
* [StackOverflow](https://stackoverflow.com/questions/32070113/how-do-i-change-the-default-docker-container-location)
