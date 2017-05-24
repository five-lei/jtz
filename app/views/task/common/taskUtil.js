/**
 * Created by giscafer on 2017-05-17.
 */
var frameModule = require("ui/frame");
/**
 * 动态移除ListItem
 * @param page
 * @param taskId
 */
 exports.removeByTaskId=function(page,taskId){
    var taskList=page.bindingContext.currentTaskList || [];
    taskList.forEach(function (item,index) {
        if(item.id===taskId){
            taskList.splice(index,1);
        }
    });
    page.bindingContext.set('currentTaskList',taskList);
};

/**
 * 新任务详情
 */
exports.navigateToNewTaskDetail = function (type,taskId,curPage) {
    if(!type || !taskId) return;
    var navigationEntry = {
        moduleName: "views/task/task-detail/task-detail",
        context: {"taskType": type,"taskId": taskId,"curPage":curPage},
        animated: true,
        clearHistory: true
    };
    frameModule.topmost().navigate(navigationEntry);
};
/**
 * 维修任务详情
 */
exports.navigateToAfterMarketTaskDetail = function (type,taskId,curPage) {
    if(!type || !taskId) return;
    var navigationEntry = {
        moduleName: "views/task/return-detail/return-detail",
        context: {"taskType": type,"taskId": taskId,"curPage":curPage},
        animated: true,
        clearHistory: true
    };
    frameModule.topmost().navigate(navigationEntry);
};