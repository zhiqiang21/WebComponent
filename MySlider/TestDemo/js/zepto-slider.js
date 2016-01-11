var timeSetOut;
var imgIndex;
var ulObject = $('.slider_ul');
var ulImgLi = $('.slider_ul li');
var titleWidth = $('#slider-title').width();
var liBtnObj = $('.slider-btn li');
var liBtnParent = $('.slider-btn');
var bodyObject = $('body');
var sliderTitle = $('.slider-title');


var startTimeOut = function() {
    timeSetOut = setTimeout(animateDom, 4000);
};
var stopTimeOut = function() {
    clearTimeout(timeSetOut);
};

var stopPageScroll = function() {
    $('body').css('overflow', 'hidden');
};

//动画切换
var animateDom = function() {
    ulObject.animate({
        'margin-left': -titleWidth
            // 'transform':'translate3d(-'+titleWidth+',0 ,0)'
    }, 500, 'ease-in', appendHtml);
    startTimeOut();
};

//动态给li添加value值
var addLiValue = function(obj) {
    $.each(obj, function(i, item) {
        $(item).attr('value', i);
    });
};


var appendHtml = function() {
    var liList = $('.slider_ul > li');
    var moveDomObj = liList.eq(0);
    var currValue = moveDomObj.next().attr('value');

    changeBtnClass(currValue);
    ulObject.append(moveDomObj);
    ulObject.append(moveDomObj).css('margin-left', 0);
    // ulObject.append(moveDomObj);

};

//点击按钮切换
var triggerLiBtn = function() {
    stopTimeOut();
    var currBtnValue = $('.current-btn').attr('value');
    var currDomValue = $(event.target).parents('li').attr('value');
    var prevList = [];
    if (currBtnValue < currDomValue) {
        //向后切换
        $.each(ulImgLi, function(i, item) {
            $(item).removeClass('current-btn');
            if ($(item).attr('value') < currDomValue) {
                prevList.push(item);
            }
        });
        ulObject.append($(prevList)).css('margin-left', 0);
    } else {
        //前切换
        $.each(ulImgLi, function(i, item) {
            $(item).removeClass('current-btn');
            if (currDomValue <= $(item).attr('value') && $(item).attr('value') < currBtnValue) {
                prevList.push(item);
            }
        });
        ulObject.prepend($(prevList)).css('margin-left', 0);
    }
    changeBtnClass(currDomValue);
    startTimeOut();
};

//改变按钮的样式
var changeBtnClass = function(value) {
    liBtnObj.removeClass("current-btn");
    $('.slider-btn').find('li[value="' + value + '"]').addClass('current-btn');
};

//触摸右划
var touchMoveRight = function() {
    ulObject.animate({
        'margin-left': 0
    }, 250, 'ease');
};

//触摸左划
var touchMoveLeft = function() {
    ulObject.animate({
        'margin-left': -titleWidth
    }, 250, 'ease', appendHtml);
};

//禁用手机默认的触屏滚动行为
document.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, false);

