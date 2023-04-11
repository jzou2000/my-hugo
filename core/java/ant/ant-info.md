---
title: Get Information About Ant
nav: ant info
---

You can get ant information from ``ant.*`` properties, especially

* ant.version
* ant.java.version

info.xml
```xml
<?xml version='1.0'?>
<project name='AntInfo' default='info'>
    <description>Get ant information</description>

    <property environment='env'/>
    <target name='info'>
        <echoproperties prefix='ant.'/>
    </target>

</project>
```

```sh
$ ant -f info.xml
Buildfile: /home/jasonz/codex/java/info.xml

info:
[echoproperties] #Ant properties
[echoproperties] #Fri Aug 26 11:54:13 PDT 2022
[echoproperties] ant.core.lib=/opt/apache/ant1.9.2/lib/ant.jar
[echoproperties] ant.file=/home/jasonz/codex/java/info.xml
[echoproperties] ant.file.AntInfo=/home/jasonz/codex/java/info.xml
[echoproperties] ant.file.type=file
[echoproperties] ant.file.type.AntInfo=file
[echoproperties] ant.home=/opt/apache/ant1.9.2
[echoproperties] ant.java.version=1.8
[echoproperties] ant.library.dir=/opt/apache/ant1.9.2/lib
[echoproperties] ant.project.default-target=info
[echoproperties] ant.project.invoked-targets=info
[echoproperties] ant.project.name=AntInfo
[echoproperties] ant.version=Apache Ant(TM) version 1.9.2 compiled on July 8 2013

BUILD SUCCESSFUL
Total time: 5 seconds
```
