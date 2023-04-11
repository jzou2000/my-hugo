---
title: "CentOS:5"
nav: "centos:5v"
---

## Create CentOS:5v Vault

```docker
FROM centos:5

WORKDIR /home
ARG repo="/etc/yum.repos.d/CentOS-[a-zA-UW-Z]*.repo /etc/yum.repos.d/lib*.repo"

COPY CentOS-Vault.repo /etc/yum.repos.d/
RUN rm -f $repo \
  && yum -y update \
  && yum -y downgrade libselinux \
  && yum -y install m4 which make

ENTRYPOINT [ "/bin/bash" ]
```

Build the docker image with tag ``cen5v``
```bash
~/codex/docker/cen5v$ docker build -t centos:5v .
[+] Building 25.0s (9/9) FINISHED                                                                                                                                   
 => [internal] load build definition from Dockerfile                                                                                                           0.0s
 => => transferring dockerfile: 339B                                                                                                                           0.0s
 => [internal] load .dockerignore                                                                                                                              0.0s
 => => transferring context: 2B                                                                                                                                0.0s
 => [internal] load metadata for docker.io/library/centos:5                                                                                                    0.0s
 => [1/4] FROM docker.io/library/centos:5                                                                                                                      0.0s
 => => resolve docker.io/library/centos:5                                                                                                                      0.0s
 => [internal] load build context                                                                                                                              0.0s
 => => transferring context: 908B                                                                                                                              0.0s
 => [2/4] WORKDIR /home                                                                                                                                        0.0s
 => [3/4] COPY CentOS-Vault.repo /etc/yum.repos.d/                                                                                                             0.0s
 => [4/4] RUN rm -f /etc/yum.repos.d/CentOS-[a-zA-UW-Z]*.repo /etc/yum.repos.d/lib*.repo   && yum -y update   && yum -y downgrade libselinux   && yum -y ins  24.1s
 => exporting to image                                                                                                                                         0.8s
 => => exporting layers                                                                                                                                        0.8s
 => => writing image sha256:6325317aa84b821e6267c6d03652e65adafcbf02f3a20b9aeed1da55c9691024                                                                   0.0s
 => => naming to docker.io/library/cenots:5v                                                                                                                   0.0s
~/codex/docker/cen5v$ 
```
