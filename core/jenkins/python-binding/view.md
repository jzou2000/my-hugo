---
title: View
nav: view
---


|API|Description|
|:-----------|:------------------------|
|get_view_name(name)|Return the name of a view using the API.|
|assert_view_exists(name, exception_message|Raise an exception if a view does not exist|
|view_exists(name)|Check whether a view exists|
|get_views()|Get list of views running.|
|delete_view(name)|Delete Jenkins view permanently.|
|create_view(name, config_xml)|Create a new Jenkins view|
|reconfig_view(name, config_xml)|Change configuration of existing Jenkins view.|
|get_view_config(name)|Get configuration of existing Jenkins view.|

## working with views

```python
server.create_view('EMPTY', jenkins.EMPTY_VIEW_CONFIG_XML)
view_config = server.get_view_config('EMPTY')
views = server.get_views()
server.delete_view('EMPTY')
print views
```


## get_view_name(name)
Return the name of a view using the API.

That is roughly an identity method which can be used to quickly verify a view exists or is accessible without causing too much stress on the server side.

Parameters:
* name – View name, str

Returns:
* Name of view or None

## assert_view_exists(name, exception_message='view[%s] does not exist')
Raise an exception if a view does not exist

Parameters:	
* name – Name of Jenkins view, str
* exception_message – Message to use for the exception. Formatted with name

Throws:	
* JenkinsException whenever the view does not exist

## view_exists(name)
Check whether a view exists

Parameters:
* name – Name of Jenkins view, str

Returns:
* True if Jenkins view exists

## get_views()
Get list of views running.

Each view is a dictionary with ‘name’ and ‘url’ keys.

Returns:
* list of views, [ { str: str} ]

## delete_view(name)
Delete Jenkins view permanently.

Parameters:
* name – Name of Jenkins view, str

## create_view(name, config_xml)
Create a new Jenkins view

Parameters:	
* name – Name of Jenkins view, str
* config_xml – config file text, str

## reconfig_view(name, config_xml)
Change configuration of existing Jenkins view.

To create a new view, see Jenkins.create_view().

Parameters:	
* name – Name of Jenkins view, str
* config_xml – New XML configuration, str

## get_view_config(name)
Get configuration of existing Jenkins view.

Parameters:
* name – Name of Jenkins view, str

Returns:
* view configuration (XML format)
