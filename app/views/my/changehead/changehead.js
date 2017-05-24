var observable = require("data/observable");
var platformModule = require("platform");
var ImageUploadPicker = require("../../../shared/imageUpload").ImageUploadPicker;
var config = require("../../../shared/config");
var mainViewModel = new observable.Observable();
var imageSource = require("image-source");
var camera = require("nativescript-camera");
var dialogs = require("ui/dialogs");
var frame = require("ui/frame");
var api = require('../../../shared/api');
var cache = require("nativescript-cache");

var page;
var change_img;
var mobile = "";

//默认头像
mainViewModel.set("srcThumb", 'res://per');
var imageUploadPicker = new ImageUploadPicker()

function onNavigatingTo(args) {
    page = args.object;
    change_img = page.getViewById("change_img");

}
/**
 * pageLoaded
 * @param args
 */
function pageLoaded(args) {
    page = args.object;
    page.bindingContext = mainViewModel;
    var userInfo = cache.get("userInfo");
    if (userInfo) {
        var info = JSON.parse(userInfo);
        change_img.src = info["portrait"];
    }
    try {
        var navi = page.navigationContext;
        if (typeof (navi.mobile) != undefined) {
            mobile = navi.mobile;
        }
    } catch (e) {
        console.log(e);
    }
}

function onBackTap(args) {
    frame.topmost().goBack();
}

function takeToCamera(args) {
    var page = args.object.page;
    var options = {
        width: 300,
        height: 300
    };
    camera.requestPermissions();
    camera.takePicture()
        .then(function (imageAsset) {
            console.log("Result is an image asset instance");
            //获取图片本地路径
            var localPath = "";
            if (platformModule.device.os === "Android") {
                localPath = imageAsset.android;
            } else {
                localPath = imageAsset.ios;
            }
            console.log(localPath)
            imageUploadPicker.sendImages(localPath, function (data) {
                var imgs = JSON.parse(data);       
                console.dump(imgs);
                onUpload(imgs);
            })
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
}
/**
 * 从相册选择照片
 * @param args
 */
function onSelectSingleTap(args) {
    imageUploadPicker.selectSingle(args, change_img, null, function (data) {
        var imgs = JSON.parse(data);
        console.dump(imgs);
        onUpload(imgs);
    });
}

//提交给后台
function onUpload(imgs) {
    try {
            var qureyParams = {
                "name": "userController.updatePortrait",
                "args": [{
                    mobile: mobile,
                    portrait: [imgs[0].id]
                }],
            };
            api.call(config.apiUrl, qureyParams).ok((data) => {
                var userInfo = cache.get("userInfo");
                if (userInfo) {
                    var info = JSON.parse(userInfo);
                    info["portrait"] = imgs[0].url;
                    cache.set("userInfo", JSON.stringify(info));
                }
                change_img.src = imgs[0].url;
            }).fail((err) => {
                var options = {
                    title: "提示",
                    message: "修改失败",
                    okButtonText: "确定"
                };
                dialogs.alert(options).then(() => {});
            })
        } catch (error) {
            console.log(error)
        }


}

exports.onNavigatingTo = onNavigatingTo;
exports.mainViewModel = mainViewModel;
exports.pageLoaded = pageLoaded;
exports.onSelectSingleTap = onSelectSingleTap;
exports.onBackTap = onBackTap;
exports.takeToCamera = takeToCamera;