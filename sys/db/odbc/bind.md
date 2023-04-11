---
title: SQLBindCol and SQLBindParamter
nav: bind
---


|SQLBindCol              |SQLBindParameter        |Data Type    |Description|
|:-----------------------|:-----------------------|:------------|:----------------------------------------|
|StatementHandle         |StatementHandle         |SQLHSTMT     |statement handle                         |
|ColumnNumber            |ParameterNumber         |SQLUSMALLINT |1-based column/parameter number          |
|                        |InputOutputType         |SQLSMALLINT  |input/output/input-output                |
|TargetType              |ValueType               |SQLSMALLINT  |c-type-id                                |
|                        |ParameterType           |SQLSMALLINT  |sql-type-id                              |
|                        |ColumnSize              |SQLULEN      |                                         |
|                        |DecimalDigits           |SQLSMALLINT  |aka scale                                |
|TargetValuePtr          |ParameterValuePtr       |SQLPOINTER   |buffer to receive(col)/offer(param) value|
|BufferLength            |BufferLength            |SQLLEN       |size of buffer                           |
|StrLen_or_IndPtr        |StrLen_or_IndPtr        |SQLLEN *     |input/output actual data length          |


* StrLen_or_IndPtr
  * length of data
  * SQL_NTS
  * SQL_NULL_DATA
  * SQL_DATA_AT_EXEC
  * SQL_LEN_DATA_AT_EXEC macro
  * SQL_COLUMN_IGNORE

### Extra statement attributes

|Attribute                      |Type          |Description                                |
|:------------------------------|:-------------|:------------------------------------------|
|SQL_ATTR_ROW_BIND_TYPE         |SQLULEN       |SQL_BIND_BY_COLUMN(0, default) for column-wise or row-size for row-wise|
|SQL_ATTR_ROW_ARRAY_SIZE        |SQLULEN       |array size (of rows), default 1 |
|SQL_ATTR_ROWS_FETCHED_PTR      |SQLULEN*      |in last fetch (and like), number of rows that are actually fetched|
|SQL_ATTR_ROW_STATUS_PTR        |SQLUSMALLINT* |an array of SQLUSMALLINT for each row of fetched|
|                               |              |
|SQL_ATTR_PARAMSET_SIZE         |SQLULEN       |array size (of parameters), default 1|
|SQL_ATTR_PARAMS_PROCESSED_PTR  |SQLULEN*      |number of rows of processed parameter|

### Row status array (SQLBindCol)
|Value                     |Description          |
|:-------------------------|:-----------------|
|SQL_ROW_SUCCESS           |The row was successfully fetched and has not changed since it was last fetched from this result set.|
|SQL_ROW_SUCCESS_WITH_INFO |The row was successfully fetched and has not changed since it was last fetched from this result set. However, a warning was returned about the row.|
|SQL_ROW_ERROR             |An error occurred while fetching the row.|
|SQL_ROW_UPDATED           |The row was successfully fetched and has changed since it was last fetched from this result set. If the row is fetched again from this result set or is refreshed by SQLSetPos, the status is changed to the row's new status.|
|SQL_ROW_DELETED           |The row has been deleted since it was last fetched from this result set.|
|SQL_ROW_ADDED             |The row was inserted by SQLBulkOperations. If the row is fetched again from this result set or is refreshed by SQLSetPos, its status is SQL_ROW_SUCCESS.|
|SQL_ROW_NOROW             |The rowset overlapped the end of the result set, and no row was returned that corresponded to this element of the row status array.|

### Data-at-Execution (SQLBindParameter)

If StrLen_or_IndPtr is SQL_DATA_AT_EXEC or SQL_LEN_DATA_AT_EXEC(length) macro, ``SQLExecDirect()`` or ``SQLExecute()`` returns **SQL_NEED_DATA**
to request the application to offer data with ``SQLPutData``

```c++
#define SQL_LEN_DATA_AT_EXEC_OFFSET  (-100)
#define SQL_LEN_DATA_AT_EXEC(length) (-(length)+SQL_LEN_DATA_AT_EXEC_OFFSET)
```

The order of parameter of DAE is not guarenteed, the parameter number is returned by ``SQLParamData()`` of ``ParameterValuePtr``.
To make the process easier, it is a common practice to pass a __parameter-token__ (such as parameter sequence number) instead of a real pointer (because the pointer is not used) in ``SQLBindParameter()``. Row number is determined by ``SQL_ATTR_PARAMS_PROCESSED_PTR``.
