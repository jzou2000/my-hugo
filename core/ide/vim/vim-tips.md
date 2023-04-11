---
title: VIm Tips
date: 2019-10-28
categories:
    - vim
tags:
    - vim
    - tips
---

## Convert format between 
|recipe              |action         |description                |
|--------------------|---------------|---------------------------|
|dos <--> unix       |set ff=unix    |set file-format (unix/dos) and save   |
|convert tab/space   |set et         |(no)et: expand tabs<br/> then run ``retab`` to apply convertion|

## System clipboard

The system clipboard is named **``+``** in vim.
|action                                   |commandline-mode             |edit-mode key sequence  |
|:----------------------------------------|:----------------------------|:-----------------------|
|yank 3 lines from cursor into clipboard  |3ya+                         |"+3yy                   |
|paste after cursor from clipboard        |                             |"+p                     |
