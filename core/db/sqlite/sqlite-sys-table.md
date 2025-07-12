---
title: Sqlite System Tables
date: 2019-05-28
tags: [sqlite, systable, system]
---

# SQLite Misc

## system tables

* sqlite_master
* sqlite_sequence
* sqlite_stat1

### sqlite_master
Master listing of all database objects in the database and the SQL used to create each object.

|Column|Description|
|----|----|
|type|type of object: table, index, trigger, view|
|name|name of object|
|tbl_name|table name associated with|
|rootpage|Root page|
|sql|DDL|

### sqlite_sequence
Lists the last sequence number used for the AUTOINCREMENT column in a table.

|Column|Description|
|----|----|
|name|table name associated with the AUTOINCREMENT column|
|seq|the last sequence number used|

### sqlite_state1
This table is created by the ANALYZE command to store statistical information about the tables and indexes analyzed. This information will be later used by the query optimizer.

|Column|Description|
|----|----|
|tbl|The table name that was analyzed|
|idx|The name of the index that was analyzed|
|stat|Information about the table and indexes analyzed that will be later used by the query optimizer|


## Common Pragma

|pragma  |example     |description           |
|:-------|:-----------|:-------------------|
|

Less common pragmas

### dabase_info - a query to return one row for each database attached to the current database connection
```txt
sqlite> pragma database_list;
seq         name        file
----------  ----------  ------------------------
0           main        /mnt/c/codex/py/mydb.dat
```

### collation_list -  a list of the collating sequences
```txt
sqlite> pragma collation_list;
seq         name
----------  ----------
0           RTRIM
1           NOCASE
2           BINARY
```

