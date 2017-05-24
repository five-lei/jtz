
/**
 * 任务-未到货
 * @type {[type]}
 */

var TaskViewModel = require("./arrival-task-modal");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var view = require("ui/core/view");

var BasePage = require("../../../shared/BasePage");
var CommonUtil = require('../common/common-util');


var basePage= new BasePage();

/**
 * 继承通用类
 */

var ArrivalTaskPage = function () {
};
ArrivalTaskPage.prototype = new CommonUtil();
ArrivalTaskPage.prototype.constructor = ArrivalTaskPage;

/**
 *
 */
var globalPage = null,//页面对象
    orderSideDrawer = null, //预约sidedrawer
    collapseInfoPanel = null; //折叠隐藏panel
/**
 * 继承基类，获得菜单切换等方法
 */
ArrivalTaskPage.prototype.menuNavigator = basePage.menuNavigator;

/**
 * 页面加载
 * @param args
 */

ArrivalTaskPage.prototype.pageNavigatingTo=function(args) {
    var page = args.object;
    page.bindingContext = new TaskViewModel().init();

}
ArrivalTaskPage.prototype.pageLoaded = function (args) {
    globalPage = args.object;
    orderSideDrawer = view.getViewById(globalPage, "orderSideDrawer");
}

/**
 * 提醒按钮事件
 */
ArrivalTaskPage.prototype.tapAlarmHandler = function () {
    topmost.navigate("views/task/questionList/questionList");
};
/**
 * 搜索按钮事件
 */
ArrivalTaskPage.prototype.tapSearchHandler = function () {
    topmost.navigate("views/task/search/search");
};

/**
 * 任务详情
 */

ArrivalTaskPage.prototype.tapTaskDetail = function (args) {
    var type=args.object.type;
    var navigationEntry = {
        moduleName: "views/task/task-detail/task-detail",
        context: {"taskType": type},
        animated: true
    };
    console.log('taskType:  '+type);
    topmost.navigate(navigationEntry);
};

/**
 * 展开详情信息
 * @param args
 */
ArrivalTaskPage.prototype.toggleCollapsePanel = function (args) {
    var page = args.object;
    var parentPage = page.parent;
    var collapseWidget = parentPage.getViewById("collapse-widget");
    var collapseInfoPanel = parentPage.getViewById("collapseInfoPanel");
    page.collapseFlag = !page.collapseFlag;
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



module.exports = new ArrivalTaskPage();