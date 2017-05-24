"use strict";
var observable = require("data/observable");
var phone = require("nativescript-phone");

var onClose;
var thisPage;

function onShownModally(args) {
    thisPage = args.object;
    onClose = args.closeCallback;
    thisPage.bindingContext = new observable.Observable({
        pickupPhone: args.context['pickupPhone'] || false,
        receivePersonPhone: args.context['receivePersonPhone'],
        selectedItem: null
    });
}

function onItemIndexChange(arg) {
    var items = thisPage.bindingContext.get('selectedItem'), selectedItem = items[arg.index];
    thisPage.bindingContext.set('selectedItem', selectedItem);
}

function closeModal() {
    thisPage.closeModal();
}

function saveItem() {
    // onClose(thisPage.bindingContext.get('selectedItem'));
}

function receivePersonPhone(){
    var phoneNumber=thisPage.bindingContext.get('receivePersonPhone');
    console.log("receivePersonPhone:"+phoneNumber)
    phone.dial(phoneNumber,false);
}

function pickupPhone(){
    var phoneNumber=thisPage.bindingContext.get('pickupPhone');
    phone.dial(phoneNumber,false);
}


exports.saveItem = saveItem;
exports.onShownModally = onShownModally;
exports.closeModal = closeModal;
exports.onItemIndexChange = onItemIndexChange;
exports.receivePersonPhone = receivePersonPhone;
exports.pickupPhone = pickupPhone;



