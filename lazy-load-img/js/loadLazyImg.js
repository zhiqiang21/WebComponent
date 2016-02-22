/**
 * Created by zhiqiang on 2015/10/14.
 * hpuhouzhiqiang@gmail.com
 * 图片的懒加载
 **/
;(function($) {
    var LoadImgLazy = function(imgNode) {
        var _this = this;
        _this.imgNode = imgNode;

        _this.setting = {
            "mobileHeight": 0, //扩展屏幕的高度，使第一屏加载个数可配置
            "loadNum": 1 //滚动时，当前节点之后加载个数
        };

        $.extend(_this.setting, _this.getSetting());

        _this.loadFirstSrceen();
        $(window).on('scroll', function() {
            _this.scrollLoadImg();
        });


    };

    LoadImgLazy.prototype = {
        mobileHeight: function() {
            return $(window).height();
        },
        loadFirstSrceen: function() {
            // 加载首屏
            var _this = this;
            var currentNodeTop;
            var imgNodeList = _this.imgNode;
            $(imgNodeList).each(function() {
                currentNodeTop = $(this).offset().top;
                if (currentNodeTop < _this.mobileHeight() + _this.setting.mobileHeight) {
                    _this.replaceImgSrc($(this));
                }
            });
        },
        scrollLoadImg: function() {
            //滚动的时候加载图片
            var _this = this;
            var currentNodeTop;
            var scrollTop = $('body').scrollTop();
            var imgLazyList = $('[node-type=imglazy]');

            $(imgLazyList).each(function() {
                currentNodeTop = $(this).offset().top;
                if (currentNodeTop - scrollTop < _this.mobileHeight()) {
                    //加载当前节点后的规定个数节点
                    for (var i = 0, len = _this.setting.loadNum; i < len; i++) {
                        _this.replaceImgSrc($(imgLazyList).eq(i));
                    }
                    return false;
                }
            });
        },
        replaceImgSrc: function(loadImgNode) {
            //动态替换图片
            var srcValue;
            var imgDataSrc;
            var _this = this;
            var imgUrlList = $(loadImgNode).find('img[data-lazysrc]');

            if (imgUrlList.length > 0) {
                imgUrlList.each(function(i) {
                    imgDataSrc = $(this).attr('data-lazysrc');
                    srcValue = $(this).attr('src');
                    if (srcValue === '#') {
                        if (imgDataSrc) {
                            $(this).attr('src', imgDataSrc);
                            $(this).removeAttr('data-lazysrc');
                        }
                    }
                });
                //移除已经运行过懒加载节点的node-type 对性能提升
                $(loadImgNode).removeAttr('node-type');
            }
        },
        getSetting: function() {
            var userSetting = $('[lazy-setting]').attr('lazy-setting');
            if (userSetting && userSetting !== '') {
                return $.parseJSON(userSetting);
            } else {
                return {};
            }
        },
        destory: function() {
            //销毁方法区
            $(window).off('scroll');
        }
    };

    LoadImgLazy.init = function(imgNode) {
        new this(imgNode);
    };

    window.LoadImgLazy = LoadImgLazy;

})(Zepto);
