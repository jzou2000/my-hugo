---
title: Misc
nav: misc
---


|API|Description|
|:-----------|:------------------------|
|get_info(item='', query=None)|Get information on this Master or item on Master.|
|get_whoami(depth=0)|Get information about the user account that authenticated to Jenkins.|
|get_version()|Get the version of this Master.|
|quiet_down()|Prepare Jenkins for shutdown.|
|run_script(script, node=None)|Execute a groovy script on the jenkins master or on a node if specified..|
|wait_for_normal_op(timeout)|Wait for jenkins to enter normal operation mode.|

## get_info(item='', query=None)
Get information on this Master or item on Master.

This information includes job list and view information and can be used to retreive information on items such as job folders.

Parameters:	
* item – item to get information about on this Master
* query – xpath to extract information about on this Master

Returns:	
* dictionary of information about Master or item, dict

Example:

```python
>>> info = server.get_info()
>>> jobs = info['jobs']
>>> print(jobs[0])
{u'url': u'http://your_url_here/job/my_job/', u'color': u'blue',
u'name': u'my_job'}
```

## get_whoami(depth=0)
Get information about the user account that authenticated to Jenkins. This is a simple way to verify that your credentials are correct.

Returns:
* Information about the current user dict

Example:

```python
>>> me = server.get_whoami()
>>> print me['fullName']
>>> 'John'
```


## get_version()
Get the version of this Master.

Returns:
* This master’s version number str

Example:

```python
>>> info = server.get_version()
>>> print info
>>> 1.541
```

## quiet_down()
Prepare Jenkins for shutdown.

No new builds will be started allowing running builds to complete prior to shutdown of the server.

## run_script(script, node=None)
Execute a groovy script on the jenkins master or on a node if specified..

Parameters:	
* script – The groovy script, string
* node – Node to run the script on, defaults to None (master).

Returns:	
* The result of the script run.

Example::

```python
>>> info = server.run_script("println(Jenkins.instance.pluginManager.plugins)")
>>> print(info)
u'[Plugin:windows-slaves, Plugin:ssh-slaves, Plugin:translation,
Plugin:cvs, Plugin:nodelabelparameter, Plugin:external-monitor-job,
Plugin:mailer, Plugin:jquery, Plugin:antisamy-markup-formatter,
Plugin:maven-plugin, Plugin:pam-auth]'
```



## wait_for_normal_op(timeout)
Wait for jenkins to enter normal operation mode.

Parameters:
* timeout – number of seconds to wait, int Note this is not the same as the connection timeout set via __init__ as that controls the socket timeout. Instead this is how long to wait until the status returned.

Returns:
* True if Jenkins became ready in time, False otherwise.

Setting timeout to be less than the configured connection timeout may result in this waiting for at least the connection timeout length of time before returning. It is recommended that the timeout here should be at least as long as any set connection timeout.

