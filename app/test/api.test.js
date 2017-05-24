/**
 * Created by giscafer on 2017/4/8.
 * 测试例子
 */

var dialogsModule = require("ui/dialogs");

var api=require('../shared/api');
var config=require('../shared/config');

exports.test=function(){
    /**
     * 测试smaple
     */
    var qureyParams={
        "name": "collectionController.collectVideoAndArticle",
        "args": [{"first":0,"rows":10},{"userId":"VtLiMtA2QWdjWYAH"}]
    };
    api.call(config.apiUrl,qureyParams).ok((data)=>{
        console.log("##############api.call success start#############");
        console.log(JSON.stringify(data));
        console.log("##############api.call  success  end#############");
        var options = {
            title: "提示",
            message: JSON.stringify(data),
            okButtonText: "确认"
        };
        dialogsModule.confirm(options).then((result) => {});
    }).fail((err)=>{
        console.log("##############api.call error start#############");
        console.log(err)
        console.log("##############api.call  error  end#############");
        var options = {
            title: "提示",
            message: "接口请求出错，请查看日记信息",
            okButtonText: "确认"
        };
        dialogsModule.confirm(options).then((result) => {});
    })
}