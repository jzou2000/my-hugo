---
title: Group of SVG Components
nav: svg components
description: manipulate svg elements asynchrously by vue
vue: true
---

<style>
svg {
    background-color: lightcyan;
}
</style>

<div id="app">
  <button @click='start'>Start</button>
  <button @click='sort'>Sort</button>
  <br/>
  <svg width="800" height="400">
    <defs>
        <g id='c'>
            <circle r='20' stroke-width='2'/>
        </g>
    </defs>
    <g v-for='(v,n) in values' id='"r" + n'
     :transform='xpos(n)' stroke='blue' :fill='f_color(n)'>
        <circle r='20' stroke-width='2'/>
        <text x='-8' y='5'>{{lpad(v)}}</text>
    </g>
  </svg>
        <!--
        <use xlink:href='#c'/>
        -->
</div>

```xml
```

<script>
const log = console.log

async function sleep(n) {
    return new Promise((res,rej) =>{
        setTimeout(() => { return res() }, n)
    })
}


var app = new Vue({
  el: '#app',
  data: {
    start_enabled: true,
    sort_enabled: true,
    p1: 1,
    p2: 3,
    swap: false,
    values: [1, 23, 92, 29, 13, 45],
    colors: [ 'gray', 'gray' ],
  },
  computed: {

  },
  methods: {
    xpos: function(n) {
        const n_row = parseInt((800 - 50) / 50)
        var y = parseInt(n / n_row) * 50 + 50
        var x = parseInt(n % n_row) * 50 + 50
        var s = `translate(${x}, ${y})`
        // console.log(`x=${x} s=${s}`)
        return s
    },
    lpad: function(x) {
        return '0'.repeat(x >= 10 ? 0 : 1) + x
    },
    f_color: function(n) {
        return (n == this.p1 || n == this.p2) ? (this.swap ? 'red' : 'pink') : 'yellow'
    },
    start: async function() {
      if (!this.start_enabled)
        return

      this.start_enabled=false
      this.values.splice(0,this.values.length)
      for (let i = 0; i < 10; ++i) {
        let v = parseInt(Math.random() * 100)
        if (v < 10) v = 10
        await sleep(20)
        this.values.push(v)
      }
      this.p1 = this.p2 = -1
      console.log = 'start done'
      this.start_enabled=true
    },
    sort: async function() {
      if (!this.sort_enabled)
        return

      this.sort_enabled=false
      let v = this.values
      let n = v.length
      for (let i = 0; i < n - 1; ++i) {
        this.p1 = i
        for (let j = i + 1; j < n; ++j) {
          this.p2 = j
          await sleep(350)
          if (v[i] > v[j]) {
            let tmp = v[j]
            let t2 = v[i]
            Vue.set(this.values, j, t2)
            Vue.set(this.values, i, tmp)
            this.swap = true
            await sleep(200)
            this.swap = false
          }
          else {
              await sleep(200)
          }
        }
      }
      this.p1 = this.p2 = -1
      for (let i of this.values) {
        log(`    ${i}`)
      }
      log('sort done')
      this.sort_enabled=true
    }
  }
})

</script>
