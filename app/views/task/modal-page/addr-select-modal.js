"use strict";
var observable = require("data/observable");
var phone = require("nativescript-phone");
var application = require("application");
var dialogsUtil = require("../../../common/dialogsUtil");
var config = require('../../../shared/config');

var onClose;
var thisPage;

function onShownModally(args) {
    thisPage = args.object;
    onClose = args.closeCallback;
    thisPage.bindingContext = new observable.Observable({
        pickupAddress: args.context['pickupAddress'] || false,
        receiveAddress: args.context['receiveAddress'],
        selectedItem: null
    });
    console.log(args.context['pickupAddress'])
}

function onItemIndexChange(arg) {
    var items = thisPage.bindingContext.get('selectedItem'), selectedItem = items[arg.index];
    thisPage.bindingContext.set('selectedItem', selectedItem);
}

function closeModal() {
    thisPage.closeModal();
}

function saveItem() {
    // onClose(thisPage.bindingContext.get('selectedItem'));
}
/*收货*/
function receiveAddress(){
    console.log(123);
    var address=thisPage.bindingContext.get('receiveAddress');
    //TODO
    console.log("select address:"+address);
    onMap(address);
    thisPage.closeModal();

}
/*提货*/
function pickupAddress(){
    console.log(321);
    var address=thisPage.bindingContext.get('pickupAddress');
    //TODO
    console.log("select address:"+address);
    onMap(address);
    thisPage.closeModal();
}

/**
 * 调用百度地图
 * @param address 目的地
 * @param latitude 经度
 * @param longitude 维度
 */
function onMap(address) {
    var context = application.android.context;
    var latitude = config.latitude;
    var longitude = config.longitude;
    try {
        var info = context.getPackageManager().getApplicationInfo("com.baidu.BaiduMap",
            android.content.pm.PackageManager.GET_UNINSTALLED_PACKAGES);
        //移动APP调起Android百度地图
        var Intent = android.content.Intent;
        var intent = Intent.getIntent("intent://map/direction?origin=latlng:"+latitude+","+longitude+"|name:我的位置&destination="+address+"&src=yourCompanyName|yourAppName#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end");
        application.android.foregroundActivity.startActivity(intent); //启动调用
    } catch (e) {
        console.log(e);
        dialogsUtil.alert("需要安装百度地图app才能使用导航!");
    }

}
exports.saveItem = saveItem;
exports.onShownModally = onShownModally;
exports.closeModal = closeModal;
exports.onItemIndexChange = onItemIndexChange;
exports.selectReceiveAddress = receiveAddress;
exports.selectPickupAddress = pickupAddress;



