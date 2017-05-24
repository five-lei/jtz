'use strict'

var observable = require("data/observable");
var ObservableArray = require("data/observable-array");
var listViewModule = require("nativescript-telerik-ui-pro/listview");
var builder = require("ui/builder");
var utils = require("utils/utils");
var api = require('../../../shared/api');
var config = require('../../../shared/config');
var previousType = null;
var previousTaskType = null;
class TaskDataModel extends observable.Observable {
    constructor(useCache) {
        super();
        this._useCache = useCache;
        this.pageIndex = 0;
        this.currentTaskListAll = new ObservableArray.ObservableArray();
        this.imgObj = this.getImageTypes();
    }

    /**
     * 调度任务列表查询
     * @param page 页面对象
     * @param screen 筛选条件
     * @param type 类型
     * @param taskType 请求类型
     */
    queryData(page, screen, type, clear) {
        console.log("clear:"+clear);
        var _this = this;
        var list_view = page.getViewById("list_view");

        console.log('pageIndex'+this.pageIndex);
        if(clear){
            console.log(111111111)
            this.pageIndex=0;
            this.currentTaskListAll.length=0;
        }
        console.log('type='+type);
        if (!type) {
            type = previousType;
        }
        console.log('previousType='+previousType);
        var taskType = this.getTaskType(type);
        console.log('taskType='+taskType)
        previousType = type;
        previousTaskType = taskType;

        //第一页重新设置自动按需加载
        if (this.pageIndex == 0) {
            list_view.loadOnDemandMode = listViewModule.ListViewLoadOnDemandMode[listViewModule.ListViewLoadOnDemandMode.Auto];
        }
        console.log("currentTaskListAll:"+ this.currentTaskListAll.length);
        //当前查询分页
        var curPageIndex =  this.pageIndex * 4;
        //查询参数
        var queryParams = {
            "name": "taskInstallController.findAppTaskInstall",
            "args": [
                {"first": curPageIndex || 0, "rows": 4},
                {
                    "taskStatus": taskType,
                    "validStatus": true,
                    "screen": screen
                }
            ]
        };
        console.dump(queryParams);
        api.call(config.apiUrl, queryParams).ok((data) => {
            console.log(JSON.stringify(data));
            var taskList = data.result.content || [];
            console.log('taskList'+taskList.length);
            //总记录数
            var totalElements = data.result.totalElements;
            console.log('++++++++++++++');
            console.log("currentTaskListAll:"+ this.currentTaskListAll.length);
            console.log('++++++++++++++');
            taskList.forEach(function (item) {
                var task = _this.convertFieldName(item, type);
                if (task) {
                    _this.currentTaskListAll.push(task);
                }

            });
            console.log( this.currentTaskListAll.length);
            page.bindingContext.currentTaskList =  this.currentTaskListAll;

            list_view.notifyLoadOnDemandFinished();
            list_view.notifyPullToRefreshFinished();

            //当查询所有记录数后，取消按需加载
            if (page.bindingContext.currentTaskList.length >= totalElements) {
                list_view.loadOnDemandMode = listViewModule.ListViewLoadOnDemandMode[listViewModule.ListViewLoadOnDemandMode.None];
                return;
            }


        }).fail((err) => {
            list_view.notifyLoadOnDemandFinished();
            list_view.notifyPullToRefreshFinished();
            console.log("##############api.call error start#############");
            console.log(JSON.stringify(err))

        })
    }

    /**
     *转换绑定数据名称
     */
    convertFieldName(taskRecord, type) {
        var item = null;
        if (typeof taskRecord !== 'object') return item;
        if (type == 'all') {
            type = this.getTaskStatus(taskRecord['taskStatus']);
        }
        item = {
            "id": taskRecord['taskId'],
            "waybillId": taskRecord['waybillId'],

            "status":type,
            "statusImage": this.imgObj[type],
            "orderNumber": taskRecord['waybillId'],
            "price": Number((taskRecord['installFee'] || 0))+Number((taskRecord['branchFee'] || 0)),
            "company": "一智通供应链管理有限公司",
            "datetime": taskRecord['disTime'],//时间
            "address": taskRecord['receiveAddress'] || '',
            "receivePersonName": taskRecord['consigneeName'] || '',
            "receivePersonPhone": taskRecord['consigneeTel'] || '',
            "orgName": taskRecord['orgName'],//开单网点
            "pickupAddress": taskRecord['addr'],//提货地址
            "pickupPhone": taskRecord['tel'],
            "pickupNumber": taskRecord['code'],//提货码
            "packCount": taskRecord['packingNumber'],
            "packVolume": taskRecord['volumes'],
            "floor": taskRecord['floors'],
            "appointmentTime": taskRecord['appointmentRate'],//预约计时
            "dealTime": taskRecord['acceptRate'], //受理计时
            "installationRate": taskRecord['installationRate'], //安装计时
            "serviceType": taskRecord['serviceType'],
            "forwardTo": taskRecord['forwardTo'] || '',//已给
            "toMe": taskRecord['toMe'] || '',//谁转给我
            "canForward": taskRecord['canForward'],//是否已转单
            "qiang": taskRecord['qiang'],//是否抢单
            "tmail": taskRecord['tmail'],//是否天猫订单：boolean
            "orderSourceCode": taskRecord['orderSourceCode'], //天猫单号
            "serviceTypeTmall": taskRecord['serviceTypeTmall'], //天猫服务类型
            "sourceType": taskRecord['sourceType'] //订单类型
        };
        if(item.tmail){
            console.dump(item)
        }
        return item;
    }

    /**
     * 初始化数据
     */
    init() {
        var data = {
            "currentTaskList": []
        };
        return new observable.Observable(data);
    }

    /**
     * 加载更多
     * @param page
     */
    onLoadMoreItemsRequested(args) {
        this.pageIndex++;
        console.log( this.pageIndex + "---");
        var page = args.object.page;
        this.queryData(page, null, null, null);
    }

    /**
     * 刷新
     * @param page
     */
    pullToRefreshInitiated(args) {
        this.pageIndex = 0;
        this.currentTaskListAll.length = 0;
        var page = args.object.page;
        this.queryData(page, null, null, null);
    }

    /**
     * 任务类型转换
     * @param type
     * @returns {*}
     */
    getTaskType(type) {
        var obj = {
            "waiting_list": "distributionWaitAccept",
            "waiting_appointment": "accepted",
            "waiting_pickup": "waiting_pickup",
            "waiting_sign_for": "waitPickUp",
            "had_sign_for": "doSign",
            "cancelled": "cancelled",
            "all": "all"
        }
        if (!type) {
            return obj['all'];
        }
        return obj[type];
    }

    /** 任务状态
     * @param type
     * @returns {*}
     */
    getTaskStatus(type) {
        var obj = {
            distributionWaitAccept: "waiting_list",
            accepted: "waiting_appointment",
            waiting_pickup: "waiting_pickup",
            doSign: "had_sign_for",
            waitPickUp: "waiting_sign_for",
            invalid: "cancelled"
        }
        return obj[type];
    }

    getImageTypes() {
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
    }

    clearCache() {
        /* for (var i = 0; i < this._views.length; i++) {
         delete this._views[i];
         }
         this._views = {};*/
    };
}

exports.TaskDataModel = TaskDataModel;

