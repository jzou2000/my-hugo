---
title: String Template and Interpolation
nav: tempalte/interpolation
weight: 60
---


## Javascript

```js

var a_str = `a string may contains ${var} or ${a.expression()}
and embedded newline`

```

## Python

```python

a_str = 'a string may contains {var} and {another_var}'.format({'var': 123, 'another_var': expression()})

multi_line_str = '''embedded
newline

in a long text'''
```

