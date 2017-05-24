/**
 * Created by giscafer on 2017/3/16.
 */
var cache = require("nativescript-cache");
var topmost = require("ui/frame").topmost;
var Observable = require("data/observable").Observable;
var navigator = require('../../../common/navigator');

var searchTaskType = require('../common/search-task-type');

var globalPage = null;
var searchBar = null;
//识别是从哪个页面过来的，做搜索区分
var type = null;
var selectedIndex = 0;

var typeObj = searchTaskType.searchTaskTypeObj;

exports.pageLoaded = function (args) {
    globalPage = args.object.page;
    var taskSearchHistory = cache.get("taskSearchHistory") || "[]";
    var taskSearchHistoryList = JSON.parse(taskSearchHistory);
    type = globalPage.navigationContext && globalPage.navigationContext.searchType || 'new-task';
    selectedIndex = globalPage.navigationContext && globalPage.navigationContext.selectedTypeIndex || 0;

    var data = {
        "selectedTypeIndex": selectedIndex,
        "typeOptions": searchTaskType.searchTaskTypeOptions,
        "taskSearchHistoryList": taskSearchHistoryList
    }
    globalPage.bindingContext = new Observable(data);
    searchBar = globalPage.getViewById('searchBar');

};
exports.onBackTap = function (args) {
    if (searchBar.android) {
        searchBar.android.clearFocus();
    }
    topmost().goBack();
};

exports.tapDelSearchHostory = function (args) {
    cache.set("taskSearchHistory", "[]");
    globalPage.bindingContext.taskSearchHistoryList = [];
    console.log('删除历史搜索记录');
};

exports.tapSearchHandler = function (args) {
    var taskSearchHistory = cache.get("taskSearchHistory") || "[]";
    var taskSearchHistoryList = JSON.parse(taskSearchHistory);
    var searchText = searchBar.text;
    if (searchText) {
        taskSearchHistoryList.push({"item": searchText});
        var result=[];
        var obj={};
        //去重
        for(var i=0;i<taskSearchHistoryList.length;i++){
            var temp=taskSearchHistoryList[i];
            if(temp['item']!='' && obj[temp['item']]!=1){
                obj[temp['item']]=1;
                result.push(temp);
            }
        }
        taskSearchHistoryList=result;
    }

    var cacheString = JSON.stringify(taskSearchHistoryList);
    cache.set("taskSearchHistory", cacheString);
    // globalPage.bindingContext.taskSearchHistoryList=taskSearchHistoryList;
    //跳转搜索展示页
    goToSearchList(type, searchText);

};

/**
 * 搜索类型
 * @param type
 * @returns {*}
 */
function getOptionType(type) {
    return typeObj[type]
}
/**
 * 下拉类型改变
 * @param arg
 */
exports.onItemIndexChange = function (arg) {
    var items = globalPage.bindingContext.get('typeOptions'),
        selectedItem = items[arg.index];
    selectedIndex = arg.index;
    type = getOptionType(selectedItem);
}

/**
 * 搜索列表
 * @param type 'new-task' || 'maintenance-task' || 'return-task' || 'question-list'
 * @param searchText
 */
function goToSearchList(type, searchText) {
    var navigationEntry = {
        moduleName: "views/task/search-list/search-list",
        context: {
            "searchType": type,
            "selectedIndex": selectedIndex,
            "searchText": searchText
        },
        animated: true
    };
    topmost().navigate(navigationEntry);
}

exports.hisItemSearchTap=function(args){
    var searchText=args.object.text;
    //跳转搜索展示页
    goToSearchList(type, searchText);

};

