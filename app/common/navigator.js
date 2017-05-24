var frame = require("ui/frame");
var topmost = frame.topmost();
var platform = require("platform");
var utils = require("utils/utils");
var isIOS = platform.device.os === platform.platformNames.ios;
var isAndroid = platform.device.os === platform.platformNames.android;

var HOME_PATH='views/index/index';

function traceNavigateTo(to, context) {
    var eventText = "Navigate to: " + to + (context ? " (" + context + ")" : "");
    console.log("Track: " + eventText);
    return to;
}

function navigateToHome(){
    frame.topmost().navigate(HOME_PATH);
}
exports.navigateToHome = navigateToHome;
/**
 * 跳转任务搜索页面
 */
function navigateToTaskSearch(context) {

    var navigationEntry = {
        moduleName: "views/task/search/search",
        context: context || {},
        animated: true
    };

    frame.topmost().navigate(navigationEntry);
}
exports.navigateToTaskSearch = navigateToTaskSearch;

function navigateToEntry(navigationEntry){
    if(!navigationEntry) return;
    frame.topmost().navigate(navigationEntry)
}
exports.navigateToEntry=navigateToEntry;

/**
 * 页面跳转传惨
 * @param path 页面路径
 * @param context 参数
 * @param animated 是否有动画
 */
function navigateToPage(path,context,animated,clearHistory) {

    animated=animated!=undefined?animated:true;
    clearHistory=clearHistory!=undefined?clearHistory:false;
    path=path?path:HOME_PATH;

    frame.topmost().navigate({
        animated: animated || true,
        context: context,
        moduleName: traceNavigateTo(path, context.title),
        clearHistory: clearHistory
    });
}
exports.navigateToPage = navigateToPage;


function navigateToExample(example, siblings) {
    // prof.start("example");
    // prof.startCPUProfile("example");
    var navContext = {
        shouldNavigateToInfoOnBack: true,
        example: example,
        siblings: siblings
    };
    frame.topmost().navigate({
        animated: true,
        moduleName: traceNavigateTo(navContext.example.path),
        context: navContext
    });
}
exports.navigateToExample = navigateToExample;


function navigateBack() {
    frame.goBack();
}
exports.navigateBack = navigateBack;

function navigateBackWithContext(context) {
    var topmostFrame = frame.topmost();
    var backstackEntry = topmostFrame.backStack[topmostFrame.backStack.length - 1];
    backstackEntry.entry.context = context;
    topmostFrame.goBack(backstackEntry);
}
exports.navigateBackWithContext = navigateBackWithContext;

function navigateBackFromExample() {
    var topmostFrame = frame.topmost();
    var stack = topmostFrame.backStack;
    for (var top = stack.length - 1; top >= 0; --top) {
        var backStackEntry = stack[top];
        if (!/^examples\//.test(backStackEntry.entry.moduleName)) {
            topmostFrame.goBack(backStackEntry);
            break;
        }
    }
}
exports.navigateBackFromExample = navigateBackFromExample;

