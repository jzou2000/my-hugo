---
title: Minimal Setup A Vue App Project
date: 2019-05-23
nav: minimal project setup
categories: [vue, js]
tags: [minimal, setup, vue]
weight: 2
---

## Pre-request

Have vue-cli installed
```bash
npm install @vue/cli -g
```

## Create Project
```bash
vue create prj-name
```
The default preset (babel, eslint) installes 178MB.
with route/vuex 183MB

Start run/development

```bash
npm run serve
```

### common modules
```bash
vue add router
vue add vuex
```

## Configure
You don't need to config and the boilplate just works.
However if you do need extra configuration, create vue.config.js at project root folder.

```js
module.exports = {
    // configures go here
    devServer: {
        proxy: 'http://localhost:8088',
        // alternatively, if you have multiple APIs
        // or fine-tune url pattern
        // proxy: {
        //    'api-url': {
        //          target: 'http://localhost:8088',
        //          ws: true, // also websockets
        //          changeOrigin: true,
        //      },
        //    'other-api-url: {...}
        // }

        // allow connect from any hosts (from CROS violation)
        // by default webpack server allows
        // connecting from localhost only (for developing)
        host: '0.0.0.0',
    }
}
```

### dev-proxy
You need the proxy if the front-end app and the beckend API server are not running on the same host.

```js
module.exports = {
    // configures go here
    devServer: {
        proxy: 'http://localhost:8088'
    }
}
```




following configurations are usually required.
## Add plugins

### UI Element

```bash
npm i element-ui -S
```

Import Element in main.js
```js
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

```

### UI uikit

## Add a page (view)

* Create a view component (.vue) in views/
* import it in router.js, and add it to routes array
* (optional) add a ``<router-link>`` in ``App.vue`` navigator. 