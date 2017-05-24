var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var timer = require("timer");
var phone = require("nativescript-phone");
var config = require("../../../shared/config");
var api = require('../../../shared/api');
var dialogs = require("ui/dialogs");
var cache = require("nativescript-cache");
var page;
var DI_Account;
var Bt_Auth;
var DI_AccountText;
var validateCode;

// 帮助提示信息
exports.dialForHelp = function () {
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

exports.loaded = function (args) {
    page = args.object;
    DI_Account = page.getViewById("DI_Account");
    Bt_Auth = page.getViewById("Bt_Auth");
    validateCode = page.getViewById("validateCode");
    clearInterval(mTime);
}

exports.onBackTap = function () {
    // topmost.goBack();
    var navigationEntry = {
        moduleName: "views/regLogin/loninview/lonin",
        clearHistory: true,
        animated: false
    };
    topmost.navigate(navigationEntry);
}

//验证码定时器

var Code_Time = 61;
var mTime;
var authFlag = true;

function get_auth_code() {
    if (authFlag) {
        clearInterval(mTime);
        showTime();
    }
}

function ChangTime() {
    Code_Time = Code_Time - 1;
    Bt_Auth.text = '重新获取(' + Code_Time + ')';
    Bt_Auth.style.backgroundColor = '#eee';
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
        dialogs.alert(options).then(() => { });
        return;
    }
    if (!(/^1[34578]\d{9}$/.test(DI_AccountText))) {
        var options = {
            title: "提示！",
            message: "请输入正确的手机号",
            okButtonText: "确定"
        };
        dialogs.alert(options).then(() => { });
        return;
    }
    try {
        var qureyParams = {
            "name": "userController.getValidateCodeByMobile",
            "args": [{
                mobile: DI_AccountText,
                validateCodeMobile: DI_AccountText
            }]
        };
        api.call(config.apiUrl, qureyParams).ok((data) => {
            //定时器
            var Time = timer.setInterval(() => {
                if (Code_Time > 0) {
                    ChangTime();
                }
            }, 1000);
            mTime = Time;
            authFlag = false;
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
            dialogs.alert(options).then(() => { });
        });
    } catch (error) { }

}

exports.next_find1 = function () {
    //先判断手机号是否正确
    DI_AccountText = DI_Account.text;
    if (!DI_AccountText) {
        var options = {
            title: "提示！",
            message: "请输入手机号",
            okButtonText: "确定"
        };
        dialogs.alert(options).then(() => { });
        return;
    }
    if (!(/^1[34578]\d{9}$/.test(DI_AccountText))) {
        var options = {
            title: "提示！",
            message: "请输入正确的手机号",
            okButtonText: "确定"
        };
        dialogs.alert(options).then(() => { });
        return;
    }
    if (!validateCode.text) {
        var options = {
            title: "提示！",
            message: "请输入验证码",
            okButtonText: "确定"
        };
        dialogs.alert(options).then(() => { })
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
            cache.set('cacheLoginPhone', DI_AccountText);
            var topmost = frameModule.topmost();
            topmost.navigate("views/regLogin/passwordforgot/password_find2")
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
            dialogs.alert(options).then(() => { });
        });
    } catch (error) { }


}

exports.get_auth_code = get_auth_code;