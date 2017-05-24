var frame = require("ui/frame")
var visibility  = require("ui/enums");
var observableModule = require("data/observable")
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var viewModels = require("../../../views/my/mycollection/collection-list-view-model");
var page;
var collectList = new ObservableArray([]);
var pageData = new Observable();
var number = 0;

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = new viewModels.ViewModel(0, page, false);
    number = 1;
};

//下拉刷新
exports.pullToRefreshInitiated = function(args) {
    var page = args.object;
    page.bindingContext = new viewModels.ViewModel(0, page, false);
    number = 1;
};

//加载更多
exports.loadMoreItemsRequested=function(args){
    var page = args.object;
    page.bindingContext = new viewModels.ViewModel(number, page, true);
    number += 1;
};

function onBackTap(args) {
    frame.topmost().goBack();
}

exports.onBackTap = onBackTap