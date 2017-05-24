/**
 * Created by Administrator on 2017/5/6.
 */
/**
 * 相册图片单选
 */
var imagepicker = require("nativescript-imagepicker");
var fs = require('file-system');
var dialogs = require("ui/dialogs");
var platformModule = require("platform");
var permissions = require("nativescript-permissions");
var imagepickerModule = require("nativescript-imagepicker");
var bghttpModule = require("nativescript-background-http");
var session = bghttpModule.session("image-upload");

var cache = require("nativescript-cache");
var config = require('./config');
var observable = require("data/observable");
var observableArray = require("data/observable-array");
// var imageItems = new observableArray.ObservableArray();
// var mainViewModel = new observable.Observable();
// mainViewModel.set("thumb", 'res://main5');

var utils = require('./utils');
var upload = require('./upload');


class ImageUploadPicker {

    constructor() {
        this.counter = 0;
        this.imageItems = [];
    }

    /**
     * 当选
     * 从相册选择照片上传（自动上传）
     * @param args 页面args参数
     * @param pageObj 图片赋值对象
     * @param imageItems 图片暂存数组
     * @param cb 异步回调方法
     */
    selectSingle(args, pageObj, imageItems,cb) {
        var _this = this;
        var context = imagepickerModule.create({
            mode: "single"
        });

        if (platformModule.device.os === "Android" && platformModule.device.sdkVersion >= 23) {
            permissions.requestPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE, "家装通需要读取相册权限")
                .then(function () {
                    console.log("Permissions granted!");
                    _this.startSelection(context, pageObj, imageItems,cb);
                })
                .catch(function () {
                    console.log("Uh oh, no permissions - plan B time!");
                });
        } else {
            _this.startSelection(context, pageObj, imageItems,cb);
        }
    }

    /**
     * 多选
     * 从相册选择照片上传（自动上传）
     * @param args 页面args参数
     * @param pageObj 图片赋值对象
     * @param imageItems 图片暂存数组
     * @param cb 异步回调方法
     */
    selectMultiple(args, pageObj, imageItems,cb) {
        var _this = this;
        var context = imagepickerModule.create({
            mode: "multiple"
        });


        if (platformModule.device.os === "Android" && platformModule.device.sdkVersion >= 23) {
            permissions.requestPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE, "家装通需要读取相册权限")
                .then(function () {
                    console.log("Permissions granted!");
                    _this.startSelection(context, pageObj, imageItems,cb);
                })
                .catch(function () {
                    console.log("Uh oh, no permissions - plan B time!");
                });
        } else {
            _this.startSelection(context, pageObj, imageItems,cb);
        }
    }

    /**
     * 选择图片
     * @param context
     * @param pageObj
     * @param imageItems
     * @param cb
     */
    startSelection(context, pageObj, imageItems,cb) {
        var _this = this;
        imageItems = imageItems ? imageItems : this.imageItems;
        context
            .authorize()
            .then(function () {
                imageItems.length = 0;
                return context.present();
            })
            .then(function (selection) {
                selection.forEach(function (selected_item) {
                    selected_item.getImage().then(function (imagesource) {
                        let folder = fs.knownFolders.documents();
                        let path = fs.path.join(folder.path, "Test" + _this.counter + ".png");
                        let saved = imagesource.saveToFile(path, "png");

                        if (saved) {
                            var task = _this.sendImages(path,cb);
                            var item = new observable.Observable();
                            item.set("thumb", imagesource);
                            item.set("uri", "Test" + _this.counter + ".png");
                            item.set("uploadTask", task);
                            if(pageObj){
                                pageObj.bindingContext.set('srcThumb', imagesource);
                            }
                            imageItems.push(item);
                        }
                        _this.counter++;
                    })

                });
            }).catch(function (e) {
            console.log(e.eventName);
        });
    }

    /**
     * 上传图片
     * @param fileUri 图片本地路径地址
     * @param cb 上传成功回调
     */
    sendImages(fileUri,cb) {
        var task=null;
        var imageName = this.extractImageName(fileUri);
        var request = {
            url: config.appUploadImage,
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "Authorization": "Bearer " + cache.get('jwt'),
                "File-Name": imageName
            },
            description: "{ 'uploading': " + imageName + " }"
        };
        try{
            task = session.uploadFile(fileUri, request);
        }catch(e) {
            console.log(e)
        }
        task.on("progress", logEvent);
        task.on("error", function(e){
            var options = {
                title: "提示",
                message: "图片上传失败！",
                okButtonText: "确定"
            };
            dialogs.alert(options).then(() => {});
        });
        task.on("responded", function (e) {
            if(cb){
                cb(e.data);
            }
        });
        task.on("complete", function (e) {
            console.log("上传完成！");
        });
        function logEvent(e) {
            console.log("currentBytes: " + e.currentBytes);
            console.log("totalBytes: " + e.totalBytes);
            console.log("eventName: " + e.eventName);
        }

        return task;
    };

    /**
     * 根据路径获取图片名称
     * @param fileUri
     */
    extractImageName(fileUri) {
        var pattern = /[^/]*$/;
        var imageName = fileUri.match(pattern);

        return imageName;
    }

    /**
     * 获取图片本地uri
     * @param imageAsset<ImageAsset> 图片对象
     * @return <String> 图片路径
     */
    getLocalPath(imageAsset){

        imageAsset.getImage().then(function (imageSource) {
            var folder = fs.knownFolders.documents();
            var path = fs.path.join(folder.path, "Test.png");
            var saved = imageSource.saveToFile(path, "png");
            if(saved){
                return path;
            }else{
                return "";
            }
        });
    }
}


/**
 * 文件上传
 * @param localPath 资源路径
 */
/*function autoUpload(localPath) {
    // var file = imagesource;
    var file = fs.File.fromPath(localPath);
    var img = imageSource.fromFile(localPath);
    console.log('file')
    console.dump(file)
    var fileName = utils.extractImageName(localPath);
    console.log('fileName=' + fileName)
    var formData = new FormData();
    formData.append("file", file, fileName);
    formData.append("file", img, fileName);
    console.log('上传====')
    upload.postFileUpload(formData).then(function (res) {
        console.log('成功');
        var xhr = res['xhr'];
        var fileData = JSON.parse(xhr.responseText);
        console.log(fileData)
    }).catch(err => {
        console.log('上传失败了2');
        console.dump(err)
    });

}*/

exports.ImageUploadPicker = ImageUploadPicker;
