var Observable = require("data/observable").Observable;
var observableArrayModule = require("data/observable-array");
var api = require('../../../shared/api.js');
var config = require('../../../shared/config.js');
var dialogsModule = require("ui/dialogs");

exports.viewModal = function (page) {
    var contenttop=page.getViewById('content-top');
    var viewModal = new Observable();
    var source = new Observable();
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
        source.completeBill = resultData.totalDoneWaybill;
        console.log(source.completeBill);
        console.log(resultData.totalDoneWaybill);
        source.depositeBill = resultData.totalAlreadyWithdrawWaybill || 0;
        source.totalMoney = resultData.sumMoney || 0;
        source.paying = resultData.inPaid || 0;
        source.paid = resultData.hasPaid || 0;
        source.noDepositeBill = resultData.noPayBillMoney;
        contenttop.bindingContext=source;
    }).fail((err) => {
        console.log(err.error);
    })

    return viewModal;
}

// 未提现账单的数据
exports.noDepositeCheckModal = function (page) {
    var noDepositeCheckInfo=page.getViewById('noDepositeCheckInfo');
    var noDepositeCheckSource = new Observable();
    var noDepositeInfoListArr = new observableArrayModule.ObservableArray();
    /** 后台请求 账单查询*/
    var qureyParams = {
        "name": "commonWalletController.findWithdrawBill",
        "args": [{"first": 0, "rows": 10},{withdrawStatus:"cannotWithdraw"}]
    };
    api.call(config.apiUrl, qureyParams).ok((data) => {
        console.log("------------未提现---------------");
        console.log(JSON.stringify(data.result.content));
        var resultData = data.result.content;
        noDepositeInfoListArr.push(resultData);
        noDepositeCheckSource.noDepositeInfoList = noDepositeInfoListArr;
        noDepositeCheckInfo.bindingContext=noDepositeCheckSource;

    }).fail((err) => {
        console.log(err);
    })
}

// 提现中的账单数据
exports.depositeCheckModal = function (page) {
    var completeDepositeCheckInfo=page.getViewById('completeDepositeCheckInfo');
    var depositeCheckSource = new Observable();

    /** 未体现账单*/
    var qureyParams = {
        "name": "commonWalletController.findWithdrawBill",
        "args": [{"first": 0, "rows": 10},{withdrawStatus:"inWithdraw"}]
    };
    api.call(config.apiUrl, qureyParams).ok((data) => {
       console.log("------------提现中---------------");
        console.log(JSON.stringify(data.result));
        var resultData = data.result.content;
        var depositeInfoListArr =  new observableArrayModule.ObservableArray();
        depositeInfoListArr.push(resultData);

        depositeCheckSource.depositeInfoList = depositeInfoListArr;
        completeDepositeCheckInfo.bindingContext=depositeCheckSource;
      /*  var resultData = data.result;
        console.log(JSON.stringify(resultData))

        depositeCheckSource.depositeInfoList = resultData;
        completeDepositeCheckInfo.bindingContext=depositeCheckSource;*/

    }).fail((err) => {
        console.log(err);
    })
}