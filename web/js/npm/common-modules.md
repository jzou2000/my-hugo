---
title: Common NPM Modules
date: 2019-10-11
nav: common modules index
tags: [npm, module, js]
weight: 20
---

## Modules and Size

Method
1. create folder, edit ``package.json`` for the specified module
2. run ``npm update``
3. run ``du -sh .``

|Name|Size|Description|
|----|-----|------|
|express+axios|3.7M|mini web framework + promise based http client|
|[better-sqlite3](https://www.npmjs.com/package/better-sqlite3)|23M|The fastest and simplest library for SQLite3 in Node.js.|
|[fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser)|372k|Validate XML or Parse XML to JS/JSON very fast without C/C++ based libraries|
|[js-yaml](https://www.npmjs.com/package/js-yaml)|1.1M|YAML 1.2 parser and serializer|
|[markdown-it](https://www.npmjs.com/package/markdown-it)|1.5M|Markdown-it - modern pluggable markdown parser.|
|[nedb](https://www.npmjs.com/package/nedb)|4.6M|File-based embedded data store for node.js|
|socket.io|3.9M|Node.js realtime framework server (and client)|
|sqlite3|15M|Asynchronous, non-blocking SQLite3 bindings|
|standard|45M|JavaScript Standard Style|
|xml2js|2.0M|Simple XML to JavaScript object converter.|
|node-expat|4.8M|libexpat node.js bind|
|sax|100K|An evented streaming XML parser in JavaScript|
|superagent|2.3M|Small progressive client-side HTTP request library, and Node.js module with the same API, sporting many high-level HTTP client features. alternate of axios|
|[highlight.js](https://www.npmjs.com/package/highlight.js)|2.4M|Syntax highlighting with language autodetection.|
|iconv-lite|516K|Convert character encodings in pure javascript.|
|[js-levenshtein](#js-levenshtein)|20K|Calculate levenshtein distance, based on Wagner-Fischer dynamic programming algorithm, optimized for speed and memory.|
|[simple-git](https://www.npmjs.com/package/simple-git)|524K|Simple wrapper of git|
|[jsdiff](https://www.npmjs.com/package/diff)|369K|pure javascript diff tools|
|[diff2html](https://www.npmjs.com/package/diff2html)|1.65M|generates pretty HTML diffs from git diff or unified diff output.|

Other packages

|Name|Size|Description|
|----|-----|------|
|[node-gyp]()|1.77M (unpack)|use to build native modules, e.g. sqlite3|



## Command-line Arg Parser and other CLI libs

Major candidates

|Name|Size|Description|
|----|-----|------|
|command-line-parser|64K|Simple command-line parser|
|[Commander.js](https://github.com/tj/commander.js)|112K|The complete solution for node.js command-line interfaces, inspired by Ruby's commander. 0 dependencies.|
|[yargs](https://github.com/yargs/yargs)|1.1M|Args parser and more cli tools, very popular package.|
|[argparse](https://github.com/nodeca/argparse)|328K|A port of python argparse|
|[minimist](https://github.com/substack/minimist)|116K|The name says everything, 0 dependencies.|
|[command-line-args](https://github.com/75lb/command-line-args)|324K|A mature, feature-complete library to parse command-line options.|
|[Caporal](https://github.com/mattallty/Caporal.js)|18M|a framework for CLI|

Ref:
* [Node argument parsers in 2018](https://pantas.net/node_argument_parsers/)
* [npm trends](https://www.npmtrends.com/argparse-vs-commander-vs-minimist-vs-yargs)


## Sample Usages





