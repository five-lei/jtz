var viewModel = require("./advertisementModel");
var observable_1 = require("data/observable");
var frameModule = require("ui/frame");
var onClose;
var thisPage;

exports.loaded = function(args) {
    thisPage = args.object;
    onClose = args.closeCallback;
    thisPage.bindingContext = new viewModel.ViewModel(thisPage);
}

function closeModal() {
    // onClose(thisPage.bindingContext.get('dataItems'));
    thisPage.closeModal();
}
exports.closeModal = closeModal;
exports.select = function () {
    thisPage.closeModal();
    var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "views/my/city_select_two/city_select_two",
        animated:true,
    }
    topmost.navigate(navigationEntry);
}