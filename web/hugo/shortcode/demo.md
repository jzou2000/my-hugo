---
title: Demo
---

This is a page that include shortcode ``demo``.

## shortcode source

```html
<div style="background: #eee; border: solid; border-radius: 8px; padding: 16px; max-width: 50%; margin: 8px; margin-left: 1cm; min-height: 2cm;">
    <strong>shortcode demo</strong>

    {{ with .Get 0 }}param0={{.}}{{ end}}
    {{ with .Get "src" }}src={{.}}{{ end}}

    {{ if .Params }}
    params
    {{ range $key, $value := .Params }}
    * {{ $key }}={{$value}}
    {{ end }}
    {{ end }}

    {{ if strings.ContainsNonSpace .Inner }}
      {{ .Inner }}
    {{ else }}
      Inner is empty
    {{ end }}
</div>
```

## named argument, with inner content

{{< demo src="demo.md" note="no-md" >}}
<p>surrounded by html tag, * inner text is **NOT** markdown</p>
{{< /demo >}}

## named argument, without inner content

{{% demo src="demo.md" note="blaba" /%}}

## position arguments, with inner markdown content

{{% demo "demo.md" "blaba" %}}

* inner text is markdown
* more lines

{{% figure src="../shortcode-img.png" width="200" %}}

{{% /demo %}}

## blank shortcode

{{% demo /%}}
