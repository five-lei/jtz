/**
 * Created by giscafer on 2017/3/11.
 */
'use strict'
var color = require("color");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();

var ViewModel = require('./view-model');
var CommonUtil = require('../common/common-util');
var createToken = require('../../../common/createToken');

var taskDetail=new CommonUtil();

var taskType=null;
var taskId=null;
var globePage

taskDetail.pageLoaded = function (args) {
    createToken();
    globePage= args.object.page;
    taskType=globePage.navigationContext.taskType;
    taskId=globePage.navigationContext.taskId;
    globePage.curPage=globePage.navigationContext.curPage;
    globePage.bindingContext = new ViewModel().init(globePage,taskId,taskType);

};

taskDetail.onBackTap = function (args) {
    var curPage = globePage.navigationContext.curPage;
    console.log("curPage:"+curPage);
    if(curPage == "taskHistory"){
        topmost.navigate(
            {
                moduleName: "views/task/history-task/history-task",
                animated: false,
                clearHistory: false
            }
        );
    }else{
        var moduleName="views/task/maintenance-task/maintenance-task";
        if(taskType && taskType.indexOf('return_')!==-1){
            moduleName="views/task/return-task/return-task";
        }
        topmost.navigate(
            {
                moduleName: moduleName,
                animated: false,
                clearHistory: false
            }
        );
    }

};

taskDetail.onNodeInfoTap = function (args) {

    var page = args.object.page;
    var node_info_content = page.getViewById("node_info_content");
    var exception_content = page.getViewById("exception_content");
    var suggest = page.getViewById("node_label");
    suggest.style.color = new color.Color("#fb8901");
    suggest.style.borderColor = new color.Color("#fb8901");

    var complaint = page.getViewById("exception_label");
    complaint.style.color = new color.Color("#666666");
    complaint.style.borderColor = new color.Color("#eeeeee");

    if (node_info_content.visibility !== 'visible') {
        node_info_content.visibility = "visible";
    }

    if (exception_content.visibility !== 'collapse') {
        exception_content.visibility = "collapse";
    }

}

taskDetail.onExceptionInfoTap = function (args) {
    var page = args.object.page;
    var node_info_content = page.getViewById("node_info_content");
    var exception_content = page.getViewById("exception_content");
    var suggest = page.getViewById("node_label");
    suggest.style.color = new color.Color("#666666");
    suggest.style.borderColor = new color.Color("#eeeeee");
    var complaint = page.getViewById("exception_label");
    complaint.style.color = new color.Color("#fb8901");
    complaint.style.borderColor = new color.Color("#fb8901");
    if (exception_content.visibility !== 'visible') {
        exception_content.visibility = "visible";
    }

    if (node_info_content.visibility !== 'collapse') {
        node_info_content.visibility = "collapse";
    }

}

module.exports=taskDetail

