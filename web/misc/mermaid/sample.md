---
title: sample
---

## Simple

```html
put diagram in div@mermaid

<div class="mermaid">
  mermaid diagrams
</div>

include mermaid.js at bottom
<script async src="https://unpkg.com/mermaid/dist/mermaid.min.js"></script>

```

See [mermaid document](https://mermaid-js.github.io/mermaid/#/)


<div class="mermaid">
graph LR;
  A[start<br/>now];
  B[end];
  C{filter?}
  D[[filter]]
  A-->C
  C--no-->B
  C--yes-->D
  E[(Database)]
</div>


<script async src="https://unpkg.com/mermaid/dist/mermaid.min.js"></script>
