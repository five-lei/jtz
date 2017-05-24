var frameModule=require("ui/frame");
var config = require("../../../shared/config");
var api=require('../../../shared/api');
var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var page;
var nameOrMobile;
var myFriend;
var topmost=frameModule.topmost();
var pageData = new observableModule.fromObject({
    groceryList: new ObservableArray([
        { name: "刘德华",taskIdOrPhone:"1zt20170221133",  image:"res://yilogo_j2"},
        { name: "郑伟建" ,taskIdOrPhone:"185296459",image:"res://yilogo_j2"},
        { name: "杨幂",taskIdOrPhone:"326587485",image:"res://yilogo_j2" }
    ])
});
var number = 0;
//总页数
var totalPages;
exports.loaded = function(args) {
    page = args.object;
    console.dump(pageData.groceryList);
    page.bindingContext = pageData;
    var context = page.navigationContext;
     nameOrMobile = context.nameOrMobile;
    fianUserWorker(nameOrMobile, 0, false);
    number = 1;
};
function onBackTap() {
    topmost.goBack();
}
//查询
function fianUserWorker(nameOrMobile, first, more, listView){
    if(more == true){
        //加载更多
        first *= 10;
    }

    //根据条件查询客服
    var qureyParams={
        "name": "IMAppController.appServiceMessageList",
        "args": [{"first":0,"rows":10},{"condition":nameOrMobile}]
    };
    api.call(config.apiUrl,qureyParams).ok((data)=>{
        var result = data.result || {};
        var content = result.content || [];
        
        if(more == true){
            //加载更多
            for(var i=0;i<content.length;i++){
                pageData.groceryList.push(content[i]);
            }
        }else{
            //加载第一页
            pageData.groceryList =  new ObservableArray([]);
            for(var i=0;i<content.length;i++){
                pageData.groceryList.push(content[i]);
            }
        }
        totalPages = result.totalPages || 0;
        if(listView){
            listView.notifyPullToRefreshFinished();
            listView.notifyLoadOnDemandFinished();
        }
    }).fail((err)=>{
        if(listView){
            listView.notifyPullToRefreshFinished();
            listView.notifyLoadOnDemandFinished();
        }
        var error = err.error || {};
        alert(error.error);
    })
}

//下拉刷新
/*exports.pullToRefreshInitiated = function(args) {
    var listView = args.object;
    fianUserWorker(myFriend, nameOrMobile, 0, false, listView);
    number = 1;
};*/

//加载更多
exports.loadMoreItemsRequested=function(args){
    var listView = args.object;
    fianUserWorker(nameOrMobile, number, true, listView);
    number += 1;
};

//点击进入任务单详情页
exports.item_intent = function(args){
    var type = args.object.type;
    var taskId=args.object.taskId;
    var navigationEntry = {
        moduleName: "views/task/task-detail/task-detail",
        context: {"taskType": type,"taskId": taskId},
        animated: true
    };
   /* //调用任务详情接口
    viewModal().findAppTaskDetail(taskId,function (result) {
    
    });*/
    //topmost.navigate(navigationEntry);
}

exports.onBackTap=onBackTap;