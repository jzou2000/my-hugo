---
title: Vue App Quick Start
date: 2019-05-28
nav: quick start
tags: [vue, quick-start]
weight: 1
---


# First Vue Project

created by vue-cli init, with webpack

```bash
$ vue init webpack my-p0

  A newer version of vue-cli is available.

  latest:    2.9.6
  installed: 2.8.2

? Project name my-p0
? Project description My first vue project created by vue-init
? Author Jason Zou <jzou2000@gmail.com>
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Set up unit tests Yes
? Pick a test runner jest
? Setup e2e tests with Nightwatch? Yes
? Should we run `npm install` for you after the project has been created? (recommended) npm

   vue-cli · Generated "my-p0".


# Installing project dependencies ...
# ========================

npm WARN deprecated browserslist@2.11.3: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
   ... download/install/packages
added 1602 packages from 1072 contributors and audited 30789 packages in 163.054s
found 7 vulnerabilities (1 low, 1 moderate, 4 high, 1 critical)
  run `npm audit fix` to fix them, or `npm audit` for details


Running eslint --fix to comply with chosen preset rules...
# ========================


> my-p0@1.0.0 lint D:\codex\js\vue-webpack\my-p0
> eslint --ext .js,.vue src test/unit test/e2e/specs "--fix"


# Project initialization finished!
# ========================

To get started:

  cd my-p0
  npm run dev

Documentation can be found at https://vuejs-templates.github.io/webpack

cd my-p0
$ du -hs *
41K     build
11K     config
1.0K    index.html
226M    node_modules
4.0K    package.json
528K    package-lock.json
1.0K    README.md
15K     src
0       static
20K     test

```

## build

```bash
$ npm run build

> my-p0@1.0.0 build d:\codex\js\vue-webpack\my-p0
> node build/build.js

Hash: 50224d0e351138c7a829
Version: webpack 3.12.0
Time: 5286ms
                                                  Asset       Size  Chunks             Chunk Names
               static/js/vendor.2420502e2b2c7f321d64.js     112 kB       0  [emitted]  vendor
                  static/js/app.b22ce679862c47a75225.js    11.6 kB       1  [emitted]  app
             static/js/manifest.2ae2e69a05c33dfc65f8.js  857 bytes       2  [emitted]  manifest
    static/css/app.30790115300ab27614ce176899523b62.css  432 bytes       1  [emitted]  app
static/css/app.30790115300ab27614ce176899523b62.css.map  828 bytes          [emitted]
           static/js/vendor.2420502e2b2c7f321d64.js.map     553 kB       0  [emitted]  vendor
              static/js/app.b22ce679862c47a75225.js.map    22.2 kB       1  [emitted]  app
         static/js/manifest.2ae2e69a05c33dfc65f8.js.map    4.97 kB       2  [emitted]  manifest
                                             index.html  507 bytes          [emitted]

  Build complete.

  Tip: built files are meant to be served over an HTTP server.
  Opening index.html over file:// won't work.

```

```bash
$ find dist
dist
dist/index.html
dist/static
dist/static/css
dist/static/css/app.30790115300ab27614ce176899523b62.css
dist/static/css/app.30790115300ab27614ce176899523b62.css.map
dist/static/js
dist/static/js/app.b22ce679862c47a75225.js
dist/static/js/app.b22ce679862c47a75225.js.map
dist/static/js/manifest.2ae2e69a05c33dfc65f8.js
dist/static/js/manifest.2ae2e69a05c33dfc65f8.js.map
dist/static/js/vendor.2420502e2b2c7f321d64.js
dist/static/js/vendor.2420502e2b2c7f321d64.js.map

$ ls -lhR dist
dist:
total 1.0K
-rw-r--r-- 1 jasonz 1049089 507 Sep 19 14:58 index.html
drwxr-xr-x 1 jasonz 1049089   0 Sep 19 14:58 static

dist/static:
total 4.0K
drwxr-xr-x 1 jasonz 1049089 0 Sep 19 14:58 css
drwxr-xr-x 1 jasonz 1049089 0 Sep 19 14:58 js

dist/static/css:
total 5.0K
-rw-r--r-- 1 jasonz 1049089 432 Sep 19 14:58 app.30790115300ab27614ce176899523b62.css
-rw-r--r-- 1 jasonz 1049089 828 Sep 19 14:58 app.30790115300ab27614ce176899523b62.css.map

dist/static/js:
total 704K
-rw-r--r-- 1 jasonz 1049089  12K Sep 19 14:58 app.b22ce679862c47a75225.js
-rw-r--r-- 1 jasonz 1049089  22K Sep 19 14:58 app.b22ce679862c47a75225.js.map
-rw-r--r-- 1 jasonz 1049089  857 Sep 19 14:58 manifest.2ae2e69a05c33dfc65f8.js
-rw-r--r-- 1 jasonz 1049089 4.9K Sep 19 14:58 manifest.2ae2e69a05c33dfc65f8.js.map
-rw-r--r-- 1 jasonz 1049089 110K Sep 19 14:58 vendor.2420502e2b2c7f321d64.js
-rw-r--r-- 1 jasonz 1049089 541K Sep 19 14:58 vendor.2420502e2b2c7f321d64.js.map
```


