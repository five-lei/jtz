var frameModule=require("ui/frame");
var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;

var FriendViewModel=require('./friend-view-model');

var model=new FriendViewModel();
var page;
var pageData = new observableModule.fromObject({
    groceryList: new ObservableArray([])
});

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
    //查询好友
    model.getFriendList(page);
};

//下拉刷新
exports.pullToRefreshInitiated = function(args) {
    var listView = args.object;
    var page = args.object.page;
    model.getFriendList(page,listView);
};


//添加好友
exports.addfriend=function(){
  var topmost=frameModule.topmost();
     topmost.navigate("views/regLogin/friend_manage/add_friend");
}
//查询好友
exports.search_frined=function(){
  var topmost=frameModule.topmost();
     topmost.navigate("views/regLogin/friend_manage/search_friend");
}
//好友详情
exports.item_intent=function(args){
    var page = args.object;
    var id = args.object.id;
    var topmost=frameModule.topmost();
    var navigationEntry = {
        moduleName: "views/regLogin/friend_manage/friend_detail",
        context: {
            "id":id,
        },
    }
    topmost.navigate(navigationEntry);
}
exports.onBackTap=function(){
    var navigationEntry = {
        moduleName: "views/my/index"
    }
    frameModule.topmost().navigate(navigationEntry);
}