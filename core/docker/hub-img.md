---
title: Some Docker Images On hub.docker.com
date: 2019-04-25
tags: [docker, hub, image]
nav: images on hub.docker
weight: 30
---

## My List
```
klakegg/hugo             latest              de97b1ae4b16        3 weeks ago         44.2MB (0.63.1)

alpine                   latest              965ea09ff2eb        4 months ago        5.55MB
node                     lts-alpine3.10      8d20833f510f        3 weeks ago         84.9MB (12.14.1)
node                     lts                 98a2c7c96ac3        5 days ago          914MB

centos                   6                   d0957ffdf8a2        11 months ago       194MB
centos                   latest              9f38484d220f        11 months ago       202MB
debian                   9-slim              b805107aed7b        11 months ago       55.3MB
debian                   latest              0af60a5c6dd0        11 months ago       101MB
walkero/node-vuecli      latest              8ac98d2b7f9a        11 months ago       189MB
anapsix/alpine-java      latest              c45785c254c5        12 months ago       126MB
maven                    alpine              7445f83cd169        9 months ago        122MB

python                   alpine              a1cd5654cf3c        12 days ago         109MB  (3.8.1)

frolvlad/alpine-gxx      latest              641ec3f19238        3 weeks ago         175MB  (9.2.0)
frolvlad/alpine-glibc    latest              2e9a6904a914        3 weeks ago         17.4MB

woahbase/alpine-nodejs   latest              d40b815305b8        9 months ago        118MB
woahbase/alpine-vue      latest              bbb4b2dcfb0f        2 months ago        475MB (4.1.1)

astj/centos5-vault       latest              e79faab040e1        2 years ago         284MB
centos5-gcc44            latest              d39137f209f7        2 weeks ago         617MB
agent544                 latest              ddcf223369ff        4 days ago          820MB
centos                   6                   d0957ffdf8a2        11 months ago       194MB
jzou2000/cen6g44         latest              31e4edf89146        10 months ago       327MB
agent44                  latest              46985c8a286a        7 months ago        533MB

```

## [woahbase/alpine-vue](https://hub.docker.com/r/woahbase/alpine-vue)

* Small image for Vue CLI built on Alpine Linux + NodeJS
* 50.1M/16 layers


Container for Alpine Linux + VueJS CLI
This image containerizes the command line client for VueJS along with its NPM dependencies.

Based on Alpine Linux from my alpine-nodejs image with the s6 init system overlayed in it.

The image is tagged respectively for the following architectures,

* armhf
* x86_64 ( retagged as the latest )

armhf builds have embedded binfmt_misc support and contain the qemu-user-static binary that 
allows for running it also inside an x64 environment that has it.

### Get the Image
Pull the image for your architecture it's already available from Docker Hub.

{{<highlight bash>}}
# make pull
docker pull woahbase/alpine-vue:x86_64
{{</highlight>}}

### Run
If you want to run images for other architectures, you will need to have binfmt support configured for your machine. multiarch, has made it easy for us containing that into a docker container.

{{<highlight bash>}}
# make regbinfmt
docker run --rm --privileged multiarch/qemu-user-static:register --reset
{{</highlight>}}

Without the above, you can still run the image that is made for your architecture, e.g for an x86_64 machine..

This images already has a user alpine configured to drop privileges to the passed PUID/PGID which is ideal if its used to run in non-root mode. That way you only need to specify the values at runtime and pass the -u alpine if need be. (run id in your terminal to see your own PUID/PGID values.)

Before you run..

Mount the project directory (where package.json is) at /home/alpine/project. Mounts PWD by default.

Vue runs under the user alpine.

Running make gets a shell.

{{<highlight bash>}}
# make
docker run --rm -it \
  --name docker_vue --hostname vue \
  -e PGID=1000 -e PUID=1000 \
  -c 256 -m 512m \
  -v $PWD:/home/alpine/project \
  -v /etc/localtime:/etc/localtime:ro \
  -v /etc/hosts:/etc/hosts:ro \
  -p 8080:8080 \
  --entrypoint /bin/bash \
  woahbase/alpine-vue:x86_64
{{</highlight>}}

The usual vue stuff. e.g list projects with

{{<highlight bash>}}
# make list
docker run --rm -it \
  --name docker_vue --hostname vue \
  -e PGID=1000 -e PUID=1000 \
  -c 256 -m 512m \
  -v $PWD:/home/alpine/project \
  -v /etc/localtime:/etc/localtime:ro \
  -v /etc/hosts:/etc/hosts:ro \
  -p 8080:8080 \
  woahbase/alpine-vue:x86_64 \
  list
{{</highlight>}}

