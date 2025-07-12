---
title: launch-by-docker
nav: launch-by-docker
---

The quickest setup is using docker.

## The Server

1. get postgres docker image
    ```bash
    docker pull postgres
    docker image ls postgres
    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    postgres            latest              f51c55ac75ed        2 weeks ago         314MB
    ```
1. prepare a folder that contains pg data and 
   * a file that contains environment variables to avoid expose them on command-line
   * a folder on the host that actually contains database data
   ```bash
   mkdir -p /c/opt/pg/data
   cat > /c/opt/pg/svr.env
   POSTGRES_PASSWORD=super-acc-postgres-passwd
   ^D
   ```
1. create a shell script to launch server
    ```bash
    docker run -d --name dev-pg --env-file /c/opt/pg/svr.env \
      -v /c/opt/pg/data:/var/lib/postgresql/data \
      -p 5432:5432 postgres
    ```
   run and launch it

It is helpful to get IP address of the server container if the server is to be accessed
from other containers, such as:

* pgadmin
* native client (psql)
* odbc client

```bash
docker inspect ddp-pg -f "{{json .NetworkSettings.Networks}}"
{"bridge":{"IPAMConfig":null,"Links":null,"Aliases":null  "NetworkID":"4ec6bb0af06759be61eeb19648e6695e62fbf6beb5fb627e6847d4412c4f0772"  "EndpointID":"fde48fae83f6f30a3d760c203d06e53bf42b64ea1e0fa36f7b49f4219b7ab3b0","Gateway":"172.17.0  1","IPAddress":"172.17.0.4","IPPrefixLen":16,"IPv6Gateway":"","GlobalIPv6Address":""  "GlobalIPv6PrefixLen":0,"MacAddress":"02:42:ac:11:00:04","DriverOpts":null}}
```
Check the value of "IPAddress", which is "172.17.0.4" in this case.


## Client

It is easier to run client (psql) in the same container of the server,
you don't need to specified password with default config 

```bash
docker exec -it dev-pg psql -h localhost -U postgres
psql (13.1 (Debian 13.1-1.pgdg100+1))
Type "help" for help.

postgres=#
```

It is similar to run client from another container, except that you need to specifiy
the ip of the server container, as well as password

```bash
docker run -it --rm postgres psql -h 172.17.0.4 -U postgres -p the-passwd
psql (13.1 (Debian 13.1-1.pgdg100+1))
Type "help" for help.

postgres=#
```

Note:
* there's a much smaller docker image that contains only required components [tmaier/postgresql-client](https://hub.docker.com/r/tmaier/postgresql-client/tags?page=1&ordering=last_updated) only about 5MB


## pgAdmin

1. pull
   ```bash
   docker pull dpage/pgadmin4
   ```
1. prepare environment file ``/c/opt/pg/pgadmin.env``, similar to the one for the server
   ```ini
   PGADMIN_DEFAULT_EMAIL=user@domain.local
   PGADMIN_DEFAULT_PASSWORD=top-secret
   ```
1. run
   ```bash
   docker run -p 8081:80 \
     --env-file /c/opt/pg/pgadmin.env \
     --name dev-pgadmin \
     -d dpage/pgadmin4
1. find pg server ip, which is used to access the server container from pgadmin container
1. login in a browser at url (localhost:8081)
1. in the dashboard, click "Add New Server", you need
   * name - identify the server
   * host (ip address of server container, got above) and port (5432 by default)
   * user name and password

## ODBC

### Windows
1. download driver (either binary or source) from [PostgreSQL ODBC](https://www.postgresql.org/ftp/odbc/versions/)
1. create DSN using proper driver (e.g. unicode 64bit)
   * database: postgres
   * host: localhost
   * port: 5432
   * user: postgres
   * password: ....

### Linux

The official PostgreSQL odbc driver for linux supports unixODBC only (fixed?).
Because the driver needs the support of pg client libs to connect the server, you need one of these
* run odbc app from pg-enabled docker container
* have pg client lib installed 