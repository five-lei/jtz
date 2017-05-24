"use strict";
var observable_1 = require("data/observable");
var config = require("../../../shared/config");
var thisPage;
var textfield;
var onClose;
function onShownModally(args) {
    thisPage = args.object;
    textfield = thisPage.getViewById("textfield");
    onClose = args.closeCallback;
    thisPage.bindingContext = new observable_1.Observable({
        items: args.context.items,
        TaskId: null
    });
}
exports.onShownModally = onShownModally;

function closeModal() {
    thisPage.closeModal();
}
exports.closeModal = closeModal;
function saveModal() {
    config.imTaskId = textfield.text;
    thisPage.bindingContext.set('TaskId', textfield.text);
    console.log(thisPage.bindingContext.get('TaskId'));
    onClose(thisPage.bindingContext.get('TaskId'));
}
exports.saveModal = saveModal;
        