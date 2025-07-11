---
title: A Simple Task
nav: simple task
---

pipeline ``dummy task``
```groovy
/*
This is a simple task that

* accepts parameters and show them: lable/string, debug/bool
* customerize build description: by parameter description
* last for a while (by parameter second) to simulate a real task
* return succeed or fail (by parameter TASKFAILS)

It is used to be called in sequence or parallel to fine tune different behaviors

*/

properties([
    parameters(
        [
            string(name: 'label', defaultValue: 'head', description: 'proudct label'),
            string(name: 'description', description: 'build description', trim: true),
            string(name: 'sleep', defaultValue: '5', description: 'seconds to sleep'),
            booleanParam(name: 'debug', description: 'debug build'),
            booleanParam(name: 'TASKFAILS', description: 'set task fail'),
        ]
	 )
])

if (params.description)
    currentBuild.description = params.description
pipeline {
    agent any
    stages {
        stage('dummy') {
            steps {
                script {
                    echo "dummy task: ${params.description}"
                    echo "label=${params.label}"
                    if (params.debug) echo "----debug mode---"
                    sleep "${params.sleep}"
                    if (params.TASKFAILS) error("task failed")
                }
            }
        }
    }
}
```