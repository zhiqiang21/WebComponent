var touchDirection = function(e) {
    var date;
    dateTime = new Date();

    function preDefault(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    return function() {
        var that = {};
        switch (e.type) {
            case 'touchstart':
                preDefault(e);

                startTime = dataTime.getTime();
                startX = e.touches[0].pageX;
                startY = e.touches[0].pageY;
                break;
            case 'touchmove':
                preDefault(e);

                moveX = e.touches[0].pageX;
                moveY = e.touches[0].pageY;

                //根据200ms内的移动距离判断是左右还是上下
                moveTime = dataTime.getTime() - startTime;
                if (moveTime > 100 && moveTime < 200) {
                    tempMoveX = e.touches[0].pageX;
                    tempMoveY = e.touches[0].pageY;
                    angleTouch = Math.abs(tempMoveY - startY) / Math.abs(tempMoveX - startX);
                }

                tempVertical = startY - moveY;
                absVertical = Math.abs(tempVertical);
                tempValue = startX - moveX;
                absTempValue = Math.abs(tempValue);
                //angleTouch = absVertical - absTempValue;

                if (e.target.nodeName == 'IMG') {
                    if (tempValue < 0 && angleTouch <= 1) {
                        //鼠标右滑动

                    }
                    if (tempValue > 0 && angleTouch <= 1) {
                        //鼠标左滑动


                    }
                }
                if (tempVertical > 0 && angleTouch > 1) {
                    //上滑

                }

                if (tempVertical < 0 && angleTouch > 1) {
                    //下滑

                }
                break;
            case 'touchend':
                preDefault(e);

                resultTime = dataTime.getTime() - startTime;
                break;
        }
        return that;
    };
};
