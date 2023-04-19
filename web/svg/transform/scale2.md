---
title: Scale2
nav: scale2
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
</style>

<svg width='600' height='400' viewbox='-10 -10 600 400'>
    <!-- svg body -->
        <rect x='0' y='0' width='600' height='400' fill='pink'/>
    <!-- svg body -->
        <defs>
            <g id='s'>
                <rect width='120' height='80' stroke='blue'/>
                <circle cx='60' cy='40' r='20' fill='blue'>
            </g>
        </defs>
    <!-- do translate -->
        <use xlink:href='#s' fill='aqua'/>
        <text class='note' x='5' y='5'>original</text>
        <use xlink:href='#s' fill='yellow'
            transform='translate(200,80)'/>
            <text x='205' y='85'>translate(200, 80)</text>
        <use xlink:href='#s' fill='green'
            transform='translate(200,80) scale(3,2)'/>
            <text x='305' y='105' fill='yellow'>translate(200, 80) scale(3,2)</text>
</svg>
