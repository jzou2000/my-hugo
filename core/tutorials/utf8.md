---
title: utf8 encoding
nav: utf8
---

|Bytes|Unicode Range         |Byte 1   |Byte 2     |Byte 3     |Byte 4    |Byte 5  |Byte 6   |char#                        |
|:----|:---------------------|:--------|:----------|:----------|:---------|:-------|:--------|----------------------------:|
|1    |U+0000 ~ U+007F       |0xxxxxxx |           |           |          |        |         |128                          |
|     |                      |0 ~ 7F   |           |           |          |        |         |                             |
|2    |U+0080 ~ U+07FF       |110xxxxx |10xxxxxx   |           |          |        |         |2^5 * 2^6 = 2,048            |
|     |                      |C0 ~ DF  |80 ~ BF    |           |          |        |         |                             |
|3    |U+0800 ~ U+FFFF       |1110xxxx |10xxxxxx   |10xxxxxx   |          |        |         |2^4 * (2^6)^2 = 65,536       |
|     |                      |E0 ~ EF  |80 ~ BF    |           |          |        |         |                             |
|4    |U+10000 ~ U+1FFFFF    |11110xxx |10xxxxxx   |10xxxxxx   |10xxxxxx  |        |         |2^3 * (2^6)^3 = 2,097,152    |
|     |                      |F0 ~ F7  |80 ~ BF    |           |          |        |         |                             |
|5    |U+200000 ~ U+3FFFFFF  |111110xx |10xxxxxx   |10xxxxxx   |10xxxxxx  |10xxxxxx|         |2^2 * (2^6)^4 = 67,108,864   |
|     |                      |F8 ~ FB  |80 ~ BF    |           |          |        |         |                             |
|6    |U+4000000 ~ U+7FFFFFFF|1111110x |10xxxxxx   |10xxxxxx   |10xxxxxx  |10xxxxxx|10xxxxxx |2^1 * (2^6)^5 = 2,147,483,648|
|     |                      |FC ~ FD  |80 ~ BF    |           |          |        |         |                             |
