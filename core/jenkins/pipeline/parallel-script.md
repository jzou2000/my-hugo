---
title: Parallel Jobs in Script
nav: parallel script
---

**``parallel``** can be used as a function in a script.
It accepts a map of closure, where the key is the name of stage, and the closure is a snippet that starts a job.

```groovy {hl_lines="75"}
/*
run jobs in parallel

*/

properties([
    parameters(
        [
            string (name: 'DRV_LABEL', description: 'Product label'),
        ]
	)
])

job_base = 'Cloud/ODBC/Snowflake/poc'

def build_params = []
params.each {
    if (it.key ==~ /_LABEL/)
        build_params.add(string(name: "${it.key}", value: "${it.value}"))
}


job_list = [
    [
        name: 'build-win',
        pipeline: 'w2012r2-vs2015',
        parameters: [
            string(name: 'description', value: "build win: w2012r2"),
            string(name: 'COMPILER', value: 'vs2015'),
            string(name: 'BUILDTARGET', value: 'release'),
        ]
    ],

    [
        name: 'build-linux',
        pipeline: 'centos7-gcc5_5',
        parameters: [
            string(name: 'description', value: "build linux: centos7"),
            string(name: 'COMPILER', value: 'gcc5_5'),
            string(name: 'BUILDTARGET', value: 'debug'),
        ]
    ],

]

pipeline {
    agent none

    stages {
        stage('build-parallel') {
            steps {
                script {

                    def parallel_jobs = [:]     // a map of closures

                    for (job in job_list) {
                        def name = "${job.name}-${job.pipeline}"
                        // pitfall
                        // create these variables out of the scope of the closure
                        // otherwise the same clousre is created and you get only one job launched
                        def job_name = "${job_base}/${job.pipeline}"            // full job path
                        def job_params = build_params + job.parameters          // merge build+job parameters

                        parallel_jobs["${name}"] = {
                            // closure that launches a job
                            try {
                                build job: job_name, parameters: job_params
                            }
                            catch (err) {
                                print err
                                unstable message: "${STAGE_NAME} is unstable"
                            }
                        }
                    }
                    parallel parallel_jobs
                } // end script
            }
        }

    }
}
```