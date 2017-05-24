var frame = require("ui/frame")

function onBackTap(args) {
    frame.topmost().goBack();
}

function IntroductionTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/introduction/introduction',
        context: {"tapType": 1,}
    }
    frame.topmost().navigate(navigationEntry)
}

function ServiceTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/introduction/introduction',
        context: {"tapType": 2,}
    }
    frame.topmost().navigate(navigationEntry)
}

function HelpTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/introduction/introduction',
        context: {"tapType": 3,}
    }
    frame.topmost().navigate(navigationEntry)
}

exports.IntroductionTap = IntroductionTap;
exports.ServiceTap = ServiceTap;
exports.HelpTap = HelpTap;
exports.onBackTap = onBackTap;