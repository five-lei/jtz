/**
 * Created by Administrator on 2017/3/20.
 */
var frameModule = require("ui/frame");
var config = require("../../../shared/config");
var api=require('../../../shared/api');
var viewModels = require("./video-details-view-model");
var apiCollect=require('../../../view-models/api.collect');
var Observable=require("data/observable").Observable;
var collect_list;//底部文章列表

exports.loaded =function (args) {
    var page = args.object.page;
    /*底部精选文章列表*/
    collect_list = page.getViewById("list-view");
    collect_list.bindingContext = new viewModels.ViewModel();

    /*更多视频*/
    var video_list = page.getViewById("video_list");
    video_list.bindingContext =  new viewModels.VideoListViewModel(video_list);

    //加载视频详情
    var videoId = page.navigationContext.videoId;
    console.log(videoId)
    //var videoId = "VuvRcJ9ZCAEhhxR9";
    var video_detail = page.getViewById("vedio-detail");
    new viewModels.videoPlayModel( video_detail,videoId);
};


/*隐藏滚动条*/
function scrollViewLoaded(args) {
    if (args.object.android) {
        args.object.android.setHorizontalScrollBarEnabled(false);
    }
}
exports.scrollViewLoaded=scrollViewLoaded;
/*返回上一级*/

exports.return = function (args) {
    frameModule.topmost().goBack();
};

exports.moreVideo = function () {
    var topmost = frameModule.topmost();
    topmost.navigate("views/course/video-course/video-course");
};

exports.moreArticle = function () {
    var topmost = frameModule.topmost();
    topmost.navigate("views/course/article-details/article-details");
};

exports.dropDown = function (args) {
    var page = args.object.page;
    var pic = args.object;
    var msg = page.getViewById("content-text");
    var teWrap = msg.textWrap;
    if (!teWrap) {
        pic.src = "res://sl";
    } else {
        pic.src = "res://xl";
    }
    msg.set("textWrap", !teWrap);

};

exports.videoDetails = function () {
    var topmost = frameModule.topmost();
    topmost.navigate("views/course/video-details/video-details");
};

/*分享*/
var socialShare = require("nativescript-social-share");
var imageSource = require("image-source");

exports.shareImage = function () {
    var image = imageSource.fromFile("~/images/nativescript.jpg");
    socialShare.shareImage(image);
};
exports.share = function () {
    socialShare.shareText("I love NativeScript!");
};
/*收藏*/
function collect(args) {
    var session = args.view.bindingContext;
    session.toggleFavourite();
}
exports.collect = collect;

function collect1(args) {
    var page = args.object.page;
    var pic = args.object;
    var msg = page.getViewById("collect-text1");
    if (pic.isFavourite) {
        pic.src = "res://add_to_fav_1";
        pic.isFavourite = false;
        msg.text = "已收藏";
    } else {
        pic.src = "res://sc_da2x";
        pic.isFavourite = true;
        msg.text = "收藏";
    }
}
exports.collect1 = collect1;

function collect2(args) {
    var page = args.object.page;
    var pic = args.object;
    var msg = page.getViewById("collect-text2");
    if (pic.isFavourite) {
        pic.src = "res://add_to_fav_1";
        pic.isFavourite = false;
        msg.text = "已收藏";
    } else {
        pic.src = "res://sc_da2x";
        pic.isFavourite = true;
        msg.text = "收藏";
    }
}
exports.collect2 = collect2;

exports.articleDetails = function () {
    var topmost = frameModule.topmost();
    topmost.navigate("views/course/details-article/details-article");
}