## barebone

### Install

```bash
$ vue init webpack barebone

  A newer version of vue-cli is available.

  latest:    2.9.6
  installed: 2.8.2

? Project name barebone
? Project description A barebone vue project by vue init
? Author Jason Zou <jzou2000@gmail.com>
? Vue build standalone
? Install vue-router? No
? Use ESLint to lint your code? No
? Set up unit tests No
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (recommended) npm

   vue-cli · Generated "barebone".


# Installing project dependencies ...
# ========================
 ....

added 1130 packages from 656 contributors and audited 10613 packages in 138.704s
found 1 moderate severity vulnerability
  run `npm audit fix` to fix them, or `npm audit` for details

# Project initialization finished!
# ========================

To get started:

  cd barebone
  npm run dev

Documentation can be found at https://vuejs-templates.github.io/webpack


```

### Result

```bash
$ du -sh *
41K     build
6.0K    config
1.0K    index.html
145M    node_modules
4.0K    package.json
372K    package-lock.json
1.0K    README.md
14K     src
0       static
```

### edit
```js
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    This is the component of HellowWorld.
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello { width: 400px; height: 300px; background: pink; }
</style>

```

### build

```bash
$ npm run build

> barebone@1.0.0 build D:\codex\js\vue-webpack\barebone
> node build/build.js

Hash: c387a5ee8957b5c2788f
Version: webpack 3.12.0
Time: 4224ms
                                                  Asset       Size  Chunks             Chunk Names
                  static/js/app.337089436fbff85c07ce.js    10.2 kB       0  [emitted]  app
               static/js/vendor.b8580e1294724b76ff58.js    87.9 kB       1  [emitted]  vendor
             static/js/manifest.2ae2e69a05c33dfc65f8.js  857 bytes       2  [emitted]  manifest
    static/css/app.82f94a531449e02980457b0230f7a9e3.css  302 bytes       0  [emitted]  app
static/css/app.82f94a531449e02980457b0230f7a9e3.css.map  582 bytes          [emitted]
              static/js/app.337089436fbff85c07ce.js.map    17.3 kB       0  [emitted]  app
           static/js/vendor.b8580e1294724b76ff58.js.map     447 kB       1  [emitted]  vendor
         static/js/manifest.2ae2e69a05c33dfc65f8.js.map    4.97 kB       2  [emitted]  manifest
                                             index.html  510 bytes          [emitted]

  Build complete.

  Tip: built files are meant to be served over an HTTP server.
  Opening index.html over file:// won't work.
```


# Element-UI

```bash

npm i babel-preset-es2015 -D
npm install
npm add element
npm install babel-plugin-component -D
vim  .babelrc 

```



# vuecli - element & axios/ajax

```bash
cd /d/codex/vue
vue create ui-el
# default babel, eslint
cd ui-el
du -sh .
114M .

npm run serve
# launch develop server (localhost:8081, default vue.js app)

```

## First change
* Remove fancy stuff from HelloWorld and App.
* Submit git

## Install Element-UI

```bash
npm i element-ui -S
npm WARN babel-loader@8.0.4 requires a peer of @babel/core@^7.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"}
)

+ element-ui@2.4.8
added 6 packages from 6 contributors and audited 13891 packages in 39.149s
found 0 vulnerabilities

/bin/du -sh .
121M .
```

### Bring Element In Project
Modify main.js

```js
// main.js
// after import Vue
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// before creating Vue instance
Vue.use(ElementUI);
```

### proof-run
Modify App.vue to add an element-ui icon and button
```vue
//App.vue
    // after <HelloWorld/>
    <div id="element-proof">
      <i class="el-icon-edit" />
      <el-button type="primary" icon="el-icon-search">Search</el-button>
    </div>
```

## Add Axios

```bash
npm i axios
/bin/du -sh .
121M .
```


# Nuxt.js - first project

## install

```bash
cd /d/codex/vue
npx create-nuxt-app mynuxt
npx: installed 401 in 24.917s
> Generating Nuxt.js project in d:\codex\vue\mynuxt
? Project name mynuxt
? Project description My smashing Nuxt.js project
? Use a custom server framework none
? Use a custom UI framework none
? Choose rendering mode Universal
? Use axios module yes
? Use eslint no
? Use prettier yes
? Author name jzou
? Choose a package manager npm
Initialized empty Git repository in d:/codex/vue/mynuxt/.git/

...

/bin/du -sh .
102M   .


npm run dev

> mynuxt@1.0.0 dev d:\codex\vue\mynuxt
> nuxt



 INFO  Building project

√ success Builder initialized
√ success Nuxt files generated


 READY  Listening on http://localhost:3000

```
## Show Nuxt multi-page Capability

