---
title: Run Task in Sequence - catchError
nav: sequence catchError
---

```groovy
/*
Call three tasks in sequence, catch error
The 2nd task fails, but the whole build continues.
The whole build still fails.
*/


pipeline {
    agent none
    
    stages {
        stage('task 1') {
            steps {
                catchError {
                    build job: 'dummy task',
                          parameters: [
                            string(name: 'description', value: 'setup'),
                          ]
                }
            }
        }

        stage('task 2') {
            steps {
                catchError {
                    build job: 'dummy task',
                          parameters: [
                            string(name: 'description', value: 'do the real work'),
                            string(name: 'sleep', value: '3'),
                            booleanParam(name: 'TASKFAILS', value: true),
                          ]
                }
            }
        }

        stage('task 3') {
            steps {
                catchError {
                    build job: 'dummy task',
                          parameters: [
                            string(name: 'description', value: 'cleanup'),
                          ]
                }
            }
        }

    }
}
```

The output
```txt
11:39:07 Started by user Jason Zou
11:39:07 [Pipeline] Start of Pipeline
11:39:07 [Pipeline] stage
11:39:07 [Pipeline] { (task 1)
11:39:08 [Pipeline] catchError
11:39:08 [Pipeline] {
11:39:08 [Pipeline] build (Building Cloud » ODBC » Snowflake » prove of concept » dummy task)
11:39:08 Scheduling project: Cloud » ODBC » Snowflake » prove of concept » dummy task
11:39:13 Starting building: Cloud » ODBC » Snowflake » prove of concept » dummy task #26
11:39:19 Build Cloud » ODBC » Snowflake » prove of concept » dummy task #26 completed: SUCCESS
11:39:19 [Pipeline] }
11:39:19 [Pipeline] // catchError
11:39:19 [Pipeline] }
11:39:20 [Pipeline] // stage
11:39:20 [Pipeline] stage
11:39:20 [Pipeline] { (task 2)
11:39:20 [Pipeline] catchError
11:39:20 [Pipeline] {
11:39:20 [Pipeline] build (Building Cloud » ODBC » Snowflake » prove of concept » dummy task)
11:39:20 Scheduling project: Cloud » ODBC » Snowflake » prove of concept » dummy task
11:39:28 Starting building: Cloud » ODBC » Snowflake » prove of concept » dummy task #27
11:39:33 Build Cloud » ODBC » Snowflake » prove of concept » dummy task #27 completed: FAILURE
11:39:33 [Pipeline] }
11:39:33 Cloud » ODBC » Snowflake » prove of concept » dummy task #27 completed with status FAILURE (propagate: false to ignore)
11:39:33 org.jenkinsci.plugins.workflow.actions.ErrorAction$ErrorId: 303d2d37-885e-4b97-9d76-4e0a000d57bd
11:39:33 [Pipeline] // catchError
11:39:33 [Pipeline] }
11:39:33 [Pipeline] // stage
11:39:33 [Pipeline] stage
11:39:33 [Pipeline] { (task 3)
11:39:33 [Pipeline] catchError
11:39:33 [Pipeline] {
11:39:33 [Pipeline] build (Building Cloud » ODBC » Snowflake » prove of concept » dummy task)
11:39:33 Scheduling project: Cloud » ODBC » Snowflake » prove of concept » dummy task
11:39:43 Starting building: Cloud » ODBC » Snowflake » prove of concept » dummy task #28
11:39:49 Build Cloud » ODBC » Snowflake » prove of concept » dummy task #28 completed: SUCCESS
11:39:49 [Pipeline] }
11:39:49 [Pipeline] // catchError
11:39:49 [Pipeline] }
11:39:50 [Pipeline] // stage
11:39:50 [Pipeline] End of Pipeline
11:39:50 Finished: FAILURE
```