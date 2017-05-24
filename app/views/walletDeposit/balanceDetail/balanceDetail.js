var frameModule = require("ui/frame");

var viewModal = require("./balanceDetail-modal");


function onBackTap(args) {
    frameModule.topmost().goBack();
}

function loaded(args) {
    var page = args.object;

    page.bindingContext = new viewModal.viewModal(page);

}
exports.loaded = loaded;
exports.onBackTap = onBackTap;


