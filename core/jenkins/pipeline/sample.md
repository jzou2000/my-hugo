---
title: Sample Pipeline
nav: sample
---

This is a very basic pipeline that accepts some parameters.
We can use it as a dummy job in some more complicated pipelines.

```groovy {hl_lines=[22]}
pipeline {
    agent any
    parameters {
        string name: 'description', description: 'customized build description'
        string name: "DRV_LABEL", defaultValue: "head", description: 'product label'
        choice name: 'target', choices: ['Release', 'Debug']
        choice(name: 'bitness', choices: ['64', '32'])
        booleanParam name: 'memory_check', description: 'if memory-check is enabled, valid only in Debug'
    }
    stages {
        stage('build') {
            steps {
                script {
                    echo "--------${env.BUILD_TAG}--------"
                    echo "This is a task that runs with following parameters:"
                    echo "DRV_LABEL=${params.DRV_LABEL}"
                    echo "target=${params.target}"
                    echo "bitness=${params.bitness}"
                    echo "memory-check=${params.memory_check}"
                    echo "--------------------------"
                    echo "BUILD_URL=${env.BUILD_URL}"
                    currentBuild.description = "${params.description}"
                }
            }
        }
    }
}
```

Note:
* ``currentBuild.description`` is used to set build description, which is helpful to distinguish builds.
  Another property is ``currentBuild.displayName``, which is less common to override default build number.

  ![current-build-properties](../current-build-properties.png)


