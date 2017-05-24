var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var observableArrayModule = require("data/observable-array");
var view = require("ui/core/view");
var visibility = require("ui/enums");
var api = require('../../../shared/api.js');
var config = require('../../../shared/config.js');
var dialogsModule = require("ui/dialogs");

var dataArray;
var resultData = [];

var viewModal = ( function () {
    function viewModal() {
        this.getData();
    };

    Object.defineProperty(viewModal.prototype, "messages", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });

    viewModal.prototype.onItemLoading = function (args) {
        var sectionNumber = 0;
        for (var i = 0; i<resultData.length; i++){
            sectionNumber += resultData[i].vWithdrawRecords.length;
            var headerLabel = args.view._subViews[0]._subViews[0];
            if (args.itemIndex == 0 || args.itemIndex == sectionNumber) {
                headerLabel.style.visibility = "visible";
            }else {
                headerLabel.style.visibility = "collapse";
            }
        }
    }

    viewModal.prototype.getData = function () {
        this._items = new observableArrayModule.ObservableArray();
        dataArray = [
            {
                content: [
                    {header: "2012年12月",wtNo:"123456",name: "余额提现", date: "2016/12/12  12:00:00", account: "-500.00",withdrawState:"提现中"},
                    {header: "2012年12月",wtNo:"123456",name: "运单收入", date: "2016/12/12  12:00:00", account: "+80.00",withdrawState:"已提现"},
                    {header: "2012年12月",wtNo:"123456",name: "余额提现", date: "2016/12/12  12:00:00", account: "-500.00",withdrawState:"提现中"},
                    {header: "2012年12月",wtNo:"123456",name: "运单收入", date: "2016/12/12  12:00:00", account: "+50.00",withdrawState:"提现中"},
                    {header: "2012年12月",wtNo:"123456",name: "运单收入", date: "2016/12/12  12:00:00", account: "+150.00",withdrawState:"已提现"}]
            }, {

                content:[
                    {header:"2011年12月",wtNo:"123456",name: "余额提现", date: "2016/12/12  12:00:00", account: "-888.00",withdrawState:"提现中"},
                    {header:"2011年12月",wtNo:"123456",name: "运单收入", date: "2016/12/12  12:00:00", account: "+50.00",withdrawState:"已提现"},
                    {header:"2011年12月",wtNo:"123456",name: "运单收入", date: "2016/12/12  12:00:00", account: "+150.00",withdrawState:"提现中"}]
            }
        ];

        /** 普通用户-提现记录*/
        var qureyParams = {
            "name": "commonWalletController.withdrawRecordsSearch",
            "args": [{"first": 0, "rows": 10}]
        };
        //提现记录
        api.call(config.apiUrl, qureyParams).ok((data) => {
            console.log("%%%%%%%%%%%%%%");
            console.log(JSON.stringify(data.result));
            resultData = data.result;
            console.log("%%%%%%%%%%%%%%");
            for (var i = 0; i < resultData.length; i++) {
                var header = resultData[i].group_date;
                var content = resultData[i].vWithdrawRecords;
                for (j = 0; j<content.length; j++){
                    this._items.push(new listItemData(content[0].state,header,content[j].companyName,content[j].wtNo, content[j].withdrawalAmount, content[j].applyTime,content[j].withdrawStatus,content[j].month_wtNo));
                }
            }
        }).fail((err) => {
            console.log(err)
        })
    };
    return viewModal;
}());
exports.viewModal = viewModal;


var listItemData = (function (_super) {
    __extends(listItemData, _super);
    function listItemData(clientState,header,name,wtNo, account,applyTime,state,month_wtNo) {
        var _this = _super.call(this) || this;
        _this.clientState = clientState;
        _this.header = header;
        _this.name = name;
        _this.wtNo = wtNo;
        _this.account = account;
        _this.applyTime = applyTime;
        _this.state = state;
        _this.month_wtNo = month_wtNo;
        return _this;
    }

    Object.defineProperty(listItemData.prototype, "state", {
        get: function () {
            return this.get('_state');
        },
        set: function (value) {
            this.set('_state', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(listItemData.prototype, "name", {
        get: function () {
            return this.get('_name');
        },
        set: function (value) {
            this.set('_name', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(listItemData.prototype, "date", {
        get: function () {
            return this.get('_date');
        },
        set: function (value) {
            this.set('_date', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(listItemData.prototype, "account", {
        get: function () {
            return this.get('_account');
        },
        set: function (value) {
            this.set('_account', value);
        },
        enumerable: true,
        configurable: true
    });
    return listItemData;
}(Observable));
exports.listItemData = listItemData;

