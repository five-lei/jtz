var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var observableArrayModule = require("data/observable-array");
var visibility = require("ui/enums");
var api = require('../../../shared/api.js');
var config = require('../../../shared/config.js');
var ViewModal = require("./depositeRecord-modal");

var clientState = false;

function onBackTap(args) {
    frameModule.topmost().goBack();
}

function loaded(args) {

    var page = args.object;

    clientState = page.navigationContext.clientState;
    page.bindingContext = new ViewModal.viewModal();

}

exports.itemClick = function (args) {
    var wtNo = args.object.wtNo;
    var month_wtNo = args.object.orderInfo;
    var topmost = frameModule.topmost();

    if (clientState){ // 月结用户
        var navigationEntry = {
            moduleName: "views/walletDeposit/underWayDepositeInformation/underWayDepositeInformation",
            context: {
                "wtNo": month_wtNo
            },
            animated: true
        };
    }else {  // 普通用户
        var navigationEntry = {
            moduleName: "views/walletDeposit/checkDetail/checkDetail",
            context: {
                "wtNo": wtNo
            },
            animated: true
        };
    }

    topmost.navigate(navigationEntry);
}

exports.loaded = loaded;

exports.onBackTap = onBackTap;