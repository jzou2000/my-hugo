---
title: Using Components
nav: vue component
keywords: [vue, hugo]
weight: 10
vue: true
---

<style>
.param {
    width: 200px;
    margin: 3px;
    background: lightblue;
    display: inline-block;
}
</style>

<div id='sample-app'
 style='background: lightgray; padding: 4px 16px; margin: 16px;'>
    <p>This is a sample Vue app with self defined components.</p>
    <tparam :obj='color'></tparam> {{cval(color)}}
    <br/>
    <tparam :obj='rider'></tparam> {{cval(rider)}}
</div>

<script>
    Vue.component('tparam', {
        props: ['obj'],
        template: `<div class='param'>{{obj.name}} <span @click='on_click'>{{obj.values[obj.i]}}</span></div>`,
        data: function() {
            return {
                value: 1
            }
        },
        methods: {
            on_toggle: function() {

            },
            on_click: function() {
                if (++this.obj.i >= this.obj.values.length)
                    this.obj.i = 0
            }
        }
    })
    var app = new Vue({
        el: '#sample-app',
        //components: ['tparam'],
        data: {
            color: {
                name: 'color',
                i: 0,
                values: ['red', 'green', 'blue']
            },
            rider: {
                'name': 'rider',
                i: 0,
                values: ['ninja', 'bond', 'anold']
            }
        },
        methods: {
            cval: function(c) {
                return c.values[c.i]
            }
        }
    })
</script>

```html

TBD

```
