---
title: Refresh
---

If we want the page **jumps" automaticall to another url, use following
head tag

```html
<meta http-equiv="refresh" content="0; url=https://site/path">
```

* ``0;`` in content means delay in seconds

```txt

create a hugo template snippet that

if it is a section page and there's no content
  jump to a new page, either specified by .Param.refresh or the first page under that section

```

output of chatgpt

```hugo
{{/* layouts/_default/section.html */}}

{{ if not .Content }}
  {{ $target := "" }}
  
  {{ if .Params.refresh }}
    {{ $target = .Params.refresh }}
  {{ else }}
    {{ $firstPage := first 1 (where .Pages "Kind" "page") }}
    {{ with index $firstPage 0 }}
      {{ $target = .RelPermalink }}
    {{ end }}
  {{ end }}

  {{ if $target }}
    <meta http-equiv="refresh" content="0; url={{ $target }}">
  {{ end }}
{{ else }}
  {{/* Your normal section template code here */}}
{{ end }}
```
