---
title: nedb
weight: 100
tags: [npm]
catagories: [javascript]
---

[nedb](https://www.npmjs.com/package/nedb) - file-based embedded data store for node.js (4.6M)


```js
/*
Demo: nedb - a pure js, mongo-like document database
*/
const log = console.log;

const NeDb = require('nedb');
var db = new NeDb({ filename: 'myne.db', autoload: true });

function insert_one() {
    var suite = {
        name: 'api',
        desc: 'api tests',
        sets: []
    };

    db.insert(suite, (err, doc) => {
        log('inserted', doc.name, 'with ID', doc._id);
    });
}

function insert_more() {
  var suites = [
      {
          name: 'conv',
          desc: 'convert tests',
      },
      {
        name: 'sql',
        desc: 'sql tests',
    },
  ];

  log('insert more');
  db.insert(suites, (err, docs) => {
    docs.forEach((d) => {
      log(d);
    });
  });
}

function get(criteria) {
  log('get docs');
  db.find(criteria, (err, docs) => {
    docs.forEach((d) => {
      log(d);
    });
  })
}

//insert_more();
// get({ name: 'sql'});
get();
```
