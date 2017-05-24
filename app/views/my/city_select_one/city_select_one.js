var frame = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var CityListViewModel = require("../../../view-models/city-list-view-model");
var page;
var visibility = require("ui/enums");
var cityList = new CityListViewModel([]);

var pageData = new observableModule.fromObject({
    cityList: cityList
});

exports.loaded = function(args) {
    page = args.object;
    var listView = page.getViewById("lv2");
    page.bindingContext = pageData;
    console.log(cityList);

    cityList.empty();
    pageData.set("isLoading", true);
    cityList.load().then(function() {
        pageData.set("isLoading", false);
        listView.animate({
            opacity: 1,
            duration: 1000
        });
    });
};

function onBackTap(args) {
    frame.topmost().goBack();
}

function toCityOne(args) {
   var page = args.object.page;
   var lv1 = page.getViewById("lv1");
   var lv2 = page.getViewById("lv2");
   lv1.style.visibility = "visible";
   lv2.style.visibility = "collapsed";
}

function toCityTwo(args) {
   var page = args.object.page;
   var lv1 = page.getViewById("lv1");
   var lv2 = page.getViewById("lv2");
   lv1.style.visibility = "collapsed";
   lv2.style.visibility = "visible";
}


exports.onBackTap = onBackTap
exports.toCityOne = toCityOne;
exports.toCityTwo = toCityTwo;
