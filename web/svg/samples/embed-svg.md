---
title: Embedded Objects
nav: embedded objects
---
<style>
.svg-container {
    display: flex;
    flex-flow: row wrap;
    background: #ffd5d5;
}
.isvg {
    background: #fff0fe;
}
#c1 {
    fill: yellow;
}
.setc {
    fill: cyan;
}
#rect8424 {
    stroke: pink;
}
</style>

## SVG

<div class='svg-container'>
<svg width='400' height='300' xmlns='http://www.w3.org/2000/svg'>
  <circle id='c1' cx='150' cy='150' r='80' stroke='blue' />
</svg>

<svg width='400' height='280' viewBox="30 160 180 120" xmlns='http://www.w3.org/2000/svg' class='isvg'>
    <ellipse
       style="opacity:1;fill:#ffeeaa;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       id="path8419"
       cx="78.998238"
       cy="220.30396"
       rx="34.515255"
       ry="34.250767" />
    <path
       d="m 69,170 c 17.439604,-8.37769 95.603599,-10.17294 120.340539,8.99248 24.73694,19.16542 4.03084,27.86515 -0.59495,47.66162 -4.62579,19.79647 -54.56577,-27.64011 -59.81828,-14.54071 -5.25252,13.0994 -94.579607,-25.46702 -59.927309,-42.11339 z"
       id="rect8421"
       class="setc" />
    <path
       d="m 110.72479,217.72027 c 9.56382,6.54079 43.95799,29.01624 48.76016,3.51147 3.45138,-18.33064 10.62813,-42.85029 15.27345,-24.47486 m 0,0 c 12.61255,20.44902 -17.10943,49.51331 -38.11525,61.17498 -21.49414,11.93277 -4.1384,-26.01564 -12.7686,-23.63145 -14.55538,4.02108 -50.785496,-29.92808 -13.14976,-16.58014"
       id="rect8424"
       class="setc" />
</svg>
</div>

Linked SVG
<svg xmlns="http://www.w3.org/2000/svg">
    <use xlink:href="../plains.svg"></use>
</svg>

<!--
<img src="../plains.svg" />
-->

<object type="image/svg+xml" data="../plains.svg">
</object>

## HTML

## Script
