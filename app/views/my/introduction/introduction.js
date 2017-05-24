
var frameModule = require("ui/frame");
var webViewModule = require("ui/web-view");

exports.onBackTap = function() {

var topmost = frameModule.topmost();
   topmost.goBack();

};

function pageLoaded(args){
    var page = args.object.page;
    var context = page.navigationContext.tapType;
    var webView = page.getViewById("webView");
    var title = page.getViewById("title");
    if(context==1){
        title.text = "功能介绍"
        // webView.src = "~/www/index.html";
        webView.url = "https://www.baidu.com/";
        
    }else if(context==2){
        title.text = "服务协议"
        // webView.src = "~/www/index.html";
        webView.url = "https://github.com/";
    }else if(context==3){
        title.text = "使用帮助"
        // webView.src = "~/www/index.html";
        webView.url = "https://hao.qq.com/";
    }else{
        title.text = "信用规则"
        // webView.src = "~/www/index.html";
        webView.url = "https://hao.qq.com/";
    }


}
exports.pageLoaded = pageLoaded