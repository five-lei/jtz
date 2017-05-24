/**
 * Created by giscafer on 2017/3/16.
 */

var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var searchBarModule = require("ui/search-bar");
var Observable = require("data/observable").Observable;
var CommonUtil = require('../common/common-util');
var models = require("./search-task-view-model");
var searchTaskType = require('../common/search-task-type');

var searchBar = null,
    globalPage = null,
    dataLayout = null,
    selectedIndex = 0,
    searchType = '',
    searchText = '',
    cacheSelectedItem = null,
    newtask_list_view = null,
    maintenance_list_view = null,
    return_list_view = null,
    question_list_view = null;

var itemLoadMore;


//数据
var dataModel = new models.TaskDataModel();

var typeObj = searchTaskType.searchTaskTypeObj;

function SearchListPage() {

}
SearchListPage.prototype = new CommonUtil();
SearchListPage.prototype.constructor = SearchListPage;

SearchListPage.prototype.onBackTap = function (args) {
    topmost.navigate("views/task/index");
};

SearchListPage.prototype.pageNavigatingTo = function (args) {
    globalPage = args.object;
    var context = globalPage.navigationContext;


    //搜索相关
    searchBar = globalPage.getViewById('searchBar');
    dataLayout = globalPage.getViewById('data-layout');
    newtask_list_view = globalPage.getViewById('newtask_list_view');
    maintenance_list_view = globalPage.getViewById('maintenance_list_view');
    return_list_view = globalPage.getViewById('return_list_view');
    question_list_view = globalPage.getViewById('question_list_view');
    //查询关键字
    searchText = context.searchText || '';
    selectedIndex = context.selectedIndex;
    //搜索类型
    searchType = context.searchType || 'new-task';

    bindingTypeOptions(selectedIndex);

    //搜索值
    searchBar.text = searchText;

    dataLayout.bindingContext = dataModel.init(searchType);
    //默认选中
    var itemToLoad = dataLayout.bindingContext.barTypes[0];
    if (context != null) {
        var index = context.index || 0;
        // itemToLoad = context.barTypes[index];
    }
    setCacheSelectedItem(itemToLoad);
    loadItem(globalPage, itemToLoad, searchType);


    searchBar.on("focus", function (e) {
        console.log(324234)
    })
    searchBar.on(searchBarModule.SearchBar.submitEvent, function (args) {
        console.log("Search for " + args.object.text);
    });
    searchBar.on(searchBarModule.SearchBar.clearEvent, function (args) {
        console.log("Clear");
    });
};
/**
 * 缓存当前选中item对象
 * @param item
 */
function setCacheSelectedItem(item) {
    cacheSelectedItem = item;
}
/**
 * 绑定搜索类型下拉类别
 * @param selectedIndex
 */
function bindingTypeOptions(selectedIndex) {
    var data = {
        "selectedTypeIndex": selectedIndex,
        "typeOptions": searchTaskType.searchTaskTypeOptions
    }
    globalPage.bindingContext = new Observable(data);
}


/**
 * 下拉类型改变触发事件
 * @param arg
 */
SearchListPage.prototype.onItemIndexChange = function (arg) {
    var items = globalPage.bindingContext.get('typeOptions'),
        selectedItem = items[arg.index];
    selectedIndex = arg.index;
    searchType = typeObj[selectedItem];
    var barTypes = dataModel.changeSearchTypeInit(searchType);
    dataLayout.bindingContext.set("searchType", searchType);
    dataLayout.bindingContext.set("barTypes", barTypes);
    dataLayout.bindingContext.set("currentTaskList", []);
    setCacheSelectedItem(barTypes[0]);
    //自动选中和过滤第一个tab
    loadItem(globalPage, barTypes[0], searchType);
};
/**
 * 搜索按钮事件
 * @param args
 */
SearchListPage.prototype.tapSearchHandler = function (args) {
    loadItem(globalPage, cacheSelectedItem, searchType, searchBar.text);
};

/*var searchBar = new searchBarModule.SearchBar();
 searchBar.on(searchBarModule.SearchBar.submitEvent, function (args) {
 console.log("Search for " + args.object.text);
 });
 searchBar.on(searchBarModule.SearchBar.clearEvent, function (args) {
 console.log("Clear");
 });
 */

SearchListPage.prototype.onPullToRefreshInitiated = function (args) {
    var page = args.object;
    page.getViewById("task_list_view").notifyPullToRefreshFinished();
};
SearchListPage.prototype.onLoadMoreItemsRequested = function (args) {
    console.log('onLoadMoreItemsRequested')
    dataModel.onLoadMoreItemsRequested(args);
};

/**
 * 新任务任务详情
 */
SearchListPage.prototype.tapNewTaskDetail = function (args) {
    var type = args.object.type;
    var taskId = args.object.taskId;
    var navigationEntry = {
        moduleName: "views/task/task-detail/task-detail",
        context: {"taskType": type, "taskId": taskId},
        animated: true
    };
    topmost.navigate(navigationEntry);
};
/**
 * 维修任务 & 返货任务 任务详情
 */
SearchListPage.prototype.tapTaskDetail = function (args) {
    console.log('tapMRTaskDetail')
    var type = args.object.type;
    var taskId = args.object.taskId;
    var navigationEntry = {
        moduleName: "views/task/return-detail/return-detail",
        context: {"taskType": type, "taskId": taskId},
        animated: true
    };
    topmost.navigate(navigationEntry);
};


SearchListPage.prototype.rootGridLoaded = function (args) {
    var grid = args.object;
    if (grid.android) {
        var compat = android.support.v4.view.ViewCompat;
        if (compat.setElevation) {
            // Fix for the elevation glitch of the tab-view
            compat.setElevation(grid.android, 4 * utils.layout.getDisplayDensity());
        }
    }
}

function loadItem(page, item, searchType) {
    itemLoadMore = item;
    var taskListView = null;
    console.log('======searchType=' + searchType)
    switch (searchType) {
        case 'new-task':
            taskListView = newtask_list_view;
            break;
        case 'maintenance-task':
            taskListView = maintenance_list_view;
            break;
        case 'return-task':
            taskListView = return_list_view;
            break;
        case 'question-task':
            taskListView = question_list_view;
            break;
    }
    dataModel.loadGalleryFragment(taskListView, item, searchType, searchBar.text);
}
/**
 * 加载更多
 * @param page
 * @param item
 * @param xmlFileName
 */
SearchListPage.prototype.onLoadMoreItemsRequested = function (args) {
    var page = args.object.page;
    loadItem(page, itemLoadMore, searchType);
}

/**
 * 刷新
 * @param page
 * @param item
 * @param xmlFileName
 */
SearchListPage.prototype.pullToRefreshInitiated = function (args) {
    var page = args.object.page;
    loadItem(page, itemLoadMore, searchType);
}


SearchListPage.prototype.scrollViewLoaded = function (args) {
    if (args.object.android) {
        args.object.android.setHorizontalScrollBarEnabled(false);
    }
}

SearchListPage.prototype.repeaterItemTap = function (args) {
    var item = args.view.bindingContext;
    setCacheSelectedItem(item);
    var page = frameModule.topmost().currentPage;
    loadItem(page, item, searchType);
}


module.exports = new SearchListPage();