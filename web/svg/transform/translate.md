---
title: Translate
nav: translate
---

<style>
rect {
    opacity: .7;
    stroke-width: 3;
}
text {
    -text-anchor: middle;
    dominant-baseline: hanging;
}
circle {
    r: 3;
    fill: red;
}
</style>

<svg width='600' height='400' viewbox='-10 -10 600 400'>
    <!-- svg body -->
        <rect x='0' y='0' width='600' height='400' fill='pink'/>
    <!-- svg body -->
        <defs>
            <rect id='s' width='120' height='80' stroke='blue'/>
        </defs>
    <!-- do translate -->
        <use xlink:href='#s' fill='aqua'/>
        <text class='note' x='5' y='5'>original</text>
        <use xlink:href='#s' fill='lightblue'
            transform='translate(100,50)'/>
            <text x='105' y='55'>translate(100, 50)</text>
        <use xlink:href='#s' fill='yellow'
            transform='translate(200,80)'/>
            <text x='205' y='85'>translate(200, 80)</text>
        <use xlink:href='#s' fill='green'
            transform='translate(200,80) scale(3,2)'/>
            <text x='305' y='105' fill='yellow'>t(200, 80) s(3,2)</text>
</svg>
