JSManage.loadPlugin('js.dir1.dir2.alert2',function($){

	return function(content,conf){

		var that ={};
		alert('我是 alert2 对象');

		return that;
	};
});
