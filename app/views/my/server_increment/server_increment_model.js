var frame = require("ui/frame");
var config = require("../../../shared/config");
var api = require('../../../shared/api');
var observable_1 = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var content = null;
var goodsCatalog = [];
var serviceType = [];
var ifReturn = false;
// var fetchModule = require("fetch");
// var observable_array_1 = require("data/observable-array");
// var visibility  = require("ui/enums");
// var socialShare = require("nativescript-social-share");
// var ObservableArray = require("data/observable-array").ObservableArray;
// var apiCollect=require('../../../view-models/api.collect');


var ViewModel = (function (_super) {
    __extends(ViewModel, _super);

    function ViewModel(globePage, lastObj) {
        var _this = _super.call(this) || this;
        _this._item = [];
        _this.initDataItems(globePage, lastObj);
        return _this;
    }
    Object.defineProperty(ViewModel.prototype, "serviceList", {
        get: function () {
            return this._item;
        },
        set: function (value) {
            this.set(value);
        },
        enumerable: true,
        configurable: true
    });
    ViewModel.prototype.initDataItems = function (globePage, lastObj) {
        var that = this;
        var incrementResp;
        api.call(config.apiUrl, {
            name: "commonController.findMeta",
            args: [{
                "page": 0,
                "rows": 10
            }, {
                "type": "masterRepair"
            }]
        }).ok(ok => {
            console.log("success")
            // console.dump(ok.result.content)
            serviceType = ok.result.content;
            console.log("callbackBefore")
            // api.call(config.apiUrl, {
            //     name: "userWorkerController.listIncrementModifyService",
            //     args: []
            // }).ok(data => {
            // incrementResp = data.result;
            incrementResp = lastObj;
            ifReturn = false;
            if (typeof (incrementResp[0]) != "undefined" && incrementResp[0].maintainService) {
                ifReturn = true;
            }
            var maintainTypes = globePage.getViewById("maintainTypes");
            saveMaintain = new MaintainViewModel(globePage, ifReturn);
            maintainTypes.bindingContext = saveMaintain;

            for (var i = 0; i < serviceType.length; i++) {
                var ifServiceSelected = false;
                for (var j = 0; j < incrementResp.length; j++) {
                    if (serviceType[i].label == incrementResp[j].repairService.label) {
                        ifServiceSelected = true;
                    }
                }
                that._item.push(new DataItem(serviceType[i].label, ifServiceSelected));
            }
            globePage.bindingContext = {
                serviceList: that._item
            }



            // }).fail(fail => {

            // });


            // that._item.push(new DataItem("版式", false), new DataItem("皮革", false), new DataItem("大理石", false), new DataItem("玻璃", false));
        }).fail(fail => {
            console.log("failed")
            console.dump(fail)
        });
    };

    ViewModel.prototype.countServiceType = function () {
        var selectedService = [];
        for (var i = 0; i < this._item.length; i++) {
            if (this._item[i]['_selectCondition'] == true) {
                selectedService.push(this._item[i]);
            }
        }
        return selectedService;
    }

    ViewModel.prototype.getIfReturn = function () {
        return ifReturn;
    }
    return ViewModel;
}(observable_1.Observable));
exports.ViewModel = ViewModel;

var DataItem = (function (_super) {
    __extends(DataItem, _super);

    function DataItem(serviceType, selectCondition) {
        var _this = _super.call(this) || this;
        _this.serviceType = serviceType;
        _this.selectCondition = selectCondition;
        return _this;
    }
    Object.defineProperty(DataItem.prototype, "serviceType", {
        get: function () {
            return this.get('_serviceType');
        },
        set: function (value) {
            this.set('_serviceType', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "selectCondition", {
        get: function () {
            return this.get('_selectCondition');
        },
        set: function (value) {
            this.set('_selectCondition', value);
        },
        enumerable: true,
        configurable: true
    });
    DataItem.prototype.onSelected = function (args) {
        var selectCondition = this.get('selectCondition');
        this.set('selectCondition', !selectCondition);
    };
    return DataItem;
}(observable_1.Observable));
exports.DataItem = DataItem;

// 养护类型
var MaintainViewModel = (function (_super) {
    __extends(MaintainViewModel, _super);

    function MaintainViewModel(globePage, ifReturn) {
        var _this = _super.call(this) || this;
        _this._item = [];
        _this.initDataItems(globePage, ifReturn);
        return _this;
    }
    Object.defineProperty(MaintainViewModel.prototype, "maintainList", {
        get: function () {
            return this._item;
        },
        set: function (value) {
            this.set(value);
        },
        enumerable: true,
        configurable: true
    });
    MaintainViewModel.prototype.initDataItems = function (globePage, ifReturn) {
        var that = this;
        // api.call(config.apiUrl, {
        //     name: "commonController.findMeta",
        //     args: [{ "page": 0, "rows": 10 }, { "type": "masterRepair" }]
        // }).ok(ok => {
        //     console.log("success")
        //         // console.dump(ok.result.content)
        //     serviceType = ok.result.content;
        //     console.log("callbackBefore")
        //     for (var i = 0; i < serviceType.length; i++) {
        //         that._item.push(new DataItem(serviceType[i].label, false));
        //     }
        //     globePage.bindingContext = { serviceList: that._item }
        that._item.push(new DataItems("返货", ifReturn));
        // }).fail(fail => {
        //     console.log("failed")
        //     console.dump(fail)
        // });
    };

    MaintainViewModel.prototype.countServiceType = function () {
        var selectedService = [];
        for (var i = 0; i < this._item.length; i++) {
            if (this._item[i]['_selectCondition'] == true) {
                selectedService.push(this._item[i]);
            }
        }
        return selectedService;
    }
    return MaintainViewModel;
}(observable_1.Observable));
exports.MaintainViewModel = MaintainViewModel;

var DataItems = (function (_super) {
    __extends(DataItems, _super);

    function DataItems(serviceType, selectCondition) {
        var _this = _super.call(this) || this;
        _this.serviceType = serviceType;
        _this.selectCondition = selectCondition;
        return _this;
    }
    Object.defineProperty(DataItems.prototype, "serviceType", {
        get: function () {
            return this.get('_serviceType');
        },
        set: function (value) {
            this.set('_serviceType', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItems.prototype, "selectCondition", {
        get: function () {
            return this.get('_selectCondition');
        },
        set: function (value) {
            this.set('_selectCondition', value);
        },
        enumerable: true,
        configurable: true
    });
    DataItems.prototype.onSelected = function () {
        var selectCondition = this.get('selectCondition');
        this.set('selectCondition', !selectCondition);
    };
    return DataItems;
}(observable_1.Observable));
exports.DataItems = DataItems;