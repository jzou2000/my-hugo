---
title: Transform Sample 2
nav: transform-2
---

<style>
.e {
  opacity: 60%;
}
</style>

<svg width="800" height="400" viewbox="0 0 800 300">
  <g fill-opacity="0.6" fill="none">
    <!-- svg body -->
    <rect x="0" y="0" width="800" height="400"
     fill="lightpink" />
  </g>
  <defs>
    <rect id="s" x="0" y="0" width="160" height="120" class='e'
        stroke="blue" stroke-width="3"/>
    <g id='g'>
      <circle r='20' fill='red' class='e'/>
      <text fill='yellow' text-anchor='middle' dominant-baseline="middle">30</text>
    </g>
  </defs>
  <use xlink:href="#s" fill="skyblue"/>
  <use xlink:href="#s"
    fill="green"
    transform="translate(400,60) rotate(30)"/>
  <use xlink:href="#g"
    transform="translate(400,60)"/>
</svg>
