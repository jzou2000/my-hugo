---
title: String
nav: string
---

|Function |Usage by Example|Description|
|:--------|:---------------|:--------------|
|replace  |``replace $str "old" "new"``|replace all substr "old" in $str to "new"|
|trim     |``trim .Content "\t\n "``|remove all leading and pending whites from .Content|

Note
* ``trim .Content`` doesn't work, you must offset the set of **white**.

