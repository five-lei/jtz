/**
 * Created by Administrator on 2017/5/4.
 */
var frame = require("ui/frame");
var config = require('../../../shared/config');
var color = require("color");
var viewModel = require("./bigtype-select-view-model");
var page, navigationContext;

/**第一个listview */
var lv1;
var l1;
var img1;
var label1;
/**第二个listview */
var lv2;
var l2;
var img2;
var label2;

exports.loaded = function (args) {
    page = args.object.page;
    navigationContext = page.navigationContext;
    config.cityState = false;

    lv1 = page.getViewById("lv1");
    lv2 = page.getViewById("lv2");

    l1 = page.getViewById("l1");
    l2 = page.getViewById("l2");

    img1 = page.getViewById("img1");
    img2 = page.getViewById("img2");

    label1 = page.getViewById("label1");
    label2 = page.getViewById("label2");
    page.bindingContext = new viewModel.ViewModel();
};

function onBackTap(args) {
    frame.topmost().goBack();
}

function completeTap(args) {
    var topmostFrame = frame.topmost();
    console.dump(navigationContext)
    navigationContext.bigType = config.provinceArray;
    navigationContext.smallType = config.cityArray;
    navigationContext.text = config.provinceArray + "-" + config.cityArray;
    navigationContext.bigTypeId = config.provinceId;
    navigationContext.smallTypeId = config.cityId;

    /*把消息返回上一个进入界面*/
    var backstackEntry = topmostFrame.backStack[topmostFrame.backStack.length - 1];
    backstackEntry.entry.context = navigationContext;
    topmostFrame.goBack(backstackEntry);
}


exports.completeTap = completeTap;
exports.onBackTap = onBackTap;

