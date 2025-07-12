---
title: utf8 encoding
nav: utf8
---

|Bytes|Unicode Range         |Byte 1   |Byte 2     |Byte 3     |Byte 4    |Byte 5  |Byte 6   |char valid bits|char#               |
|:----|:---------------------|:--------|:----------|:----------|:---------|:-------|:--------|:--------------|-------------------:|
|1    |U+0000 ~ U+007F       |0xxxxxxx |           |           |          |        |         |7              |128                 |
|     |                      |0 ~ 7F   |           |           |          |        |         |               |                    |
|2    |U+0080 ~ U+07FF       |110xxxxx |10xxxxxx   |           |          |        |         |5+6=11         |2^11 = 2,048        |
|     |                      |C0 ~ DF  |80 ~ BF    |           |          |        |         |               |                    |
|3    |U+0800 ~ U+FFFF       |1110xxxx |10xxxxxx   |10xxxxxx   |          |        |         |4+6*2=16       |2^16 = 65,536       |
|     |                      |E0 ~ EF  |80 ~ BF    |           |          |        |         |               |                    |
|4    |U+10000 ~ U+1FFFFF    |11110xxx |10xxxxxx   |10xxxxxx   |10xxxxxx  |        |         |3+6*3=21       |2^21 = 2,097,152    |
|     |                      |F0 ~ F7  |80 ~ BF    |           |          |        |         |               |                    |
|5    |U+200000 ~ U+3FFFFFF  |111110xx |10xxxxxx   |10xxxxxx   |10xxxxxx  |10xxxxxx|         |2+6*4=26       |2^26 = 67,108,864   |
|     |                      |F8 ~ FB  |80 ~ BF    |           |          |        |         |               |                    |
|6    |U+4000000 ~ U+7FFFFFFF|1111110x |10xxxxxx   |10xxxxxx   |10xxxxxx  |10xxxxxx|10xxxxxx |1+6*5=31       |2^31 = 2,147,483,648|
|     |                      |FC ~ FD  |80 ~ BF    |           |          |        |         |               |                    |

Note:
* [unicode.org](https://home.unicode.org/)
* [ConvertUTF at googlesource](https://android.googlesource.com/platform/external/id3lib/+/master/unicode.org)