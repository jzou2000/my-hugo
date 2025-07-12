---
title: Build
nav: build
---


|API|Description|
|:-----------|:------------------------|
|get_build_info(name, number, depth=0)|Get build information dictionary.|
|get_build_env_vars(name, number, depth=0)|Get build environment variables.|
|get_build_test_report(name, number, depth=0)|Get test results report.|
|set_next_build_number(name, number)|Set a job’s next build number.|
|stop_build(name, number)|Stop a running Jenkins build.|
|delete_build(name, number)|Delete a Jenkins build.|
|get_running_builds()|Return list of running builds.|
|get_build_console_output(name, number)|Get build console text.|


## get_build_info(name, number, depth=0)
Get build information dictionary.

Parameters:	
* name – Job name, str
* number – Build number, int
* depth – JSON depth, int

Returns:	
* dictionary of build information, dict

Example:

```python
>>> next_build_number = server.get_job_info('build_name')['nextBuildNumber']
>>> output = server.build_job('build_name')
>>> from time import sleep; sleep(10)
>>> build_info = server.get_build_info('build_name', next_build_number)
>>> print(build_info)
{u'building': False, u'changeSet': {u'items': [{u'date': u'2011-12-19T18:01:52.540557Z', u'msg': u'test', u'revision': 66, u'user': u'unknown', u'paths': [{u'editType': u'edit', u'file': u'/branches/demo/index.html'}]}], u'kind': u'svn', u'revisions': [{u'module': u'http://eaas-svn01.i3.level3.com/eaas', u'revision': 66}]}, u'builtOn': u'', u'description': None, u'artifacts': [{u'relativePath': u'dist/eaas-87-2011-12-19_18-01-57.war', u'displayPath': u'eaas-87-2011-12-19_18-01-57.war', u'fileName': u'eaas-87-2011-12-19_18-01-57.war'}, {u'relativePath': u'dist/eaas-87-2011-12-19_18-01-57.war.zip', u'displayPath': u'eaas-87-2011-12-19_18-01-57.war.zip', u'fileName': u'eaas-87-2011-12-19_18-01-57.war.zip'}], u'timestamp': 1324317717000, u'number': 87, u'actions': [{u'parameters': [{u'name': u'SERVICE_NAME', u'value': u'eaas'}, {u'name': u'PROJECT_NAME', u'value': u'demo'}]}, {u'causes': [{u'userName': u'anonymous', u'shortDescription': u'Started by user anonymous'}]}, {}, {}, {}], u'id': u'2011-12-19_18-01-57', u'keepLog': False, u'url': u'http://eaas-jenkins01.i3.level3.com:9080/job/build_war/87/', u'culprits': [{u'absoluteUrl': u'http://eaas-jenkins01.i3.level3.com:9080/user/unknown', u'fullName': u'unknown'}], u'result': u'SUCCESS', u'duration': 8826, u'fullDisplayName': u'build_war #87'}
```

## get_build_env_vars(name, number, depth=0)
Get build environment variables.

Parameters:	
* name – Job name, str
* number – Build number, int
* depth – JSON depth, int

Returns:	
* dictionary of build env vars, dict or None for workflow jobs, or if InjectEnvVars plugin not installed

## get_build_test_report(name, number, depth=0)
Get test results report.

Parameters:	
* name – Job name, str
* number – Build number, int

Returns:	
* dictionary of test report results, dict or None if there is no Test Report

## set_next_build_number(name, number)
Set a job’s next build number.

The current next build number is contained within the job information retrieved using Jenkins.get_job_info(). If the specified next build number is less than the last build number, Jenkins will ignore the request.

Note that the Next Build Number Plugin must be installed to enable this functionality.

Parameters:	
* name – Name of Jenkins job, str
* number – Next build number to set, int

Example:

```python
>>> next_bn = server.get_job_info('job_name')['nextBuildNumber']
>>> server.set_next_build_number('job_name', next_bn + 50)
```

## stop_build(name, number)
Stop a running Jenkins build.

Parameters:	
* name – Name of Jenkins job, str
* number – Jenkins build number for the job, int

## delete_build(name, number)
Delete a Jenkins build.

Parameters:	
* name – Name of Jenkins job, str
* number – Jenkins build number for the job, int


## get_running_builds()
Return list of running builds.

Each build is a dict with keys ‘name’, ‘number’, ‘url’, ‘node’, and ‘executor’.

Returns:
* List of builds, [ { str: str, str: int, str:str, str: str, str: int} ]

Example::

```python
>>> builds = server.get_running_builds()
>>> print(builds)
[{'node': 'foo-slave', 'url': 'https://localhost/job/test/15/',
  'executor': 0, 'name': 'test', 'number': 15}]
```

## get_build_console_output(name, number)
Get build console text.

Parameters:	
* name – Job name, str
* number – Build number, int

Returns:	
* Build console output, str

