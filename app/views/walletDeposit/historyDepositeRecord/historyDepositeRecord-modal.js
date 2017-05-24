var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var observableArrayModule = require("data/observable-array");
var view = require("ui/core/view");
var visibility = require("ui/enums");
var api = require('../../../shared/api.js');
var config = require('../../../shared/config.js');
var dialogsModule = require("ui/dialogs");

var dataArray;
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
        /*  后台数组没分组, 写死!!!
        var sectionNumber = 0;
        console.log("~~~~~~~~~~"+dataArray.length);
        for (var i = 0; i<dataArray.length; i++){
            sectionNumber += dataArray[i].content.length;
            if (args.itemIndex == 0 || args.itemIndex == sectionNumber) {
                var headerLabel = args.view._subViews[0]._subViews[0];
                headerLabel.style.visibility = "visible";
            }
        }
        */
    }

    viewModal.prototype.getData = function () {
        this._items = new observableArrayModule.ObservableArray();
        dataArray = [
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

        var qureyParams = {
            "name": "commonWalletController.findWithdrawBillByUser",
            "args": [{"first": 0, "rows": 10},{withdrawStatus: "alreadyWithdrawed"}]
        };
        //请求返回数据
        api.call(config.apiUrl, qureyParams).ok((data) => {

            console.log("=======================")
            console.log(JSON.stringify(data));
            console.log("========================")

            resultData = data.result.content;
            for (var i = 0; i < resultData.length; i++) {
                // var header = resultData[i].header;
                this._items.push(new listItemData(resultData[i].group_year,resultData[i].wtNo, resultData[i].withdrawTime, resultData[i].withdrawMoney,resultData[i].withdrawState));
            }
            console.log("##############api.call  success  end#############");
        }).fail((err) => {
            console.log(err.error);
        })
    };
    return viewModal;
}());
exports.viewModal = viewModal;


var listItemData = (function (_super) {
    __extends(listItemData, _super);
    function listItemData(header,name, date, account) {
        var _this = _super.call(this) || this;
        _this.header = header;
        _this.name = name;
        _this.date = date;
        _this.account = account;
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

