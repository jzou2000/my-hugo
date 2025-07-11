---
title: Ultra-light Vue App
nav: ultra-light vue
description: build an ultra-light Vue application without installing anything
vue: true
---

<!-- Vue app container, build view in the container -->
<div id="app">
  <strong>{{ message }}</strong>
</div>

<!-- vue app code: set model, actions here -->
<script>
  const { createApp } = Vue
  var app = createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  })
  app.mount('#app')
</script>

```html {linenos=table,hl_lines=[4,"13-15","18-28"]}
<!doctype html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <style>
    /* ... */
    </style>
</head>

<body>

<!-- Vue app container, build view in the container -->
<div id="app">
  <strong>{{ message }}</strong>
</div>

<!-- vue app code: set model, actions here -->
<script>
  const { createApp, ref } = Vue
  var app = createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  })
  app.mount('#app')
</script>

</body>
</html>

```
