---
title: iconv-lite
weight: 100
tags: [npm]
catagories: [javascript]
---

This script opens a file stream and detect the encoding.

```js
const log = console.log
const fs = require('fs')
const iconv = require('iconv-lite')

const args = process.argv.slice(2)
const fname = args[0] || 'sample.txt'
var encoding = args[1]

log(`fname=${fname} encoding=${encoding}`)

// show upto 16 items of data or 33 characters if data is string
function show_data(data, title) {
    log(`${title}: length=${data.length}`)
    if (typeof data === 'string') {
        log(`    ${data.slice(0, 33)}`)
    } else {
        log(`    ${data.slice(0, 16).join(' ')}`)
    }
}

// use fs stream directly: node.js has limited encodings
try {
    fs.createReadStream(fname, {encoding: encoding})
    .on('data', function(data){
        show_data(data, 'fs')
        this.close()
    })
    .on('fs.createReadStream: error', (e) => {
        log(e)
    })
}
catch (e)
{
    log(`\nfs.createReadStream: ${e}\n`)
}

// create a stream (returned from a resolved promise)
// that uses iconv-lite as a helper if needed
async function createStream(fname, encoding) {
    if (encoding) {
        try {
            // if node.js knows it, use it directly
            return fs.createReadStream(fname, {encoding: encoding})
        } catch (e) {
            // otherwise pipe the fs stream to iconv and let iconv decode
            // fs will check encoding before perform real create
            var rs = fs.createReadStream(fname)
            var es = rs.pipe(iconv.decodeStream(encoding))
            es.__src = rs
            es.close = function() {this.__src.close()}  // simulate rs.close
            return es                                   // resolve iconv stream
        }
    }

    // encoding is not specified, peek the first chunk, detect the encoding, then pipe through
    return new Promise((resolve, reject) => {
        var rs = fs.createReadStream(fname)
        rs.on('data', (data) => {
            let enc = 'utf8'
            if ((data[0] == 0xff && data[1] == 0xfe) || (data[0] != 0 && data[1] == 0)) {
                enc = 'utf16-le'
            } else if ((data[0] == 0xfe && data[1] == 0xff) || (data[0] == 0 && data[1] != 0)) {
                enc = 'utf16-be'
            }
            let ret = rs.removeAllListeners('data')         // remove listener
                        .pipe(iconv.decodeStream(enc))
            ret.__src = rs
            ret.close = function() {this.__src.close()}
            rs.unshift(data)                                // put back peeked data
            resolve(ret)                                    // resolve iconv stream
        })
        .on('error', (e) => { reject({src: rs, err: e}) })
    })
}

createStream(fname, encoding)
.then((s) => {
    s.on('data', (data) => {
        show_data(data, 'fs+iconv')
        s.close()
    })
    .on('error', (e) => {
        log(`fs+iconv error: ${e}`)
    })
})

```

There are 3 files with the same content but encoded in utf8(sample.txt), utf16-le(sample-16le.txt) and utf16-be(sample-16be.txt)

```txt
"Two wrongs don't make a right."
When someone has done something bad to you, trying to get revenge will only make things worse.
"The pen is mightier than the sword."
Trying to convince people with ideas and words is more effective than trying to force people to do what you want.
"When in Rome, do as the Romans."
Act the way that the people around you are acting. This phrase might come in handy when you're traveling abroad notice that people do things differently than you're used to.
"The squeaky wheel gets the grease."
You can get better service if you complain about something. If you wait patiently, no one's going to help you.
```

```bash
# utf8 file: raw stream without encoding, iconv stream auto-detects
$ node ex-encoding.js sample.txt
fname=sample.txt encoding=undefined
fs: length=636
    34 84 119 111 32 119 114 111 110 103 115 32 100 111 110 39
fs+iconv: length=636
    "Two wrongs don't make a right."



# utf16-le file: raw stream without encoding, iconv stream auto-detects
$ node ex-encoding.js sample-16le.txt
fname=sample-16le.txt encoding=undefined
fs: length=1274
    255 254 34 0 84 0 119 0 111 0 32 0 119 0 114 0
fs+iconv: length=636
    "Two wrongs don't make a right."



# utf16-be file: raw stream without encoding, iconv stream auto-detects
$ node ex-encoding.js sample-16be.txt
fname=sample-16be.txt encoding=undefined
fs: length=1274
    254 255 0 34 0 84 0 119 0 111 0 32 0 119 0 114
fs+iconv: length=636
    "Two wrongs don't make a right."



# utf8 file: raw stream with utf8, iconv stream is not created
$ node ex-encoding.js sample.txt utf8
fname=sample.txt encoding=utf8
fs: length=636
    "Two wrongs don't make a right."
fs+iconv: length=636
    "Two wrongs don't make a right."



# utf16le file: fs stream doesn't recognize utf16-le, iconv stream usees the encoding directly
$ node ex-encoding.js sample-16le.txt utf16-le
fname=sample-16le.txt encoding=utf16-le

fs.createReadStream: TypeError [ERR_INVALID_OPT_VALUE_ENCODING]: The value "utf16-le" is invalid for option "encoding"

fs+iconv: length=636
    "Two wrongs don't make a right."



# utf16le file: fs stream knows ucs2 and utf16le, iconv stream is not used
$ node ex-encoding.js sample-16le.txt ucs2
fname=sample-16le.txt encoding=ucs2
fs: length=637
    "Two wrongs don't make a right."
fs+iconv: length=636
    "Two wrongs don't make a right."



# utf16be file: fs stream doesn't knows utf16-le, iconv stream uses (wrong) encoding directly
$ node ex-encoding.js sample-16be.txt utf16-le
fname=sample-16be.txt encoding=utf16-le

fs.createReadStream: TypeError [ERR_INVALID_OPT_VALUE_ENCODING]: The value "utf16-le" is invalid for option "encoding"

fs+iconv: length=637
    ￾∀吀眀漀 眀爀漀渀最猀 搀漀渀✀琀 洀愀欀攀 愀 爀椀最栀琀⸀

```
