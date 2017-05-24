var frameModule = require("ui/frame");
var dialogs = require("ui/dialogs");
var view = require("ui/core/view");
var timer = require("timer");
var navigator = require('../../../common/navigator');
var phone = require("nativescript-phone");
var config = require("../../../shared/config");
var page;
var DI_Account
var Pass_word;
var Eye_image;
var Code_Time = 60;


var UserViewModel = require("../../../view-models/log-register-view-model");
var user = new UserViewModel();


exports.loaded = function(args) {
    console.log(config.apiUrl);
    page = args.object;
    // if (page.ios) {
    //     var navigationBar = frameModule.topmost().ios.controller.navigationBar;
    //     navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    // }

    page.bindingContext = user;
    DI_Account = page.getViewById("DI_Account");
    Pass_word = page.getViewById("Pass_word");
    Eye_image = page.getViewById("Eye_image");
}
var dialogs = require("ui/dialogs");
exports.lonin = function() {
    // api.call
    //先判断手机号是否正确
    DI_AccountText = DI_Account.text;
    if (!DI_AccountText) {
        var options = {
            title: "提示！",
            message: "请输入手机号",
            okButtonText: "确定"
        };
        dialogs.alert(options).then(() => {});
        return false;
    } else if (!(/^1[34578]\d{9}$/.test(DI_AccountText))) {
        var options = {
            title: "提示！",
            message: "请输入正确的手机号",
            okButtonText: "确定"
        };
        dialogs.alert(options).then(() => {});
        return false;
    } else {
        var topmost = frameModule.topmost();

        var navigationEntry = {
            moduleName: "views/index/index",
            clearHistory: true
        };

        // topmost.navigate("views/index/index");
        user.login().catch(function(error) {
            console.log("error" + error);
             var options = {
                    title: "登录失败",
                    message:"帐号不存在"
                };
                dialogs.confirm(options).then((result) => {

                });
            return Promise.reject();
        }).then(function(response) {
            if (response.ok) {
                user.currentUser();
                topmost.navigate(navigationEntry);
                console.log("response" + response);
            } else {
                var options = {
                    title: "登录失败",
                    message:"账号或密码错误，请重新输入"
                };
                dialogs.confirm(options).then((result) => {

                });
            }

        });
    }
};


//验证码登录
function auth_code() {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "views/regLogin/loninview/authlonin",
        clearHistory: true,
        animated: false
    };
    topmost.navigate(navigationEntry);

}
//注册
function phone_regist() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/regLogin/registeredview/registered");
}
//忘记密码
function forget_password() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/regLogin/passwordforgot/password_find1");
}
//登录
// function lonin() {
//     if (DI_Account.text.length>0&&Pass_word.text.length>0){
//         topmost.navigate("views/home/home");
//     }else {
//         var options = {
//             title: "提示！",
//             message: "请输入账号或密码",
//             okButtonText: "确定"
//         };
//         dialogs.alert(options).then(() => {
//         });
//     }
// }


//点击清除账号
function Clear_Account() {
    DI_Account.text = "" //清除账号
    Pass_word.text = ""; //清空密码
}

function Show_Pass() {
    if (Pass_word.secure) {
        Eye_image.src = "res://eye_open";
        Pass_word.secure = false;
    } else {
        Eye_image.src = "res://eye_closep";
        Pass_word.secure = true;
    }
}
var Time;

function showTime() {
    Code_Time = Code_Time - 1;
    if (Code_Time > 0) {
        console.log("Code_Time" + Code_Time);
        // Time= timer.setInterval(showTime(), 60000);
        timer.setInterval(() => {
            showTime();
        }, 5000);
    }
    timer.clearInterval(Time);
}

// 帮助提示信息
exports.dialForHelp = function() {
    phone.dial(config.phone, false);
}
exports.Show_Pass = Show_Pass;
exports.forget_password = forget_password;
exports.phone_regist = phone_regist;
//exports.lonin=lonin;
exports.auth_code = auth_code;
exports.Clear_Account = Clear_Account;
