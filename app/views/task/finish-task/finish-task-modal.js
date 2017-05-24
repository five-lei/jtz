'use strict'

var observable = require("data/observable");
var builder = require("ui/builder");
var app = require("application");
var utils = require("utils/utils");
var fileSystem = require("file-system");

class TaskDataModel extends observable.Observable {
    constructor(useCache) {
        super();
        this._useCache = useCache;
        this._views = {};
        this._taskTypeImages = null;
        this._currentTaskList = [];
        this.currentTaskList = this.getTaskList();
        this.barTypes = this.getBarTypes();
    }

    /**
     *
     * @param type 类型
     * @returns {*}
     */
    getTaskList() {

        var args = Array.prototype.slice.call(arguments);
        var type = args[0] ? args[0] : 'all';

        var taskList = [
            {
                "id": "11",
                "waybillId": "11",
                "status": "had_sign_for",

                "orderNumber": "1ZT324835",
                "price": "500.00",
                "company": "一智通供应链管理有限公司",
                "datetime": "2017/03/10 13:39",
                "address": "广州市白云区新市路口",
                "receivePersonName": "张三",
                "receivePersonPhone": "15626270808",
                "pickupAddress": "广州市白云区新市路口2",//提货地址
                "pickupPhone": "15126270897",
                "pickupNumber": "775566",//提货码
                "packCount": "2",
                "packVolume": "3",
                "floor": "6 无电梯",
                "appointmentTime": '54',
                "dealTime": "10"
            },
            {
                "id": "22",
                "waybillId": "111",
                "status": "had_sign_for",

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
                "id": "33",
                "waybillId": "33",
                "status": "maintenance_finish",

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
                "id": "44",
                "waybillId": "44",
                "status": "maintenance_finish",

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
                "id": "55",
                "waybillId": "55",
                "status": "maintenance_finish",

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
                "id": "66",
                "waybillId": "66",
                "status": "return_finish",

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
                "id": "77",
                "waybillId": "77",
                "status": "return_finish",

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

    /**
     * 初始化数据
     */
    init() {
        var data = {
            "currentTaskList": this.getTaskList(),
            "barTypes": this.getBarTypes()
        };
        return new observable.Observable(data);
    }
    loadItem(page, item) {
        page.bindingContext.currentTaskList = dataModel.loadGalleryFragment(item, item.xmlFileName);
    }
    loadGalleryFragment(item, xmlFileName) {
        if (this.selectedItem) {
            this.selectedItem.isSelected = false;
        }
        item.isSelected = true;
        this.selectedItem = item;
        //动态更改数据
        this.currentTaskList = this.getTaskList(xmlFileName);
        console.log("~~~ " + xmlFileName);
        return this.currentTaskList;
    }

    getPictureResourcePath(groupName, exampleName) {
        if (app.ios) {
            return "res://chart/" + groupName + "/" + exampleName;
        }
        var resourcePath = "res://" + exampleName;
        return resourcePath;
    }

    getBarTypes() {
        if (this._barTypes) {
            return this._barTypes;
        }
        return this._barTypes = [
            new TaskTypeItem(false, "新任务", "had_sign_for"),
            new TaskTypeItem(false, "维修", "maintenance_finish"),
            new TaskTypeItem(false, "返货", "return_finish"),
        ];
    }

    clearCache() {
        /* for (var i = 0; i < this._views.length; i++) {
         delete this._views[i];
         }
         this._views = {};*/
    };
}

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
