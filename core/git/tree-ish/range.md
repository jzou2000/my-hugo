---
title: Revision Range
nav: range
---

**``<ref>``**

: Include commits that are reachable from ``<rev>`` (i.e. ``<rev>`` and its ancestors).


**``^<rev>``**

: To **exclude** commits reachable from a commit, a prefix ``^`` notation is used.


**``<rev1>..<rev2>``**

: it is a shorthand of ``^<rev1> <rev2>`` as it is so often, which means commits reachable
: from ``<rev2>`` but exclude the ones reachable from ``<rev1>``
: (i.e. ``<rev1>`` and its ancestors).
: When either ``<rev1>`` or ``<rev2>`` is omitted, it defaults to ``HEAD``.



**``<rev1>...<rev2>``**

: Include commits that are reachable from either ``<rev1>`` or ``<rev2>``
: but exclude those that are reachable from both.
: When either ``<rev1>`` or ``<rev2>`` is omitted, it defaults to ``HEAD``.


**``<rev>^@, e.g. HEAD^@``**

: A suffix ``^`` followed by an at sign ``@`` is the same as
: listing all parents of ``<rev>`` (meaning, include anything reachable from its parents,
: but not the commit itself).


**``<rev>^!, e.g. HEAD^!``**

: A suffix ``^`` followed by an exclamation mark ``!`` is the same as
: giving commit ``<rev>`` and all its parents prefixed with ``^``
: to exclude them (and their ancestors).


**``<rev>^-<n>, e.g. HEAD^-, HEAD^-2``**

: Equivalent to <rev>^<n>..<rev>, with <n> = 1 if not given.

