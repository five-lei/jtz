/**
 * Created by Administrator on 2017/3/24.
 */

/**
 * 返货任务首页
 * @type {[type]}
 */


var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var view = require("ui/core/view");

var BasePage = require("../../../shared/BasePage");
var CommonUtil = require('../common/common-util');

var TaskDataModel = require("./return-task-view-model");
//数据
var dataModel;

var basePage = new BasePage();

var ReturnTaskPage = function () {
};
/**
 * 继承通用类
 */
ReturnTaskPage.prototype = new CommonUtil();
ReturnTaskPage.prototype.constructor = ReturnTaskPage;

/**
 *
 */
var globalPage = null,//页面对象
    orderSideDrawer = null, //预约sidedrawer
    collapseInfoPanel = null; //折叠隐藏panel
var curSelectedItemIndex = 0;
var itemLoadMore; //加载
/**
 * 继承基类，获得菜单切换等方法
 */
ReturnTaskPage.prototype.menuNavigator = basePage.menuNavigator;

/**
 * 页面加载
 * @param args
 */

ReturnTaskPage.prototype.pageNavigatingTo = function (args) {
    dataModel = new TaskDataModel();
    var page = args.object;
    page.bindingContext = dataModel.init();
    //默认选中
    var itemToLoad = dataModel.barTypes[curSelectedItemIndex];
    itemLoadMore = itemToLoad;
    var context = page.navigationContext;
    if (context != null) {
        var index = page.navigationContext.index || 0;
        itemToLoad = dataModel.barTypes[index];
        curSelectedItemIndex = index;
    }
    loadItem(page, itemToLoad);
}

ReturnTaskPage.prototype.pageLoaded = function (args) {
    globalPage = args.object;
    orderSideDrawer = view.getViewById(globalPage, "orderSideDrawer");
}

/**
 * 提醒按钮事件
 */
ReturnTaskPage.prototype.tapAlarmHandler = function () {
    topmost.navigate("views/task/questionList/questionList");
};
/**
 * 搜索按钮事件
 */

ReturnTaskPage.prototype.tapSearchHandler = function () {

    var navigationEntry = {
        moduleName: "views/task/search/search",
        context: {
            "searchType": "return-task",
            "selectedTypeIndex":2
        },
        animated: true
    };
    topmost.navigate(navigationEntry);
};

/**
 * 返货详情
 */

ReturnTaskPage.prototype.tapTaskDetail = function (args) {
    var type = args.object.type;
    var taskId = args.object.taskId;
    var curPage = args.object.curPage;
    var navigationEntry = {
        moduleName: "views/task/return-detail/return-detail",  
        context: {
            "taskType": type,
            "taskId": taskId,
            "curPage": curPage,
        },
        animated: true
    };
    console.log('taskType:  ' + type);
    console.log("taskId: " + taskId);
    //this.getReturnDetails(taskId);
    topmost.navigate(navigationEntry);
};

/*刷新*/
ReturnTaskPage.prototype.onPullToRefreshInitiated = function (args) {
    dataModel.pullToRefreshInitiated(args,itemLoadMore,itemLoadMore.xmlFileName);
};

/*加载更多*/
ReturnTaskPage.prototype.onLoadMoreItemsRequested = function (args) {
    dataModel.onLoadMoreItemsRequested(args,itemLoadMore,itemLoadMore.xmlFileName);
};


ReturnTaskPage.prototype.rootGridLoaded = function (args) {
    var grid = args.object;
    if (grid.android) {
        var compat = android.support.v4.view.ViewCompat;
        if (compat.setElevation) {
            // Fix for the elevation glitch of the tab-view
            compat.setElevation(grid.android, 4 * utils.layout.getDisplayDensity());
        }
    }
}

function loadItem(page, item) {
    itemLoadMore = item;
    dataModel.loadGalleryFragment(page,item, item.xmlFileName);
}


ReturnTaskPage.prototype.scrollViewLoaded = function (args) {
    if (args.object.android) {
        args.object.android.setHorizontalScrollBarEnabled(false);
    }
}

ReturnTaskPage.prototype.repeaterItemTap = function (args) {
    var obj = args.object;
    curSelectedItemIndex = obj.tabIndex;
    var item = args.view.bindingContext;
    var page = frameModule.topmost().currentPage;
    loadItem(page, item);
}

module.exports = new ReturnTaskPage();