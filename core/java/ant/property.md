---
title: Property
nav: property
---

Important Note: properties are **immutable**

### Show all or part of properties

ex-condition.xml
```xml
<?xml version="1.0"?>
<project name="TestAntCondition" default='all' basedir=".">
    <description>Test Ant</description>

    <property name="src.dir" location="src/"/>
    <property name="dest.dir" location="build/"/>

    <target name="all" description="dump all properties">
        <echoproperties/>
    </target>

    <!-- ant -f ex-condition.xml dump-java -->
    <target name="dump-java" description="dump properties that match pattern java\..* using search method ">
        <echoproperties regex='java\..*' />
    </target>
</project>
```

Dump all properties
```sh
$ ant -f ex-condition.xml
Buildfile: /home/jasonz/codex/java/ant/ex-condition.xml

all:
[echoproperties] #Ant properties
[echoproperties] #Thu Mar 24 09:45:11 PDT 2022
[echoproperties] awt.toolkit=sun.awt.X11.XToolkit
[echoproperties] ant.library.dir=/usr/share/ant/lib
[echoproperties] ant.file.type=file
[echoproperties] java.specification.version=11
[echoproperties] ant.project.name=TestAntCondition
[echoproperties] sun.cpu.isalist=
[echoproperties] sun.jnu.encoding=UTF-8
[echoproperties] java.class.path=/usr/share/ant/lib/ant-launcher.jar\:/usr/share/ant/lib/ant-jmf.jar\:/usr/share/ant/lib/ant-apache-bcel.jar\:/usr/share/ant/lib/ant.jar\:/usr/share/ant/lib/ant-commons-net.jar\:/usr/share/ant/lib/ant-javamail.jar\:/usr/share/ant/lib/ant-swing.jar\:/usr/share/ant/lib/ant-apache-oro.jar\:/usr/share/ant/lib/ant-apache-regexp.jar\:/usr/share/ant/lib/ant-launcher.jar\:/usr/share/ant/lib/ant-testutil.jar\:/usr/share/ant/lib/ant-apache-xalan2.jar\:/usr/share/ant/lib/ant-apache-log4j.jar\:/usr/share/ant/lib/ant-antlr.jar\:/usr/share/ant/lib/ant-junit.jar\:/usr/share/ant/lib/ant-apache-resolver.jar\:/usr/share/ant/lib/ant-xz.jar\:/usr/share/ant/lib/ant-jsch.jar\:/usr/share/ant/lib/ant-junit4.jar\:/usr/share/ant/lib/ant-apache-bsf.jar\:/usr/share/ant/lib/ant-jdepend.jar\:/usr/share/ant/lib/ant-commons-logging.jar
[echoproperties] java.vm.vendor=Ubuntu
[echoproperties] sun.arch.data.model=64
[echoproperties] java.vendor.url=https\://ubuntu.com/
[echoproperties] user.timezone=
[echoproperties] java.vm.specification.version=11
[echoproperties] os.name=Linux
[echoproperties] sun.java.launcher=SUN_STANDARD
[echoproperties] sun.boot.library.path=/usr/lib/jvm/java-11-openjdk-amd64/lib
[echoproperties] ant.file.type.TestAntCondition=file
[echoproperties] sun.java.command=org.apache.tools.ant.launch.Launcher -cp  -f ex-condition.xml
[echoproperties] jdk.debug=release
[echoproperties] sun.cpu.endian=little
[echoproperties] user.home=/home/jasonz
[echoproperties] user.language=en
[echoproperties] java.specification.vendor=Oracle Corporation
[echoproperties] java.version.date=2021-04-20
[echoproperties] java.home=/usr/lib/jvm/java-11-openjdk-amd64
[echoproperties] file.separator=/
[echoproperties] basedir=/home/jasonz/codex/java/ant
[echoproperties] java.vm.compressedOopsMode=Zero based
[echoproperties] line.separator=\n
[echoproperties] ant.java.version=11
[echoproperties] java.specification.name=Java Platform API Specification
[echoproperties] java.vm.specification.vendor=Oracle Corporation
[echoproperties] java.awt.graphicsenv=sun.awt.X11GraphicsEnvironment
[echoproperties] dest.dir=/home/jasonz/codex/java/ant/build
[echoproperties] ant.file.TestAntCondition=/home/jasonz/codex/java/ant/ex-condition.xml
[echoproperties] sun.management.compiler=HotSpot 64-Bit Tiered Compilers
[echoproperties] java.runtime.version=11.0.11+9-Ubuntu-0ubuntu2.20.04
[echoproperties] user.name=jasonz
[echoproperties] ant.file=/home/jasonz/codex/java/ant/ex-condition.xml
[echoproperties] path.separator=\:
[echoproperties] os.version=5.10.60.1-microsoft-standard-WSL2
[echoproperties] java.runtime.name=OpenJDK Runtime Environment
[echoproperties] file.encoding=UTF-8
[echoproperties] ant.project.invoked-targets=all
[echoproperties] java.vm.name=OpenJDK 64-Bit Server VM
[echoproperties] ant.core.lib=/usr/share/ant/lib/ant.jar
[echoproperties] java.vendor.url.bug=https\://bugs.launchpad.net/ubuntu/+source/openjdk-lts
[echoproperties] java.io.tmpdir=/tmp
[echoproperties] java.version=11.0.11
[echoproperties] user.dir=/home/jasonz/codex/java/ant
[echoproperties] os.arch=amd64
[echoproperties] java.vm.specification.name=Java Virtual Machine Specification
[echoproperties] java.awt.printerjob=sun.print.PSPrinterJob
[echoproperties] ant.home=/usr/share/ant
[echoproperties] sun.os.patch.level=unknown
[echoproperties] ant.version=Apache Ant(TM) version 1.10.7 compiled on October 24 2019
[echoproperties] java.library.path=/usr/java/packages/lib\:/usr/lib/x86_64-linux-gnu/jni\:/lib/x86_64-linux-gnu\:/usr/lib/x86_64-linux-gnu\:/usr/lib/jni\:/lib\:/usr/lib
[echoproperties] java.vendor=Ubuntu
[echoproperties] java.vm.info=mixed mode, sharing
[echoproperties] java.vm.version=11.0.11+9-Ubuntu-0ubuntu2.20.04
[echoproperties] sun.io.unicode.encoding=UnicodeLittle
[echoproperties] java.class.version=55.0
[echoproperties] src.dir=/home/jasonz/codex/java/ant/src
[echoproperties] ant.project.default-target=all

BUILD SUCCESSFUL
Total time: 0 seconds
```

