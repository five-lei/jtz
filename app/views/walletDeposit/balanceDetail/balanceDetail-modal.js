var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var observableArrayModule = require("data/observable-array");
var view = require("ui/core/view");
var visibility = require("ui/enums");
var api = require('../../../shared/api.js');
var config = require('../../../shared/config.js');
var dialogsModule = require("ui/dialogs");
var DatePickerManager = require("nativescript-timedatepicker");
var moment = require('moment');
var dialogsAlert = require("../../../common/dialogsUtil");
var resultData;
var thisPage;
var isSelectDate = false;
var viewModal = ( function () {
        function viewModal(page) {
            thisPage = page;
            var qureyParams = {
                "name": "commonWalletController.findBalanceDetail",
                "args": [{"first": 0, "rows": 10}, {}]
            };
            this.getData(qureyParams);
        };

        Object.defineProperty(viewModal.prototype, "messages", {
            get: function () {
                console.log("+++++++" + this._items.length);
                return this._items;
            },
            enumerable: true,
            configurable: true
        });

        viewModal.prototype.onItemLoading = function (args) {
            var sectionNumber = 0;
            var headerLabel = args.view._subViews[0]._subViews[0];
            if (!isSelectDate){
                for (var i = 0; i < resultData.length; i++) {
                    sectionNumber += resultData[i].content.length;
                    if (args.itemIndex == 0 || args.itemIndex == sectionNumber) {
                        headerLabel.style.visibility = "visible";
                    }
                }
            }else {
                if (args.itemIndex == 0) {
                    headerLabel.style.visibility = "visible";
                }else {
                    headerLabel.style.visibility = "collapse";
                }
            }


            // 设置后面金额的样式
            var accountLabel = args.view._subViews[1]._subViews[1];
            if (accountLabel.text > 0) {
                accountLabel.color = "rgb(50,210,46)";
            }else {
                accountLabel.color = "rgb(19,19,19)";
            }
        }

        viewModal.prototype.onSelectTime = function () {

            this.showDateDialog((date) => {
                var scheduleMoment = moment(date, " MM YYYY");
                var scheduleJS = scheduleMoment.toDate();
                var dateTime = moment(scheduleJS).format('YYYY/MM')
                console.log("-----------" + dateTime);

                var listView = thisPage.getViewById("listview");
                var listViewSourse = new Observable();

                var dataArray = [];

                var qureyParams = {
                    "name": "commonWalletController.findBalanceDetail",
                    "args": [{"first": 0, "rows": 10}, {"dateScope": dateTime}]
                };
                api.call(config.apiUrl, qureyParams).ok((data) => {
                    this._items = new observableArrayModule.ObservableArray();
                    console.dump(data.result);
                    isSelectDate = true;
                    var result = JSON.stringify(data.result);
                    resultData = eval('(' + result + ')');

                    for (var i = 0; i < resultData.length; i++) {
                        var header = resultData[i].header;
                        var content = resultData[i].content;

                        for (var j = 0; j < content.length; j++) {
                            var account = (content[j].account > 0 ? '+'+content[j].account : content[j].account);
                            dataArray.push({
                                header : header,
                                name: content[j].name,
                                taskNumber : content[j].taskNumber,
                                date: content[j].date,
                                account: account
                            });
                        }
                    }
                    if (dataArray.length == 0){
                        dialogsAlert.alert("没有查询到数据");
                    }
                    listViewSourse.messages = dataArray;
                    listView.bindingContext = listViewSourse;

                }).fail((err) => {
                    var options = {
                        title: "提示",
                        message: "接口请求出错，请查看日记信息",
                        okButtonText: "确认"
                    };
                    dialogsModule.confirm(options).then((result) => {
                    });
                });
            })
        }

        viewModal.prototype.showDateDialog = function (cb) {
            //创建回调函数
            var mCallback = function (result) {
                if (result && cb) {
                    cb(result);
                }
            };
            DatePickerManager.init(mCallback, null, null);
            DatePickerManager.showDatePickerDialog();
        }

        viewModal.prototype.getData = function (qureyParams) {
            this._items = new observableArrayModule.ObservableArray();
            isSelectDate = false;
            console.dump(qureyParams['args']);
            //请求返回数据
            api.call(config.apiUrl, qureyParams).ok((data) => {
                console.log("##############api.call success start#############");

                console.dump(data.result);
                var result = JSON.stringify(data.result);
                resultData = eval('(' + result + ')');

                for (var i = 0; i < resultData.length; i++) {
                    var header = resultData[i].header;
                    var content = resultData[i].content;
                    for (var j = 0; j < content.length; j++) {
                        var account = (content[j].account > 0 ? '+'+content[j].account : content[j].account);
                        this._items.push(new listItemData(header, content[j].name,content[j].taskNumber, content[j].date, account));
                    }
                }

            }).fail((err) => {
                var options = {
                    title: "提示",
                    message: "接口请求出错，请查看日记信息",
                    okButtonText: "确认"
                };
                dialogsModule.confirm(options).then((result) => {
                });
            })
        };
        return viewModal;
    }()
);
exports.viewModal = viewModal;


var listItemData = (function (_super) {
    __extends(listItemData, _super);
    function listItemData(header, name,taskNumber, date, account) {
        var _this = _super.call(this) || this;
        _this.header = header;
        _this.name = name;
        _this.taskNumber = taskNumber;
        _this.date = date;
        _this.account = account;
        return _this;
    }

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

