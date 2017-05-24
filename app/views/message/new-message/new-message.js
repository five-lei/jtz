
var frameModule = require("ui/frame");

var viewModal = require("./new-message-modal");


/*返回上一级*/
exports.return = function() {
    frameModule.topmost().goBack();
};
exports.loaded = function(args) {
    var page = args.object;
    page.bindingContext = viewModal.viewModal(args);
};

