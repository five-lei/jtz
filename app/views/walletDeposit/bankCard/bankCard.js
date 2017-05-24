var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var Observable = require("data/observable").Observable;
var view = require("ui/core/view");
var api = require('../../../shared/api');
var config = require("../../../shared/config");
var cache = require("nativescript-cache");

var source;

function queryBankCard(page) {
    var reqestParam = {
        "name": "userReceiptAccountController.queryUserReceipt",
        "args": [{
            // "user": {
            //     "mobile": "13800000000",
            // },
            "type":"bank"
        }],
        // "Authorization": "Bearer " + "eyJraWQiOiIzOTU0YjU3ZC1jYzFjLTQ3ZTYtOTBjMC01NWE2NmM1MDRiMGIiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJpc3N1ZXIiLCJhdWQiOiJhdWRpZW5jZSIsImV4cCI6MTQ5MzgxODU2NCwianRpIjoiMWtUZjRtalV2YXF0Rm9BNjAyVmVtZyIsImlhdCI6MTQ5MjYwODk2NCwibmJmIjoxNDkyNjA4ODQ0LCJzdWIiOiIxMzAwMDAwMDAwMCIsImF0dHJpYnV0ZXMiOiJ7XCJiaXJ0aGRheVwiOjYzMTAzNjgwMDAwMCxcInJlYWxOYW1lXCI6XCJcXHU2RDRCXFx1OEJENVxcdTU0NThcIixcImNvZGVcIjpcIjAwMFwiLFwibmlja05hbWVcIjpcIjIzMjIyMjJcIixcIm1vYmlsZVwiOlwiMTMwMDAwMDAwMDBcIixcIiRleHBpcmF0aW9uLXRpbWVcIjoxNDkzODE4NTY0NzQ4LFwiZW1haWxcIjpcIjExMUA1XCIsXCJzdGF0dXNcIjpcImFjdGl2YXRlZFwifSJ9.k66GfNQkCcAsvgUGDpnNtAcUcOnJ-Dx4x60WXZ6GgzRgOGWKIK7MAnduIj0cmZD0cuv6oiui7yerchXrz9yCvq1FVWvui14A5BgDOZSwKMEEX634NoDeMx2rDsJAfoV-o5CFfSqUXEfDVr7riwoLBmfRS4vjitGzocP_fNg3x5x-YKn8ohF90hJyaZ-6eIEpC7RbLzlAsn06uZCJel6fFdBwpZWKPq3zkEcFmP5uQZFo8M8CVgSFrFSlN34dX_Ky0kbmQKU5gzlYLVLxmnGETvcHTRYVTFp3qtmOvEczh3d1-8ZudpvvPlNPI235oBokmMXwRGQWPZauYIl6niOWBg"
    }
    api.call(config.apiUrl, reqestParam).ok(function (data) {
        var responseVO = data.result;
        console.dump(responseVO);
        if (responseVO.type == "bank"){
            source.bankName=responseVO.bankName || "";
            source.type = false;
        }else if (responseVO.type == "alipay"){
            source.bankName = "支付宝";
            source.type = true;
        }

        if (responseVO.status == "pendingAudit"){
            source.state = "待审核";
        }else if (responseVO.status == "pass"){
            source.state = "已审核";
        }else{
            source.state = "未通过";
        }

        source.bankAccount = responseVO.bankAccount || "";
        source.accountName=responseVO.accountName || "";
        page.bindingContext = source;

        cache.set('bankCardInfo',JSON.stringify(responseVO));

    }).fail(function (data) {
        console.dump(data);
    });
}



exports.loaded = function (args) {
    var page = args.object;
    source = new Observable();
    queryBankCard(page);

};


function onBackTap(args) {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "views/my/index",
        clearHistory: true
    };
    topmost.navigate(navigationEntry);
}

//跳转到修改银行卡页面
exports.addBankCardBtnTap = function () {

    var topmost = frameModule.topmost();

    topmost.navigate("views/walletDeposit/addBankCard/addBankCard");

};

exports.onBackTap = onBackTap;