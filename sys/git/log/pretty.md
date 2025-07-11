---
title: Pretty Format
nav: pretty format
---



* oneline
  ```
  <hash> <title line>
  ```
* short
  ```
  commit <hash>
  Author: <author>

  <title line>
  ```
* medium
  ```
  commit <hash>
  Author: <author>
  Date: <author date>

  <title line>

  <full commit text>
  ```
* Format String
  * ``%n`` new line
  * ``%h`` abbreviated commit hash, ``%H`` commit hash
  * ``%an`` author name, ``%ad`` author date, ``%as`` author date short (YYYY-MM-DD)
  * ``%cn`` committer name, ...
  * ``%d`` ref name
  * ``%s`` subject
  * ``%b`` body
