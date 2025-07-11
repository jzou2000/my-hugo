---
title: Collection
nav: collection
---

|Function |Usage|Description|
|:--------|:-------------|:--------------|
|index    |``index $slice 2``|2nd element of $slice|
|         |``index $map "b"``|``$map[b]``|
|first    |``first n $col``|first n elements of $col|
|after    |``after 2 $slice``|slice from 3rd|
|slice    |``$slice := slice "a" "b" "c"``|generate a slice/list with elements a, b, c|
|map      |``$map := dict "a" 100 "b" 200``|generate a map with key/value (a: 100), (b: 200)|
