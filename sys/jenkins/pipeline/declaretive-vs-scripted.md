---
Title: Declarative Pipeline vs Scripted Pipeline
nav: declarative vs scripted
---

Pipeline can be declarative, which is newer and preferred, however scripted pipeline is needed for following reasons:

* called in functions (e.g. shared libraries)
* size limit
* complicated structures

## Declarative Pipeline

```jenkinsfile
pipeline {
    // top block of pipeline
    agent {
        label "agent label"
    }

    stages {
        stage('stage-name') {
            steps {
                echo "run stage: ${stage}"
                
                // optional if you want some limited script
                script {

                }
            }
        }
    }
}
```

### agent can be used only in declarative pipelines


## Scripted Pipeline

```jenkinsfile
node {

    environment {

    }

    stage {
        echo "actions"
        if (condtion)
    }
}

node("agent label") {

    stage {
        echo "actions"
    }
}

```