1. create a page about
1. create a navigator bar in default layout, add links by <nuxt-link>


## install and bring element-ui

This is a mistake, because the script of creating nuxt app has an option of choosing ui framework.
However, it gives us a chance to add a module.

### install
```bash
npm install element-ui
```
### bring in project
1. plugins are codes that execute before Vue is created
1. add plugins/element-ui.js, which contains initial codes shown in vue-cli/element-ui sample

### make a sample
In component DemoCase, add an el-button as usual.


## Build project

```bash
npm run build
 INFO  Building project

√ success Builder initialized
√ success Nuxt files generated

Hash: b441553fb45830db8f26
Version: webpack 4.20.2
Time: 23154ms
Built at: 10/15/2018 11:20:02 AM
                  Asset       Size  Chunks                    Chunk Names
     fonts/2fad952.woff   6.02 KiB          [emitted]
      fonts/6f0a763.ttf   10.8 KiB          [emitted]
ca937dbef156e2d93e3f.js   30.4 KiB       0  [emitted]         app
904f8d34a8d90b6fa85b.js  690 bytes       1  [emitted]         pages_about
fb93395b434f29f402c3.js   4.78 KiB       2  [emitted]         pages_index
23f6b916506f754d080d.js    158 KiB       3  [emitted]         commons.app
9b750588f871c5a8ffa4.js    774 KiB       4  [emitted]  [big]  vendors.app
2cfc05fc3f8de73c1368.js    2.2 KiB       5  [emitted]         runtime
               LICENSES   1.01 KiB          [emitted]
 + 3 hidden assets
Entrypoint app = 2cfc05fc3f8de73c1368.js 23f6b916506f754d080d.js 9b750588f871c5a8ffa4.js ca937dbef156e2d93e3f.js

WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets:
  9b750588f871c5a8ffa4.js (774 KiB)

Hash: 3b9de81cd0d9e573c9c3
Version: webpack 4.20.2
Time: 2763ms
Built at: 10/15/2018 11:20:05 AM
             Asset     Size  Chunks             Chunk Names
server-bundle.json  568 KiB          [emitted]
Entrypoint app = server-bundle.js server-bundle.js.map

```

# eslint
* v-for requires :key to identify an item uniquely



# electron-vue

```bash
$ vue init simulategreg/electron-vue my-electron
? Target directory exists. Continue? Yes
? Application Name my-electron
? Application Id com.simba.my-electron
? Application Version 0.0.1
? Project description A test project for vue-electron
? Use Sass / Scss? Yes
? Select which Vue plugins to install (Press <space> to select, <a> to toggle all, <i> to invert selection)axios, vue-electron, vue-router, vuex, vuex-electron
? Use linting with ESLint? Yes
? Which ESLint config would you like to use? Standard
? Set up unit testing with Karma + Mocha? No
? Set up end-to-end testing with Spectron + Mocha? No
? What build tool would you like to use? builder

   vue-cli · Generated "my-electron".
warning Failed to append commit SHA on README.md


cd my-electron

npm install
npm WARN deprecated babel-preset-babili@0.1.4: babili has been renamed to babel-minify. Please update to babel-preset-minify

> node-sass@4.10.0 install d:\codex\vue\my-electron\node_modules\node-sass
> node scripts/install.js

Downloading binary from https://github.com/sass/node-sass/releases/download/v4.10.0/win32-x64-64_binding.node
Download complete..] - :
Binary saved to d:\codex\vue\my-electron\node_modules\node-sass\vendor\win32-x64-64\binding.node
Caching binary to C:\Users\jasonz\AppData\Roaming\npm-cache\node-sass\4.10.0\win32-x64-64_binding.node

> electron@2.0.14 postinstall d:\codex\vue\my-electron\node_modules\electron
> node install.js

Downloading SHASUMS256.txt
[============================================>] 100.0% of 5.39 kB (5.39 kB/s)

> node-sass@4.10.0 postinstall d:\codex\vue\my-electron\node_modules\node-sass
> node scripts/build.js

Binary found at d:\codex\vue\my-electron\node_modules\node-sass\vendor\win32-x64-64\binding.node
Testing binary
Binary is fine

> my-electron@0.0.1 postinstall d:\codex\vue\my-electron
> npm run lint:fix


> my-electron@0.0.1 lint:fix d:\codex\vue\my-electron
> eslint --ext .js,.vue -f ./node_modules/eslint-friendly-formatter --fix src

npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN my-electron@0.0.1 No repository field.
npm WARN my-electron@0.0.1 No license field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"}
)

added 1442 packages from 1027 contributors and audited 14765 packages in 176.172s
found 0 vulnerabilities


jasonz@JasonZ /d/codex/vue/my-electron
$ /bin/du -sh .
376M    .

jasonz@JasonZ /d/codex/vue/my-electron
$


```
