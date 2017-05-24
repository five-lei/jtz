var frame = require("ui/frame");
var config = require("../../../shared/config");
var api = require('../../../shared/api');
var observable_1 = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var content = null;
var viewModelType = require("../../regLogin/views/typePopWindowMode");

var goodsCatalog = [];
var serviceType = [];
var basicService = [];

var ViewModel = (function (_super) {
    __extends(ViewModel, _super);

    function ViewModel(page) {
        var _this = _super.call(this) || this;
        _this._item = [];
        _this.initDataItems(page);
        return _this;
    }

    Object.defineProperty(ViewModel.prototype, "serviceList", {
        get: function () {
            console.log(this._item)
            return this._item;
        },
        set: function (value) {
            this.set(value);
        },
        enumerable: true,
        configurable: true
    });
    ViewModel.prototype.initDataItems = function (page) {
        qeuryLabel(this, page);
        // this._item.push(new DataItem("地板", "安", "配", "返", false), new DataItem("灯具", "安", "配", "返", false), new DataItem("集成吊顶", "安", "配", "返", false), new DataItem("门窗", "安", "配", "返", false), new DataItem("涂料", "安", "配", "返", false), new DataItem("卫浴", "安", "配", "返", false), new DataItem("民用家具", "安", "配", "返", false));
    };
    ViewModel.prototype.countServiceType = function () {
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

var DataItem = (function (_super) {
    __extends(DataItem, _super);

    function DataItem(serviceName, serviceSetup, serviceAssign, selectCondition) {
        var _this = _super.call(this) || this;
        _this.serviceName = serviceName;
        _this.serviceSetup = serviceSetup;
        _this.serviceAssign = serviceAssign;
        _this.serviceReturn = [];
        _this.selectCondition = selectCondition;
        return _this;
    }
    Object.defineProperty(DataItem.prototype, "serviceName", {
        get: function () {
            return this.get('_serviceName');
        },
        set: function (value) {
            this.set('_serviceName', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "serviceSetup", {
        get: function () {
            return this.get('_serviceSetup');
        },
        set: function (value) {
            this.set('_serviceSetup', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "serviceAssign", {
        get: function () {
            return this.get('_serviceAssign');
        },
        set: function (value) {
            this.set('_serviceAssign', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "selectedService", {
        get: function () {
            return this.get('selectedService');
        },
        set: function (value) {
            this.set('selectedService', value);
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
        this.set('selectCondition', true);
        var thisItem = this;
        var thisPage = args.object.page;
        if (thisPage.android) {
            thisPage.showModal('/views/regLogin/views/typePopWindow', {
                    dataItems: thisItem.selectedType
                },
                (selectedItem) => {
                    //查找当前商品，设置属性
                    if (selectedItem) {
                        thisItem.selectedType = selectedItem;
                    }
                }
            );
        } else {
            var topmost = frame.topmost();
            topmost.navigate("/views/regLogin/views/typeSelected");
        }
        console.log("itemIndex" + args.itemIndex)
    }

    DataItem.prototype.notSelected = function (args) {
        console.log('cancel check');
        var selectCondition = this.get('selectCondition');
        this.set('selectCondition', false);
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
            serviceType = ok.result.content;
            console.log("callbackBefore")
            // listBasicService(basicArr=>{callBack(that, page,basicArr);});
            callBack(that, page, serviceType);
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

function callBack(that, page, basicArr) {
    var incrementResp;
    console.log("callBack")
    basicService = [];
    outerList = [];
    api.call(config.apiUrl, {
        name: "userWorkerController.listBasicModifyService",
        args: []
    }).ok(data => {
        incrementResp = data.result;
        for (var i = 0; i < goodsCatalog.length; i++) {
            var flag = false;
            var selectedService = [];
            for (var j = 0; j < incrementResp.length; j++) {
                if (goodsCatalog[i].name == incrementResp[j].typeName.name) {
                    flag = true;
                    console.log(goodsCatalog[i].name + "*****************")
                    break;
                }
            }
         
            var thisItem = new DataItem(goodsCatalog[i].name, {}, {}, flag);
            //插入查出的服务类型
            var serviceTypes = [];
            for (var k = 0; k < basicArr.length; k++) {
                var thisItemServiceType = new viewModelType.DataItem(k, basicArr[k].label);
                thisItemServiceType.selected = false;
                thisItemServiceType._selected = false;
                if (flag == true) {
                    //如果当前货物被选中
                    //比较当前货物的服务
                    if (incrementResp[j].typeOfService) {
                        for (var l = 0; l < incrementResp[j].typeOfService.length; l++) {
                            if (basicArr[k].label == incrementResp[j].typeOfService[l].label) {
                                thisItemServiceType.selected = true;
                                thisItemServiceType._selected = true;
                                console.log(basicArr[k].label + ":true");
                            } else {

                            }
                        }
                    }else{
                        thisItem.selectCondition=false;
                    }
                }
                serviceTypes.push(thisItemServiceType);
            }



            thisItem.selectedType = serviceTypes;
            that._item.push(thisItem);

        }





        page.bindingContext = new observable_1.Observable({
            "serviceList": that._item
        })
    });


    console.log(that._item.length);

}

function listBasicService(success) {
    var requestParam = {
        name: "userWorkerController.listUserWorkerBasicService",
        args: []
    }
    api.call(config.apiUrl, requestParam).ok(
        data => {
            success(data);
        }
    ).fail(
        data => {
            console.log(data)
        }
    );
}