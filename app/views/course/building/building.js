/**
 * Created by Administrator on 2017/3/29.
 */

var Observable = require("data/observable").Observable;
var navigator = require("../../../common/navigator");
var color = require("color");

var visibility = require("ui/enums");
var view = require("ui/core/view");

var number = 0;

exports.onBackTap = function(args) {
    navigator.navigateBack();
};

/*循环*/
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var article_view_model = require("./article-view-model");
var video_view_model = require("./video-view-model");
function pageNavigatingTo(args) {
    var page = args.object;
    var article_view = page.getViewById("article-view");
    var video_view = page.getViewById("video-view");
    article_view.bindingContext = new article_view_model.articleListViewModel(0, false);
    video_view.bindingContext = new video_view_model.ListViewLayoutsModel(0, false);
    number = 1;
}
/*文章教程*/
/*收藏*/
exports.pageNavigatingTo = pageNavigatingTo;
function toggleFavourite(args) {
    var session = args.view.bindingContext;
    session.toggleFavourite();
}
exports.toggleFavourite = toggleFavourite;
/*分享*/
function articleShare(args){
    var session = args.view.bindingContext;
    session.articleShare();
}
exports.articleShare=articleShare;


/*视频教程*/
/*收藏*/
function toggleFavourite1(args) {
    var session1 = args.view.bindingContext;
    session1.toggleFavourite();
}
exports.toggleFavourite1 = toggleFavourite1;

/*分享*/
function videoShare(args){
    var session1 = args.view.bindingContext;
    session1.videoShare();
}
exports.videoShare=videoShare;

/*返回上一级*/
exports.goBack = function(args) {
    frameModule.topmost().goBack();
};

exports.onVideo=function(args){
    var topmost = frameModule.topmost();
    var videoId = args.object.id;
    var navigationEntry = {
        moduleName: "views/course/video-details/video-details",
        context: {
            "videoId":videoId,
        },
    }
    topmost.navigate(navigationEntry);
};

exports.onArticle=function(args){
    var articleOrVideoId = args.object.id;
    var topmost=frameModule.topmost();
    var navigationEntry = {
        moduleName: "views/course/details-article/details-article",
        context: {
            "articleOrVideoId":articleOrVideoId,
        },
    }
    topmost.navigate(navigationEntry);
};
//视频
exports.onPullToRefreshInitiated = function(args) {
    var page = args.object;
    alert(123);
    var video_view = page.getViewById("video-view");
    video_view.bindingContext = new video_view_model.ListViewLayoutsModel(number, false, page);
};
exports.onLoadMoreItemsRequested=function(args){
    alert(321);
    var page = args.object;
    var video_view = page.getViewById("video-view");
    video_view.bindingContext = new video_view_model.ListViewLayoutsModel(number, true, page);
    number += 1;
};

//文章
//下拉加载
exports.pullToRefreshInitiated = function(args) {
    var page = args.object;
    var article_view = page.getViewById("article-view");
    article_view.bindingContext = new article_view_model.articleListViewModel(0, false, page);
    number = 1;
};
//加载更多
exports.loadMoreItemsRequested=function(args){
    var page = args.object;
    var article_view = page.getViewById("article-view");
    article_view.bindingContext = new article_view_model.articleListViewModel(number, true, page);
    number += 1;
};



// iOS 的样式
var videoLine;
var textLine;
var videoLabel;
var textLabel;
var videoContent;
var textContent;
exports.loaded = function (args) {
    var page = args.object;
    videoLine = view.getViewById(page,"videoLine");
    videoLabel = view.getViewById(page,"videoLabel");
    textLine = view.getViewById(page,"textLine");
    textLabel = view.getViewById(page,"textLabel");
    videoContent = view.getViewById(page,"videoContent");
    textContent = view.getViewById(page,"textContent");
}
// 视频教程点击事件
exports.videoClick = function (args) {
    videoLine.style.backgroundColor = new color.Color("#FB8901");
    videoLabel.style.color = new color.Color("#FB8901");
    videoContent.style.visibility = "visible";

    textLine.style.backgroundColor = new color.Color("white")
    textLabel.style.color = new color.Color("black")
    textContent.style.visibility = "collapse";
}

// 文章教程点击事件
exports.textClick = function (args) {
    textLine.style.backgroundColor = new color.Color("#FB8901");
    textLabel.style.color = new color.Color("#FB8901");
    textContent.style.visibility = "visible";

    videoLine.style.backgroundColor = new color.Color("white")
    videoLabel.style.color = new color.Color("black");
    videoContent.style.visibility = "collapse";
};
