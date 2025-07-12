---
title: Pipeline Syntax
nav: syntax
---

## Declarative Pipeline

```jenkins
pipeline {
    /*
    sections: agent, post, stages, steps
    */
}
```

|Catalog   |Tag     |Description|
|:---------|:----------|:---------------|
|[Sections](https://www.jenkins.io/doc/book/pipeline/syntax/#declarative-sections)|     |contain one or more Directives or Steps.|
|        |[agent](https://www.jenkins.io/doc/book/pipeline/syntax/#agent)|can be top or stage leve|
|        |[post](https://www.jenkins.io/doc/book/pipeline/syntax/#post) |one or more additional steps that are run upon the completion of a Pipeline’s or stage’s run|
|        |[stages](https://www.jenkins.io/doc/book/pipeline/syntax/#stages)|Containing a sequence of one or more stage directives|
|        |[steps](https://www.jenkins.io/doc/book/pipeline/syntax/#steps)|a series of one or more steps to be executed in a given stage directive|
|        |matrix||
|[Directives](https://www.jenkins.io/doc/book/pipeline/syntax/#declarative-directives)|   ||
|    |[environment](https://www.jenkins.io/doc/book/pipeline/syntax/#environment)|a sequence of key-value pairs|
|    |[options](https://www.jenkins.io/doc/book/pipeline/syntax/#options)|configuring Pipeline-specific options from within the Pipeline itself|
|    |[parameters](https://www.jenkins.io/doc/book/pipeline/syntax/#parameters)| a list of parameters that a user should provide when triggering the Pipeline|
|    |[triggers](https://www.jenkins.io/doc/book/pipeline/syntax/#triggers)|the automated ways in which the Pipeline should be re-triggered. (Jenkins cron syntax)|
|    |[stage](https://www.jenkins.io/doc/book/pipeline/syntax/#stage)|goes in the stages section and should contain a steps section|
|    |[tools](https://www.jenkins.io/doc/book/pipeline/syntax/#tools)|tools to auto-install and put on the PATH|
|    |[input](https://www.jenkins.io/doc/book/pipeline/syntax/#input)|on a stage allows you to prompt for input, using the input step|
|    |[when](https://www.jenkins.io/doc/book/pipeline/syntax/#when)|allows the Pipeline to determine whether the stage should be executed depending on the given condition|


Tags are allowed in blocks

|Tag         |pipeline|stage|steps|matrix|
|:-----------|:------:|:---:|:---:|:----:|
|agent       |x       |x    |     |x     |
|environments|x       |x    |     |      |
|option      |x       |x    |     |      |
|parameter   |x       |     |     |      |
|matrix      |        |x    |     |      |
|when        |        |x    |     |x     |
|triggers    |x       |     |     |      |
|tools       |x       |     |     |      |
|input       |        |x    |     |      |
|parallel    |        |x    |     |      |



