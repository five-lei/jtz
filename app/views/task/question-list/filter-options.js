var utils = require("utils/utils");
var platform = require("platform");


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
    console.log('筛选过滤');
    closeDrawer(args);
};
exports.filterCancelTap = function(args) {
    console.log('取消筛选');
    closeDrawer(args);
};
