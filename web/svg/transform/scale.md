---
title: Scale
nav: scale
---

<style>
.nss {
    vector-effect: non-scaling-stroke;
    stroke: blue;
}
</style>

<svg width='800' height='400' viewBox='0 0 800 400'>
    <defs>
        <path id='triangle' stroke='yellow'
            d='M0,0 l0,80 l60,0z'/>
        <path id='triangle-nss' class='nss'
            d='M0,0 l0,80 l60,0z'
            vector-effect='non-scaling-stroke'/>
    </defs>
    <!--
    :
    -->
    <g stroke='blue' stroke-width='2' fill='none'>
        <!-- normal -->
            <use href='#triangle' transform='translate(10,20)'/>
        <!-- scaled -->
            <path d='M0,0 l0,40 l30,0z' stroke='yellow'
                transform='translate(60,10) scale(2,1)'
            />
        <!-- fixed-->
            <use href='#triangle'
                transform='rotate(15,120,50) translate(120,10) scale(3,1)'/>
            <use href='#triangle-nss'
                transform='rotate(15,120,50) translate(120,110) scale(3,1)'/>
    </g>
</svg>
