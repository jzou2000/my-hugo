---
title: when - execute stage with conditions
nav: when
---

## A Simple Example

```groovy {hl_lines=["11-13","20-22","29-31"]}
pipeline {
    agent any
    
    parameters {
        booleanParam name: 'Windows', description: 'run on Windows'
        choice name: 'Target', choices: ['release', 'debug'], description: 'build target'
    }
    
    stages {
        stage('windows-only') {
            when {
                expression { params.Windows == true }
            }
            steps {
                echo "the task runs on Windows ------------------"
            }
        }
        
        stage('debug-only') {
            when {
                expression { params.Target == 'debug' }
            }
            steps {
                echo "the task runs in debug mode"
            }
        }
 
        stage('windows-debug-only') {
            when {
                expression { params.Target == 'debug' && params.Windows == true }
            }
            steps {
                echo "the task runs in debug mode on Windows !!!!!!!!!!!!!!!!"
            }
        }
 
 
    }
}
```

## Output

only ``debug`` is selected

```txt {hl_lines=[14]}
[2023-12-05T00:02:27.134Z] Started by user Jason Zou
[2023-12-05T00:02:27.186Z] [Pipeline] Start of Pipeline
[2023-12-05T00:02:27.330Z] [Pipeline] node
[2023-12-05T00:02:27.334Z] Running on b2-sol114x86v1-03 in /export/home/bamboo/jk/workspace/DDP/Playground/when
[2023-12-05T00:02:27.347Z] [Pipeline] {
[2023-12-05T00:02:27.377Z] [Pipeline] stage
[2023-12-05T00:02:27.377Z] [Pipeline] { (windows-only)
[2023-12-05T00:02:27.410Z] Stage "windows-only" skipped due to when conditional
[2023-12-05T00:02:27.411Z] [Pipeline] }
[2023-12-05T00:02:27.443Z] [Pipeline] // stage
[2023-12-05T00:02:27.463Z] [Pipeline] stage
[2023-12-05T00:02:27.463Z] [Pipeline] { (debug-only)
[2023-12-05T00:02:27.487Z] [Pipeline] echo
[2023-12-05T00:02:27.487Z] the task runs in debug mode
[2023-12-05T00:02:27.492Z] [Pipeline] }
[2023-12-05T00:02:27.512Z] [Pipeline] // stage
[2023-12-05T00:02:27.528Z] [Pipeline] stage
[2023-12-05T00:02:27.528Z] [Pipeline] { (windows-debug-only)
[2023-12-05T00:02:27.548Z] Stage "windows-debug-only" skipped due to when conditional
[2023-12-05T00:02:27.548Z] [Pipeline] }
[2023-12-05T00:02:27.565Z] [Pipeline] // stage
[2023-12-05T00:02:27.585Z] [Pipeline] }
[2023-12-05T00:02:27.607Z] [Pipeline] // node
[2023-12-05T00:02:27.633Z] [Pipeline] End of Pipeline
[2023-12-05T00:02:27.719Z] Finished: SUCCESS
```

Windows + debug

```txt {hl_lines=[9,15,21]}
[2023-12-05T00:02:54.115Z] Started by user Jason Zou
[2023-12-05T00:02:54.170Z] [Pipeline] Start of Pipeline
[2023-12-05T00:02:54.325Z] [Pipeline] node
[2023-12-05T00:02:54.329Z] Running on b2-sol114x86v1-03 in /export/home/bamboo/jk/workspace/DDP/Playground/when
[2023-12-05T00:02:54.341Z] [Pipeline] {
[2023-12-05T00:02:54.369Z] [Pipeline] stage
[2023-12-05T00:02:54.369Z] [Pipeline] { (windows-only)
[2023-12-05T00:02:54.402Z] [Pipeline] echo
[2023-12-05T00:02:54.402Z] the task runs on Windows ------------------
[2023-12-05T00:02:54.406Z] [Pipeline] }
[2023-12-05T00:02:54.424Z] [Pipeline] // stage
[2023-12-05T00:02:54.439Z] [Pipeline] stage
[2023-12-05T00:02:54.439Z] [Pipeline] { (debug-only)
[2023-12-05T00:02:54.461Z] [Pipeline] echo
[2023-12-05T00:02:54.461Z] the task runs in debug mode
[2023-12-05T00:02:54.466Z] [Pipeline] }
[2023-12-05T00:02:54.483Z] [Pipeline] // stage
[2023-12-05T00:02:54.498Z] [Pipeline] stage
[2023-12-05T00:02:54.498Z] [Pipeline] { (windows-debug-only)
[2023-12-05T00:02:54.522Z] [Pipeline] echo
[2023-12-05T00:02:54.522Z] the task runs in debug mode on Windows !!!!!!!!!!!!!!!!
[2023-12-05T00:02:54.526Z] [Pipeline] }
[2023-12-05T00:02:54.544Z] [Pipeline] // stage
[2023-12-05T00:02:54.558Z] [Pipeline] }
[2023-12-05T00:02:54.572Z] [Pipeline] // node
[2023-12-05T00:02:54.586Z] [Pipeline] End of Pipeline
[2023-12-05T00:02:54.669Z] Finished: SUCCESS
```