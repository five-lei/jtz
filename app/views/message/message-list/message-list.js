/**
 * Created by Administrator on 2017/3/14.
 */
var frameModule = require("ui/frame");
var viewModels = require("../../../views/message/message-list/message-list-view-model");
var search_input;
var timer = null;
var type;
var context;

function loaded(args) {
    var page = args.object;
    context = page.navigationContext;
    var title = page.getViewById("title");
    var search_input = page.getViewById("search_input");
    if(context.title=="任务消息"){
        type = "task";
        search_input.text = "任务号/收货人姓名搜索"
    }else{
        type = "kefu";
        search_input.text = "手机号/客服姓名"
    }
    title.text = context.title;
    console.log(type);
    page.bindingContext = new viewModels.ViewModel(type); 
    // timer = setTimeout(function() {  
    //                      loaded(args) 
    //         },  
    //         60000) 
}   
exports.loaded = loaded;
/*返回上一级*/
exports.return = function() {
    frameModule.topmost().goBack();
    clearTimeout(timer);
};

function SearchTap() {
    if(context.title=="任务消息"){
        var navigationEntry1 = {
            moduleName: '/views/message/message-search-list/message-search-list',
            context: {
                "name":"输入任务单号/收货人姓名",
                "type":"task"
            },
        };
        frameModule.topmost().navigate(navigationEntry1);
    }else {
        var navigationEntry2 = {
            moduleName: '/views/message/message-search-list/message-search-list',
            context: {
                "name":"手机号/客服姓名",
                "type":"kefu"
            },
        };
        frameModule.topmost().navigate(navigationEntry2);
    }
}
exports.SearchTap = SearchTap;


