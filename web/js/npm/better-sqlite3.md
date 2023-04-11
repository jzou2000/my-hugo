---
title: better-sqlite3
weight: 100
---


[better-sqlite3](https://www.npmjs.com/package/better-sqlite3) - the fastest and simplest library for SQLite3 in Node.js. (23M)

Compare to [sqlite3]() - asynchronous, non-blocking SQLite3 bindings (15M)

Both modules need C binaries.

```js
/*
Demo: better-sqlite3 - faster sqlite3 client, using sync API

    * connect(dsn, {options})
    * prepare(sql)
    * all(params)
    * run(params)

*/

const log = console.log
const bs3 = require('better-sqlite3')

const argv = process.argv.slice(2)
var dbname = argv.length > 1 ? argv[0] : 'mylite.db'
const db = bs3(dbname, {})

var r = db.prepare('INSERT INTO boys VALUES (?,?)').run('hans', 12)
log('---- result: ', r)

// iterate result-set
var rows = db.prepare('SELECT * FROM boys WHERE age<?').all(20)
rows.forEach(r => {
  log(r)
})

r = db.prepare('delete from boys where name=?').run('hans')
log('---- result: ', r)

```

Another example

```js

const bs3 = require('better-sqlite3')
const log = console.log

var parse_pattern = [
  {
    name: 'int',
  	pattern: /^\d+$/,
	action: (v) => {
		return parseInt(v)
	},
  },
  {
    name: 'float',
  	pattern: /^[+-]?\d+(\.\d*)?([eE][+-]?\d+)?$/,
	action: (v) => {
		return parseFloat(v)
	},
  },
  {
    name: 'bool',
  	pattern: /^(true|false)$/,
	action: (v) => {
		return v == 'true'
	},
  },
  {
    name: 'undefined',
  	pattern: /^undefined$/,
	action: (v) => {
		return undefined
	},
  },
  {
    name: 'null',
  	pattern: /^null$/,
	action: (v) => {
		return null
	},
  },
]
function parse(v)
{
	for (var n in parse_pattern) {
		var p = parse_pattern[n]
		if (v.match(p.pattern)) {
			return p.action(v)
		}
	}
	return v
}


var db = new bs3('sample.db')
db.exec('begin')
var st1 = db.prepare('create table if not exists test_null (name char, id int, age float, dob date)')
st1.run()
var data = `
alan, 1, 12.2, 1990-01-22
bob, 2, 2.5, 
charles, undefined, , 1999-12-22
dick, 15, null,
eddie, 5, null, null
`

var st2 = db.prepare('insert into test_null values (?,?,?,?)')
data.split('\n').forEach((r) => {
	if (r.trim() == '') {
		return
	}
	var cs = r.split(/,/).map((v) => {
		return parse(v.trim())
	})

	cs.forEach((v) => { log('    ' + typeof v + `   [${v}]`) })
	st2.run(cs)
})

db.exec('commit')
db.close()


```
