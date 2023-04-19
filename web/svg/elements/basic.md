---
title: Basic Shapes
nav: basic
---

<svg width="800" height="360" viewbox="-40 -40 880 440">
  <style>
    text { font-size: 16; fill: black; }
    text.shape { fill: red; font-size: 120%; font-weight: bold; }
    .dot { r:3; fill: red; fill-opacity: .5; }
    .mark { stroke: gray; }
  </style>
  <defs>
    <circle id="dot" r="3" fill="red" fill-opacity=".5" />
  </defs>
  <g fill-opacity="0.6" fill="none">
    <rect x="-40" y="-40" width="880" height="440"
     stroke="gray" fill="white"/>
    <rect x="0" y="0" width="800" height="360"
     fill="pink" />
    <circle class="dot" cx="0" cy="0"/>
    <text x='400' text-anchor='middle'>svg width=800 height=360</text>
    <text x='400' y='-40'
       text-anchor='middle' dominant-baseline='hanging'>viewbox="-40 -40 880 440"</text>
    <text x="0" y="0" class="coord">(0, 0)</text>
    <circle class="dot" cx="800" cy="0"/>
    <text x="800" y="0" class="coord" text-anchor='end'>(800, 0)</text>
    <!-- elements: rect -->
        <rect x="30" y="20" width="100" height="60"
            stroke="blue" stroke-width="3" fill="lightblue" />
        <text x='60' y='50' class="shape">rect</text>
        <text x='30' y='20'>(x,y)</text>
        <text x='80' y='80' text-anchor='middle' dominant-baseline='hanging'>width</text>
        <text transform="translate(150,70) rotate(-90)">height</text>
    <!-- elements: circle -->
        <circle cx="260" cy="80" r="60"
            stroke="black" fill="cyan" />
        <circle class="dot" cx="260" cy="80"/>
        <path class="mark" d="M260,80 h60" transform="rotate(-30,260,80)"/>
        <text transform="translate(240,50)" class="shape">circle</text>
        <text x='260' y='80' text-anchor='middle' dominant-baseline='hanging'>(cx,cy)</text>
        <text transform="translate(290,74)">r</text>
    <!--  element: ellipse -->
        <ellipse cx="500" cy="80" rx="100" ry="60"
            stroke="black" fill="yellow" />
        <circle class="dot" cx="500" cy="80"/>
        <path class="mark" d="M500,80 m-100,0 h200 m-100,-60 v120"/>
        <text transform="translate(450,50)" class="shape">ellipse</text>
        <text transform="translate(480,96)">(cx,cy)</text>
        <text transform="translate(560,74)">rx</text>
        <text transform="translate(510,60)rotate(-90)">ry</text>
    <!--  element: line -->
        <line x1="-10" y1="100" x2="200" y2="180"
            stroke="green" stroke-width="6"/>
        <circle class="dot" cx="-10" cy="100" />
        <text transform="translate(-20,120)">(x1,y1)</text>
        <circle class="dot" cx="200" cy="180" />
        <text transform="translate(190,200)">(x2,y2)</text>
        <text transform="translate(100,130)">stroke-width=6</text>
        <text transform="translate(100,160)" class="shape">line</text>
    <!--  element: line -->
        <polyline points="300,200 330,250 400,270 460,180"
            stroke="blue"/>
        <text transform="translate(260,300)">points="300,200 330,250 400,270 460,180"</text>
        <text transform="translate(330,220)" class="shape">polyline</text>
    <!--  element: line -->
        <polygon points="500,200 500,250 600,250 600,150"
            stroke="blue" fill="yellow"/>
        <text transform="translate(450,270)">points="500,200 500,250 600,250 600,150"</text>
        <text transform="translate(530,220)" class="shape">polygon</text>
  </g>
</svg>

