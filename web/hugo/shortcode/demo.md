---
title: Demo
---

This is a page that include shortcode ``demo``.

{{< demo src="demo.md" note="no-md" >}}
<p>* inner text is **NOT** markdown</p>
{{< /demo >}}

{{% demo src="demo.md" note="blaba" /%}}

{{% demo "demo.md" "blaba" %}}

* inner text is markdown
* more lines

{{% figure src="../shortcode-img.png" width="200" %}}

{{% /demo %}}


{{% demo /%}}
