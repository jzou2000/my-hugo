---
title: od
nav: od
---
od - dump files in octal and other formats.

## Common Options

|option|description|
|:-----|:------------|
|j,--skip-bytes=BYTES|skip BYTES input|
|-N,--read-bytes=BYTES|limit dump to BYTES input bytes|
|-t,--format=Type|output format|
||a: named character|
||c: printable character or backslash escaped|
||d[SIZE]: signed decimal|
||f[SIZE]: floating point|
||o[SIZE]: octal|
||u[SIZE]: unsigned decimal|
||x[SIZE]: hexadecimal|
|-a|same as -t a|
|-b|same as -t o1|
|-c|same as -t c|
|-d|same as -t u2|
|-f|same as -t fF|
|-i|same as -t dI|
|-l|same as -t dL|
|-o|same as -t o2|
|-s|same as -t d2|
|-x|same as -t x2|
|-w,--width=BYTES|output BYTES bytes per output line, 32 by default|

