---
title: sax
weight: 100
tags: [npm]
catagories: [javascript]
---

[sax](https://www.npmjs.com/package/sax) - an evented streaming XML parser in JavaScript.

Alternative: node-expat (4.8M) is libexpat node.js bind.

## The Basic

```js
#! /usr/bin/env node
// test app for
//  sax-js          js stream of xml-sax
//
const fs = require('fs')
const readline = require('readline')

const sax = require('sax')
const parser = sax.createStream(true, {position: true, lowercase: true})
const log = console.log

var ctx = {
    inText: false,
    text: '',
    append (t) {
        this.inText = true
        this.text += t
    },
    flush () {
        if (this.inText) {
            log(`    text=[${this.text}]`)
            this.text = ''
            this.inText = false
        }
    }
}

parser.on('opentag', (node) => {
    ctx.flush()
    var attr = node.attributes
    var sattr = Object.keys(attr).length > 0 ? ` ${JSON.stringify(attr)}` : ''
    log(`name=${node.name}${sattr}`)
    rs.skip = true
    rs.close()
})
.on('closetag', (name) => {
    ctx.flush()
    log(`----${name}`)
})
.on('text', (text) => {
    // no process at all (e.g. trim etc)
    ctx.append(text)
})
.on('comment', (s) => {
    ctx.flush()
    log(`    comment=[${s}]`)
})
.on('processinginstruction', (obj) => {
    // sax-js doesn't parse processing-instruction
    //      e.g. <?xml version="1.0" encoding="utf-8"?>
    // the object has (in above example)
    //      name    "xml"
    //      body    {version: "1.0", encoding: "utf-8"}
    ctx.flush()
    log(`    pi=` + JSON.stringify(obj, null, 2))
})
.on('error', (err) => {
    if (!rs.skip) {
        log(`parser error: ${err} at line=${parser._parser.line} col=${parser._parser.column}`)
        //log(`parser: ${JSON.stringify(parser, null, 2)}`)
        rs.skip = 1
        rs.close()
    }
})
.on('end', () => {
    log(`    ====end===`)
})

var rs = fs.createReadStream(process.argv.slice(2)[0], 'utf-8')
// var rl = readline.createInterface({
//     input: rs,
//     crlfDelay: Infinity
// })
rs.pipe(parser)

/*
rl.on('end', () => {
    log(`EOF`)
})
.on('close', () => {
    log(`close`)
})
.on('line', (data) => {
    if (rl.skip) return
    //log(typeof data)
    //log(`${JSON.stringify(data)}`)
    //log(`====line [${data}]`)
    parser.write(data)   
})
*/
log(`app end`)

```

## Example - detect root tag

This is another example that detects the root tag without reading the whole XML file.

```js

// find root tag using sax without parsing the whole xml file

const log = console.log

const get_xml_root = function (fname) {
    const sax = require('sax')
    const fs = require('fs')
    var saxp = sax.parser(true)
    var xfs = fs.createReadStream(fname, {encoding: 'utf-8', highWaterMark: 1024})
        .on('data', (data) => {
            //log(`    on data=${data}`)
            saxp.write(data)
        })
    return new Promise((resolve, reject) => {
        saxp.onopentag = (tag) => {
            xfs.close()
            resolve(tag.name)
        }
        saxp.onerror = (err) => {
            reject(err)
        }
    })
}

get_xml_root(process.argv[2])
    .then((tag_name) => {
        log(`root: ${tag_name}`)
    })
    .catch((e) => {
        log(`catch: ${e}`)
    })


```

## Example - prettifier

Here is a full example that does some useful work - prettify xml files.

```js

/*

Prettify xml files using SAX parser

  * tags are indent
  * comment/cdata are reserved
  * consecutive blank lines in text are compressed to upto 2 
  * apply to either files or folders (recursively)
  * support utf16 input encoding, output with utf8 only
  * skip xml files with root of { ResultSet }
  * directory scan skips files of .* and node_modules/

Usage
  sax-prettifier.js [file-path-list]

  default is .

Known issues
  * PI and namespace are not processed

*/
const log = console.log
const fs = require('fs')
const sax = require('sax')
const path = require('path')
const iconv = require('iconv-lite')

class Prettifier {
    constructor(fname) {
        this.tags = []
        this.fname = fname
        this.tmpname = fname.replace('.xml', '.tmp')
        this.last_op = undefined
        this.newline = false
        this.skip = false
        this.src = undefined
        this.sink = undefined
        this.parser = sax.createStream(true, {position: true})
        this.parser.on('opentag', (tag) => {
            if (this.skip) return
            let top = this.top()
            if (top) {
                this.flush_text(top)
                top.has_child = true
                if (!this.newline) this.dump('\n')
            } else {
                // hacker: ignore files with root tag of following
                let root_tag = tag.name.toLowerCase()
                if (root_tag == 'resultset') {
                    this.parser.emit('error', '')
                    this.skip = true
                    return
                }
            }
            let sa = ''
            for (let a in tag.attributes) {
                sa += ` ${a}="${tag.attributes[a]}"`
            }
            this.dump(`${this.ind()}<${tag.name}${sa}`)
            this.tags.push({tag: tag.name,
                opened: true,
                has_child: false,
                text: undefined})
            this.last_op = 'opentag'
            this.newline = false
        })
        .on('closetag', (name) => {
            if (this.skip) return
            let tag = this.tags.pop()
            if (this.last_op == 'opentag' || tag.opened) {
                this.dump(`/>\n`)
            } else {
                this.flush_text(tag)
                if (tag.has_child || this.newline) {
                    this.dump(`${this.ind()}</${tag.tag}>\n`)
                } else {
                    this.dump(`</${tag.tag}>\n`)
                }
            }
            this.last_op = 'closetag'
            this.newline = true
        })
        .on('text', (text) => {
            if (this.skip) return
            let top = this.top()
            if (!top) return
            if (top.text === undefined) {
                top.text = text
            } else {
                top.text += text
            }
            this.last_op = 'text'
        })
        .on('comment', (comment) => {
            if (this.skip) return
            let top = this.top()
            if (top) {
                this.flush_text(top)
            }
            this.dump(`${this.ind()}<!--${comment}-->\n`)
            this.last_op = 'comment'
            this.newline = true
        })
        .on('opencdata', () => {
            if (this.skip) return
            let top = this.top()
            if (top) this.flush_text(top)
            this.dump(`<![CDATA[`)
            this.last_op = 'opencdata'
        })
        .on('cdata', (data) => {
            if (this.skip) return
            this.dump(data)
            this.last_op = 'cdata'
        })
        .on('closecdata', () => {
            if (this.skip) return
            this.dump(`]]>`)
            this.last_op = 'closecata'
        })
    }

    async perform() {
        this.src = await this.open_xml(this.fname)
        return new Promise((res, rej) => {
            this.src.pipe(this.parser)
            this.parser.on('end', () => {
                if (!this.skip) {
                    fs.renameSync(this.tmpname, this.fname)
                }
                res(this)
            })
            .on('error', (err) => {
                rej(err)
            })
        })
    }

    // generate indent blank string (according to the tag depth)
    ind(ts) {
        if (!ts || ts < 2) ts = 4
        let depth = this.tags.length
        return ' '.repeat(depth * ts)
    }

    dump(txt) {
        //process.stdout.write(txt)
        if (this.sink === undefined) {
            this.sink = fs.createWriteStream(this.tmpname)
            this.sink.write(`<?xml version="1.0" encoding="utf-8"?>\n`)
        }
        this.sink.write(txt)
    }

    // flush text of a tag (default is top)
    // unless the text is blanks
    flush_text(tag) {
        if (tag === undefined && !(tag = this.top()))
            return
        if (tag.text === undefined)
            ;
        else if (tag.text) {
            if (tag.text.trim() != '') {
                let s = tag.text.replace(/\r+\n/, '\n')
                if (this.newline) {
                    // previous op generate newline already
                    // remove the 1st new line if they are all white
                    s = s.replace(/^\s*?\n/, '')
                }
                this.dump(`${s.trimEnd()}`)
                if (s.search(/\n\s*$/) >= 0) {
                    this.newline = true
                    this.dump('\n')
                }
            }
            // if at least two blank lines, append one extra blank line
            if (tag.text.search(/\n\s*\n\s*$/) >= 0) {
                this.newline = true
                this.dump('\n')
            }
            tag.text = ''
        }
    }

    // return the top tag
    // if the tag is an opened tag (i.e. <tag ), close it
    top() {
        if (this.tags.length == 0) return undefined
        let top = this.tags[this.tags.length - 1]
        if (top.opened) {
            top.opened = false
            this.dump('>')
        }
        return top
    }

    // open xml file as read stream, try to detect encoding if it is not utf8
    open_xml(fname) {
        // encoding is not specified, peek the first chunk, detect the encoding, then pipe through
        return new Promise((resolve, reject) => {
            var rs = fs.createReadStream(fname)
            rs.on('readable', () => {
                // peek the first chunk
                let data = rs.read(2)
                rs.removeAllListeners('readable')
                  .unshift(data)        // put back peeked data
                if (data === null) {
                    return reject('Fail to peek')
                }
                let enc = 'utf8'
                // check BOM or char encoding
                if ((data[0] == 0xff && data[1] == 0xfe) || (data[0] != 0 && data[1] == 0)) {
                    enc = 'utf16-le'
                } else if ((data[0] == 0xfe && data[1] == 0xff) || (data[0] == 0 && data[1] != 0)) {
                    enc = 'utf16-be'
                }
                if (enc == 'utf8') {
                    return resolve(rs)
                } else {
                    let iconv_rs = rs.pipe(iconv.decodeStream(enc))
                    // save the origial stream, close it on close
                    iconv_rs.__src = rs
                    iconv_rs.close = function() {this.__src.close()}
                    return resolve(iconv_rs)
                }
            })
            .on('error', (e) => { return reject(e) })
        })  // end of promise
    }

}

const prettify_file = async function(fname) {
    let x = new Prettifier(fname)
    try {
        await x.perform()
        log(`${fname}`)
    }
    catch (err) {
        if (err !== '') {
            log(`Error: ${fname}: ${err.toString()}`)
        }
        // else {
        //     log(`=====skipped: ${fname}`)
        // }
    }
}

const walk_folder = async function(pathname) {
    for (let d of fs.readdirSync(pathname, {withFileTypes: true})) {
        if (/^\./.test(d.name) || d.name == 'node_modules')
            continue
        if (d.isFile()) {
            if (/\.xml$/.test(d.name)) {
                await prettify_file(path.join(pathname, d.name))
            }
        } else if (d.isDirectory()) {
            await walk_folder(path.join(pathname, d.name))
        }
    }
}

const main = async function(args) {

    for (let f of args) {
        try {
            let st = fs.statSync(f)
            if (st.isFile()) {
                await prettify_file(f)
            }
            else if (st.isDirectory()) {
                await walk_folder(f)
            }
        }
        catch (e) {
            log(e)
        }
    }
}

var args = process.argv.slice(2)
if (args.length == 0) args = ['.']
main(args)

```
