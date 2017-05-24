var frameModule = require("ui/frame");
var timer = require("timer");
var dialogs = require("ui/dialogs");
var phone = require("nativescript-phone");
var config = require("../../../shared/config");
var api = require('../../../shared/api');
var topmost = frameModule.topmost();
var page;
var DI_Account;
var Bt_Auth;
var DI_AccountText;
var validateCode;

var dialogs = require("ui/dialogs");

// 帮助提示信息
exports.dialForHelp = function() {
    phone.dial(config.phone, false);
    console.log(config.phone);
}

exports.loaded = function(args) {
    page = args.object;
    DI_Account = page.getViewById("DI_Account");
    Bt_Auth = page.getViewById("Bt_Auth");
    clearInterval(mTime);
    validateCode = page.getViewById("validateCode");
}
exports.auth_code = function() {
        topmost.goBack();
    }
    //注册页面
exports.phone_regist = function() {

        topmost.navigate("views/regLogin/registeredview/registered");
    }
    //跳转到忘记密码 密码设置
exports.forget_password = function() {

        topmost.navigate("views/regLogin/passwordforgot/password_find1");

    }
    //清除账号
function Clear_Account() {
    var DI_Account = page.getViewById("DI_Account");
    DI_Account.text = "";
}

function Auth_Code() {
    var navigationEntry = {
        moduleName: "views/regLogin/loninview/lonin",
        clearHistory: true,
        animated: false
    };
    topmost.navigate(navigationEntry);
    // topmost.navigate("views/regLogin/loninview/lonin");

}
//获取验证码
var authFlag = true;

function Bt_Get_Auth() {
    if (authFlag) {
        authFlag = false;
        clearInterval(mTime);
        showTime();
    }
}
var Code_Time = 61;
var mTime;

//验证码定时器
function ChangTime() {
    Code_Time = Code_Time - 1;
    Bt_Auth.text = '重新获取(' + Code_Time + ')';
    if (Code_Time <= 0) {
        authFlag = true;
        Code_Time = 61;
        Bt_Auth.text = "获取验证码"
        clearInterval(mTime);
    }
}

function showTime() {
    //先判断手机号是否正确
    DI_AccountText = DI_Account.text;
    if (!DI_AccountText) {
        var options = {
            title: "提示！",
            message: "请输入手机号",
            okButtonText: "确定"
        };
        dialogs.alert(options).then(() => {});
        return;
    }
    if (!(/^1[34578]\d{9}$/.test(DI_AccountText))) {
        var options = {
            title: "提示！",
            message: "请输入正确的手机号",
            okButtonText: "确定"
        };
        dialogs.alert(options).then(() => {});
        return;
    }
    try {
        var qureyParams = {
            "name": "userController.getValidateCodeByMobile",
            "args": [{
                mobile: DI_AccountText,
                validateCodeMobile: DI_AccountText
            }],
        };
        api.call(config.apiUrl, qureyParams).ok((data) => {
            var Time = timer.setInterval(() => {
                if (Code_Time > 0) {
                    ChangTime();
                }
            }, 1000);
            mTime = Time;
        }).fail((err) => {
            if (err.code) {
                options.message = err.error;
            } else {
                options.message = "系统出错,获取失败";
            }
            dialogs.alert(options).then(() => {});
        });
    } catch (error) {}
    //定时器

}
//跳转首页
function Lonin_Home() {
    var topmost = frameModule.topmost();
    DI_AccountText = DI_Account.text;
    if (!DI_AccountText) {
        var options = {
            title: "提示！",
            message: "请输入手机号",
            okButtonText: "确定"
        };
        dialogs.alert(options).then(() => {});
        return;
    }
    if (!(/^1[34578]\d{9}$/.test(DI_AccountText))) {
        var options = {
            title: "提示！",
            message: "请输入正确的手机号",
            okButtonText: "确定"
        };
        dialogs.alert(options).then(() => {})
        return;
    }

    if (!validateCode.text) {
        var options = {
            title: "提示！",
            message: "请输入验证码",
            okButtonText: "确定"
        };
        dialogs.alert(options).then(() => {})
        return;
    }

    try {
        var qureyParams = {
            "name": "userController.checkValidateCode",
            "args": [{
                mobile: DI_AccountText,
                validateCode: validateCode.text
            }],
        };
        api.call(config.apiUrl, qureyParams).ok((data) => {
            var navigationEntry = {
                moduleName: "views/index/index",
                clearHistory: true
            };
            topmost.navigate(navigationEntry);
        }).fail((err) => {
            var options = {
                title: "提示！",
                message: "",
                okButtonText: "确定"
            };
            if (err.code) {
                options.message = err.error;
            } else {
                options.message = "系统出错,获取失败";
            }
            dialogs.alert(options).then(() => {});
        });
    } catch (error) {}

}
exports.Bt_Get_Auth = Bt_Get_Auth;
exports.Clear_Account = Clear_Account;
exports.Auth_Code = Auth_Code;
exports.Lonin_Home = Lonin_Home