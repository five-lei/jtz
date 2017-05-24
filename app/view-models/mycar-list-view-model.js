"use strict";
var frame = require("ui/frame");
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var config = require("../shared/config");
// >> listview-howto-item-selection-page-model
var ViewModel = (function () {
    function ViewModel() {
        this.initDataItems();
    }
    Object.defineProperty(ViewModel.prototype, "carList", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    // >> listview-howto-item-selection-events
    ViewModel.prototype.itemSelected = function (args) {
        var page = args.object.page;
        var car_id = this.carList.getItem(args.itemIndex).car_id;
        var car_type = this.carList.getItem(args.itemIndex).car_type;
        var car_number = this.carList.getItem(args.itemIndex).car_number;
        var car_length = this.carList.getItem(args.itemIndex).car_length;
        var car_capacity = this.carList.getItem(args.itemIndex).car_capacity;
        var car_name = this.carList.getItem(args.itemIndex).car_name;
        var car_set = this.carList.getItem(args.itemIndex).car_set;
        console.log(car_id+car_number);

        var navigationEntry = {
            moduleName: '/views/my/car_detail/car_detail',
            context: {
                       "car_id": car_id, 
                       "car_type": car_type,
                       "car_number": car_number,
                       "car_length": car_length,
                       "car_capacity": car_capacity,
                       "car_name": car_name,
                       "car_set": car_set,
                    },
        }
        frame.topmost().navigate(navigationEntry)
        
    };
    // << listview-howto-item-selection-events
    ViewModel.prototype.initDataItems = function () {
        this._items = new observable_array_1.ObservableArray();
        for (var i = 0; i < 3; i++) {
            // this._items.push(new DataItem(i, "粤", "A"+(i+111111),(i+5.1)+"米",(i+25)+"T","金杯面包车",true));
        }
        this._items.push(
                        new DataItem(0, "粤", "A888888","5.1米","25T","金杯面包车",true),
                        new DataItem(1, "湘", "S888888","5.2米","28T","奔驰面包车",false),
                        new DataItem(0, "赣", "G888888","5.3米","29T","宝马面包车",false)
                        );
    };
    return ViewModel;
}());
exports.ViewModel = ViewModel;
// << listview-howto-item-selection-page-model
// >> listview-howto-item-selection-model
var DataItem = (function (_super) {
    __extends(DataItem, _super);
    function DataItem(car_id, car_type, car_number,car_length,car_capacity,car_name,car_set) {
        var _this = _super.call(this) || this;
        _this.car_id = car_id;
        _this.car_type = car_type;
        _this.car_number = car_number;
        _this.car_length = car_length;
        _this.car_capacity = car_capacity;
        _this.car_name = car_name;
        _this.car_set = car_set;
        return _this;
    }
    Object.defineProperty(DataItem.prototype, "car_type", {
        get: function () {
            return this.get('_car_type');
        },
        set: function (value) {
            this.set('_car_type', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "car_number", {
        get: function () {
            return this.get('_car_number');
        },
        set: function (value) {
            this.set('_car_number', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "car_length", {
        get: function () {
            return this.get('_car_length');
        },
        set: function (value) {
            this.set('_car_length', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "car_capacity", {
        get: function () {
            return this.get('_car_capacity');
        },
        set: function (value) {
            this.set('_car_capacity', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "car_name", {
        get: function () {
            return this.get('_car_name');
        },
        set: function (value) {
            this.set('_car_name', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "car_set", {
        get: function () {
            return this.get('_car_set');
        },
        set: function (value) {
            this.set('_car_set', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "car_id", {
        get: function () {
            return this.get('_car_id');
        },
        set: function (value) {
            this.set('_car_id', value);
        },
        enumerable: true,
        configurable: true
    });
    return DataItem;
}(observable_1.Observable));
exports.DataItem = DataItem;