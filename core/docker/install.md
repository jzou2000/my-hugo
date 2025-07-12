---
title: Install Docker
date: 2019-03-01
tags: [docker, install]
weight: 1
---

## install
```bash
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg2 \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \
    $(lsb_release -cs) \
    stable"
sudo apt-get update
sudo apt-get install docker-ce

# apt-cache madison docker-ce
sudo groupadd docker
sudo usermod -aG docker jzou
sudo docker run hello-world

# docker data/containers/images are stored at /var/lib/docker

docker --version
    Docker version 17.12.0-ce, build c97c6d6

```
