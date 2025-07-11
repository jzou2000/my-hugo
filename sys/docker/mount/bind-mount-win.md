---
title: Bind-mount a Local Folder on Windows
date: 2019-03-28
tags: [docker, windows, bind]
nav: bind-mount on Windows
weight: 50
---

The Docker container supports mounting a host folder to a container mount point

```bash
docker run -v host_paht:container_path [ other options ]
```

However you can't mount a folder other than C:/Users and its sub-folders on Windows/OSX, like this

```bash
docker run -v d:/my-path:/my-mount ...
```


Docker on Windows/OSX is implemented through a virtual machine (docker-machine), so the host path is actually the path on the docker-machine, not the host that runs docker.

To mount an arbitary host folder to the docker container, the host folder has to be accessible by the docker machine, and expressed in the format of docker machine.

* stop the docker machine
* create a shared-folder on the docker machine and the *host* machine, e.g. Windows d:\ to virtualbox /d
* restart the docker machine
* start docker with docker-machine path

Verify the shared-folder is valid and mounted

```bash
docker-machine ssh
mount
ls /d
```


Options that mount the host folder d:/my-path (docker-machine equivalent /d/my-path)
```
-v /d/my-path:/my-mount
```

