var touchResult = new TouchDirection();

var touchStartEv = function(e){
    var that = touchResult.touchStartEven(e);
    console.log(that.startThat);
};

var touchMoveEv = function(e) {
    var that = touchResult.touchMoveEven(e);
    console.log(that.moveThat);
};

var touchEndEv = function(e) {
    var that = touchResult.touchEndEven(e);
};

$('.test').on('touchstart', touchStartEv);
$('.test').on('touchmove', touchMoveEv);
$('.test').on('touchend', touchEndEv);