Dump properties by pattern ``java\..*``, the match method is ``search``, e.g. ``sun.java.launcher`` is also matched.
```sh
$ ant -f ex-condition.xml dump-java
Buildfile: /home/jasonz/codex/java/ant/ex-condition.xml

dump-java:
[echoproperties] #Ant properties
[echoproperties] #Thu Mar 24 09:51:26 PDT 2022
[echoproperties] java.specification.version=11
[echoproperties] java.runtime.version=11.0.11+9-Ubuntu-0ubuntu2.20.04
[echoproperties] java.class.path=/usr/share/ant/lib/ant-launcher.jar\:/usr/share/ant/lib/ant-jmf.jar\:/usr/share/ant/lib/ant-apache-bcel.jar\:/usr/share/ant/lib/ant.jar\:/usr/share/ant/lib/ant-commons-net.jar\:/usr/share/ant/lib/ant-javamail.jar\:/usr/share/ant/lib/ant-swing.jar\:/usr/share/ant/lib/ant-apache-oro.jar\:/usr/share/ant/lib/ant-apache-regexp.jar\:/usr/share/ant/lib/ant-launcher.jar\:/usr/share/ant/lib/ant-testutil.jar\:/usr/share/ant/lib/ant-apache-xalan2.jar\:/usr/share/ant/lib/ant-apache-log4j.jar\:/usr/share/ant/lib/ant-antlr.jar\:/usr/share/ant/lib/ant-junit.jar\:/usr/share/ant/lib/ant-apache-resolver.jar\:/usr/share/ant/lib/ant-xz.jar\:/usr/share/ant/lib/ant-jsch.jar\:/usr/share/ant/lib/ant-junit4.jar\:/usr/share/ant/lib/ant-apache-bsf.jar\:/usr/share/ant/lib/ant-jdepend.jar\:/usr/share/ant/lib/ant-commons-logging.jar
[echoproperties] java.vm.vendor=Ubuntu
[echoproperties] java.runtime.name=OpenJDK Runtime Environment
[echoproperties] java.vendor.url=https\://ubuntu.com/
[echoproperties] java.vm.name=OpenJDK 64-Bit Server VM
[echoproperties] java.vm.specification.version=11
[echoproperties] sun.java.launcher=SUN_STANDARD
[echoproperties] java.vendor.url.bug=https\://bugs.launchpad.net/ubuntu/+source/openjdk-lts
[echoproperties] sun.java.command=org.apache.tools.ant.launch.Launcher -cp  -f ex-condition.xml dump-java
[echoproperties] java.io.tmpdir=/tmp
[echoproperties] java.version=11.0.11
[echoproperties] java.specification.vendor=Oracle Corporation
[echoproperties] java.vm.specification.name=Java Virtual Machine Specification
[echoproperties] java.awt.printerjob=sun.print.PSPrinterJob
[echoproperties] java.version.date=2021-04-20
[echoproperties] java.home=/usr/lib/jvm/java-11-openjdk-amd64
[echoproperties] java.vm.compressedOopsMode=Zero based
[echoproperties] java.library.path=/usr/java/packages/lib\:/usr/lib/x86_64-linux-gnu/jni\:/lib/x86_64-linux-gnu\:/usr/lib/x86_64-linux-gnu\:/usr/lib/jni\:/lib\:/usr/lib
[echoproperties] ant.java.version=11
[echoproperties] java.specification.name=Java Platform API Specification
[echoproperties] java.vm.info=mixed mode, sharing
[echoproperties] java.vm.specification.vendor=Oracle Corporation
[echoproperties] java.vendor=Ubuntu
[echoproperties] java.vm.version=11.0.11+9-Ubuntu-0ubuntu2.20.04
[echoproperties] java.awt.graphicsenv=sun.awt.X11GraphicsEnvironment
[echoproperties] java.class.version=55.0

BUILD SUCCESSFUL
Total time: 0 seconds
```

