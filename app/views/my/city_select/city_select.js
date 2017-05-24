var frame = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var page;

var pageData = new observableModule.fromObject({
    provinceList: new ObservableArray([
        { province: "北京" },
        { province: "上海" },
        { province: "湖南" },
        { province: "湖北" },
        { province: "北京" },
        { province: "上海" },
        { province: "湖南" },
        { province: "湖北" },
        { province: "北京" },
        { province: "湖北" }
    ])
});

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
};

function onBackTap(args) {
    frame.topmost().goBack();
}

function toCityOne(args) {
   var navigationEntry = {
        moduleName: 'views/my/city_select_one/city_select_one',
        backstackVisible: false
    }
    frame.topmost().navigate(navigationEntry)
}


exports.onBackTap = onBackTap
exports.toCityOne = toCityOne
