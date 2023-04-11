---
title: Shallow Or Deep
nav: shallow or deep
date: 2019-12-11
weight: 10
---

## Shadow

```python {linenos=table,hl_lines=[9,13]}
>>> m = [2, 5, 1]
>>> d1 = {'m': m}
>>> d2 = {'name': 'Bond'}
>>> d2.update(d1)
>>> d2
{'m': [2, 5, 1], 'name': 'Bond'}
>>> d1
{'m': [2, 5, 1]}
>>> d1['m'][1] = 100
>>> d1
{'m': [2, 100, 1]}
>>> d2
{'m': [2, 100, 1], 'name': 'Bond'}

```

## Deep

```python {linenos=table,hl_lines=[9,13]}
>>> import copy
>>> m = [2, 5, 1]
>>> d1 = {'m': m}
>>> d2 = copy.deepcopy(d1)
>>> d2
{'m': [2, 5, 1]}
>>> d1
{'m': [2, 5, 1]}
>>> d1['m'][1] = 200
>>> d1
{'m': [2, 200, 1]}
>>> d2
{'m': [2, 5, 1]}

```
