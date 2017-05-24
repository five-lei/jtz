/**
 * Created by Administrator on 2017/3/14.
 */
var frameModule = require("ui/frame");
var BasePage=require ('../../shared/BasePage');
var config = require ("../../shared/config");
var api= require ('../../shared/api');
var viewModels = require("./master-article-view-model");
var collect_list;//底部文章列表
var video_list ; //视频
function MasterPage(){

}
/*页面加载*/

MasterPage.prototype=new BasePage();
MasterPage.prototype.constructor=MasterPage;

MasterPage.prototype.pageLoaded = function (args) {
    var page = args.object;
    collect_list = page.getViewById("article-list-view");
    video_list = page.getViewById("video-list-view");
    collect_list.bindingContext = new viewModels.ViewModel();
    video_list.bindingContext = new viewModels.VideoListViewModel();
};
MasterPage.prototype.more= function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/course/article-details/article-details");
};
/*文章列表*/
MasterPage.prototype.article_details= function() {
    var topmost = frameModule.topmost();
    topmost.navigate({
        moduleName:"views/course/article-details/article-details",
        context: {
            "articleOrVideoId": "articleId",
        },
    });
};
MasterPage.prototype.itemSelected= function(args) {
    var obj = args.object;
    var topmost = frameModule.topmost();
    topmost.navigate({
        moduleName:"/views/course/details-article/details-article",
        context: {
            "articleOrVideoId": obj.id,
        },
    });
};
MasterPage.prototype.furniture =function () {
    var topmost = frameModule.topmost();
    topmost.navigate("views/course/furniture/furniture");
};
MasterPage.prototype.building =function () {
    var topmost = frameModule.topmost();
    topmost.navigate("views/course/building/building");
};
//点击详情时带ID过去
MasterPage.prototype.video =function (args) {
    var topmost = frameModule.topmost();
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
MasterPage.prototype.video_course =function () {
    var topmost = frameModule.topmost();
    topmost.navigate("views/course/video-course/video-course");
};
MasterPage.prototype.details_article =function () {
    var topmost = frameModule.topmost();
    topmost.navigate("views/course/details-article/details-article");
};

module.exports=new MasterPage();