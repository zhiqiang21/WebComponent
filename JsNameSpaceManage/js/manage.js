var Manage = (function() {
    var that = {};
    var errorList = [];
    var ns='data1.data2.data3'

    that.register = function(ns, maker) {
        var NSList = ns.split('.');
        var step = that;
        var k = null;
        while (k = NSList.shift()) {
            if (NSList.length) {
                if (step[k] === undefined) {
                    step[k] = {};
                }
                step = step[k];
            } else {
                console.log(that);
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
    that.register(ns);
    // return that;
})();
