var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var app = require("application");
var contacts = require("nativescript-contacts");

var page;
var groceryList = new ObservableArray([]);
var pageData = new observableModule.fromObject();

var Observable = require("data/observable").Observable;
var cityInfo;
// 输入框文本信息 id='cityName'
var cityText;
var content;
var receipt_address;
var districtId;
exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;

    content = page.navigationContext;
    receipt_address = page.getViewById("receipt-address");
    if (content != undefined) {
        receipt_address.text = content.msg;
        districtId = content.district_id;
    } else {
        receipt_address.text = "请选择城市";
        districtId = null;
    }

    cityInfo = new Observable({
        cityNameContent: ''
    });

    // page.getViewById('cityName').bindingContext = cityInfo;

    // while (groceryList.length-1) {
    //     groceryList.pop();
    // }
    if (groceryList.length == 0) {
        contacts.getAllContacts().then(function(args) {
            console.log("getAllContacts Complete");

            var str = JSON.stringify(args.data);
            console.debug("!!!!!!!!!!!!!" + str);
            var citys = eval('(' + str + ')');

            if (page.android) {
                for (var i in citys) {
                    console.debug(JSON.stringify(citys[i].name.displayname));
                    console.debug(JSON.stringify(citys[i].phoneNumbers));
                    groceryList.push({ name: JSON.stringify(citys[i].name.displayname), phone: JSON.stringify(citys[i].phoneNumbers.value), image: "res://yilogo" })
                }
            }

            if (page.ios) {
                for (var i in citys) {
                    var name = JSON.stringify(citys[i].name.family);
                    var phone = JSON.stringify(citys[i].phoneNumbers[0].value);
                    groceryList.push({ name: name, phone: phone, image: "res://yilogo" })
                }
            }
        }, function(err) {
            console.log("Error: " + err);
        });
    }

    pageData.set("groceryList", groceryList);
}

function chooseCity() {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "views/common/area-select/area-select"
    }
    topmost.navigate(navigationEntry);
}

exports.onNavigatingTo = function(args) {

}

exports.pullToRefreshInitiated = function(args) {
    page = args.object;
    setTimeout(function() {
        groceryList.push({ name: "郑伟建", phone: "185296459", image: "res://yilogo" });
        page.getViewById("list-view").notifyPullToRefreshFinished();
    }, 2000);
};

exports.search_frined = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/regLogin/friend_manage/search_friend");
}

exports.item_intent = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/regLogin/friend_manage/friend_detail");
}
exports.onBackTap = function() {
    var topmost = frameModule.topmost();
    topmost.goBack()
}

exports.search_result = function(args) {
    // cityText = page.getViewById('cityName').text;
    // cityInfo.cityNameContent = cityText;

    var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "views/regLogin/friend_manage/search_results",
        context: {
            "nameOrMobile": '',
            // 地址
            'addressChoose':receipt_address,
            // 地址ID
            'addressID':districtId
        }
    }
    topmost.navigate(navigationEntry);
}

exports.chooseCity = chooseCity;