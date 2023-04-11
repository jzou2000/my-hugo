---
title: Async Process in Vue
nav: process svg element async
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
  <svg width="600" height="300">
    <g transform='translate(10,250) scale(1,-1)'>
        <rect v-for='(s,n) in bars' :id='"r"+n'
            :x="n*5" :height="s" width="4" :fill="colors[n]" />
    </g>
  </svg>
</div>


<script>
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
    bars: [
        100, 80
    ],
    colors: [ 'gray', 'gray' ],
  },
  methods: {
    start: async function() {
      if (!this.start_enabled)
        return

      this.start_enabled=false
      this.bars.splice(0,this.bars.length)
      for (let i = 0; i < 50; ++i) {
        let v = parseInt(Math.random() * 200)
        if (v < 10) v = 10
        await sleep(20)
        this.bars.push(v)
        this.colors.push('gray')
      }
      this.start_enabled=true
    },
    sort: async function() {
      if (!this.sort_enabled)
        return

      this.sort_enabled=false
      let v = this.bars
      let n = v.length
      let ca = 'red'
      let cr = 'gray'
      for (let i = 0; i < n - 1; ++i) {
        Vue.set(this.colors, i, ca)
        for (let j = i + 1; j < n; ++j) {
          Vue.set(this.colors, j, ca)
          await sleep(10)
          if (v[i] > v[j]) {
            let tmp = v[j]
            let t2 = v[i]
            Vue.set(this.bars, j, t2)
            Vue.set(this.bars, i, tmp)
          }
          Vue.set(this.colors, j, cr)
        }
        Vue.set(this.colors, i, cr)
      }
      for (let i of this.bars) {
        console.log(`    ${i}`)
      }
      console.log('sort done')
      this.sort_enabled=true
    }
  }
})

</script>
