'use strict'

var observable = require("data/observable");
var app = require("application");
var listViewModule = require("nativescript-telerik-ui-pro/listview");
var ObservableArray = require("data/observable-array");
var timer = require("timer");

var TaskTypeItem = require('../common/task-type-item');

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
        this.currentTaskListAll = new ObservableArray.ObservableArray();
        this.barTypes = this.getBarTypes();
        this._numberOfAddedItems = null;
        this.imgObj = this.getImageTypes();
    }

    /**
     * 获取任务数据
     * @param type 类型
     * @param searchText  搜索条件：运单号、发货人姓名、发货人手机号码
     * @param searchSwitch 搜索tab标签切换 true/false
     * @param pageIndex 查询分页，搜索页面调用
     */
    getTaskList(page, type, search,searchSwitch,pageIndex) {
        if(!page) return;
        var _this = this;
        var list_view = page;
        var taskStatus = this.getTaskType(type);
        var aftermarketDispatchRequest={
            "taskStatus": taskStatus,
            'platform': 'app_list_repair',
            "taskType": "fhreturn"
        };
        //当前查询分页*rows
        var curPageIndex =(pageIndex || this.pageIndex)*4;
        //其他页面调用搜索，切换tab页时清空数据
        if(searchSwitch){
            this.pageIndex=0;
            this.currentTaskListAll.length=0;
        }
        aftermarketDispatchRequest['platform']='app_list_return';
        if(!search && !pageIndex && pageIndex!=0){
            list_view=page.getViewById('list_view');
        }else{
            //搜索
            aftermarketDispatchRequest['platform']='app_search_return';
            aftermarketDispatchRequest['appSeachContent']=search;
        }
        //第一页重新设置自动按需加载
        if(this.pageIndex==0){
            list_view.loadOnDemandMode = listViewModule.ListViewLoadOnDemandMode[listViewModule.ListViewLoadOnDemandMode.Auto];
        }

        //查询参数
        var qureyParams = {
            "name": "aftermarketTaskController.returnDispatchList",
            "args": [{"first": curPageIndex || 0, "rows": 4}, aftermarketDispatchRequest]
        };
        api.call(config.apiUrl, qureyParams).ok((data) => {
            console.log("===success result：" + JSON.stringify(data));
            var taskList = data.result.content || [];
            //总记录数
            var totalElements = data.result.totalElements;
            taskList.forEach(function (item) {

                var task = _this.convertFieldName(item, type);
                if (task) {
                    _this.currentTaskListAll.push(task);
                }
            });
            page.bindingContext.currentTaskList = this.currentTaskListAll
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
    listViewFinished(list_view){
        list_view.notifyLoadOnDemandFinished();
        list_view.notifyPullToRefreshFinished();
    }

    replaceStrShow(obj) {
        return (obj === undefined || obj === "null" || obj === "Null" || obj === "NULL" || obj === "") ? "" : obj;
    }

    convertFieldName(taskRecord, type) {
        var item = null;
        if (typeof taskRecord !== 'object') return item;
        if(type=="all"){
            type=this.getTaskStatus(taskRecord["taskStsTag"])
        }
        item = {
            "id": taskRecord["id"],
            "waybillId": taskRecord["waybillId"],
            "taskSts": taskRecord["taskStsTag"],
            "status": type,//---
            "statusImage": this.imgObj[type],   //图标
            "orderNumber": taskRecord["maintno"],   //任务号 --
            "price": (taskRecord["returnMoney"] === undefined || taskRecord["returnMoney"] === "null") ? "0.0" : (taskRecord["returnMoney"] || 0), //返货费用--
            "company": taskRecord["taskCompany"],//公司
            "datetime": taskRecord["dateCreated"],  //任务创建时间--
            "address": this.replaceStrShow(taskRecord["vArea"]),//---
            "receivePersonName": this.replaceStrShow(taskRecord["consigneeName"]),//--
            "receivePersonPhone": this.replaceStrShow(taskRecord["consigneeMobile"]),//--
            "receivePersonAddress": this.replaceStrShow(taskRecord["vArea"]),//收货地址--
            "pickupAddress": taskRecord["getGoodsArea"] === undefined ? "" : taskRecord["getGoodsArea"],//--
            "pickupPhone": this.replaceStrShow(taskRecord["getGoodsManMobile"]),//--
            "remark": this.replaceStrShow(taskRecord["remark"])//--
        };
        return item;
    }

    /**
     * 任务类型转换
     * @param type
     * @returns {*}
     */
    getTaskType(type) {
        var obj = {
            "return_waiting_list": "distributionWaitAccept", //已分配，待受理
            "return_waiting_pickup": "accepted", //已受理，待提货
            "return_waiting_sign_for": "waitPickUp",//提货完成，待签收
            "return_finish": "doSign",   //已签收
            "all": "All"
        }
        if (!type) {
            return obj['All'];
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
            distributionWaitAccept: "return_waiting_list",
            accepted:"return_waiting_pickup",
            waitPickUp: "return_waiting_sign_for",
            doSign: "return_finish"
        }
        return obj[type];
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
                this.currentTaskListAll.length= 0;
            }
        }
        item.isSelected = true;
        this.selectedItem = item;//动态更改数据
        this.getTaskList(page, xmlFileName,null);
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
            new TaskTypeItem(false, "待受理", "return_waiting_list","0"),
            new TaskTypeItem(false, "待提货", "return_waiting_pickup","1"),
            new TaskTypeItem(false, "待签收", "return_waiting_sign_for","2"),
            new TaskTypeItem(false, "已完成", "return_finish","3")
        ];
    }

    getImageTypes() {
        if (this._taskTypeImages) {
            return this._taskTypeImages;
        }
        return this._taskTypeImages = {
            "return_waiting_list": "res://xin2x",
            "return_waiting_sign_for": "res://qian2x",
            "return_waiting_pickup": "res://tihuo2x",
            "return_finish": "res://yiancheng"
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

