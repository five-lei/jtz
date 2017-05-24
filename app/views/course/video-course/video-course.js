/**
 * Created by Administrator on 2017/3/17.
 */
var frameModule = require("ui/frame");
var view_model = require("./video-course-view-model");

var VideoViewModel = require("../../../view-models/course-video-view-model");
var vid = new VideoViewModel();
var number = 0;
function pageNavigatingTo(args) {
    var page = args.object;
    var video_view = page.getViewById("video-view");
   video_view.bindingContext = new view_model.ListViewLayoutsModel(0, false);
    number = 1;
}
exports.pageNavigatingTo = pageNavigatingTo;
/*视频教程*/
/*收藏*/
function toggleFavourite(args) {
    var session = args.view.bindingContext;
    session.toggleFavourite();
}
exports.toggleFavourite = toggleFavourite;

/*分享*/
function videoShare(args){
    var session1 = args.view.bindingContext;
    session1.videoShare();
}
exports.videoShare=videoShare;
/*返回上一级*/
exports.return = function(args) {
    frameModule.topmost().goBack();
};

exports.onVideo=function(args){
    var topmost = frameModule.topmost();
    // topmost.navigate("views/course/video-details/video-details");
    var videoId = args.object.id;
    console.log("============视频id");
    console.log(videoId);
    var navigationEntry = {
        moduleName: "views/course/video-details/video-details",
        context: {
            "videoId":videoId,
        },
    }
    topmost.navigate(navigationEntry);
};

exports.pullToRefreshInitiated = function(args) {
    var page = args.object;
    alert(123);
    var video_view = page.getViewById("video-view");
    video_view.bindingContext = new view_model.ListViewLayoutsModel(number, false, page);
};
exports.loadMoreItemsRequested=function(args){
    var page = args.object;
    var video_view = page.getViewById("video-view");
    video_view.bindingContext = new view_model.ListViewLayoutsModel(number, true, page);
    number += 1;
};