### funtion_list - 
```txt
sqlite> pragma function_list;
name          builtin     type        enc         narg        flags
------------  ----------  ----------  ----------  ----------  ----------
group_concat  1           w           utf8        1           2097152
group_concat  1           w           utf8        2           2097152
julianday     1           s           utf8        -1          2099200
ntile         1           w           utf8        1           2097152
nullif        1           s           utf8        2           2099200
sqlite_compi  1           s           utf8        1           2097152
current_time  1           s           utf8        0           2097152
sqlite_compi  1           s           utf8        1           2097152
sum           1           w           utf8        1           2097152
quote         1           s           utf8        1           2099200
printf        1           s           utf8        -1          2099200
likelihood    1           s           utf8        2           2099200
last_value    1           w           utf8        1           2097152
rank          1           w           utf8        0           2097152
round         1           s           utf8        1           2099200
round         1           s           utf8        2           2099200
rtrim         1           s           utf8        1           2099200
rtrim         1           s           utf8        2           2099200
nth_value     1           w           utf8        2           2097152
random        1           s           utf8        0           2097152
trim          1           s           utf8        1           2099200
trim          1           s           utf8        2           2099200
time          1           s           utf8        -1          2099200
total         1           w           utf8        1           2097152
substr        1           s           utf8        2           2099200
substr        1           s           utf8        3           2099200
replace       1           s           utf8        3           2099200
upper         1           s           utf8        1           2099200
typeof        1           s           utf8        1           2099200
load_extensi  1           s           utf8        1           524288
load_extensi  1           s           utf8        2           524288
soundex       1           s           utf8        1           2099200
avg           1           w           utf8        1           2097152
abs           1           s           utf8        1           2099200
strftime      1           s           utf8        -1          2099200
unknown       1           s           utf8        -1          2099200
randomblob    1           s           utf8        1           2097152
unicode       1           s           utf8        1           2099200
percent_rank  1           w           utf8        0           2097152
row_number    1           w           utf8        0           2097152
last_insert_  1           s           utf8        0           2097152
sqlite_log    1           s           utf8        2           2099200
unlikely      1           s           utf8        1           2099200
char          1           s           utf8        -1          2099200
count         1           w           utf8        0           2097152
count         1           w           utf8        1           2097152
date          1           s           utf8        -1          2099200
sqlite_offse  1           s           utf8        1           2099200
total_change  1           s           utf8        0           2097152
changes       1           s           utf8        0           2097152
sqlite_versi  1           s           utf8        0           2097152
coalesce      1           s           utf8        -1          2099200
glob          1           s           utf8        2           2099200
zeroblob      1           s           utf8        1           2099200
hex           1           s           utf8        1           2099200
sqlite_sourc  1           s           utf8        0           2097152
datetime      1           s           utf8        -1          2099200
cume_dist     1           w           utf8        0           2097152
instr         1           s           utf8        2           2099200
dense_rank    1           w           utf8        0           2097152
ifnull        1           s           utf8        2           2099200
current_date  1           s           utf8        0           2097152
current_time  1           s           utf8        0           2097152
lag           1           w           utf8        1           2097152
lag           1           w           utf8        3           2097152
lag           1           w           utf8        2           2097152
like          1           s           utf8        2           2099200
like          1           s           utf8        3           2099200
max           1           s           utf8        -1          2099200
max           1           w           utf8        1           2097152
min           1           s           utf8        -1          2099200
min           1           w           utf8        1           2097152
lead          1           w           utf8        1           2097152
lead          1           w           utf8        3           2097152
lead          1           w           utf8        2           2097152
lower         1           s           utf8        1           2099200
ltrim         1           s           utf8        1           2099200
ltrim         1           s           utf8        2           2099200
first_value   1           w           utf8        1           2097152
length        1           s           utf8        1           2099200
likely        1           s           utf8        1           2099200
edit          0           s           utf8        2           0
edit          0           s           utf8        1           0
shell_idquot  0           s           utf8        1           0
shell_int32   0           s           utf8        2           0
shell_putsnl  0           s           utf8        1           0
sqlar_uncomp  0           s           utf8        2           2097152
sqlar_compre  0           s           utf8        1           2097152
zipfile       0           a           utf8        -1          0
snippet       0           s           utf8        -1          0
fts5_expr_tc  0           s           utf8        -1          0
fts5          0           s           utf8        1           0
fts3_tokeniz  0           s           utf8        2           524288
fts3_tokeniz  0           s           utf8        1           524288
json_insert   0           s           utf8        -1          2099200
fts5_isalnum  0           s           utf8        -1          0
json_array    0           s           utf8        -1          2099200
shell_escape  0           s           utf8        1           0
fts5_rowid    0           s           utf8        -1          0
fts5_source_  0           s           utf8        0           0
json          0           s           utf8        1           2099200
offsets       0           s           utf8        1           0
highlight     0           s           utf8        -1          0
rtreenode     0           s           utf8        2           0
shell_add_sc  0           s           utf8        3           0
rtreecheck    0           s           utf8        -1          0
fts5_expr     0           s           utf8        -1          0
json_object   0           s           utf8        -1          2099200
fts5_decode_  0           s           utf8        2           0
sha3_query    0           s           utf8        2           524288
sha3_query    0           s           utf8        1           524288
fts5_decode   0           s           utf8        2           0
matchinfo     0           s           utf8        2           0
matchinfo     0           s           utf8        1           0
json_valid    0           s           utf8        1           2099200
shell_module  0           s           utf8        1           0
match         0           s           utf8        2           0
json_set      0           s           utf8        -1          2099200
fts5_fold     0           s           utf8        -1          0
bm25          0           s           utf8        -1          0
optimize      0           s           utf8        1           0
json_patch    0           s           utf8        2           2099200
json_array_l  0           s           utf8        2           2099200
json_array_l  0           s           utf8        1           2099200
sha3          0           s           utf8        2           2099200
sha3          0           s           utf8        1           2099200
json_extract  0           s           utf8        -1          2099200
zipfile_cds   0           s           utf8        -1          0
json_group_o  0           w           utf8        2           3147776
rtreedepth    0           s           utf8        1           0
json_quote    0           s           utf8        1           2099200
json_remove   0           s           utf8        -1          2099200
json_type     0           s           utf8        2           2099200
json_type     0           s           utf8        1           2099200
writefile     0           s           utf8        -1          524288
json_replace  0           s           utf8        -1          2099200
readfile      0           s           utf8        1           524288
json_group_a  0           w           utf8        1           3147776
lsmode        0           s           utf8        1           0
```

## sqlite3 commands

|group|command|description|
|:
