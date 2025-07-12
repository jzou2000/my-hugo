---
title: Code Study - unixODBC
nav: unixodbc code study
tags: code study, unixodbc
description: |
    code study of unixodbc (2.3.1), topics include: log
---

# How Log Works

* config - 
  ```
  __handles.c:__alloc_env()
    SQLGetPrivateProfileString: odbcinst.ini ODBC.Trace [1Y].*|ON
    dm_log_open( "ODBC", tracing_file, 1/0 );
  ```
* log/action
  ```
  __info.c:
    dm_log_open(prog_name, file_name, pid_logging);     // only save log info
    dm_log_write(file, line, type, severity, message);  // do actual log file write
  ```

## Conclusion

* unixodbc use odbc.ini, defined by $ODBCINI of full path, for **most** configuration
* trace setiings defined by odbcinst.ini
  ```ini
  [ODBC]
  Trace      = Yes                  # alternative: 1, ON
  TraceFile  = /full/path/to/file

  # optional
  # TracePid = Yes
  ```
* odbcinst.ini is located by **both** ``$ODBCSYSINI`` and ``$ODBCINSTINI``
  * ``$ODBCSYSINI`` defines the path of odbcinst.ini, default is ``$INSTALL_DIR/etc:/etc``
  * ``$ODBCINSTINI`` defines the relative pathname to ``$ODBCSYSINI``
  * the full-pathname of odbcinst.ini is ``$ODBCSYSINI/$ODBCINSTINI``
  * if ``$ODBCINSTINI`` is full-pathname (be compatible to iODBC), set ``$ODBCSYSINI`` to empty

