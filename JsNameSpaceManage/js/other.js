STK.register('ui.alert', function($){
	var TPL = '<div node-type="outer" class="tip_layer wrap_style1">'
		+		'<div class="tip_layer_tit" node-type="title"><%=title%></div>'
		+			'<div node-type="inner">'
		+				'<div class="tip_layer_cont">'
		+					'<p class="tip_layer_txt"><%=content%></p>'
		+				'</div>'
		+				'<div class="tip_layer_btn"><a href="javascript:void(0)" action-type="ok" class="btn_style1"><%=okTxt%></a></div>'
		+			'</div>'
		+		'</div>';
	var $T = $.template;
	return function(content, conf){
		conf = $.parseParam({
			ok : function(){},
			title : '提示',
			content : content || '',
			okTxt : '确定'
		}, conf);
		var render = $T.compile(TPL);
        var html = render(conf);
		var that = $.ui.dialog(html);
		that.show().setMiddle();
		var inner = that.getInner();
		var outer = that.getOuter();
		//阻止滚动
		outer.addEventListener('touchmove', function(evt){
			evt.preventDefault();
		}, false);
		var dEvt = $.delegatedEvent(inner);
        dEvt.add('ok', 'tap', function(){
        	conf.ok();
        	setTimeout(function(){
        		that.hide();
        	},500)
        });
        // setTimeout(function(){
        // 	conf.ok();
        // 	that.hide();
        // },2000)
		return that;
	}
});
