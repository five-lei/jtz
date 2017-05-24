/**
 * Created by Administrator on 2017/3/24.
 */

/**
 * 任务首页
 * @type {[type]}
 */

var TaskViewModel = require("./view-model-android");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var view = require("ui/core/view");
var index;
var context;

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
    orderSideDrawer = null, //预约sidedrawer
    collapseInfoPanel = null; //折叠隐藏panel
/**
 * 继承基类，获得菜单切换等方法
 */
TaskPage.prototype.menuNavigator = basePage.menuNavigator;

/**
 * 页面加载
 * @param args
 */

TaskPage.prototype.pageNavigatingTo = function (args) {
    var page = args.object;
    page.bindingContext = new TaskViewModel().init();
    var context = page.navigationContext;
    var tab = page.getViewById("tab");
    if (context != null) {
        index = page.navigationContext.index;
        tab.selectedIndex = index;
    }
}
TaskPage.prototype.pageLoaded = function (args) {
    globalPage = args.object;
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

TaskPage.prototype.tapTaskDetail = function (args) {
    var type = args.object.type;
    var navigationEntry = {
        moduleName: "views/task/task-detail/task-detail",
        context: {"taskType": type},
        animated: true
    };
    console.log('taskType:  ' + type);
    topmost.navigate(navigationEntry);
};

/**
 * 展开详情信息
 * @param args
 */
TaskPage.prototype.toggleCollapsePanel = function (args) {
    var obj = args.object;
    var id=obj.id.replace('_toggle','');
    var currentTask = globalPage.getViewById(id);
    var collapseWidget = currentTask.getViewById("collapse-widget");
    var collapseInfoPanel = currentTask.getViewById("collapseInfoPanel");
    obj.collapseFlag = !obj.collapseFlag;
    //通过更改visibility属性折叠
    if (collapseInfoPanel.visibility !== 'collapse') {
        collapseInfoPanel.visibility = "collapse";
        collapseWidget.visibility = "visible";
    } else {
        collapseInfoPanel.visibility = "visible";
        collapseWidget.visibility = "collapse";
    }
};
//test
/*var enums = require("ui/enums");


 var searchBar = new searchBarModule.SearchBar();
 searchBar.on(searchBarModule.SearchBar.submitEvent, function (arg) {
 console.log("Search for " + (args.object).text);
 });
 searchBar.on(searchBarModule.SearchBar.clearEvent, function (args) {
 console.log("Clear");
 });*/


module.exports = new TaskPage();