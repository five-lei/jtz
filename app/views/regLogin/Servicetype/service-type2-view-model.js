/**
 * Created by Administrator on 2017/4/15.
 */

var frame = require("ui/frame");
var config = require("../../../shared/config");
var api = require('../../../shared/api');
var observable_1 = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var content = null;

var frame = require("ui/frame");
var config = require("../../../shared/config");
var api = require('../../../shared/api');
var observable_1 = require("data/observable");

var goodsCatalog = [];
var serviceType = [];
// var fetchModule = require("fetch");
// var observable_array_1 = require("data/observable-array");
// var visibility  = require("ui/enums");
// var socialShare = require("nativescript-social-share");
// var ObservableArray = require("data/observable-array").ObservableArray;
// var apiCollect=require('../../../view-models/api.collect');


var ViewModel = (function(_super) {
    __extends(ViewModel, _super);

    function ViewModel(globePage) {
        var _this = _super.call(this) || this;
        _this._item = [];
        _this.initDataItems(globePage);
        return _this;
    }
    Object.defineProperty(ViewModel.prototype, "serviceList", {
        get: function() {
            return this._item;
        },
        set: function(value) {
            this.set(value);
        },
        enumerable: true,
        configurable: true
    });
    ViewModel.prototype.initDataItems = function (globePage) {
        var that=this;
        api.call(config.apiUrl, {
            name: "commonController.findMeta",
            args: [{ "page": 0, "rows": 10 }, { "type": "masterRepair" }]
        }).ok(ok => {
            console.log("success")
        // console.dump(ok.result.content)
        serviceType = ok.result.content;
        console.log("callbackBefore")
        for (var i = 0; i < serviceType.length; i++) {
            that._item.push(new DataItem(serviceType[i].label, false));
        }
        globePage.bindingContext = { serviceList: that._item }
        // that._item.push(new DataItem("版式",false),new DataItem("皮革",false),new DataItem("大理石",false),new DataItem("玻璃",false));
    }).fail(fail => {
            console.log("failed")
            console.dump(fail)
        });
    };

    ViewModel.prototype.countServiceType = function() {
        var selectedService = [];
        for (var i = 0; i < this._item.length; i++) {
            if (this._item[i]['_selectCondition'] == true) {
                selectedService.push(this._item[i]);
            }
        }
        return selectedService;
    }

    var isSelectedReturn=false;
    ViewModel.prototype.onReturnSelected= function() {
        isSelectedReturn=!isSelectedReturn;
    };

    ViewModel.prototype.getReuturnSelected= function() {
        var returnService="";
        if(isSelectedReturn==true){
            returnService="返货";
        }
        return returnService;
    };

    return ViewModel;
}(observable_1.Observable));
exports.ViewModel = ViewModel;

var DataItem = (function(_super) {
    __extends(DataItem, _super);

    function DataItem(serviceType, selectCondition) {
        var _this = _super.call(this) || this;
        _this.serviceType = serviceType;
        _this.selectCondition = selectCondition;
        return _this;
    }
    Object.defineProperty(DataItem.prototype, "serviceType", {
        get: function() {
            return this.get('_serviceType');
        },
        set: function(value) {
            this.set('_serviceType', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "selectCondition", {
        get: function() {
            return this.get('_selectCondition');
        },
        set: function(value) {
            this.set('_selectCondition', value);
        },
        enumerable: true,
        configurable: true
    });
    DataItem.prototype.onSelected = function() {
        var selectCondition = this.get('selectCondition');
        this.set('selectCondition', !selectCondition);
    };
    

    return DataItem;
}(observable_1.Observable));
exports.DataItem = DataItem;