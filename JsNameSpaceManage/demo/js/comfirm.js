JSManage.loadPlugin('js.confirm',function($){

	return function(content,conf){

		var that ={};
		var con=confirm('这个是 confirm 对象');
        if(con){

        }

		return that;
	};
});
