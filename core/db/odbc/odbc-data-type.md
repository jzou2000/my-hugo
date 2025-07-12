---
title: ODBC Data Types
date: 2019-05-27
tags: [odbc, datatype]
---

# ODBC Data Types
## SQL Types

|name|value|
|:---|---:|
|SQL_CHAR                              |1|
|SQL_VARCHAR                          |12|
|SQL_LONGVARCHAR                      |-1|
|SQL_WCHAR                            |-8|
|SQL_WVARCHAR                         |-9|
|SQL_WLONGVARCHAR                    |-10|
|SQL_DECIMAL                           |3|
|SQL_NUMERIC                           |2|
|SQL_BIT                              |-7|
|SQL_TINYINT                          |-6|
|SQL_SMALLINT                          |5|
|SQL_INTEGER                           |4|
|SQL_BIGINT                           |-5|
|SQL_FLOAT                             |6|
|SQL_DOUBLE                            |8|
|SQL_REAL                              |7|
|SQL_BINARY                           |-2|
|SQL_VARBINARY                        |-3|
|SQL_LONGVARBINARY                    |-4|
|SQL_DATE                              |9|
|SQL_TIME                             |10|
|SQL_TIMESTAMP                        |11|
|SQL_TYPE_DATE                        |91|
|SQL_TYPE_TIME                        |92|
|SQL_TYPE_TIMESTAMP                   |93|
|SQL_GUID                            |-11|
|SQL_INTERVAL_YEAR                   |101|
|SQL_INTERVAL_MONTH                  |102|
|SQL_INTERVAL_DAY                    |103|
|SQL_INTERVAL_HOUR                   |104|
|SQL_INTERVAL_MINUTE                 |105|
|SQL_INTERVAL_SECOND                 |106|
|SQL_INTERVAL_YEAR_TO_MONTH          |107|
|SQL_INTERVAL_DAY_TO_HOUR            |108|
|SQL_INTERVAL_DAY_TO_MINUTE          |109|
|SQL_INTERVAL_DAY_TO_SECOND          |110|
|SQL_INTERVAL_HOUR_TO_MINUTE         |111|
|SQL_INTERVAL_HOUR_TO_SECOND         |112|
|SQL_INTERVAL_MINUTE_TO_SECOND       |113|


## SQL C Types

|name|value|
|:---|---:|
|SQL_C_CHAR                            |1|
|SQL_C_WCHAR                          |-8|
|SQL_C_NUMERIC                         |2|
|SQL_C_BIT                            |-7|
|SQL_C_TINYINT                        |-6|
|SQL_C_STINYINT                      |-26|
|SQL_C_UTINYINT                      |-28|
|SQL_C_SHORT                           |5|
|SQL_C_SSHORT                        |-15|
|SQL_C_USHORT                        |-17|
|SQL_C_LONG                            |4|
|SQL_C_SLONG                         |-16|
|SQL_C_ULONG                         |-18|
|SQL_C_SBIGINT                       |-25|
|SQL_C_UBIGINT                       |-27|
|SQL_C_FLOAT                           |7|
|SQL_C_DOUBLE                          |8|
|SQL_C_BINARY                         |-2|
|SQL_C_DATE                            |9|
|SQL_C_TIME                           |10|
|SQL_C_TIMESTAMP                      |11|
|SQL_C_TYPE_DATE                      |91|
|SQL_C_TYPE_TIME                      |92|
|SQL_C_TYPE_TIMESTAMP                 |93|
|SQL_C_GUID                          |-11|
|SQL_C_INTERVAL_YEAR                 |101|
|SQL_C_INTERVAL_MONTH                |102|
|SQL_C_INTERVAL_DAY                  |103|
|SQL_C_INTERVAL_HOUR                 |104|
|SQL_C_INTERVAL_MINUTE               |105|
|SQL_C_INTERVAL_SECOND               |106|
|SQL_C_INTERVAL_YEAR_TO_MONTH        |107|
|SQL_C_INTERVAL_DAY_TO_HOUR          |108|
|SQL_C_INTERVAL_DAY_TO_MINUTE        |109|
|SQL_C_INTERVAL_DAY_TO_SECOND        |110|
|SQL_C_INTERVAL_HOUR_TO_MINUTE       |111|
|SQL_C_INTERVAL_HOUR_TO_SECOND       |112|
|SQL_C_INTERVAL_MINUTE_TO_SECOND     |113|

