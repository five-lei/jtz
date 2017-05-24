/**
 * Created by Administrator on 2017/3/15.
 */
// 点击跳转
var frameModule = require("ui/frame");
var SystemMessageViewModel = require("./account-message-view-model");
var DatePickerManager = require("nativescript-timedatepicker");
/*返回上一级*/
exports.return = function(args) {
    frameModule.topmost().goBack();
};
exports.loaded=function (args) {
    var page = args.object;
    page.bindingContext = new SystemMessageViewModel().init();
}
exports.waterMessageDetail = function() {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "views/message/water-details/water-details",
        context: {
            "title": "任务消息",
        },
    }
    topmost.navigate(navigationEntry);
};
exports.tapOrderTask = function () {

    var mCallback = function (result) {
        if (result) {
            alert(result);
        }
    };
    DatePickerManager.init(mCallback,null,null);

    DatePickerManager.showDatePickerDialog();

};