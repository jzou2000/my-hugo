---
title: Syntax Highlight
nav: syntax highlight
---


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

