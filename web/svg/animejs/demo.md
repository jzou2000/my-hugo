---
title: Demo
nav: demo
---

<script src='/js/anime.min.js'></script>

<style type='text/css'>
.aj-box  {
    position: relative;
    left: 2mm;
    top: 30mm;
    width: 1cm;
    height: 1cm;
    background: red;
}
</style>

<div id='test-block' class='aj-box'>
R
</div>

<div>
    <button id='bplay'>play</button>
</div>

<script language='javascript'>

//alert('hello')
var a = anime({
  targets: '.aj-box',
  left: [150, 350],
  autoplay: false,
  delay: 300,
  duration: 2000,
  direction: 'alternate',
  //loop: 5,
});

document.querySelector('#bplay').onclick = a.play;

</script>
