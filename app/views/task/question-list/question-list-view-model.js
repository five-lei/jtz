/**
 * Created by giscafer on 2017/3/29.
 */
var api = require('../../../shared/api');
var config = require("../../../shared/config");
var observable = require("data/observable");
var observable_array_1 = require("data/observable-array");
var app = require("application");
var listViewModule = require("nativescript-telerik-ui-pro/listview");
var timer = require("timer");

var TaskTypeItem = require('../common/task-type-item');

var posts = require("../../../test/data/question-task.json");


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
        this._numberOfAddedItems = null;
    }

    /**
     *  获取问题件数据
     * @param page 页面对象
     * @param type 问题件类型
     * @param searchSwitch 搜索tab标签切换 true/false
     * @param pageIndex 查询分页，搜索页面调用
     */
    queryData(page, type, search,searchSwitch,pageIndex) {

        var _this = this;
        var list_view = page;
        //当前查询分页
        var curPageIndex = (pageIndex || this.pageIndex)*5;

        var taskType = this.getTaskType(type);
        if(!search){
            list_view = page.getViewById("task_list_view");
        }else{
            console.log('searchSwitch='+searchSwitch)
            console.log('pageIndex='+pageIndex)
            if(searchSwitch){
                //切换tab页清空数据
                this.currentTaskListAll.length=0;
                this.pageIndex=0;
                curPageIndex=0;
            }
        }
        console.log("curPageIndex:"+curPageIndex);
        var qureyParams = {
            "name": "matterRecordController.matterRecordFind",
            "args": [{"first": curPageIndex || 0, "rows": 5}, {"abnoHandleSts": taskType, "inputInfo": search}]
        };
        console.dump(qureyParams)
        api.call(config.apiUrl, qureyParams).ok((data) => {
            console.log(JSON.stringify(data))
            try {
                var matterRecordList = data.result.content || [];
                matterRecordList.forEach(function (item) {
                    var task = _this.convertFieldName(item);
                    if (task) {
                        _this.currentTaskListAll.push(task);
                    }
                });
                page.bindingContext.currentTaskList = this.currentTaskListAll;
                console.log(page)
                console.log(page.bindingContext.currentTaskList)
                _this.listViewFinished(list_view)
            } catch (e) {
                console.log(e);
            }

        }).fail((err) => {
            _this.listViewFinished(list_view)
            console.log("fail==============");
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

    /**
     * 字段转换
     * @param metterRecord
     * @returns {*}
     */
    convertFieldName(metterRecord) {
        var item = null;
        if (typeof metterRecord !== 'object') return item;
        console.log("进来了");
        item = {
            "orderNumber": metterRecord['waybillId'],
            "status": metterRecord['abnoHandleStsy'],
            "questionType": metterRecord['abnormalTypeName'],
            "datetime": metterRecord['operatDate'],
            "images": metterRecord['pictures'] || [],
           /* "images": [{
                "id": "Vv3glCHRJyod0One",
                "name": "e797dc99-da63-4e7f-9167-650efb9c6cb6.jpg",
                "path": "Vv3glCHRJyod0One.jpg",
                "url": "https://yztfile.gz.bcebos.com/Vv3glCHRJyod0One.jpg"

            }],*/
            "description": metterRecord['describe'],
            "remark": metterRecord['resultDesc'],
            "id": metterRecord['id']
        }
        console.log(JSON.stringify(item));

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
        this.selectedItem = item;//动态更改数据
        this.queryData(page, xmlFileName, null);
        return this.currentTaskList;
    }

    getPictureResourcePath(groupName, exampleName) {
        if (app.ios) {
            return "res://chart/" + groupName + "/" + exampleName;
        }
        var resourcePath = "res://" + exampleName;
        return resourcePath;
    }

    getTaskType(type) {
        var obj = {
            "waiting_deal": "nohandle",
            "had_deal": "hashandle",
            "in_dealing": "handleing",
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
            new TaskTypeItem(false, "待处理", "waiting_deal","0"),
            new TaskTypeItem(false, "已处理", "had_deal","1"),
            new TaskTypeItem(false, "处理中", "in_dealing","2"),
            new TaskTypeItem(false, "全部", "all","3")
        ];
    }

    clearCache() {
        /* for (var i = 0; i < this._views.length; i++) {
         delete this._views[i];
         }
         this._views = {};*/
    };
}

module.exports = TaskDataModel;