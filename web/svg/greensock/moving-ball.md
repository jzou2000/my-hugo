---
title: Moving Ball
nav: moving ball
---

<script src='https://unpkg.co/gsap@3/dist/gsap.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/MotionPathPlugin.min.js'></script>
<style type='text/css'>
h1 { color: green; }
svg {
  background: green;
}
svg rect {
  stroke-width: 3;
  fill: lightgreen;
}
.s {
    stroke: blue;
    stroke-width: 3;
    fill: none;
}
.sp {
    stroke: gray;
    fill: none;
}
.ob { stroke: none; }
.ot {
  fill: yellow;
/*  font-size: 30px;*/
}
.obj {
  opacity: 85%;
}
</style>
Click the button <button onclick='go()'>Go!</button>, the ball moves along the path back-and-forth twice.

<svg viewbox='0 0 400 300' width='400' height='300'>
    <rect x='50' y='20' width='150' height='80'/>
    <circle class='s' cx='40' cy='40' r='30'/>
    <circle class='s' cx='340' cy='40' r='30'/>
    <path id='p1' class='sp' d='M40 40 Q 190 100 340 40'/>
    <g id='g1' class='obj'>
        <circle classs='ob' cx='40' cy='40' r='30' fill='red' stroke='black'/>
        <text class='ot' x='40' y='40' text-anchor='middle' dominant-baseline="middle">305</text>
    </g>
</svg>

<script>
gsap.registerPlugin(MotionPathPlugin);

function go() {
gsap.to('#g1', {
    motionPath: {
        path: 'm0 0 Q 150 60 300 0',
    },
    x: 300,
    yoyo: true,
    duration: 1,
    repeatDelay: .5,
    repeat: 3,
    ease: 'back.inOut(1.7)',
})
}
</script>
