---
title: Overview
nav: overview
weight: 1
---

Reference
* [document](https://python-jenkins.readthedocs.io/)


## Install

```sh
pip install python-jenkins
```



## Usage

```python

import jenkins

SERVER = 'https://jsen.isw.com'
USERNAME = 'jason.zou@isw.com'
PASSWORD = '12434323424331313212'

server = jenkins.Jenkins(SERVER, username=USERNAME, password=PASSWORD)

# get list of top-level jobs
jobs = server.get_jobs()

```

### working with folders
```python
server.create_job('folder', jenkins.EMPTY_FOLDER_XML)
server.create_job('folder/empty', jenkins.EMPTY_FOLDER_XML)
server.copy_job('folder/empty', 'folder/empty_copy')
server.delete_job('folder/empty_copy')
server.delete_job('folder')
```