var frame = require("ui/frame")

function onBackTap(args) {
    frame.topmost().goBack();
}

function next_btn(args) {
   var navigationEntry = {
        moduleName: 'views/my/change_psd_two/change_psd_two'
    }
    frame.topmost().navigate(navigationEntry)
}

exports.onBackTap = onBackTap
exports.next_btn = next_btn;