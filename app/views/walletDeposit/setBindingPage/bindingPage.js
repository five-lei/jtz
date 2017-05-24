var frameModule = require("ui/frame")
var color = require("color");
var config = require("../../../shared/config");
var dialogsAlert = require("../../../common/dialogsUtil");
var visibility = require("ui/enums");
var view = require("ui/core/view");

var Observable = require("data/observable").Observable;

var dialogsModule = require("ui/dialogs");
var myPlatform = require("nativescript-platform");
var api = require('../../../shared/api');

// 定义全局的 ID 属性
var page;
var bankContent;
var alipayContent;
var actionBar;

var bankNameLabel;

//定义绑定账号类型
var type = 'bank';

function onBackTap(args) {
    frameModule.topmost().goBack();
}
exports.loaded = function (args) {

    page = args.object;
    bankContent = view.getViewById(page, "bankCardContent");
    alipayContent = view.getViewById(page, "alipayContent");
    actionBar = view.getViewById(page, "actionBar");

    bankNameLabel = page.getViewById("bankName");
};

// 点击支付宝的选项
function clickAlipay(args) {
    var alipaySelect = args.object;
    var parent = alipaySelect.parent;
    var bankSelect = view.getViewById(parent, "card");

    type = 'alipay';
    bankContent.style.visibility = "collapse";
    alipayContent.style.visibility = "visible";
    if (myPlatform.android) {
        console.log("android");
        actionBar.text = "绑定支付宝";
    } else {
        console.log("ios");
        actionBar.title = "绑定支付宝";
    }

    bankSelect.style.backgroundColor = new color.Color("rgb(217,217,217)");
    alipaySelect.style.backgroundColor = new color.Color("rgb(255,138,37)");
}

// 点击银行卡的选项
function clickBankCard(args) {
    var bankSelect = args.object;
    var parent = bankSelect.parent;
    var alipaySelect = view.getViewById(parent, "alipay");

    type = 'bank';
    bankContent.style.visibility = "visible";
    alipayContent.style.visibility = "collapse";
    if (myPlatform.android) {
        console.log("android");
        actionBar.text = "绑定银行卡";
    } else {
        console.log("ios");
        actionBar.title = "绑定银行卡";
    }

    bankSelect.style.backgroundColor = new color.Color("rgb(255,138,37)");
    alipaySelect.style.backgroundColor = new color.Color("rgb(217,217,217)");
}


// 点击银行卡的确定按钮
exports.bankCardPageBtn = function () {
    // var topmost = frameModule.topmost();
    // topmost.navigate("views/walletDeposit/bankCard/bankCard");

    var bankName = page.getViewById("bankName").text;
    var subBranchName = page.getViewById("subBranchName").text;
    var accountName = page.getViewById("accountName").text;
    var bankAccount = page.getViewById("bankAccount").text;

    console.log(bankName);
    console.log(subBranchName);
    console.log(accountName);
    console.log(bankAccount);
    console.log(type);

    var qureyParams = {
        "name": "userReceiptAccountController.saveOrUpdateUserReceiptAccount",
        "args": [{
            "bankName": bankName,
            "subBranchName": subBranchName,
            "accountName": accountName,
            "bankAccount": bankAccount,
            "type": type,
            // "user":{
            //     "mobile":"13800000000"
            // }
        }],
        // "Authorization":"Bearer "+"eyJraWQiOiIzOTU0YjU3ZC1jYzFjLTQ3ZTYtOTBjMC01NWE2NmM1MDRiMGIiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJpc3N1ZXIiLCJhdWQiOiJhdWRpZW5jZSIsImV4cCI6MTQ5MzgxODU2NCwianRpIjoiMWtUZjRtalV2YXF0Rm9BNjAyVmVtZyIsImlhdCI6MTQ5MjYwODk2NCwibmJmIjoxNDkyNjA4ODQ0LCJzdWIiOiIxMzAwMDAwMDAwMCIsImF0dHJpYnV0ZXMiOiJ7XCJiaXJ0aGRheVwiOjYzMTAzNjgwMDAwMCxcInJlYWxOYW1lXCI6XCJcXHU2RDRCXFx1OEJENVxcdTU0NThcIixcImNvZGVcIjpcIjAwMFwiLFwibmlja05hbWVcIjpcIjIzMjIyMjJcIixcIm1vYmlsZVwiOlwiMTMwMDAwMDAwMDBcIixcIiRleHBpcmF0aW9uLXRpbWVcIjoxNDkzODE4NTY0NzQ4LFwiZW1haWxcIjpcIjExMUA1XCIsXCJzdGF0dXNcIjpcImFjdGl2YXRlZFwifSJ9.k66GfNQkCcAsvgUGDpnNtAcUcOnJ-Dx4x60WXZ6GgzRgOGWKIK7MAnduIj0cmZD0cuv6oiui7yerchXrz9yCvq1FVWvui14A5BgDOZSwKMEEX634NoDeMx2rDsJAfoV-o5CFfSqUXEfDVr7riwoLBmfRS4vjitGzocP_fNg3x5x-YKn8ohF90hJyaZ-6eIEpC7RbLzlAsn06uZCJel6fFdBwpZWKPq3zkEcFmP5uQZFo8M8CVgSFrFSlN34dX_Ky0kbmQKU5gzlYLVLxmnGETvcHTRYVTFp3qtmOvEczh3d1-8ZudpvvPlNPI235oBokmMXwRGQWPZauYIl6niOWBg"
    };
    api.call(config.apiUrl, qureyParams).ok(function (data) {
        // api.call(requestUrl,qureyParams).ok(function(data){
        console.dump(data);
        console.log("保存银行卡");
        var topmost = frameModule.topmost();

        topmost.navigate("views/walletDeposit/bankCard/bankCard");
    }).fail(function (data) {
        dialogsAlert.alert(data.error);
    });


};

