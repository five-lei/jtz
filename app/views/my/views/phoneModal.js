"use strict";
var observable_1 = require("data/observable");
var phone = require( "nativescript-phone" );
var config = require("../../../shared/config");
var onClose;
var thisPage;
function onShownModally(args) {
    thisPage = args.object;
}
exports.onShownModally = onShownModally;

function closeModal() {
    thisPage.closeModal();
}
exports.closeModal = closeModal;
function phoneTap(args) {
    phone.dial(config.phone,false);
    thisPage.closeModal();
}
exports.phoneTap = phoneTap;
