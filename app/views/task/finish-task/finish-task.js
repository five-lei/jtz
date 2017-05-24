

var utils = require("utils/utils");
var models = require("./finish-task-modal");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var view = require("ui/core/view");


//数据
var dataModel = new models.TaskDataModel();

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


TaskPage.prototype.pageNavigatingTo = function (args) {
    var page = args.object;
    // console.log(dataModel.getBarTypes());
    page.bindingContext = dataModel.init();
    var itemToLoad = dataModel.barTypes[0];
    loadItem(page, itemToLoad);
}


TaskPage.prototype.pageNavigatingFrom = function (args) {
    var page = args.object;
    // page.bindingContext.clearCache();
}


TaskPage.prototype.tapTaskDetail = function (args) {
    var type = args.object.type;
    var navigationEntry;
    if (type == "had_sign_for"){
        navigationEntry = {
            moduleName: "views/task/task-detail/task-detail",
            context: {"taskType": type},
        };
    }
    if (type == "maintenance_finish"){
        navigationEntry = {
            moduleName: "views/task/return-detail/return-detail",
            context: {"taskType": type},
        };
    }
    if (type == "return_finish"){
       navigationEntry = {
            moduleName: "views/task/return-detail/return-detail",
            context: {"taskType": type},
        };
    }
    console.log('taskType:  ' + type);
    topmost.navigate(navigationEntry);
};


TaskPage.prototype.rootGridLoaded=function(args) {
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
    page.bindingContext.currentTaskList = dataModel.loadGalleryFragment(item, item.xmlFileName);
    // console.log(page.bindingContext.currentTaskList.length)
}



TaskPage.prototype.scrollViewLoaded = function (args) {
    if (args.object.android) {
        args.object.android.setHorizontalScrollBarEnabled(false);
    }
}

TaskPage.prototype.repeaterItemTap = function (args) {
    var item = args.view.bindingContext;
    var page = frameModule.topmost().currentPage;
    loadItem(page, item);
}

TaskPage.prototype.filterTap = function(args) {
    topmost.navigate("views/task/history-task-filter/history-task-filter");
};

module.exports = new TaskPage();

