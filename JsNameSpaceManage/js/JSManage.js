
/**
 * [管理 JavaScript 中变量的作用域]
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
var JSManage = (function() {
    var that = {};
    var errorList = [];

    /**
     * [function 挂载其它目录下的 js 文件]
     * @param  {[type]} ns    [目录结构]
     * @param  {[type]} maker [插件的回掉函数]
     * @return {[type]}       [description]
     */
    that.loadPlugin = function(ns, maker) {
        var NSList = ns.split('.');
        var step = that;
        var k = null;
        while (k = NSList.shift()) {
            if (NSList.length) {
                if (step[k] === undefined) {
                    step[k] = {};
                }
                //这里相当于将 step 又指向了
                step = step[k];
            } else {
                if (step[k] === undefined) {
                    try {
                        step[k] = maker(that);
                    } catch (exp) {
                        errorList.push(exp);
                    }
                }
            }
        }
    };

    /**
     * [function 编写插件过程中让默认参数和自定义参数合并]
     * @param  {[type]} oSource [默认插件的参数]
     * @param  {[type]} oParams [自定义配置参数]
     * @param  {[type]} isown   [是否复制默认参数原型链上的属性和值]
     * @return {[type]}         [description]
     */
    that.parseParam=function(oSource, oParams, isown){
		var key, obj = {};
		oParams = oParams || {};
		for (key in oSource) {
			obj[key] = oSource[key];
			if (oParams[key] != null) {
                //如果为 true 仅仅复制自身，不复制原型链
				if (isown) {
					if (oSource.hasOwnProperty[key]) {
						obj[key] = oParams[key];
					}
				}
				else {
					obj[key] = oParams[key];
				}
			}
		}
		return obj;
	};

    return that;
})();
