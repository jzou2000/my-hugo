---
title: ODBC API Notes
nav: odbc api notes
date: 2020-05-09
tags: [odbc, api, notes]
---

## Return Length

Unit of length parameters (both input and output) of ODBC API
* if the field is determined to be a string, the unit is character
  * SQLBrowseConnect, SQLConnect, SQLDriverConnect
  * SQLColumns, SQLProcedureColumns, SQLProcedures, SQLSpecialColumns, SQLTables
  * SQLColumnPrivileges, SQLForeignKeys, SQLPrimaryKeys, SQLStatistics, SQLTablePrivileges
  * SQLDataSources
  * SQLDescribeCol
  * SQLExecDirect, SQLPrepare, SQLNativeSql
  * SQLGetCursorName, SQLSetCursorName
  * SQLGetDescRec
  * SQLGetDiagRec
  * SQLGetTypeInfo (return a resultset)
* otherwise (even the buffer actually holds a string) the unit is byte
  * SQLColAttribute
  * SQLDrivers (description length is in char, attribute length is in byte)
  * SQLGetConnectAttr, SQLSetConnectAttr
  * SQLGetDescField, SQLSetDescField
  * SQLGetDiagField
  * **SQLGetInfo**: exception: iodbc returns text length in **char**
  * SQLGetStmtAttr, SQLSetStmtAttr (special: SQL_NTS, SQL_LEN_BINARY_ATTR, SQL_IS_POINTER, SQL_IS_INTEGER, SQL_IS_UINTEGER )
* the returned length of text excludes the terminal null character,
  however the buffer should be able to hold the terminal null,
  otherwise truncation happens.
* Other APIs return character
  * SQLDescribeParam, ParameterSizePtr is in char. (there's no W-version though)
* SQLGetData/SQLPutData always use length in bytes
