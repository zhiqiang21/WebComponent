/**
 * Created by zhiqiang on 2015/10/14.
 * hpuhouzhiqiang@gmail.com
 * 图片的懒加载
 **/
function loadImgLazy(node) {
    var lazyNode = $('[node-type=imglazy]', node),
        mobileHeight, lazyOffSetHeight, tempHeight, currentNodeTop, imgObject,
        imgDataSrc, localUrl;

    localUrl = location.href;
    // 获取当前浏览器可视区域的高度
    mobileHeight = $(window).height();

    return function(co) {

        var conf = {
            'loadfirst': true,
            'loadimg': true
        };

        for (var item in conf) {
            if (item in co) {
                conf.item = co.item;
            }
        }

        var that = {};
        var _this = {};
        /**
         * [replaceImgSrc 动态替换节点中的src]
         * @param  {[type]} tempObject [description]
         * @return {[type]}            [description]
         */
        _this.replaceImgSrc = function(tempObject) {
            var srcValue;

            $.each(tempObject, function(i, item) {
                imgObject = $(item).find('img[data-lazysrc]');
                imgObject.each(function(i) {
                    imgDataSrc = $(this).attr('data-lazysrc');
                    srcValue = $(this).attr('src');
                    if (srcValue == '#') {
                        if (imgDataSrc) {
                            $(this).attr('src', imgDataSrc);
                            $(this).removeAttr('data-lazysrc');
                            //移除已经运行过懒加载节点的node-type 对性能提升
                            $(tempObject).removeAttr('node-type');
                        }
                    }
                });
            });
        };

        /**
         * 首屏判断屏幕上是否出现imglazy节点，有的话就加载图片
         * @param  {[type]} i) {                   currentNodeTop [description]
         * @return {[type]}    [description]
         */
        _this.loadFirstScreen = function() {
            if (conf.loadfirst) {
                lazyNode.each(function(i) {
                    currentNodeTop = $(this).offset().top;
                    if (currentNodeTop < mobileHeight + 800) {
                        _this.replaceImgSrc($(this));
                    }
                });
            }
        };

        //当加载过首屏以后按照队列加载图片
        _this.loadImg = function() {
            if (conf.loadimg) {
                $(window).on('scroll', function() {
                    var imgLazyList = $('[node-type=imglazy]', node);
                    for (var i = 0; i < 5; i++) {
                        _this.replaceImgSrc(imgLazyList.eq(i));
                    }
                });
            }
        };

        that = {
            replaceImgSrc: _this.replaceImgSrc(),
            mobileHeight: mobileHeight,
            objIsEmpty: function(obj) {
                for (var item in obj) {
                    return false;
                }
                return true;
            },
            destory: function() {
                if (_this) {
                    $.each(_this, function(i, item) {
                        if (item && item.destory) {
                            item.destory();
                        }
                    });
                    _this = null;
                }
                $(window).off('scroll');
            }
        };
        return that;
    };
}
