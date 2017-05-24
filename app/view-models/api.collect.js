/**
 * Created by giscafer on 2017/4/8.
 * 文章收藏
 */

var dialogsModule = require("ui/dialogs");

var api=require('../shared/api');
var config=require('../shared/config');

exports.test=function(id){
    var qureyParams={
        "name": "articleController.articleCollection",
        "args": [{"articleId": id}]
    };
    api.call(config.apiUrl,qureyParams).ok((data)=>{
        console.dump(data);
        var data = data.result || {};
        var options = {
            title: "提示",
            message: data.type,
            okButtonText: "确认"
        };
        dialogsModule.confirm(options).then((result) => {});
    }).fail((err)=>{
        console.dump(err);
        var options = {
            title: "提示",
            message: "接口请求出错，请查看日记信息",
            okButtonText: "确认"
        };
        dialogsModule.confirm(options).then((result) => {});
    })
}
//视频收藏方法
exports.videoColl=function(id){
    console.dump(id);
    var qureyParams={
        "name": "videoController.videoCollection",
        "args": [{"videoId": id}]
    };
    api.call(config.apiUrl,qureyParams).ok((data)=>{
        try{
        var data = data || {};
        var options = {
            title: "提示",
            message: data.type,
            okButtonText: "确认"
        };
        dialogsModule.confirm(options).then((result) => {});
        }catch (e){

        }

    }).fail((err)=>{
        var options = {
            title: "提示",
            message: "接口请求出错，请查看日记信息",
            okButtonText: "确认"
        };
        console.dump(err);
        dialogsModule.confirm(options).then((result) => {});
    })
}