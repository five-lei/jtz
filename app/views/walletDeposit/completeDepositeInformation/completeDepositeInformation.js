var frameModule = require("ui/frame");

function onBackTap(args) {
    frameModule.topmost().goBack();
}


exports.onBackTap = onBackTap;