---
title: ODBC Configures
nav: odbc config
tags: odbc, configure, config
description: configurate ODBC on different platforms and DM (driver manager)
---

# Windows

In spite of using the application ``ODBC Administrator`` to config ODBC drivers and DSN,
you can config ODBC directly in registry.

## Registry

```txt
  /HKEY_LOCAL_MACHINE/SOFTWARE/ODBC
    ODBC.INI/
      ODBC Data Sources/       - list of DSN/driver pairs
      mydsn                    - DSN name
        Driver=mydriver        - name of driver, match ODBCINST.INI
        Description=text       - description of this DSN
        other-key=value        - driver dependent, e.g. db path, uid, pwd
    ODBCINST.INI/
      ODBC Drivers             - list of installed drivers
        mydriver=installed     - every driver has a record name=installed
      mydriver/                - driver info: location and setup
        Driver=path/to/dll     - pathname to driver dll
        Setup=path/to/dll      - pathname to driver setup dll (may the same with Driver)
        Description=text       - description of the driver

  for simba drivers, also define
  \HKEY_LOCAL_MACHINE\SOFTWARE\Simba
    mydriver/Driver/
      ErrorMessagesPath=path/to/ErrorMessages
    
```

Note:
* HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432NODE\ODBC for 32bit driver on 64bit system



# Posix

There are two major DM on posix platforms, i.e. unixODBC and iODBC.

* **odbc.ini** defines list of DSN for both DMs,
  it is defined in ``$ODBCINI`` as full-pathname, default is ``$HOME/.odbc.ini``
  ```ini
  [ODBC Data Sources]
  XM            = XMDriver
  lite          = Sqlite
  pg            = PostgreSQL
  ```
* unixODBC
  * DSN entries are sections in **odbc.ini**
    ```ini
    [XM]
    Driver      = /home/jzou/odbc/drv/libXMDriver64.so
    DBF         = /home/jzou/odbc/dbf/xm
    ...
    ```
  * Trace config is in ``[ODBC]`` section in **odbcinst.ini**
    ```ini
    [ODBC]
    Trace        = Yes
    TraceFile    = /full/path/to/logfile
    ; optional
    TracePid     = Yes
    ```
* iODBC
  * DSN entries are sections in **odbcinst.ini**
    ```ini
    [ODBC Drivers]
    XMDriver    = Installed
    Sqlite      = Installed

    [XMDriver]
    Driver      = /home/jzou/odbc/drv/libXMDriver64.so
    DBF         = /home/jzou/odbc/dbf/xm
    ...
    ```
  * Trace config is in ``[ODBC]`` section in **odbc.ini**
    ```ini
    [ODBC]
    Trace        = 1
    TraceFile    = /full/path/to/logfile
    ```
* **odbcinst.ini** is defined depending on DM, as **full-pathname**
  * unixODBC: ``$ODBCSYSINI/$ODBCINSTINI``
    * ``$ODBCSYSINI`` default is ``${install_dir}/etc:/etc``
    * ``$ODBCINSTINI`` default is ``odbc.ini``
  * iODBC: ``$ODBCINSTINI`` only, default is ``$HOME/.odbcinst.ini``
  * If ``$ODBCINSTINI`` is shared for both unixODBC and iODBC, ``$ODBCINSTINI`` is set to the
    full-pathname to odbcinst.ini, **and set ``$ODBCSYSINI`` to empty string**.


Full sample for both unixODBC and iODBC.

```bash
# all settings are saved in ~/odbc
export ODBCINI=~/odbc/odbc.ini
export ODBCINSTINI=~/odbc/odbcinst.ini
export ODBCSYSINI=
```

~/odbc/odbc.ini

```ini
; odbc.ini
[ODBC Data Sources]
XM          = XMDriver
lite        = Sqlite
pg          = PostgreSQL

; DSN entries for unixODBC
[XM]
Driver      = /home/jzou/odbc/drv/libXMDriver64.so
DBF         = /home/jzou/odbc/dbf/xm
UID         = x
PWD         = x

[lite]
Description = My SQLite Database (unixodbc 64)
Driver      = /home/jzou/odbc/drv/libsqlite3odbc.so
Database    = /home/jzou/odbc/mylite.db
Timeout     = 2000

[pg]
Driver      = /home/jzou/odbc/drv/libpsqlodbcw.so
Servername  = my_server_host
Username    = myname
Password    = mypwd

; trace setting for iODBC
[ODBC]
Trace        = 1
TraceFile    = /full/path/to/logfile

```

~/odbc/odbcinst.ini

```ini
; odbcinst.ini
[ODBC Drivers]
XMDriver    = Installed
Sqlite      = Installed
; official PostgreSQL driver doesn't support iodbc, unfortunatedly

[XMDriver]
Driver      = /home/jzou/odbc/drv/libXMDriver64.so
DBF         = /home/jzou/odbc/dbf/xm
UID         = x
PWD         = x

[Sqlite]
Description = My SQLite Database (unixodbc 64)
Driver      = /home/jzou/odbc/drv/libsqlite3odbc.so
Database    = /home/jzou/odbc/mylite.db
Timeout     = 2000

; trace setting for unixODBC
[ODBC]
Trace        = Yes
TraceFile    = /full/path/to/logfile
```



# Simba Drivers

All Simba ODBC drivers can be configured by ``simab.${driver}.ini``,  which is located by ``$SIMBAINI``

```ini
[Driver]
LogLevel            = 6
LogPath             = /path/to/log/file
EnableTransactions  = 0
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




