var Observable = require("data/observable").Observable;
var observableArrayModule = require("data/observable-array");
var api = require('../../../shared/api.js');
var config = require('../../../shared/config.js');
var dialogsModule = require("ui/dialogs");

exports.viewModal = function (page) {

    console.log("### 开始 ###");
    var contentTitle=page.getViewById('titleContent');
    var messagesList = page.getViewById('messagesList');
    var viewModal = new Observable();
    var source = new Observable();
    var messageSource = new Observable();
    /** 后台请求 当前登录用户,提现申请 总完成运单(任务)、已完成运单(任务)....统计*/
    var qureyParams = {
        "name": "commonWalletController.withdrawApplyDetail",
        "args": []
    };
    api.call(config.apiUrl, qureyParams).ok((data) => {
        console.log("##############api.call success start#############");
        console.log(JSON.stringify(data.result));
        var resultData = data.result;
        console.log(JSON.stringify(resultData))
        source.month = resultData.month;
        source.date = resultData.date;
        source.state = resultData.state;
        source.totalMoney = resultData.totalMoney;
        source.wayBillMoney = resultData.wayBillMoney;
        source.abnormalMoney = resultData.abnormalMoney;
        source.aftermarketMoney = resultData.aftermarketMoney;

        contentTitle.bindingContext=source

        messageSource.messages = resultData.content;
        messagesList.bindingContext = messageSource;
    }).fail((err) => {
        console.log(err);
    })
    // return viewModal;
}

exports.abnormalModal = function (page) {
    var messagesList = page.getViewById('messagesList');
    var messageSource = new Observable();
    var qureyParams = {
        "name": "commonWalletController.withdrawApplyDetail",
        "args": []
    };
    api.call(config.apiUrl, qureyParams).ok((data) => {
        console.log("##############api.call success start#############");
        console.log(JSON.stringify(data.result));
        var resultData = data.result;
        messageSource.messages = resultData;
        messagesList.bindingContext = messageSource;
        console.log(JSON.stringify(resultData))

    }).fail((err) => {
        console.log(err);
    })
}

exports.aftermarketMoney = function (page) {
    var messagesList = page.getViewById('messagesList');
    var messageSource = new Observable();
    var qureyParams = {
        "name": "commonWalletController.withdrawApplyDetail",
        "args": []
    };
    api.call(config.apiUrl, qureyParams).ok((data) => {
        console.log("##############api.call success start#############");
        console.log(JSON.stringify(data.result));
        var resultData = data.result;
        messageSource.messages = resultData;
        messagesList.bindingContext = messageSource;
        console.log(JSON.stringify(resultData))

    }).fail((err) => {
        console.log(err);
    })
}