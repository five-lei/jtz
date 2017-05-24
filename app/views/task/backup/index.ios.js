/**
 * Created by Administrator on 2017/3/24.
 */

/**
 * 任务首页
 * @type {[type]}
 */

var utils = require("utils/utils");
var models = require("./view-model-ios");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var view = require("ui/core/view");


/**
 * 继承基类，获得菜单切换等方法
 */
var BasePage = require("../../shared/BasePage");
var TaskPage = function () {
};
TaskPage.prototype = new BasePage();
TaskPage.prototype.constructor = TaskPage;
/**
 *
 */
var globalPage = null,//页面对象
    collapseWidget = null, //折叠图标
    orderSideDrawer = null, //预约sidedrawer
    collapseInfoPanel = null; //折叠隐藏panel

/**
 * 页面加载
 * @param args
 */

/*TaskPage.prototype.pageNavigatingTo = function (args) {
 var page = args.object;
 page.bindingContext = new taskViewModel.ListViewLayoutsModel();
 }*/
TaskPage.prototype.pageLoaded = function (args) {
    globalPage = args.object;
    orderSideDrawer = view.getViewById(globalPage, "orderSideDrawer");
}

/**
 * 提醒按钮事件
 */
TaskPage.prototype.tapAlarmHandler = function () {
    topmost.navigate("views/task/questionList/questionList");
};
/**
 * 搜索按钮事件
 */
TaskPage.prototype.tapSearchHandler = function () {
    topmost.navigate("views/task/search/search");
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


function rootGridLoaded(args) {
    var grid = args.object;
    if (grid.android) {
        var compat = android.support.v4.view.ViewCompat;
        if (compat.setElevation) {
            // Fix for the elevation glitch of the tab-view
            compat.setElevation(grid.android, 4 * utils.layout.getDisplayDensity());
        }
    }
}
TaskPage.prototype.rootGridLoaded = rootGridLoaded;
function loadItem(page, item) {
    var dataModel = page.bindingContext;
    dataModel.loadGalleryFragment(item, "~/views/task/task-tabs", item.xmlFileName);
}
var dataModel = new models.TaskDataModel();
function pageNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = dataModel;
    var itemToLoad = dataModel.barTypes[0];
    loadItem(page, itemToLoad);
}
TaskPage.prototype.pageNavigatingTo = pageNavigatingTo;
function pageNavigatingFrom(args) {
    var page = args.object;
    page.bindingContext.clearCache();
}
TaskPage.prototype.pageNavigatingFrom = pageNavigatingFrom;
function scrollViewLoaded(args) {
    if (args.object.android) {
        args.object.android.setHorizontalScrollBarEnabled(false);
    }
}
TaskPage.prototype.scrollViewLoaded = scrollViewLoaded;
function repeaterItemTap(args) {
    var item = args.view.bindingContext;
    var page = frameModule.topmost().currentPage;
    loadItem(page, item);
}
TaskPage.prototype.repeaterItemTap = repeaterItemTap;

TaskPage.prototype.toggleCollapsePanel = function (args) {
    var obj = args.object;
    if(obj.id==='callToConsignee'){
        console.log('callToConsignee')
        return;
    }
    console.log(obj.id)
    var parentPage = obj.parent;
    var collapseWidget = parentPage.getViewById("collapse-widget");
    var collapseInfoPanel = parentPage.getViewById("collapseInfoPanel");
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

module.exports = new TaskPage();