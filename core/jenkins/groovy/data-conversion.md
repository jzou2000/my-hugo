---
title: Data Conversion
nav: data conversion
---

## String to Integer

Typically, convert a **string parameter** (there's no number parameter)
or an **environment variable** (e.g. BUILD_NUMBER) to an integer,
then use the integer value in script condition or calculation.

```groovy {hl_lines=["8"]}
pipeline {
    agent any

    stages {
        stage('test') {
            steps {
                script {
                    def n = Integer.parseInt(BUILD_NUMBER)
                    // alternatively, n = Integer.valueOf(BUILD_NUMBER)
                    //
                    // at least from v2.5+, groovy supports 
                    //     n = BUILD_NUMBER as Integer
                    // but above expression is not supported in Jenkins groovy DSL
                    if (n == 1) {
                        echo "First time run this pipeline"
                    } else {
                        echo "Well done, you've known it. BUILD_NUMBER=${n}"
                    }
                }
            }
        }
    }
}
```

