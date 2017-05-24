'use strict'

var observable = require("data/observable");
var observable_array_1 = require("data/observable-array");
var builder = require("ui/builder");
var app = require("application");
var utils = require("utils/utils");
var listViewModule = require("nativescript-telerik-ui-pro/listview");
var api = require('../../shared/api');
var config = require('../../shared/config');

class TaskDataModel extends observable.Observable {
    constructor(useCache) {
        super();
        this._useCache = useCache;
        this._views = {};
        this.pageIndex = 0;
        this.selectedItem = null; //当前选中tab对象
        this.preSelectedItem = null; //上一次选中tab对象
        this._taskTypeImages = null;
        this.currentTaskListAll = new observable_array_1.ObservableArray();
        this.barTypes = this.getBarTypes();
        this.imgObj = this.getImageTypes();
    }

    /**
     * 调度任务列表查询
     * @param page 页面对象
     * @param type 类型
     * @param search 搜索条件：运单号、发货人姓名、发货人手机号码
     * @param searchSwitch 搜索tab标签切换 true/false
     * @param pageIndex 查询分页，搜索页面调用
     * @param screen 筛选条件
     */
    queryData(page, type, search, searchSwitch, pageIndex,screen) {
        if (!page) return;
        var _this = this;
        page.bindingContext.loading=true;
        var list_view = page;
        //其他页面调用搜索，切换tab页时清空数据
        if (searchSwitch) {
            this.pageIndex = 0;
            this.currentTaskListAll.splice(0);
            page.bindingContext.currentTaskList = this.currentTaskListAll;
        }
        console.log('this.pageIndex='+this.pageIndex)
        //当前查询分页*rows
        var curPageIndex = (pageIndex || this.pageIndex) * 4;
        var taskType = this.getTaskType(type);

        if (!search && !pageIndex && pageIndex != 0) {
            list_view = page.getViewById('list_view');
        }
        //第一页重新设置自动按需加载
        if (this.pageIndex == 0) {
            list_view.loadOnDemandMode = listViewModule.ListViewLoadOnDemandMode[listViewModule.ListViewLoadOnDemandMode.Auto];
        }
        var params={
            "taskStatus": taskType,
            "search": search
        };
        //过滤筛选
        if(screen || page.screen){
            params['screen']=screen || page.screen;
        }
        //查询参数
        var queryParams = {
            "name": "taskInstallController.findAppTaskInstall",
            "args": [{"first": curPageIndex || 0, "rows": 4}, params]
        };
        console.log("curPageIndex=" + curPageIndex)
        // console.dump(queryParams);

        api.call(config.apiUrl, queryParams).ok((data) => {
            console.log(JSON.stringify(data));
            var taskList = data.result.content || [];
            //总记录数
            var totalElements = data.result.totalElements;
            taskList.forEach(function (item) {
                var task = _this.convertFieldName(item, type);
                if (task) {
                    _this.currentTaskListAll.push(task);
                }

            });
            page.bindingContext.currentTaskList = this.currentTaskListAll;

            //停止刷新
            _this.listViewFinished(list_view);
            // console.log('#############################')
            // console.log(page.bindingContext.currentTaskList.length)
            // console.log(totalElements)
            // console.log('#############################')
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
        var page=list_view.page;
        page.bindingContext.loading=false;
        list_view.notifyLoadOnDemandFinished();
        list_view.notifyPullToRefreshFinished();
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
            "currentTaskList": [],
            "barTypes": this.getBarTypes()
        };
        return new observable.Observable(data);
    }

    removeByTaskId(page, taskId) {
        removeByTaskId(page, taskId)
    }

    /**
     * 加载更多
     * @param page
     * @param item
     * @param xmlFileName
     */
    onLoadMoreItemsRequested(args, item, xmlFileName) {
        this.pageIndex++;
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
        var page = args.object.page;
        this.loadGalleryFragment(page, item, xmlFileName);
    }

    /**
     *
     * @param page
     * @param item
     * @param xmlFileName
     * @param index 分页
     */
    loadGalleryFragment(page, item, xmlFileName) {
        if (this.selectedItem) {
            this.selectedItem.isSelected = false;
            this.preSelectedItem = this.selectedItem;//存储上一次点击的tab
            if (xmlFileName != this.preSelectedItem.xmlFileName) {
                //清空数据
                this.pageIndex = 0;//第一页
                this.currentTaskListAll.length = 0;
            }
        }
        item.isSelected = true;
        this.selectedItem = item;//存储当前tab

        this.queryData(page, xmlFileName, null);
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

    /**
     * 任务状态
     * @param type
     * @returns {*}
     */
    getTaskStatus(type) {
        var obj = {
            distributionWaitAccept: "waiting_list",
            accepted:"waiting_appointment",
            waiting_pickup: "waiting_pickup",
            doSign: "had_sign_for",
            waitPickUp: "waiting_sign_for",
            invalid: "cancelled"
        }
        return obj[type];
    }

    getBarTypes() {
        if (this._barTypes) {
            return this._barTypes;
        }
        return this._barTypes = [
            new TaskTypeItem(false, "待接单", "waiting_list",'0'),
            new TaskTypeItem(false, "待预约", "waiting_appointment",'1'),
            new TaskTypeItem(false, "待提货", "waiting_pickup",'2'),
            new TaskTypeItem(false, "待签收", "waiting_sign_for",'3'),
            new TaskTypeItem(false, "已签收", "had_sign_for",'4'),
            new TaskTypeItem(false, "已取消", "cancelled",'5'),
            new TaskTypeItem(false, "全部", "all",'6')
        ];
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


function removeByTaskId(page, taskId) {
    var taskList = page.bindingContext.currentTaskList || [];
    taskList.forEach(function (item, index) {
        if (item.id === taskId) {
            taskList.splice(index, 1);
        }
    });
    page.bindingContext.set('currentTaskList', taskList);
}
//任务节点操作
/**
 * 受理
 * @param taskId
 * @param cb
 */
exports.accept = function (page, taskId, cb) {
    var qureyParams = {
        "name": "taskInstallController.accepte",
        "args": [{"taskId": taskId}]
    };
    api.call(config.apiUrl, qureyParams).ok((data) => {
        //受理成功移除记录
        try {
            removeByTaskId(page, taskId)
        } catch (e) {
            console.log(e)
        } finally {
            //受理成功
            cb(true);
        }

    }).fail((err) => {
        //受理失败
        cb(false);
    });
};
/**
 * 任务取消
 * @param taskId
 * @param cb
 */
exports.cancelDis = function (taskId, cb, reasonText) {
    var params = {
        "name": "taskInstallController.cancelForwardFriend",
        "args": [{"taskId": taskId, "reasonText": reasonText}]
    };
    api.call(config.apiUrl, params).ok((data) => {
        //取消成功
        cb(true);

    }).fail((err) => {
        //取消失败
        cb(false);
        console.log(JSON.stringify(err));
    });
};
/**
 * 预约、二次预约
 * @param taskId
 * @param cb
 */
exports.appointment = function (taskId, cb, appointmentTime) {
    var qureyParams = {
        "name": "taskInstallController.appointment",
        "args": [{"taskId": taskId, "appointmentTime": appointmentTime}]
    };
    api.call(config.apiUrl, qureyParams).ok((data) => {
        //预约成功
        cb(true);

    }).fail((err) => {
        //预约失败
        cb(false);
    });
};
/**
 * 提货
 * @param taskId
 * @param cb
 */
exports.pickUp = function (taskId, cb) {
    var qureyParams = {
        "name": "taskInstallController.pickUp",
        "args": [{"taskId": taskId}]
    };
    api.call(config.apiUrl, qureyParams).ok((data) => {
        //提货成功
        cb(true);
    }).fail((err) => {
        //提货失败
        var errorMsg="提货失败";
        if(err.code){
            errorMsg=err.error;
        }
        cb(false,errorMsg);
        console.log(err);
    });
};
/**
 * 签收
 * @param taskId
 * @param cb
 */
exports.sign = function (taskId, cb) {
    var qureyParams = {
        "name": "taskInstallController.sign",
        "args": [{"taskId": taskId}]
    };
    api.call(config.apiUrl, qureyParams).ok((data) => {
        //签收成功
        cb(true);

    }).fail((err) => {
        //签收失败
        cb(false);
    });
};