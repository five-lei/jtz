var utils = require("utils/utils");
var platform = require("platform");
var ObservableArray = require("data/observable-array").ObservableArray;
var labelModule = require("ui/label");
var buttonModule = require("ui/button");
var stackLayoutModule = require("ui/layouts/stack-layout");
var parentText;
var stackLayout;
var Button;
var button;
var arr = []; //存放要隐藏显示的布局
function openDrawer(args) {
    var drawer = args.object.page.getViewById("filter-type-drawer");
    drawer.gesturesEnabled = true;
    drawer.showDrawer();
}
exports.openDrawer = openDrawer;

function closeDrawer(args) {
    var drawer = args.object.page.getViewById("filter-type-drawer");
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
        drawer.page.on("navigatedFrom", function (args) {
            drawer.closeDrawer();
        });
        if (drawer.ios) {
            drawer.ios.defaultSideDrawer.style.shadowMode = TKSideDrawerShadowMode.TKSideDrawerShadowModeSideDrawer;
            drawer.ios.defaultSideDrawer.style.dimOpacity = 0.3;
        }
    }
}
exports.drawerLoaded = drawerLoaded;

exports.filterOptionTap = function (args) {
    closeDrawer(args);
    var obj = args.object;
    var page = obj.page;
    var waybill_type = page.getViewById("waybillType");
    waybill_type.cssClass ="hint-label2";
    waybill_type.text = obj.text;
    waybill_type.waybillServiceType = obj.waybillServiceType;
};
exports.filterCancelTap = function (args) {
    closeDrawer(args);
};
