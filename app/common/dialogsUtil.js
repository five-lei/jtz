/**
 * Created by giscafer on 2017-05-16.
 */

var dialogsModule = require("ui/dialogs");

var alertOptions = {
    title: "提示",
    message: "操作成功！",
    okButtonText: "确认"
};
/**
 * alert弹窗提示
 * @param msg 自定义弹窗信息
 * @param okCb 点击OK时回调方法
 */
exports.alert=function(msg,okCb){
    if(msg){
        alertOptions['message']=msg;
    }
    dialogsModule.alert(alertOptions).then(function (flag) {
        if(flag && okCb){
            okCb();
        }
    })
};


var confirmOptions = {
    title: "提示",
    message: "是否确定该操作？",
    okButtonText: "确认",
    cancelButtonText: "取消"
};

/**
 * confirm弹窗提示
 * @param msg 自定义弹窗信息
 * @param okCb 点击OK时回调方法
 * @param cancelCb 点击取消时回调方法
 */
exports.confirm=function(msg,okCb,cancelCb){
    if(msg){
        alertOptions['message']=msg;
    }
    dialogsModule.confirm(confirmOptions).then(function (flag) {
        if(flag && okCb){
            okCb();
        }else if(!flag && cancelCb){
            cancelCb();
        }
    })
};