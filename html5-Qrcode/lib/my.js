(function($) {

    var Qrcode = function(tempBtn) {
        if (window.WeiboJSBridge) {
            $(tempBtn).on('click', this.weiBoBridge);
        } else {
            $(tempBtn).on('change', this.getImgFile);
        }
    };

    Qrcode.prototype = {
        weiBoBridge: function() {
            WeiboJSBridge.invoke('scanQRCode', null, function(params) {
                //得到扫码的结果
                location.href=params.result;
            });
        },
        getImgFile: function() {
            var _this_ = this;
            var imgFile = $(this)[0].files;
            var oFile = imgFile[0];

            var oFReader = new FileReader();
            var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

            if (imgFile.length === 0) {
                return;
            }

            if (!rFilter.test(oFile.type)) {
                alert("选择正确的图片格式!");
                return;
            }

            oFReader.onload = function(oFREvent) {
                qrcode.decode(oFREvent.target.result);
                qrcode.callback = function(data) {
                    //得到扫码的结果
                    location.href = data;
                };
            };

            oFReader.readAsDataURL(oFile);
        },
        destory: function() {
            $(tempBtn).off('click');
        }
    };

    Qrcode.init = function(tempBtn) {
        var _this_ = this;
        var inputDom;

        tempBtn.each(function() {
            new _this_($(this));
        });
        $('[node-type=qr-btn]').on('click', function() {
            $(this).find('[node-type=jsbridge]')[0].click();
        });
    };
    window.Qrcode = Qrcode;
})(window.Zepto ? Zepto : jQuery);
