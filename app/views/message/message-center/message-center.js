/**
 * Created by Administrator on 2017/3/14.
 */
var frameModule = require("ui/frame");

exports.loaded = function(args) {
    
}    
/*返回上一级*/
exports.return = function() {
    frameModule.topmost().goBack();
};
/*系统消息*/
exports.tapMessageDetail = function() {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "views/message/system-message/system-message",
    }
    topmost.navigate(navigationEntry);
};
/*账号变动*/
exports.tapAccountDetail = function() {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "views/message/account-message/account-message",
    }
    topmost.navigate(navigationEntry);
};
exports.onService = function (args) {
    var page = args.object.page;
    page.showModal('/views/message//dialogs-service/dialogs-service', {items: []}, function (selectedItem) {
    }, false);
}
exports.tapTaskDetail = function() {
    var navigationEntry = {
                moduleName: '/views/message/message-list/message-list',
                context: {
                            "title": "任务消息", 
                         },
    }
    frameModule.topmost().navigate(navigationEntry);
};
exports.tapKefuDetail = function (args) {
    var navigationEntry = {
                moduleName: '/views/message/message-list/message-list',
                context: {
                            "title": "客服消息",
                         },
    }
    frameModule.topmost().navigate(navigationEntry);
}
