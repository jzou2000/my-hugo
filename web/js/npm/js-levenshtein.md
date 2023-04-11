---
title: js-levenshtein
weight: 100
tags: [npm]
catagories: [javascript]
---

Calculate levenshtein distance between two strings.

```js
/*
Demo: usage of js-levenshtein

*/
const log = console.log
const levenshtein = require('js-levenshtein')

log(levenshtein('kitten', 'sitting'))

log(levenshtein('./APITests/TestSets/TestCases/SQLAllocHandlE.xml', './APITests/TestSets/3.xTestCases/SQLAllocHandle.xml'))

/* output
3
4
*/
```
