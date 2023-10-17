---
title: Variables
nav: vars
---

## Page Variables
|variable|Description|
|:-------|:-----------------|
|.Ancestors|a stack of ancestors, starts from root ``/``|
|.CurrentSection|page: the section it belongs to, section: itself|
|.FirstSection|the section that directly below root, i.e. the 2nd item in ancestors stack|
|.Parent|parent the current page/section belongs to|
|.Pages|one level below this, regular pages and sections|
|.RegularPages|regular pages directly below to this section|
|.Sections|sections directly below to this section|
|.Permalink|link of this page/section|

### recipes
* check section is toplevel  
  ``eq 1 .Ancestors.Len`` or  
  ``eq .FirstSection .CurrentSection``
