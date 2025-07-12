---
title: ODBC Return Code and Common Constants
nav: sqlstate & constants
tags: odbc, constants
---

## Return Code

|Name                    |Value|Description|
|:-----------------------|----:|----|
|SQL_SUCCESS             |0    ||
|SQL_SUCCESS_WITH_INFO   |1    ||
|SQL_STILL_EXECUTING     |2    ||
|SQL_ERROR               |-1   ||
|SQL_INVALID_HANDLE      |-2   ||
|SQL_NEED_DATA           |99   ||
|SQL_NO_DATA             |100  |ver>3.0|
|SQL_NO_DATA_FOUND       |100  |alias of SQL_NO_DATA, in sqlext.h|
Note:

* in sql.h
* define SQL_SUCCEEDED(rc)           (((rc) & (~1)) == 0)
* ODBC [SQLSTATE](https://www.easysoft.com/developer/interfaces/odbc/sqlstate_status_return_codes.html)

## Special Length
|Name                    |Value|Description|
|:-----------------------|----:|:----|
|SQL_NULL_DATA           |-1   |value is null|
|SQL_DATA_AT_EXEC        |-2   |value will be given at execute time|
|SQL_NTS                 |-3   |the string is null-terminated|
|SQL_NO_TOTAL            |-4   |in SQLGetData, total data length is not available, in sqlext.h|

