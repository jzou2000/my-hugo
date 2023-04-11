---
title: Package a node.js application into a single binary
date: 2019-02-27
nav: Packing into a single binary
tags: [package, node.js, binary]
---

# install
{{<highlight bash>}}
npm install pkg -g
pkg --help
{{</highlight >}}

# usage

{{<highlight bash>}}

cd project
pkg -o output-file -t ${nodev}-linux,${nodev}-win entry.js
{{</highlight >}}

# using assets