initialize a project

{{<highlight bash>}}
# make init
docker run --rm -it \
  --name docker_vue --hostname vue \
  -e PGID=1000 -e PUID=1000 \
  -c 256 -m 512m \
  -v $PWD:/home/alpine/project \
  -v /etc/localtime:/etc/localtime:ro \
  -v /etc/hosts:/etc/hosts:ro \
  -p 8080:8080 \
  woahbase/alpine-vue:x86_64 \
  init
{{</highlight>}}

run the dev server,

{{<highlight bash>}}
# make dev
docker run --rm -it \
  --name docker_vue --hostname vue \
  -e PGID=1000 -e PUID=1000 \
  -c 256 -m 512m \
  -v $PWD:/home/alpine/project \
  -v /etc/localtime:/etc/localtime:ro \
  -v /etc/hosts:/etc/hosts:ro \
  -p 8080:8080 \
  --entrypoint npm \
  woahbase/alpine-vue:x86_64 \
  run dev
{{</highlight>}}

build the project with

{{<highlight bash>}}
# make prod
docker run --rm -it \
  --name docker_vue --hostname vue \
  -e PGID=1000 -e PUID=1000 \
  -c 256 -m 512m \
  -v $PWD:/home/alpine/project \
  -v /etc/localtime:/etc/localtime:ro \
  -v /etc/hosts:/etc/hosts:ro \
  -p 8080:8080 \
  --entrypoint npm \
  woahbase/alpine-vue:x86_64 \
  run build
{{</highlight>}}

Stop the container with a timeout, (defaults to 2 seconds)

{{<highlight bash>}}
# make stop
docker stop -t 2 docker_vue
Removes the container, (always better to stop it first and -f only when needed most)

# make rm
docker rm -f docker_vue
Restart the container with

# make restart
docker restart docker_vue
Shell access
Get a shell inside a already running container,

# make shell
docker exec -it docker_vue /bin/bash
set user or login as root,

# make rshell
docker exec -u root -it docker_vue /bin/bash
To check logs of a running container in real time

# make logs
docker logs -f docker_vue
{{</highlight>}}

## Development
If you have the repository access, you can clone and build the image yourself for your own system, and can push after.

### Setup
Before you clone the repo, you must have Git, GNU make, and Docker setup on the machine.


{{<highlight bash>}}
git clone https://github.com/woahbase/alpine-vue
cd alpine-vue
{{</highlight>}}

You can always skip installing make but you will have to type the whole docker commands then instead of using the sweet make targets.

### Build
You need to have binfmt_misc configured in your system to be able to build images for other architectures.

Otherwise to locally build the image for your system. [ARCH defaults to x86_64, need to be explicit when building for other architectures.]

{{<highlight bash>}}
# make ARCH=x86_64 build
# sets up binfmt if not x86_64
docker build --rm --compress --force-rm \
  --no-cache=true --pull \
  -f ./Dockerfile_x86_64 \
  --build-arg ARCH=x86_64 \
  --build-arg DOCKERSRC=alpine-nodejs \
  --build-arg PGID=1000 \
  --build-arg PUID=1000 \
  --build-arg USERNAME=woahbase \
  -t woahbase/alpine-vue:x86_64 \
  .
{{</highlight>}}

To check if its working..

{{<highlight bash>}}
# make ARCH=x86_64 test
docker run --rm -it \
  --name docker_vue --hostname vue \
  -e PGID=1000 -e PUID=1000 \
  woahbase/alpine-vue:x86_64 \
  --version
{{</highlight>}}


And finally, if you have push access,

{{<highlight bash>}}
# make ARCH=x86_64 push
docker push woahbase/alpine-vue:x86_64
{{</highlight>}}



## [woahbase/alpine-nodejs](https://hub.docker.com/r/woahbase/alpine-nodejs)

* Alpine Linux + s6 + NodeJS + NPM
* 39.9M/11 layers


Container for Alpine Linux + S6 + NodeJS + NPM.

This image serves as the base image for applications / services that require NodeJS and NPM to manage dependencies.

Based on Alpine Linux from my alpine-s6 image with the s6 init system overlayed in it.

The image is tagged respectively for the following architectures,

* armhf
* x86_64 ( retagged as the latest )

armhf builds have embedded binfmt_misc support and contain the qemu-user-static binary that allows for running it also inside an x64 environment that has it.

### Get the Image

Pull the image for your architecture it's already available from Docker Hub.


