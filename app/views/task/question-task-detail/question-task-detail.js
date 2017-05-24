/**
 * Created by giscafer on 2017/3/17.
 */

var topmost = require("ui/frame").topmost;
var Observable = require("data/observable").Observable;
var navigator = require("../../../common/navigator");
var color = require("color");

var ViewModel = require('./view-model');

var models=new ViewModel();
exports.onBackTap = function(args) {
    navigator.navigateBack();
};

exports.textChangedHandler = function(args) {
    console.log(111);
};

exports.pageLoaded = function(args) {
	var globePage=args.object;
    var matterRecordId = globePage.navigationContext.matterRecordId;
    if(matterRecordId){
        models.init(globePage,matterRecordId);
    }
    console.log(matterRecordId);
};


exports.onNodeInfoTap = function (args) {

    var page = args.object.page;
    var node_info_content = page.getViewById("node_info_content");
    var fhreturn_info_content = page.getViewById("fhreturn_info_content");
    var exception_content = page.getViewById("exception_content");
    var suggest = page.getViewById("node_label");
    suggest.style.color = new color.Color("#fb8901");
    suggest.style.borderColor = new color.Color("#fb8901");

    var complaint = page.getViewById("exception_label");
    complaint.style.color = new color.Color("#666666");
    complaint.style.borderColor = new color.Color("#eeeeee");

    var fhreturn = page.getViewById("fhreturn_label");
    fhreturn.style.color = new color.Color("#666666");
    fhreturn.style.borderColor = new color.Color("#eeeeee");

    if (node_info_content.visibility !== 'visible') {
        node_info_content.visibility = "visible";
    }

    if (fhreturn_info_content.visibility !== 'collapse') {
        fhreturn_info_content.visibility = "collapse";
    }
    if (exception_content.visibility !== 'collapse') {
        exception_content.visibility = "collapse";
    }

}

exports.onFhreturnTap = function (args) {

    var page = args.object.page;
    var node_info_content = page.getViewById("node_info_content");
    var fhreturn_info_content = page.getViewById("fhreturn_info_content");
    var exception_content = page.getViewById("exception_content");
    var suggest = page.getViewById("node_label");
    suggest.style.color = new color.Color("#666666");
    suggest.style.borderColor = new color.Color("#eeeeee");

    var fhreturn = page.getViewById("fhreturn_label");
    fhreturn.style.color = new color.Color("#fb8901");
    fhreturn.style.borderColor = new color.Color("#fb8901");

    var complaint = page.getViewById("exception_label");
    complaint.style.color = new color.Color("#666666");
    complaint.style.borderColor = new color.Color("#eeeeee");

    if (node_info_content.visibility !== 'collapse') {
        node_info_content.visibility = "collapse";
    }
    if (fhreturn_info_content.visibility !== 'visible') {
        fhreturn_info_content.visibility = "visible";
    }
    if (exception_content.visibility !== 'collapse') {
        exception_content.visibility = "collapse";
    }

}

exports.onExceptionInfoTap = function (args) {
    var page = args.object.page;
    var node_info_content = page.getViewById("node_info_content");
    var fhreturn_info_content = page.getViewById("fhreturn_info_content");
    var exception_content = page.getViewById("exception_content");
    var suggest = page.getViewById("node_label");
    suggest.style.color = new color.Color("#666666");
    suggest.style.borderColor = new color.Color("#eeeeee");
    var fhreturn = page.getViewById("fhreturn_label");
    fhreturn.style.color = new color.Color("#666666");
    fhreturn.style.borderColor = new color.Color("#eeeeee");

    var complaint = page.getViewById("exception_label");
    complaint.style.color = new color.Color("#fb8901");
    complaint.style.borderColor = new color.Color("#fb8901");
    if (exception_content.visibility !== 'visible') {
        exception_content.visibility = "visible";
    }

    if (fhreturn_info_content.visibility !== 'collapse') {
        fhreturn_info_content.visibility = "collapse";
    }
    if (node_info_content.visibility !== 'collapse') {
        node_info_content.visibility = "collapse";
    }

}