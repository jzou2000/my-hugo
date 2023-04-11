---
title: Hugo Tips
categories: [ssg, web]
tags: [tips, hugo]
---

## Page Basic Info

|variable|description|
|----|----|
|.Title|title item in front-matters|
|.File|file pathname relative to home (.../.index.md for sections)|
|.IsHome|true only for home page (this is quite obviously)|
|.IsNode|true for node (none-leaf-node in the content tree), including home page|
|.IsPage|true only for leaf-node, false for all nodes and home|
|.Kind|string value: home,section,page,taxonomy,taxonomyTerm|
|.Type|Toplevel section name (sections directly under home), 'page' for home|

## Syntax Highlight

Enhenced by hugo
````markdown {hl_lines=[1]}
```go {linenos=table,hl_lines=[8,"15-17"],linenostart=199]}
// ... code
```
````
Note:

* linenos (read as line-number-style) is required for linenostart.
* hl_lines always starts from 1, ignoring linenostart value. (bug of hugo?)
* highlighting in code fences is new in v0.60.0

## Raw HTML tags

Since Hugo 0.60.0, [Goldmark](https://github.com/yuin/goldmark/) is used as the default markdown parser, which disables raw HTML tags by default. To enable raw HTML tags, like this page, set hugo config like below:

```yaml
markup:
  goldmark:
    renderer:
      unsafe: true
```

* Some people propose to re-vote the default behavior to *true*, because people who embed raw HTML tags in markdown know what they are doing.
