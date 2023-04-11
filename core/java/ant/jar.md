---
title: jar
---

A typical **jar** task that generates a jar file. 

  ```xml
  <jar destfile='filename.jar'
       basedir='base/of/class'
       includes='com/sample/**/*.class'
  >

    <!-- manifest that is used for executable jar -->
    <manifest>
      <attribute name="Main-Class" 
        value="com.sample.StartClass"/>
    </manifest>

    <!-- optional -->

    <!-- other folder -->
    <fileset dir='other/folder'
             includes='**/*.class'
    />
    <!-- other folder with prefix -->
    <zipfileset dir='other/folder2'
            prefix='other/prefix'
             includes='**/*.class'
    />
    <!-- files in a jar/zip file -->
    <zipfileset src='other/depend/lib.jar'
             includes='**/*.class'
    />

  </jar>
  ```
  
