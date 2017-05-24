var frameModule=require("ui/frame");
var config = require("../../../shared/config");
var api=require('../../../shared/api');
var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var page;
var nameOrMobile;
var myFriend;
var topmost=frameModule.topmost();
var pageData = new observableModule.fromObject({
    groceryList: new ObservableArray([])
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
    myFriend = context.myFriend;
    fianUserWorker(myFriend, nameOrMobile, 0, false);
    number = 1;
};
function onBackTap() {
    topmost.goBack();
}
//查询
function fianUserWorker(myFriend, nameOrMobile, first, more, listView){
    if(more == true){
        //加载更多
        first *= 10;
    }

    //根据条件查询用户
    var qureyParams={
        "name": "userWorkerController.userWorkerSearch",
        "args": [{"first":first,"rows":10},{"myFriend":myFriend,"condition":nameOrMobile}]
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
        console.dump(error);
    })
}

//下拉刷新
exports.pullToRefreshInitiated = function(args) {
    var listView = args.object;
    fianUserWorker(myFriend, nameOrMobile, 0, false, listView);
    number = 1;
};

//加载更多
exports.loadMoreItemsRequested=function(args){
    var listView = args.object;
    fianUserWorker(myFriend, nameOrMobile, number, true, listView);
    number += 1;
};

//进入用户详情添加好友
exports.item_intent = function(args){
    var page = args.object;
    var id = args.object.id;

    var topmost=frameModule.topmost();
    var navigationEntry = {
        moduleName: "views/regLogin/friend_manage/friend_detail",
        context: {
            "id":id,
            nameOrMobile:nameOrMobile
        },
    }
    topmost.navigate(navigationEntry);
}

exports.onBackTap=onBackTap;