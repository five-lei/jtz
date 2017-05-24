"use strict";
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var config = require("../shared/config");
// >> listview-howto-item-selection-page-model
var ViewModel = (function () {
    function ViewModel() {
        this.initDataItems();
    }
    Object.defineProperty(ViewModel.prototype, "dataItems", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    // >> listview-howto-item-selection-events
    ViewModel.prototype.itemSelected = function (args) {
        var page = args.object.page;
        var car_length = this.dataItems.getItem(args.itemIndex).length;
        var car_space = this.dataItems.getItem(args.itemIndex).space;
        console.log(car_length+car_space);
        for (var i = 0; i < this.dataItems.length; i++) {
            if(this.dataItems.getItem(i)==this.dataItems.getItem(args.itemIndex)){
                this.dataItems.getItem(i).selected=true;
            }else{
                this.dataItems.getItem(i).selected=false;
            }
        }

        config.two = car_length;
        // item.selected = true;
    };
    ViewModel.prototype.itemDeselected = function (args) {
        var item = this.dataItems.getItem(args.itemIndex);
        item.selected = false;
    };
    // << listview-howto-item-selection-events
    ViewModel.prototype.initDataItems = function () {
        this._items = new observable_array_1.ObservableArray();
        for (var i = 0; i < 14; i++) {
            this._items.push(new DataItem(i, (i+1.5)+"米", (i+0.8)+"方"));
        }
    };
    return ViewModel;
}());
exports.ViewModel = ViewModel;
// << listview-howto-item-selection-page-model
// >> listview-howto-item-selection-model
var DataItem = (function (_super) {
    __extends(DataItem, _super);
    function DataItem(id, length, space) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.length = length;
        _this.space = space;
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
    Object.defineProperty(DataItem.prototype, "length", {
        get: function () {
            return this.get('_length');
        },
        set: function (value) {
            this.set('_length', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "space", {
        get: function () {
            return this.get('_space');
        },
        set: function (value) {
            this.set('_space', value);
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