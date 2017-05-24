/**
 * Created by Administrator on 2017/5/12.
 */
var utils = require("utils/utils");

function openDrawer(args) {
    var drawer = args.object.page.getViewById("example-menu-drawer2");
    drawer.gesturesEnabled = true;
    drawer.showDrawer();
}
exports.openDrawer = openDrawer;

function closeDrawer(args) {
    var drawer = args.object.page.getViewById("example-menu-drawer2");
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
/*筛选*/
exports.statusTap = function(args) {
    var obj =args.object;
    var page =args.object.page;
    var models=page.dataModels;
    console.log(obj.screen+'obj.screen');
    models.queryData(page,obj.screen,page.type,true);
    closeDrawer(args);
};
