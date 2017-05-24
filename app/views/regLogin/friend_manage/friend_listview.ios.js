var frameModule=require("ui/frame");
var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var visibility = require("ui/enums");

var page;
var groceryList= new ObservableArray([]);
var pageData = new observableModule.fromObject();

var sectionArray = new ObservableArray();

exports.loaded = function(args) {
    page = args.object;

    while (groceryList.length) {
        groceryList.pop();
    }
    groceryList.push([
        { title:"A", name: "刘德华",phone:"123456789",  image:"res://yilogo"},
        { name: "郑伟建" ,phone:"185296459",image:"res://yilogo"},
        { name: "杨幂",phone:"326587485",image:"res://yilogo" }]);

    sectionArray.push(groceryList.length);

    var otherArray = [
        { title:"B", name: "刘德华",phone:"123456789",  image:"res://yilogo"},
        { name: "郑伟建" ,phone:"185296459",image:"res://yilogo"},
        { name: "杨幂",phone:"326587485",image:"res://yilogo" }];
    groceryList.push(otherArray)


    pageData.set("groceryList",groceryList);
    page.bindingContext = pageData;
};

exports.onItemLoading = function(args) {
    var number = sectionArray.getItem(0);
    if (args.itemIndex == 0 || args.itemIndex == number){
        var headerLabel = args.view._subViews[0]._subViews[0];
        headerLabel.style.visibility = "visible";
    }
}


// 其它的点击事件
exports.addfriend=function(){
  var topmost=frameModule.topmost();
     topmost.navigate("views/regLogin/friend_manage/add_friend");
}
exports.search_frined=function(){
  var topmost=frameModule.topmost();
     topmost.navigate("views/regLogin/friend_manage/search_friend");
}

exports.item_intent=function(){
  var topmost=frameModule.topmost();
     topmost.navigate("views/regLogin/friend_manage/friend_detail");
}
exports.onBackTap=function(){
 var topmost=frameModule.topmost();
   topmost.goBack()
}