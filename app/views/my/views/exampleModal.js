"use strict";
var observable_1 = require("data/observable");
var frame = require("ui/frame")
var onClose;
var thisPage;

function onShownModally(args) {
    thisPage = args.object;
    onClose = args.closeCallback;
    thisPage.bindingContext = new observable_1.Observable({
        items: args.context.items,
        selectedItem: null
    });
}
exports.onShownModally = onShownModally;

function onItemIndexChange(arg) {
    var items = thisPage.bindingContext.get('items'),
        selectedItem = items[arg.index];
    thisPage.bindingContext.set('selectedItem', selectedItem);
}
exports.onItemIndexChange = onItemIndexChange;

function closeModal() {
    var navigationEntry = {
        moduleName: 'views/regLogin/loninview/lonin',
        clearHistory: true,
    }
    frame.topmost().navigate(navigationEntry);
    thisPage.closeModal();
}
exports.closeModal = closeModal;

function saveItem() {
    // onClose(thisPage.bindingContext.get('selectedItem'));
}
exports.saveItem = saveItem;