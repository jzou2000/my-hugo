---
title: Hugo SSG on Docker
date: 2019-04-18
tags: [docker, hugo, static-site, theme]
weight: 30
---

## Hugo Docker


```bash
docker pull klakegg/hugo:ext-apline  # 17mb


```

### Build

```bash
docker run --rm -it -v $(pwd):/src -v $(pwd)/output:/target klakegg/hugo:ext-alpine
```

### Run Server

```bash
docker run --rm -it -v $(pwd):/src -p 1313:1313 klakegg/hugo:ext-alpine
```

### Compose

### Shell

```bash
docker run --rm -it -v $(pwd):/src klakegg/hugo:ext-alpine shell
```

### Configuration

Environment variables:

* HUGO_BIND - Bind address for server. Default: 0.0.0.0
* HUGO_DESTINATION - Location of output folder. Default: /target
* HUGO_PANDOC - Pandoc command to be triggered. Default: pandoc-default
* HUGO_ENV - Selecting environment ("DEV"/"production"). Default: DEV

Volumes:

* /src - Source folder and workdir
* /target - Target folder

Ports:

* 1313/tcp


## Hugo Themes

|Name|Tags|HugoVersion|Comment|
|---|---|---|---|
|Plain Blog|blog minimal white|0.18|X|
|light-hugo|nojs minimal light|-|X assets?|
|Indigo|blog|0.48|X|
|Cupper|blog doc dark|0.48|?|
|Whiteplain|blog white|0.30|X|
|Minimo|blog responsive|0.45|X|
|Heather Hugo|blog|-|https://github.com/hbpasti/heather-hugo|X|
|nofancy|blog personal|0.14|simple list|
|purehugo|blog pure-css|0.14|simple list|
|techdoc|doc|0.30|GOOD side-bar=fs|
|book|docs flexbox|0.43|? yaml|
|Whisper|doc boostrap|0.51|X|
|docuapi|docs api|0.17|? work-confusing|
|Hamburg|blog bootstrap clean|X|
|Nuo|clean customizable lightweight|0.50|X more research|
|Code Editor|atom code|0.14|ui:atom|

```bash
git clone https://github.com/aubm/hugo-code-editor-theme.git themes/code-editor
```

### techdoc

```bash
https://github.com/thingsym/hugo-theme-techdoc.git
git clone https://github.com/thingsym/hugo-theme-techdoc.git themes/techdoc
failed on .18
```
show documents in file tree on left sidebar.

### docuapi

```
https://github.com/bep/docuapi.git
git clone https://github.com/bep/docuapi.git themes/docuapi
```

need more research on this theme
left sidebar is confusing

### book

```
git clone https://github.com/alex-shpak/hugo-book.git themes/book
run but not work
maybe config yaml?
```

### not work

```bash
git clone https://github.com/taikii/whiteplain.git themes/whiteplain
git clone https://github.com/hauke96/hugo-theme-hamburg.git themes/hamburg
git clone https://github.com/tblyler/light-hugo.git themes/light-hugo
git clone https://github.com/LiaungYip/plain-blog.git themes/plain-blog
git clone https://github.com/jugglerx/hugo-whisper-theme.git themes/whisper
git clone --depth 1 https://github.com/MunifTanjim/minimo themes/minimo
git clone https://github.com/AngeloStavrow/indigo.git themes/indigo
git clone https://github.com/hbpasti/heather-hugo themes/heather
git clone https://github.com/laozhu/hugo-nuo themes/nuo
```

## Setup A Site

```bash

$ create hugo4; cd hugo4
# host
$ git init
$ docker run --rm -it -u 1000:1000 -p 1313:1313 -v `pwd`:/src klakegg/hugo:ext-alpine shell
# docker
$ hugo version
adduser: user 'hugo' in use
Hugo Static Site Generator v0.55.2-9D0203488/extended linux/amd64 BuildDate: 2019-04-17T12:31:27Z

$ hugo new site .

# host
$ git commit -m 'initial hugo new site .'
$ git submodule add https://github.com/taikii/whiteplain.git themes/whiteplain
$ git commit -m 'add theme whiteplain'

git submodule add https://github.com/thingsym/hugo-theme-techdoc.git themes/techdoc

# edit config.toml

git 
```
