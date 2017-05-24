'use strict'

var observable = require("data/observable");
var observable_array_1 = require("data/observable-array");
var builder = require("ui/builder");
var app = require("application");
var listViewModule = require("nativescript-telerik-ui-pro/listview");
var utils = require("utils/utils");
var fileSystem = require("file-system");
var Observable = require("data/observable").Observable;
var api = require("../../../shared/api");
var config = require("../../../shared/config");

class TaskDataModel extends observable.Observable {
    constructor(useCache) {
        super();
        this._useCache = useCache;
        this._views = {};
        this._taskTypeImages = null;
        this.pageIndex = 0;
        this.selectedItem = null; //当前选中tab对象
        this.preSelectedItem = null; //上一次选中tab对象
        this.currentTaskListAll = new observable_array_1.ObservableArray();
        this.barTypes = this.getBarTypes();
    }

    /**
     * 获取任务数据
     * @param type 类型
     * @returns {*}
     */
    getTaskList(listViewObj, type, condition) {
        console.log(listViewObj+"page++");
        var _this = this;
        var taskStatus = this.getTaskType(type);
        //当前查询分页
        var curPageIndex = this.pageIndex*10;
        console.log("curPageIndex:"+curPageIndex);
        console.log("this.currentTaskListAll.length:"+this.currentTaskListAll.length);
        console.log(curPageIndex+'curPageIndex');
        // var list_view = page.getViewById("list_view");
        var name = "taskHistoryController.taskHistoryPageList";
        switch (taskStatus) {
            case "distributionWaitAccept":
                name = "taskHistoryController.taskHistoryPageList";
                break;
            case "accepted":
                name = "taskHistoryController.taskRepairHistoryPageList";
                break;
            case "waitPickUp":
                name = "taskHistoryController.taskReturnHistoryPageList";
                break;
        }
        var vHistory = {};
        if(condition){
            condition.keyword != '' ? vHistory.keyword = condition.keyword : '';
            condition.endCityId != '' ? vHistory.endCityId = condition.endCityId : '';
            condition.SignBeginTime != '' ? vHistory.SignBeginTime = condition.SignBeginTime : '';
            condition.assignBeginTime != '' ? vHistory.assignBeginTime = condition.assignBeginTime : '';
            condition.waybillServiceType != '' ? vHistory.waybillServiceType = condition.waybillServiceType : '';
        }

        //查询参数
        var qureyParams = {
            "name": name,
            "args": [{"first": curPageIndex || 0, "rows": 10}, vHistory]
        };
        api.call(config.apiUrl, qureyParams).ok((data) => {
            var taskList = data.result.content || [];
            taskList.forEach(function (item) {
                var task = _this.convertFieldName(item, taskStatus);
                if (task) {
                    _this.currentTaskListAll.push(task);
                }
            });
            listViewObj.bindingContext.set('currentTaskList',this.currentTaskListAll);
            // listViewObj.notifyLoadOnDemandFinished();
            // listViewObj.notifyPullToRefreshFinished();
            console.log("=======================接口返回数据=================");
            console.log(taskList);
            console.log("=======================接口返回数据=================");
            console.log("=======================数据=================");
            console.log(this.currentTaskListAll.length);
            console.log("=======================数据=================");
        }).fail((err) => {
            // listViewObj.notifyLoadOnDemandFinished();
            // listViewObj.notifyPullToRefreshFinished();
            var error = err.error || '';
            console.log(error);
        })
    }

    replaceStrShow(obj) {
        return (obj === undefined || obj === "null" || obj === "Null" || obj === "NULL" || obj === "") ? "" : obj;
    }