//点击支付宝的确定按钮
exports.alipayBtn = function () {
    var accountName = view.getViewById(page, "accountName2").text;
    var bankAccount = page.getViewById("bankAccount2").text;

    console.log(accountName);
    console.log(bankAccount);
    console.log(type);

    var qureyParams = {
        "name": "userReceiptAccountController.saveOrUpdateUserReceiptAccount",
        "args": [{
            "accountName": accountName,
            "bankAccount": bankAccount,
            "type": type,
            // "user":{
            //     "mobile":"13304099565"
            // }
        }],
        // "Authorization":"Bearer "+"eyJraWQiOiIzOTU0YjU3ZC1jYzFjLTQ3ZTYtOTBjMC01NWE2NmM1MDRiMGIiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJpc3N1ZXIiLCJhdWQiOiJhdWRpZW5jZSIsImV4cCI6MTQ5MzgxODU2NCwianRpIjoiMWtUZjRtalV2YXF0Rm9BNjAyVmVtZyIsImlhdCI6MTQ5MjYwODk2NCwibmJmIjoxNDkyNjA4ODQ0LCJzdWIiOiIxMzAwMDAwMDAwMCIsImF0dHJpYnV0ZXMiOiJ7XCJiaXJ0aGRheVwiOjYzMTAzNjgwMDAwMCxcInJlYWxOYW1lXCI6XCJcXHU2RDRCXFx1OEJENVxcdTU0NThcIixcImNvZGVcIjpcIjAwMFwiLFwibmlja05hbWVcIjpcIjIzMjIyMjJcIixcIm1vYmlsZVwiOlwiMTMwMDAwMDAwMDBcIixcIiRleHBpcmF0aW9uLXRpbWVcIjoxNDkzODE4NTY0NzQ4LFwiZW1haWxcIjpcIjExMUA1XCIsXCJzdGF0dXNcIjpcImFjdGl2YXRlZFwifSJ9.k66GfNQkCcAsvgUGDpnNtAcUcOnJ-Dx4x60WXZ6GgzRgOGWKIK7MAnduIj0cmZD0cuv6oiui7yerchXrz9yCvq1FVWvui14A5BgDOZSwKMEEX634NoDeMx2rDsJAfoV-o5CFfSqUXEfDVr7riwoLBmfRS4vjitGzocP_fNg3x5x-YKn8ohF90hJyaZ-6eIEpC7RbLzlAsn06uZCJel6fFdBwpZWKPq3zkEcFmP5uQZFo8M8CVgSFrFSlN34dX_Ky0kbmQKU5gzlYLVLxmnGETvcHTRYVTFp3qtmOvEczh3d1-8ZudpvvPlNPI235oBokmMXwRGQWPZauYIl6niOWBg"
    };
    api.call(config.apiUrl, qureyParams).ok(function (data) {
        // api.call(requestUrl,qureyParams).ok(function(data){
        console.log(data)

        var topmost = frameModule.topmost();

        topmost.navigate("views/walletDeposit/bankCard/bankCard");
    }).fail(function (data) {
        dialogsAlert.alert(data.error);
    });

};

//  添加银行卡方法
function addBankCardMethod(args) {
    dialogsModule.action({
        message: "请选择银行",
        cancelButtonText: "取消",
        actions: ["中国工商银行", "中国农业银行", "中国建设银行 ", "中国银行 ", "中国交通银行","中国邮政储蓄银行","招商银行","中信银行","兴业银行","光大银行","华夏银行","浦发银行","中国民生银行","平安银行","广发银行","恒丰银行","渤海银行","浙商银行"]
    }).then(function (result) {

        if (result == "取消") {
            return;
        }
        bankNameLabel.text = result;
        bankNameLabel.style.color = new color.Color("black");
        // var user = new Observable({
        //     bank: result
        // });
        //
        // page.bindingContext = user;
    });
}


exports.onBackTap = onBackTap
exports.addBankCardMethod = addBankCardMethod
exports.clickAlipay = clickAlipay;
exports.clickBankCard = clickBankCard;