//触摸切换
var startX, moveX, endX, startY, moveY, endY, startTime, resultTime, tempValue, tempVertical, absTempValue, absVertical;
var moveTime;
var tempMoveX, tempMoveY, angleTouch;
var touchMoveEvent = function() {
    var tempArray, firstLiValue, dataTime;
    var prevDomObject;
    var currLiValue = $(event.target).parents('li').attr('value');
    var prevValuIndex = currLiValue - 1;

    dataTime = new Date();

    //判断是不是第一个元素
    if (currLiValue == 0) {
        prevDomObject = ulImgLi.eq(ulImgLi.length - 1);
    } else {
        prevDomObject = ulObject.find('li[value="' + prevValuIndex + '"]');
    }
    switch (event.type) {
        case 'touchstart':
            event.stopPropagation();
            event.preventDefault();
            stopTimeOut();
            startTime = dataTime.getMinutes() * 60 * 1000 + dataTime.getSeconds() * 1000 + dataTime.getMilliseconds();

            startX = event.touches[0].pageX;
            startY = event.touches[0].pageY;
            break;
        case 'touchmove':
            event.preventDefault();
            event.stopPropagation();
            moveX = event.touches[0].pageX;
            moveY = event.touches[0].pageY;

            //根据500ms内的移动距离判断是左右还是上下
            moveTime = dataTime.getMinutes() * 60 * 1000 + dataTime.getSeconds() * 1000 + dataTime.getMilliseconds() - startTime;
            if (moveTime > 100 && moveTime < 200) {
                tempMoveX = event.touches[0].pageX;
                tempMoveY = event.touches[0].pageY;
                angleTouch = Math.abs(tempMoveY - startY) / Math.abs(tempMoveX - startX);
            }

            tempVertical = startY - moveY;
            absVertical = Math.abs(tempVertical);
            tempValue = startX - moveX;
            absTempValue = Math.abs(tempValue);


            if (event.target.nodeName == 'IMG') {
                if (tempValue < 0 && angleTouch <= 1) {
                    //鼠标右滑动
                    ulObject.css('margin-left', -titleWidth);
                    ulObject.prepend($(prevDomObject));
                    ulObject.css({
                        'margin-left': -(titleWidth - absTempValue)
                    });
                }
                if (tempValue > 0 && angleTouch <= 1) {
                    //鼠标左滑动

                    //解决连续滑动图片错乱
                    if (prevDomObject) {
                        ulObject.append($(prevDomObject));
                    }
                    ulObject.css({
                        'margin-left': -tempValue
                    });
                }
            }

            if (tempVertical > 0 && angleTouch > 1) {
                //上滑
                bodyObject.css('margin-top', -tempVertical + 'px');
            }

            if (tempVertical < 0 && angleTouch > 1) {
                //下滑
                if (absVertical > 130) {
                    tempVertical = -130;
                }
                bodyObject.css('margin-top', -tempVertical + 'px');
            }
            break;
        case 'touchend':
            resultTime = dataTime.getMinutes() * 60 * 1000 + dataTime.getSeconds() * 1000 + dataTime.getMilliseconds() - startTime;
            if (absTempValue < titleWidth) {
                if (event.target.nodeName == 'IMG') {
                    if (tempValue < 0 && angleTouch <= 1) {
                        //鼠标右滑动
                        if (resultTime > 500) {
                            if (absTempValue > titleWidth / 2) {
                                touchMoveRight();
                            } else {
                                ulObject.animate({
                                    'margin-left': -titleWidth
                                }, 250, 'ease');
                            }
                        } else {
                            touchMoveRight();
                        }
                    }
                    if (tempValue > 0 && angleTouch <= 1) {
                        //鼠标左滑动
                        if (resultTime > 500) {
                            if (absTempValue > titleWidth / 2) {
                                touchMoveLeft();
                            } else {
                                ulObject.animate({
                                    'margin-left': 0
                                }, 250, 'ease');
                            }
                        } else {
                            touchMoveLeft();
                        }
                    }
                }
            }

            if (tempVertical < 0 && angleTouch > 1) {
                //下滑
                bodyObject.animate({
                    'margin-top': 0
                }, 250, 'ease');
            }

            //改变切换按钮样式
            firstLiValue = ulObject.find('li').eq(0).attr('value');
            changeBtnClass(firstLiValue);
            startTimeOut();
            break;
    }
};

addLiValue(ulImgLi);
addLiValue(liBtnObj);
startTimeOut();
//按钮点击事件
liBtnParent.on('click', 'li', triggerLiBtn);
//触摸事件绑定
bodyObject.on('touchstart', ulImgLi, touchMoveEvent);
bodyObject.on('touchmove', ulImgLi, touchMoveEvent);
bodyObject.on('touchend', ulImgLi, touchMoveEvent);
