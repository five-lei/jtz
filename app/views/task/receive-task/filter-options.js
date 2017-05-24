var utils = require("utils/utils");


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
    var obj = args.object;
    var page = args.object.page;
    var signText = page.getViewById("sign_text");
    var abnormal_description = page.getViewById("abnormal-description");
    signText.text = obj.text;
    if(obj.text=="异常签收"){
        page.abnormalType=false;
        abnormal_description.visibility="visible";
    }else {
        page.abnormalType=true;
        abnormal_description.visibility="collapse";
    }
    closeDrawer(args);
};
exports.filterCancelTap = function(args) {
    closeDrawer(args);
};