{{<highlight bash>}}
# make pull
docker pull woahbase/alpine-nodejs:x86_64
{{</highlight>}}

### Run
If you want to run images for other architectures, you will need to have binfmt support configured for your machine. multiarch, has made it easy for us containing that into a docker container.

{{<highlight bash>}}
# make regbinfmt
docker run --rm --privileged multiarch/qemu-user-static:register --reset
{{</highlight>}}

Without the above, you can still run the image that is made for your architecture, e.g for an x86_64 machine..

This images already has a user alpine configured to drop privileges to the passed PUID/PGID which is ideal if its used to run in non-root mode. That way you only need to specify the values at runtime and pass the -u alpine if need be. (run id in your terminal to see your own PUID/PGID values.)

Running make gets a shell.

{{<highlight bash>}}
# make
docker run --rm -it \
  --name docker_nodejs --hostname nodejs \
  -e PGID=1000 -e PUID=1000 \
  woahbase/alpine-nodejs:x86_64 \
  /bin/bash
{{</highlight>}}

Stop the container with a timeout, (defaults to 2 seconds)

{{<highlight bash>}}
# make stop
docker stop -t 2 docker_nodejs
Removes the container, (always better to stop it first and -f only when needed most)

# make rm
docker rm -f docker_nodejs
Restart the container with

# make restart
docker restart docker_nodejs
Shell access
Get a shell inside a already running container,

# make shell
docker exec -it docker_nodejs /bin/bash
set user or login as root,

# make rshell
docker exec -u root -it docker_nodejs /bin/bash
To check logs of a running container in real time

# make logs
docker logs -f docker_nodejs
{{</highlight>}}


## Development
If you have the repository access, you can clone and build the image yourself for your own system, and can push after.

### Setup
Before you clone the repo, you must have Git, GNU make, and Docker setup on the machine.

{{<highlight bash>}}
git clone https://github.com/woahbase/alpine-nodejs
cd alpine-nodejs
{{</highlight>}}

You can always skip installing make but you will have to type the whole docker commands then instead of using the sweet make targets.

### Build
You need to have binfmt_misc configured in your system to be able to build images for other architectures.

Otherwise to locally build the image for your system. [ARCH defaults to x86_64, need to be explicit when building for other architectures.]

{{<highlight bash>}}
# make ARCH=x86_64 build
# sets up binfmt if not x86_64
docker build --rm --compress --force-rm \
  --no-cache=true --pull \
  -f ./Dockerfile_x86_64 \
  --build-arg ARCH=x86_64 \
  --build-arg DOCKERSRC=alpine-s6 \
  --build-arg PGID=1000 \
  --build-arg PUID=1000 \
  --build-arg USERNAME=woahbase \
  -t woahbase/alpine-nodejs:x86_64 \
  .
{{</highlight>}}

To check if its working..

{{<highlight bash>}}
# make ARCH=x86_64 test
docker run --rm -it \
  --name docker_nodejs --hostname nodejs \
  -e PGID=1000 -e PUID=1000 \
  woahbase/alpine-nodejs:x86_64 \
  sh -ec 'node --version; npm --version'
{{</highlight>}}

And finally, if you have push access,

{{<highlight bash>}}
# make ARCH=x86_64 push
docker push woahbase/alpine-nodejs:x86_64
{{</highlight>}}



## frolvlad/alpine-gxx

The smallest Docker image with C and C++ compilers (GCC) (v9.2.0) (55.5MB/4layers)


Usage Example
```bash
$ echo -e '#include <iostream>\nint main() { std::cout << "Hello World\\n"; }' > qq.cpp
$ docker run --rm -v `pwd`:/tmp frolvlad/alpine-gxx c++ --static /tmp/qq.cpp -o /tmp/qq
```
Once you have run these commands you will have qq executable in your current directory and if you execute it, you will get printed 'Hello World'!

## frolvlad/alpine-glibc

Alpine Docker image with glibc (~12MB) (7.9MB/4layers)

This image is based on Alpine Linux image, which is only a 5MB image, and contains glibc to enable proprietary projects compiled against glibc (e.g. OracleJDK, Anaconda) work on Alpine.

This image includes some quirks to make glibc work side by side with musl libc (default in Alpine Linux). glibc packages for Alpine Linux are prepared by Sasha Gerrand and the releases are published in sgerrand/alpine-pkg-glibc github repo.

### Usage Example

This image is intended to be a base image for your projects, so you may use it like this:
```
FROM frolvlad/alpine-glibc

COPY ./my_app /usr/local/bin/my_app
```

