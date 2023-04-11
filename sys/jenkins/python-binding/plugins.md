---
title: Plugins
nav: plugins
---

|API|Description|
|:-----------|:------------------------|
|get_plugins_info(depth=2)|Get all installed plugins information on this Master.|
|get_plugin_info(name, depth=2)|Get an installed plugin information on this Master.|
|get_plugins(depth=2)|Return plugins info using helper class for version comparison|
|install_plugin(name, include_dependencies=True)|Install a plugin and its dependencies from the Jenkins public repository|
|||
|||
|||
|||
|||
|||
|||
|||


## get_plugins_info(depth=2)
Get all installed plugins information on this Master.

This method retrieves information about each plugin that is installed on master returning the raw plugin data in a JSON format.

Deprecated since version 0.4.9: Use get_plugins() instead.

Parameters:
* depth – JSON depth, int

Returns:
* info on all plugins [dict]

Example:

```python
>>> info = server.get_plugins_info()
>>> print(info)
[{u'backupVersion': None, u'version': u'0.0.4', u'deleted': False,
u'supportsDynamicLoad': u'MAYBE', u'hasUpdate': True,
u'enabled': True, u'pinned': False, u'downgradable': False,
u'dependencies': [], u'url':
u'http://wiki.jenkins-ci.org/display/JENKINS/Gearman+Plugin',
u'longName': u'Gearman Plugin', u'active': True, u'shortName':
u'gearman-plugin', u'bundled': False}, ..]
```

## get_plugin_info(name, depth=2)
Get an installed plugin information on this Master.

This method retrieves information about a specific plugin and returns the raw plugin data in a JSON format. The passed in plugin name (short or long) must be an exact match.

Note

Calling this method will query Jenkins fresh for the information for all plugins on each call. If you need to retrieve information for multiple plugins it’s recommended to use get_plugins() instead, which will return a multi key dictionary that can be accessed via either the short or long name of the plugin.

Parameters:	
* name – Name (short or long) of plugin, str
* depth – JSON depth, int

Returns:	
* a specific plugin dict

Example:

```python
>>> info = server.get_plugin_info("Gearman Plugin")
>>> print(info)
{u'backupVersion': None, u'version': u'0.0.4', u'deleted': False,
u'supportsDynamicLoad': u'MAYBE', u'hasUpdate': True,
u'enabled': True, u'pinned': False, u'downgradable': False,
u'dependencies': [], u'url':
u'http://wiki.jenkins-ci.org/display/JENKINS/Gearman+Plugin',
u'longName': u'Gearman Plugin', u'active': True, u'shortName':
u'gearman-plugin', u'bundled': False}
```

## get_plugins(depth=2)
Return plugins info using helper class for version comparison

This method retrieves information about all the installed plugins and uses a Plugin helper class to simplify version comparison. Also uses a multi key dict to allow retrieval via either short or long names.

When printing/dumping the data, the version will transparently return a unicode string, which is exactly what was previously returned by the API.

Parameters:
* depth – JSON depth, int

Returns:
* info on all plugins [dict]

Example:

```python
>>> j = Jenkins()
>>> info = j.get_plugins()
>>> print(info)
{('gearman-plugin', 'Gearman Plugin'):
  {u'backupVersion': None, u'version': u'0.0.4',
   u'deleted': False, u'supportsDynamicLoad': u'MAYBE',
   u'hasUpdate': True, u'enabled': True, u'pinned': False,
   u'downgradable': False, u'dependencies': [], u'url':
   u'http://wiki.jenkins-ci.org/display/JENKINS/Gearman+Plugin',
   u'longName': u'Gearman Plugin', u'active': True, u'shortName':
   u'gearman-plugin', u'bundled': False}, ...}
```

## install_plugin(name, include_dependencies=True)
Install a plugin and its dependencies from the Jenkins public repository at http://repo.jenkins-ci.org/repo/org/jenkins-ci/plugins

Parameters:	
* name – The plugin short name, string
* include_dependencies – Install the plugin’s dependencies, bool

Returns:	
* Whether a Jenkins restart is required, bool

Example::

```python
>>> info = server.install_plugin("jabber")
>>> print(info)
True
```
