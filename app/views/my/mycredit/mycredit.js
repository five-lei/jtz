var frame = require("ui/frame");
var phone = require( "nativescript-phone" );
var config = require("../../../shared/config");

function onBackTap(args) {
    frame.topmost().goBack();
}

function onCreditTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/introduction/introduction',
        context: {"tapType": 4,}
    }
    frame.topmost().navigate(navigationEntry)
}

exports.onQuery =function () {
    phone.dial(config.phone,false);
}
exports.onBackTap = onBackTap
exports.onCreditTap = onCreditTap