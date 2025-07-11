---
title: Here Doc
nav: heredoc
---

Simple case

```bash

cat << EOF
some text
more text
EOF

```

Use in pipes

```bash

cat << EOF |
some text
more text
EOF
grep some

```

or alternatively

```bash
cat << EOF | grep some
some text
more text
EOF

```
