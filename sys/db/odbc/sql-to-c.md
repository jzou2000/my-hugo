---
title: "Data Convertion: SQL to C"
nav: sql-to-c
---

|SQL Types     |char |wchar|tiny |short|long |bigint|float|double|numeric|binary|date |time |stamp|guid |
|:-------------|:---:|:---:|:---:|:---:|:---:|:----:|:---:|:----:|:-----:|:----:|:---:|:---:|:---:|:---:|
|CHAR          |**X**|o    |o    |o    |o    |o     |o    |o     |o      |o     |o    |o    |o    |o    |
|VARCHAR       |**X**|o    |o    |o    |o    |o     |o    |o     |o      |o     |o    |o    |o    |o    |
|LONGVARCHAR   |**X**|o    |o    |o    |o    |o     |o    |o     |o      |o     |o    |o    |o    |o    |
|WCHAR         |o    |**X**|o    |o    |o    |o     |o    |o     |o      |o     |o    |o    |o    |o    |
|WVARCHAR      |o    |**X**|o    |o    |o    |o     |o    |o     |o      |o     |o    |o    |o    |o    |
|WLONGVARCHAR  |o    |**X**|o    |o    |o    |o     |o    |o     |o      |o     |o    |o    |o    |o    |
|TINY          |o    |o    |**X**|o    |o    |o     |o    |o     |o      |o     |     |     |     |     |
|SMALL         |o    |o    |o    |**X**|o    |o     |o    |o     |o      |o     |     |     |     |     |
|INTEGER       |o    |o    |o    |o    |o    |o     |o    |o     |o      |o     |     |     |     |     |
|BIGINT        |o    |o    |o    |o    |o    |**X** |o    |o     |o      |o     |     |     |     |     |
|REAL          |o    |o    |o    |o    |o    |o     |**X**|o     |o      |o     |     |     |     |     |
|FLOAT         |o    |o    |o    |o    |o    |o     |o    |**X** |o      |o     |     |     |     |     |
|DOUBLE        |o    |o    |o    |o    |o    |o     |o    |**X** |o      |o     |     |     |     |     |
|DECIMAL       |**X**|o    |o    |o    |o    |o     |o    |o     |o      |o     |     |     |     |     |
|NUMERIC       |**X**|o    |o    |o    |o    |o     |o    |o     |o      |o     |     |     |     |     |
|BINARY        |o    |o    |     |     |     |      |     |      |       |**X** |     |     |     |     |
|VARBINARY     |o    |o    |     |     |     |      |     |      |       |**X** |     |     |     |     |
|LONGVARBINARY |o    |o    |     |     |     |      |     |      |       |**X** |     |     |     |     |
|TYPE_DATE     |o    |o    |     |     |     |      |     |      |       |o     |**X**|     |o    |     |
|TYPE_TIME     |o    |o    |     |     |     |      |     |      |       |o     |     |**X**|o    |     |
|TYPE_TIMESTAMP|o    |o    |     |     |     |      |     |      |       |o     |o    |o    |**X**|     |
|GUID          |o    |o    |     |     |     |      |     |      |       |o     |     |     |     |**X**|

* o support
* **X** default (SQL_C_DEFAULT)

