---
title: js-yaml
weight: 100
tags: [npm]
catagories: [javascript]
---

[js-yaml](https://www.npmjs.com/package/js-yaml) - YAML 1.2 parser and serializer (1.1M).

```js
/*
Demonstrate js-yaml (yaml implemented by js) usage

    usage:
        node yaml-load.js [yaml_file_name]

*/

const jsyaml = require('js-yaml')
const log = console.log

const argv = process.argv.slice(2)
log(`argv=${argv}`)
if (argv < 1) { // no file specified, use embedded sample
    var fdat = `
name: sample
list: [1, 2, 3]
string: |
 hello
   world
`    
} else {
    var fs = require('fs')
    var fdat = fs.readFileSync(argv[0], 'utf8')
}

try {
    var doc = jsyaml.safeLoad(fdat)
    log('loaded')
    log(JSON.stringify(doc, null, 2))
} catch (e) {
    log(e)
}
