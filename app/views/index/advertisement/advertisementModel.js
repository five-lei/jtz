/**
 * Created by Administrator on 2017/4/13.
 */
"use strict";
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
// >> listview-howto-item-selection-page-model
var ViewModel = (function () {
    function ViewModel() {
    }
    Object.defineProperty(ViewModel.prototype, "dataItems", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
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
    return DataItem;
}(observable_1.Observable));

exports.DataItem = DataItem;