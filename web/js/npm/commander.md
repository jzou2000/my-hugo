---
title: commander.js
weight: 100
tags: [npm]
catagories: [javascript]
---

[Commander.js](https://github.com/tj/commander.js) is the complete solution for node.js command-line interfaces, inspired by Ruby's commander. 0 dependencies. (112K)

```js
// demonstrate the usage of commander, which parse command-line arguments
//
const log = console.log
const str = function(o, tight) { return tight ? JSON.stringify(o) : JSON.stringify(o, null, 2) }


const opt = new (require('commander')).Command()

opt.description('Demonstate the usage of commander')    // optional
 .version('0.1.2')                                      // optional, -V or --version
 .option('-o, --onion', 'add onion')                    // default onion=undefined
 .option('-p, --pine-apple', 'add pine-apple')          // default pineApple=undefined
 .option('--no-sauce', 'Remove sauce')                  // default sauce=true
 .option('-s, --size <int>', 'size in number',
     (val, prev)=>parseInt(val), 3000)                  // <required> default 3000
 .option('-n, --name [string]', 'name value', 'Paul')   // [optinal]  default Paul
 .option('-l, --label <string>', 'label')
 .option('-f, --flavors <list>', 'comma separated list of flavors',
     (value, prev)=> value.split(','))
 .option('-a, --show-object', 'show opt object')
opt.parse(process.argv)
//log(`opt.version=${opt.version()}`)
log(`opt.pineApple=${opt.pineApple}`)
log(`opt.onion=${opt.onion}`)
log(`opt.sauce=${opt.sauce}`)
log(`opt.size=${opt.size}  ${typeof opt.size}`)
log(`opt.name=${opt.name}`)
log(`opt.label=${opt.label}`)
log(`opt.flavors=${opt.flavors} len=${opt.flavors ? opt.flavors.length : 0}`)
if (opt.args.length > 0)
    log(`opt.args=${str(opt.args)}`)
if (opt.showObject) {
    log(`\n-----------details---------`)
    for (var p in opt) {
        if (opt.hasOwnProperty(p) && p[0] != '_') {
            log(`${p}: ${str(opt[p])}`)
        }
    }
}
```
Execute output
```bash
$ node ex-commander.js
opt.pineApple=undefined
opt.onion=undefined
opt.sauce=true
opt.size=3000  number
opt.name=Paul
opt.label=undefined
opt.flavors=undefined len=0


$ node ex-commander.js -h
Usage: ex-commander [options]

Demonstate the usage of commander

Options:
  -V, --version         output the version number
  -o, --onion           add onion
  -p, --pine-apple      add pine-apple
  --no-sauce            Remove sauce
  -s, --size <int>      size in number (default: 3000)
  -n, --name [string]   name value (default: "Paul")
  -l, --label <string>  label
  -f, --flavors <list>  comma separated list of flavors
  -a, --show-object     show opt object
  -h, --help            output usage information


$ node ex-commander.js --version
0.1.2

$ node ex-commander.js --pine-apple -o --no-sauce -s100 --name John -l 'Old Joe' -f 'Hawaii,Canadian,Pepperoni' hello world 
opt.pineApple=true
opt.onion=true
opt.sauce=false
opt.size=100  number
opt.name=John
opt.label=Old Joe
opt.flavors=Hawaii,Canadian,Pepperoni len=3
opt.args=[
  "hello",
  "world"
]

$ node ex-commander.js -u
error: unknown option '-u'



$ node ex-commander.js --pine-apple -o --no-sauce -s100 --name John -l 'Old Joe' -f 'Hawaii,Canadian,Pepperoni' hello world -a
opt.pineApple=true
opt.onion=true
opt.sauce=false
opt.size=100  number
opt.name=John
opt.label=Old Joe
opt.flavors=Hawaii,Canadian,Pepperoni len=3
opt.args=[
  "hello",
  "world"
]

-----------details---------
commands: []
options: [
  {
    "flags": "-V, --version",
    "required": false,
    "optional": false,
    "negate": false,
    "short": "-V",
    "long": "--version",
    "description": "output the version number"
  },
  {
    "flags": "-o, --onion",
    "required": false,
    "optional": false,
    "negate": false,
    "short": "-o",
    "long": "--onion",
    "description": "add onion"
  },
  {
    "flags": "-p, --pine-apple",
    "required": false,
    "optional": false,
    "negate": false,
    "short": "-p",
    "long": "--pine-apple",
    "description": "add pine-apple"
  },
  {
    "flags": "--no-sauce",
    "required": false,
    "optional": false,
    "negate": true,
    "long": "--no-sauce",
    "description": "Remove sauce",
    "defaultValue": true
  },
  {
    "flags": "-s, --size <int>",
    "required": true,
    "optional": false,
    "negate": false,
    "short": "-s",
    "long": "--size",
    "description": "size in number",
    "defaultValue": 3000
  },
  {
    "flags": "-n, --name [string]",
    "required": false,
    "optional": true,
    "negate": false,
    "short": "-n",
    "long": "--name",
    "description": "name value",
    "defaultValue": "Paul"
  },
  {
    "flags": "-l, --label <string>",
    "required": true,
    "optional": false,
    "negate": false,
    "short": "-l",
    "long": "--label",
    "description": "label"
  },
  {
    "flags": "-f, --flavors <list>",
    "required": true,
    "optional": false,
    "negate": false,
    "short": "-f",
    "long": "--flavors",
    "description": "comma separated list of flavors"
  },
  {
    "flags": "-a, --show-object",
    "required": false,
    "optional": false,
    "negate": false,
    "short": "-a",
    "long": "--show-object",
    "description": "show opt object"
  }
]
sauce: false
size: 100
name: "John"
rawArgs: [
  "/usr/bin/node",
  "/mnt/huge/jzou/codex/js/exnpm/ex-commander.js",
  "--pine-apple",
  "-o",
  "--no-sauce",
  "-s100",
  "--name",
  "John",
  "-l",
  "Old Joe",
  "-f",
  "Hawaii,Canadian,Pepperoni",
  "hello",
  "world",
  "-a"
]
pineApple: true
onion: true
label: "Old Joe"
flavors: [
  "Hawaii",
  "Canadian",
  "Pepperoni"
]
showObject: true
args: [
  "hello",
  "world"
]


```
