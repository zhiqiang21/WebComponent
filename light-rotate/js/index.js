(function ($) {

    var LightRotate = function (select) {
        var _this = this;
        this.LightArea = select;
        //获取外围的灯
        this.topLight = $('[node-type=re-top]', select).find('span');
        this.rightLight = $('[node-type=re-right]', select).find('span');
        this.bottomLight = $('[node-type=re-bottom]', select).find('span');
        this.leftLight = $('[node-type=re-left]', select).find('span');

        //获取内部的奖品
        this.rowA = $('[node-type=row-a]', select).find('div');
        this.rowB = $('[node-type=row-b]', select).find('div');
        this.rowC = $('[node-type=row-c]', select).find('div');


        //其它参数定义区
        this.rewardTimer = '';

        this.rewardLayer = $('[node-type=reward-layer]', select);
        this.coverLayer = $('[node-type=cover_layer]', select);

        this.setting = {
            liAutoPlay: false,  //周围的灯是否自动旋转
            roLiSpeed: 100,     //灯旋转的速度ms
            roPrSpeed: 200,     //奖品旋转速度ms
            liDirection: true,  //旋转方向 true  正方向   false  反方向
            randomPrize: false  //空格是否随机选取
        };

        $.extend(_this.setting, _this.getSettingUser());

        if (_this.setting.liAutoPlay) {
            _this.liAutoPlay();
        }

        $(_this.LightArea).on('click', '[node-type=reward_btn]', function () {
            _this.initParams();
            _this.openCoverLayer();
            _this.openRewardLayer();

            _this.lightRun();
            _this.prizeRun();

            _this.sendPrizeAjax();
        });

    };


    LightRotate.prototype = {
        liAutoPlay: function () {
            //灯是否自动播放
            this.lightRun();
        },
        getLightList: function () {
            var lightList = [];
            var bottomRever;
            var leftRever;
            bottomRever = Array.from(this.bottomLight).reverse();
            leftRever = Array.from(this.leftLight).reverse();

            lightList = Array.from(this.topLight).concat(Array.from(this.rightLight));
            lightList = lightList.concat(bottomRever);
            lightList = lightList.concat(leftRever);

            if (this.setting.liDirection) {
                return lightList;
            } else {
                return lightList.reverse();
            }
        },
        getPrizeList: function () {
            var prizeList = [];
            var bottomPrize = Array.from(this.rowC).reverse();

            prizeList = Array.from(this.rowA);
            prizeList.push(this.rowB[2]);
            prizeList = prizeList.concat(bottomPrize);
            prizeList.push(this.rowB[0]);

            return prizeList;
        },
        lightRun: function () {
            var _this = this;

            function tempFunc() {
                var lightList = _this.getLightList();
                var lightLength = lightList.length;
                var i = 0;
                return function () {

                    $(lightList, _this.LightArea).removeClass('light_open');
                    $(lightList[i], _this.LightArea).addClass("light_open");
                    i++;

                    //使一轮循环结束后能够继续下次循环
                    if (i === lightLength) {
                        i = 0;
                    }
                };
            }

            var lightRunFunc = tempFunc();
            lightRunFunc();
            _this.lightInterVal = setInterval(lightRunFunc, _this.setting.roLiSpeed);
        },
        prizeRun: function () {
            var _this = this;

            function tempFunc() {
                var prizeList = _this.getPrizeList();
                var prizeLength = prizeList.length;
                var i = 0;
                return function () {
                    $(prizeList, _this.LightArea).removeClass('win-prize');
                    $(prizeList[i], _this.LightArea).addClass("win-prize");

                    if (Number($(prizeList[i], _this.LightArea).attr('grade-value')) === _this.prizeGradeId) {
                        // stopAnimation = true;
                        _this.closeAnimation();
                        _this.showResult(_this.prizeGradeId);
                    }

                    i++;
                    //使一轮循环结束后能够继续下次循环
                    if (i === prizeLength) {
                        i = 0;
                    }
                };
            }

            var prizeRunFunc = tempFunc();
            // prizeRunFunc();
            _this.prizeInterVal = setInterval(prizeRunFunc, _this.setting.roPrSpeed);
            // _this.prizeInterVal=setTimeout(function() {
            //     prizeRunFunc();
            //     setTimeout(arguments.callee, _this.setting.roPrSpeed);
            // }, _this.setting.roPrSpeed);
        },
        sendPrizeAjax: function () {
            var _this = this;
            // var data = {
            //     "code": 100004,
            //     "msg": "抽过了明天来",
            //     "data": ""
            // };
            var data = {
                "code": 100000,
                "msg": "抽过了明天来",
                "data": {
                    "grade": 4
                }
            };

            setTimeout(function () {
                _this.requestSuccess(data);

            }, 3000);

            //以下为 ajax 请求操作，延时是为防止接口返回太快看不到转动动画效果
            //_this.rewardTimer= setTimeout(function() {
            //     $.ajax({
            //         type: 'GET',
            //         url: '/aj/test/lottery',
            //         data: {
            //             vid: 123456
            //         },
            //         dataType: 'json',
            //         success: _this.requestSuccess,
            //         async: true
            //     });
            // }, 3000);
        },
        requestSuccess: function (data) {
            if (data.code === 100004) {
                this.requestFail(data.msg);
            }
            if (data.code === 100000) {
                this.prizeGradeId = data.data.grade;
            }
        },
        showResult: function (num) {
            this.closeCoverLayer();
            //根据后端返回的结果显示奖品
            var prizeText = '恭喜您获得了' + $('[grade-value="' + num + '"]', this.LightArea).text();
            alert(prizeText);
        },
        requestFail: function (data) {
            this.closeCoverLayer();
            //今天已经抽奖完成
            alert(data);

            this.closeAnimation();
        },
        closeAnimation: function () {
            clearInterval(this.lightInterVal);
            clearInterval(this.prizeInterVal);
        },
        openCoverLayer: function () {
            this.coverLayer.addClass("cover-layer");
        },
        closeCoverLayer: function () {
            this.coverLayer.removeClass("cover-layer");
        },
        openRewardLayer: function () {
            this.rewardLayer.addClass('reward-layer');
        },
        closeRewardLayer: function () {
            this.rewardLayer.removeClass('reward-layer');
        },
        initParams: function () {
            this.prizeGradeId = '';
        },
        getSettingUser: function () {
            var userSetting = this.LightArea.attr('data-setting');
            if (userSetting && userSetting !== '') {
                return $.parseJSON(userSetting);
            } else {
                return {};
            }
        },
        destory: function () {
            $(_this.LightArea).off();
            this.closeAnimation();
            this.rewardTimer = null;
        }
    };

    LightRotate.init = function (select) {
        var _this = this;
        select.each(function () {
            new _this($(this));
        });
    };

    window.LightRotate = LightRotate;
})(jQuery);
