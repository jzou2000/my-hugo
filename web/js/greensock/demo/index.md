---
title: Simple Demo on SVG
nav: simple svg
vue: true
---
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"></script>

<style>
    .svg {
        background-color: papayawhip;
    }
</style>

<div id='app'>

Move the mouse around and click, the rect object will follow your track.

<svg viewbox='0 0 400 300' width='400' height='300' class='svg'>
    <g @mousemove='svgMouseMove' @click='onTrace'>
    <rect x='0' y='0' width='400' height='300' fill='papayawhip' ref='panel' />
    <rect id='car'
        x='0' y='0'
        width='100' height='50'
        fill='steelblue'
        rx='8'
        ref='car'
    />
    <text x='30' y='250' stroke='red'>{{message}}</text>
    <text x='130' y='250'>({{x}}, {{y}}) {{msg}}</text>
    </g>
</svg>

</div>


<script>
/*
*/

var app = new Vue({
    el: '#app',
    data: {
        message: 'I love svg',
        x: 0,
        y: 0,
        msg: '',
        trace: [],
    },
    methods: {
        onTrace(event) {
            let tl = gsap.timeline()
            let car = this.$refs.car
            let ts = this.trace
            let n = ts.length
            // for (let v of ts) {
            //     tl.to(car, {x: v.x, y: v.y, duration: 0.01})
            // }
            let s = 10
            for (let i = 1; i <= s; i++) {
                let b = parseInt(n / s * i)
                if (b == n) b = n - 1
                tl.to(car, {x: ts[b].x, y: ts[b].y, duration: 0.05})
            }
            this.trace = []
        },
        svgMouseMove(event) {
            this.x = event.offsetX
            this.y = event.offsetY
            this.trace.push({x: this.x, y: this.y})
        }
    }
})

</script>
