/**
 * Created by giscafer on 2017/3/24.
 */

/**
 * 维修任务首页
 * @type {Fucntion}
 */

// var TaskViewModel = require("./view-model-android");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var view = require("ui/core/view");

var BasePage = require("../../../shared/BasePage");
var CommonUtil = require('../common/common-util');

var TaskDataModel = require("./maintenance-task-view-model");
//数据
var dataModel;

var basePage = new BasePage();

/**
 * 继承通用类
 */

var TaskPage = function () {
};
TaskPage.prototype = new CommonUtil();
TaskPage.prototype.constructor = TaskPage;

/**
 *
 */
var globalPage = null,//页面对象
    orderSideDrawer = null; //预约sidedrawer
var curSelectedItemIndex = 0;
var itemLoadMore; //加载
/**
 * 继承基类，获得菜单切换等方法
 */
TaskPage.prototype.menuNavigator = basePage.menuNavigator;

/**
 * 页面加载
 * @param args
 */

TaskPage.prototype.pageNavigatingTo = function (args) {
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
TaskPage.prototype.pageLoaded = function (args) {
    globalPage = args.object;
    orderSideDrawer = view.getViewById(globalPage, "orderSideDrawer");
}


/**
 * 搜索按钮事件
 */
TaskPage.prototype.tapSearchHandler = function () {

    var navigationEntry = {
        moduleName: "views/task/search/search",
        context: {
            "searchType": "maintenance-task",
            "selectedTypeIndex":1
        },
        animated: true
    };
    topmost.navigate(navigationEntry);
};

/**
 * 维修-详情
 */

TaskPage.prototype.tapTaskDetail = function (args) {
    var type = args.object.type;
    var taskId = args.object.taskId;
    var curPage = args.object.curPage;
    var navigationEntry = {
        moduleName: "views/task/return-detail/return-detail",
        context: {"taskType": type,
                  "taskId": taskId,
                  "curPage": curPage,
                },
        animated: true
    };

    topmost.navigate(navigationEntry);
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

function loadItem(page, item) {
    itemLoadMore = item;
    dataModel.loadGalleryFragment(page,item, item.xmlFileName);
}


TaskPage.prototype.scrollViewLoaded = function (args) {
    if (args.object.android) {
        args.object.android.setHorizontalScrollBarEnabled(false);
    }
}

TaskPage.prototype.repeaterItemTap = function (args) {
    var obj = args.object;
    curSelectedItemIndex = obj.tabIndex;
    var item = args.view.bindingContext;
    var page = frameModule.topmost().currentPage;
    loadItem(page, item);
}

/*加载更多*/
TaskPage.prototype.onLoadMoreItemsRequested = function (args) {
    dataModel.onLoadMoreItemsRequested(args,itemLoadMore,itemLoadMore.xmlFileName);
};
/*刷新*/
TaskPage.prototype.onPullToRefreshInitiated = function (args) {
    dataModel.pullToRefreshInitiated(args,itemLoadMore,itemLoadMore.xmlFileName);
};
module.exports = new TaskPage();