var frameModule = require("ui/frame");
var phone = require("nativescript-phone");
var config = require("../../../shared/config");
var api = require('../../../shared/api');
var topmost = frameModule.topmost();
var cache = require("nativescript-cache");
var Change_Pass_1;
var Change_Pass_2;

var dialogs = require("ui/dialogs");

// 帮助提示信息
exports.dialForHelp = function() {
    // var options = {
    //     title: "说明",
    //     message: "点击拨打400客服电话"
    // };
    // dialogs.confirm(options).then((result) => {
    //     // result can be true/false/undefined
    //     console.log(result);
    //     //TODO
    // });
    phone.dial(config.phone, false);
    console.log(config.phone);
}

exports.loaded = function(args) {

    page = args.object;
    Change_Pass_1 = page.getViewById("Change_Pass_1");
    Change_Pass_2 = page.getViewById("Change_Pass_2");

}
exports.onBackTap = function() {
        // topmost.goBack();
        var navigationEntry = {
            moduleName: "views/regLogin/passwordforgot/password_find1",
            clearHistory: true,
            animated: false
        };
        topmost.navigate(navigationEntry);
    }
    //完成注册去登录页面
function Next_Go_Lon() {
    var options = {
        title: "提示",
        message: "密码只能包含数字和字母且不能以数字开头"
    };
    if (!Change_Pass_1.text) {
        options.message = "请输入新密码";
        dialogs.confirm(options);
        return;
    }
    if (!Change_Pass_2.text) {
        options.message = "请确认密码";
        dialogs.confirm(options);
        return;
    }
    if (Change_Pass_1.text != Change_Pass_2.text) {
        options.message = "两次输入密码不一致";
        dialogs.confirm(options);
        return;
    }
    // if (!(/^[a-zA-Z][a-zA-Z\d]{5,19}$/.test(Change_Pass_1.text))) {
    //     options.message = "密码不符合要求";
    //     dialogs.confirm(options);
    //     return;
    // }
    try {
        var qureyParams = {
            "name": "userController.resetPwd",
            "args": [{
                mobile: cache.get('cacheLoginPhone') || "",
                pwd: Change_Pass_1.text
            }]
        };
        api.call(config.apiUrl, qureyParams).ok((data) => {
            topmost.navigate("views/regLogin/loninview/lonin");
        }).fail((err) => {
            if (err.code) {
                options.message = err.error;
            } else {
                options.message = "系统出错,更改失败";
            }
            dialogs.alert(options).then(() => {});
        });
    } catch (error) {}

}

exports.Next_Go_Lon = Next_Go_Lon