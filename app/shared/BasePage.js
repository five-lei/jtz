/**
 * Created by giscafer on 2017/3/11.
 */

var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var topmost = frameModule.topmost;
// var NavigationEntry = frameModule.NavigationEntry;

var appViewModel = new observableModule.Observable();
appViewModel.selectedPage = "home";

function BasePage() {}

BasePage.prototype.viewModel = appViewModel;

/**
 * 页面加载完成
 * @param args
 */
BasePage.prototype.pageLoaded = function(args) {
    var page = args.object;
    page.bindingContext = appViewModel;
};

/**
 * 返回
 * @param args
 */
BasePage.prototype.onGoBackTap = function(args) {
    topmost().goBack();
};
/**
 * 页面跳转
 * @param path 页面路径
 * eg：'views/task/acceptOrderPage'
 */
BasePage.prototype.navigateTo = function(path) {
    appViewModel.set("selectedPagePath", path);
    topmost().navigate(path);
};
/**
 * 导航
 * @param args
 */
BasePage.prototype.navigate = function(args) {
    var pageName = args.view.text.toLowerCase();
    appViewModel.set("selectedPage", pageName);
    topmost().navigate("pages/" + pageName + "/" + pageName);
};
/**
 * 菜单跳转方法
 * @param args
 */
BasePage.prototype.menuNavigator = function(args) {
    var obj = args.object;
    var menuType=obj.id;
    var module_name;
    var navigationEntry;
    switch(menuType){
        case 'home':
            navigationEntry = {
                moduleName: "views/index/index",
                clearHistory:true,
                animated:false,
                transition:'NavigationTransition'
            };
            break;
        case 'task':
            navigationEntry = {
                moduleName: "views/task/index",
                clearHistory:true,
                animated:false,
                transition:'NavigationTransition'
            };
            break;
        case 'course':
            navigationEntry = {
                moduleName: "views/course/master-page",
                clearHistory:true,
                animated:false,
                context: {
                    "articleOrVideoId": "articleId",
                },
                transition:'NavigationTransition'
            };
            break;
        case 'my':
            navigationEntry = {
                moduleName: "views/my/index",
                clearHistory:true,
                animated:false,
                transition:'NavigationTransition'
            };
            break;
    }
    topmost().navigate(navigationEntry);

};

module.exports = BasePage;
