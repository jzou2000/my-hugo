---
title: Common Tasks on Docker Maintenance
nav: common tasks
date: 2019-12-11
weight: 3
---

## Update Image

Update an image (with tag if applicable) from a registry and remove unused images.
The image below is ``klakegg/hugo:alpine``, which is used to build this site.

```bash
docker image pull klakegg/hugo:alpine
docker image prune
```
