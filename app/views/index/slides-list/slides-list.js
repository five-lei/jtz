/**
 * Created by Administrator on 2017/4/15.
 */
var frameModule = require("ui/frame");
var ViewModel = require("./slides-list-view-model");

exports.loaded = function(args){
    var page = args.object;
    page.bindingContext = new ViewModel().init()
}




/*返回上一级*/
exports.return = function(args) {
    frameModule.topmost().goBack();
};