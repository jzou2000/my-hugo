---
title: src-code
---

## Generate shortcode src-code using cursor

Create a hugo shortcode to present souce code files with syntax

* optional argument files=list-of-files, each file will be read and displayed with syntax
  * if there isn't argument files, use shortcode inner text as file content, use argument
    lang for file type.
* syntax always with line number
* optional argument lang=lang-name to indicate syntax for unknown file types.
  Known types by extensions are
    c, cpp, h, hpp, go, java, html, css, js, ts, md, py, svg, json, yaml, toml
  without argument lang, no syntax is used for unknown type files
* optional argument lines=number will be maximum lines to be displayed, and scrolls
  if file lines exceed.
* optional argument hl=highlines, the same with hightline shortcode syntax
* optional argument embedded=true, happens for files of html,css,js,ts and their combination
  * concatenate all files and inject the content directly in the output html stream, before
    all syntaxed file blocks.
  * wrapp css and js file with relative ``<style type=text/css>`` and ``<scipt type=text/javascript>`` tags.

### Followups

* add debug information for readFile, the page show
  File not found or unreadable:

## Examples

### embedded svg

{{< src-code embedded="true" lang="svg" >}}
<svg width='400' height='280' viewBox="30 160 180 120" xmlns='http://www.w3.org/2000/svg' class='isvg'>
    <ellipse
       style="fill:red;stroke:#000000;stroke-width:1;"
       id="path8419"
       cx="78.998238"
       cy="220.30396"
       rx="34.515255"
       ry="34.250767" />
</svg>
{{< /src-code >}}

### embedded html + css + js

{{< src-code files="sample.html,sample.css,sample.js" embedded="true" />}}

Show lines and highlight range
{{< src-code files="sample.css" lines=10 hl="2 4-6" />}}

### highline lines

{{< src-code files="sample.cpp" hl="2 4-6" />}}
