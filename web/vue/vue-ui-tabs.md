---
title: Build a tabs UI component using CSS
nav: tabs by css
vue: true
---

<style type='text/css'>

.caption {
    padding: 4px 0 1px 16px;
    margin: 0;
}
.caption span {
    padding: 2px 12px;
    border-radius: 4px 4px 0 0;
    background-color: #eec;
}
.caption span.hl {
    background-color: #ccf;
    font-weight: bold;
}
.tab-container {
    border-radius: 8px;
    border: thin solid black;
    min-height: calc(50vh - 80px);
    padding: 4mm;
}
.red {    background-color: #fee; }
.green {    background-color: #efe; }
.blue {    background-color: #eef; }
.hr { border-bottom: thin solid black;
 margin-bottom: 5mm; margin-top: 5mm;}
 .hidden { display: none; }

</style>

<div id='app'>

<div class='caption'>
<span @click='tab("common")' :class='{hl: show_common}'>Common</span>
<span @click='tab("extend")' :class='{hl: show_extend}'>Extend</span>
<span @click='tab("option")' :class='{hl: show_option}'>Option</span>
</div>

<div class='tab-container'>
    <div v-show='show_common'>
     <h3>Main Tab</h3>
     This is the main/common tab.
    </div>
    <div v-show='show_option'>
     <h3>Options</h3>
        <label for='lang'>Language</label>
        <select id='lang'>
            <option>Chinese</option>
            <option>English</option>
            <option>French</option>
        </select>
        <br/>
        <label for='translate'>translate</label>
        <input id='translate' type='checkbox' checked='true'/>
        <div class='hr'></div>
        <button>OK</button>
    </div>
    <div v-show='show_extend'>
     <h3>Extended content</h3>
     A quick brown fox jumps over a lazy dog.
    </div>
</div>

<div class='debug hidden'>
<p>mytab={{mytab}}</p>
</div>

</div>

<script language='javascript'>
var app = new Vue({
    el: '#app',
    data: {
        n: 1,
        mytab: 'common',
        tabList: ['common', 'extend', 'option']
    },
    computed: {
        show_common() { return this.mytab == 'common'},
        show_extend() { return this.mytab == 'extend'},
        show_option() { return this.mytab == 'option'}
    },
    methods: {
        tab(x) {
            this.mytab = x
        },
        is_active(x) {
            return this.mytab == x ? 'block' : 'none'
        }
    }
})
</script>