## C Type Identifier vs C Types
|C type identifier|ODBC C typedef|C type|
|:----|:----|:----|
|SQL_C_CHAR | SQLCHAR * | unsigned char *|
|SQL_C_WCHAR | SQLWCHAR * | wchar_t *|
|SQL_C_SSHORT | SQLSMALLINT | short int|
|SQL_C_USHORT | SQLUSMALLINT | unsigned short int|
|SQL_C_SLONG | SQLINTEGER | long int|
|SQL_C_ULONG | SQLUINTEGER | unsigned long int|
|SQL_C_FLOAT | SQLREAL | float|
|SQL_C_DOUBLE | SQLDOUBLE, SQLFLOAT | double|
|SQL_C_BIT | SQLCHAR | unsigned char|
|SQL_C_STINYINT | SQLSCHAR | signed char|
|SQL_C_UTINYINT | SQLCHAR | unsigned char|
|SQL_C_SBIGINT | SQLBIGINT | _int64[h]|
|SQL_C_UBIGINT | SQLUBIGINT | unsigned _int64[h]|
|SQL_C_BINARY | SQLCHAR * | unsigned char *|
|SQL_C_BOOKMARK | BOOKMARK | unsigned long int[d]|
|SQL_C_VARBOOKMARK |	SQLCHAR * | unsigned char *|

## C structures
Note: size on Windows
````c
struct tagDATE_STRUCT {  
   SQLSMALLINT year;  
   SQLUSMALLINT month;  
   SQLUSMALLINT day;    
} DATE_STRUCT;
// size = 6

struct tagTIME_STRUCT {  
   SQLUSMALLINT hour;  
   SQLUSMALLINT minute;  
   SQLUSMALLINT second;  
} TIME_STRUCT;[a] 
// size = 6

struct tagTIMESTAMP_STRUCT {  
   SQLSMALLINT year;  
   SQLUSMALLINT month;  
   SQLUSMALLINT day;  
   SQLUSMALLINT hour;  
   SQLUSMALLINT minute;  
   SQLUSMALLINT second;  
   SQLUINTEGER fraction;
} TIMESTAMP_STRUCT;
// size = 16

typedef struct tagSQL_YEAR_MONTH
{
    SQLUINTEGER	year;
    SQLUINTEGER	month;
} SQL_YEAR_MONTH_STRUCT;
// size = 8

typedef struct tagSQL_DAY_SECOND
{
    SQLUINTEGER day;
    SQLUINTEGER	hour;
    SQLUINTEGER	minute;
    SQLUINTEGER	second;
    SQLUINTEGER	fraction;
} SQL_DAY_SECOND_STRUCT;
// size = 20

typedef struct tagSQL_INTERVAL_STRUCT
{
    SQLINTERVAL	interval_type;
    SQLSMALLINT	interval_sign;
    union {
        SQL_YEAR_MONTH_STRUCT year_month;
        SQL_DAY_SECOND_STRUCT day_second;
    } intval;
} SQL_INTERVAL_STRUCT;
// size = 28

struct tagSQL_NUMERIC_STRUCT {  
   SQLCHAR precision;  
   SQLSCHAR scale;  
   SQLCHAR sign;  
   SQLCHAR val[SQL_MAX_NUMERIC_LEN];    // 16
} SQL_NUMERIC_STRUCT;  
// size = 19

struct tagSQLGUID {  
   DWORD Data1;  
   WORD Data2;  
   WORD Data3;  
   BYTE Data4[8];  
} SQLGUID;
// size = 16

````


