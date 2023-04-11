---
title: fast-xml-parser
weight: 100
tags: [npm]
catagories: [javascript]
---

[fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser) validates XML or parse XML to JS/JSON very fast without C/C++ based libraries (372K)

Alternatives are:

* [xml2js]() - simple XML to JavaScript object converter (2.0M)
* sax - a pure javascript sax parser
* node-expat - libexpat (binary) node.js bind

```js
const fs = require('fs')
const fxp = require('fast-xml-parser')
const log = console.log

const argv = process.argv.slice(2)
const fname = argv[0]
const encoding = argv.length > 1 ? argv[1] : 'utf8'

fs.promises
.readFile(fname, encoding)
.then((data) => {
  var s = fxp.validate(data,  {
      ignoreAttributes: false,
      attrNodeName: "$",
      attributeNamePrefix: ''
      })
  if (s) {
    var doc = fxp.parse(data, {
      ignoreAttributes: false,
      attrNodeName: '$',      // compatibe with xml2js
      textNodeName: '_',
      attributeNamePrefix: ''
      })
    log(JSON.stringify(doc, null, 2))
  } else {
    log('Fail to validate', s)
  }
})

```

