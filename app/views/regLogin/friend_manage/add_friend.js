var frameModule = require("ui/frame");
var main_view_model_1 = require("../../index/index-view-model");

function HomeIndex() {
    "use strict";

}
HomeIndex.prototype.loaded = function(args) {
    page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
};
HomeIndex.prototype.onBackTap = function() {
    var topmost = frameModule.topmost();
    topmost.goBack();
}
HomeIndex.prototype.item_intent = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/regLogin/friend_manage/address_book_add");
}
HomeIndex.prototype.accordingToCity = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/regLogin/friend_manage/accordingto_cities");
}

HomeIndex.prototype.searchResult = function(args) {
    var page = args.object.page;
    var nameOrMobile = page.getViewById("nameOrMobile");
    var nameOrMobile_text = nameOrMobile.text;
    var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "views/regLogin/friend_manage/search_results",
        context: {
            "nameOrMobile": nameOrMobile_text,
            "myFriend": false,
        },
    }
    topmost.navigate(navigationEntry);
}

module.exports = new HomeIndex();