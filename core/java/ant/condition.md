---
title: Condition
nav: condition
---

## condition
Set a property ``prop`` according to the condition
```xml
<condition property='prop'
    value='value when condition is true' else='value when condition is false'>

    <isset property='another.prop'/>
</condition>
```
Note:
* if attribute ``else`` is absent, the property is **NOT** set when condition fails
* if attribute ``value`` is absent, the property is set to 'true' when condition is true
* ``<condition>`` only works when the property is **NOT** set.

Most common conditions
* os
  ```xml
  <os family='windows'/>
  <!-- family: windows, mac, unix, ...
       optional: name, arch, version
  -->
  ```
* equals
  ```xml
  <equals arg1='${property.to.be.checked}' arg2='value'/>
  <!-- optional casesensitive=true, trim=false, forecstring=false -->
  ```
* isset
  ```xml
  <isset property='name-of-property'/>
  <isset property='env.my_var'>                  <!-- error: property='${env.my_var'} -->
  ```
* and-or-not
  ```xml
  <!-- is macos but not macosx -->
  <and>
    <os family='mac'/>
    <not>
        <os family='unix'/>
    </not>
  </and>
  ```
* available
  ```xml
  <available file='path/to/file'/>
  ```
* contains
  ```xml
  <contains string='Hello, world' substring='hello' casesensitive='false'>
  ```
* istrue, isfalse - if value equals to 'true', 'yes' (or 'false', 'no')
  ```xml
  <istrue value='${some.property}'/>
  ```
* length
  ```xml
  <length string='  foo  ' trim='true' length='3'/>
  ```
* matches
  ```xml
  <!-- contains at least one digit -->
  <matches pattern='[1-9]' string='${var}'/>
  <!-- optional: casesensitive=true, multiline=false, singleline=false -->
  ```
* hasmethod
  ```xml
  <hasmethod classname="java.util.ArrayList" method="trimToSize"/>
  ```
* others, see [ant manual: conditions](https://ant.apache.org/manual/Tasks/conditions.html)

## Recipes

* set ``src.path`` differently for os (windows, osx, and others)
  ```xml
  <condition property='src.path' value='/src/windows'>
      <os family='windows'/>
  </condition>
  <condition property='src.path' value='/src/mac'>
      <os family='mac'/>
  </condition>
  <condition property='src.path' value='/src/unix'>
      <not>
        <isset property='src.path'/>
      </not>
  </condition>
  ```
  Because ``condition`` only works if the property is not set, following code doesn't work.
  ```xml
  <condition property='src.path' value='/src/windows' else='unix'>
      <os family='windows'/>
  </condition>
  <!-- src.path is set, it won't be reset by following -->
  <condition property='src.path' value='/src/mac'>
      <os family='mac'/>
  </condition>
  ```


Advanced condition

```xml
    <condition property='ar.dir' value='${env.AR_DIR}'>
        <isset property='env.AR_DIR'/>
    </condition>

    <condition property='ar.dir' value='${env.NFS_DIR}'>
        <and>
            <not>
                <isset property='ar.dir'/>
            </not>
            <isset property='env.NFS_DIR'/>
        </and>
    </condition>
```
Because properties are **immutable**, above snippet can be simplified as
```xml
    <condition property='ar.dir' value='${env.AR_DIR}'>
        <isset property='env.AR_DIR'/>
    </condition>

    <condition property='ar.dir' value='${env.NFS_DIR}'>
        <isset property='env.NFS_DIR'/>
    </condition>
```


```sh
jasonz@VANLWIN0056:~/codex/java/ant$ regex='\.dir' AR_DIR=/mnt/builds/SEN NFS_DIR=/nfs ant -f ex-condition.xml dump-env
Buildfile: /home/jasonz/codex/java/ant/ex-condition.xml

dump-env:
[echoproperties] #Ant properties
[echoproperties] #Thu Mar 24 10:14:15 PDT 2022
[echoproperties] dest.dir=/home/jasonz/codex/java/ant/build
[echoproperties] ant.library.dir=/usr/share/ant/lib
[echoproperties] ar.dir=/mnt/builds/SEN
[echoproperties] user.dir=/home/jasonz/codex/java/ant
[echoproperties] src.dir=/home/jasonz/codex/java/ant/src

BUILD SUCCESSFUL
Total time: 0 seconds
jasonz@VANLWIN0056:~/codex/java/ant$ regex='\.dir' aAR_DIR=/mnt/builds/SEN NFS_DIR=/nfs ant -f ex-condition.xml dump-env
Buildfile: /home/jasonz/codex/java/ant/ex-condition.xml

dump-env:
[echoproperties] #Ant properties
[echoproperties] #Thu Mar 24 10:14:21 PDT 2022
[echoproperties] dest.dir=/home/jasonz/codex/java/ant/build
[echoproperties] ant.library.dir=/usr/share/ant/lib
[echoproperties] ar.dir=/nfs
[echoproperties] user.dir=/home/jasonz/codex/java/ant
[echoproperties] src.dir=/home/jasonz/codex/java/ant/src

BUILD SUCCESSFUL
Total time: 0 seconds
```
