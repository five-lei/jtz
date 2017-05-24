var config = require("../../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var visibility = require("ui/enums");
var frameModule = require("ui/frame");
var selectarray = new observable_array_1.ObservableArray();
var dialogsAlert = require("../../../common/dialogsUtil");
var districts;
var citys;
var arry;
var statusType;


var ViewModel = (function () {
    function ViewModel(messageArry) {
        this.initDataItems(messageArry);
    }

    Object.defineProperty(ViewModel.prototype, "messages", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    
    /**
     * 新任务状态
     * @param type
     * @returns {*}
     */
    function getNewTaskStatus(type) {
        var obj = {
            distributionWaitAccept: "waiting_list",
            accepted:"waiting_appointment",
            waiting_pickup: "waiting_pickup",
            doSign: "had_sign_for",
            waitPickUp: "waiting_sign_for",
            invalid: "cancelled"
        };
        return obj[type];
    }
    /**
     * 维修任务状态
     * @param type
     * @returns {*}
     */
    function getRepairTaskStatus(type) {
        var obj = {
            distributionWaitAccept: "maintenance_waiting_list",
            accepted: "maintenance_waiting_appointment",
            waitAppointment: "maintenance_waiting_sign_for",
            doSign: "maintenance_finish"
        };
        return obj[type];
    }
    /**
     * 返货任务状态
     * @param type
     * @returns {*}
     */
    function getReturnTaskStatus(type) {
        var obj = {
            distributionWaitAccept: "return_waiting_list",
            accepted:"return_waiting_pickup",
            waitPickUp: "return_waiting_sign_for",
            doSign: "return_finish"
        };
        return obj[type];
    }
    
    
    // >> listview-howto-item-selection-events
    ViewModel.prototype.itemSelected = function (args) {
        var page = args.object.page;
        var type = arry[args.itemIndex].Type;
        var imMessageType = arry[args.itemIndex].imMessageType;
        var taskId = arry[args.itemIndex].id;
        var taskStatus = arry[args.itemIndex].taskStatus;
        console.log("type------------"+type);
        console.log("taskId------------"+taskId);
        console.log(JSON.stringify(arry));
        console.log(imMessageType);
        console.log("this taskStatus is " + taskStatus);
        if (imMessageType == "TASK") {
            if (type != "dispatchTask") {
                if(type == "repair") {
                    statusType = getRepairTaskStatus(taskStatus);
                }else{
                    statusType = getReturnTaskStatus(taskStatus);
                }
                if(!statusType){
                    dialogsAlert.alert("该任务已作废,无法查看");
                }else {
                    var navigationEntry = {
                        moduleName: '/views/task/return-detail/return-detail',
                        context: {
                            "taskType": statusType,
                            "taskId": taskId
                        },
                    };
                    frameModule.topmost().navigate(navigationEntry);
                }
            } else {
                statusType = getNewTaskStatus(taskStatus);
                var navigationEntry = {
                    moduleName: '/views/task/task-detail/task-detail',
                    context: {
                        "taskType": statusType,
                        "taskId": taskId
                    },
                };
                frameModule.topmost().navigate(navigationEntry);
            }

        }
    };

    ViewModel.prototype.initDataItems = function (messageArry) {
        console.log(messageArry);
        arry = messageArry;
        this._items = new observable_array_1.ObservableArray();
        for (var i = 0; i < messageArry.length; i++) {
            this._items.push(
                new DataItem(messageArry[i].src, messageArry[i].isRight, messageArry[i].date, messageArry[i].message, messageArry[i].photos, messageArry[i].name, messageArry[i].imMessageType, messageArry[i].Type, messageArry[i].taskId, messageArry[i].recieve, messageArry[i].taskType)
            );

        }
    };
    return ViewModel;
}());
exports.ViewModel = ViewModel;

var DataItem = (function (_super) {
    __extends(DataItem, _super);
    function DataItem(image, isRight, date, message, photos, name, imMessageType, Type, taskId, recieve, taskType, id, taskStatus) {
        var _this = _super.call(this) || this;
        _this.image = image;
        _this.isRight = isRight;
        _this.date = date;
        _this.message = message;
        _this.photos = photos;
        _this.name = name;
        _this.imMessageType = imMessageType;
        _this.Type = Type;
        _this.taskId = taskId;
        _this.recieve = recieve;
        _this.taskType = taskType;
        _this.id = id;
        _this.taskStatus = taskStatus;
        return _this;
    }

    Object.defineProperty(DataItem.prototype, "image", {
        get: function () {
            return this.get('_image');
        },
        set: function (value) {
            this.set('_image', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "isRight", {
        get: function () {
            return this.get('_isRight');
        },
        set: function (value) {
            this.set('_isRight', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "date", {
        get: function () {
            return this.get('_date');
        },
        set: function (value) {
            this.set('_date', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "message", {
        get: function () {
            return this.get('_message');
        },
        set: function (value) {
            this.set('_message', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "photos", {
        get: function () {
            return this.get('_photos');
        },
        set: function (value) {
            this.set('_photos', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "name", {
        get: function () {
            return this.get('_name');
        },
        set: function (value) {
            this.set('_name', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "imMessageType", {
        get: function () {
            return this.get('_imMessageType');
        },
        set: function (value) {
            this.set('_imMessageType', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "Type", {
        get: function () {
            return this.get('_Type');
        },
        set: function (value) {
            this.set('_Type', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "taskId", {
        get: function () {
            return this.get('_taskId');
        },
        set: function (value) {
            this.set('_taskId', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "recieve", {
        get: function () {
            return this.get('_recieve');
        },
        set: function (value) {
            this.set('_recieve', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "taskType", {
        get: function () {
            return this.get('_taskType');
        },
        set: function (value) {
            this.set('_taskType', value);
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
    Object.defineProperty(DataItem.prototype, "taskStatus", {
        get: function () {
            return this.get('_taskStatus');
        },
        set: function (value) {
            this.set('_taskStatus', value);
        },
        enumerable: true,
        configurable: true
    });
    return DataItem;
}(observable_1.Observable));
exports.DataItem = DataItem;