```bash
$ docker build -t my_app .
```

There are already several images using this image, so you can refer to them as usage examples:

* frolvlad/alpine-oraclejdk8 (github)
* frolvlad/alpine-mono (github)

## maven:alpine

* jdk - java-1.8-openjdk
* maven - 3.6.1

## klakegg/hugo

Minimal image and variants with batteries included for Hugo open-source static site generator. (13.7MB/8layers)

This image does not try to do any fancy. Users may use Hugo just as they are used to.

The good practice of having a separate output folder is part of the image.

### Command line
Normal build:

```bash
docker run --rm -it \
  -v $(pwd):/src \
  -v $(pwd)/output:/target \
  klakegg/hugo:0.64.1
```

Run server:

```bash
docker run --rm -it \
  -v $(pwd):/src \
  -p 1313:1313 \
  klakegg/hugo:0.64.1 \
  server
```

### docker-compose

Normal build:

```
  build:
    image: klakegg/hugo:0.64.1
    volumes:
      - .:/src
      - ./output:/target
```

Run server:

```
  server:
    image: klakegg/hugo:0.64.1
    command: server
    volumes:
      - .:/src
    ports:
      - 1313:1313
```

### Github Actions
All versions and variants published using this repository may be used in any combination.

Simple configuration for e.g. .github/workflows/hugo.yml:

```
name: Hugo

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1

    - name: hugo
      uses: klakegg/actions-hugo@1.0.0

```

Find out more in klakegg/actions-hugo.

### Travis CI
Simple configuration for .travis.yml:

```
language: bash

services:
- docker

script:
- docker run --rm -i \
    -v $(pwd):/src \
    -v $(pwd)/output:/target \
    klakegg/hugo:0.64.1
```

The bash environment is used for faster loading before Travis is ready to trigger Docker.

### Hugo shell
A Hugo shell is made available in the Alpine/Debian/Ubuntu images (including Asciidoctor/Pandoc images). Hugo shell is bash and Hugo completion.

To get into a shell for your site:

```bash
docker run --rm -it \
  -v $(pwd):/src \
  klakegg/hugo:0.64.1-alpine \
  shell
```

### Hugo extended edition
The extended edition is used in those images containing ext in the name. Except use of extended edition and additional tools are those images exactly the same as those using the normal edition.

Table of Hugo extention features and the version when images first support the feature:
```
Feature	Alpine	Debian	Ubuntu
Hugo extended	0.43	0.43	0.43
PostCSS	0.56.0	0.43	0.43
NodeJS/Yarn	0.54.0	0.54.0	0.54.0
Git	0.56.0	0.56.0	0.56.0
Autoprefixer	0.57.0	0.57.0	0.57.0
```
Users of google/docsy may use the extended images as of version 0.57.2 to build their site.

### Using an ONBUILD image
The onbuild images adds content of the folder of your Dockerfile into /src and builds to the /onbuild folder.

Example Dockerfile for your project where the site is made into an nginx image (Docker 17.05-ce or newer):

```
FROM klakegg/hugo:0.64.1-onbuild AS hugo

FROM nginx
COPY --from=hugo /onbuild /usr/share/nginx/html
```

### Using Pandoc
Hugo images with Pandoc support are made available for users wanting to use Pandoc in combination with Hugo.

Hugo triggers Pandoc with pandoc --mathjax. Some users may want to use other arguments, so to accommodate such a need is an alias pandoc created with the content of HUGO_PANDOC (default: pandoc-default) upon initiation. The normal pandoc executable is renamed to pandoc-default to allow for later introduction of pandoc-citeproc if needed.

Example of explicit setting pandoc alias:

```
docker run --rm -it \
  -v $(pwd):/src \
  -v $(pwd)/output:/src/public \
  -e HUGO_PANDOC="pandoc-default --strip-empty-paragraphs" \
  klakegg/hugo:0.64.1-pandoc
```

### Overriding entrypoint
Those wanting to override entrypoint in the image may easily do so.

Default entrypoint is hugo, a small script wrapping the official Hugo software. If you want to use the official software without any wrapping may you use hugo-official as entrypoint.

On command line using --entrypoint:

```
docker run --rm -it \
  -v $(pwd):/src \
  -v $(pwd)/output:/src/public \
  --entrypoint hugo-official \
  klakegg/hugo:0.64.1
```

In docker-compose using entrypoint:

```
  build:
    image: klakegg/hugo:0.64.1
    entrypoint: hugo-official
    volumes:
      - .:/src
      - ./output:/src/public
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
