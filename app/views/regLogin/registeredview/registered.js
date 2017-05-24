var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var viewModels = require("./registered-view-model");
var Observable = require("data/observable").Observable;
var phone = require("nativescript-phone");
var config = require("../../../shared/config");
var api = require('../../../shared/api');
var topmost = frameModule.topmost();
var Pass_word_1;
var Pass_word_2;
var Eye_image_1;
var Eye_image_2;

var validateCode;
var options = {
    title: "提示",
    message: "",
    okButtonText: "确认"
};
var timeCunter = -1;
var vm;

var timer = require("timer");
var dialogs = require("ui/dialogs");
var page;
var DI_Account;
var Bt_Auth;
var DI_AccountText;

// 同意协议按钮
var readStateInfo;
exports.agreeOrNot = function() {
    readStateInfo.readState = !readStateInfo.readState;
}

// 电话求助
exports.dialForHelp = function() {
    // var options = {
    //     title: "说明",
    //     message: "点击拨打400客服电话"
    // };
    // dialogsModule.confirm(options).then((result) => {
    //     // result can be true/false/undefined
    //     console.log(result);
    //     //TODO
    // });
    phone.dial(config.phone, false);
    console.log(config.phone);
}

//获取控件
exports.loaded = function(args) {
    page = args.object;
    Pass_word_1 = page.getViewById("Pass_word_1");
    Pass_word_2 = page.getViewById("Pass_word_2");
    Eye_image_1 = page.getViewById("Eye_image_1");
    Eye_image_2 = page.getViewById("Eye_image_2");

    Bt_Auth = page.getViewById("Bt_Auth");

    validateCode = page.getViewById("validateCode");
    vm = new viewModels.ViewModel();
    Bt_Auth = page.getViewById("Bt_Auth");
    DI_Account = page.getViewById("DI_Account");

    readStateInfo = new Observable({
        readState: false
    });

    var readAndAgree = page.getViewById("readProtocal");
    readAndAgree.bindingContext = readStateInfo;
}

//获取验证码
// function Bt_Get_Auth() {
//     clearInterval(mTime);
//     showTime();
// }
// var Code_Time = 61;
// var mTime;
// var phoneJudge;

// //验证码定时器
// function ChangTime() {
//     Code_Time = Code_Time - 1;
//     Bt_Auth.text = '重新获取(' + Code_Time + ')';
//     if (Code_Time <= 0) {
//         Code_Time = 61;
//         Bt_Auth.text = "获取验证码"
//         clearInterval(mTime);
//     }
// }
// function showTime() {
//     //先判断手机号是否正确
//     DI_AccountText = DI_Account.text;
//     if (!(/^1[34578]\d{9}$/.test(DI_AccountText))) {
//         options.message = "请输入正确的手机号",
//             dialogs.alert(options).then(() => {
//             });
//         phoneJudge = false;
//         return false;
//     } else {
//         //定时器
//         var Time = timer.setInterval(() => {
//             if (Code_Time > 0) {
//                 ChangTime();
//             }
//         }, 1000);
//         mTime = Time;
//         phoneJudge = true;
//     }
// }

//跳转设置信息
exports.next_registered = function() {
    var options = {
        title: "提示！",
        message: "",
        okButtonText: "确定"
    };
    if (!DI_Account.text) {
        options.message = "请输入手机号";
        dialogsModule.confirm(options).then((result) => {});
        return;
    }
    if (!Pass_word_1.text) {
        options.message = "请输入密码";
        dialogsModule.confirm(options).then((result) => {});
        return;
    }

    if (!validateCode.text) {
        options.message = "请输入验证码";
        dialogsModule.confirm(options).then((result) => {});
        return;
    }
    if (Pass_word_1.text != Pass_word_2.text) {
        options.message = "密码不一致";
        dialogsModule.confirm(options).then((result) => {});
        return;
    } else if (!validateCode.text) {
        options.message = "请输入验证码";
        dialogsModule.confirm(options).then((result) => {});
        return;
    } else {
        // console.log((Pass_word_1.text).length);
        if (Pass_word_1.text.length < 6 || Pass_word_1.text.length > 20) {
            var options = {
                title: "提示！",
                message: "请输入6-20位密码",
                okButtonText: "确定"
            };
            dialogsModule.alert(options).then(() => {});
            return false;
        } else if (!(/[a-zA-Z\d]{6,20}$/.test(Pass_word_1.text))) {
            var options = {
                title: "提示！",
                message: "密码只能包含数字和字母",
                okButtonText: "确定"
            };
            dialogsModule.alert(options).then(() => {});
            return false;
        } else {
            // vm.checkValidateCode({ DI_Account: DI_Account.text, validateCode: validateCode.text }, ok => {
            //     vm.saveUserInfo({
            //         DI_Account: DI_Account.text,
            //         pwd: Pass_word_2.text,
            //         oldPwd: "123456"
            //     }, ok => {
            //         topmost.navigate("views/regLogin/registeredview/set_regist");
            //     }, fail => {
            //         options.message = fail.error;
            //         dialogsModule.confirm(options).then((result) => { });
            //     });
            // }, fail => {
            //     options.message = fail.error;
            //     dialogsModule.confirm(options).then((result) => { });
            // });
            if (!readStateInfo.readState) {
                var options = {
                    title: "提示",
                    message: "请阅读并同意一智通用户协议"
                };
                dialogsModule.alert(options).then(() => {});
                return false;
            } else {
                sendRequest();
                // topmost.navigate("views/regLogin/registeredview/set_regist");
                
            }
        }
    }
}


