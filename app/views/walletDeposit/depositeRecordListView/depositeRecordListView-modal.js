var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var observableArrayModule = require("data/observable-array");
var view = require("ui/core/view");
var visibility = require("ui/enums");
var api = require('../../../shared/api.js');
var config = require('../../../shared/config.js');
var dialogsModule = require("ui/dialogs");

var resultData;

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
            sectionNumber += resultData[i].vDepositBills.length;
            if (args.itemIndex == 0 || args.itemIndex == sectionNumber) {
                var headerLabel = args.view._subViews[0]._subViews[0];
                headerLabel.style.visibility = "visible";
            }
        }
    }

    viewModal.prototype.getData = function () {
        this._items = new observableArrayModule.ObservableArray();

        var qureyParams = {
            "name": "commonWalletController.findAlreadyWithdrawBill",
            "args": [{"first": 0, "rows": 10}]
        };
        //请求返回数据
        api.call(config.apiUrl, qureyParams).ok((data) => {
            console.log("##############&&&&&&&&&&&&&&#############");
            console.dump(data.result);
            resultData = data.result;

            for (var i = 0; i < resultData.length; i++) {
                var header = resultData[i].group_year;
                var content = resultData[i].vDepositBills;
                for (var j = 0; j<content.length; j++){
                    this._items.push(new listItemData(header,content[j].billName, content[j].bill_area, content[j].billMoney,content[j].month_wtNo));
                }
            }

           /*
            console.log("##############api.call  success  end#############");*/
        }).fail((err) => {
            resultData = [
                {
                    header: "2012年12月",
                    content: [
                        {name: "余额提现", date: "2016/12/12  12:00:00", account: "-500.00"},
                        {name: "运单收入", date: "2016/12/12  12:00:00", account: "+80.00"},
                        {name: "余额提现", date: "2016/12/12  12:00:00", account: "-500.00"},
                        {name: "运单收入", date: "2016/12/12  12:00:00", account: "+50.00"},
                        {name: "运单收入", date: "2016/12/12  12:00:00", account: "+150.00"}]
                }, {
                    header:"2011年12月",
                    content:[
                        {name: "余额提现", date: "2016/12/12  12:00:00", account: "-888.00"},
                        {name: "运单收入", date: "2016/12/12  12:00:00", account: "+50.00"},
                        {name: "运单收入", date: "2016/12/12  12:00:00", account: "+150.00"}]
                }
            ];
            for (var i = 0; i < resultData.length; i++) {
                var header = resultData[i].header;
                var content = resultData[i].content;
                for (var j = 0; j<content.length; j++){
                    this._items.push(new listItemData(header,content[j].name, content[j].date, content[j].account));
                }
            }
            console.log(err);
        })
    };
    return viewModal;
}());
exports.viewModal = viewModal;


var listItemData = (function (_super) {
    __extends(listItemData, _super);
    function listItemData(header,name, date, account,month_wtNo) {
        var _this = _super.call(this) || this;
        _this.header = header;
        _this.monthLabel = name;
        _this.dateLabel = date;
        _this.accountLabel = account;
        _this.month_wtNo = month_wtNo;
        return _this;
    }

    Object.defineProperty(listItemData.prototype, "monthLabel", {
        get: function () {
            return this.get('_monthLabel');
        },
        set: function (value) {
            this.set('_monthLabel', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(listItemData.prototype, "dateLabel", {
        get: function () {
            return this.get('_dateLabel');
        },
        set: function (value) {
            this.set('_dateLabel', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(listItemData.prototype, "accountLabel", {
        get: function () {
            return this.get('_accountLabel');
        },
        set: function (value) {
            this.set('_accountLabel', value);
        },
        enumerable: true,
        configurable: true
    });
    return listItemData;
}(Observable));
exports.listItemData = listItemData;

