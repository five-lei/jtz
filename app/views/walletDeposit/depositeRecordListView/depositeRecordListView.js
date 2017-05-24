var frameModule = require("ui/frame");

var view = require("ui/core/view");
var ViewModal = require("./depositeRecordListView-modal");

function onBackTap(args) {
    frameModule.topmost().goBack();
}

function onNavigatingTo(args) {
    var page = args.object;

    page.bindingContext = new ViewModal.viewModal();
}

exports.itemClick = function (args) {
    var wtNo = args.object.wtNo;
    var topmost = frameModule.topmost();
    console.log("$$$$"+wtNo);
    var navigationEntry = {
        moduleName: "views/walletDeposit/underWayDepositeInformation/underWayDepositeInformation",
        context: {
            "wtNo": wtNo
        },
        animated: true
    };

    topmost.navigate(navigationEntry);
}

exports.onNavigatingTo = onNavigatingTo;
exports.onBackTap = onBackTap;