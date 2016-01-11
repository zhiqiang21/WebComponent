/**
 * Created by zhiqiang on 2015/10/26.
 * hpuhouzhiqiang@gmail.com
 * 拖动选择项切换位置
 **/
(function() {
    var startY;
    var payModeList = $('div[node-type=paymode-list]');
    var poModeHeight = payModeList.height();
    var currMovePosiDom;
    var currMoveDom;
    var currDomValue;
    var currOffsetTop;

    var touchMoveEvent = function() {
        switch (event.type) {
            case 'touchstart':
                touchStartFunc(event, this);
                break;
            case 'touchmove':
                touchMoveFunc(event, this);
                break;
            case 'touchend':
                touchEndFunc(event, this);
                break;
        }
    };
    var touchStartFunc = function(event, movedom) {
        startY = event.touches[0].pageY;
        currMoveDom = $(movedom).parents('div[node-type=paymode-list]');
        currDomValue = currMoveDom.parents().attr('value');
        currMoveDom.addClass('move-currdom');
        currOffsetTop = parseFloat(currMoveDom.css('top'));
    };

    var touchMoveFunc = function(event, movedom) {
        var moveY;
        var moveTemp;
        var prevObject;
        var nextObject;
        var prevValue;
        var prevObjInner;
        var nextValue;
        var nextObjInner;

        moveY = event.touches[0].pageY;
        moveTemp = startY - moveY;
        absMoveTemp = Math.abs(moveTemp);
        prevObject = currMoveDom.prev();
        nextObject = currMoveDom.next();
        prevValue = prevObject.attr('node-value');
        nextValue = nextObject.attr('node-value');


        //上滑
        if (moveTemp > 0) {
            if (Number(currMoveDom.attr('node-value')) > 0) {

                currMoveDom.css({
                    'top': currOffsetTop - moveTemp
                });
                if (absMoveTemp > poModeHeight / 2) {
                   $.each(payModeList, function(i, item) {
                    var tempTop = parseFloat($(item).css('top')) + (poModeHeight / 2);
                    var prevDo = payModeList.eq(i + 1);
                    var nextDo = payModeList.eq(i - 1);
                    if (currOffsetTop > tempTop) {
                        prevDo.css('top',currOffsetTop);
                    }
                });
                }
            }
        }
        if (moveTemp < 0) {
            if (Number(currMoveDom.attr('node-value')) < payModeList.length - 1) {}
        }
        //下滑
        //nextValue = nextValue.attr('value');

    };

    var touchEndFunc = function(event, movedom) {
        payModeList.removeClass('move-currdom');
        payModeList.removeAttr('style');
        payModeList.removeAttr('node-value');
        addPosiValue();
    };

    var addPosiValue = function() {
        $.each(payModeList, function(i, item) {
            $(item).attr('node-value', i);
        });
    };

    if (payModeList.length > 1) {
        addPosiValue();
        $('[node-type=pay-mode]').on('touchstart', 'i', touchMoveEvent);
        $('[node-type=pay-mode]').on('touchmove', 'i', touchMoveEvent);
        $('[node-type=pay-mode]').on('touchend', 'i', touchMoveEvent);
    }
})();
