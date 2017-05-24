'use strict'

var observable = require("data/observable");
var builder = require("ui/builder");
var app = require("application");
var utils = require("utils/utils");
var fileSystem = require("file-system");

var TaskDataModel = (function () {
    function TaskDataModel(useCache) {
        this._useCache = useCache;
        this._views = {};
        this._taskTypeImages = {};

    }

    /**
     *
     * @param type 类型
     * @returns {*}
     */
    function getTaskList() {
        var taskTypeImages = {
            "waiting_list": "res://xin2x",
            "waiting_sign_for": "res://qian2x",
            "waiting_pickup": "res://tihuo2x",
            "waiting_appointment": "res://yu2x",
            "had_sign_for": "res://yiancheng",
            "cancelled": "res://xin_qu"
        };
        var args = Array.prototype.slice.call(arguments);
        var type = args[0] ? args[0] : 'all';
        console.log("~~~~~~~~~~~~~~~~"+type);
        var imgObj = taskTypeImages;
        var taskList = [
            {
                "status": "waiting_list",
                "statusImage": imgObj["waiting_list"],
                "orderNumber": "1ZT324835",
                "price": "500.00",
                "company": "一智通供应链管理有限公司",
                "datetime": "2017/03/10 13:39",
                "address": "广州市白云区新市路口",
                "receivePersonName": "胡歌",
                "receivePersonPhone": "15626270808",
                "pickupAddress": "广州市白云区新市路口",//提货地址
                "pickupPhone": "15626270808",
                "pickupNumber": "775566",//提货码
                "packCount": "2",
                "packVolume": "3",
                "floor": "6 无电梯",
                "appointmentTime": '54',
                "dealTime": "10"
            },  {
                "status": "waiting_list",
                "statusImage": imgObj["waiting_list"],
                "orderNumber": "1ZT324835",
                "price": "500.00",
                "company": "一智通供应链管理有限公司",
                "datetime": "2017/03/10 13:39",
                "address": "广州市白云区新市路口",
                "receivePersonName": "胡歌",
                "receivePersonPhone": "15626270808",
                "pickupAddress": "广州市白云区新市路口",//提货地址
                "pickupPhone": "15626270808",
                "pickupNumber": "775566",//提货码
                "packCount": "2",
                "packVolume": "3",
                "floor": "6 无电梯",
                "appointmentTime": '54',
                "dealTime": "10"
            },
            {
                "status": "waiting_pickup",
                "statusImage": imgObj["waiting_pickup"],
                "orderNumber": "1ZT324835",
                "price": "400.00",
                "company": "一智通供应链管理有限公司",
                "datetime": "2017/03/10 13:39",
                "address": "广州市白云区新市路口",
                "receivePersonName": "胡歌",
                "receivePersonPhone": "15626270808",
                "pickupAddress": "广州市白云区新市路口",//提货地址
                "pickupPhone": "15626270808",
                "pickupNumber": "775566",//提货码
                "packCount": "2",
                "packVolume": "3",
                "floor": "6 无电梯",
                "appointmentTime": '54',
                "dealTime": "10"
            },
            {
                "status": "waiting_sign_for",
                "statusImage": imgObj["waiting_sign_for"],
                "orderNumber": "1ZT324835",
                "price": "300.00",
                "company": "一智通供应链管理有限公司",
                "datetime": "2017/03/10 13:39",
                "address": "广州市白云区新市路口",
                "receivePersonName": "胡歌",
                "receivePersonPhone": "15626270808",
                "pickupAddress": "广州市白云区新市路口",//提货地址
                "pickupPhone": "15626270808",
                "pickupNumber": "775566",//提货码
                "packCount": "2",
                "packVolume": "3",
                "floor": "6 无电梯",
                "appointmentTime": '54',
                "dealTime": "10"
            },
            {
                "status": "waiting_appointment",
                "statusImage": imgObj["waiting_appointment"],
                "orderNumber": "1ZT324835",
                "price": "300.00",
                "company": "一智通供应链管理有限公司",
                "datetime": "2017/03/10 13:39",
                "address": "广州市白云区新市路口",
                "receivePersonName": "胡歌",
                "receivePersonPhone": "15626270808",
                "pickupAddress": "广州市白云区新市路口",//提货地址
                "pickupPhone": "15626270808",
                "pickupNumber": "775566",//提货码
                "packCount": "2",
                "packVolume": "3",
                "floor": "6 无电梯",
                "appointmentTime": '54',
                "dealTime": "10"
            },
            {
                "status": "had_sign_for",
                "statusImage": imgObj["had_sign_for"],
                "orderNumber": "1ZT324835",
                "price": "300.00",
                "company": "一智通供应链管理有限公司",
                "datetime": "2017/03/10 13:39",
                "address": "广州市白云区新市路口",
                "receivePersonName": "胡歌",
                "receivePersonPhone": "15626270808",
                "pickupAddress": "广州市白云区新市路口",//提货地址
                "pickupPhone": "15626270808",
                "pickupNumber": "775566",//提货码
                "packCount": "2",
                "packVolume": "3",
                "floor": "6 无电梯",
                "appointmentTime": '54',
                "dealTime": "10"
            },
            {
                "status": "cancelled",
                "statusImage": imgObj["cancelled"],
                "orderNumber": "1ZT324835",
                "price": "300.00",
                "company": "一智通供应链管理有限公司",
                "datetime": "2017/03/10 13:39",
                "address": "广州市白云区新市路口",
                "receivePersonName": "胡歌",
                "receivePersonPhone": "15626270808",
                "pickupAddress": "广州市白云区新市路口",//提货地址
                "pickupPhone": "15626270808",
                "pickupNumber": "775566",//提货码
                "packCount": "2",
                "packVolume": "3",
                "floor": "6 无电梯",
                "appointmentTime": '54',
                "dealTime": "10"
            }
        ];
        if (type === 'all') {
            return taskList;
        }
        var result = taskList.filter((item) => {
            return item.status === type;
        })
        return result;

    }

    TaskDataModel.prototype.clearCache = function () {
        for (var i = 0; i < this._views.length; i++) {
            delete this._views[i];
        }
        this._views = {};
    };
    TaskDataModel.prototype.loadGalleryFragment = function (item, pathToModuleXML, xmlFileName) {
        if (this.selectedItem) {
            this.selectedItem.isSelected = false;
        }
        item.isSelected = true;
        this.selectedItem = item;

    };

    TaskDataModel.prototype.getPictureResourcePath = function (groupName, exampleName) {
        if (app.ios) {
            return "res://chart/" + groupName + "/" + exampleName;
        }
        var resourcePath = "res://" + exampleName;
        return resourcePath;
    };

    Object.defineProperty(TaskDataModel.prototype, "barTypes", {
        get: function () {
            if (this._barTypes) {
                return this._barTypes;
            }
            return this._barTypes = [
                new TaskTypeItem(true, "待接单", "waiting-list"),
                new TaskTypeItem(false, "待预约", "waiting-appointment"),
                new TaskTypeItem(false, "待提货", "waiting-pickup"),
                new TaskTypeItem(false, "待签收", "waiting-sign-for"),
                new TaskTypeItem(false, "已签收", "had-sign-for"),
                new TaskTypeItem(false, "已取消", "cancelled"),
                new TaskTypeItem(false, "全部", "all-list")
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskDataModel.prototype, "imageTypes", {
        get: function () {

            if (this._taskTypeImages) {
                return this._taskTypeImages;
            }
            return this._taskTypeImages = {
                "waiting_list": "res://xin2x",
                "waiting_sign_for": "res://qian2x",
                "waiting_pickup": "res://tihuo2x",
                "waiting_appointment": "res://yu2x",
                "had_sign_for": "res://yiancheng",
                "cancelled": "res://xin_qu"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskDataModel.prototype, "allTasks", {
        get: function () {
            var test = getTaskList();
            return test;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskDataModel.prototype, "waiting_list", {
        get: function () {
            return getTaskList('waiting_list') || [];
            // var test = getTaskList();
            // return test;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskDataModel.prototype, "waiting_sign_for", {
        get: function () {
            return getTaskList('waiting_sign_for') || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskDataModel.prototype, "waiting_pickup", {
        get: function () {
            return getTaskList('waiting_pickup') || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskDataModel.prototype, "waiting_appointment", {
        get: function () {
            return getTaskList('waiting_appointment') || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskDataModel.prototype, "had_sign_for", {
        get: function () {
            return getTaskList('had_sign_for') || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskDataModel.prototype, "cancelled", {
        get: function () {
            return getTaskList('cancelled') || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskDataModel.prototype, "orderNumber", {
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskDataModel.prototype, "address", {
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskDataModel.prototype, "datetime", {
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskDataModel.prototype, "statusImage", {
        enumerable: true,
        configurable: true
    });

    return TaskDataModel;
}());
exports.TaskDataModel = TaskDataModel;
var TaskTypeItem = (function (_super) {
    __extends(TaskTypeItem, _super);
    function TaskTypeItem(selected, tabName, xmlFileName) {
        var _this = _super.call(this) || this;
        _this.isSelected = selected;
        _this.tabName = tabName;
        _this.xmlFileName = xmlFileName;
        return _this;
    }

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
            return this.get("imgRes");
        },
        set: function (value) {
            this.set("imgRes", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskTypeItem.prototype, "selectedTabName", {
        get: function () {
            var suffix = app.ios ? "s" : "";
            return this.get("imgRes") + suffix;
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
exports.TaskTypeItem = TaskTypeItem;
