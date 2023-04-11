---
title: SVG Element by Vue
nav: process svg element
description: manipulate svg elements by vue
vue: true
---

<style>
svg {
    background-color: lightcyan;
}
</style>

<div id="app">
  <svg width="600" height="300">
     <rect x="0" y="0" width="600" height="300"
      stroke="gray" fill="none"/>
     <rect x="100" y="10" width="100" height="80" rx="10"
      stroke="blue" fill="yellow"/>
      <g transform='translate(0,200) scale(1,-1)'>
     <rect v-for="s in shapes"
         :x="s.x" :width="s.width" :height="s.height"
         :fill="s.fill">
     </rect>
     </g>
     <g transform='translate(300,150) scale(1,-1)'>
        <rect v-for='(s,n) in bars' :id='"r"+n'
            :x="n*5" :height="s" width="4" fill="gray" />
     </g>
  {{message}}
  <circle cx="230" cy="60" r="50" stroke="red" fill="pink" fill-opacity="0.6"/>
  </svg>
<!--
         <rect x="s.x" y="s.y" width="s.width" height="s.height"
         stroke="s.stroke" fill="s.fill"/>
-->
</div>


<script>
var app = new Vue({
  el: '#app',
  data: {
    message: '<circle cx="130" cy="50" r="50" stroke="red" />',
    shapes: [
        { x: 100,
          width: 48,
          height: 80,
          stroke: 'blue',
          fill: 'yellow',
        },
        { x: 150,
          width: 48,
          height: 180,
          stroke: 'blue',
          fill: 'lightgreen',
        },
        { x: 200,
          width: 48,
          height: 80,
          stroke: 'blue',
          fill: 'green',
        },
    ],
    bars: [
        100, 80, 30, 50, 120, 60 
    ]
  }
})
</script>
