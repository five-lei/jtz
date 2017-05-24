/**
 * Created by giscafer on 2017/3/16.
 * 问题件列表
 */

var Observable = require("data/observable").Observable;
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var dialogsModule = require("ui/dialogs");
var searchBarModule = require("ui/search-bar");
var navigator = require("../../../common/navigator");

var TaskDataModel = require("./question-list-view-model");
var itemLoadMore; //加载
var curSelectedItemIndex = 0;
//数据
var dataModel;

function QuestionListPage(){

}

QuestionListPage.prototype.pageNavigatingTo=function(args) {
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

QuestionListPage.prototype.onBackTap = function(args) {
    navigator.navigateBack();
};


/**
 * 搜索按钮事件
 */
QuestionListPage.prototype.tapSearchHandler= function () {

    var navigationEntry = {
        moduleName: "views/task/search/search",
        context: {
            "searchType": "question-task",
            "selectedTypeIndex":3
        },
        animated: true
    };
    topmost.navigate(navigationEntry);
};


/**
 * 问题件详情
 */
QuestionListPage.prototype.tapQuestionDetail=function(args){
    var id = args.object.matterRecordId;
    var navigationEntry = {
        moduleName: "views/task/question-task-detail/question-task-detail",
        context: {
            "matterRecordId": id,
        },
    }
    topmost.navigate(navigationEntry);
};


QuestionListPage.prototype.onPullToRefreshInitiated = function(args) {
    var page = args.object;
    page.getViewById("task_list_view").notifyPullToRefreshFinished();
};
QuestionListPage.prototype.onLoadMoreItemsRequested=function(args){
    console.log('onLoadMoreItemsRequested')
    dataModel.onLoadMoreItemsRequested(args);
};


QuestionListPage.prototype.rootGridLoaded=function(args) {
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
    page.bindingContext.currentTaskList = dataModel.loadGalleryFragment(page,item, item.xmlFileName);
}



QuestionListPage.prototype.scrollViewLoaded = function (args) {
    if (args.object.android) {
        args.object.android.setHorizontalScrollBarEnabled(false);
    }
}

QuestionListPage.prototype.repeaterItemTap = function (args) {
    var obj= args.object;
    curSelectedItemIndex = obj.tabIndex;
    var item = args.view.bindingContext;
    var page = frameModule.topmost().currentPage;
    loadItem(page, item);
}

/*加载更多*/
QuestionListPage.prototype.onLoadMoreItemsRequested = function (args) {
    dataModel.onLoadMoreItemsRequested(args,itemLoadMore,itemLoadMore.xmlFileName);
};
/*刷新*/
QuestionListPage.prototype.pullToRefreshInitiated = function (args) {
    dataModel.pullToRefreshInitiated(args,itemLoadMore,itemLoadMore.xmlFileName);
};

module.exports=new QuestionListPage();