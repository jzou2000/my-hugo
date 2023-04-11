---
title: Jira Filter
date: 2019-05-28
tags: [jira, filter]
---

## jira filter for plan

touchstone q4
```sql
filter='Touchstone unresolved' and fixVersion=2018.Q4
 order by priority desc, issuetype asc, issuekey  desc   
```

## Advanced JQL

SQL-like query expression

### Operators

|Operator|Description|
|------|-------------|
|``=,!=,>, >=, <, <=``|compare|
|``~, !~``|contains, not contains|
|``IS, IS NOT, IN, NOT IN``|assignee is empty|
|``WAS, WAS NOT, WAS IN, WAS NOT IN, CHANGED``||

Note:
* quote marks are optional for string if the value doesn't contain spaces
* wild-card: ``fixVersion ~ "9*"``
  * fuzzy search: similar spelling to roam ``roam~``
  * approixmate search: ``"atlassian jira"~10`` around 10 words between two words
  * exclude: ``-japan``
  * grouping: ``bug AND (atlassian OR jira)``
* CHANGED ``assignee CHANGED`` or ``status CHANGED FROM "In Progress" TO "Open"``

### Keywords
|Keyword|Example|Description|
|-------|-------|-----------|
|AND|||
|OR|||
|NOT|||
|EMPTY|``duedate is empty``||
|NULL|``duedate is null`` or ``duedate = null``||
|ORDER BY|``duedate = empty order by created, priority asc``||

### Functions

Most common functions [Full reference](https://confluence.atlassian.com/jirasoftwareserver0713/advanced-searching-functions-reference-965542862.html)

|Function|Example|Descrition|
|--------|-------|----------|
|currentUser()||
|endOfWeek()||also: Day,Month,Year|
|startOfWeek()||also: Day,Month,Year|
|linkedIssues()|``issue in linkedIssues(ABC-123,"is duplicated by")``|linkedIssues(key,type)|
|membersOf()|``assignee in membersOf(QA)``||
|now()|``duedate < now() and status not in (closed,resolved)``||
|openSprints()|||

### Fields
Common fields are: [full field ref](https://confluence.atlassian.com/jirasoftwareserver0713/advanced-searching-fields-reference-965542859.html)

|Name     |Type         |Example   |Description (supported operators)|
|:--------|:-----------:|:---------|:--------------------------------|
|assignee|USER|assignee=jsmith||
|category|CATEGORY|category="alpha project"|category belonged to (=, is, in)|
|comment|TEXT|commet ~ "waiting for customer"|text in comment (~)|
|component|COMPONENT|component in (comp1)|belong to a component (=, in)|
|created|DATE|created > "2010/12/12" and created < "-1w"|date created|
|creator|USER|creator = "John Smith" or creator = "bob@my.com||
|description|TEXT|description ~ 'see screenshot'|text in description (~)|
|due|DATE|due = "1d"|due tomorrow|
|"epic link"||"epic link" = ANERDS-31|epic name, id, key (=, in, is)|
|fixVersion|VERSION|fixVersion in ("3.14", "4.2")|version name, id|
|issueKey|ISSUE|issueKey=ABC-123|alias(id, issue, key), (=,is,in)|
|labels|LABEL|labels not in ("x")|(=,is,in)|
|originalEstimate|DURATION|orginalEstimate=1h||
|priority|PRIORITY|priority=High||
|project|PROJECT|project="ABC"|(=,is,in)|
|remainingEstimate|DURATION|remainingEstimate > 4h||
|reporter|USER|reporter=jjones||
|resolution|RESOLUTION|resolution in ("Cannot Reproduce", "Wont' Fix")|no resolution: resolution = unresolved|
|resolved|DATE|resolved > -1m|resolved in a month|
|sprint|NUMBER|sprint = "feb 1"|sprint name or id|
|status|STATUS|status=Open|name/id|
|summary|TEXT|summary ~ 'error saving file'|summary text (~, is)|
|text|TEXT|text ~ "Fred"|search text in summary,description,environemnt,comments|
|timeSpent|DURATION|timeSpent>5d||
|type|ISSUE_TYPE|issueType in (Bug,Improvement)|issue type name/id|
|updated|DAT|updated>"-2w"|updated in the last 2 weeks|
|watcher|USER|watcher="jsmith"|e.g. membersOf("Jira-administrators")|
|Watchers
|worklogAuthor|USER|||
|worklogComment|TEXT|||
|worklogDate|DATE|worklogDate > "2011/01/1" and worklogDate < "-1d"||
|workRatio|NUMBER|workRatio>75|more than 75%|


