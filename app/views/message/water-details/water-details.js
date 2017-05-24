/**
 * Created by Administrator on 2017/3/14.
 */
var frameModule = require("ui/frame");
var phone = require( "nativescript-phone" );
var config = require("../../../shared/config");
var viewModel = require("./water-details-view-model").WaterDetailViewModel;
var models;

exports.loaded=function (args) {
    var page = args.object;
    var context = page.navigationContext;
    console.log(context.sysMsgId)
    models=new viewModel();
    page.bindingContext = models.init();
    models.queryData(page,context.sysMsgId);
};
/*返回上一级*/
exports.return = function(args) {
    frameModule.topmost().goBack();
};
/*联系客服*/
exports.onQuery =function () {
    phone.dial(config.phone,false);
}