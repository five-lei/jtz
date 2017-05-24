/**
 * Created by Giscafer on 2017/3/24.
 * 任务事件方法绑定函数
 */
var frameModule = require("ui/frame");
var gestures = require("ui/gestures");
var topmost = frameModule.topmost();
var searchBarModule = require("ui/search-bar");
var CommonUtil = require('./common/common-util');
var ScrollView=require("ui/scroll-view");

var taskListContent=new CommonUtil();

/**
 * 任务详情
 */
taskListContent.testScrollEvent = function (args) {
    var page = args.object.page;
    var sv = page.getViewById('scrollView');
  /*  sv.on(gestures.GestureTypes.swipe, function(args) {
        console.log("Swipe Direction: " + args.direction);
    });*/
    sv.on(ScrollView.scrollEvent, function(args) {
        console.log("sv.scrollEvent: " + args.direction);
    });
};
taskListContent.tapTaskDetail = function (args) {
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
taskListContent.toggleCollapsePanel = function (args) {
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


module.exports=taskListContent;
