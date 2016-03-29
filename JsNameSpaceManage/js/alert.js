JSManage.loadPlugin('js.alert',function($){
	//插件的 html 模板
	var TPL = '<div class="plugin">'
			+ 	'<span>我是模板的内容</span>'
			+	'<a>确定</a>'
			+ '</div>';

	/**
	 * [function 插件的操作方法]
	 * @param  {[type]} content [插件将要显示的内容]
	 * @param  {[type]} conf    [插件自定义配置]
	 * @return {[type]}         [description]
	 */
	return function(content,conf){
		conf = $.parseParam({
			ok : function(){},         //点击 ok 后 执行的回掉函数
			title : '提示',
			content : content || '',
			okTxt : '确定'
		}, conf);

		var that ={};
		//TODO
		//这里可以根据参数操作 html 模板
		// var render = $T.compile(TPL);
        // var html = render(conf);


		return that;
	};
});
