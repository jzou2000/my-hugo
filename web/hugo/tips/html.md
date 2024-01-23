---
title: Raw HTML
nav: raw html
---


Since Hugo 0.60.0, [Goldmark](https://github.com/yuin/goldmark/) is used as the default markdown parser, which disables raw HTML tags by default. To enable raw HTML tags, like this page, set hugo config like below:

```yaml
markup:
  goldmark:
    renderer:
      unsafe: true
```

* Some people propose to re-vote the default behavior to *true*, because people who embed raw HTML tags in markdown know what they are doing.


