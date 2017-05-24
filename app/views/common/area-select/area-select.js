/**
 * Created by Administrator on 2017/5/4.
 */
var frame = require("ui/frame");
var config = require('../../../shared/config');
var dialogsModule = require("ui/dialogs");
var visibility = require("ui/enums");
var color = require("color");
var ImageModule = require("ui/image");
var viewModel = require("./province-select-view-model");
var page;
var provinces;
var citys;
var districts;

/**第一个listview */
var lv1;
var img1;
var label1;
var flag1 = true;
/**第二个listview */
var lv2;
var l2;
var img2;
var label2;
var flag2 = true;
/**第三个listview */
var lv3;
var img3;
var label3;
var flag3 = true;
var l3;

exports.loaded = function (args) {
    page = args.object;
    // provinces = page.getViewById("provinces");//省的Lable---根据选中的条目来变化
    // citys = page.getViewById("citys");//市的Lable
    // districts = page.getViewById("districts");//区的Lable

    config.cityState = false;

    lv1 = page.getViewById("lv1");
    lv2 = page.getViewById("lv2");
    lv3 = page.getViewById("lv3");

    l1 = page.getViewById("l1");
    l2 = page.getViewById("l2");
    l3 = page.getViewById("l3");

    img1 = page.getViewById("img1");
    img2 = page.getViewById("img2");
    img3 = page.getViewById("img3");

    label1 = page.getViewById("label1");
    label2 = page.getViewById("label2");
    label3 = page.getViewById("label3");
    page.bindingContext = new viewModel.ViewModel();
};

function onBackTap(args) {
    frame.topmost().goBack();
}

function completeTap(args) {
    var topmostFrame = frame.topmost();
    var message = {
        msg: config.provinceArray + "-" + config.cityArray + "-" + config.districtArray,
        district_id: config.districtId
    };

    /*把消息返回上一个进入界面*/
    var backstackEntry = topmostFrame.backStack[topmostFrame.backStack.length - 1];
    backstackEntry.entry.context = message;
    topmostFrame.goBack(backstackEntry);
}


exports.completeTap = completeTap
exports.onBackTap = onBackTap

