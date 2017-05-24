var frame = require("ui/frame")
var viewModel = require("./remind-view-model").TaskDataModel;
var CommonUtil = require('../common/common-util');
var models;
var thisPage;
/**
 * 继承通用类
 */
var RemindOrder = function () {
};
RemindOrder.prototype = new CommonUtil();
RemindOrder.prototype.constructor = RemindOrder;

RemindOrder.prototype.loaded = function(args) {
    console.log("123123123123235");
    models=new viewModel();
    thisPage = args.object.page;
    thisPage.dataModels=models;
    thisPage.type="all";
    thisPage.bindingContext = models.init();
    models.queryData(thisPage,null,'all');

};

function onBackTap(args) {
    frame.topmost().goBack();
}

/**
 * 展开详情信息
 * @param args
 */
function toggleCollapsePanel(args) {
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

/*加载更多*/
RemindOrder.prototype.onLoadMoreItemsRequested = function (args) {
    models.onLoadMoreItemsRequested(args);
};
/*刷新*/
RemindOrder.prototype.pullToRefreshInitiated = function (args) {
    models.pullToRefreshInitiated(args);
};
RemindOrder.prototype.toggleCollapsePanel = toggleCollapsePanel
RemindOrder.prototype.onBackTap = onBackTap;

module.exports=new RemindOrder();