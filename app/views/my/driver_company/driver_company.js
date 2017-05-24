var frame = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var ImageUploadPicker = require("../../../shared/imageUpload").ImageUploadPicker;
var camera = require("nativescript-camera");
function onBackTap(args) {
    frame.topmost().goBack();
}
function pageLoaded(args) {
    page = args.object;
    page.bindingContext = mainViewModel;
    var userInfo = cache.get("userInfo");
    if (userInfo) {
        var info = JSON.parse(userInfo);
        change_img.src = info["portrait"];
    }
}

function onNavigatingTo(args) {
    page = args.object;
    change_img = page.getViewById("change_img");

}
function btn_page(args) {
   var navigationEntry = {
        moduleName: 'views/my/driver_message/driver_message',
    }
    frame.topmost().navigate(navigationEntry)
}

function onHelp(args) {
    var thisPage = args.object.page;
    thisPage.showModal('/views/my/views/phoneModal',  function () {
    });
}

function takeToCamera(args) {
    var page = args.object.page;
    var options = { width: 300, height: 300 };
    camera.requestPermissions();
    camera.takePicture()
        .then(function(imageAsset) {
            console.log("Result is an image asset instance");
            change_img.src = imageAsset;
            //获取图片本地路径
            var localPath = "";
            if (platformModule.device.os === "Android") {
                localPath = imageAsset.android;
            } else {
                localPath = imageAsset.ios;
            }
            console.log(localPath)
            imageUploadPicker.sendImages(localPath, function(data) {
                console.log(data)
            })
        }).catch(function(err) {
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
}

function onSelectSingleTap(args) {
    imageUploadPicker.selectSingle(args, change_img, null, function(data) {
        var imgs = JSON.parse(data);
        console.dump(imgs)

    

    });
}

exports.onBackTap = onBackTap
exports.btn_page = btn_page
exports.onHelp = onHelp
exports.onSelectSingleTap = onSelectSingleTap;
exports.takeToCamera = takeToCamera;
exports.onNavigatingTo = onNavigatingTo;
exports.pageLoaded = pageLoaded;