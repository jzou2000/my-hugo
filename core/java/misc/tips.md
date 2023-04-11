---
title: Tips
nav: tips
---

## Get JVM Version at Runtime

java.version is a system property that exists in every JVM. There are two possible formats for it:

* Java 8 or lower: 1.6.0_23, 1.7.0, 1.7.0_80, 1.8.0_211
* Java 9 or higher: 9.0.1, 11.0.4, 12, 12.0.1

```java
private static int getVersion() {
    String version = System.getProperty("java.version");
    if(version.startsWith("1.")) {
        version = version.substring(2, 3);
    } else {
        int dot = version.indexOf(".");
        if(dot != -1) { version = version.substring(0, dot); }
    } return Integer.parseInt(version);
}
```

