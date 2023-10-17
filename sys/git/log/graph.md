---
title: Show Branches in Graph
nav: branch graph
---

Option ``-graph`` adds a nice little ASCII graph showing your branch and merge history:

```sh
$ git log --oneline --graph
*   dc9233c (HEAD -> master) merge branch chinese into master
|\  
| * 6be89ec (chinese) rev.3 in branch chinese
* | 63b80a9 rev.4 in master, 2 changes with one conflict with rev.3 in branch chinese
|/  
* 7c69103 rev.2 add a line in sample.txt
* 3a17ac5 rev.1 init
```
