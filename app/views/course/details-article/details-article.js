/**
 * Created by Administrator on 2017/3/20.
 */
var frameModule = require("ui/frame");
var config = require("../../../shared/config");
var api=require('../../../shared/api');
var viewModels = require("../../../view-models/article-list-view-model");
var apiCollect=require('../../../view-models/api.collect');
var context=null;
var detail_title;//文章详情标题
var detail_time;//发布时间
var detail_content;//文章内容
var detail_describe;//文章描述
var collect_type;//是否收藏文字
var collect_img;//是否收藏图片
var collect_list;//底部文章列表
var id;
var collect;


exports.loaded = function(args) { 
    var page = args.object.page;
    context = page.navigationContext;
    var articleOrVideoId = page.navigationContext.articleOrVideoId;
    // var articleOrVideoId = "VtascpiR9eQz7KFg";
    detail_title = page.getViewById("detail_title");
    detail_time = page.getViewById("detail_time");
    detail_content = page.getViewById("detail_content");
    // detail_describe = page.getViewById("detail_describe");
    collect_img = page.getViewById("collect_img");
    collect_type = page.getViewById("collect-text");
    collect_list = page.getViewById("list-view");
    collect_list.bindingContext = new viewModels.ViewModel(articleOrVideoId);
    var qureyParams={
            "name": "articleController.articleFind",
            "args": [{"first":0,"rows":10},{"id": articleOrVideoId }]
    };
    api.call(config.apiUrl,qureyParams).ok((data)=>{
            var str = JSON.stringify(data.result.content);
            content = eval('(' + str + ')');
            article_detail = content[0] || null;
            if(article_detail!=null){
                id = content[0].id;
                collect = content[0].collection;
                detail_title.text = content[0].title;
                detail_time.text = "发布"+content[0].publishTime;
                detail_content.text = content[0].content.text;
                // detail_describe.text = content[0].describe;
                if(content[0].collection){
                    collect_img.src = "res://add_to_fav_1";
                    collect_type.text="已收藏";
                }else{
                    collect_img.src = "res://sc_da2x";
                    collect_type.text="收藏";
                }
            }
            
        }).fail((err)=>{
            if(err.error){
                alert(err.error);
            }else{
                alert("请联系管理员");
            }
         })
};


/*返回上一级*/
exports.return = function(args) {
    frameModule.topmost().goBack();
};
exports.more= function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/course/article-details/article-details");
};

/*分享*/
var socialShare = require("nativescript-social-share");
var imageSource = require("image-source");

exports.shareImage = function() {
    var image = imageSource.fromFile("~/images/nativescript.jpg");
    socialShare.shareImage(image);
};
exports.shareText = function() {
    socialShare.shareText("I love NativeScript!");
};

/*收藏*/
function collect(args){
    /*获取整个页面的page*/
    var page = args.object.page;
    /*获取当前对象*/
    var pic = args.object;
    if(collect){
        pic.src="res://sc_da2x";
        collect_type.text="收藏";
        collect=false;
    }else{
        pic.src="res://add_to_fav_1";
        collect_type.text="已收藏";
        collect=true;
    }
    apiCollect.test(id);
}
exports.collect=collect;



// exports.details_article =function () {
//     var topmost = frameModule.topmost();
//     topmost.navigate("views/course/details-article/details-article");
// };
exports.moreArticle =function () {
    var topmost = frameModule.topmost();
    topmost.navigate("views/course/article-details/article-details");
};