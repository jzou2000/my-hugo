---
title: Some Tips of Express.js
date: 2019-05-24
nav: express.js
tags: [express, express.js, tips]
---

## Parsing POST data
Start from Express 4.16
{{<highlight js>}}
app.use(express.json())
app.use(express.urlencode({extended: true}))
// app.use(express.multipart()) // security concerns?

// URL encoding
//    POST: name=foo&color=red
// or JSON encoding
//    POST: {"name": "foo", "color": "red"}
app.post('/url', (req, res) => {
    // your POST data is req.body
    var name = req.body.name
})
{{</highlight>}}

Express 4.0 to 4.15
{{<highlight bash>}}
npm install --save body-parser
{{</highlight>}}
and
{{<highlight js>}}
var body_parser = require('body-parser')
app.use(body_parser.json())
app.use(body_parser.urlencode({extended: true}))
{{</highlight >}}