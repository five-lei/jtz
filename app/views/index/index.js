/**
 * Created by Administrator on 2017/3/23.
 */
var frameModule = require("ui/frame");
var timer = require("timer");
var gestures = require("ui/gestures");
var taskModels = require("./index-view-model");
var slideContainer;
var page;
var time;
var clock;
var BasePage = require('../../shared/BasePage');
var main_view_model_1 = require("./index-view-model");
var config = require('../../shared/config');
var api = require('../../shared/api');
var ViewModel = require('./index-number-view');
var dialog = require("nativescript-dialog");
var cache = require("nativescript-cache");
var portrait;

function HomeIndex() {
    "use strict";

}
HomeIndex.prototype = new BasePage();
HomeIndex.prototype.constructor = HomeIndex;

HomeIndex.prototype.pageLoaded = function(args) {
    page = args.object;
    portrait = page.getViewById("portrait");
    var content = page.getViewById("content");

    var userInfo = cache.get("userInfo");
    if (userInfo) {
        var info = JSON.parse(userInfo);
        portrait.src = info["portrait"];
    }
    // waitJieDan = page.getViewById("waitJieDan");
    // finish = page.getViewById("finish");
    // chaoshi = page.getViewById("chaoshi");
    // fanhuo = page.getViewById("fanhuo");
    // noDaohuo = page.getViewById("noDaohuo");
    // weixiu = page.getViewById("weixiu");
    // wenti = page.getViewById("wenti");
    // waitQianShou = page.getViewById("waitQianShou");
    // waitYuYue = page.getViewById("waitYuYue");
    //
    page.bindingContext = new main_view_model_1.HelloWorldModel();
    // content.bindingContext = new ViewModel.ViewModel().detailList;
    new ViewModel.ViewModel(page);
    // var qureyParams={
    //     "name": "taskStatusController.findTaskStatusCollects",
    //     //"args": [{"first":0,"rows":2},{}]
    //     "args": []
    // };
    //
    // api.call(config.apiUrl,qureyParams).ok((data)=>{
    // /*api.call(config.localHost_list,qureyParams).ok((data)=>{*/
    //     try{
    //         console.log("##############api.call success start#############");
    //         console.log(JSON.stringify(data));
    //         console.log("##############api.call  success  end#############");
    //         console.log(JSON.stringify(data.result[0].statusCount));
    //         waitJieDan.text = data.result[0] &&  data.result[0].statusCount || 0;
    //         finish.text = data.result[1] && data.result[1].statusCount || 0;
    //         waitYuYue.text = data.result[2] && data.result[2].statusCount || 0;
    //         waitQianShou.text = data.result[3] && data.result[3].statusCount || 0;
    //         wenti.text = data.result[4] && data.result[4].statusCount || 0;
    //         chaoshi.text = data.result[5] && data.result[5].statusCount || 0;
    //         noDaohuo.text = data.result[6] && data.result[6].statusCount || 0;
    //         fanhuo.text = data.result[7] && data.result[7].statusCount || 0;
    //         weixiu.text = data.result[8] && data.result[8].statusCount || 0;
    //     }catch(e){
    //
    //     }
    //
    // }).fail((err)=>{
    //     console.log(err)
    // })
    //var vm=new ViewModel();

    //console.dump(vm.detailList);
    if (page.android) {
        if (!config.ad) {
            page.showModal('/views/index/advertisement/advertisement', { items: [] }, function(selectedItem) {}, true);
        }
        config.ad = true;
    } else {
        if (!config.ad) {
            var label = new UILabel();
            label.text = "选择服务区域后，我们系统能更精准的推送任务到你的APP，方便师傅更好的服务";
            label.height = 66;
            label.numberOfLines = 2;
            // label.font =  UIFont().systemFontOfSize(12);
            label.textColor = new UIColor().redColor;
            var options = {
                title: "为了系统更好的推送任务",
                message: "请师傅选择服务区域\n\n选择服务区域后,我们系统能更精准的推送任务到你的APP,方便师傅更好的服务.",
                cancelButtonText: "取消",
                okButtonText: "立即选择",
                // nativeView: label
            };
            dialog.show(options).then(function(r) {
                if (r) {
                    console.log("~~~~~~~~~~~~~");
                    var topmost = frameModule.topmost();
                    var navigationEntry = {
                        moduleName: "views/my/city_select_two/city_select_two",
                        animated: true,
                    }
                    topmost.navigate(navigationEntry);
                }
            });
        }
        config.ad = true;
    }
    /*轮播图*/
    // slideContainer = page.getViewById("slides");
    // time = timer.setInterval(() => {
    //     slideContainer.nextSlide();
    // }, 3000);
};

