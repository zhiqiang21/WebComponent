;
(function($) {
    var BlockTransform = function(temp) {


        var _this = this;
        var oddArray = [],
            evenArray = [],
            itemList;

        itemList = temp;
        temp.each(function(i, item) {
            if (i % 2 === 0) {
                evenArray.push(item);
            } else {
                oddArray.push(item);
            }
        });

        this.oddArray = $(oddArray);
        this.evenArray = $(evenArray);

        //Bind Event Function
        $('.change-btn').on('click', '.net-btn', function() {
            $('.list-btn').attr('hit', true);
            _this.netCallBack.call(_this);
        });
        $('.change-btn').on('click', '.list-btn', function() {
            var clickBtn = $(this),
                isNotClick = clickBtn.attr('hit');
            if (true.toString() === isNotClick) {
                _this.listCallBack.call(_this);
                clickBtn.attr('hit', false);
            }
        });
    }

    BlockTransform.prototype = {
        netCallBack: function() {
            // console.log('net')
            var _this = this;
            this.evenArray.addClass('trans-odd');
            this.oddArray.addClass('trans-even');

            setTimeout(function() {
                _this.oddArray.addClass('top-move')
            }, 500);
        },
        listCallBack: function() {
            // console.log('list')

            var _this = this;

            _this.oddArray.css({ 'margin-top': 0 });
            _this.evenArray.css({ 'width': '100%' });

            setTimeout(function() {
                _this.oddArray.css({ 'width': '100%', 'transform': 'translate3d(50%,0,0)' });
            }, 500);

            setTimeout(function() {
                _this.oddArray.css({ 'transform': 'translate3d(0,0,0)', 'transition': 'transform ease-in .3s' });
            }, 600);
            setTimeout(function() {
                $('.item-list').removeClass('trans-odd').removeClass('trans-even').removeClass('top-move').removeAttr('style');

            }, 1100);
        },
        destoryFunc: function() {
            $('.change-btn').off();
        }
    }

    BlockTransform.init = function(content) {
        new BlockTransform(content);
    };

    window.blockTransform = BlockTransform;

})(window.Zepto)
