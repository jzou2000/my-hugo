---
title: ODBC Attributes
date: 2019-05-28
tags: [odbc, attr, attributes]
---

# Environ Attributes
|Attribute|Version|Type|Description|
|---------|-------|----|-----------|
|SQL_ATTR_CONNECTION_POOLING|3.8|SQLUINTEGER|<ul><li>SQL_CP_OFF (default)</li><li>SQL_CP_ONE_PER_DRIVER</li><li>SQL_CP_ONE_PER_HENV</li><li>SQL_CP_DRIVER_AWARE</li></ul>|
|SQL_ATTR_CP_MATCH|3.0|SQLUINTEGER|<ul><li>SQL_CP_STRICT_MATCH (default)</li><li>SQL_CP_RELAXED_MATCH</li></ul>|
|SQL_ATTR_ODBC_VERSION|3.0|SQLUINTEGER|<ul><li>SQL_OV_ODBC3_80</li><li>SQL_OV_ODBC3 </li><li>SQL_OV_ODBC2 </li></ul>|
|SQL_ATTR_OUTPUT_NTS|3.0|SQLUINTEGER|<ul>SQL_TRUE (default)</ul>|

# Connect Attributes
|Attribute|Version|Type|Description|
|---------|-------|----|-----------|
|SQL_ATTR_ACCESS_MODE |1.0|SQLUINTEGER|<ul><li>SQL_MODE_READ_WRITE (default)</li><li>SQL_MODE_READ_ONLY </li></ul>|
|SQL_ATTR_ASYNC_DBC_EVENT|3.3|SQLPOINTER|event handler|
|SQL_ATTR_ASYNC_DBC_FUNCTIONS_ENABLE|3.8|SQLUINTEGER|<ul><li>SQL_ASYNC_DBC_ENABLE_OFF (default)</li><li>SQL_ASYNC_DBC_ENABLE_ON </li></ul>|
|SQL_ATTR_ASYNC_DBC_PCALLBACK|3.8|SQLPOINTER|context structure|
|SQL_ATTR_ASYNC_DBC_PCONTEXT|3.3|SQLPOINTER|context structure|
|SQL_ATTR_ASYNC_ENABLE|3.0|SQLULEN|<ul><li>SQL_ASYNC_ENABLE_OFF (default)</li><li>SQL_ASYNC_ENABLE_ON </li></ul>|
|SQL_ATTR_AUTO_IPD|3.0|SQLUINTEGER|<ul><li>SQL_TRUE</li><li>SQL_FALSE</li></ul>|
|SQL_ATTR_AUTOCOMMIT |1.0|SQLUINTEGER|<ul><li>SQL_AUTOCOMMIT_OFF</li><li>SQL_AUTOCOMMIT_ON</li></ul>|
|SQL_ATTR_CONNECTION_DEAD|3.5|SQLUINTEGER|read-only<ul><li>SQL_CD_TRUE</li><li>SQL_CD_FALSE</li></ul>|
|SQL_ATTR_CONNECTION_TIMEOUT|3.0|SQLUINTEGER|number of seconds to wait for any request on the connection to complete before returning to the application|
|SQL_ATTR_CURRENT_CATALOG|2.0|SQLPOINTER|A character string containing the name of the catalog to be used by the data source|
|SQL_ATTR_DBC_INFO_TOKEN|3.8|SQLPOINTER|set back the connection info token into the DBC handle when SQLRateConnection's (*pRating) parameter is not equal to 100.|
|SQL_ATTR_ENLIST_IN_DTC|3.0|SQLPOINTER|whether to use the ODBC driver in distributed transactions coordinated by Microsoft Component Services.|
|SQL_ATTR_LOGIN_TIMEOUT|1.0|SQLUINTEGER|number of seconds to wait for a login request to complete before returning to the application|
|SQL_ATTR_METADATA_ID|3.0|SQLUINTEGER|<ul><li>SQL_FALSE(default)</li><li>SQL_TRUE</li></ul>|
|SQL_ATTR_ODBC_CURSORS|2.0|SQLULEN|<ul><li>SQL_CUR_USE_IF_NEEDED</li><li>SQL_CUR_USE_ODBC</li><li>SQL_CUR_USE_ODBC (default)</li></ul>|
|SQL_ATTR_PACKET_SIZE|2.0|SQLUINTEGER|the network packet size in bytes|
|SQL_ATTR_QUIET_MODE|2.0|HWND|parent window handle of application|
|SQL_ATTR_TRACE|1.0|SQLUINTEGER|<ul><li>SQL_OPT_TRACE_OFF (default)</li><li>SQL_OPT_TRACE_ON</li></ul>|
|SQL_ATTR_TRACEFILE|1.0|SQLPOINTER|<ul>A null-terminated character string containing the name of the trace file.
|
|SQL_ATTR_TRANSLATE_LIB|1.0|SQLPOINTER|A null-terminated character string containing the name of a library containing the functions SQLDriverToDataSource and SQLDataSourceToDriver that the driver accesses to perform tasks such as character set translation.|
|SQL_ATTR_TRANSLATE_OPTION|1.0|SQLUINTEGER|A 32-bit flag value that is passed to the translation DLL|
|SQL_ATTR_TXN_ISOLATION|1.0|SQLUINTEGER|A 32-bit bitmask that sets the transaction isolation level for the current connection|


