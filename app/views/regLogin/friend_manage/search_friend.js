var frameModule=require("ui/frame");
var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var page;
var topmost=frameModule.topmost();
var pageData = new observableModule.fromObject({
    // groceryList: new ObservableArray([
    //     { name: "刘德华",phone:"123456789",  image:"res://yilogo_j2"},
    //     { name: "郑伟建" ,phone:"185296459",image:"res://yilogo_j2"},
    //     { name: "杨幂",phone:"326587485",image:"res://yilogo_j2" }
    // ])
    groceryList: new ObservableArray([])
});

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
};
  

exports.onBackTap=function(){

   topmost.goBack()
}
//搜索好友
function Search_Result(args) {
    var page = args.object.page;
    var nameOrMobile = page.getViewById("nameOrMobile");
    var nameOrMobile_text =nameOrMobile.text;
    var topmost=frameModule.topmost();
    var navigationEntry = {
        moduleName: "views/regLogin/friend_manage/search_results",
        context: {
            "nameOrMobile": nameOrMobile_text,
            "myFriend":true
        },
    }
    topmost.navigate(navigationEntry);

}
exports.Search_Result=Search_Result;
exports.item_intent = function () {
    topmost.navigate('views/regLogin/friend_manage/friend_detail');
}

exports.returnToFriendsList = function () {
    topmost.navigate('views/regLogin/friend_manage/friend_listview');
}