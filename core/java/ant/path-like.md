---
title: path-like 
---

```xml
<path id='base.path'>
    <pathelement path='${classpath}'/>
    <pathelement path='${env.PATH}'/>
    <fileset dir='lib'>
        <include name='**/*.jar'/>
    </fileset>
</path>
```

```xml
<classpath id='class.path'>
    <pathelement location='classes'/>
    <pathelement path='${env.CLASSPATH}'/>
    <fileset dir='lib'>
        <include name='**/*.jar'/>
        <exclude name='j8/*.jar'/>
    </fileset>
</path>
```

* location: single path element
* path: os-dependent list of paths, e.g. ``path1:path2:path3``
* ``${toString: path_ref}`` convert path-like to OS-spec string
  ```xml
  <path id="lib.path.ref">
    <fileset dir="lib" includes="*.jar"/>
  </path>
  <javac srcdir="src" destdir="classes">
    <compilerarg arg="-Xbootclasspath/p:${toString:lib.path.ref}"/>
  </javac>
  ```

