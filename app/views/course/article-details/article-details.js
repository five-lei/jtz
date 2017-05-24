/**
 * Created by Administrator on 2017/3/20.
 */
var frameModule = require("ui/frame");
var config = require("../../../shared/config");
var api=require('../../../shared/api');
var view_model = require("./article-details-view-model");
var number = 0;

function pageNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = new view_model.articleListViewModel(0, false);
    number = 1;
}
exports.pageNavigatingTo=pageNavigatingTo;
/*分享*/
function articleShare(args){
    var session = args.view.bindingContext;
    session.articleShare();
}
exports.articleShare=articleShare;
/*返回上一级*/
exports.return = function(args) {
    frameModule.topmost().goBack();
};
exports.onArticle=function(args){
    var topmost = frameModule.topmost();
    topmost.navigate("views/course/details-article/details-article");
};

//下拉刷新
exports.pullToRefreshInitiated = function(args) {
    var page = args.object;
    // setTimeout(function() {
    //     alert(123);
    //     page.getViewById("list-view").notifyPullToRefreshFinished();
    // }, 2000);
    page.bindingContext = new view_model.articleListViewModel(0, false, page);
    number = 1;
};
//加载更多
exports.loadMoreItemsRequested=function(args){
    var page = args.object;
    page.bindingContext = new view_model.articleListViewModel(number, true, page);
    number += 1;
};