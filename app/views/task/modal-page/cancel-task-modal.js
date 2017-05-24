"use strict";
var observable = require("data/observable");
var phone = require("nativescript-phone");

var onClose=null;
var thisPage=null;

function onShownModally(args) {
    thisPage = args.object;
    onClose = args.closeCallback;
    thisPage.bindingContext = new observable.Observable({
        reasonText: args.context['reasonText']
    });
}

function reject() {
    thisPage.closeModal(false);
}

function confirm(args) {
    var page=args.object.page;
    var reasonText=page.getViewById('cancel-reason-textview').text;
    onClose(true,reasonText);
}


exports.confirm = confirm;
exports.onShownModally = onShownModally;
exports.reject = reject;



