'use strict'

var observable = require("data/observable");
var observable_array_1 = require("data/observable-array");
var app = require("application");
var listViewModule = require("nativescript-telerik-ui-pro/listview");
var timer = require("timer");

var TaskTypeItem = require('../common/task-type-item');

// var posts = require("../../../test/data/maintenance-task.json");
var api = require("../../../shared/api");
var config = require("../../../shared/config");

class TaskDataModel extends observable.Observable {
    constructor(useCache) {
        super();
        this._useCache = useCache;
        this._views = {};
        this._numberOfAddedItems = 0;
        this._taskTypeImages = null;
        this.pageIndex = 0;
        this.selectedItem = null; //当前选中tab对象
        this.preSelectedItem = null; //上一次选中tab对象
        this.currentTaskListAll = new observable_array_1.ObservableArray();
        this.barTypes = this.getBarTypes();
        this.imgObj = this.getImageTypes();
        this._numberOfAddedItems = null;
    }

    /**
     * 获取任务数据
     * @param type 类型
     * @param searchText  搜索条件：运单号、发货人姓名、发货人手机号码
     * @param searchSwitch 搜索tab标签切换 true/false
     * @param pageIndex 查询分页，搜索页面调用
     */
    getTaskList(page, type, search, searchSwitch, pageIndex) {
        if (!page) return;
        var _this = this;
        var list_view = page;
        var taskStatus = this.getTaskType(type);

        var aftermarketDispatchRequest = {
            "taskStatus": taskStatus,
            'platform': 'app_list_repair'
        };

        //当前查询分页*rows
        var curPageIndex = (pageIndex || this.pageIndex) * 4;
        //其他页面调用搜索，切换tab页时清空数据
        if (searchSwitch) {
            this.pageIndex = 0;
            this.currentTaskListAll.length = 0;
        }
        if (!search && !pageIndex && pageIndex != 0) {
            aftermarketDispatchRequest['taskType'] = "repair";
            list_view = page.getViewById('list_view');
        } else {
            //搜索
            aftermarketDispatchRequest['platform'] = 'app_search_repair';
            aftermarketDispatchRequest['appSeachContent'] = search;
        }
        //第一页重新设置自动按需加载
        if (this.pageIndex == 0) {
            list_view.loadOnDemandMode = listViewModule.ListViewLoadOnDemandMode[listViewModule.ListViewLoadOnDemandMode.Auto];
        }
        //查询参数
        var qureyParams = {
            "name": "aftermarketTaskController.repairDispatchList",
            "args": [{"first": curPageIndex || 0, "rows": 4}, aftermarketDispatchRequest]
        };
        console.dump(qureyParams)
        api.call(config.apiUrl, qureyParams).ok((data) => {
            var taskList = data.result.content || [];
            console.log("data.result.content：" + JSON.stringify(data.result.content));
            //总记录数
            var totalElements = data.result.totalElements;
            taskList.forEach(function (item) {

                var task = _this.convertFieldName(item, type);
                if (task) {
                    _this.currentTaskListAll.push(task);
                }
            });
            page.bindingContext.currentTaskList = this.currentTaskListAll;

            _this.listViewFinished(list_view);
            //当查询所有记录数后，取消按需加载
            if (page.bindingContext.currentTaskList.length >= totalElements) {
                list_view.loadOnDemandMode = listViewModule.ListViewLoadOnDemandMode[listViewModule.ListViewLoadOnDemandMode.None];
                return;
            }
        }).fail((err) => {
            _this.listViewFinished(list_view);
            console.log("##############api.call error start#############");

        })
    }

    /**
     * 结束加载
     * @param list_view
     */
    listViewFinished(list_view) {
        list_view.notifyLoadOnDemandFinished();
        list_view.notifyPullToRefreshFinished();
    }

    convertFieldName(taskRecord, type) {
        console.log(type)
        var item = null;
        if (typeof taskRecord !== 'object') return item;
        if (type == "all") {
            type = this.getTaskStatus(taskRecord["taskSts"])
        }
        item = {
            "id": taskRecord["id"],
            "waybillId": taskRecord["waybillId"],//运单号
            "taskSts": taskRecord["taskSts"],
            "status": type,
            "statusImage": this.imgObj[type],
            "orderNumber": taskRecord["maintno"], //任务号
            "price": taskRecord["installFee"],
            "company": taskRecord["taskCompany"],
            "datetime": taskRecord["dateCreated"],
            "address": taskRecord["vArea"],
            "receivePersonName": taskRecord["consigneeName"],
            "receivePersonPhone": taskRecord["consigneeMobile"],
            "pickupAddress": taskRecord["vArea"],

            "pickupPhone": taskRecord[""],
            "pickupNumber": taskRecord[""],

            "packCount": taskRecord[""],
            "packVolume": taskRecord[""],
            "floor": taskRecord[""],
            "appointmentTime": taskRecord[""],
            "remark": taskRecord["taskRemark"],
            "dealTime": taskRecord[""]
        };

        return item;
    }

    /**
     * 初始化数据
     */
    init() {
        var data = {
            "currentTaskList": [],
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
    }

    // << listview-load-on-demand-handler
    loadGalleryFragment(page, item, xmlFileName) {
        if (this.selectedItem) {
            this.selectedItem.isSelected = false;
            this.preSelectedItem = this.selectedItem;//存储上一次点击的tab
            console.log("--- " + this.preSelectedItem.xmlFileName);
            if (xmlFileName != this.preSelectedItem.xmlFileName) {
                //清空数据
                this.pageIndex = 0;//第一页
                this.currentTaskListAll.length = 0;
            }
        }
        item.isSelected = true;
        this.selectedItem = item; //动态更改数据
        this.getTaskList(page, xmlFileName, null);

        console.log('isSelected:' + item.isSelected)
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
            "maintenance_waiting_list": "distributionWaitAccept",
            "maintenance_waiting_appointment": "accepted",
            "maintenance_waiting_sign_for": "waitAppointment",
            "maintenance_finish": "doSign",
            "all": "All"
        }
        if (!type) {
            return obj['all'];
        }
        return obj[type];
    }

    /**
     * 任务状态
     * @param type
     * @returns {*}
     */
    getTaskStatus(type) {
        var obj = {
            distributionWaitAccept: "maintenance_waiting_list",
            accepted: "maintenance_waiting_appointment",
            waitAppointment: "maintenance_waiting_sign_for",
            doSign: "maintenance_finish"
        }
        return obj[type];
    }

    getBarTypes() {
        if (this._barTypes) {
            return this._barTypes;
        }
        return this._barTypes = [
            new TaskTypeItem(false, "待受理", "maintenance_waiting_list","0"),
            new TaskTypeItem(false, "待预约", "maintenance_waiting_appointment","1"),
            new TaskTypeItem(false, "待签收", "maintenance_waiting_sign_for","2"),
            new TaskTypeItem(false, "已完成", "maintenance_finish","3")
        ];
    }

    getImageTypes() {
        if (this._taskTypeImages) {
            return this._taskTypeImages;
        }
        return this._taskTypeImages = {
            "maintenance_waiting_list": "res://xin2x",
            "maintenance_waiting_appointment": "res://qian2x",
            "maintenance_waiting_sign_for": "res://yu2x",
            "maintenance_finish": "res://yiancheng"
        };
    }

    clearCache() {
        /* for (var i = 0; i < this._views.length; i++) {
         delete this._views[i];
         }
         this._views = {};*/
    };
}

module.exports = TaskDataModel;
