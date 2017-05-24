"use strict";
var viewModel = require("../../../view-models/car-dialog-view-model");
var config = require("../../../shared/config");
var thisPage;

exports.loaded = function(args) {
    thisPage = args.object;
    thisPage.bindingContext = new viewModel.ViewModel();
}

function closeModal() {
    
     thisPage.closeModal();  
}
exports.closeModal = closeModal;

