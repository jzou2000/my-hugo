---
title: Embeded Vue in Hugo Site
nav: vue in hugo
keywords: [vue, hugo]
vue: true
weight: 19
---


<div id='sample-app'
 style='background: lightgray; padding: 4px 16px; margin: 16px;'>
    <p>This is a sample Vue app.</p>
    {{ message }}
    <ul>
        <li v-for="i in fruit">
            {{ i }}
        </li>
    </ul>
</div>

<script>
    var app = new Vue({
        el: '#sample-app',
        data: {
            message: 'Hello Vue!',
            fruit: ['apple', 'banana', 'pear', 'orange']
        }
    })
</script>

```html {linenos=table,hl_lines=[1,14]}
<div id='sample-app'
 style='background: lightgray; padding: 4px 16px; margin: 16px;'>
    <p>This is a sample Vue app.</p>
    {{message}}
    <ul>
        <li v-for="i in fruit">
            {{ i }}
        </li>
    </ul>
</div>

<script>
    var app = new Vue({
        el: '#sample-app',
        data: {
            message: 'Hello Vue!',
            fruit: ['apple', 'banana', 'pear', 'orange']
        }
    })
</script>
```

Note:

* Since Hugo 0.60.0, [Goldmark](https://github.com/yuin/goldmark/) is used as the default markdown parser, which disables raw HTML tags by default. To enable raw HTML tags, like this page, set hugo config like below:
  ```yaml
  markup:
  goldmark:
    renderer:
      unsafe: true
  ```
