var frameModule = require("ui/frame");
var view = require("ui/core/view");
var api = require('../../../shared/api');
var config = require("../../../shared/config");
var dialogsAlert = require("../../../common/dialogsUtil");
var page;
var idCardTF;
var loginPWTF;

function onBackTap(args) {
    frameModule.topmost().goBack();
}


exports.onNavigatingTo = function (args) {
    page = args.object;
    idCardTF = view.getViewById(page, "idCard");
    loginPWTF = view.getViewById(page, "loginPW");
};

//跳转到修改支付密码页面
exports.jumpModifierPassword = function () {

    if (idCardTF.text.length == 0) {
        dialogsAlert.alert("请输入身份证号!!!");
        return;
    }
    if (loginPWTF.text.length == 0) {
        dialogsAlert.alert("请输入登录密码!!!");
        return;
    }
    api.call(config.apiUrl, {
        name: "userWorkerController.checkPayPwd",
        args: [{
            idNO: idCardTF.text,
            pwd: loginPWTF.text
        }]
    }).ok(data => {
        var topmost = frameModule.topmost();
        var naviEntry={
            moduleName:"views/walletDeposit/modifierPassword/modifierPassword",
            context:{
                resetPayPwd:true,
                idNO: idCardTF.text,
                pwd: loginPWTF.text
            }
        }
        // topmost.navigate("views/walletDeposit/modifierPassword/modifierPassword");
        topmost.navigate(naviEntry);
    }).fail(fail => {
        dialogsAlert.alert(fail.error)
    });

};

exports.onBackTap = onBackTap;