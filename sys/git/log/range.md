---
title: Range
nav: range
---


## By Revision

``rev1..rev2``

: revision from ``rev1`` (excluded) to ``rev2`` (included)


``rev~`` and ``rev^``

: Suffix `~` to a revision parameter means the parent of that commit object.
``rev~<n>`` means the **n-th generation** ancestor of ``rev``.

: Suffix ``^`` also means the parent of the commit object, so ``rev^`` is the same with ``rev~``.
However, ``rev^<n>`` means the **n-th parent** if ``rev`` has multiple parents,
such as a merging commit.


``rev^..rev``

: Show only ``rev``, i.e. between ``before rev`` to ``rev``, or equivalent to ``rev -1``

## By Time

``--since``

: ``--since=2.weeks`` commits in the last 2 weeks


``--until``

: ``--until=2008-01-05`` commits until the date 2008-01-05