    convertFieldName(taskRecord, type) {
        var item = null;
        if (typeof taskRecord !== 'object') return item;

        item = {
            "id": taskRecord["id"] || '',
            "waybillId": "",
            "status": type,
            //订单号
            "orderNumber": taskRecord["taskTitle"] || '',
            //公司
            "company": taskRecord["billDepartName"] || '',
            //订单时间
            "datetime":taskRecord["billCreateDate"] || '',
            //收获地址
            "address": taskRecord["consigneeAddress"] || '',
            //收货人
            "receivePersonName": taskRecord["consignee"] || '',
            //收货人电话
            "receivePersonPhone": taskRecord["consigneeMobile"] || '',
            //提货地址
            "pickupAddress": taskRecord["pickUpAdr"] || '',
            //提货电话
            "pickupPhone": taskRecord["pickUpManMobile"] || '',
            //提货码
            "pickupNumber": taskRecord["pickUpCode"] || '',
            //受理时效 TODO 不需要
            //"dealTime": taskRecord["dealTime"] ,
            //服务类型
            "serviceType": taskRecord["serviceType"] || '',
            //状态
            "taskStatus": taskRecord["taskStatus"] || '',
            //图标 TODO 接口没有数据
            //"statusImage": this.imgObj[type],
            //"packCount": "2",
            //"packVolume": "3",
            //"floor": "6 无电梯",
            //"appointmentTime": '54',
            //"dealTime": "10"
            //任务信息
            "abnormalDescribe" : taskRecord["remark"] || '',
            //维修费用
            "price" : taskRecord["repairFee"] || 0,
            //备注
            "remark" : taskRecord["remark"] || '',
        };
        switch (type) {
            case "distributionWaitAccept":
                //新任务
                //提货地址
                item.pickupAddress = taskRecord["pickUpAdr"] || '';
                //提货电话
                item.pickupPhone = taskRecord["pickUpManMobile"] || '';
                //提货码
                item.pickupNumber = taskRecord["pickUpCode"] || '';
                //订单时间
                item.datetime = taskRecord["billCreateDate"] || '';
                break;
            case "accepted":
                //维修
                //任务信息
                // item.abnormalDescribe = taskRecord["abnormalDescribe"] || '';
                item.abnormalDescribe = taskRecord["remark"] || '';
                //维修费用
                item.price = taskRecord["repairFee"] || 0;
                //订单时间
                item.datetime = taskRecord["billCreateDate"] || '';
                break;
            case "waitPickUp":
                //返货
                //提货地址
                item.pickupAddress = taskRecord["pickUpAdr"] || '';
                //提货电话
                item.pickupPhone = taskRecord["pickUpManMobile"] || '';
                //备注
                item.remark = taskRecord["remark"] || '';
                //订单时间
                item.datetime = taskRecord["operatDate"];
                //收货地址
                item.address = taskRecord["consigneeAdr"] || '';
                //收货电话
                item.receivePersonPhone = taskRecord["consigneeMoblie"] || '';
                break;
        }
        return item;
    }

    /**
     * 初始化数据
     */
    init() {
        var data = {
            "queryType": "had_sign_for",
            "barTypes": this.getBarTypes()
        };
        return new observable.Observable(data);
    }

    /**
     * 加载更多
     * @param page
     * @param item
     * @param xmlFileName
     */
    onLoadMoreItemsRequested(args, item, xmlFileName) {
        this.pageIndex++;
        console.log(item.xmlFileName + "+++++++++");
        console.log(this.pageIndex + "---");
        var page = args.object.page;
        this.loadGalleryFragment(page, item, xmlFileName);
        args.object.notifyLoadOnDemandFinished();
    }

    /**
     * 刷新
     * @param page
     * @param item
     * @param xmlFileName
     */
    pullToRefreshInitiated(args, item, xmlFileName) {
        this.pageIndex = 0;
        this.currentTaskListAll.length = 0;
        console.log(item.xmlFileName + "+++++++++");
        var page = args.object.page;
        this.loadGalleryFragment(page, item, xmlFileName);
        args.object.notifyPullToRefreshFinished();
    }

    loadGalleryFragment(listViewObj, item, condition) {
        var page = listViewObj.page;
        if (this.selectedItem) {
            this.selectedItem.isSelected = false;
            this.preSelectedItem = this.selectedItem;//存储上一次点击的tab
            console.log("--- " + this.preSelectedItem.xmlFileName);
            console.log("666 " + item.xmlFileName);
            if (item.xmlFileName != this.preSelectedItem.xmlFileName) {
                //清空数据
                this.pageIndex = 0;//第一页
                this.currentTaskListAll.length= 0;
            }
        }
        item.isSelected = true;
        this.selectedItem = item;
        //切换模板
        page.bindingContext.queryType = item.xmlFileName;
        //动态更改数据
        this.getTaskList(listViewObj, item.xmlFileName, condition);
    }

    getPictureResourcePath(groupName, exampleName) {
        if (app.ios) {
            return "res://chart/" + groupName + "/" + exampleName;
        }
        var resourcePath = "res://" + exampleName;
        return resourcePath;
    }

    /**
     * 任务类型转换
     * @param type
     * @returns {*}
     */
    getTaskType(type) {
        var obj = {
            "had_sign_for": "distributionWaitAccept",
            "maintenance_finish": "accepted",
            "return_finish": "waitPickUp",
            "all": "All"
        }
        if (!type) {
            return obj['All'];
        }
        return obj[type];
    }

    getBarTypes() {
        if (this._barTypes) {
            return this._barTypes;
        }
        return this._barTypes = [
            new TaskTypeItem(false, "新任务", "had_sign_for","0"),
            new TaskTypeItem(false, "维修", "maintenance_finish","1"),
            new TaskTypeItem(false, "返货", "return_finish","2"),
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
