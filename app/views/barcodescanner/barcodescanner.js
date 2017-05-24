/**
 * Created by Administrator on 2017/4/1.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_view_model_1 = require("./barcodescanner-view-model");
// Event handler for Page "loaded" event attached in main-page.xml
function pageLoaded(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.pageLoaded = pageLoaded;