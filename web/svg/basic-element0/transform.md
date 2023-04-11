---
title: transform
---

<svg width="800" height="600" viewbox="-40 -40 880 680">
  <g fill-opacity="0.6" fill="none">
    <rect x="-40" y="-40" width="880" height="680"
     stroke="gray"/>
    <rect x="0" y="0" width="800" height="600"
     fill="pink" />
  </g>
  <defs>
    <rect id="s" x="0" y="0" width="160" height="120"
        fill-opacity=".8"
        stroke="blue" stroke-width="3"/>
  </defs>
  <use xlink:href="#s"
    fill="lightblue"
    transform="translate(100,50)"/>
  <use xlink:href="#s"
    fill="yellow"
    transform="translate(200,80) scale(3,2)"/>
  <use xlink:href="#s"
    fill="green"
    transform="translate(400,20) rotate(30)"/>
</svg>
