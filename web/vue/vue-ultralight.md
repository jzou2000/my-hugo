---
title: Ultra-light Vue App
nav: ultra-light vue
description: build an ultra-light Vue application without installing anything
---

```html {linenos=table,hl_lines=[4,"13-15","18-25"]}
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
  {{ message }}
</div>

<!-- vue app code: set model, actions here -->
<script>
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
</script>

</body>
</html>

```
