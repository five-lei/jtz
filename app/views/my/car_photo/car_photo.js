var frame = require("ui/frame");
var phone = require( "nativescript-phone" );

function onBackTap(args) {
    frame.topmost().goBack();
}

//点击客服
function onPhone(args) {
    phone.dial("4006-006-111",false);
}

function SaveTap(args) {
    // var navigationEntry = {
    //     moduleName: 'views/my/myset/myset',
    // }
    // frame.topmost().navigate(navigationEntry)
}


exports.onBackTap = onBackTap
exports.onPhone = onPhone
exports.SaveTap = SaveTap