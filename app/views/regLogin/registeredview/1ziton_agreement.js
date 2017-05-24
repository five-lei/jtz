var frameModule = require("ui/frame");
var webViewModule = require("ui/web-view");

exports.onBackTap = function() {
    var topmost = frameModule.topmost();
    topmost.goBack();
};

function pageLoaded(args) {
    var page = args.object.page;
    var webView = page.getViewById("webView");
    var title = page.getViewById("title");
    title.text = "用户协议";
    webView.src = "~/web-view/jzt.html";
    // webView.url = "https://github.com/";
}
exports.pageLoaded = pageLoaded