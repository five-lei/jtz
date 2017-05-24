var utils = require("utils/utils");
var frame = require("ui/frame");
var config = require("../../shared/config");
var platform = require("platform");
var effects_1 = require("../../common/effects");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var isAndroid = platform.device.os === platform.platformNames.android;
var OVERLAY_ELEVATION = 12;
var CURVE = (platform.device.os === platform.platformNames.android) ? new android.view.animation.AccelerateDecelerateInterpolator() : UIViewAnimationCurve.UIViewAnimationCurveEaseInOut;


function openDrawer(args) {
    var drawer = args.object.page.getViewById("example-menu-drawer");
    drawer.gesturesEnabled = true;
    drawer.showDrawer();
}
exports.openDrawer = openDrawer;
function closeDrawer(args) {
    var drawer = args.object.page.getViewById("example-menu-drawer");
    drawer.gesturesEnabled = false;
    drawer.closeDrawer();
}
exports.closeDrawer = closeDrawer;
function menuButtonLoaded(args) {
    var menuBackground = args.object.getViewById("menu-button-background");
    var timeFactor = isAndroid ? 0.4 : 0.6; 
    var scaleFactor = function (s) { return 1 * 0.4 + s * 0.6; };
    var animateBackground = function (scale, opacity, duration) {
        if (duration === void 0) { duration = 120; }
        return function () { return menuBackground.animate({
            scale: { x: scaleFactor(scale), y: scaleFactor(scale) },
            opacity: opacity,
            duration: duration * timeFactor,
            curve: CURVE
        }); };
    };
    animateBackground(0, 0, 1)()
        .then(animateBackground(2, 0.2))
        .then(animateBackground(0.8, 0.4))
        .then(animateBackground(1.7, 0.6))
        .then(animateBackground(0.9, 0.8))
        .then(animateBackground(1.2, 1))
        .then(animateBackground(1, 1));
    var menuDots = args.object.getViewById("menu-button-dots");
    setTimeout(effects_1.loadedGuard(menuDots, function () { return menuDots.animate({
        translate: { x: 0, y: 0 },
        opacity: 1,
        duration: 500 * timeFactor,
        curve: CURVE
    }); }), 300);
    var title = args.object.getViewById("menu-button-title");
    setTimeout(effects_1.loadedGuard(title, function () { return title.animate({
        translate: { x: 0, y: 0 },
        opacity: 1,
        duration: 450 * timeFactor,
        curve: CURVE
    }); }), 430);
    var menuButton = args.object.getViewById("menu-button");
    if (args.object.android) {
        var compat = android.support.v4.view.ViewCompat;
        var baseElevation = OVERLAY_ELEVATION * utils.layout.getDisplayDensity() + 1000;
        var setElevation = function (view, elev) {
            compat.setElevation(view.android, elev);
        };
        setElevation(menuButton, 4 * utils.layout.getDisplayDensity() + 1);
        setElevation(menuBackground, baseElevation);
        setElevation(menuDots, baseElevation + 1);
        setElevation(title, baseElevation + 1);
    }
}
exports.menuButtonLoaded = menuButtonLoaded;

function tap1(args) {
    closeDrawer(args);
    var page = args.object.page;
    var one = page.getViewById("one");
    var text = one.text;
    config.one = text;
    var navigationEntry = {
        moduleName: 'views/my/add_car/add_car',
    }
    frame.topmost().navigate(navigationEntry)
   
}
exports.tap1 = tap1;

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
