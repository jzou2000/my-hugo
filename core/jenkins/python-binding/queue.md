---
title: Queue
nav: queue
---

|API|Description|
|:-----------|:------------------------|
|get_queue_item(number, depth=0)|Get information about a queued item (to-be-created job).|
|get_queue_info()||
|cancel_queue(id)|Cancel a queued build.|


## get_queue_item(number, depth=0)
Get information about a queued item (to-be-created job).

The returned dict will have a “why” key if the queued item is still waiting for an executor.

The returned dict will have an “executable” key if the queued item is running on an executor, or has completed running. Use this to determine the job number / URL.

Parameters:
* name – queue number, int

Returns:
* dictionary of queued information, dict

## get_queue_info()
Returns:
* list of job dictionaries, [dict]

Example::
```python
>>> queue_info = server.get_queue_info()
>>> print(queue_info[0])
{u'task': {u'url': u'http://your_url/job/my_job/', u'color': u'aborted_anime', u'name': u'my_job'}, u'stuck': False, u'actions': [{u'causes': [{u'shortDescription': u'Started by timer'}]}], u'buildable': False, u'params': u'', u'buildableStartMilliseconds': 1315087293316, u'why': u'Build #2,532 is already in progress (ETA:10 min)', u'blocked': True}
```

## cancel_queue(id)
Cancel a queued build.

Parameters:
* id – Jenkins job id number for the build, int