//  topmost.navigate("views/regLogin/registeredview/set_regist");
function sendRequest() {
    vm.checkValidateCode({ mobile: DI_Account.text, validateCode: validateCode.text }, ok => {
        vm.saveUserInfo({
            mobile: DI_Account.text,
            pwd: Pass_word_2.text,
            oldPwd: "123456"
        }, ok => {
            config.pwd=Pass_word_2.text;
            var navigationEntry = {
                    moduleName: "views/regLogin/registeredview/set_regist",
                    context: { info: DI_Account.text,
                    pwd:Pass_word_2.text },
                };
                topmost.navigate(navigationEntry);
                
        }, fail => {
            // alert("122");
            // options.message = fail.error;
            var options = {
                title: "提示！",
                message: fail.error,
                okButtonText: "确定"
            };
            dialogsModule.alert(options).then(() => {});
        });
    }, fail => {
    var options = {
                title: "提示！",
                message: fail.error,
                okButtonText: "确定"
            };
            dialogsModule.alert(options).then(() => {});
    });

}


//返回上一页
exports.onBackTap = function() {
        topmost.goBack();
    }
    //设置密码是否可见
function Eye_Show_1() {

    if (Pass_word_1.secure) {
        Eye_image_1.src = "res://eye_open";
        Pass_word_1.secure = false;
    } else {

        Eye_image_1.src = "res://eye_closep";
        Pass_word_1.secure = true;
    }

}
//确认的设置密码是否可见
function Eye_Show_2() {

    if (Pass_word_2.secure) {
        Eye_image_2.src = "res://eye_open";
        Pass_word_2.secure = false;
    } else {

        Eye_image_2.src = "res://eye_closep";
        Pass_word_2.secure = true;
    }

}

exports.Eye_Show_1 = Eye_Show_1;
exports.Eye_Show_2 = Eye_Show_2;

// 验证码发送倒计时
var authFlag = true;
var timerId = null;
exports.Bt_Get_Auth = function() {
    if (authFlag) {
        if (!DI_Account.text) {
            options.message = "请输入手机号";
            dialogsModule.confirm(options).then((result) => {});
            return;
        } else if (!(/^1[34578]\d{9}$/.test(DI_Account.text))) {
            options.message = "请输入正确的手机号";
            dialogsModule.confirm(options).then((result) => {});
            return;
        } else {
            authFlag = false;
            vm.getValidateCode(DI_Account.text, data => {
                Bt_Auth.disabled = true;
                timeCunter = 60;
                timerId = setInterval(function() {
                    Bt_Auth.text = '重新获取 (' + timeCunter + ')';
                    Bt_Auth.style.backgroundColor = '#eee';
                    timeCunter--;
                    if (timeCunter < 0) {
                        authFlag = true;
                        clearInterval(timerId);
                        Bt_Auth.text = '获取验证码';
                        Bt_Auth.disabled = false;
                        Bt_Auth.style.backgroundColor = '#FFDEAD';
                        Bt_Auth.style.color = '#FF8800';
                    }
                }, 1000);
            }, data => {
                authFlag = true;
                options.message = data.error;
                dialogsModule.confirm(options).then((result) => {});
            });
        }
    }
}

// 已有账号登录
exports.goto_login = function() {
    topmost.navigate("views/regLogin/loninview/lonin");
}

// exports.Bt_Get_Auth = Bt_Get_Auth;

// 一智通用户协议页面展示
exports.consentAgreement = function() {
    console.log('protocal');
    var topmost = frameModule.topmost();
    topmost.navigate("views/regLogin/registeredview/1ziton_agreement");
}