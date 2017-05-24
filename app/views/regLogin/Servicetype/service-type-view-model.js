/**
 * Created by Administrator on 2017/4/15.
 */

var frame = require("ui/frame");
var config = require("../../../shared/config");
var api = require('../../../shared/api');
var observable_1 = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var content = null;
var confrimBTN = require('./Service_type1');
var goodsCatalog = [];
var serviceType = [];
//用来存储基础服务
var basicService = [];
var userWokerBasicService = require('../Servicetype/Service_type1');
var ViewModel = (function(_super) {
    __extends(ViewModel, _super);

    function ViewModel(page) {
        var _this = _super.call(this) || this;
        _this._item = [];
        _this.initDataItems(page);
        return _this;
    }

    Object.defineProperty(ViewModel.prototype, "serviceList", {
        get: function() {
            console.log(this._item)
            return this._item;
        },
        set: function(value) {
            this.set(value);
        },
        enumerable: true,
        configurable: true
    });
    ViewModel.prototype.initDataItems = function(page) {
        // var dataList=[];
        qeuryLabel(this, page);
    };
    ViewModel.prototype.countServiceType = function() {
        var selectedService = [];
        for (var i = 0; i < basicService.length; i++) {
            if (basicService[i]['selected'] == true) {
                selectedService.push(basicService[i]);
            }
        }
        return this._item;
    }

    return ViewModel;
}(observable_1.Observable));
exports.ViewModel = ViewModel;

var DataItem = (function(_super) {
    __extends(DataItem, _super);

    function DataItem(serviceName, serviceSetup, serviceAssign, selectCondition,setupCondition,assignCondition) {
        var _this = _super.call(this) || this;
        _this.serviceName = serviceName;
        _this.serviceSetup = serviceSetup;
        _this.serviceAssign = serviceAssign;
        _this.selectedService = [];
        _this.selectCondition = selectCondition;
        _this.setupCondition = setupCondition;
        _this.assignCondition = assignCondition;
        return _this;
    }

    Object.defineProperty(DataItem.prototype, "serviceName", {
        get: function() {
            return this.get('_serviceName');
        },
        set: function(value) {
            this.set('_serviceName', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "serviceSetup", {
        get: function() {
            return this.get('_serviceSetup');
        },
        set: function(value) {
            this.set('_serviceSetup', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "serviceAssign", {
        get: function() {
            return this.get('_serviceAssign');
        },
        set: function(value) {
            this.set('_serviceAssign', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "selectedService", {
        get: function() {
            return this.get('_selectedService');
        },
        set: function(value) {
            this.set('_selectedService', value);
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
    Object.defineProperty(DataItem.prototype, "setupCondition", {
        get: function() {
            return this.get('_setupCondition');
        },
        set: function(value) {
            this.set('_setupCondition', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "assignCondition", {
        get: function() {
            return this.get('_assignCondition');
        },
        set: function(value) {
            this.set('_assignCondition', value);
        },
        enumerable: true,
        configurable: true
    });
    DataItem.prototype.onSelected = function(args) {
        var selectCondition = this.get('selectCondition');
        // this.set('selectCondition', true);
        var thisItem = this;
        var thisPage = args.object.page;
        if (thisPage.android) {
            thisPage.showModal('/views/regLogin/views/typePopWindow', {
                    dataItems: thisItem.selectedService,
                        // dataItems: thisItem.selectedService
                    nowChecked: confrimBTN.userWokerBasicServiceInfo().contentPush
                },
                (selectedItem) => {
                    //查找当前商品，设置属性
                    if (selectedItem) {
                        this.set('selectCondition', false);
                        thisItem.selectedService = selectedItem;
                        this.set('setupCondition',selectedItem[0].selected);
                        this.set('assignCondition',selectedItem[1].selected);
                        for(var i=0;i<selectedItem.length;i++){
                            if(selectedItem[i].selected){
                                this.set('selectCondition', true);
                                confrimBTN.userWokerBasicServiceInfo().contentPush.push(thisItem);
                            }
                        }
                    }
                }
            );
        } else {
            var topmost = frame.topmost();
            topmost.navigate("/views/regLogin/views/typeSelected");
        }
        console.log("itemIndex" + args.itemIndex)
    }

    DataItem.prototype.onclear = function(args) {
        var index = args.itemIndex;
        userWokerBasicService.userWokerBasicServiceInfo().satisfyInfo.satisfy = false;
        var selectCondition = this.get('selectCondition');
        this.set('selectCondition', false);
        this.set('setupCondition',false);
        this.set('assignCondition',false);
        this.selectedType = undefined;
    }

    return DataItem;
}(observable_1.Observable));
exports.DataItem = DataItem;

function listMeta(requestParam, ok) {

    api.call(config.apiUrl, requestParam).ok(
        json => {
            ok(json);
        }
    ).fail(json => {
        fail(json);
        console.log("failed")
        console.dump(json.result)
    })
}

function qeuryLabel(that, page) {

    api.call(config.apiUrl, {
        name: "userWorkerController.queryGoodsCataLogLevel2",
        args: []
    }).ok(ok => {
        console.log("success2")
            // console.dump(ok.result)
        goodsCatalog = ok.result;

        api.call(config.apiUrl, {
            name: "commonController.findMeta",
            args: [{
                "page": 0,
                "rows": 10
            }, {
                "type": "masterService"
            }]
        }).ok(ok => {
            console.log("success")
                // console.dump(ok.result.content)
            serviceType = ok.result.content;
            console.log("callbackBefore")
            callBack(that, page);
        }).fail(fail => {
            console.log("failed")
            console.dump(fail)
        });

    }).fail(fail => {
        console.log("failed2")
        console.dump(fail)
    });
}
var serviceList = [];
var outerList = [];

function callBack(that, page) {
    console.log("callBack")
    basicService = [];
    outerList = [];
    for (var i = 0; i < goodsCatalog.length; i++) {
        var innerList = [];
        //    console.log(goodsCatalog[i].name);
        innerList.push(goodsCatalog[i].name);
        basicService.push({
            serviceName: goodsCatalog[i].name,
            selected: false,
            types: []
        })
        for (var j = 0; j < serviceType.length; j++) {
            innerList.push(serviceType[j].label);
            basicService[i].types.push({
                type: serviceType[j].label,
                selected: false
            })
        }
        outerList.push(innerList);
    }
    console.log(outerList);
    for (var i = 0; i < outerList.length; i++) {
        that._item.push(new DataItem(outerList[i][0], outerList[i][1], outerList[i][2], false))
    }
    page.bindingContext = new observable_1.Observable({
        "serviceList": that._item
    })
    console.log(that._item.length)
}