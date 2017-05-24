var frameModule=require("ui/frame");
var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var app = require("application");
var contacts = require("nativescript-contacts");

var page;
var groceryList= new ObservableArray([]);
var pageData = new observableModule.fromObject();

exports.loaded = function (args) {
    page = args.object;
    page.bindingContext = pageData;
    // while (groceryList.length-1) {
    //     groceryList.pop();
    // }
    if (groceryList.length == 0){
        contacts.getAllContacts().then(function(args) {
            console.log("getAllContacts Complete");

            var str = JSON.stringify(args.data);
            console.debug("!!!!!!!!!!!!!"+ str);
            var citys = eval('(' + str + ')');

            if (page.android){
                for (var i in citys) {
                    console.debug(JSON.stringify(citys[i].name.displayname));
                    console.debug(JSON.stringify(citys[i].phoneNumbers));
                    groceryList.push(
                        {name: JSON.stringify(citys[i].name.displayname),phone:JSON.stringify(citys[i].phoneNumbers.value),  image:"res://yilogo"})
                }
            }

            if (page.ios){
                for (var i in citys) {
                    var name = JSON.stringify(citys[i].name.family);
                    var phone = JSON.stringify(citys[i].phoneNumbers[0].value);
                    groceryList.push(
                        {name: name, phone:phone,  image:"res://yilogo"})
                }
            }
        }, function(err) {
            console.log("Error: " + err);
        });
    }

    pageData.set("groceryList",groceryList);
}
exports.onNavigatingTo = function (args) {

}

exports.pullToRefreshInitiated = function(args) {
    page = args.object;
    setTimeout(function() {
        groceryList.push(
            { name: "郑伟建" ,phone:"185296459",image:"res://yilogo"}
        );
        page.getViewById("list-view").notifyPullToRefreshFinished();
    }, 2000);
};


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