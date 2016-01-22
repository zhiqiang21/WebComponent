var touchJs = new TouchDirection();


$('.test_posi').on('touchstart',function(e){
    touchJs.getStartPosi(e);
    console.log(touchJs)
})
$('.test_posi').on('touchmove',function(e){
    touchJs.getMovePosi(e)
    console.log(touchJs);
})
$('.test_posi').on('touchend',function(e){
    // touchJs.getEndPosi(e)
    // console.log(touchJs);
})