---
title: Vue Component
nav: vue component 2
description: using component
vue: true
---

<style>
svg {
    background-color: lightcyan;
    margin: 4px;
}
</style>

<div id="app">
  <button @click='load'>Load</button>
  <button @click='sort("s1")'>Sort s1</button>
  <button @click='sort("s2")'>Sort s2</button>
  <br/>
  <data-set name='s1'></data-set>
  <data-set name='s2'></data-set>
</div>


<script>

async function sleep(n) {
    return new Promise((res,rej) =>{
        setTimeout(() => { return res() }, n)
    })
}

Vue.use(Vuex)
const theStore = new Vuex.Store({
    state: {
        ui_enabled: true,
        dataSet: {
            s1: [{value: 100, color: 'green'}],
            s2: [{value: 150, color: 'yellow'}],
        }
    },
    mutations: {
        ui_state: function(state, v) {
            state.ui_enabled = v
        },
        reset: function(state, name) {
            if (!(name in state.dataSet)) return
            state.dataSet[name].splice(0, state.dataSet[name].length)
        },
        add: function(state, payload) {
            let name = payload['name']
            let val = payload['value']
            if (!(name in state.dataSet)) return
            state.dataSet[name].push(val)
        },
        changeColor: function(state, pload) {
            let name = pload['name']
            ds = state.dataSet[name]
            if (ds == undefined) return
            let i = pload['i']
            let j = pload['j']
            let c = pload['highlight'] ? 'yellow' : 'gray'
            console.log(`  change-color(${name}): ${i},${j} = ${c}`)
            if (i != undefined && i < ds.length)
                ds[i].color = c
            if (j != undefined && j < ds.length)
                ds[j].color = c
        },
        swap: function(state, pload) {
            let name = pload['name']
            ds = state.dataSet[name]
            if (ds == undefined) return
            let i = pload['i']
            let j = pload['j']
            if (i != undefined && i >= 0 && i < ds.length && j != undefined && j >= 0 && j < ds.length) {
                console.log(`  swap(${name}): ${i},${j}`)
                let tmp = ds[i].value
                ds[i].value = ds[j].value
                ds[j].value = tmp
            }
        }
    },
    actions: {
        load: async function(context) {
            if (!context.state.ui_enabled)
                return

            context.commit('ui_state', false)
            await this.dispatch('load_s', 's1')
            await this.dispatch('load_s', 's2')

            context.commit('ui_state', true)
        },
        load_s: async function (context, name) {
            context.commit('reset', name)
            for (let i = 0; i < 10; ++i) {
                let v = parseInt(Math.random() * 200)
                //await sleep(10)
                context.commit('add', {'name': name, value: {value: v, color: 'gray'}})
            }
        },
        sort: async function(context, pload) {
                console.log(`sort: ${pload['name']}`)
                if (!context.state.ui_enabled)
                    return

                context.commit('ui_state', false)
                let name = pload['name']
                let algo = pload['algo']
                let ds = context.state.dataSet[name]
                console.log(`    name=${pload['name']} algo=${pload['algo']} ds=${ds}`)
                if (ds === undefined) return
                let n = ds.length
                for (let i = 0; i < n - 1; ++i) {
                    for (let j = i + 1; j < n; ++j) {
                        context.commit('changeColor', {name:name, i:i, j:j, highlight: true})
                        await sleep(10)
                        if (ds[i].vlaue > ds[j].value) {
                            console.log(`    == to-swap: i=${i}/${ds[i].value} j=${j}/${ds[j].value}`)
                            context.commit('swap', {name: name, i: i, j: j})
                            console.log(`    == swapped: i=${i}/${ds[i].value} j=${j}/${ds[j].value}`)
                        }
                        context.commit('changeColor', {name:name, i:i, j:j})
                    }
                }
                for (let i of ds) {
                    console.log(`    ${i.value}`)
                }
                console.log('sort done')
                context.commit('ui_state', true)
        }
    }
})

// global register component, no need to register in Vue instance
Vue.component('data-set', {
    props: ['name'],
    template: `
  <svg width="350" height="300">
    <g transform='translate(10,250) scale(1,-1)'>
        <rect v-for='(d,n) in data' :id='"r"+name+n'
            :x="n*5" :height="d.value" width="4" :fill="d.color" />
    </g>
  </svg>
  `,
    data: function() {
        return {}
    },
    methods: {

    },
    computed: {
        data: function() {
            return theStore.state.dataSet[this.name]
        }
    }
})

var app = new Vue({
  el: '#app',
  store: theStore,
  data: {
  },
  methods: {
      load: function() {
          this.$store.dispatch('load')
      },
      sort: function(name, algo) {
          if (algo == undefined) algo = 'bubble'
          this.$store.dispatch('sort', {name: name, algo: algo})
      }
  }
})

</script>
