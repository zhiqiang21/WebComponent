/**
 * Created by zhiqiang on 2015/10/26.
 * hpuhouzhiqiang@gmail.com
 * 拖动选择项切换位置
 **/

;
(function($) {
    var SelectDrag = function(obj) {
        var _this = this;
        _this.typeContent = obj;
        _this.touchObject = {};
        _this.contentNode = $('[node-type=node-co]', obj);
        _this.btn = $('[node-type=del-btn]', obj);

        $(obj).on('touchstart', '[node-type=node-co]', function() {
            _this.touchObject.moveNode = this;
            _this.touchStart();
        });
        $(obj).on('touchmove', '[node-type=node-co]', function() {
            _this.touchMove();
        });
        $(obj).on('touchend', '[node-type=node-co]', function() {
            _this.touchEnd();
        });


    };

    SelectDrag.prototype = {
        moveWidth: function() {
            return $('[node-type=del-btn]', this.typeContent).width();
        },
        contentWidth: function() {
            return $('[node-type=pay-mode]').width();
        },
        touchStart: function() {
            this.touchObject.startX = event.touches[0].pageX;
            this.touchObject.startY = event.touches[0].pageY;
        },
        touchMove: function() {
            var ttb, tempMoveX, tempMoveY, moveNode, transValue;

            ttb = this.touchObject;
            ttb.moveX = event.touches[0].pageX;
            ttb.moveY = event.touches[0].pageY;

            ttb.tempMoveX = ttb.moveX - ttb.startX;
            ttb.tempMoveY = ttb.moveY - ttb.startY;

            moveNode = $(ttb.moveNode);

            //左
            if (ttb.tempMoveX < 0) {
                if (moveNode.attr('node-dir') !== 'left') {
                    this.moveLeft();
                }
            }

            //下
            if (ttb.tempMoveY > 0) {

            }
            // 上
            if (ttb.tempMoveY < 0) {

            }

        },
        touchEnd: function() {
            var ttb;
            ttb = this.touchObject;

            if (Math.abs(ttb.tempMoveX) >= (this.moveWidth() / 2)) {
                $(ttb.moveNode).animate({
                    translate3d: '-' + this.moveWidth() + 'px,0,0'
                }, 100, 'ease-in');
            } else {
                $(ttb.moveNode).animate({
                    translate3d: '0,0,0'
                }, 100, 'ease-in');
            }

            ttb = {};
        },
        //向右
        moveRight: function() {


        },
        //向左滑动
        moveLeft: function() {
            var ttb, moveWidth;
            ttb = this.touchObject;
            moveWidth = Math.abs(ttb.tempMoveX);

            if (moveWidth < this.moveWidth()) {
                $(ttb.moveNode).css('transform', 'translate3d(' + ttb.tempMoveX + 'px,0,0)');
            }
            // if (moveWidth >= (this.moveWidth() / 2)) {
            //     $(ttb.moveNode).attr('node-dir', 'left');
            // }

        },
        //向上滑动
        moveDown: function() {},
        //向下滑动
        moveUp: function() {},

        originLeft: function() {},

        originRight: function() {},

        destoryFunc: function() {

        }
    };


    SelectDrag.init = function(typeContent) {
        var _this = this;
        $.each(typeContent, function(i, item) {
            new _this($(item));
        });
    };

    window.SelectDrag = SelectDrag;
})(Zepto);
