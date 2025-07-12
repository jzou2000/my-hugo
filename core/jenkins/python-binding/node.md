---
title: Node
nav: node
---



|API|Description|
|:-----------|:------------------------|
|get_nodes(depth=0)|Get a list of nodes connected to the Master|
|get_node_info(name, depth=0)|Get node information dictionary|
|node_exists(name)|Check whether a node exists|
|assert_node_exists(name, exception_message='node[%s] does not exist')|Raise an exception if a node does not exist|
|delete_node(name)|Delete Jenkins node permanently.|
|disable_node(name, msg='')|Disable a node|
|enable_node(name)|Enable a node|
|create_node(name, ...)|Create a node|
|get_node_config(name)|Get the configuration for a node.|
|reconfig_node(name, config_xml)|Change the configuration for an existing node.|


## working with nodes

```python
server.create_node('slave1')
nodes = get_nodes()
print nodes
node_config = server.get_node_info('slave1')
print node_config
server.disable_node('slave1')
server.enable_node('slave1')

# create node with parameters
params = {
    'port': '22',
    'username': 'juser',
    'credentialsId': '10f3a3c8-be35-327e-b60b-a3e5edb0e45f',
    'host': 'my.jenkins.slave1'
}
server.create_node(
    'slave1',
    nodeDescription='my test slave',
    remoteFS='/home/juser',
    labels='precise',
    exclusive=True,
    launcher=jenkins.LAUNCHER_SSH,
    launcher_params=params)
```

## get_nodes(depth=0)
Get a list of nodes connected to the Master

Each node is a dict with keys ‘name’ and ‘offline’

Returns:
* List of nodes, [ { str: str, str: bool} ]

## get_node_info(name, depth=0)
Get node information dictionary

Parameters:	
* name – Node name, str
* depth – JSON depth, int

Returns:	
* Dictionary of node info, dict

## node_exists(name)
Check whether a node exists

Parameters:
* name – Name of Jenkins node, str

Returns:
* True if Jenkins node exists

## assert_node_exists(name, exception_message='node[%s] does not exist')
Raise an exception if a node does not exist

Parameters:
* name – Name of Jenkins node, str
* exception_message – Message to use for the exception. Formatted with name

Throws:	
* JenkinsException whenever the node does not exist

## delete_node(name)
Delete Jenkins node permanently.

Parameters:
* name – Name of Jenkins node, str

## disable_node(name, msg='')
Disable a node

Parameters:	
* name – Jenkins node name, str
* msg – Offline message, str

## enable_node(name)
Enable a node

Parameters:
* name – Jenkins node name, str

## create_node(name, numExecutors=2, nodeDescription=None, remoteFS='/var/lib/jenkins', labels=None, exclusive=False, launcher='hudson.slaves.CommandLauncher', launcher_params={})
Create a node

Parameters:	
* name – name of node to create, str
* numExecutors – number of executors for node, int
* nodeDescription – Description of node, str
* remoteFS – Remote filesystem location to use, str
* labels – Labels to associate with node, str
* exclusive – Use this node for tied jobs only, bool
* launcher – The launch method for the slave, jenkins.LAUNCHER_COMMAND, jenkins.LAUNCHER_SSH, jenkins.LAUNCHER_JNLP, jenkins.LAUNCHER_WINDOWS_SERVICE
* launcher_params – Additional parameters for the launcher, dict


## get_node_config(name)
Get the configuration for a node.

Parameters:
* name – Jenkins node name, str

## reconfig_node(name, config_xml)
Change the configuration for an existing node.

Parameters:	
* name – Jenkins node name, str
* config_xml – New XML configuration, str

