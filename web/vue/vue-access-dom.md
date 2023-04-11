---
title: Accessing DOM from a Vue App
date: 2019-05-08
tags: [vue, DOM, js, javascript]
nav: accessing DOM
weight: 10
---

Although it is more preferable to use virtual-DOM for exchanging data between UI components and model in a Vue-based application, accessing DOM elements directly is still required in some special cases:

* using 3rd-party libraries (e.g. green-sock for animation)

You can still use standard DOM access method
```js
var el = document.getElementById('el-name')
```

Vue offers a convenient way to do this work

```html
   <!-- any tags as well -->
   <div ref='myref' other-attributes >
   
   </div>
```

```vue
new Vue({
    //...
    methods: {
        //...
        method_a: function () {
            //...
            // all elements with ref attributes
            // are stored in $refs dictionary
            var e = this.$refs.myref
        }
    }
})
```