HomeIndex.prototype.onWeiTi = function() {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "views/task/question-list/question-list",
    }
    topmost.navigate(navigationEntry);
};
HomeIndex.prototype.testDemo = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/test/test");

};
//我的钱包
HomeIndex.prototype.onMoneyTap = function() {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: 'views/walletDeposit/myWallet/myWallet',
    }
    topmost.navigate(navigationEntry)
}

/*搜索*/
HomeIndex.prototype.onSearch = function() {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        clearHistory: false,
        moduleName: 'views/task/search/search',
    }
    topmost.navigate(navigationEntry)
};

/*超时件*/
HomeIndex.prototype.onChaoShi = function() {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        clearHistory: false,
        moduleName: 'views/task/overtime_order/overtime_order',
    }
    topmost.navigate(navigationEntry)
};

HomeIndex.prototype.onJieDan = function() {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        clearHistory: true,
        moduleName: "views/task/index",
        context: { "index": 0},
    }
    topmost.navigate(navigationEntry)
};

HomeIndex.prototype.onQianShou = function() {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        clearHistory: true,
        moduleName: "views/task/index",
        context: { "index": 3}
    }
    topmost.navigate(navigationEntry);
};

HomeIndex.prototype.onYuYue = function() {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        clearHistory: true,
        moduleName: "views/task/index",
        context: { "index": 1},
    }
    topmost.navigate(navigationEntry)
};
HomeIndex.prototype.onWeiXiu = function() {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        clearHistory: true,
        moduleName: "views/task/maintenance-task/maintenance-task",
    }
    topmost.navigate(navigationEntry)
};

HomeIndex.prototype.onFanHuo = function() {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        clearHistory: true,
        moduleName: "views/task/return-task/return-task",
    }
    topmost.navigate(navigationEntry)
};
HomeIndex.prototype.onMessageTap = function() {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "views/message/message-center/message-center",
    }
    topmost.navigate(navigationEntry)
};
// HomeIndex.prototype.onWeiDao = function () {
//     var topmost = frameModule.topmost();
//     var navigationEntry = {
//         clearHistory: false,
//         moduleName: "views/task/arrival-task/arrival-task",
//     }
//     topmost.navigate(navigationEntry)
// };
HomeIndex.prototype.onWanCheng = function() {
    // var topmost = frameModule.topmost();
    // var navigationEntry = {
    //     clearHistory: false,
    //     moduleName: "views/task/history-task/history-task",
    // }
    // topmost.navigate(navigationEntry)
    var topmost = frameModule.topmost();
    var navigationEntry = {
        clearHistory: true,
        moduleName: "views/task/index",
        context: { "index": 4, },
    }
    topmost.navigate(navigationEntry)
};
HomeIndex.prototype.Grid_style = function(args) {
    var thisPage = args.object.page;

    if (thisPage.android) {
        thisPage.showModal('/views/index/dialogs/balance-dialogs', { items: [] }, function(selectedItem) {}, false);
    }
};

/*广告*/
HomeIndex.prototype.onSlidesList = function(args) {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        clearHistory: false,
        moduleName: "views/index/slides-list/slides-list",
    }
    topmost.navigate(navigationEntry)
};

module.exports = new HomeIndex();