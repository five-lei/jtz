/**
 * Created by giscafer on 2017/4/15.
 * @Discription tab页对象类
 */

var observable = require("data/observable");
var app = require("application");

var TaskTypeItem = (function (_super) {
    __extends(TaskTypeItem, _super);
    function TaskTypeItem(selected, tabName, xmlFileName,tabIndex) {
        var _this = _super.call(this) || this;
        _this.isSelected = selected;
        _this.tabName = tabName;
        _this.xmlFileName = xmlFileName;
        _this.tabIndex = tabIndex;
        return _this;
    }
    /*往对象添加属性*/
    Object.defineProperty(TaskTypeItem.prototype, "isSelected", {
        get: function () {
            return this.get("selected");
        },
        set: function (value) {
            this.set("selected", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskTypeItem.prototype, "tabName", {
        get: function () {
            return this.get("name");
        },
        set: function (value) {
            this.set("name", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskTypeItem.prototype, "selectedTabName", {
        get: function () {
            var suffix = app.ios ? "s" : "";
            return this.get("name") + suffix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskTypeItem.prototype, "xmlFileName", {
        get: function () {
            return this.get("exXml");
        },
        set: function (value) {
            this.set("exXml", value);
        },
        enumerable: true,
        configurable: true
    });
    return TaskTypeItem;
}(observable.Observable));
module.exports= TaskTypeItem;
