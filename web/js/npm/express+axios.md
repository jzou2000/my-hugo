---
title: express + axios
weight: 100
tags: [npm]
catagories: [javascript]
---

Mini web framework + promise based http client, 3.7M

```js
// A very simple httpd based on express
// that servers static htmls at d:/www

var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const fs = require('fs')
const yaml = require('js-yaml')
const sqlite = require('better-sqlite3')

const tslite = require('./tslite')
const ux = require('./utilx')


const nedb = require('nedb')

app.use(express.static('exel'))
//app.use('/public', express.static('public'))

var log = console.log

app.use((req,res,next) => {
  log(req.method + ' ' + req.path)
  next()
})

tslite.setDb('api.db')

const db = sqlite('../tcase/tcase.db')
var psuite = new nedb({ filename: 'psuite.db', autoload: true })

function crob(res) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type, X-PINGOTHER, Content-Type'
  })
}

app.get('/get-agents-json', (req, res) => {
    fs.readFile('agents.json', (err, data) => {
        if (err) return {}
        var d = JSON.parse(data.toString())
        res.json(d)
    })
})

app.get('/get-agents', (req, res) => {
    fs.readFile('agents.yaml', (err, data) => {
        if (err) return {}
        var d = yaml.safeLoad(data.toString(), 'utf8')
        res.json(d)
    })
})

app.get('/get-tcase-basic', (req, res) => {
  var rows = db.prepare('select * from tcase limit 100').all()
  res.json(rows)
})

app.get('/get-tcase', (req, res) => {
  var sql = `select * from tcase limit 100`
  var rows = db.prepare(sql).all()
  rows.forEach((r) => {
    r.params = {}
    sql = `select distinct
          p.name as name, p.dtype, p.nested
          from tcase c, tparam p
          where (c.tclass=p.tclass or c.name=p.tclass)
          and c.name='${r.name}'`
    var params = db.prepare(sql).all()
    params.forEach((p) => {
      r.params[p.name] = {
        desc: p.desc,
        type: p.dtype,
        nested: p.nested,
        required: p.required,
        value: p.value
      }
    })
  })
  res.json(rows)
})

app.get('/get-tcase/:name', (req, res) => {
  var cname = req.params.name.toUpperCase()
  var sql = `select * from tcase where name='${cname}'`
  log(sql)
  var rows = db.prepare(sql).all()
  rows.forEach((r) => {
    r.params = {}
    sql = `select distinct
          p.name as name, p.dtype, p.nested
          from tcase c, tparam p
          where (c.tclass=p.tclass or c.name=p.tclass)
          and c.name='${cname}'`
    var params = db.prepare(sql).all()
    params.forEach((p) => {
      r.params[p.name] = {
        desc: p.desc,
        type: p.dtype,
        nested: p.nested,
        required: p.required,
        value: p.value
      }
    })
  })
  res.json(rows)
})

app.get('/get-tparam/:name', (req, res) => {
  var cname = req.params.name.toUpperCase()
  var sql = `select distinct
  c.name, c.desc, p.name as param, p.dtype, p.nested
from tcase c, tparam p
where (c.tclass=p.tclass or c.name=p.tclass)
 and c.name='${cname}'`
  log(sql)
  var rows = db.prepare(sql).all()
  res.json(rows)
})

app.get('/show-param/:name/:age', (req, res) => {
    var s = []
    for (var p in req.params) {
        s.push(`${p}=${req.params[p]}`)
    }
    res.send(`<p>path=${req.path}<p>` + '<p>param: ' + s.join(' '))
})


// get list of suite
app.get('/get-suite', (req, res) => {
  log('/get-suite: get list of suites')
  var slist = tslite.getSuiteList()
  res.send(slist)
})

app.get('/get-suite/:id', (req, res) => {
  log(req.path)
  var suite = tslite.getSuite({id: req.params.id})
  res.send(suite)
})

app.get('/get-set/:id', (req, res) => {
  log(req.path)
  var set = tslite.getSet(req.params.id)
  //log(ux.stringify(set))
  res.send(set)
})

app.get('/get-tcase-param/:name', (req, res) => {
  log(req.path)
  psuite.findOne({type: 'set', name: req.params.name}, (err, docs) => {
    if (err) throw err
    res.send(docs)
  })
})


app.post('/get-tparam-list', (req, res) => {
  try {
    var sql = `
    select rowid,*
    from tparam
    `
    
    var opt = req.body
    var criteria = []
    if ('name' in opt) {
      criteria.push(`name like '${opt.name}'`)
    }
    if ('tclass' in opt) {
      criteria.push(`tclass like '${opt.tclass}'`)
    }
    if (criteria.length > 0) {
      sql += 'where ' + criteria.join(' and ')
    }
    log(sql)
    var rows = db.prepare(sql).all()
  } catch (e) {
    var rows = []
  }
  // log(rows)

  res.json(rows)
})

app.get('/get-tparam-list/:name', (req, res) => {
  try {
    var sql = `
    select rowid,*
    from tparam
    where name like '${req.params.name}'
    `
    
    log(sql)
    var rows = db.prepare(sql).all()
  } catch (e) {
    var rows = []
  }

  res.json(rows)
})




var server = app.listen(8899, function() {
    var host = server.address().address
    var port = server.address().port

    console.log('Webservices is listening at http://%s:%s', host, port)
})

psuite.find({type: 'suite'}, (err, docs) => {
  if (err) throw err
  log('psuite')
  docs.forEach((d) => {
    log(d._id, d.name)
  })
})

psuite.find({type: 'set'}, (err, docs) => {
  if (err) throw err
  log('pset')
  docs.forEach((d) => {
    log(d._id, d.name)
  })
})

```
