/**
 * Created by Administrator on 2017/3/24.
 */

/**
 * 任务首页
 * @type {[type]}
 */

var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var view = require("ui/core/view");
var models = require("./view-model");
var dialogsUtil = require("../../common/dialogsUtil");


//数据
var dataModel;

var BasePage = require("../../shared/BasePage");
var CommonUtil = require('./common/common-util');


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
    orderSideDrawer = null;//预约sidedrawer
var curSelectedItemIndex = 0;
var itemLoadMore; //加载
/**
 * 继承基类，获得菜单切换等方法
 */
TaskPage.prototype.menuNavigator = basePage.menuNavigator;

/**
 * 页面加载 pageNavigatingTo
 * @param args
 */

TaskPage.prototype.pageNavigatingTo = function (args) {
    var page = args.object.page;
    dataModel = new models.TaskDataModel();
    //临时存储对象，给filter-options页面使用
    page.dataModel = dataModel;
    page.bindingContext = dataModel.init();
    console.log("curSelectedItemIndex:" + curSelectedItemIndex);
    var itemToLoad = dataModel.barTypes[curSelectedItemIndex];
    itemLoadMore = itemToLoad;

    var context = page.navigationContext;
    /*首页点击跳转*/
    if (context != null) {
        var index = page.navigationContext.index || 0;
        itemToLoad = dataModel.barTypes[index];
        curSelectedItemIndex = index;
    }
    loadItem(page, itemToLoad);
}

/**
 * 离开页面事件
 * @param args
 */
TaskPage.prototype.pageNavigatingFrom = function (args) {
    var page = args.object;
    // page.bindingContext.clearCache();
}

/**
 * 页面加载 pageLoaded
 * @param args
 */
TaskPage.prototype.pageLoaded = function (args) {
    globalPage = args.object.page;
    orderSideDrawer = view.getViewById(globalPage, "orderSideDrawer");
}

/**
 * 提醒按钮事件
 */
TaskPage.prototype.tapAlarmHandler = function () {
    topmost.navigate("views/task/remind_order/remind_order");
};
/**
 * 搜索按钮事件
 */
TaskPage.prototype.tapSearchHandler = function () {
    topmost.navigate("views/task/search/search");
};

/**
 * 任务详情
 */

TaskPage.prototype.tapNewTaskDetail = function (args) {
    var type = args.object.type;
    if(type==='cancelled'){
        dialogsUtil.alert('取消订单无法查看详情！');
        return;
    }
    var taskId = args.object.taskId;
    var curPage = args.object.curPage;
    console.log("curPage:"+curPage);
    var navigationEntry = {
        moduleName: "views/task/task-detail/task-detail",
        context: {"taskType": type, "taskId": taskId, "curPage": curPage},
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
    //控制不能多次点击一个tab
    if (page.curttabName == item.xmlFileName) {
        return;
    }
    page.curttabName = item.xmlFileName;
    dataModel.loadGalleryFragment(page, item, item.xmlFileName);
}

TaskPage.prototype.scrollViewLoaded = function (args) {
    if (args.object.android) {
        args.object.android.setHorizontalScrollBarEnabled(false);
    }
}

TaskPage.prototype.repeaterItemTap = function (args) {
    var obj = args.object;
    var item = args.view.bindingContext;
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(obj.tabIndex);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~');
    curSelectedItemIndex = obj.tabIndex;
    var page = frameModule.topmost().currentPage;
    //清楚过滤条件
    page.screen = "";
    loadItem(page, item);
}

/*加载更多*/
TaskPage.prototype.onLoadMoreItemsRequested = function (args) {

    dataModel.onLoadMoreItemsRequested(args, itemLoadMore, itemLoadMore.xmlFileName);
};
/*刷新*/
TaskPage.prototype.pullToRefreshInitiated = function (args) {
    dataModel.pullToRefreshInitiated(args, itemLoadMore, itemLoadMore.xmlFileName);
};
module.exports = new TaskPage();
