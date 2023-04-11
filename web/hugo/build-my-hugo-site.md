---
title: Build My Hugo Site
date: 2019-12-10
categories: [hugo]
keywords: [build, hugo, theme, git]
---

## What I have already

On github, I have these repos, they have been modified locally

* kbase - my knowledgebase markdown source
* jzou2000.github.io - my static site

On my local workstation, I have

* hugo/alpine docker
* empty hugo site ``myhugo``
* theme ``van`` developped in above site ``myhugo``
* some scripts that run hugo to generate the site and express.js to serve it

## Setup hugo work folder

```bash
cd $hugo_wks
docker run -it --rm -u $(id -u):$(id -g) -v `pwd`:/src klakegg/hugo new site --force .
cd themes
git clone https://github.com/jzou2000/van
```

## Push my theme to github

1. create a repo named ``van``. After the repo is created, github shows
   steps to pull or push.
   ```bash
   # create a new repositiory on the command line
   echo "# van" >> README.md
   git init
   git add README.md
   git commit -m "first commit"
   git remote add origin https://github.com/jzou2000/van.git
   git push -u origin master
   ```
   ```bash
   # push an existing repoistory from the command line
   git remote add origin https://github.com/jzou2000/van.git
   git push -u origin master
   ```
1. go to theme folder to create a local repo
   ```bash
   cd ~/ssg/myhugo/themes/van
   git init
   git add .
   git commit -m 'initial commit of van, my ssg hugo theme'
   ```
1. follow the push step to push local van repo to github
   ```bash
   git remote add origin https://github.com/jzou2000/van.git
   git push -u origin master
   ```

## Set chroma for highlight style

Hugo has a bunch of stocked chroma for it highlighter, they can be exported
to CSS using following command.

```sh
hugo gen chromastyles --style=monokai > syntax.css
```

Choose the proper style name (if not monokai) and save the css file to the theme static folder. In theme ``van``, the style is based on ``vs`` and saved in ``static/css``.

To let the chroma css take effect, add following lines in config.yaml

```yaml

pygmentsUseClasses: true
pygmentsCodefences: true

```

## My Config.yaml

I prefer yaml to toml, here is my config.yaml

```yaml
title: My Hugo Site
theme: van
languageCode: en-us
hasCJKLanguage: true
metaDataFormat: yaml
defaultContentLanguage: en
pygmentsCodeFences: true
pygmentsUseClasses: true
markup:
  goldmark:
    renderer:
      unsafe: true
```

## Create a Docker Image

The ``Dockerfile`` in the build folder
```docker
FROM klakegg/hugo

WORKDIR /src
RUN hugo new site . ;\
    rm config.toml

ADD config.yaml /src
ADD van /src/themes/van
ADD cmd /bin

ENTRYPOINT ["/bin/cmd"]

```

The script ``/bin/cmd``
```bash
#! /bin/sh
if [[ "$1" == "shell" ]]; then
  shift
  /bin/sh $*
else
  hugo $*
fi
```

Run to build the image

```bash
mingw:jasonz@VANLWIN0056 /c/myhub/myhugo
$ docker build -t myhugo .
[+] Building 0.3s (11/11) FINISHED
 => [internal] load .dockerignore                                   0.0s
 => => transferring context: 2B                                     0.0s
 => [internal] load build definition from Dockerfile                0.0s
 => => transferring dockerfile: 32B                                 0.0s
 => [internal] load metadata for docker.io/klakegg/hugo:latest      0.0s
 => [1/6] FROM docker.io/klakegg/hugo                               0.0s
 => [internal] load build context                                   0.1s
 => => transferring context: 94.13kB                                0.1s
 => CACHED [2/6] WORKDIR /src                                       0.0s
 => CACHED [3/6] RUN hugo new site . ;    rm config.toml            0.0s
 => CACHED [4/6] ADD config.yaml /src                               0.0s
 => [5/6] ADD van /src/themes/van                                   0.0s
 => [6/6] ADD cmd /bin                                              0.0s
 => exporting to image                                              0.1s
 => => exporting layers                                             0.0s
 => => writing image sha256:26a309e9152f26261f5870ac54de3115e61924  0.0s
 => => naming to docker.io/library/myhugo                           0.0s

mingw:jasonz@VANLWIN0056 /c/myhub/mh
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
myhugo              latest              26a309e9152f        2 minutes ago       47.6MB
node                slim                922b09b21278        5 days ago          165MB
node                latest              ca36fba5ad66        5 days ago          941MB
node                alpine              1e8b781248bb        5 days ago          115MB
klakegg/hugo        latest              1688b3d839d3        10 days ago         47.5MB
alpine              latest              a24bb4013296        5 months ago        5.57MB

```


## Regular Publish Steps

1. commit and push markdown pages
   ```bash
   cd ~/myhub/kbase
   git add .
   git commit -m 'I have updted some content in md'
   git push
   ```
1. run hugo (via docker) to generate the site (html)
   ```bash
   runhugo -N -g kbase books bookmarks
   # the target folder will be
   # ~/myhub/jzou2000.github.io
   # -N   don't use docker name (there's another hugo docker for locaer webs)
   # -g   for github
   ```
1. push hugo output to github
   ```bash
   cd ~/myhub/jzou2000.github.io
   git add .
   git commit -m 'update the site'
   git push
   ```

## Use netlify

To be finished.
