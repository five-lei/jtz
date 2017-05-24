var utils = require("utils/utils");
var platform = require("platform");
var navigator = require("../../common/navigator");
var effects_1 = require("../../common/effects");
var isAndroid = platform.device.os === platform.platformNames.android;
var OVERLAY_ELEVATION = 12;
var CURVE = (platform.device.os === platform.platformNames.android) ? new android.view.animation.AccelerateDecelerateInterpolator() : UIViewAnimationCurve.UIViewAnimationCurveEaseInOut;
var ImageUploadPicker = require("../../shared/imageUpload").ImageUploadPicker;
var camera = require("nativescript-camera");
var imageUploadPicker = new ImageUploadPicker()
var cache = require("nativescript-cache");
var dialogs = require("ui/dialogs");
var platformModule = require("platform");
var visibility = require("ui/enums");

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
    var scaleFactor = function (s) {
        return 1 * 0.4 + s * 0.6;
    };
    var animateBackground = function (scale, opacity, duration) {
        if (duration === void 0) {
            duration = 120;
        }
        return function () {
            return menuBackground.animate({
                scale: {
                    x: scaleFactor(scale),
                    y: scaleFactor(scale)
                },
                opacity: opacity,
                duration: duration * timeFactor,
                curve: CURVE
            });
        };
    };
    animateBackground(0, 0, 1)()
        .then(animateBackground(2, 0.2))
        .then(animateBackground(0.8, 0.4))
        .then(animateBackground(1.7, 0.6))
        .then(animateBackground(0.9, 0.8))
        .then(animateBackground(1.2, 1))
        .then(animateBackground(1, 1));
    var menuDots = args.object.getViewById("menu-button-dots");
    setTimeout(effects_1.loadedGuard(menuDots, function () {
        return menuDots.animate({
            translate: {
                x: 0,
                y: 0
            },
            opacity: 1,
            duration: 500 * timeFactor,
            curve: CURVE
        });
    }), 300);
    var title = args.object.getViewById("menu-button-title");
    setTimeout(effects_1.loadedGuard(title, function () {
        return title.animate({
            translate: {
                x: 0,
                y: 0
            },
            opacity: 1,
            duration: 450 * timeFactor,
            curve: CURVE
        });
    }), 430);
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

function backTap(args) {
    console.log("back");
    navigator.navigateBackFromExample();
}
exports.backTap = backTap;
var page;

function informationTap(args) {
    page = args.object.page;
    imageUploadPicker.selectSingle(args, page, null, function (data) {
        var imgs = JSON.parse(data);
        console.dump(imgs)
        var currentPhoto = cache.get('currentPhoto');
        var currentNode;//当前背景
        switch (currentPhoto) {
            case 'idNoPhotoFront':
                currentNode = 'exampleMenuButton1';
                break;
            case 'idNoPhotoBack':
                currentNode = 'exampleMenuButton2';
                break;
            case 'idNoPhotoHand':
                currentNode = 'exampleMenuButton3';
                break;
            default:
                currentNode = '';
        }
        var drawer = page.getViewById("example-menu-drawer");
        drawer.gesturesEnabled = false;
        drawer.closeDrawer();
        
        var imgId = imgs[0].id;
        cache.set(currentPhoto, imgId);

        currentNode = page.getViewById(currentNode);

        if (typeof (currentNode) != "undefined") {
            currentNode.src = imgs[0].url;
        }
        //  img.src=
        cache.set('currentPhoto', null);
        // try {
        //     var qureyParams = {
        //         "name": "userController.authentication",
        //         "args": [{
        //             portrait: [imgs[0].id]
        //         }],
        //     };
        //     api.call(config.apiUrl, qureyParams).ok((data) => {
        //         var userInfo = cache.get("userInfo");
        //         if (userInfo) {
        //             var info = JSON.parse(userInfo);
        //             info["portrait"] = imgs[0].url;
        //             cache.set("userInfo", JSON.stringify(info));
        //         }
        //         change_img.src = imgs[0].url;
        //         var options = {
        //             title: "提示",
        //             message: "修改成功",
        //             okButtonText: "确定"
        //         };
        //         dialogs.alert(options).then(() => {});
        //     }).fail((err) => {
        //         var options = {
        //             title: "提示",
        //             message: "修改失败",
        //             okButtonText: "确定"
        //         };
        //         dialogs.alert(options).then(() => {});
        //     })
        // } catch (error) {
        //     console.log(error)
        // }
    });
    console.log("info");

}
exports.informationTap = informationTap;

function codeTap(args) {
    var page = args.object.page;
    var options = {
        width: 300,
        height: 300
    };
    camera.requestPermissions();
    camera.takePicture()
        .then(function (imageAsset) {
            var currentPhoto = cache.get('currentPhoto');
            var currentNode;//当前背景
            switch (currentPhoto) {
                case 'idNoPhotoFront':
                    currentNode = 'exampleMenuButton1';
                    break;
                case 'idNoPhotoBack':
                    currentNode = 'exampleMenuButton2';
                    break;
                case 'idNoPhotoHand':
                    currentNode = 'exampleMenuButton3';
                    break;
                default:
                    currentNode = ''
            }

            var drawer = page.getViewById("example-menu-drawer");
            drawer.gesturesEnabled = false;
            drawer.closeDrawer();

            currentNode = page.getViewById(currentNode);

            console.log("Result is an image asset instance");
            if (typeof (currentNode) != "undefined") {
                console.log("++++++++++++++++++++++++++++++++++");
               currentNode.src = imageAsset.android;
            }
            //args.object.src = imageAsset;
            //获取图片本地路径
            var localPath = "";
            if (platformModule.device.os === "Android") {
                localPath = imageAsset.android;
            } else {
                localPath = imageAsset.ios;
            }
            console.log(localPath)

            imageUploadPicker.sendImages(localPath, function (data) {
                var str = JSON.parse(data);       
                console.dump(str);
                cache.set(currentPhoto, str[0].id);
            })
            cache.set('currentPhoto', null);
        }).catch(function (err) {
            console.log("Error -> " + err.message);
            if (err.message.indexOf('does not have permissions') !== -1) {
                var options = {
                    title: "提示",
                    message: config.appName + "没有访问相机的权限，请前往设置允许访问！",
                    okButtonText: "确定"
                };
                dialogs.alert(options).then(() => {});
            }
            console.log("Error -> " + err.message);
        });

    console.log("code");
}
exports.codeTap = codeTap;

function feedbackTap(args) {
    console.log("feedback");
}
exports.feedbackTap = feedbackTap;

function prevTap(args) {
    console.log("prev");
    navigator.navigateToPrevExample(args.object.bindingContext);
}
exports.prevTap = prevTap;

function nextTap(args) {
    console.log("prev");
    navigator.navigateToNextExample(args.object.bindingContext);
}
exports.nextTap = nextTap;

function exitTap(args) {
    console.log("exit");
    var page = args.object.page;
    var drawer = page.getViewById("example-menu-drawer");
    drawer.gesturesEnabled = false;
    drawer.closeDrawer();
}
exports.exitTap = exitTap;
