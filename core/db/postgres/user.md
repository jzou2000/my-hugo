---
title: postgresql user
---

## hints

* after installed, you can access the server using ``postgres`` account as **superuser**
  * from localhost
  * login as ``postgres`` or use ``-U postgres`` (as root) from **localhost**, no password is required
* there's no **default** password 
* jdbc connection string
  * ``jdbc:postgresql:<host[:port]>/<database>?user=<USER>&password=<PASSWD>``
  * non-alphabet character should be url-encoded, such as ``-`` to ``%2D``


## create a user

* login as ``postgres``
* run command
  ```bash
  createuser name
  ```
* TBC

## create role

```bash
psql -U postgres
postgres=#
create database mydb;
\connect mydb
create table boys (id integer, name varchar(32));
create role ddp;
alter role ddp with password 'ddp-pwd';
grant all on database mydb to ddp;
grant all on table boys to ddp;
```

```bash
psql -U ddp -h localhost -d mydb
mydb=> select * from boys;
```
