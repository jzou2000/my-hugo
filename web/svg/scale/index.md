---
title: scale
nav: scale
---

{{< src-code embedded=true lang=css >}}
<style>
.v {border: thin solid black; }
.v1 {
    width: 200mm;
    height: 60mm;
}
.v2 {
    width: 100mm;
    height: 30mm;
}
</style>
{{< /src-code >}}

## viewport

{{< src-code files=sample.svg />}}

{{< src-code embedded=true lang=html >}}
<div>
    <img class='v v1' src='sample.svg'>
    <img class='v v2' src='sample.svg'>
</div>
{{< /src-code >}}

{{< src-code lang=md >}}
![view port effect](sample.svg "sample.svg")
{{< /src-code >}}
![view port effect](sample.svg "sample.svg")

## keep stroke unchanged

