var Observable = require("data/observable").Observable;
var observableArrayModule = require("data/observable-array");
var api = require('../../../shared/api.js');
var config = require('../../../shared/config.js');
var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var accoundSourse = new Observable();
var content = [];
var clientState = false;


var ViewModel = (function () {
    function ViewModel(page) {
        this.initDataItems(page);
    }

    Object.defineProperty(ViewModel.prototype, "depositeInfoList", {
        get: function () {
            console.log(this._items.length);
            return this._items;
        },
        enumerable: true,
        configurable: true
    });

    ViewModel.prototype.onItemLoading = function (args) {
        if (args.itemIndex == 0) {
            args.view._subViews[0].visibility = "visible";
        } else {
            args.view._subViews[0].visibility = "collapse";
        }

        if (content.length == 0) {
            args.view._subViews[1].visibility = "collapse";
        } else {
            args.view._subViews[1].visibility = "visible";
        }
    }

    // 点击申请提现的方法
    ViewModel.prototype.depositeApplyClick = function (args) {
        var topmost = frameModule.topmost();
        // topmost.navigate("views/walletDeposit/depositeCheckDetail/depositeCheckDetail");
        if (clientState == true) {
            // 月结用户跳转
            topmost.navigate("views/walletDeposit/depositeCheckDetail/depositeCheckDetail");
        } else if (clientState == false) {
            // 普通用户跳转
            topmost.navigate("views/walletDeposit/depositeApplyCheck/depositeApplyCheck");
        }
    }

    // 提现记录的点击
    ViewModel.prototype.jumpDepositeRecord = function () {
        var topmost = frameModule.topmost();

        var navigationEntry = {
            moduleName: "views/walletDeposit/depositeRecord/depositeRecord",
            context: {
                "clientState": clientState
            },
            animated: true
        };

        topmost.navigate(navigationEntry);
    }


    // << listview-howto-item-selection-events
    ViewModel.prototype.initDataItems = function (page) {

        this._items = new observableArrayModule.ObservableArray();
        var topAccoundSection = page.getViewById("topAccoundSection");

        var money = "0.00";

        //  请求顶部数据
        var params = {
            "name": "commonWalletController.findCurrentUserMoneyAndState",
            "args": []
        };
        api.call(config.apiUrl, params).ok((data) => {
            console.log(JSON.stringify(data.result));
            clientState = data.result.state;
            money = data.result.money;

            // 请求提现记录数据
            try {
                var qureyParams = {
                    "name": "commonWalletController.findWithdrawBillByUser",
                    "args": [{"first": 0, "rows": 10}, {withdrawStatus: "inWithdraw"}]
                };
                api.call(config.apiUrl, qureyParams).ok((data) => {
                    console.log("#######################")
                    console.log(JSON.stringify(data.result));
                    console.log(data.result.content.length);

                    content = data.result.content;
                    if (content.length == 0){
                        this._items.push(new DataItem(clientState, money, "", "", "", "", "", "", ""));
                    }

                    for (var i = 0; i < content.length; i++) {
                        this._items.push(new DataItem(clientState, money, content[i].wtNo, content[i].withdrawTime, content[i].withdrawState, content[i].withdrawMoney, content[i].paidMoney, content[i].noPiadMoney, content[i].month_wtNo));
                    }
                }).fail((err) => {
                    console.log(err);

                    this._items.push(new DataItem(clientState, money, "", "", "", "", "", "", ""));

                    var options = {
                        title: "提示",
                        message: "网络连接错误",
                        okButtonText: "确认"
                    };
                    dialogsModule.confirm(options).then((result) => {
                    });
                })
            } catch (e) {
            }

        }).fail((err) => {
            this._items.push(new DataItem(clientState, "0.00", "", "", "", "", "", "", ""));

            console.log(err.error);
        })

    };


    return ViewModel;
}());
exports.ViewModel = ViewModel;


var DataItem = (function (_super) {
    __extends(DataItem, _super);
    function DataItem(state, money, wtNo, withdrawTime, withdrawState, withdrawMoney, paidMoney, noPiadMoney, month_wtNo) {
        var _this = _super.call(this) || this;
        _this.state = state;
        _this.money = money;
        _this.wtNo = wtNo;
        _this.withdrawTime = withdrawTime;
        _this.withdrawState = withdrawState;
        _this.withdrawMoney = withdrawMoney;
        _this.paidMoney = paidMoney;
        _this.noPiadMoney = noPiadMoney;
        _this.month_wtNo = month_wtNo;
        return _this;
    }

    Object.defineProperty(DataItem.prototype, "noPiadMoney", {
        get: function () {
            return this.get('_noPiadMoney');
        },
        set: function (value) {
            this.set('_noPiadMoney', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "paidMoney", {
        get: function () {
            return this.get('_paidMoney');
        },
        set: function (value) {
            this.set('_paidMoney', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "withdrawMoney", {
        get: function () {
            return this.get('_withdrawMoney');
        },
        set: function (value) {
            this.set('_withdrawMoney', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "withdrawState", {
        get: function () {
            return this.get('_withdrawState');
        },
        set: function (value) {
            this.set('_withdrawState', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "state", {
        get: function () {
            return this.get('_state');
        },
        set: function (value) {
            this.set('_state', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "money", {
        get: function () {
            return this.get('_money');
        },
        set: function (value) {
            this.set('_money', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "wtNo", {
        get: function () {
            return this.get('_wtNo');
        },
        set: function (value) {
            this.set('_wtNo', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "withdrawTime", {
        get: function () {
            return this.get('_withdrawTime');
        },
        set: function (value) {
            this.set('_withdrawTime', value);
        },
        enumerable: true,
        configurable: true
    });
    return DataItem;
}(Observable));
exports.DataItem = DataItem;
