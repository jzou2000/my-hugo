---
title: Tips
nav: tips
date: 2020-02-20
---

## Access Host Server From Container 

Once in a while an application runs in the container need to access a service running in the host.
Here is an example:

> A web-front-end development tool, e.g. @vue/cli runs in a docker container, which
  launches a monitor server during the front-end composing/debugging. The application
  needs to get data (e.g. RESTs) from the site, which is usually implemented as a gateway
  inside the @vue/cli monitor.
  
> The service usually runs as a host service.

To let the app in the container access the host, the host address is required.
The host address is actually the gateway of the container.

Inside the container, run
```bash
$ ip route show
default via 172.17.0.1 dev eth0 
172.17.0.0/16 dev eth0 scope link  src 172.17.0.4 
```

It is easy to extract from a simple shell script
```bash
export hostip=$(ip route show | awk '/default/ {print $3}')
```

Ref
* [stackoverflow](https://stackoverflow.com/questions/31324981/how-to-access-host-port-from-docker-container)
* [Docker Tips](https://nickjanetakis.com/blog/docker-tip-35-connect-to-a-database-running-on-your-docker-host)