;
(function($) {
    var SliderImgFunc = function(imgConter) {
        var _this = this;

        _this.touchObject = {};
        _this.ImgSlider = imgConter;
        _this.touchObject.prevDomNode = true;


        _this.btnList = $('[node-type=btn-list]', imgConter);
        _this.imgUlConter = $('[node-type=img-contenter]', imgConter);
        _this.imgLiList = $('[node-type=img-list]', imgConter);


        _this.setting = {
            "autoAnimate": true, //是否自动播放
            "btnShow": true, //是否显示图片切换按钮
            "btnClick": true, //点击按钮是否切换图片
            "touchMove": true,
            "changeTime": 3000, //图片切换时间间隔
            "animateType": 'ease-in', //动画类型
            "animateTime": 500, //动画完成时间mm
            "sweepTime": 400 //手指扫过切换图片的时间间隔 mm
        };

        $.extend(_this.setting, _this.getUserSetting());


        _this.addLiValue();

        //检测是否自动播放
        if (_this.setting.autoAnimate) {
            if (_this.imgLiList.length > 1) {
                _this.startAnimate();
            }
        }

        //检测是都显示按钮
        if (_this.setting.btnShow) {
            _this.showChangeBtn();
        }

        //按钮点击事件是否可用
        if (_this.setting.btnClick) {
            $(_this.ImgSlider).on('tap', 'li', function() {
                _this.stopAnimate();
                _this.trigBtnIndex = $(this).find('a').text();
                _this.btnChangeImg();
                setTimeout(function() {
                    _this.startAnimate();
                }, 0);
            });
        }

        //启用触摸事件
        if (_this.setting.touchMove) {
            $(_this.ImgSlider).on('touchstart', 'li', function() {
                _this.stopAnimate();
                _this.touchObject.currDomNode = this;
                _this.touchStart.call(_this);
            });
            $(_this.ImgSlider).on('touchmove', 'li', function() {
                _this.touchMove.call(_this);
            });
            $(_this.ImgSlider).on('touchend', 'li', function() {
                _this.touchEnd.call(_this);
                _this.startAnimate();
            });
        }

    };

    SliderImgFunc.prototype = {
        //获取图片区域的宽度
        slConWidth: function() {
            return this.ImgSlider.width();
        },
        //是否显示图片上的按钮
        showChangeBtn: function() {
            if (this.imgLiList.length <= 1) {
                // this.showChangeBtn();
                return false;
            } else {
                this.btnList.css({
                    "display": 'list-item',
                    "list-style-type": "none"
                });
            }
        },
        //给包含图片的 li 添加一个数字索引
        addLiValue: function() {
            $.each(this.imgLiList, function(i, item) {
                $(item).attr('value-type', i);
            });
        },
        //开始播放动画，根据容器动态获取其中的图片的容器,使用 translate3d触发 gpu 渲染动画
        startAnimate: function() {
            var _this = this;
            var moveConter = _this.imgUlConter;

            _this.imgInterval = setInterval(function() {
                moveConter.animate({
                    translate3d: '-' + _this.slConWidth() + 'px,0,0'
                }, _this.setting.animateTime, _this.setting.animateType, delayAppend);
            }, _this.setting.changeTime);

            function delayAppend() {
                setTimeout(function() {
                    _this.appendHtml();
                }, 0);
            }
        },
        appendHtml: function() {
            var liList = $('[node-type=img-list]', this.ImgSlider);
            var firstDom = liList.eq(0);

            this.imgUlConter.append(firstDom);
            this.changeBtnClass();

            //初始化 ul 图片容器的值
            this.imgUlConter.css('transform', 'translate3d(0,0,0)');

        },
        changeBtnClass: function(value) {
            var liList = $('[node-type=img-list]', this.ImgSlider);
            this.btnList.removeClass("current-btn");
            this.btnList.eq(Number(liList.eq(0).attr('value-type'))).addClass('current-btn');
        },
        //按钮切换图片
        btnChangeImg: function() {
            var _this = this;

            //触发的按钮
            var trigBtnIndex = _this.trigBtnIndex - 1;
            var imgLiList = _this.imgLiList;
            var tempArray = [];

            // 当前所在按钮的索引
            var currBtnIndex = $('[class=current-btn]', _this.ImgSlider).text() - 1;

            //重新获取 ul节点下图片节点的顺序
            var newImgList = $('[node-type=img-list]', _this.ImgSlider);


            if (currBtnIndex > trigBtnIndex) {
                $.each(newImgList, function(index, el) {
                    var temp = Number($(el).attr('value-type'));
                    if (temp < currBtnIndex && temp >= trigBtnIndex) {
                        tempArray.push(el);
                    }
                });
                //将图片添加的当前图片之前，并且初始化容器的样式
                _this.imgUlConter.prepend($(tempArray))
                    .css('transform', 'translate3d(0,0,0)');
            } else {
                $.each(imgLiList, function(i, item) {
                    if ($(item).attr('value-type') < trigBtnIndex) {
                        tempArray.push(item);
                    }
                });

                //将图片添加的当前图片之后，并且初始化容器的样式
                _this.imgUlConter.append($(tempArray))
                    .css('transform', 'translate3d(0,0,0)');
            }

            $(imgLiList).removeClass('current-btn');
            _this.changeBtnClass(trigBtnIndex);
        },

        //获取触摸的初始坐标
        touchStart: function() {
            var dateTime = new Date();

            this.touchObject.startX = event.touches[0].pageX;
            this.touchObject.startY = event.touches[0].pageY;
            this.touchObject.startTime = dateTime.getTime();
        },

        touchMove: function() {
            var ttb, tempMoveX, tempMoveY;
            var newImgList = $('[node-type=img-list]', this.ImgSlider);

            ttb = this.touchObject;
            ttb.moveX = event.touches[0].pageX;
            ttb.moveY = event.touches[0].pageY;

            ttb.tempMoveX = ttb.moveX - ttb.startX;
            ttb.tempMoveY = ttb.moveY - ttb.startY;

            if (ttb.tempMoveX > 0) {
                if (ttb.prevDomNode) {
                    this.imgUlConter.prepend(newImgList.eq(newImgList.length - 1))
                        // .css('transform', 'translate3d(0,0,0)');
                        .css('transform', 'translate3d(-' + this.slConWidth() + 'px,0,0)');
                    ttb.prevDomNode = false;
                }
                this.moveRight();
            }

            if (ttb.tempMoveX < 0) {
                this.moveLeft();
            }

        },

        touchEnd: function() {
            var ttb, changeWidth, tempTime;
            var dateTime = new Date();

            ttb = this.touchObject;
            changeWidth = this.slConWidth() / 2;
            ttb.prevDomNode = true;
            ttb.endTime = dateTime.getTime();
            tempTime = ttb.endTime - ttb.startTime;

            //调用 sweep判断是否切换动画或者是拖动切换
            if (tempTime < this.setting.sweepTime) {
                 this.sweepFunc();
            } else {
                if (ttb.tempMoveX < 0) {
                    if (Math.abs(ttb.tempMoveX) > changeWidth) {
                        this.originLeft();
                    } else {
                        this.originRight();
                    }
                } else {
                    if (Math.abs(ttb.tempMoveX) > changeWidth) {
                        this.originRight();
                    } else {
                        this.originLeft();
                    }
                }
            }
        },

        moveLeft: function() {
            this.imgUlConter.css('transform', 'translate3d(' + this.touchObject.tempMoveX + 'px,0,0)');
        },

        moveRight: function() {
            var moveTemp = this.slConWidth() - this.touchObject.tempMoveX;
            this.imgUlConter.css('transform', 'translate3d(-' + moveTemp + 'px,0,0)');
        },

        //扫动的函数
        sweepFunc:function(){
            if (this.touchObject.tempMoveX < 0) {
                this.originLeft();
            } else {
                this.originRight();
            }
        },

        //因为滑动过半或者是不过半，返回的时间都应该至少是是做一次完整动画的一半时间
        originRight: function() {
            this.imgUlConter.animate({
                'translate3d': '0,0,0'
            }, this.setting.animateTime / 2, this.setting.animateType);
        },
        originLeft: function() {
            var _this = this;
            _this.imgUlConter.animate({
                'translate3d': '-' + _this.slConWidth() + 'px,0,0'
            }, _this.setting.animateTime / 2, _this.setting.animateType, function() {
                _this.appendHtml();
            });
        },
        stopAnimate: function() {
            var _this = this;
            clearTimeout(_this.imgInterval);
        },
        getUserSetting: function() {
            var userSetting = this.ImgSlider.attr('user-setting');
            if (userSetting && userSetting !== '') {
                return $.parseJSON(userSetting);
            } else {
                return {};
            }
        },
        destoryFunc: function() {

        }
    };

    SliderImgFunc.init = function(imgConter) {
        var _this = this;
        imgConter.each(function() {
            new _this($(this));
        });
    };

    window.SliderImgFunc = SliderImgFunc;
})(Zepto);
