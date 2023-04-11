---
title: Diff using only JavaScript
nav: diff with js
keywords: [vue, diff]
vue: true
weight: 20
---
In this example, we use [jsdiff](https://www.npmjs.com/package/diff) to compare two strings (that simulate two files), generate the patch result as a string (similar to the output of diff), and display the patch in html using [diff2html](https://www.npmjs.com/package/diff2html).

<div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jsdiff/5.0.0/diff.min.js" integrity="sha512-Rjml7/E2zETyVFhzIQnTEjW7PBCH5/Y4ac2uu9MGqh1JclCVHbvT1lIlcVmvAGFipi/L16eA6Jr9km2zit9Tfg==" crossorigin="anonymous"></script>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css" />
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/diff2html/bundles/js/diff2html.min.js"></script>
</div>

<style type="text/css">
    textarea { margin: 5px; height: 4cm; }
    .panel { padding: 8px; background-color: #eff;
     border: thin solid lightgrey; border-radius: 8px; }
    .diff-result { padding-top: 5mm; float: clear; }
    .clear { clear: both; }
    .left { float: left; margin-left: 16px; }
    .half { width: calc(40% - 16px); }
</style>

<div id='sample-app'>
  <textarea class='left half' v-model='s1'></textarea>
  <textarea class='left half' v-model='s2'></textarea>
  <div class='clear'>
    <button @click='run'>Go!</button>
  </div>
  <div class='diff-result' v-show='patch'>
    <div class='panel' v-html='diff_res'>m</div>
    <h3>Diff Raw Output</h3>
    <div class='left'>
      diffLines
      <pre class='panel'>{{diff_lines}}</pre>
    </div>
    <div class='left'>
      createTwoFilesPatch
      <pre class='panel'>{{patch}}</pre>
    </div>
    <div class='clear' />
  </div>
</div>



<script lang='javascript'>

const log = console.log

var app = new Vue({
  el: '#sample-app',
  data: {
    title: 'diff two strings',
    s1: `Hello
  this is used to test diff
  hello, hero
  lines to remove
  2nd line
  unchanged
  more text
`,
    s2: `Hello
  this is used to test diff
  hello, world
  unchanged
  1
    2
    3 lines are aded
  more text
`,
    diff_res: '',
    diff_lines: '',
    patch: '',
  },
  methods: {
    run: function () {
      const s1 = this.s1
      const s2 = this.s2
      dfo = Diff.diffLines(s1, s2, {})
      this.diff_lines = `${JSON.stringify(dfo, null, 2)}\n`
      this.patch = Diff.createTwoFilesPatch('Left', 'Right', s1, s2)
      this.diff_res = Diff2Html.html(this.patch, {
        drawFileList: false,
        matching: 'lines',
        outputFormat: 'side-by-side',
      })
    }
  }
})

</script>

