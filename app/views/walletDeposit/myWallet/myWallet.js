var frameModule = require("ui/frame");
var viewModal = require("./myWallet-modal");
var visibility = require("ui/enums");
var view = require("ui/core/view");
var label = require("ui/label");
var api = require('../../../shared/api');
var config = require("../../../shared/config");
var dialogsAlert = require("../../../common/dialogsUtil");
var wtNo;
var isOldPasswordExist;

// var clientStateLabel;
var clientState;

exports.onNavigatingTo = function (args) {

    var page = args.object;

    page.bindingContext = new viewModal.ViewModel(page);

    // 请求数据   判断是否有设置过支付密码
    api.call(config.apiUrl, {
        name: "userWorkerController.queryIfPayPwdExist",
        args: []
    }).ok(data => {
        if (data.result.oldPayPassword == '1') {
            //如果是1则跳转到设置支付密码
            isOldPasswordExist=false;
        } else if (data.result.oldPayPassword == '0') {
            //如果是0说明有支付密码，说明要验证支付密码
            isOldPasswordExist=true;
        }
    }).fail(data => {
        console.log(data.error);
    });
}

function onBackTap(args) {
    frameModule.topmost().goBack();
}
//跳转到余额明细页面
exports.balanceDetailBtnTap = function () {

    var topmost = frameModule.topmost();

    topmost.navigate("views/walletDeposit/balanceDetail/balanceDetail");

};
//跳转到绑定银行卡页面
exports.jumpBindingCardPage = function () {
    var topmost = frameModule.topmost();

    var naviEntry={
        moduleName:"views/walletDeposit/bindingCardPage/bindingCard",
        context:{
            isOldPasswordExist:isOldPasswordExist
        }
    }
    topmost.navigate(naviEntry);


};

//跳转到支付设置页面
exports.jumpSetPayment = function () {
    console.log("++++++"+isOldPasswordExist);
    var topmost = frameModule.topmost();
    if (isOldPasswordExist){
        topmost.navigate("views/walletDeposit/setPayment/setPayment");
    }else if (isOldPasswordExist == false){
        var naviEntry={
            moduleName:"views/walletDeposit/bindingCardPage/bindingCard",
            context:{
                isOldPasswordExist:isOldPasswordExist
            }
        }
        topmost.navigate(naviEntry);
    }
};

//跳转到提现申请账单页面
exports.jumpDepositeCheckDetail = function (args) {
    /** 页面传参*/
    wtNo = args.object.wtNo;
    var orderInfo = args.object.orderInfo;

    //console.log("###"+args.object.state);

    console.log("^^^^^^^^^" + orderInfo);

    var state = args.object.state; // 判断是月结用户还是普通用户
    console.log("###" + args.object.state);


    var topmost = frameModule.topmost();

    if (state) { // 月结
        var navigationEntry = {
            moduleName: "views/walletDeposit/underWayDepositeInformation/underWayDepositeInformation",
            context: {
                "wtNo": orderInfo
            },
            animated: true
        };
    } else { // 普通
        var navigationEntry = {
            moduleName: "views/walletDeposit/checkDetail/checkDetail",
            context: {
                "wtNo": wtNo
            },
            animated: true
        };
    }

    topmost.navigate(navigationEntry);
    // topmost.navigate("views/walletDeposit/depositeCheckDetail/depositeCheckDetail");

};


exports.onBackTap = onBackTap;