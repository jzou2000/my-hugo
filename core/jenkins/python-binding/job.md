---
title: Job
nav: job
---

|API|Description|
|:-----------|:------------------------|
|get_job_info(name, depth=0, fetch_all_builds=False)|Get job information dictionary|
|get_job_info_regex(pattern, depth=0, folder_depth=0)|Get a list of jobs information that contain names which match the
regex pattern.|
|get_job_name(name)|Return the name of a job using the API.|
|debug_job_info(job_name)|Print out job info in more readable format.|
|get_jobs(folder_depth=0, view_name=None)|Get list of jobs.|
|get_all_jobs(folder_depth=None)|Get list of all jobs recursively to the given folder depth.|
|copy_job(from_name, to_name)|Copy a Jenkins job.|
|rename_job(from_name, to_name)|Rename an existing Jenkins job|
|delete_job(name)|Delete Jenkins job permanently.|
|enable_job(name)|Enable Jenkins job.|
|disable_job(name)|Disable Jenkins job.|
|job_exists(name)|Check whether a job exists|
|jobs_count()|Get the number of jobs on the Jenkins server|
|assert_job_exists(name, exception_message='job[%s] does not exist')|Raise an exception if a job does not exist|
|create_job(name, config_xml)|Create a new Jenkins job|
|get_job_config(name)|Get configuration of existing Jenkins job.|
|reconfig_job(name, config_xml)|Change configuration of existing Jenkins job.|
|build_job_url(name, parameters=None, token=None)|Get URL to trigger build job.|
|build_job(name, parameters=None, token=None)|Trigger build job.|
|wipeout_job_workspace(name)|Wipe out workspace for given Jenkins job.|



## working with job

```python
server.create_job('empty', jenkins.EMPTY_CONFIG_XML)
jobs = server.get_jobs()
print jobs
my_job = server.get_job_config('cool-job')
print(my_job) # prints XML configuration
server.build_job('empty')
server.disable_job('empty')
server.copy_job('empty', 'empty_copy')
server.enable_job('empty_copy')
server.reconfig_job('empty_copy', jenkins.RECONFIG_XML)

server.delete_job('empty')
server.delete_job('empty_copy')

# build a parameterized job
# requires creating and configuring the api-test job to accept 'param1' & 'param2'
server.build_job('api-test', {'param1': 'test value 1', 'param2': 'test value 2'})
last_build_number = server.get_job_info('api-test')['lastCompletedBuild']['number']
build_info = server.get_build_info('api-test', last_build_number)
print build_info

# get all jobs from the specific view
jobs = server.get_jobs(view_name='View Name')
print jobs
```






## get_job_info(name, depth=0, fetch_all_builds=False)

Get job information dictionary.

Parameters:	

* name – Job name, str
* depth – JSON depth, int
* fetch_all_builds – If true, all builds will be retrieved from Jenkins. Otherwise,  Jenkins will only return the most recent 100 builds. This comes at the expense of an additional API call which may return significant amounts of data. bool

Returns:
* dictionary of job information

## get_job_info_regex(pattern, depth=0, folder_depth=0)

Get a list of jobs information that contain names which match the
regex pattern.

Parameters:	
* pattern – regex pattern, str
* depth – JSON depth, int
* folder_depth – folder level depth to search int

Returns:	
* List of jobs info, list


## get_job_name(name)

Return the name of a job using the API.

That is roughly an identity method which can be used to quickly verify a job exists or is accessible without causing too much stress on the server side.

Parameters:
* name – Job name, str

Returns:
* Name of job or None

## debug_job_info(job_name)

Print out job info in more readable format.

## get_jobs(folder_depth=0, view_name=None)

Get list of jobs.

Each job is a dictionary with ‘name’, ‘url’, ‘color’ and ‘fullname’ keys.

If the view_name parameter is present, the list of jobs will be limited to only those configured in the specified view. In this case, the job dictionary ‘fullname’ key would be equal to the job name.

Parameters:	
* folder_depth – Number of levels to search, int. By default 0, which will limit search to toplevel. None disables the limit.
* view_name – Name of a Jenkins view for which to retrieve jobs, str. By default, the job list is not limited to a specific view.

Returns:	
* list of jobs, [{str: str, str: str, str: str, str: str}]

Example:

```python
>>> jobs = server.get_jobs()
>>> print(jobs)
[{
    u'name': u'all_tests',
    u'url': u'http://your_url.here/job/all_tests/',
    u'color': u'blue',
    u'fullname': u'all_tests'
}]
```


## get_all_jobs(folder_depth=None)

