---
title: markdonw-it + highlight.js
weight: 100
tags: [npm]
catagories: [javascript]
---

[markdown-it](https://www.npmjs.com/package/markdown-it) - modern pluggable markdown parser (1.5M).

[highlight.js](https://www.npmjs.com/package/highlight.js) - syntax highlighting with language autodetection. (2.4M) (not highlightjs, which is obsolete already)

```js
/*
Demo: usage of markdown-it and highlight.js

*/
const log = console.log
const hljs = require('highlight')
const md = require('markdown-it')({
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }
    return ''
  }
})
var src = '````c++' + `
#include <iostream>

using namespace std;

int main(int argc, char** argv)
{
  cout << "Hello, world" << endl;
  return 0;
}
`+'````'
var s = md.render(src)
log(s)


```
