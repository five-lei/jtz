var frame = require("ui/frame");
var viewModel = require("./overtime-view-model").TaskDataModel;
var CommonUtil = require('../common/common-util');
var BasePage = require("../../../shared/BasePage");

var models;
var thisPage = null;

function OverTimeOrder() {

}

OverTimeOrder.prototype = new CommonUtil();

OverTimeOrder.constructor = OverTimeOrder;

OverTimeOrder.prototype.loaded = function (args) {
    models = new viewModel();
    thisPage = args.object.page;
    //保存models给filter-option页面使用
    thisPage.dataModels = models;
    thisPage.type = 'all';
    thisPage.bindingContext = models.init();
    models.queryData(thisPage, null, 'all');
};


OverTimeOrder.prototype.onBackTap = function (args) {
    var topmost = frame.topmost();
    var navigationEntry = {
        moduleName: "views/index/index",
        animated: true
    };
    topmost.navigate(navigationEntry);
};

/**
 * 任务详情
 */

OverTimeOrder.prototype.tapNewTaskDetail = function (args) {
    var topmost = frame.topmost();
    var type = args.object.type;
    var taskId = args.object.taskId;
    var curPage = args.object.curPage;
    var navigationEntry = {
        moduleName: "views/task/task-detail/task-detail",
        context: {"taskType": type, "taskId": taskId, "curPage": curPage},
        animated: true
    };
    topmost.navigate(navigationEntry);
};

/**
 * 加载更多
 */
OverTimeOrder.prototype.onLoadMoreItemsRequested = function (args) {
    models.onLoadMoreItemsRequested(args);
};
/**
 * 刷新
 */
OverTimeOrder.prototype.pullToRefreshInitiated = function (args) {
    models.pullToRefreshInitiated(args);
};

module.exports = new OverTimeOrder();

