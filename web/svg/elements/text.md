---
title: Text
nav: text
---

<style>

circle {
    fill: red;
    r: 2;
}
line {
    stroke: gray;
}
path {
    fill: none;
    stroke: gray;
}
</style>

<svg width='800' height='300' viewport='0 0 800 300'>
    <!--------- md embedded html doesn't allow empty lines -->
    <defs>
        <circle id='c' fill='red' r='5'/>
    </defs>
    <!-- show text-anchor -->
        <text text-anchor='middle'
                  x='100'  y='20'>text-anchor (x=100)</text>
        <line x1='100' y1='40' x2='100' y2='160' />
        <text text-anchor='head'
                 x='100'  y='60'>head</text>
        <circle cx='100' cy='60'/>
        <text text-anchor='middle'
                 x='100'  y='100'>middle</text>
        <circle cx='100' cy='100'/>
        <text text-anchor='end'
                 x='100'  y='140'>end</text>
        <circle cx='100' cy='140'/>
    <!-- show dominant-baseline -->
        <text  x='250'  y='20'>dominant-baseline</text>
        <line x1='250' y1='60' x2='350' y2='60' />
        <text dominant-baseline='auto'
                x='250'  y='60'>auto</text>
        <line x1='250' y1='100' x2='350' y2='100' />
        <text dominant-baseline='middle'
                x='250'  y='100'>middle</text>
        <line x1='250' y1='140' x2='350' y2='140' />
        <text dominant-baseline='hanging'
                x='250'  y='140'>hanging</text>
    <!-- test along the text-path -->
    <path id='my-path' d='M100 200 Q170 280 240 200' />
    <text fill='red'>
        <textPath href='#my-path'>A text along the path</textPath>
    </text>
</svg>