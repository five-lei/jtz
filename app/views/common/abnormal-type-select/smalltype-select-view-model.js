/**
 * Created by Administrator on 2017/5/4.
 */
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var api = require('../../../shared/api');
var config = require("../../../shared/config");
var color = require("color");

var ViewModel = (function () {
    function ViewModel() {
        this.initDataItems();
    }

    Object.defineProperty(ViewModel.prototype, "smallTypeList", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModel.prototype, "citySelectArray", {
        get: function () {
            return this._citySelectArray;
        },
        enumerable: true,
        configurable: true
    });
    // >> listview-howto-item-selection-events
    ViewModel.prototype.itemSelected = function (args) {
        config.cityflag = true;//判断是否点击市的标识，点击了区选中的条目得清空。
        config.districtArray = null;
        var item = this.smallTypeList.getItem(args.itemIndex);
        config.cityArray = item.city;
        config.cityId = item.id;
        for (var i = 0; i < this.smallTypeList.length; i++) {
            if (this.smallTypeList.getItem(i) == item) {
                this.smallTypeList.getItem(i).selected = true;
            } else {
                this.smallTypeList.getItem(i).selected = false;
            }
        }

    };
    // << listview-howto-item-selection-events
    ViewModel.prototype.initDataItems = function () {
        this._items = new observable_array_1.ObservableArray();
        var codes = config.provinceId;
        api.call(config.apiUrl, {
            name: "abnormalTypeController.abnormalTypeFind",
            args: [{ first: 0, rows: 9999 }, {  "parentId": codes }]
        }).ok(json => {
                var data=json.result.content || [];
                data.forEach(each => {
                    this._items.push(new DataItem(each.id, each.name));
                });

            }
        ).fail(function(err){
            console.log(JSON.stringify(err));
        });

    };
    return ViewModel;
}());
exports.ViewModel = ViewModel;

var DataItem = (function (_super) {
    __extends(DataItem, _super);
    function DataItem(id, city) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.city = city;
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
    Object.defineProperty(DataItem.prototype, "city", {
        get: function () {
            return this.get('_city');
        },
        set: function (value) {
            this.set('_city', value);
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
