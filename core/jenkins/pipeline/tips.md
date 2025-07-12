---
title: Tips
nav: tips
---

* in ``environment`` section of pipeline, values have to be either quoted strings or function calls, variables are **NOT** accepted
  ```jenkinsfile
  label = "v1.0"
  pipeline {
    environment {
        PRODUCT = "touch"
        LABEL = "${label}"
        TYPE = get_type()

        // failure
        // LABEL = label
    }
  }
  ```
* in ``environment`` section of pipeline, each item uses a line, **without comma ``,``**
  ```jenkinsfile
  pipeline {
    environment {
        PRODUCT = "touch"
        LABEL = "${label}"
        // not this
        // LABEL = "${label}",
        TYPE = get_type()
    }
  }
  ```
* global variables shouldn't be defined with ``def``
  ```jenkinsfile
  def a = 'hello'
  b = 'world'

  def foo()
  {
        echo "${a}"         // a is not available
        echo "${b}"         // OK
  }
  ```

