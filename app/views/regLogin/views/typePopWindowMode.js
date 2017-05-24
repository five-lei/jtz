"use strict";
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
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
//点击变样式
    ViewModel.prototype.itemSelected = function (args) {
        console.log("selected"+ args.itemIndex)
        var car_type = this.dataItems.getItem(args.itemIndex).type;
        console.log("car_type"+car_type);
        for (var i = 0; i < this.dataItems.length; i++) {
            if(this.dataItems.getItem(i)==this.dataItems.getItem(args.itemIndex)){
                this.dataItems.getItem(i).selected=!this.dataItems.getItem(i).selected;
            }
            //     else{ 
            //     this.dataItems.getItem(i).selected=false;
            // }
        }

    };
    ViewModel.prototype.itemDeselected = function (args) {
         console.log("deselected"+args.itemIndex)
        var item = this.dataItems.getItem(args.itemIndex);
        console.log("car_type"+item.type);
        item.selected = !item.selected;
    };
//点击还原样式
    ViewModel.prototype.initDataItems = function () {
        this._items = new observable_array_1.ObservableArray();
            this._items.push(new DataItem(0, "安装"));
            this._items.push(new DataItem(1, "配送"));
            // this._items.push(new DataItem(2, "返货"));
    };
    return ViewModel;
}());

exports.ViewModel = ViewModel;
var DataItem = (function (_super) {
    __extends(DataItem, _super);
    function DataItem(id, type) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.type = type;
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
    Object.defineProperty(DataItem.prototype, "type", {
        get: function () {
            return this.get('_type');
        },
        set: function (value) {
            this.set('_type', value);
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