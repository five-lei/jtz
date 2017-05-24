/**
 * Created by Administrator on 2017/3/22.
 */
var frameModule = require("ui/frame");
var navigator = require("../../../common/navigator");
var topmost = frameModule.topmost();
var DatePickerManager = require("nativescript-timedatepicker");
var dialogsModule = require("ui/dialogs");
var moment = require('moment');
var content;
var search_criteria;
var receipt_address;
var waybillType;
var allocation_time;
var sign_time;
var districtId;

function pageLoaded(args) {
    var page = args.object;
    content = page.navigationContext;
    receipt_address = page.getViewById("receipt-address");
    if (content != undefined) {
        receipt_address.cssClass = "hint-label2";
        receipt_address.text = content.msg;
        districtId = content.district_id;
    } else {
        receipt_address.cssClass = "hint-label";
        receipt_address.text = "去选择";
        districtId = null;
    }
}
exports.pageLoaded = pageLoaded;


function goBack(args) {
    navigator.navigateBack();
}
exports.goBack = goBack;

/*选择时间*/
exports.onSelectTime = function (args) {
    var obj = args.object;
    showDateDialog((date) => {
        var scheduleMoment = moment(date, "DD MM YYYY");
        var scheduleJS = scheduleMoment.toDate();
        var dateTime = moment(scheduleJS).format('YYYY-MM-DD')
        obj.text = dateTime;
        obj.cssClass = "hint-label2";
    });
}
function showDateDialog(cb) {
    //创建回调函数
    var mCallback = function (result) {
        if (result && cb) {
            cb(result);
        }
    };
    DatePickerManager.init(mCallback, null, null);
    DatePickerManager.showDatePickerDialog();

}

/*选择地址*/
exports.onSelectAddress = function (args) {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "views/common/area-select/area-select",
    }
    topmost.navigate(navigationEntry);
}

/*搜索*/

exports.onSearch = function (args) {
    var page = args.object.page;
    search_criteria = page.getViewById("search-criteria"); //搜索条件
    receipt_address = page.getViewById("receipt-address"); //收货地址
    waybillType = page.getViewById("waybillType"); //运单类型
    allocation_time = page.getViewById("allocation-time"); //分配时间
    sign_time = page.getViewById("signInTime"); //签收时间

    if (search_criteria.text.length == 0 && sign_time.text == "去选择" && receipt_address.text == "去选择" && waybillType.text == "去选择" && allocation_time.text == "去选择") {
        dialogsModule.alert({
            message: "请填写搜索条件",
            okButtonText: "OK"
        });
    } else {
        var topmost = frameModule.topmost();

        var sign_time_text = (sign_time.text == "去选择") ? '' : sign_time.text;
        var receipt_address_text = (receipt_address.text == "去选择") ? '' : districtId;
        var waybillType_text = (waybillType.text == "去选择") ? '' : (waybillType.waybillServiceType || '');
        var allocation_time_text = (allocation_time.text == "去选择") ? '' : allocation_time.text;
        var search_criteria_text = search_criteria.text || '';

        var navigationEntry = {
            moduleName: "views/task/history-task/history-task",
            context: {
                "condition" : {
                    "keyword": search_criteria_text,
                    "endCityId": receipt_address_text,
                    "SignBeginTime": sign_time_text,
                    "assignBeginTime": allocation_time_text,
                    "waybillServiceType": waybillType_text
                }
            },
        }
        topmost.navigate(navigationEntry);
    }


};