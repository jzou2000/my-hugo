---
title: ODBC API Cheatsheet
date: 2019-05-27
tags: [odbc, api, cheatsheet]
---

## ODBC

|API                           |Unicode|Version|Description|
|:-----------------------------|:-----:|:-----:|:----------------------------|
|~~SQLAllocConnect~~           |       |1.0    |deprecated by SQLAllocHandle|
|~~SQLAllocEnv~~               |       |1.0    |deprecated by SQLAllocHandle|
|SQLAllocHandle                |       |3.0    |allocates an environment, connection, statement, or descriptor handle.|
|~~SQLAllocStmt~~              |       |1.0    |deprecated by SQLAllocHandle|
|SQLBindCol                    |       |1.0    |binds application data buffers to columns in the result set.|
|SQLBindParameter              |       |2.0    |binds a buffer to a parameter marker in an SQL statement|
|SQLBrowseConnect              |*      |1.0    |supports an iterative method of discovering and enumerating the attributes and attribute values required to connect to a data source|
|SQLBulkOperations             |       |3.0    |performs bulk insertions and bulk bookmark operations, including update, delete, and fetch by bookmark.|
|SQLCancel                     |       |1.0    |cancels the processing on a statement.|
|SQLCancelHandle               |       |3.8    |cancels the processing on a connection or statement.|
|SQLCloseCursor                |       |3.0    |closes a cursor that has been opened on a statement and discards pending results.|
|SQLColAttribute               |*      |3.0    |returns descriptor information for a column in a result set.|
|~~SQLColAttributes~~          |*      |1.0    |deprecated by SQLColAttribute.|
|SQLColumnPrivileges           |*      |1.0    |returns a list of columns and associated privileges for the specified table.|
|SQLColumns                    |*      |1.0    |returns the list of column names in specified tables|
|SQLCompleteAsync              |       |3.8    |can be used to determine when an asynchronous function is complete using either notification- or polling-based processing|
|SQLConnect                    |*      |1.0    |establishes connections to a driver and a data source|
|SQLCopyDesc                   |       |3.0    |copies descriptor information from one descriptor handle to another|
|SQLDataSources                |*      |1.0    |returns information about a data source. This function is implemented only by the Driver Manager.|
|SQLDescribeCol                |*      |1.0    |returns the result descriptor - column name,type, column size, decimal digits, and nullability - for one column in the result set. This information also is available in the fields of the IRD.|
|SQLDescribeParam              |       |1.0    |returns the description of a parameter marker associated with a prepared SQL statement. This information is also available in the fields of the IPD.|
|SQLDisconnect                 |       |1.0    |closes the connection associated with a specific connection handle.|
|SQLDriverConnect              |*      |1.0    |is an alternative to SQLConnect|
|SQLDrivers                    |*      |2.0    |lists driver descriptions and driver attribute keywords.|
|SQLEndTran                    |       |3.0    |requests a commit or rollback operation for all active operations on all statements associated with a connection|
|~~SQLError~~                  |*      |1.0    |deprecated, returns error or status information.|
|SQLExecDirect                 |*      |1.0    |executes a preparable statement, using the current values of the parameter marker variables if any parameters exist in the statement.|
|SQLExecute                    |       |1.0    |executes a prepared statement, using the current values of the parameter marker variables if any parameter markers exist in the statement.|
|SQLExtendedFetch              |       |1.0    |deprecated: fetches the specified rowset of data from the result set and returns data for all bound columns.|
|SQLFetch                      |       |1.0    |fetches the next rowset of data from the result set and returns data for all bound columns.|
|SQLFetchScrool                |       |3.0    |fetches the specified rowset of data from the result set and returns data for all bound columns.|
|SQLForeignKeys                |*      |1.0    |returns a list of foreign keys (or refer to) in specified table.|
|~~SQLFreeConnect~~            |       |1.0    |deprecated by SQLFreeHandle|
|~~SQLFreeEnv~~                |       |1.0    |deprecated by SQLFreeHandle|
|SQLFreeHandle                 |       |3.0    |frees resources associated with a specific environment, connection, statement, or descriptor handle.|
|~~SQLFreeStmt~~               |       |1.0    |deprecated by SQLFreeHandle|
|SQLGetConnectAttr             |*      |3.0    |returns the current setting of a connection attribute.|
|~~SQLGetConnectOption~~       |*      |1.0    |deprecated by SQLGetConnectAttr|
|SQLGetCursorName              |*      |1.0    |returns the cursor name associated with a specified statement.|
|SQLGetData                    |       |1.0    |retrieves data for a single column in the result set or for a single parameter after SQLParamData returns SQL_PARAM_DATA_AVAILABLE. It can be called multiple times to retrieve variable-length data in parts.|
|SQLGetDescField               |*      |3.0    |returns the current setting or value of a single field of a descriptor record.|
|SQLGetDescRec                 |*      |3.0    |returns the current settings or values of multiple fields of a descriptor record. The fields returned describe the name, data type, and storage of column or parameter data.|
|SQLGetDiagField               |*      |3.0    |returns the current value of a field of a record of the diagnostic data structure (associated with a specified handle) that contains error, warning, and status information.|
|SQLGetDiagRec                 |*      |3.0    |returns the current values of multiple fields of a diagnostic record that contains error, warning, and status information.|
|SQLGetEnvAttr                 |       |3.0    |returns the current setting of an environment attribute.|
|SQLGetFunctions               |       |1.0    |returns information about whether a driver supports a specific ODBC function|
|SQLGetInfo                    |*      |1.0    |returns general information about the driver and data source associated with a connection.|
|SQLGetStmtAttr                |*      |3.0    |returns the current setting of a statement attribute.|
|~~SQLGetStmtOption~~          |       |1.0    |deprecated by SQLGetStmtAttr|
|SQLGetTypeInfo                |*      |1.0    |returns information about data types supported by the data source.|
|SQLMoreResults                |       |1.0    |determines whether more results are available on a statement containing SELECT, UPDATE, INSERT, or DELETE statements and, if so, initializes processing for those results.|
|SQLNativeSql                  |*      |1.0    |returns the SQL string as modified by the driver. SQLNativeSql does not execute the SQL statement.|
|SQLNumParams                  |       |1.0    |returns the number of parameters in an SQL statement.|
|SQLNumResultCols              |       |1.0    |returns the number of columns in a resultset.|
|SQLParamData                  |       |1.0    |is used together with SQLPutData to supply parameter data at statement execution time, and with SQLGetData to retrieve streamed output parameter data.|
|~~SQLParamOptions~~           |       |1.0    |deprecated by SQLSetStmtAttr|
|SQLPrepare                    |*      |1.0    |prepares an SQL string for execution.|
|SQLPrimaryKeys                |*      |1.0    |returns the column names that make up the primary key for a table.|
|SQLProcedureColumns           |*      |1.0    |returns the list of input and output parameters, as well as the columns that make up the result set for the specified procedures|
|SQLProcedures                 |*      |1.0    |returns the list of procedure names stored in a specific data source.|
|SQLPutData                    |       |1.0    |allows an application to send data for a parameter or column to the driver at statement execution time. |
|SQLRowCount                   |       |1.0    |returns the number of rows affected by an UPDATE, INSERT, or DELETE statement; an SQL_ADD, SQL_UPDATE_BY_BOOKMARK, or SQL_DELETE_BY_BOOKMARK operation in SQLBulkOperations; or an SQL_UPDATE or SQL_DELETE operation in SQLSetPos.|
|SQLSetConnectAttr             |*      |3.0    |sets attributes that govern aspects of connections.|
|~~SQLSetConnectOption~~       |*      |1.0    |deprecated by SQLSetConnectAttr|
|SQLSetCursorName              |*      |1.0    |associates a cursor name with an active statement. |
|SQLSetDescField               |*      |3.0    |sets the value of a single field of a descriptor record.|
|SQLSetDescRec                 |       |3.0    |function sets multiple descriptor fields that affect the data type and buffer bound to a column or parameter data.|
|SQLSetEnvAttr                 |       |3.0    |sets attributes that govern aspects of environments.|
|~~SQLSetParam~~               |       |1.0    |deprecated by SQLBindParameter|
|SQLSetPos                     |       |1.0    |sets the cursor position in a rowset and allows an application to refresh data in the rowset or to update or delete data in the result set.|
|~~SQLSetScrollOptions~~       |       |1.0    |deprecated by SQLGetInfo and SQLSetStmtAttr|
|SQLSetStmtAttr                |*      |3.0    |sets attributes related to a statement.|
|~~SQLSetStmtOption~~          |       |1.0    |deprecated by SQLSetStmtAttr|
|SQLSpecialColumns             |*      |1.0    |retrieves the special information about columns within a specified table.|
|SQLStatistics                 |*      |1.0    |retrieves a list of statistics about a single table and the indexes associated with the table|
|SQLTablePrivileges            |*      |1.0    |returns a list of tables and the privileges associated with each table.|
|SQLTables                     |*      |1.0    |returns the list of table, catalog, or schema names, and table types, stored in a specific data source|
|~~SQLTransact~~               |       |1.0    |deprecated by SQLEndTran|



## ODBC Inst
````
SQLInstallODBC
SQLCreateDataSource
SQLGetTranslator
SQLInstallDriver
SQLInstallDriverManager
SQLGetInstalledDrivers
SQLGetAvailableDrivers
SQLConfigDataSource
SQLWriteDSNToIni
SQLRemoveDSNFromIni
SQLValidDSN
SQLWritePrivateProfileString
SQLGetPrivateProfileString
SQLInstallTranslator
SQLRemoveTranslator
SQLRemoveDriver
SQLConfigDriver
SQLInstallerError
SQLPostInstallerError
SQLReadFileDSN
SQLWriteFileDSN
SQLInstallDriverEx
SQLInstallTranslatorEx

````

