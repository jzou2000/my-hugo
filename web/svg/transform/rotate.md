---
title: Rotate
nav: rotate
---

Rotate only and combine with translate. Notice that the sequence matters.

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
svg { border: solid black 1; }
</style>

<svg width='600' height='400' viewbox='-50 -10 700 400'>
    <!-- svg body -->
        <rect x='0' y='0' width='600' height='400' fill='pink'/>
        <rrect x='-50' y='-10' width='700' height='420' fill='none' stroke='gray' stroke-width='1'/>
    <!-- svg body -->
        <line x1="0" x2="600" y1="100" y2="100" stroke="lightgray"/>
        <line x1="0" x2="600" y1="200" y2="200" stroke="lightgray"/>
        <line x1="0" x2="600" y1="300" y2="300" stroke="lightgray"/>
        <line x1="100" x2="100" y1="0" y2="400" stroke="lightgray"/>
        <line x1="200" x2="200" y1="0" y2="400" stroke="lightgray"/>
        <line x1="300" x2="300" y1="0" y2="400" stroke="lightgray"/>
        <line x1="400" x2="400" y1="0" y2="400" stroke="lightgray"/>
        <line x1="500" x2="500" y1="0" y2="400" stroke="lightgray"/>
        <defs>
            <rect id='s' width='120' height='80' stroke='blue'/>
        </defs>
    <!-- do translate -->
        <use xlink:href='#s' fill='aqua'/>
        <text class='note' x='55' y='5'>original</text>
        <!-- rotate only -->
            <use xlink:href='#s' fill='plum'
                transform='rotate(30)'/>
                <line x2='800' transform='rotate(30)' stroke='gray'/>
                <text transform='rotate(30)'>rotate(30)</text>
        <!-- rotate first,
             then translate, the coordination system is rotated already!
        -->
            <use xlink:href='#s' fill='lightgreen'
                transform='rotate(30) translate(200,0)'/>
                <text fill='red' transform='rotate(30) translate(205,5)'>rotate(30) translate(200,0)</text>
        <!-- translate first,
             then rotate, the origin is translated already!
        -->
            <use xlink:href='#s' fill='gray'
                transform='translate(100,220) rotate(30)'/>
                <text x='105' y='225' fill='red'
                 transform='rotate(30 105 225)'>translate(100,220)
rotate(30)</text>
                <circle cx='100' cy='220'/>
</svg>
