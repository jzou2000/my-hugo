---
title: Access DOM Element In External Resource
date: 2019-05-08
tags: [contentDocument, DOM, access]
nav: external DOM elements
---

## Use Case

How do we access DOM elements in external resource, such as ```<object>``` or ```<iframe>```?

```html


<iframe id="my-frame"
 src="other-page.html">
</iframe>

<object id="my-obj"
 type="image/svg+xml"
 data="my-url.svg">
</object>

<div>normal DOM elements</div>

```

For example, following is the external my-url.svg

```xml
<svg xmlns="http://www.w3.org/2000/svg">
  <rect id="r1" x="10" y="10" width="300" height="200" fill="yellow"/>
</svg>
```

The anwser is the property **contentDocument** of the object/iframe element.
```js
var svg_doc = document.getElementById('my-obj').contentDocument
var rect = svg_doc.getElementById('r1')
```