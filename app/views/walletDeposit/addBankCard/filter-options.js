var utils = require("utils/utils");
var platform = require("platform");
var visibility = require("ui/enums");
var myPlatform = require( "nativescript-platform" );

function openDrawer(args) {
    var drawer = args.object.page.getViewById("filter-options-drawer");
    drawer.gesturesEnabled = true;
    drawer.showDrawer();
}
exports.openDrawer = openDrawer;

function closeDrawer(args) {
    var drawer = args.object.page.getViewById("filter-options-drawer");
    drawer.gesturesEnabled = false;
    drawer.closeDrawer();
}
exports.closeDrawer = closeDrawer;


function drawerClosed(args) {
    var drawer = args.object;
    drawer.gesturesEnabled = false;
}
exports.drawerClosed = drawerClosed;

function drawerLoaded(args) {
    var drawer = args.object;
    drawer.gesturesEnabled = false;
    if (!drawer.autoCloseAssigned) {
        drawer.autoCloseAssigned = true;
        drawer.page.on("navigatedFrom", function(args) {
            drawer.closeDrawer();
        });
        if (drawer.ios) {
            drawer.ios.defaultSideDrawer.style.shadowMode = TKSideDrawerShadowMode.TKSideDrawerShadowModeSideDrawer;
            drawer.ios.defaultSideDrawer.style.dimOpacity = 0.3;
        }
    }
}
exports.drawerLoaded = drawerLoaded;


exports.filterOptionTap = function(args) {
    closeDrawer(args);
    var obj = args.object;
    var page = obj.page;

    var actionBar = page.getViewById("actionBar");
    var bank = page.getViewById("bankPage");
    var alipay = page.getViewById("alipayPage");

    if (obj.text == "银行卡"){
        alipay.style.visibility = "collapse";
        bank.style.visibility = "visible";

        if (myPlatform.android) {
            console.log("android");
            actionBar.text = "修改银行卡";
        }else{
            console.log("ios");
            actionBar.title = "修改银行卡";
        }
    }else if (obj.text == "支付宝"){
        bank.style.visibility = "collapse";
        alipay.style.visibility = "visible";

        if (myPlatform.android) {
            console.log("android");
            actionBar.text = "修改支付宝";
        }else{
            console.log("ios");
            actionBar.title = "修改支付宝";
        }
    }
    // var bankLabel = page.getViewById("bankLabel");

};
exports.filterCancelTap = function(args) {
    console.log('取消筛选');
    closeDrawer(args);
};
