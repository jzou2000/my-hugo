---
title: Parallel Jobs in Declarative Pipeline
nav: parallel delarative
---


Run several jobs (for example, multiple instances of [sample pipeline](../sample/)) in parallel, with some common parameters (e.g. DRV_LABEL)
and preset other parameters. Of course you can run different pipelines with different ``job`` name.
This is quite common in a release build, run one or more pipelines with different parameters.

By setting build description, it is easier to find different build when multiple instances is used
with a single pipeline.

```groovy {hl_lines=["8"]}
pipeline {
    agent none
    parameters {
        string name: "DRV_LABEL", defaultValue: "head", description: 'product label'
    }
    stages {
        stage('build-parallel') {
            parallel {
                stage('release-64') {
                    steps {
                        build job: 'task dump', parameters: [
                            string(name: 'description', value: 'release-64'),
                            string(name: 'DRV_LABEL', value: "${params.DRV_LABEL}"),
                            string(name: 'target', value: 'Release'),
                            string(name: 'bitness', value: '64'),
                            booleanParam(name: 'memory_check', value: false)
                            ]
                    }
                }
                
                stage('release-32') {
                    steps {
                        build job: 'task dump', parameters: [
                            string(name: 'description', value: 'release-32'),
                            string(name: 'DRV_LABEL', value: "${params:DRV_LABEL}"),
                            string(name: 'target', value: 'Release'),
                            string(name: 'bitness', value: '32'),
                            ]
                    }
                }

                stage('debug-32-mem') {
                    steps {
                        build job: 'task dump', parameters: [
                            string(name: 'description', value: 'debug-32-mem'),
                            string(name: 'DRV_LABEL', value: "${params:DRV_LABEL}"),
                            string(name: 'target', value: 'Debug'),
                            string(name: 'bitness', value: '32'),
                            booleanParam(name: 'memory_check', value: true)
                            ]
                    }
                }

            } // end of parallel
        }
    }
}
```

