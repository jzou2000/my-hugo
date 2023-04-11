---
title: position
---

<style type="text/css">
.box {
    border: thin solid black;
    margin: 4px;
    padding: 12px;
    border-radius: 8px;
}
.blue {
    background-color: lightblue;
}
.green {
    background-color: lightgreen;
}
.red {
    background-color: pink;
}
.yellow {
    background-color: lightyellow;
}
.container {
    position: relative;
    overflow: auto;
    background-color: #eee;
    border-radius: 8px;
}
.big {
    height: 5cm;
}
.h-2 {
    height: 2cm;
}
.w-2 {
    width: 2cm;
}
.c-abs div {
    position: absolute;
    height: 2cm;
    width: 2cm;
}
.c-sticky div {
    position: sticky;
    height: 2cm;
    width: 3cm;
}
.p-0 {
    left: 0px;
    top: 0px;
}
.p-1 {
    left: 100px;
    top: 30px;
}
.p-2 {
    left: 200px;
    top: 80px;
}
.sticky-2 {
    position: sticky;
    top: 1.0cm;
}
.abs {
    position: absolute;
    top: 0;
}
</style>


<div class='box container c-abs big'>
  <h2>default is absolute</h2>
  This is a container for children that have position=absolute by default.
  <p>more text</p>
  <p>more text</p>
  <p>more text</p>
  <p>more text</p>
  <p>more text</p>
  <p>more text</p>
  <p>more text</p>
  <p>more text</p>
  <p>more text</p>
  <p>more text</p>
  <div class='red p-0'>x=0, y=0</div>
  <div class='yellow p-1'>x=100, y=30</div>
  <div class='green p-2'></div>
  <div class='blue sticky-2'></div>
</div>

<div class='box container c-sticky big'>
  <h2>default is sticky</h2>
  This is a container for children that have position=sticky by default.
  <p>more text</p>
  <p>more text</p>
  <p>more text</p>
  <div class='red p-0'>x=0, y=0</div>
  <div class='yellow p-1'>x=100, y=30</div>
  <div class='green p-2'></div>
  <div class='blue sticky-2'></div>
  <div class='abs'>
  <p>more text</p>
  <p>more text</p>
  <p>more text</p>
  <p>more text</p>
  <p>more text</p>
  <p>more text</p>
  <p>more text</p>
  </div>
</div>

