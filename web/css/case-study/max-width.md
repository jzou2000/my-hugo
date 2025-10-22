---
title: max-width
---

conclusion: max-width overrides width

<style type='text/css'>
.frame {
    margin-top: 32px;
    background: gray;
    width: 500px;
    height: 200px;
    overflow: hidden;
    border-radius: 16px;
}
.frame img {
    display: block;
    margin: auto;
}
.panel {
    width: 400px;
}
.filled {
    width: 100%;
    height: 100%;
}
.max {
    max-width: 150px;
}
.m {
    width: 60%;
}
.fixed {
    width: 200px;
}
</style>

default
<div class='frame'>
  <img src='../sample.svg'>
</div>

fill
<div class='frame'>
  <img src='../sample.svg' class='filled'>
</div>

width=m 60%
<div class='frame'>
  <img src='../sample.svg' class='m'>
</div>

width=m 60% max
<div class='frame'>
  <img src='../sample.svg' class='m max'>
</div>

width=fixed 200
<div class='frame'>
  <img src='../sample.svg' class='fixed'>
</div>

width=fixed 200 max
<div class='frame'>
  <img src='../sample.svg' class='fixed max'>
</div>

