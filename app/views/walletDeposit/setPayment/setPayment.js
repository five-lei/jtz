var frameModule = require("ui/frame");

function onBackTap(args) {
    frameModule.topmost().goBack();
}

//跳转到忘记支付宝页面
exports.jumpForgetPassword = function() {

    var topmost = frameModule.topmost();

    topmost.navigate("views/walletDeposit/forgetPassword/forgetPassword");

};

//跳转到修改支付密码页面
exports.jumpModifierPassword = function() {

    var topmost = frameModule.topmost();

    topmost.navigate("views/walletDeposit/oldPassword/oldPassword");

};

exports.onBackTap = onBackTap;