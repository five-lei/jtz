var config = require("../../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var observable_array_1 = require("data/observable-array");
var api=require('../../../shared/api');
var config = require("../../../shared/config");
var observable_1 = require("data/observable");
var visibility = require("ui/enums");
// var selectarray = new observable_array_1.ObservableArray();

var citys;


var ViewModel = (function () {
    function ViewModel() {
        this.initDataItems();
    }

    Object.defineProperty(ViewModel.prototype, "districtList", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    // >> listview-howto-item-selection-events
    ViewModel.prototype.itemSelected = function (args) {
        var page = args.object.page;
        var item = this.districtList.getItem(args.itemIndex);
        config.districtArray = item.district;
        config.districtId = item.id;

        for (var i = 0; i < this.districtList.length; i++) {
            if (this.districtList.getItem(i) == item) {
                this.districtList.getItem(i).selected = true;
            } else {
                this.districtList.getItem(i).selected = false;
            }
        }

    };
    // << listview-howto-item-selection-events
    ViewModel.prototype.initDataItems = function () {
        this._items = new observable_array_1.ObservableArray();
        var codes=config.cityId;
        api.call(config.apiUrl,{
            name:"commonController.findAreasByParents",
            args:[{code:codes}]
        }).ok(
            data=>{
                console.log(data);
                data.result.forEach(each=>{
                    this._items.push(new DataItem(each.code, each.name));
                });

            }
        ).fail(data=>{
            console.log(data)
        });

    };
    return ViewModel;
}());
exports.ViewModel = ViewModel;

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

var DataItem = (function (_super) {
    __extends(DataItem, _super);
    function DataItem(id, district) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.district = district;
        _this.selected = false;
        return _this;
    }

    Object.defineProperty(DataItem.prototype, "selected", {
        get: function () {
            return this.get('_selected');
        },
        set: function (value) {
            this.set('_selected', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "district", {
        get: function () {
            return this.get('_district');
        },
        set: function (value) {
            this.set('_district', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "id", {
        get: function () {
            return this.get('_id');
        },
        set: function (value) {
            this.set('_id', value);
        },
        enumerable: true,
        configurable: true
    });
    return DataItem;
}(observable_1.Observable));
exports.DataItem = DataItem;
