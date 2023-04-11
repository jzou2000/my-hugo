---
title: Promotion
nav: promotion
---

|API|Description|
|:-----------|:------------------------|
|get_promotion_name(name, job_name)|Return the name of a promotion using the API.|
|assert_promotion_exists(name, ...)|Raise an exception if a job lacks a promotion|
|promotion_exists(name, job_name)|Check whether a job has a certain promotion|
|get_promotions_info(job_name, depth=0)|Get promotion information dictionary of a job|
|get_promotions(job_name)|Get list of promotions running.|
|delete_promotion(name, job_name)|Delete Jenkins promotion permanently.|
|create_promotion(name, job_name, config_xml)|Create a new Jenkins promotion|
|reconfig_promotion(name, job_name, config_xml)|Change configuration of existing Jenkins promotion.|
|get_promotion_config(name, job_name)|Get configuration of existing Jenkins promotion.|

## get_promotion_name(name, job_name)
Return the name of a promotion using the API.

That is roughly an identity method which can be used to quickly verify a promotion exists for a job or is accessible without causing too much stress on the server side.

Parameters:	
* name – Promotion name, str
* job_name – Job name, str

Returns:	
* Name of promotion or None

## assert_promotion_exists(name, job_name, exception_message='promotion[%s] does not exist for job[%s]')
Raise an exception if a job lacks a promotion

Parameters:	
* name – Name of Jenkins promotion, str
* job_name – Job name, str
* exception_message – Message to use for the exception. Formatted with name and job_name

Throws:	
* JenkinsException whenever the promotion does not exist on a job

## promotion_exists(name, job_name)
Check whether a job has a certain promotion

Parameters:	
* name – Name of Jenkins promotion, str
* job_name – Job name, str

Returns:	
* True if Jenkins promotion exists

## get_promotions_info(job_name, depth=0)
Get promotion information dictionary of a job

Parameters:	
* job_name – job_name, str
* depth – JSON depth, int

Returns:	
* Dictionary of promotion info, dict

## get_promotions(job_name)
Get list of promotions running.

Each promotion is a dictionary with ‘name’ and ‘url’ keys.

Parameters:
* job_name – Job name, str

Returns:
* list of promotions, [ { str: str} ]


## delete_promotion(name, job_name)
Delete Jenkins promotion permanently.

Parameters:	
* name – Name of Jenkins promotion, str
* job_name – Job name, str

## create_promotion(name, job_name, config_xml)
Create a new Jenkins promotion

Parameters:	
* name – Name of Jenkins promotion, str
* job_name – Job name, str
* config_xml – config file text, str

## reconfig_promotion(name, job_name, config_xml)
Change configuration of existing Jenkins promotion.

To create a new promotion, see Jenkins.create_promotion().

Parameters:	
* name – Name of Jenkins promotion, str
* job_name – Job name, str
* config_xml – New XML configuration, str

## get_promotion_config(name, job_name)
Get configuration of existing Jenkins promotion.

Parameters:	
* name – Name of Jenkins promotion, str
* job_name – Job name, str

Returns:	
* promotion configuration (XML format)

