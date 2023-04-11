---
title: SVG Component
nav: component
---

## Component

<svg width="800" height="400" viewbox="0 0 800 400">
    <defs>
        <rect id="s" x="0" y="0" width="160" height="120"
            fill-opacity=".8"
            stroke="blue" stroke-width="3"/>
    </defs>
    <defs>
        <g id="num" fill-opacity=".8">
            <circle cx="0" cy="0" r="20"
                stroke-width="3"/>
            <text x="-8" y="5"
                stroke="red""
                >30</text>
        </g>
    </defs>
    <defs>
        <g id="num2"
             fill-opacity=".8" fill="yellow"
             stroke="red">
            <use xlink:href="#num"/>
            <text x="-8" y="5"
                >50</text>
        </g>
    </defs>
    <use xlink:href="#s"
        fill="lightblue"
        transform="translate(100,50)"/>
    <use id='n0' xlink:href="#num"
        stroke="gray"
        />
    <use id='n1' xlink:href="#num"
        fill="yellow"
        stroke="blue"
        transform="translate(100,50)"/>
    <use id='n2' xlink:href="#num2"
        transform="translate(200,150)"/>
    <!-- -->
    <circle cx="250" cy="180" r="20"
        fill-opacity=".8" fill="none"
        stroke="blue" stroke-width="3"/>
    <text x="244" y="185"
        stroke="red" -transform="translate(0,-30)"
        >30</text>
</svg>
