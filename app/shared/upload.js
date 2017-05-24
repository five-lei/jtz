/**
 * Created by giscafer on 2017-05-09.
 */


var bghttpModule = require("nativescript-background-http");
var session = bghttpModule.session("image-upload");

var cache = require("nativescript-cache");
var config = require('./config');


exports.sendImages = function (fileUri) {
    console.log('sendImages()---'+fileUri)
    var imageName = extractImageName(fileUri);

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
    console.log('000')
    var task = session.uploadFile(fileUri, request);
    console.log('111')
    task.on("progress", logEvent);
    task.on("error", logEvent);
    task.on("responded", function(e){
        console.log('responded')
        console.log(e.data)
    });
    task.on("complete", logEvent);

    function logEvent(e) {
        console.log("currentBytes: " + e.currentBytes);
        console.log("totalBytes: " + e.totalBytes);
        console.log("eventName: " + e.eventName);
    }

    return task;
};



function extractImageName(fileUri) {
    var pattern = /[^/]*$/;
    var imageName = fileUri.match(pattern);

    return imageName;
}

/*
 exports.postFileUpload=function(formData){

 // 从缓存中获取登录令牌
 var jwt = cache.get("jwt");

 var xhr = new XMLHttpRequest();

 return new Promise((resolve, reject) => {
 xhr.onreadystatechange = () => {
 if (xhr.readyState == 4) {
 if (xhr.status >= 200 && xhr.status < 300)
 resolve({xhr: xhr, formData: formData});
 else
 reject({xhr: xhr, formData: formData});

 }
 };

 xhr.open('POST', config.uploadUrl, true);
 xhr.setRequestHeader("Content-Type","multipart/form-data; boundary=111");
 xhr.setRequestHeader("Authorization", "Bearer " + jwt);
 xhr.send(formData);
 });
 };*/
