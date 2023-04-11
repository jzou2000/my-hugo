---
title: My docker that runs hugo
date: 2019-11-21
nav: my hugo docker
tags: [docker, setup, tips]
weight: 30
---

## Setup

## Run

By default the script runhugo

1. accept a list of folder as toplevel content section
1. clean target folder
1. generate the site and *watch* the input folder to updte

Example

```bash
$ hugo.sh -h
hugo.sh [options] [project1 [project2 ...]]

launch hugo in a container, should run from WSL/Linux

    -h           help
    -y           dry run
    -i           interactive shell
    -w path      work folder (/home/jasonz/myhub)
    -c file      configuration yaml file
    -v map-list  path mapping (e.g. lpath:dpath [-v lp2:dp2])
    -t path      publish target folder (/mnt/c/myhub/site)
    -b path      base url
    -g           publish for github.io
    -n           clean destination folder
    -o           run once, don't monitor
    -N           don't name container (hugo)
    -I name      image (myhugo)
    -r           run as root in container, default is current user
    -f           force to use local theme at (/home/jasonz/myhub/myhugo/van)
    -q           quit after clean

    default projects are: kbase diy life simba books bookmarks

```



## Theme


