var frameModule = require("ui/frame");

var ViewModal = require("./historyDepositeRecord-modal");

function onBackTap(args) {
    frameModule.topmost().goBack();
}

function loaded(args) {

    var page = args.object;

    page.bindingContext = new ViewModal.viewModal();

}

exports.itemClickMethod = function (args) {
    var wtNo = args.object.wtNo;

    var topmost = frameModule.topmost();

    var navigationEntry = {
        moduleName: "views/walletDeposit/checkDetail/checkDetail",
        context: {
            "wtNo": wtNo
        },
        animated: true
    };
    topmost.navigate(navigationEntry);
}

exports.loaded = loaded;

exports.onBackTap = onBackTap;