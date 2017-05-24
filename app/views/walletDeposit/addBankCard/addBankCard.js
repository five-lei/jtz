var frameModule = require("ui/frame");
var myPlatform = require( "nativescript-platform" );
var Observable = require("data/observable").Observable;
var dialogsAlert = require("../../../common/dialogsUtil");
var dialogsModule = require("ui/dialogs");
var cache = require("nativescript-cache");
var view = require("ui/core/view");
var api = require('../../../shared/api');
var config = require("../../../shared/config");
var bankCardInfo;
var page;
exports.loaded = function(args) {
    page = args.object;

    var actionBar = page.getViewById("actionBar");
    var bank = page.getViewById("bankPage");
    var alipay = page.getViewById("alipayPage");

    var sourse = new Observable();
    
    bankCardInfo=cache.get('bankCardInfo');
    console.log("=========="+bankCardInfo);
    if (bankCardInfo == undefined){
        return;
    }
    var bankCard=JSON.parse(bankCardInfo);
    if (bankCard.type == "bank"){
        // bankCard
        alipay.style.visibility = "collapse";
        bank.style.visibility = "visible";

        if (myPlatform.android) {
            console.log("android");
            actionBar.text = "修改银行卡";
        }else{
            console.log("ios");
            actionBar.title = "修改银行卡";
        }

        sourse.bankName=bankCard.bankName;
        sourse.subBranchName=bankCard.subBranchName;
        sourse.accountName=bankCard.accountName;
        sourse.bankAccount=bankCard.bankAccount;
    }else if (bankCard.type == "alipay"){
        // alipay
        bank.style.visibility = "collapse";
        alipay.style.visibility = "visible";

        if (myPlatform.android) {
            console.log("android");
            actionBar.text = "修改支付宝";
        }else{
            console.log("ios");
            actionBar.title = "修改支付宝";
        }
        sourse.alipayAccount = bankCard.bankAccount;
        sourse.alipayName = bankCard.accountName
    }

    page.bindingContext = sourse;
};

function onBackTap(args) {
    frameModule.topmost().goBack();
}

function addBankCardTap(args) {
    dialogsModule.action({
        message: "请选择银行",
        cancelButtonText: "取消",
        actions: ["中国工商银行", "中国农业银行", "中国建设银行 ", "中国银行 ", "中国交通银行","中国邮政储蓄银行","招商银行","中信银行","兴业银行","光大银行","华夏银行","浦发银行","中国民生银行","平安银行","广发银行","恒丰银行","渤海银行","浙商银行"]
    }).then(function (result) {
        if (result == "取消") {
            return;
        }
        var user = new Observable({
            bankName: result
        });

        page = args.object;
        page.bindingContext = user;
    });
}
function updateBankCard(args) {
    var page = args.object.page;

    var bankName=page.getViewById("bankName").text;
    console.log("*******"+bankName);
    var subBranchName=page.getViewById("subBranchName").text;
    var accountName=page.getViewById("accountName").text;
    var bankAccount=page.getViewById("bankAccount").text;


    var qureyParams = {
        "name": "userReceiptAccountController.saveOrUpdateUserReceiptAccount",
        "args": [{
            "bankName": bankName,
            "subBranchName": subBranchName,
            "accountName": accountName,
            "bankAccount": bankAccount,
            "type": "bank",
            // "user": {
            //     "mobile": "13800000000"
            // }
        }],
        // "Authorization": "Bearer " + "eyJraWQiOiIzOTU0YjU3ZC1jYzFjLTQ3ZTYtOTBjMC01NWE2NmM1MDRiMGIiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJpc3N1ZXIiLCJhdWQiOiJhdWRpZW5jZSIsImV4cCI6MTQ5MzgxODU2NCwianRpIjoiMWtUZjRtalV2YXF0Rm9BNjAyVmVtZyIsImlhdCI6MTQ5MjYwODk2NCwibmJmIjoxNDkyNjA4ODQ0LCJzdWIiOiIxMzAwMDAwMDAwMCIsImF0dHJpYnV0ZXMiOiJ7XCJiaXJ0aGRheVwiOjYzMTAzNjgwMDAwMCxcInJlYWxOYW1lXCI6XCJcXHU2RDRCXFx1OEJENVxcdTU0NThcIixcImNvZGVcIjpcIjAwMFwiLFwibmlja05hbWVcIjpcIjIzMjIyMjJcIixcIm1vYmlsZVwiOlwiMTMwMDAwMDAwMDBcIixcIiRleHBpcmF0aW9uLXRpbWVcIjoxNDkzODE4NTY0NzQ4LFwiZW1haWxcIjpcIjExMUA1XCIsXCJzdGF0dXNcIjpcImFjdGl2YXRlZFwifSJ9.k66GfNQkCcAsvgUGDpnNtAcUcOnJ-Dx4x60WXZ6GgzRgOGWKIK7MAnduIj0cmZD0cuv6oiui7yerchXrz9yCvq1FVWvui14A5BgDOZSwKMEEX634NoDeMx2rDsJAfoV-o5CFfSqUXEfDVr7riwoLBmfRS4vjitGzocP_fNg3x5x-YKn8ohF90hJyaZ-6eIEpC7RbLzlAsn06uZCJel6fFdBwpZWKPq3zkEcFmP5uQZFo8M8CVgSFrFSlN34dX_Ky0kbmQKU5gzlYLVLxmnGETvcHTRYVTFp3qtmOvEczh3d1-8ZudpvvPlNPI235oBokmMXwRGQWPZauYIl6niOWBg"
    };
    api.call(config.apiUrl, qureyParams).ok(function(data){
        // api.call(requestUrl,qureyParams).ok(function(data){
        console.dump(data)
        var topmost = frameModule.topmost();
        topmost.goBack();
    }).fail(function (data) {
        console.dump(data);
        dialogsAlert.alert(data.error);
    });
}

// 银行卡的点击事件
function bankCardPage(args) {
    updateBankCard(args);
}

// 支付宝的点击事件
function alipayBtn() {
    updateAlipay()
}
function updateAlipay() {
    var accountName=view.getViewById(page,"accountName2").text;
    var bankAccount=page.getViewById("bankAccount2").text;

    var qureyParams={
        "name": "userReceiptAccountController.saveOrUpdateUserReceiptAccount",
        "args": [{
            "accountName":accountName,
            "bankAccount":bankAccount,
            "type":"alipay",
        }],
    };
    api.call(config.apiUrl,qureyParams).ok(function(data){
        console.log(data)
        var topmost = frameModule.topmost();
        topmost.goBack();

    }).fail(function (data) {
        dialogsAlert.alert(data.error);
    });
}


exports.addBankCardTap = addBankCardTap;
exports.bankCardPage = bankCardPage;
exports.alipayBtn = alipayBtn;
exports.onBackTap = onBackTap;