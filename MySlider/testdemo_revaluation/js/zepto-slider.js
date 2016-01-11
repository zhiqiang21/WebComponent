var sliderImgFunc = (function() {
    //---常量定义区----------------------------------
    return function(node, confTemp) {
        //---变量定义区---------------------------------
        var that = {};
        var timeSetOut;
        var conf = {
            startAnimate: true,
            btnShow: true,
            btnClass: 'current-btn',
            animateTime: 4000
        };

        //触摸切换变量定义区－－－－－－－－－－－－－
        var startX, moveX, endX, startY, moveY, endY, startTime, resultTime, tempValue, tempVertical, absTempValue, absVertical;
        var moveTime;
        var tempMoveX, tempMoveY, angleTouch;

        for (var i in confTemp) {
            if (i in conf) {
                conf[i] = confTemp[i];
            }
        }
        var _this = {
            DOM: {}, //节点容器
            objs: {}, //组件容器
            DOM_eventFun: { //DOM事件行为容器
            },
            slConWidth:function(){
               return  _this.DOM.sliderContent.width();
            },
            addLiValue: function(obj) {
                $.each(obj, function(i, item) {
                    $(item).attr('value-type', i);
                });
            },
            startAnimate: function() {
                timeSetOut = setTimeout(_this.animateDom, conf.animateTime);
            },
            stopAnimate: function() {
                clearTimeout(timeSetOut);
            },
            animateDom: function() {
                _this.DOM.imgContent.animate({
                    'margin-left': -_this.slConWidth()
                        //'transform': 'translate3d(-' + slConWidth + ',0 ,0)'
                }, 500, 'ease-in', _this.appendHtml);
                _this.startAnimate();
            },
            appendHtml: function() {
                var liList = _this.DOM.imgContent.find('[node-type=img-list]');
                var moveDomObj = liList.eq(0);
                var nextValue = moveDomObj.next().attr('value-type');

                _this.changeBtnClass(nextValue);
                _this.DOM.imgContent.append(moveDomObj);
                _this.DOM.imgContent.append(moveDomObj).css('margin-left', 0);
            },
            changeBtnClass: function(value) {
                _this.DOM.btnList.removeClass("current-btn");
                _this.DOM.btnContent.find('[value-type="' + value + '"]').addClass('current-btn');
            },
            triggerLiBtn: function() {
                _this.stopAnimate();
                var currBtnValue = $('[class=' + conf.btnClass + ']', _this.DOM.btnContent).attr('value-type');
                var currDomValue = $(event.target).parents('[node-type=btn-list]').attr('value-type');
                //imgList = imgContent.find('[node-type=img-list]');
                var prevList = [];
                if (currBtnValue < currDomValue) {
                    //向后切换
                    $.each(_this.DOM.imgList, function(i, item) {
                        $(item).removeClass('current-btn');
                        if ($(item).attr('value-type') < currDomValue) {
                            prevList.push(item);
                        }
                    });
                    _this.DOM.imgContent.append($(prevList)).css('margin-left', 0);
                } else {
                    //前切换
                    $.each(_this.DOM.imgList, function(i, item) {
                        $(item).removeClass('current-btn');
                        if (currDomValue <= $(item).attr('value-type') && $(item).attr('value-type') < currBtnValue) {
                            prevList.push(item);
                        }
                    });
                    _this.DOM.imgContent.prepend($(prevList)).css('margin-left', 0);
                }
                _this.changeBtnClass(currDomValue);
                _this.startAnimate();
            },
            judgeOneImg: function() {
                if (_this.DOM.imgList.length == 1) {
                    _this.DOM.btnList.hide();
                } else {
                    return false;
                }
            },
            touchMoveRight: function() {
                _this.DOM.imgContent.animate({
                    'margin-left': 0
                }, 250, 'ease');
            },
            touchMoveLeft: function() {
                _this.DOM.imgContent.animate({
                    'margin-left': -_this.slConWidth()
                }, 250, 'ease', _this.appendHtml);
            },
            touchMoveEvent: function() {
                var tempArray, firstLiValue, dataTime;
                var prevDomObject;
                var currLiValue = $(event.target).parents('[node-type=img-list]').attr('value-type');
                var prevValuIndex = currLiValue - 1;

                dataTime = new Date();

                //判断是不是第一个元素
                if (currLiValue == 0) {
                    prevDomObject = _this.DOM.imgList.eq(_this.DOM.imgList.length - 1);
                } else {
                    prevDomObject = _this.DOM.imgContent.find('[value-type="' + prevValuIndex + '"]');
                }
                switch (event.type) {
                    case 'touchstart':
                        event.stopPropagation();
                        event.preventDefault();
                        _this.stopAnimate();
                        startTime = dataTime.getMinutes() * 60000 + dataTime.getSeconds() * 1000 + dataTime.getMilliseconds();

                        startX = event.touches[0].pageX;
                        startY = event.touches[0].pageY;
                        break;
                    case 'touchmove':
                        event.preventDefault();
                        event.stopPropagation();
                        moveX = event.touches[0].pageX;
                        moveY = event.touches[0].pageY;

                        //根据200ms内的移动距离判断是左右还是上下
                        moveTime = dataTime.getMinutes() * 60000 + dataTime.getSeconds() * 1000 + dataTime.getMilliseconds() - startTime;
                        if (moveTime > 100 && moveTime < 200) {
                            tempMoveX = event.touches[0].pageX;
                            tempMoveY = event.touches[0].pageY;
                            angleTouch = Math.abs(tempMoveY - startY) / Math.abs(tempMoveX - startX);
                        }

                        tempVertical = startY - moveY;
                        absVertical = Math.abs(tempVertical);
                        tempValue = startX - moveX;
                        absTempValue = Math.abs(tempValue);
                        //angleTouch = absVertical - absTempValue;

                        if (event.target.nodeName == 'IMG') {
                            if (tempValue < 0 && angleTouch <= 1) {
                                //鼠标右滑动
                                _this.DOM.imgContent.css('margin-left', -_this.slConWidth());
                                _this.DOM.imgContent.prepend($(prevDomObject));
                                _this.DOM.imgContent.css({
                                    'margin-left': -(_this.slConWidth() - absTempValue)
                                });
                            }
                            if (tempValue > 0 && angleTouch <= 1) {
                                //鼠标左滑动

                                //解决连续滑动图片错乱
                                if (prevDomObject) {
                                    _this.DOM.imgContent.append($(prevDomObject));
                                }
                                _this.DOM.imgContent.css({
                                    'margin-left': -tempValue
                                });
                            }
                        }
                        if (tempVertical > 0 && angleTouch > 1) {
                            //上滑
                            _this.DOM.bodyObject.css('margin-top', -tempVertical + 'px');
                        }

                        if (tempVertical < 0 && angleTouch > 1) {
                            //下滑
                            if (absVertical > 130) {
                                tempVertical = -130;
                            }
                            _this.DOM.bodyObject.css('margin-top', -tempVertical + 'px');
                        }
                        break;
                    case 'touchend':
                        resultTime = dataTime.getMinutes() * 60000 + dataTime.getSeconds() * 1000 + dataTime.getMilliseconds() - startTime;
                        if (absTempValue < _this.slConWidth()) {
                            if (event.target.nodeName == 'IMG') {
                                if (tempValue < 0 && angleTouch <= 1) {
                                    //鼠标右滑动
                                    if (resultTime > 500) {
                                        if (absTempValue > _this.slConWidth() / 2) {
                                            _this.touchMoveRight();
                                        } else {
                                            _this.DOM.imgContent.animate({
                                                'margin-left': -_this.slConWidth()
                                            }, 250, 'ease');
                                        }
                                    } else {
                                        _this.touchMoveRight();
                                    }
                                }
                                if (tempValue > 0 && angleTouch <= 1) {
                                    //鼠标左滑动
                                    if (resultTime > 500) {
                                        if (absTempValue > _this.slConWidth() / 2) {
                                            _this.touchMoveLeft();
                                        } else {
                                            _this.DOM.imgContent.animate({
                                                'margin-left': 0
                                            }, 250, 'ease');
                                        }
                                    } else {
                                        _this.touchMoveLeft();
                                    }
                                }
                            }
                        }

                        if (tempVertical < 0 && angleTouch > 1) {
                            //下滑
                            _this.DOM.bodyObject.animate({
                                'margin-top': 0
                            }, 250, 'ease');
                        }

                        //改变切换按钮样式
                        firstLiValue = _this.DOM.imgContent.find('[node-type=img-list]').eq(0).attr('value-type');
                        _this.changeBtnClass(firstLiValue);
                        _this.startAnimate();
                        break;
                }
            }
        };
        //----------------------------------------------
        //---自定义事件绑定的回调函数定义区--------------------
        var bindCustEvtFuns = {};
        //----------------------------------------------
        //---广播事件绑定的回调函数定义区---------------------
        var bindListenerFuns = {};
        //-------------------------------------------
        //---参数的验证方法定义区---------------------------
        var argsCheck = function() {

        };
        //-------------------------------------------
        //---Dom的获取方法定义区---------------------------
        var parseDOM = function() {
            _this.DOM.sliderContent = $(node);
            _this.DOM.imgContent = $('[node-type=img-contenter]',node);
            _this.DOM.btnContent = $('[node-type=btn-contenter]',node);
            _this.DOM.btnList = _this.DOM.btnContent.find('[node-type=btn-list]');
            _this.DOM.imgList = _this.DOM.imgContent.find('[node-type=img-list]');
        };
        //-------------------------------------------

        //---模块的初始化方法定义区-------------------------
        var initPlugins = function() {
            if (conf.startAnimate == false) {
                return;
            }
            if (conf.btnShow == false) {
                _this.DOM.btnList.hide();
            }

            var judgeString = _this.judgeOneImg();
            if (judgeString == false) {
                _this.addLiValue(_this.DOM.btnList);
                _this.addLiValue(_this.DOM.imgList);
                _this.startAnimate();
            }
        };
        //-------------------------------------------

        //---DOM事件绑定方法定义区-------------------------
        var bindDOM = function() {
            var domTemp = _this.DOM;

            domTemp.sliderContent.on('click', 'li', _this.triggerLiBtn);
            domTemp.sliderContent.on('touchstart', domTemp.imgList, _this.touchMoveEvent);
            domTemp.sliderContent.on('touchmove', domTemp.imgList, _this.touchMoveEvent);
            domTemp.sliderContent.on('touchend', domTemp.imgList, _this.touchMoveEvent);
        };
        //-------------------------------------------

        //---自定义事件绑定方法定义区------------------------
        var bindCustEvt = function() {

        };
        //-------------------------------------------

        //---广播事件绑定方法定义区------------------------
        var bindListener = function() {

        };
        //-------------------------------------------

        //---组件公开方法的定义区---------------------------
        var destroy = function() {
            if (_this) {
                $.each(_this.objs, function(index, o) {
                    if (o && o.destroy) {
                        o.destroy();
                    }
                });
                _this = null;
            }
        };
        //-------------------------------------------
        //---组件的初始化方法定义区-------------------------
        var init = function() {
            parseDOM();
            initPlugins();
            bindDOM();
        };
        //-------------------------------------------
        //---执行初始化---------------------------------
        init();
        //-------------------------------------------

        //---组件公开属性或方法的赋值区----------------------
        that.destroy = destroy;
        //-------------------------------------------
        return that;
    };
})();

var node1= $('[node-type=slider-contenter]');
var node2= $('[node-type=slider-contenter-1]');

sliderImgFunc(node1,{});
sliderImgFunc(node2, {});
