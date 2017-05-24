var observableModule = require("data/observable");

var selectOne = false;
var selectTwo = false;

exports.loaded = function (args) {
    var page = args.object;
    // var distributionSelect = page.getViewById("distributionSelect");
    // var installSelect = page.getViewById("installSelect");

    var distributionSource = new observableModule.Observable({
        selectedOne : selectOne,
        selectedTwo : selectTwo
    });
    page.bindingContext = distributionSource;
}

exports.distributionSelectTap = function (args) {
    selectOne = !selectOne;
    var distributionSelect = args.object;

    distributionSelect.bindingContext = new observableModule.Observable({
        selectedOne : selectOne
    });
}

exports.installSelectTap = function (args) {
    selectTwo = !selectTwo;
    var installSelect = args.object;

    installSelect.bindingContext = new observableModule.Observable({
        selectedTwo : selectTwo
    })
}