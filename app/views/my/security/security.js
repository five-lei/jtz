var frame = require("ui/frame")
var cache = require("nativescript-cache");
var mobile;

exports.loaded = function(args) {
    thisPage = args.object.page;
    mobile = thisPage.getViewById("mobile");
    mobile.text = cache.get('cacheLoginPhone') || "";
}

function onBackTap(args) {
    frame.topmost().goBack();
}

function change_psd(args) {
    var navigationEntry = {
        moduleName: 'views/my/change_psd_two/change_psd_two',
    }
    frame.topmost().navigate(navigationEntry)
}

function change_phone(args) {
    var navigationEntry = {
        moduleName: 'views/my/change_phone_one/change_phone_one',
    }
    frame.topmost().navigate(navigationEntry)
}

exports.onBackTap = onBackTap
exports.change_psd = change_psd
exports.change_phone = change_phone