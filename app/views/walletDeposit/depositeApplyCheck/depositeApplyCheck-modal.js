var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var observableArrayModule = require("data/observable-array");
var view = require("ui/core/view");
var visibility = require("ui/enums");
var api = require('../../../shared/api.js');
var config = require('../../../shared/config.js');

var dataArray;
var count = 0;

var groundArray = new observableArrayModule.ObservableArray();


var viewModal = ( function () {
    function viewModal(page) {

        this.getData(page);
    };

    Object.defineProperty(viewModal.prototype, "depositeInfoList", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(viewModal.prototype, "completeNum", {
        get: function () {
            return this._completeNum;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(viewModal.prototype, "depositeNum", {
        get: function () {
            return this._depositeNum;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(viewModal.prototype, "totalAmount", {
        get: function () {
            return this._totalAmount;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(viewModal.prototype, "payAmount", {
        get: function () {
           return this._payAmount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(viewModal.prototype, "completePay", {
        get: function () {
            return this._completePay;
        },
        enumerable: true,
        configurable: true
    });

    viewModal.prototype.onItemLoading = function (args) {
        var stateLabel = args.view._subViews[0]._subViews[2];
        if (stateLabel.text == "已提现") {
            stateLabel.style.color = "dimgray";
        } else {
            stateLabel.style.color = "#4193d3";
        }
    };
    viewModal.prototype.labelTap = function () {
        console.log("~~~~~~~~"+count++);
    }

    viewModal.prototype.getData = function (page) {
        var contenttop=page.getViewById('content-top');
        var source = new Observable();
        var that=this;
        this._items = new observableArrayModule.ObservableArray();
        var result = [];
        var qureyParams = {
            "name": "commonWalletController.withdrawApplyDetail",
            "args": []
        };
        /** 后台请求 当前登录用户,提现申请 总完成运单(任务)、已完成运单(任务)....统计*/
        api.call(config.apiUrl, qureyParams).ok((data) => {
            console.log("##############api.call success start#############");
            console.log(JSON.stringify(data));
            var record=data && data.result || {};
            source.completeNum = record.totalDoneWaybill || 0;
            source.depositeNum = record.totalAlreadyWithdrawWaybill || 0;
            source.totalAmount = record.sumMoney || 0;
            source.payAmount = record.inPaid || 0;
            source.completePay = record.hasPaid || 0;
            contenttop.bindingContext=source;
        }).fail((err) => {
            console.log(err);
            source.completeNum = "00.00";
            source.depositeNum = "00.00";
            source.totalAmount = "00.00";
            source.payAmount = "00.00";
            source.completePay = "00.00";
            contenttop.bindingContext=source;

        })
        /** 后台请求 提现记录(最近提现记录) */
        var postParams = {
            "name": "commonWalletController.findWithdrawBillByUser",
            "args": [{"first": 0, "rows": 10},{withdrawStatus: "inWithdraw"}]
        };
        api.call(config.apiUrl, postParams).ok((data) => {
            var result = data.result.content;
            console.log(JSON.stringify(result));
            for (var i = 0; i < result.length; i++) {
                this._items.push(new listItemData(result[i].wtNo, result[i].withdrawTime, result[i].withdrawMoney, result[i].withdrawState, result[i].paidMoney, result[i].noPiadMoney));
            }

        }).fail((err) => {
            console.log(err.error);
        })

    };
    return viewModal;
}());
exports.viewModal = viewModal;


var listItemData = (function (_super) {
    __extends(listItemData, _super);
    function listItemData(wtNo, withdrawTime, withdrawMoney, withdrawState, paidMoney, noPiadMoney) {
        var _this = _super.call(this) || this;
        _this.wtNo = wtNo;
        _this.withdrawState = withdrawState;
        _this.withdrawTime = withdrawTime;
        _this.withdrawMoney = withdrawMoney;
        _this.paidMoney = paidMoney;
        _this.noPiadMoney = noPiadMoney;
        return _this;
    }

    Object.defineProperty(listItemData.prototype, "noPiadMoney", {
        get: function () {
            return this.get('_noPiadMoney');
        },
        set: function (value) {
            this.set('_noPiadMoney', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(listItemData.prototype, "paidMoney", {
        get: function () {
            return this.get('_paidMoney');
        },
        set: function (value) {
            this.set('_paidMoney', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(listItemData.prototype, "withdrawState", {
        get: function () {
            return this.get('_withdrawState');
        },
        set: function (value) {
            this.set('_withdrawState', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(listItemData.prototype, "wtNo", {
        get: function () {
            return this.get('_wtNo');
        },
        set: function (value) {
            this.set('_wtNo', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(listItemData.prototype, "withdrawTime", {
        get: function () {
            return this.get('_withdrawTime');
        },
        set: function (value) {
            this.set('_withdrawTime', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(listItemData.prototype, "withdrawMoney", {
        get: function () {
            return this.get('_withdrawMoney');
        },
        set: function (value) {
            this.set('_withdrawMoney', value);
        },
        enumerable: true,
        configurable: true
    });
    return listItemData;
}(Observable));
exports.listItemData = listItemData;

