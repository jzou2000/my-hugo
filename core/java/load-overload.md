---
title: Java - Load A Class and/or Overload A Class On the Fly
date: 2019-06-18
nav: dynamicly load class
tags: [java, load, overload, on-the-fly]
---

Loading a class on-the-fly (or at runtime) is required in the following scenarios:
* plug-in architecture - the function is offered by external modules.
* supplement or replace existing functions

In this example, an application has several classes, an alternative module contains
more classes that will replace or extend the application existing classes, depends
on the order of searching path.

## File Structure
```ini
expkg/              # root of the project
src/                # source of the app
  ex/overload/      # the package
     Factory.java   # class factory, main entrance
     Motor.java     # base class
     Honda.java     # one derived Motor
     Kawasaki.java  # another derived Motor

src-alt/            # a loadable plugin
  ex/overload/      # the package
     Kawasaki.java  # duplicated name, implemented differently
     Yamaha.java    # another derived Motor, not exist in the original app

build.xml           # build ant script

# followings are created by build.xml
build/              # build output for src/
build-alt/          # build output for src-alt
exo.jar             # output of app
ex2.jar             # output of src-alt
```

## The Main Application

Factory.java
```java
// Factory.java
package ex.overload;

import ex.overload.Motor;
import java.util.*;
import java.lang.reflect.*;

public class Factory {
	
	Map<String, String> maker;

	public Factory() {
		maker = new HashMap<String, String>();
		maker.put("cbr", "Honda");
		maker.put("ninja", "Kawasaki");
		maker.put("street", "Harley");
		maker.put("r3", "Yamaha");
	}
	public Object create(String name) {
		try {
			String maker_name = maker.get(name);
			if (maker_name == null) {
				return new Motor(name);
			}
			Class<?> clazz = Class.forName("ex.overload." + maker_name);
			Constructor<?> ctor = clazz.getConstructor(String.class);
			return ctor.newInstance(name);
		}
		catch (ClassNotFoundException e) {
			return new Motor("(" + maker.get(name) + ")." + name);
		}
		catch (Exception e) {
			return "Error: " + e;
		}
	}
	
	public static void main(String[] args) {
		System.out.println("Start");
		List<String> names = new ArrayList<String>();
		names.add("hello");
		names.add("world");
		for (String s : args) {
			names.add(s);
		}
		Factory factory = new Factory();
		for (String s : names) {
			Object o = factory.create(s);
			System.out.println("    "  + o);
		}
		System.out.println("End");
	}

}
```

Motor.java
```java
// Motor.java
package ex.overload;

public class Motor {

	String m_name;
	
	public Motor(String name) {
		m_name = name;
	}

	public String toString() {
		return m_name;
	}
	
}

```

Honda.java
```java
// Honda.java
package ex.overload;
import ex.overload.Motor;
public class Honda extends Motor {

	public Honda(String name)  {
		super("Honda." + name);
	}

}

```

Kawasaki.jva
```java
// Kawasaki.java
package ex.overload;

public class Kawasaki extends Motor {

	public Kawasaki(String name) {
		super("Kawasaki." + name + " is green");
	}

}

```


## The Plug-in

The second version of Kawasaki.java
```java
// Kawasaki.java
package ex.overload;

public class Kawasaki extends Motor {

	public Kawasaki(String name) {
		super("Kawasaki." + name + " is black now");
	}

}

```

A new motocycle maker.
```java
// Yamaha.java
package ex.overload;

public class Yamaha extends Motor {

	public Yamaha(String name) {
		super("Yamaha." + name + " is an instrument?");
	}

}

```

## Build Ant

The ant build script (```build.xml```) is at the root of the project

```xml
<?xml version="1.0"?>
<project name="expkg" default="info">

  <property name="src.dir" value="src" />
  <property name="build.dir" value="build" />

  <property name="src-alt.dir" value="src-alt" />
  <property name="build-alt.dir" value="build-alt" />

  <property name="lib.dir" value="." />
  <path id="classpath">
    <fileset dir="${lib.dir}" includes="**/*.jar"/>
  </path>




  <target name="info">
    <echo>Hello, ant</echo>
  </target>

  <target name="build">
    <mkdir dir="${build.dir}"/>
    <javac destdir="${build.dir}" includeAntRuntime="false">
	  <src path="${src.dir}"/>
	</javac>
  </target>

  <target name="jar" depends="build">
    <jar destfile="exo.jar"
	   basedir="${build.dir}">

	   <!-- this makes executable jar by setting
	     Main-Class = entry class of the application -->
	   <manifest>
	     <attribute name="Main-Class" value="ex.overload.Factory" />
	   </manifest>

	</jar>
  </target>

  <target name="build-alt" depends="jar">
    <mkdir dir="${build-alt.dir}"/>
    <javac destdir="${build-alt.dir}" classpathref="classpath" includeAntRuntime="false">
	  <src path="${src-alt.dir}"/>
	</javac>
  </target>

  <target name="alt" depends="build-alt">
    <jar destfile="ex2.jar"
	   basedir="${build-alt.dir}">
	</jar>
  </target>

  <target name="clean">
    <delete dir="build" />
    <delete dir="build-alt" />
    <delete>
	  <fileset dir="." includes="*.jar" />
	</delete>
  </target>

</project>
```


Run to build
```bash
$ ant alt
Buildfile: /mnt/huge/jzou/codex/java/expkg/build.xml

build:
    [mkdir] Created dir: /mnt/huge/jzou/codex/java/expkg/build
    [javac] Compiling 4 source files to /mnt/huge/jzou/codex/java/expkg/build

jar:
      [jar] Building jar: /mnt/huge/jzou/codex/java/expkg/exo.jar

build-alt:
    [mkdir] Created dir: /mnt/huge/jzou/codex/java/expkg/build-alt
    [javac] Compiling 2 source files to /mnt/huge/jzou/codex/java/expkg/build-alt

alt:
      [jar] Building jar: /mnt/huge/jzou/codex/java/expkg/ex2.jar

BUILD SUCCESSFUL
Total time: 0 seconds

```

## Run the Application

Run exo.jar alone

```bash
$ java -jar exo.jar cbr ninja r3
Start
    hello
    world
    Honda.cbr
    Kawasaki.ninja is green
    (Yamaha).r3
End
```

Run exo.jar and ex2.jar, ex2.jar is loaded after exo.jar.

```bash
$ java -cp exo.jar:ex2.jar ex.overload.Factory cbr ninja r3
Start
    hello
    world
    Honda.cbr
    Kawasaki.ninja is green
    Yamaha.r3 is an instrument?
End

```
Notice that ``-cp`` and ``-jar`` are not supported in the same time (``-jar`` ignores ``-cp``),
if we want to load two (or more) jars, the simplest way is to use ``-cp`` only. In this case,
entrance class is required.

Load ex2.jar before exo.jar. This time Kawasaki is the version in the plugin.

```bash
$ java -cp ex2.jar:exo.jar ex.overload.Factory cbr ninja r3
Start
    hello
    world
    Honda.cbr
    Kawasaki.ninja is black now
    Yamaha.r3 is an instrument?
End

```