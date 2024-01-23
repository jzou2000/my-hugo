---
title: Run Task in Sequence - Simple Case
nav: sequence simple
---

```groovy
/*
Call three tasks in sequence, without any control
the 2nd task fails, which leads the whole built abort.
*/


pipeline {
    agent none
    
    stages {
        stage('task 1') {
            steps {
                build job: 'dummy task',
                      parameters: [
                        string(name: 'description', value: 'setup'),
                      ]
            }
        }

        stage('task 2') {
            steps {
                build job: 'dummy task',
                      parameters: [
                        string(name: 'description', value: 'do the real work'),
                        string(name: 'sleep', value: '3'),
                        booleanParam(name: 'TASKFAILS', value: true),
                      ]
            }
        }

        stage('task 3') {
            steps {
                build job: 'dummy task',
                      parameters: [
                        string(name: 'description', value: 'cleanup'),
                      ]
            }
        }

    }
}
```


Output
```txt
[2023-12-03T19:30:12.803Z] Started by user Jason Zou
[2023-12-03T19:30:12.803Z] Rebuilds build #4
[2023-12-03T19:30:12.861Z] [Pipeline] Start of Pipeline
[2023-12-03T19:30:13.164Z] [Pipeline] stage
[2023-12-03T19:30:13.180Z] [Pipeline] { (task 1)
[2023-12-03T19:30:13.270Z] [Pipeline] build
[2023-12-03T19:30:13.287Z] Scheduling project: Cloud » ODBC » Snowflake » prove of concept » dummy task
[2023-12-03T19:30:18.571Z] Starting building: Cloud » ODBC » Snowflake » prove of concept » dummy task #24
[2023-12-03T19:30:24.826Z] Build Cloud » ODBC » Snowflake » prove of concept » dummy task #24 completed: SUCCESS
[2023-12-03T19:30:24.843Z] [Pipeline] }
[2023-12-03T19:30:24.905Z] [Pipeline] // stage
[2023-12-03T19:30:24.966Z] [Pipeline] stage
[2023-12-03T19:30:24.983Z] [Pipeline] { (task 2)
[2023-12-03T19:30:25.056Z] [Pipeline] build
[2023-12-03T19:30:25.071Z] Scheduling project: Cloud » ODBC » Snowflake » prove of concept » dummy task
[2023-12-03T19:30:33.566Z] Starting building: Cloud » ODBC » Snowflake » prove of concept » dummy task #25
[2023-12-03T19:30:38.018Z] Build Cloud » ODBC » Snowflake » prove of concept » dummy task #25 completed: FAILURE
[2023-12-03T19:30:38.083Z] [Pipeline] }
[2023-12-03T19:30:38.169Z] [Pipeline] // stage
[2023-12-03T19:30:38.250Z] [Pipeline] stage
[2023-12-03T19:30:38.266Z] [Pipeline] { (task 3)
[2023-12-03T19:30:38.304Z] Stage "task 3" skipped due to earlier failure(s)
[2023-12-03T19:30:38.336Z] [Pipeline] }
[2023-12-03T19:30:38.427Z] [Pipeline] // stage
[2023-12-03T19:30:38.511Z] [Pipeline] End of Pipeline
[2023-12-03T19:30:38.546Z] Cloud » ODBC » Snowflake » prove of concept » dummy task #25 completed with status FAILURE (propagate: false to ignore)
[2023-12-03T19:30:38.546Z] org.jenkinsci.plugins.workflow.actions.ErrorAction$ErrorId: 62e8cabb-a5c1-4498-9b62-0791aafb1e2a
[2023-12-03T19:30:38.596Z] Finished: FAILURE
```