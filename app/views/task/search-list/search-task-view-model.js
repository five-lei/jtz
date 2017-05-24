'use strict'

var observable = require("data/observable");
var app = require("application");
var listViewModule =require("nativescript-telerik-ui-pro/listview");
var timer = require("timer");

var ObservableArray = require("data/observable-array").ObservableArray;

var posts = require("../../../test/data/task.json");
var TaskTypeItem=require('../common/task-type-item');
var api=require('../../../shared/api');
var config=require('../../../shared/config');

var NewTaskDataModel=require('../view-model').TaskDataModel;
var MaintanceTaskModel=require('../maintenance-task/maintenance-task-view-model');
var ReturnTaskModel=require('../return-task/return-task-view-model');
var QuestionTaskModel=require('../question-list/question-list-view-model');

/*var newTaskModel=null,
    maintanceTaskModel=null,
    returnTaskModel=null;*/

/**
 * 问题件搜索接口：matterRecordController.matterRecordFind
 * 新任务:taskInstallController.findAppTaskInstall
 * 维修任务：aftermarketTaskController.repairDispatchList
 * 返货任务：aftermarketTaskController.returnDispatchList
 */

class TaskDataModel extends observable.Observable {
    constructor(useCache) {
        super();
        this._useCache = useCache;
        this._numberOfAddedItems = 0;
        this._taskTypeImages = null;
        this.pageIndex = 0;//当前分页
        //新任务
        this._newTaskbarTypes=[];
        //维修任务
        this._maitanceTaskbarTypes=[];
        //返货任务
        this._returnTaskbarTypes=[];
        //问题件
        this._questionListBarTypes=[];

        //实例对象
        this.newTaskModel=null;
        this.returnTaskModel=null;
        this.maintanceTaskModel=null;
        this.questionTaskModel=null;
    }

    /**
     *
     * @param type 任务类型 | 问题件类型
     * @param searchText  搜索条件：运单号、发货人姓名、发货人手机号码
     * @param searchSwitch 搜索tab标签切换 true/false
     * @param pageIndex 查询分页，搜索页面调用
     */
    searchTaskList(page,taskType,searchType,searchText,searchSwitch) {
        console.log('page=',page)
        switch (searchType){
            case 'new-task':
                if(!this.newTaskModel){
                    this.newTaskModel=new NewTaskDataModel();
                }
                this.newTaskModel.queryData(page,taskType,searchText,searchSwitch,this.pageIndex);
                break;
            case 'return-task':
                if(!this.returnTaskModel){
                    this.returnTaskModel=new ReturnTaskModel();
                }
                this.returnTaskModel.getTaskList(page,taskType,searchText,searchSwitch,this.pageIndex);
                break;
            case 'maintenance-task':
                if(!this.maintanceTaskModel){
                    this.maintanceTaskModel=new MaintanceTaskModel();
                }
                this.maintanceTaskModel.getTaskList(page,taskType,searchText,searchSwitch,this.pageIndex);
                break;
            case 'question-task':
                if(!this.questionTaskModel){
                    this.questionTaskModel=new QuestionTaskModel();
                }
                this.questionTaskModel.queryData(page,taskType,searchText,searchSwitch,this.pageIndex);
                break;
        }

    }

