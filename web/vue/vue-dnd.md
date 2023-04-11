---
title: Drag-and-Drop with Vue
nav: drag-n-drop
keywords: [vue, dnd, hugo]
vue: true
weight: 20
---

<style>
.box {
    margin: 1px;
    padding: 0px;
    border: thin solid gray;
}
.vbox {
    border: thin solid red;
}
.inline {
    display: inline-block;
}
.flex {
    display: flex;
    flex-flow: row;
}
.tcol {
    background: #fef0f0;
    padding: 4px;
    margin: 8px;
    display: flex;
    flex-flow: row wrap;
}
.suite { background-color: #fef0f0; }
.set { background-color: #f0fef0; }
.test { background-color: #e0e0fe; }
.param-zone {
    min-width: 50px;
    min-height: 30px;
    background: #c0ffc0;
}
.param {
    margin: 2px 8px;
    padding: 4px;
    box-shadow: 4px 4px 8px gray;
    border-radius: 4px;
    background: lightblue;
    -display: inline-block;
}
.result {
    width: 100%;
}
.child {
    flex-grow: 2;
}
</style>

<div id='sample-app'>
    <div class='box flex'>
        <tparam :obj='color'></tparam>
        <tparam :obj='rider'></tparam>
    </div>
    <tcol :obj='others'>
    </tcol>
    <tcol :obj='harley'>
    </tcol>
</div>

<script>
const log = console.log
const clone = (o) => JSON.parse(JSON.stringify(o))
const o2s = (o) => JSON.stringify(o)
const get_name = (n, d) => n.split(d || '.').pop()
const get_param = (o, name) => {
    var pv = undefined
    var chain = []
    var p = o
    while (p = p.parent) {
        chain.push(p)
    }
    p = o
    while (p && !pv) {
        if (p.params && p.params[name]) {
            pv = p.params[name]
            break
        }
        p = p.parent
    }
    return pv ? pv.values[pv.i] : undefined
}

const store = new Vuex.Store({
    state: {
        params: {
            color: {
                name: 'color',
                type: 'color',
                i: 0,
                values: ['red', 'green', 'blue'],
            },
            rider: {
                name: 'rider',
                type: 'img',
                i: 0,
                values: ['ninja', 'spy', 'terminator']
            },
        },
        sets_by_id: {
            // look-up dictionary for all suites/sets
        },
        sets: [
            {
                name: 'others',
                type: 'suite',
                params: {},
                items: [
                    {
                        name: 'japan',
                        type: 'set',
                        items: [
                            {
                                name: 'cbr',
                                type: 'test',
                                params: {
                                    C: {
                                        name: 'CC',
                                        i: 0,
                                        values: ['300', '500']
                                    },
                                },
                                value: 'cbr'
                            },
                            {
                                name: 'ninja',
                                type: 'test',
                                value: 'ninja'
                            }
                        ]
                    },
                    {
                        name: 'europe',
                        type: 'set',
                        items: [
                            {
                                name: 'bmw',
                                type: 'test',
                                value: 'bmw'
                            },
                        ]
                    }
                ],
            },
            {
                name: 'harley',
                type: 'suite',
                items: [
                    {
                        name: 'usa',
                        type: 'set',
                        items: [
                            {
                                name: 'glider',
                                type: 'test',
                                value: 'harley'
                            },
                        ],
                    },
                ],
            },
        ]
    },
    getters: {
        param: (state) => (name) => {
            return state.params[name]
        },
        tdef: (state) => (id) => {
            return state.sets_by_id[id]
        }
    },
    mutations: {
        add_param (state, payload) {
            log(`add_param: payload=${o2s(payload)}`)
            var def = this.getters.tdef(payload.def)
            var p = this.getters.param(payload.name)
            var np = clone(p)
            Vue.set(def.params, payload.name, np)
        }
    }
})

// setup suite/set/test:
//   id         unique id to locate the object in the store
//   relation   reverse link for parent
const setup = function (obj, parent) {
    //log(`setup: ${obj.name} parent=${parent ? parent.id : parent}`)
    obj.parent = parent
    var name = obj.name
    var id = name
    if (parent) id = parent.id + '.' + name
    obj.id = id
    if (obj.params === undefined)
        Vue.set(obj, 'params', {})
    store.state.sets_by_id[id] = obj
    if (obj.items) {
        for (var c of obj.items)
            setup(c, obj)
    }
}


//setup(store.state.sets.usuite, 'usuite')
// store.commit('add_param', {def: 'usuite', name: 'rider'})
// store.commit('add_param', {def: 'usuite', name: 'color'})

Vue.component('tparam', {
    props: ['obj'],
    template: `
    <div class='param' :id='obj.name'
        draggable='true'
        @dragstart='on_dragstart'
        @drop='on_drop'
    > <div @click='on_click'
          v-if='is_color'
          v-bind:style='{ width: "50px", height: "20px", background: value }'>
           </div>
        <img @click='on_click' v-else-if='is_img' width="50px" height="50px"
         v-bind:src='"../" + value + ".png"'></img>
        <span @click='on_click' v-else>{{obj.name}} {{value}}</span>
    </div>`,
    data: function() {
        return {
            dd: 1
        }
    },
    computed: {
        is_color: function() {
            return this.obj.type == 'color'
        },
        is_text: function() {
            return this.obj.type == 'text'
        },
        is_img: function() {
            return this.obj.type == 'img'
        },
        value: function() {
            return this.obj.values[this.obj.i]
        }
    },
    methods: {
        on_dragstart: function(evt) {
            //log(`dragstart: ${evt.target.id} ${this.obj.name}`)
            //evt.dataTransfer.setData('text', evt.target.id)
            evt.dataTransfer.setData('text', this.obj.name)
        },
        on_drop: function(evt) {
            evt.preventDefault()        // popup to its parent
        },
        on_click: function() {
            if (++this.obj.i >= this.obj.values.length)
                this.obj.i = 0
        }
    }
})


Vue.component('tcol', {
    props: ['obj'],
    template: `<div :class='["tcol", "box", obj.type]' :id='id'>
        <div class='vvbox'>
            <div>{{id_short}}</div>
            <div class='param-zone'
                @drop='on_drop'
                @dragover='on_allowDrop'
            >
                <tparam v-for='(v,k) in params'
                    :key='k' :obj='v'/>
            </div>
        </div>
        <div class='child'>
            <tcol v-for="(v,k) in items" :key='k' :obj='v'>
            </tcol>
            <div class='result' v-if='is_test'>
                {{result}}
            </div>
        </div>
    </div>`,
    data: function() {
        return {
            theKey: 1
        }
    },
    computed: {
        params: function () {
            return this.obj.params
        },
        id: function() {
            return this.obj.id
        },
        id_short: function() {
            return get_name(this.obj.id)
        },
        items: function() {
            return this.obj.items
        },
        values: function() {
            return this.obj.values
        },
        is_test: function() {
            return this.obj.type == 'test'
        },
        result: function() {
            var r = [this.obj.value]
            for (var p of ['color', 'rider']) {
                var ep = get_param(this.obj, p)
                if (ep) r.push(ep)
            }

            return r.join('-') + '.png'
        }
    },
    methods: {
        update: function() {
            log('udate')
            this.$forceUpdate()
        },
        on_allowDrop: function(evt) {
            evt.preventDefault()
        },
        on_drop: function(evt) {
            var s_id = evt.dataTransfer.getData('text')
            let pid = this.get_name(s_id)
            store.commit('add_param', {def: this.obj.id, name: pid})
        },
        get_name: function(n) {
            return n.split('_').pop()
        }
    }
})

//Vue.use(Vuex)

var app = new Vue({
    el: '#sample-app',
    //components: ['tparam'],
    data: {
        n: 1
    },
    computed: {
        color: function() {
            return store.state.params['color']
        },
        rider: function() {
            return store.state.params['rider']
        },
        others: function() {
            return store.state.sets_by_id['others']
        },
        harley: function() {
            return store.state.sets_by_id['harley']
        },
    },
    methods: {
        cval: function(c) {
            return c.values[c.i]
        },
    },
    created: function() {
        for (var s of store.state.sets) {
            setup(s)
        }
    }
})

</script>