Adding environment variables into properties, and we can add more flexibility to choose properties using environment variables.
ex-condition.xml version 2.
```xml
<?xml version="1.0"?>
<project name="TestAntCondition" default='all' basedir=".">
    <description>Test Ant</description>

    <property environment='env'/>
    <property name="src.dir" location="src/"/>
    <property name="dest.dir" location="build/"/>

    <target name="all" description="dump all properties">
        <echoproperties />
    </target>

    <!-- regex='\.dir' ant -f ex-condition.xml dump-env -->
    <target name="dump-env"
        description="dump properties that match pattern defined by ${env.regex}"
    >
        <echoproperties regex='${env.regex}' />
    </target>

</project>
```

Environment variables are added into properties
```sh
$ ant -f ex-condition.xml
Buildfile: /home/jasonz/codex/java/ant/ex-condition.xml

all:
[echoproperties] #Ant properties
[echoproperties] #Thu Mar 24 09:57:43 PDT 2022
[echoproperties] awt.toolkit=sun.awt.X11.XToolkit
[echoproperties] ant.library.dir=/usr/share/ant/lib
[echoproperties] env.TERM=xterm-256color
[echoproperties] java.specification.version=11
... extra lines are omitted
```

Use environment variable value as pattern to pick properties
```sh
$ regex='\.dir' ant -f ex-condition.xml dump-env
Buildfile: /home/jasonz/codex/java/ant/ex-condition.xml

dump-env:
[echoproperties] #Ant properties
[echoproperties] #Thu Mar 24 10:00:39 PDT 2022
[echoproperties] dest.dir=/home/jasonz/codex/java/ant/build
[echoproperties] ant.library.dir=/usr/share/ant/lib
[echoproperties] user.dir=/home/jasonz/codex/java/ant
[echoproperties] src.dir=/home/jasonz/codex/java/ant/src

BUILD SUCCESSFUL
Total time: 0 seconds
```