    /**
     *
     * 初始化数据
     * @param searchType
     * @returns {"data/observable".Observable}
     */
    init(searchType) {
        var data = {
            "searchType": searchType,
            "currentTaskList": [],
            "barTypes": this.getBarTypes(searchType)
        };
        return new observable.Observable(data);
    }
    /**
     * 类型改变tab
     * @param searchType
     * @returns {*}
     */
    changeSearchTypeInit(searchType) {
        this.pageIndex = 0;
        var barTypes=this.getBarTypes(searchType);
        // var barTypes = new ObservableArray(barTypes);
        return barTypes;
    }
    /**
     * 初始化tab页
     * @param searchType 查询类型（新任务、维修、返货）
     * @returns {*}
     */
    getBarTypes(searchType) {

        switch (searchType){
            case 'new-task':
                if (this._newTaskbarTypes && this._newTaskbarTypes.length) {
                    return this._newTaskbarTypes;
                }
                return this._newTaskbarTypes = [
                    new TaskTypeItem(false, "待接单", "waiting_list"),
                    new TaskTypeItem(false, "待预约", "waiting_appointment"),
                    new TaskTypeItem(false, "待提货", "waiting_pickup"),
                    new TaskTypeItem(false, "待签收", "waiting_sign_for"),
                    new TaskTypeItem(false, "已签收", "had_sign_for"),
                    new TaskTypeItem(false, "已取消", "cancelled"),
                    new TaskTypeItem(false, "全部", "all")
                ];
                break;
            case 'return-task':
                if (this._returnTaskbarTypes && this._returnTaskbarTypes.length) {
                    return this._returnTaskbarTypes;
                }
                return this._returnTaskbarTypes = [
                    new TaskTypeItem(false, "待受理", "return_waiting_list"),
                    new TaskTypeItem(false, "待提货", "return_waiting_pickup"),
                    new TaskTypeItem(false, "待签收", "return_waiting_sign_for"),
                    new TaskTypeItem(false, "已完成", "return_finish")
                ];
                break;
            case 'maintenance-task':
                if (this._maitanceTaskbarTypes && this._maitanceTaskbarTypes.length) {
                    return this._maitanceTaskbarTypes;
                }
                return this._maitanceTaskbarTypes = [
                    new TaskTypeItem(false, "待受理", "maintenance_waiting_list"),
                    new TaskTypeItem(false, "待预约", "maintenance_waiting_appointment"),
                    new TaskTypeItem(false, "待签收", "maintenance_waiting_sign_for"),
                    new TaskTypeItem(false, "已完成", "maintenance_finish")
                ];
                break;
            case 'question-task':
                if (this._questionListBarTypes && this._questionListBarTypes.length) {
                    return this._questionListBarTypes;
                }
                return this._questionListBarTypes = [
                    new TaskTypeItem(false, "全部", "all"),
                    new TaskTypeItem(false, "待处理", "waiting_deal"),
                    new TaskTypeItem(false, "已处理", "had_deal"),
                    new TaskTypeItem(false, "处理中", "in_dealing")
                ];
        }

    }

    /**
     * 初始化任务图标对象
     */
    getImageTypes() {
        if (this._taskTypeImages) {
            return this._taskTypeImages;
        }
        return this._taskTypeImages = {
            //新任务

            "waiting_list": "res://xin2x",
            "waiting_sign_for": "res://qian2x",
            "waiting_pickup": "res://tihuo2x",
            "waiting_appointment": "res://yu2x",
            "had_sign_for": "res://yiancheng",
            "cancelled": "res://xin_qu",
            //返货
            "return_waiting_list": "res://xin2x",
            "return_waiting_sign_for": "res://qian2x",
            "return_waiting_pickup": "res://tihuo2x",
            "return_finish": "res://yiancheng",
            //维修
            "maintenance_waiting_list": "res://xin2x",
            "maintenance_waiting_appointment": "res://qian2x",
            "maintenance_waiting_sign_for": "res://yu2x",
            "maintenance_finish": "res://yiancheng",
        };
    }


    // << listview-load-on-demand-handler
    loadGalleryFragment(page,item,searchType,searchText) {
        var searchSwitch=true;
        if (this.selectedItem) {
            this.selectedItem.isSelected = false;
        }
        if (this.selectedItem) {
            this.selectedItem.isSelected = false;
            this.preSelectedItem = this.selectedItem;//存储上一次点击的tab
            if (item.xmlFileName != this.preSelectedItem.xmlFileName) {
                this.pageIndex = 0;//第一页
                searchSwitch=true;
            }else{
                //累计分页数
                this.pageIndex++;
                searchSwitch=false;
            }
        }
        item.isSelected = true;
        this.selectedItem = item;//存储当前tab
        //动态更改数据
        this.searchTaskList(page,item.xmlFileName,searchType,searchText,searchSwitch);
        console.log("~tab类型~~ " + item.xmlFileName);
        console.log("~搜索类型~~ " + searchType);
        console.log("~搜索关键字~~ " + searchText);
    }

    getPictureResourcePath(groupName, exampleName) {
        if (app.ios) {
            return "res://chart/" + groupName + "/" + exampleName;
        }
        var resourcePath = "res://" + exampleName;
        return resourcePath;
    }
}

exports.TaskDataModel = TaskDataModel;
