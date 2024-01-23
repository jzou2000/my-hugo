---
title: Page Basic Info
nav: page info
---

|variable|description|
|----|----|
|.Title|title item in front-matters|
|.File|file pathname relative to home (.../.index.md for sections)|
|.IsHome|true only for home page (this is quite obviously)|
|.IsNode|true for node (none-leaf-node in the content tree), including home page|
|.IsPage|true only for leaf-node, false for all nodes and home|
|.Kind|string value: home,section,page,taxonomy,taxonomyTerm|
|.Type|Toplevel section name (sections directly under home), 'page' for home|

