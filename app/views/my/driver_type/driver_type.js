var frame = require("ui/frame")

function onBackTap(args) {
    frame.topmost().goBack();
}

function onDriverTap(args) {
   var navigationEntry = {
        moduleName: 'views/my/driver/driver',
    }
    frame.topmost().navigate(navigationEntry)
}

function onDriverCPTap(args) {
   var navigationEntry = {
        moduleName: 'views/my/driver_company/driver_company',
    }
    frame.topmost().navigate(navigationEntry)
}

function onHelp(args) {
    var thisPage = args.object.page;
    thisPage.showModal('/views/my/views/phoneModal',  function () {
    });
}

exports.onBackTap = onBackTap;
exports.onDriverTap = onDriverTap;
exports.onDriverCPTap = onDriverCPTap;
exports.onHelp = onHelp;
