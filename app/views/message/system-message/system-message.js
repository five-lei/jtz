/**
 * Created by Administrator on 2017/3/15.
 */
// 点击跳转
var frameModule = require("ui/frame");
var viewModel = require("./system-message-view-model").SystemMessageViewModel;
var DatePickerManager = require("nativescript-timedatepicker");
var moment = require('moment');
var models;

/*返回上一级*/
exports.return = function(args) {
    frameModule.topmost().goBack();
};
exports.loaded=function (args) {
    var page = args.object;
    models=new viewModel();
    page.bindingContext = models.init();
    models.queryData(page,null);

};
exports.waterMessageDetail = function(args) {
    var obj = args.object;
    var msgId = obj.id;
    var topmost = frameModule.topmost();
    topmost.navigate({
        moduleName:"views/message/water-details/water-details",
        context: {
            "sysMsgId": msgId,
        },
    });
};
exports.tapOrderTask = function (args) {
    var page =args.object.page;
    var mCallback = function (result) {
        if (result) {
            var scheduleMoment = moment(result, "DD MM YYYY");
            var scheduleJS = scheduleMoment.toDate();
            var dateTime = moment(scheduleJS).format('YYYY-MM-DD')
            // alert(dateTime);
            models=new viewModel();
            page.bindingContext = models.init();
            models.queryData(page,dateTime);
        }
    };
    DatePickerManager.init(mCallback,null,null);

    DatePickerManager.showDatePickerDialog();

};