# Statement Attributes
|Attribute|Version|Type|Description|
|---------|-------|----|-----------|
|SQL_ATTR_PARAM_BIND_OFFSET_PTR|3.0|HANDLE|The handle to the APD for subsequent calls to SQLExecute and SQLExecDirect on the statement handle.|
|SQL_ATTR_APP_ROW_DESC|3.0|HANDLE|The handle to the ARD for subsequent fetches on the statement handle.|
|SQL_ATTR_ASYNC_ENABLE|1.0|SQLULEN|<ul><li> SQL_ASYNC_ENABLE_OFF</li><li>SQL_ASYNC_ENABLE_ON</li></ul> |
|SQL_ATTR_ASYNC_STMT_EVENT|3.8|SQLPOINTER|event handle|
|SQL_ATTR_ASYNC_STMT_PCALLBACK|3.8|SQLPOINTER|A SQLPOINTER to the asynchronous callback function|
|SQL_ATTR_ASYNC_STMT_PCONTEXT|3.8|SQLPOINTER |A SQLPOINTER to the context structure|
|SQL_ATTR_CONCURRENCY |2.0|SQLULEN|cursor concurrency|
|SQL_ATTR_CURSOR_SCROLLABLE|3.0|SQLULEN|<ul><li>SQL_NONSCROLLABLE</li><li>SQL_SCROLLABLE</li></ul>|
|SQL_ATTR_CURSOR_SENSITIVITY|3.0|SQLULEN|<ul><li>SQL_UNSPECIFIED </li><li>SQL_INSENSITIVE</li><li>SQL_SENSITIVE</li></ul>|
|SQL_ATTR_CURSOR_TYPE|2.0|SQLULEN|<ul><li>SQL_CURSOR_FORWARD_ONLY </li><li>SQL_CURSOR_STATIC</li><li>SQL_CURSOR_KEYSET_DRIVEN</li><li>SQL_CURSOR_DYNAMIC</li></ul>|
|SQL_ATTR_ENABLE_AUTO_IPD|3.0|SQLULEN|whether automatic population of the IPD is performed|
|SQL_ATTR_FETCH_BOOKMARK_PTR|3.0|SQLLEN*|points to a binary bookmark value|
|SQL_ATTR_IMP_PARAM_DESC|3.0|HANDLE|handle to IPD|
|SQL_ATTR_IMP_ROW_DESC|3.0|HANDLE|handle to IRD|
|SQL_ATTR_KEYSET_SIZE|2.0|SQLULEN|the number of rows in the keyset for a keyset-driven cursor.|
|SQL_ATTR_MAX_LENGTH|1.0|SQLULEN|the maximum amount of data that the driver returns from a character or binary column|
|SQL_ATTR_MAX_ROWS|1.0|SQLULEN|maximum number of rows to return to the application for a SELECT statement|
|SQL_ATTR_METADATA_ID|3.0|SQLULEN|bool: determines how the string arguments of catalog functions are treated.|
|SQL_ATTR_NOSCAN |1.0|SQLULEN|<ul><li>SQL_NOSCAN_OFF</li><li>SQL_NOSCAN_ON</li></ul>|
|SQL_ATTR_PARAM_BIND_OFFSET_PTR|3.0|SQLULEN*|points to an offset added to pointers to change binding of dynamic parameters.|
|SQL_ATTR_PARAM_BIND_TYPE|3.0|SQLULEN|SQL_PARAM_BIND_BY_COLUMN (the default).<br/>To select row-wise binding, this field is set to the length of the structure or an instance of a buffer that will be bound to a set of dynamic parameters.|
|SQL_ATTR_PARAM_OPERATION_PTR|3.0|SQLUSMALLINT *|points to an array of SQLUSMALLINT values used to ignore a parameter during execution of an SQL statement|
|SQL_ATTR_PARAM_STATUS_PTR|3.0|SQLUSMALLINT *|an array of SQLUSMALLINT values containing status information for each row of parameter values after a call to SQLExecute or SQLExecDirect.|
|SQL_ATTR_PARAMS_PROCESSED_PTR|3.0|SQLULEN*|a buffer in which to return the number of sets of parameters that have been processed, including error sets. No number will be returned if this is a null pointer.|
|SQL_ATTR_PARAMSET_SIZE |3.0|SQLULEN|number of values for each parameter|
|SQL_ATTR_QUERY_TIMEOUT|1.0|SQLULEN|number of seconds to wait for an SQL statement to execute before returning to the application.|
|SQL_ATTR_RETRIEVE_DATA|2.0|SQLULEN|<ul><li>SQL_RD_ON</li><li>SQL_RD_OFF</li></ul>|
|SQL_ATTR_ROW_ARRAY_SIZE|3.0|SQLULEN|number of rows returned by each call to SQLFetch or SQLFetchScroll|
|SQL_ATTR_ROW_BIND_OFFSET_PTR|3.0|SQLULEN*|an offset added to pointers to change binding of column data|
|SQL_ATTR_ROW_BIND_TYPE|1.0|SQLULEN|binding orientation to be used when SQLFetch or SQLFetchScroll is called on the associated statement: SQL_BIND_BY_COLUMN|
|SQL_ATTR_ROW_NUMBER|2.0|SQLULEN|number of the current row in the entire result set|
|SQL_ATTR_ROW_OPERATION_PTR|3.0|SQLUSMALLINT *|an array of SQLUSMALLINT values used to ignore a row during a bulk operation using SQLSetPos|
|SQL_ATTR_ROW_STATUS_PTR|3.0|SQLUSMALLINT *|an array of SQLUSMALLINT values containing row status values after a call to SQLFetch or SQLFetchScroll|
|SQL_ATTR_ROWS_FETCHED_PTR|3.0|SQLULEN*|a buffer in which to return the number of rows fetched after a call to SQLFetch or SQLFetchScroll|
|SQL_ATTR_SIMULATE_CURSOR|2.0|SQLULEN|<ul><li>SQL_SC_NON_UNIQUE</li><li>SQL_SC_TRY_UNIQUE</li><li>SQL_SC_UNIQUE (default)</li></ul>|
|SQL_ATTR_USE_BOOKMARKS|2.0|SQLULEN|<ul><li>SQL_UB_OFF (default)</li><li>SQL_UB_VARIABLE</li></ul>|