Get list of all jobs recursively to the given folder depth.

Each job is a dictionary with ‘name’, ‘url’, ‘color’ and ‘fullname’ keys.

Parameters:
* folder_depth – Number of levels to search, int. By default None, which will search all levels. 0 limits to toplevel.
Returns:
* list of jobs, [ { str: str} ]

Note

On instances with many folders it may be more efficient to use the run_script method to retrieve all jobs instead.

Example:

```python
server.run_script("""
    import groovy.json.JsonBuilder;

    // get all projects excluding matrix configuration
    // as they are simply part of a matrix project.
    // there may be better ways to get just jobs
    items = Jenkins.instance.getAllItems(AbstractProject);
    items.removeAll {
      it instanceof hudson.matrix.MatrixConfiguration
    };

    def json = new JsonBuilder()
    def root = json {
      jobs items.collect {
        [
          name: it.name,
          url: Jenkins.instance.getRootUrl() + it.getUrl(),
          color: it.getIconColor().toString(),
          fullname: it.getFullName()
        ]
      }
    }

    // use json.toPrettyString() if viewing
    println json.toString()
    """)
```


## copy_job(from_name, to_name)

Copy a Jenkins job.

Will raise an exception whenever the source and destination folder for this jobs won’t be the same.

Parameters:	
* from_name – Name of Jenkins job to copy from, str
* to_name – Name of Jenkins job to copy to, str

Throws:	
* JenkinsException whenever the source and destination folder are not the same

## rename_job(from_name, to_name)

Rename an existing Jenkins job

Will raise an exception whenever the source and destination folder for this jobs won’t be the same.

Parameters:	
* from_name – Name of Jenkins job to rename, str
* to_name – New Jenkins job name, str

Throws:	
* JenkinsException whenever the source and destination folder are not the same

## delete_job(name)

Delete Jenkins job permanently.

Parameters:
* name – Name of Jenkins job, str

## enable_job(name)

Enable Jenkins job.

Parameters:
* name – Name of Jenkins job, str

## disable_job(name)
Disable Jenkins job.

To re-enable, call Jenkins.enable_job().

Parameters:
* name – Name of Jenkins job, str

## job_exists(name)
Check whether a job exists

Parameters:
* name – Name of Jenkins job, str

Returns:
* True if Jenkins job exists

## jobs_count()
Get the number of jobs on the Jenkins server

Returns:
* Total number of jobs, int

Note

On instances with many folders it may be more efficient to use the run_script method to retrieve the total number of jobs instead.

Example:

```python
# get all projects excluding matrix configuration
# as they are simply part of a matrix project.
server.run_script(
    "print(Hudson.instance.getAllItems("
    "    hudson.model.AbstractProject).count{"
    "        !(it instanceof hudson.matrix.MatrixConfiguration)"
    "    })")
```


## assert_job_exists(name, exception_message='job[%s] does not exist')

Raise an exception if a job does not exist

Parameters:	
* name – Name of Jenkins job, str
* exception_message – Message to use for the exception. Formatted with name

Throws:	
* JenkinsException whenever the job does not exist

## create_job(name, config_xml)
Create a new Jenkins job

Parameters:	
* name – Name of Jenkins job, str
* config_xml – config file text, str

## get_job_config(name)
Get configuration of existing Jenkins job.

Parameters:
* name – Name of Jenkins job, str
Returns:
* job configuration (XML format)


## reconfig_job(name, config_xml)
Change configuration of existing Jenkins job.

To create a new job, see Jenkins.create_job().

Parameters:	
* name – Name of Jenkins job, str
* config_xml – New XML configuration, str


## build_job_url(name, parameters=None, token=None)
Get URL to trigger build job.

Authenticated setups may require configuring a token on the server side.

Use list of two membered tuples to supply parameters with multi select options.

Parameters:	
* name – Name of Jenkins job, str
* parameters – parameters for job, or None., dict or list of two membered tuples
* token – (optional) token for building job, str

Returns:	
* URL for building job

## build_job(name, parameters=None, token=None)
Trigger build job.

This method returns a queue item number that you can pass to Jenkins.get_queue_item(). Note that this queue number is only valid for about five minutes after the job completes, so you should get/poll the queue information as soon as possible to determine the job’s URL.

Parameters:	
* name – name of job
* parameters – parameters for job, or None, dict
* token – Jenkins API token

Returns:	
* int queue item

## wipeout_job_workspace(name)
Wipe out workspace for given Jenkins job.

Parameters:
* name – Name of Jenkins job, str

