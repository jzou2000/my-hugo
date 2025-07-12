---
title: Install from docker
nav: "install: docker"
---

```sh
$ docker pull jenkins/jenkins
$ docker images
REPOSITORY        TAG       IMAGE ID       CREATED         SIZE
jenkins/jenkins   latest    487c02871276   7 days ago      460MB

```
usage
```sh
docker run -p 8080:8080 -p 50000:50000 --restart=on-failure -v jenkins_home:/var/jenkins_home jenkins/jenkins
```

```
...
Jenkins initial setup is required. An admin user has been created and a password generated.
Please use the following password to proceed to installation:

0f8a2682be274cc283f253e68775cfad

This may also be found at: /var/jenkins_home/secrets/initialAdminPassword
...

*************************************************************
*************************************************************
*************************************************************

Jenkins initial setup is required. An admin user has been created and a password generated.
Please use the following password to proceed to installation:

c2ee994730b349a196acb3202031ee97

This may also be found at: /var/jenkins_home/secrets/initialAdminPassword

*************************************************************
*************************************************************
*************************************************************
...
```

jasonz/jzouAdmin

Ref
* Jenkins Pipeline Tutorial for Beginners (TechWorld with Nana)
  * [Run Jenkins in Docker Container](https://www.youtube.com/watch?v=pMO26j2OUME)
  * [Create Multibranch Pipeline with Git](https://www.youtube.com/watch?v=tuxO7ZXplRE)
  * [Jenkinsfile](https://www.youtube.com/watch?v=MY1w7sWW5ms)
  * [Trigger Jenkins Build automatically](https://www.youtube.com/watch?v=CmwTPxdx24Y)