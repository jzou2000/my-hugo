---
title: Revision
nav: revision
---



## Notations

**``@``**

: ``@`` alone is a shorthand for ``HEAD``


**``[<ref>]@{<date>}``**

: e.g. ``master@{yesterday}``, ``HEAD@{5 minutes ago}``


**``<ref>@{<n>}``**

: n-th prior value of that ref

**``@{n}``**

: empty ref means the current branch. For example,
: if you are on branch ``blabla`` then ``@{1}`` means the same as ``blabla@{1}``.


**``@{-<n>}, e.g. @{-1}``**

: the n-th branch/commit checked out before the current one.


**``<rev>^[<n>], e.g. HEAD^, v1.5.1^0``**

: A suffix ``^`` to a revision parameter means the first parent of that commit object.
: ``^<n>`` means the n-th parent (i.e. ``<rev>^`` is equivalent to ``<rev>^1``).
: As a special rule, ``<rev>^0`` means the commit itself and is used
: when ``<rev>`` is the object name of a tag object that refers to a commit object.


**``<rev>~[<n>], e.g. HEAD~, master~3``**

: A suffix ``~`` to a revision parameter means the first parent of that commit object.
: A suffix ``~<n>`` to a revision parameter means the commit object that is
: the n-th **generation ancestor** of the named commit object,
: following only the first parents.
: I.e. ``<rev>~3`` is equivalent to ``<rev>^^^`` which is equivalent to ``<rev>^1^1^1``.


**``<rev>^{<type>}, e.g. v0.99.8^{commit}``**

: A suffix ``^`` followed by an object type name enclosed in brace pair
: means dereference the object at ``<rev>`` recursively until an object of type ``<type>``
: is found or the object cannot be dereferenced anymore (in which case, barf).
: For example, if ``<rev>`` is a commit-ish, ``<rev>^{commit}`` describes
: the corresponding commit object. Similarly, if ``<rev>`` is a tree-ish,
: ``<rev>^{tree}`` describes the corresponding tree object.
: ``<rev>^0`` is a short-hand for ``<rev>^{commit}``.


Note:

* <rev>^{object} can be used to make sure <rev> names an object that exists, without requiring <rev> to be a tag, and without dereferencing <rev>; because a tag is already an object, it does not have to be dereferenced even once to get to an object.

* <rev>^{tag} can be used to ensure that <rev> identifies an existing tag object.

* <rev>^{}, e.g. v0.99.8^{}
A suffix ^ followed by an empty brace pair means the object could be a tag, and dereference the tag recursively until a non-tag object is found.

* <rev>^{/<text>}, e.g. HEAD^{/fix nasty bug}
A suffix ^ to a revision parameter, followed by a brace pair that contains a text led by a slash, is the same as the :/fix nasty bug syntax below except that it returns the youngest matching commit which is reachable from the <rev> before ^.

* :/<text>, e.g. :/fix nasty bug
A colon, followed by a slash, followed by a text, names a commit whose commit message matches the specified regular expression. This name returns the youngest matching commit which is reachable from any ref, including HEAD. The regular expression can match any part of the commit message. To match messages starting with a string, one can use e.g. :/^foo. The special sequence :/! is reserved for modifiers to what is matched. :/!-foo performs a negative match, while :/!!foo matches a literal ! character, followed by foo. Any other sequence beginning with :/! is reserved for now. Depending on the given text, the shell’s word splitting rules might require additional quoting.

* <rev>:<path>, e.g. HEAD:README, master:./README
A suffix : followed by a path names the blob or tree at the given path in the tree-ish object named by the part before the colon. A path starting with ./ or ../ is relative to the current working directory. The given path will be converted to be relative to the working tree’s root directory. This is most useful to address a blob or tree from a commit or tree that has the same tree structure as the working tree.

* :[<n>:]<path>, e.g. :0:README, :README
A colon, optionally followed by a stage number (0 to 3) and a colon, followed by a path, names a blob object in the index at the given path. A missing stage number (and the colon that follows it) names a stage 0 entry. During a merge, stage 1 is the common ancestor, stage 2 is the target branch’s version (typically the current branch), and stage 3 is the version from the branch which is being merged



## Goto a specific revision

```sh
$ git checkout <revision-sha1|tag|...>
$ # go back to the latest revision (assume in master branch)
$ git checkout master
```



Note
* [what does tree-ish mean?](https://stackoverflow.com/questions/4044368/what-does-tree-ish-mean-in-git)
