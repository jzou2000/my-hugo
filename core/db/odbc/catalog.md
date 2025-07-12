---
title: Catalog Functions - ODBC vs JDBC
date: 2019-05-27
nav: catalog functions
tags:
 - catalog
 - odbc
 - jdbc
categories:
 - database
---


## Catalog Functions - odbc vs jdbc

|Catalog|ODBC|JDBC|Comment|
|---|---|---|---|
|Schemas||getSchemas||
|Tables|SQLTables|getTables|
|Columns|SQLColumns|getTables|
|PrimaryKeys|SQLPrimaryKeys|getTables|
|ForeignKeys|SQLForeignKeys|getTables|

### Catalogs
ResultSet getCatalogs()
* TABLE_CAT

### Schemas
ResultSet getSchemas()

* TABLE_SCHEM
* TABLE_CATALOG

### TableTypes
ResultSet getTableTypes()

* TABLE_TYPE

type values

* TABLE
* VIEW
* SYSTEM TABLE
* GLOBAL TEMPORARY
* LOCAL TEMPORARY
* ALIAS
* SYNONYM

### Tables
||SQLTables|getTables|
|---|---|---|
|Input|catalog|catlog|
||schema|schemaPattern|
||table|tablePattern|
||tableTypeCSV|types[]|
|Output|TABLE_CAT|*|
||TABLE_SCHEM|*|
||TABLE_NAME|*|
||TABLE_TYPE|*|
||REMARKS|*|
|||TYPE_CAT|
|||TYPE_SCHEMA|
|||TYPE_NAME|
|||SELF_REFERENCING_COL_NAME|
|||REF_GENERATION|

### Columns
||SQLColumns|getColumns|
|---|---|---|
|Input|catalog|catlog|
||schema|schemaPattern|
||table|tablePattern|
||column|columnPattern|
|Output|TABLE_CAT|*|
||TABLE_SCHEM|*|
||TABLE_NAME|*|
||COLUMN_NAME|*|
||DATA_TYPE|*|
||TYPE_NAME|*|
||COLUMN_SIZE|*|
||BUFFER_LENGTH|*|
||DECIMAL_DIGITS|*|
||NUM_PREC_RADIX|*|
||NULLABLE|*|
||REMARKS|*|
||COLUMN_DEF|*|
||SQL_DATA_TYPE|*|
||SQL_DATETIME_SUB|*|
||CHAR_OCTET_LENGTH|*|
||ORDINAL_POSITION|*|
||IS_NULLABLE|*|
|||SCOPE_CATALOG|
|||SCOPE_SCHEMA|
|||SCOPE_TABLE|
|||SOURCE_DATA_TYPE|
|||IS_AUTOINCREMENT|
|||IS_GENERATEDCOLUMN|



### PrimaryKeys

||SQLPrimaryKeys|getPrimaryKeys|
|---|---|---|
|Input|catalog|catlog|
||schema|schemaPattern|
||table|tablePattern|
|Output|TABLE_CAT|*|
||TABLE_SCHEM|*|
||TABLE_NAME|*|
||COLUMN_NAME|*|
||KEY_SEQ|*|
||PK_NAME|*|


### ForeignKeys

||SQLForeignKeys|getCrossReference|getImportedKeys|getExportedKeys|
|---|---|---|---|---|
|Input|pk_catalog|*|catlog|*|
||pk_schema|*|schema|*|
||pk_table|*|table|*|
||fk_catalogtable|*|||
||fk_schema|*|||
||fk_table|*|||
|Output|PKTABLE_CAT|*|*|
||PKTABLE_SCHEM|*|*|
||PKTABLE_NAME|*|*|
|||PKCOLUMN_NAME|*|
||FKTABLE_CAT|*|*|
||FKTABLE_SCHEM|*|*|
||FKTABLE_NAME|*|*|
||FKCOLUMN_NAME|*|*|
||KEY_SEQ|*|*|
||UPDATE_RULE|*|*|
||DELETE_RULE|*|*|
||FK_NAME|*|*|
||PK_NAME|*|*|
||DEFERRABILITY|*|*|

## ODBC Catalog Function Arguments

All ODBC catalog functions accept name filters on their resultset.
When the statement attribute ``ATTR_METADATA_ID`` equals to ``SQL_TRUE``, those name filters are IDs,
otherwise they can be in three catalogs

* OA (ordinary argument) - literal string values, apply to SQLXXXKeys, SQLSpecialColumns, SQLStatistics, and all (but SQLTables) catalog name
  * If a value is not supported or not used (e.g. catalog name or schema name), it should be empty string
  * If an ordinary argument is set to a null pointer
    * the argument is required (see notes), SQL_ERROR (HY009) is returned.
    * the argument is not a required, the argument's behavior is driver-dependent.
* PV (pattern value) - SQL patterns, apply to most name filters except catalog names
  * ``_`` stands for RE ``.``
  * ``%`` stands for RE ``.*``
* VL (value list) - list of value separated by comma, **ONLY** apply to SQLTables.TableType, ignoring ``ATTR_METADATA_ID``

Note
* see details at ODBC spec [Arguments in Catalog Functions](https://docs.microsoft.com/en-us/sql/odbc/reference/develop-app/arguments-in-catalog-functions?view=sql-server-ver15)
* required OA
  |Function	| Required arguments |
  |---------|--------------------|
  |SQLColumnPrivileges|	TableName|
  |SQLForeignKeys|	PKTableName, FKTableName|
  |SQLPrimaryKeys|	TableName|
  |SQLSpecialColumns	TableName|
  |SQLStatistics	TableName|
