var utils = require("utils/utils");
var models = require("./history-task-modal");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var condition = [];
var itemLoadMore;
var curSelectedItemIndex = 0;
//数据
var dataModel;

var BasePage = require("../../../shared/BasePage");
var CommonUtil = require('../common/common-util');


var basePage = new BasePage();

/**
 * 继承通用类
 */

var TaskPage = function () {
};
TaskPage.prototype = new CommonUtil();
TaskPage.prototype.constructor = TaskPage;

/**
 * 继承基类，获得菜单切换等方法
 */
TaskPage.prototype.menuNavigator = basePage.menuNavigator;


var had_sign_for = null,
    maintenance_list_view = null,
    return_list_view = null;
TaskPage.prototype.pageNavigatingTo = function (args) {
    dataModel = new models.TaskDataModel();
    var page = args.object.page;
    had_sign_for = page.getViewById('had_sign_for');
    maintenance_list_view = page.getViewById('maintenance_list_view');
    return_list_view = page.getViewById('return_list_view');

    var context = page.navigationContext || {};
    condition = context.condition;

    /*  had_sign_for.bindingContext = new Observable({
     "currentTaskList": []
     });
     maintenance_list_view.bindingContext=new Observable({
     "currentTaskList": []
     });
     return_list_view.bindingContext=new Observable({
     "currentTaskList": []
     });*/
    page.bindingContext = dataModel.init();

    var itemToLoad = dataModel.barTypes[curSelectedItemIndex];
    console.log("itemToLoad:" + itemToLoad);
    itemLoadMore = itemToLoad;
    loadItem(page, itemToLoad, condition);
}


TaskPage.prototype.pageNavigatingFrom = function (args) {
    var page = args.object;
    // page.bindingContext.clearCache();
}


TaskPage.prototype.tapTaskDetail = function (args) {
    var type = args.object.type;
    var taskId = args.object.taskId;
    var curPage = args.object.curPage;
    var navigationEntry;
    //新任务
    if (type == "distributionWaitAccept") {
        navigationEntry = {
            moduleName: "views/task/task-detail/task-detail",
            context: {"taskType": "had_sign_for", "taskId": taskId, "curPage": curPage},
        };
    }
    //维修详情
    if (type == "accepted") {
        navigationEntry = {
            moduleName: "views/task/return-detail/return-detail",
            context: {"taskType": "maintenance_finish", "taskId": taskId, "curPage": curPage},
        };
    }
    //返货详情
    if (type == "waitPickUp") {
        navigationEntry = {
            moduleName: "views/task/return-detail/return-detail",
            context: {"taskType": "return_finish", "taskId": taskId, "curPage": curPage},
        };
    }
    try {
        topmost.navigate(navigationEntry);
    } catch (e) {

    }
};


TaskPage.prototype.rootGridLoaded = function (args) {
    var grid = args.object;
    if (grid.android) {
        var compat = android.support.v4.view.ViewCompat;
        if (compat.setElevation) {
            // Fix for the elevation glitch of the tab-view
            compat.setElevation(grid.android, 4 * utils.layout.getDisplayDensity());
        }
    }
}

function loadItem(page, item, condition) {
    itemLoadMore = item;
    var listViewObj = null;
    switch (item.xmlFileName) {
        case 'had_sign_for':
            listViewObj = had_sign_for;
            break;
        case 'maintenance_finish':

            listViewObj = maintenance_list_view;
            break;
        case 'return_finish':
            listViewObj = return_list_view;
            break;
    }
    dataModel.loadGalleryFragment(listViewObj, item, condition);
}


TaskPage.prototype.scrollViewLoaded = function (args) {
    if (args.object.android) {
        args.object.android.setHorizontalScrollBarEnabled(false);
    }
}

TaskPage.prototype.repeaterItemTap = function (args) {
    var tabIndex = args.object.tabIndex;
    curSelectedItemIndex = tabIndex;
    var item = args.view.bindingContext;
    var page = frameModule.topmost().currentPage;
    loadItem(page, item, condition);
}

TaskPage.prototype.filterTap = function (args) {
    topmost.navigate("views/task/history-task-filter/history-task-filter");
};

TaskPage.prototype.onBackTap = function (args) {
    curSelectedItemIndex = 0;
    topmost.navigate("views/my/index");
};


/**
 * 加载更多
 */
TaskPage.prototype.onLoadMoreItemsRequested = function (args) {
    dataModel.onLoadMoreItemsRequested(args, itemLoadMore, itemLoadMore.xmlFileName);
};
/**
 * 刷新
 */
TaskPage.prototype.pullToRefreshInitiated = function (args) {
    dataModel.pullToRefreshInitiated(args, itemLoadMore, itemLoadMore.xmlFileName);
};

module.exports = new TaskPage();

