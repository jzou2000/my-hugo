---
title: Alpine Package Study
---

|pkg|size after install|cmd|description|
|----|----|----|-----|
|base|0   |    |base alpine, 3.11, 5.6m|
|g++ |171m|apk add g++|g++ 9.2.0 (18m/59m)|
|make|171m|apk add make|gmake 4.2.1 (1.8m)|
|python|208m|apk add python|python 2.7.16|
|python3|224m|apk add python3|python 3.8.2|
|node|259m|apk add nodejs|node.js 12.15.0|
|npm|286|apk add npm|npm 12.15.0|
|yarn|291|apk add yarn|yarn 1.19.2|
|curl|288|apk add curl|curl 2.67.0|


```
apt add g++
fetch http://dl-cdn.alpinelinux.org/alpine/v3.11/main/x86_64/APKINDEX.tar.gz
fetch http://dl-cdn.alpinelinux.org/alpine/v3.11/community/x86_64/APKINDEX.tar.gz
(1/13) Installing libgcc (9.2.0-r4)
(2/13) Installing libstdc++ (9.2.0-r4)
(3/13) Installing binutils (2.33.1-r0)
(4/13) Installing gmp (6.1.2-r1)
(5/13) Installing isl (0.18-r0)
(6/13) Installing libgomp (9.2.0-r4)
(7/13) Installing libatomic (9.2.0-r4)
(8/13) Installing mpfr4 (4.0.2-r1)
(9/13) Installing mpc1 (1.1.0-r1)
(10/13) Installing gcc (9.2.0-r4)
(11/13) Installing musl-dev (1.1.24-r2)
(12/13) Installing libc-dev (0.7.2-r0)
(13/13) Installing g++ (9.2.0-r4)
Executing busybox-1.31.1-r9.trigger
OK: 171 MiB in 27 packages


apt add make
fetch http://dl-cdn.alpinelinux.org/alpine/v3.11/main/x86_64/APKINDEX.tar.gz
fetch http://dl-cdn.alpinelinux.org/alpine/v3.11/community/x86_64/APKINDEX.tar.gz
(1/1) Installing make (4.2.1-r2)
Executing busybox-1.31.1-r9.trigger
OK: 6 MiB in 15 packages

apk add python
(1/9) Installing libbz2 (1.0.8-r1)
(2/9) Installing expat (2.2.9-r1)
(3/9) Installing libffi (3.2.1-r6)
(4/9) Installing gdbm (1.13-r1)
(5/9) Installing ncurses-terminfo-base (6.1_p20200118-r2)
(6/9) Installing ncurses-libs (6.1_p20200118-r2)
(7/9) Installing readline (8.0.1-r0)
(8/9) Installing sqlite-libs (3.30.1-r1)
(9/9) Installing python2 (2.7.16-r3)
Executing busybox-1.31.1-r9.trigger
OK: 212 MiB in 37 packages

apk del python
(1/9) Purging python2 (2.7.16-r3)
(2/9) Purging libbz2 (1.0.8-r1)
(3/9) Purging expat (2.2.9-r1)
(4/9) Purging libffi (3.2.1-r6)
(5/9) Purging gdbm (1.13-r1)
(6/9) Purging readline (8.0.1-r0)
(7/9) Purging ncurses-libs (6.1_p20200118-r2)
(8/9) Purging ncurses-terminfo-base (6.1_p20200118-r2)
(9/9) Purging sqlite-libs (3.30.1-r1)
Executing busybox-1.31.1-r9.trigger
OK: 171 MiB in 28 packages

apk add python3
(1/10) Installing libbz2 (1.0.8-r1)
(2/10) Installing expat (2.2.9-r1)
(3/10) Installing libffi (3.2.1-r6)
(4/10) Installing gdbm (1.13-r1)
(5/10) Installing xz-libs (5.2.4-r0)
(6/10) Installing ncurses-terminfo-base (6.1_p20200118-r2)
(7/10) Installing ncurses-libs (6.1_p20200118-r2)
(8/10) Installing readline (8.0.1-r0)
(9/10) Installing sqlite-libs (3.30.1-r1)
(10/10) Installing python3 (3.8.2-r0)
Executing busybox-1.31.1-r9.trigger
OK: 230 MiB in 38 packages

apk add nodejs
(1/5) Installing ca-certificates (20191127-r1)
(2/5) Installing c-ares (1.15.0-r0)
(3/5) Installing nghttp2-libs (1.40.0-r0)
(4/5) Installing libuv (1.34.0-r0)
(5/5) Installing nodejs (12.15.0-r1)
Executing busybox-1.31.1-r9.trigger
Executing ca-certificates-20191127-r1.trigger
OK: 259 MiB in 43 packages


apk add npm
(1/1) Installing npm (12.15.0-r1)
Executing busybox-1.31.1-r9.trigger
OK: 286 MiB in 44 packages


apk add yarn
(1/1) Installing yarn (1.19.2-r0)
Executing busybox-1.31.1-r9.trigger
OK: 291 MiB in 45 packages

apk add python
(1/1) Installing python2 (2.7.16-r3)
Executing busybox-1.31.1-r9.trigger
OK: 329 MiB in 46 packages

apk del python3
(1/2) Purging python3 (3.8.2-r0)
(2/2) Purging xz-libs (5.2.4-r0)
Executing busybox-1.31.1-r9.trigger
OK: 273 MiB in 44 packages


apk add git
(1/3) Installing libcurl (7.67.0-r0)
(2/3) Installing pcre2 (10.34-r1)
(3/3) Installing git (2.24.1-r0)
Executing busybox-1.31.1-r9.trigger
OK: 288 MiB in 47 packages


apk add curl
(1/1) Installing curl (7.67.0-r0)
Executing busybox-1.31.1-r9.trigger
OK: 288 MiB in 48 packages



yarn add express
yarn add v1.19.2
warning package.json: No license field
warning No license field
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
warning No license field
warning "express" is already in "devDependencies". Please remove existing entry first before adding it to "dependencies".
warning Your current version of Yarn is out of date. The latest version is "1.22.4", while you're on "1.19.2".
info To upgrade, run the following command:
$ apk update && apk add -u yarn
success Saved 1 new dependency.
info Direct dependencies
└─ express@4.17.1
info All dependencies
└─ express@4.17.1
Done in 4.27s.


yarn add better-sqlite3
yarn add v1.19.2
warning package.json: No license field
warning No license field
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
warning No license field
success Saved 60 new dependencies.
info Direct dependencies
└─ better-sqlite3@6.0.1
info All dependencies
├─ ansi-regex@2.1.1
├─ aproba@1.2.0
├─ are-we-there-yet@1.1.5
├─ base64-js@1.3.1
├─ better-sqlite3@6.0.1
├─ bl@4.0.2
├─ buffer@5.5.0
├─ code-point-at@1.1.0
├─ console-control-strings@1.1.0
├─ core-util-is@1.0.2
├─ decompress-response@4.2.1
├─ deep-extend@0.6.0
├─ delegates@1.0.0
├─ detect-libc@1.0.3
├─ end-of-stream@1.4.4
├─ expand-template@2.0.3
├─ file-uri-to-path@1.0.0
├─ fs-constants@1.0.0
├─ fs-minipass@1.2.7
├─ gauge@2.7.4
├─ github-from-package@0.0.0
├─ has-unicode@2.0.1
├─ ieee754@1.1.13
├─ ini@1.3.5
├─ integer@3.0.1
├─ is-fullwidth-code-point@1.0.0
├─ isarray@1.0.0
├─ mimic-response@2.1.0
├─ minipass@2.9.0
├─ minizlib@1.3.3
├─ mkdirp-classic@0.5.2
├─ mkdirp@0.5.5
├─ napi-build-utils@1.0.2
├─ node-abi@2.15.0
├─ noop-logger@0.1.1
├─ npmlog@4.1.2
├─ number-is-nan@1.0.1
├─ object-assign@4.1.1
├─ once@1.4.0
├─ process-nextick-args@2.0.1
├─ rc@1.2.8
├─ readable-stream@3.6.0
├─ semver@5.7.1
├─ set-blocking@2.0.0
├─ signal-exit@3.0.3
├─ simple-concat@1.0.0
├─ simple-get@3.1.0
├─ string_decoder@1.3.0
├─ string-width@1.0.2
├─ strip-ansi@3.0.1
├─ strip-json-comments@2.0.1
├─ tar-fs@2.0.1
├─ tar-stream@2.1.2
├─ tar@4.4.10
├─ tunnel-agent@0.6.0
├─ util-deprecate@1.0.2
├─ which-pm-runs@1.0.0
├─ wide-align@1.1.3
├─ wrappy@1.0.2
└─ yallist@3.1.1
Done in 102.58s.


```
