---
title: ODBC Driver Manager
date: 2019-05-27
tags: [odbc, driver-manager, DM, unixODBC, iODBC]
---


# Enable DM/Driver log

## unixODBC
odbcinst.ini

```ini
[ODBC]
Trace = yes
TraceFile = /path/to/traceFile.log

```

## iODBC
odbc.ini

```ini
[ODBC]
Trace = 1
TraceFile = /path/to/traceFile.log

# optional
Debug = 1
DebugFile = /path/to/debugFile.log
```

## Simba Driver
simab.${drier}.ini

```ini
[Driver]
LogLevel=6
LogPath=/path     # file name is, e.g. XM_driver.log
EnableTransactions=0
```

Log Level

0. disable
1. fatal - very severe error events that might crash
2. errors - driver can still run
3. warnings - potentially harmful situations
4. info - general information
5. debug - details for debugging
6. trace - everything

## Detected DM from Simba driver log
Here is the first few lines when the loglevel is 4+

```bash
INFO  2455459648 SharedSingletonManager::LogVersions: SDK Version: 10.01.05.1031
INFO  2455459648 SharedSingletonManager::LogVersions: DSII Version: 10.01.1031
INFO  2455459648 Driver::Initialize: Database CHAR Encoding: UTF-8
INFO  2455459648 Driver::Initialize: Database WCHAR Encoding: UTF-16LE
INFO  2455459648 Driver::Initialize: Driver ANSI CHAR Encoding: UTF-8
INFO  2455459648 Driver::Initialize: Driver Manager WCHAR Encoding: UTF-32LE
INFO  2455459648 Driver::Initialize: Detected Driver Manager: unixODBC, 2.2.14 or 2.3.x branch
INFO  2455459648 Driver::Initialize: Locale name: en_CA
INFO  2455459648 Driver::Initialize: Bitness: 64-bit
```
