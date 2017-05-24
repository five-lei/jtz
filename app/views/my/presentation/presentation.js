var frame = require("ui/frame");
var visibility = require("ui/enums");
var labelModule = require("ui/label");
var buttonModule = require("ui/button");
var stackLayoutModule = require("ui/layouts/stack-layout");
var ViewModel = require('./presentation-view-model');
var socialShare = require("nativescript-social-share");
var name; //用户名字-后台给
var person_security; //有无评分-后台给
var person_type; //用户类型-后台给
var cache = require("nativescript-cache");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var api = require('../../../shared/api');
var config = require("../../../shared/config");
var page
var serviceInfo;
var rankInfo = new observableModule.Observable({
    rankStar: '2.3'
});

var starsInfo = new observableModule.Observable({
    star1: true,
    star2: true,
    star3: true,
    star4: false,
    star5: false
});

exports.loaded = function (args) {
    page = args.object.page;
    queryServiceList();
    context = page.navigationContext;
    person_security = context.person_security;
    person_type = context.person_type;
    console.log(person_security);
    var person_name = page.getViewById("person_name"); //用户名字
    var security_y = page.getViewById("security_y"); //有评分
    var security_n = page.getViewById("security_n"); //无评分
    var img_type = page.getViewById("img_type"); //用户类型
    var portrait = page.getViewById("portrait"); //用户头像

    // 评分
    var text_score = page.getViewById("text_score");
    text_score.text = person_security;
    // 星星

    serviceShowInfo = page.getViewById('serviceShow');
    serviceShowInfo.bindingContext = serviceInfo;

    var userInfo = cache.get("userInfo");
    if (userInfo) {
        var info = JSON.parse(userInfo);
        portrait.src = info["portrait"];
        person_name.text = info["realName"];
    }

    if (person_type == "月结") {
        img_type.src = "res://yuejie";
    } else {
        img_type.src = "res://putong";
    }
    if (person_security =="0") {
        security_n.style.visibility = "visible";
        security_y.style.visibility = "collapsed";
    } else {
        security_n.style.visibility = "collapsed";
        security_y.style.visibility = "visible";
    }



}



function initServiceArea(areas) {
    var list_view = page.getViewById("list-view");
    list_view.removeChildren();
    var viewModel = new ViewModel().init(areas).detailList;
    for (var i = 0; i < viewModel.length; i++) {
        var Label = new labelModule.Label();
        Label.cssClass = "text_province";
        Label.verticalAlignment = "center"
        Label.text = viewModel[i].province;
        list_view.addChild(Label);
        var stackLayout = new stackLayoutModule.StackLayout();
        stackLayout.cssClass = "text_city";
        stackLayout.orientation = "vertical";
        list_view.addChild(stackLayout);
        var labelLine = new labelModule.Label();
        labelLine.cssClass = "line";
        list_view.addChild(labelLine);
        for (var j = 0; j < viewModel[i].city.length; j++) {
            var StackLayout = new stackLayoutModule.StackLayout();
            StackLayout.orientation = "horizontal"
            var label = new labelModule.Label();
            label.verticalAlignment = "center";
            label.text = viewModel[i].city[j].city_name+"-";
            StackLayout.addChild(label);
            stackLayout.addChild(StackLayout);
            for (var k = 0; k < viewModel[i].city[j].district.length; k++) {
                var label = new labelModule.Label();
                label.verticalAlignment = "center";
                label.text = viewModel[i].city[j].district[k].district_name+",";
                StackLayout.addChild(label);
            }
        }
        
    }
}

function queryServiceList() {
    //请求服务列表
    api.call(config.apiUrl, {
        name: "userWorkerController.getUserDetail",
        args: [{}]
    }).ok(
        data => {
            //地区
            var areas = data.result.arealist;
            //服务类型
            var basicServices = data.result.userWokerBasicServices;
            JSON.stringify()
            if (areas) {
                initServiceArea(areas);
            }
            var servicesObservable = [];
            if (basicServices) {
                basicServices.forEach(data => {
                    if (data) {
                        var serviceName = data.typeName.name;
                        if (data.typeOfService[0]) {
                            var serviceSetup = data.typeOfService[0].label;
                        }
                        if (data.typeOfService[1]) {
                            var serviceAssign = data.typeOfService[1].label;
                        }

                        var service = {
                            serviceName: serviceName || "",
                            serviceSetup: serviceSetup || "",
                            serviceAssign: serviceAssign || ""
                        }
                        servicesObservable.push(service);
                    }
                });
                basicObj = new ObservableArray(servicesObservable);
            }
            var serviceInfo = new observableModule.fromObject({
                serviceList: basicObj
            });
            serviceShowInfo = page.getViewById('serviceShow');
            serviceShowInfo.bindingContext = serviceInfo;

        }
    ).fail(fail => {

    });
}
//返回
function onBackTap(args) {
    frame.topmost().goBack();
}

//分享
function onShare(args) {
    socialShare.shareText("I love NativeScript!");
}

//信用等级
function onCreditTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/mycredit/mycredit',
    }
    frame.topmost().navigate(navigationEntry)
}

//编辑个人信息
function onEditTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/myset/myset',
    }
    frame.topmost().navigate(navigationEntry)
}

exports.gotoAllFriends = function () {
    var navigationEntry = {
        moduleName: 'views/regLogin/friend_manage/friend_listview',
    }
    frame.topmost().navigate(navigationEntry)
}


exports.onBackTap = onBackTap;
exports.onShare = onShare;
exports.onEditTap = onEditTap;
exports.onCreditTap = onCreditTap;