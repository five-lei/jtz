var frameModule = require("ui/frame");
var config = require("../../../shared/config");
var api = require('../../../shared/api');
var layout = require("ui/layouts/grid-layout");
var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var dialogs = require("ui/dialogs");
var page;
var addresssData
//  = new observableModule.fromObject({
//     groceryList: new ObservableArray([{
//             province: "广东省",
//             city: "广州市-白云区,天河区，越秀区"
//         },
//         {
//             province: "北京市",
//             city: "北京市-朝阳区,东城区"
//         },
//         {
//             province: "陕西省",
//             city: "西安市-碑林区,莲湖区，高新区"
//         }
//     ])
// })
;
var mobile;
// var serviceInfo = new observableModule.fromObject({
//     serviceList: new ObservableArray([
//         { serviceName: "地板", serviceSetup: '安装', serviceAssign: "配送" },
//         { serviceName: "大理石", serviceSetup: '安装', serviceAssign: "配送" },
//         { serviceName: "窗帘", serviceSetup: '安装', serviceAssign: "配送" },
//         { serviceName: "电视柜", serviceSetup: '安装', serviceAssign: "配送" },
//         { serviceName: "冰箱", serviceSetup: '安装', serviceAssign: "配送" },
//         { serviceName: "洗衣机", serviceSetup: '安装', serviceAssign: "配送" }
//     ])
// });

var id;
// 添加好友按钮是否显示控制
var addFriendsDiaplay = new observableModule.Observable({
    showControl: true
});

var masterInfo = new observableModule.Observable({
    masterName: '沃尔玛'
});

var rankInfo = new observableModule.Observable({
    rankStar: '3.8'
});

var portraitInfo = new observableModule.Observable({
    picSource: 'res://timg'
});

var starsInfo = new observableModule.Observable({
    star1: true,
    star2: true,
    star3: true,
    star4: true,
    star5: true
});

// 选中的服务类型数组
var selectedType;
// 页面加载时创建的ViewModel实例
var saveContent;

function initData() {
    api.call(config.apiUrl, {
        name: "userWorkerController.getUserDetail",
        args: [{
            mobile: mobile
        }]
    }).ok(
        data => {
            //地区
            var arealist = data.result.arealist;
            //服务类型
            var basicServices = data.result.userWokerBasicServices;
            var creditStar = data.result.creditStar;
            var portrait = data.result.user.portrait[0];
            var realName = data.result.user.realName;

            //绑定地区
            var provinces = [];
            arealist.forEach(each => {
                var provinceName = each.name;
                var childNodes = each.childNodes;
                var cityNames = [];
                childNodes.forEach(child => {
                    var cityName = child.name + "-";
                    child.childNodes.forEach(grandson => {
                        if (grandson) {
                            var districtName = grandson.name;
                            // if(arguments[1]<arguments[2].length){
                            cityName += districtName + ",";
                            // }else{
                            //     cityName+=districtName;
                            // }

                        }
                    });
                    cityNames.push(cityName);
                });
                provinces.push({
                    province: provinceName,
                    city: cityNames[0],
                    cityNames: cityNames
                })
            });

            var addresssData = new observableModule.fromObject({
                groceryList: new ObservableArray(provinces)
            });

            addressInfo = page.getViewById('addressShow');
            addressInfo.bindingContext = addresssData;

            if (realName) {
                masterInfo.masterName = realName;
            }
            if (creditStar) {
                rankInfo.rankStar = creditStar;
                switch (Math.round(rankInfo.rankStar)) {
                    case 0:
                        starsInfo.star1 = false, starsInfo.star2 = false, starsInfo.star3 = false, starsInfo.star4 = false, starsInfo.star5 = false;
                        break;
                    case 1:
                        starsInfo.star1 = true, starsInfo.star2 = false, starsInfo.star3 = false, starsInfo.star4 = false, starsInfo.star5 = false;
                        break;
                    case 2:
                        starsInfo.star1 = true, starsInfo.star2 = true, starsInfo.star3 = false, starsInfo.star4 = false, starsInfo.star5 = false;
                        break;
                    case 3:
                        starsInfo.star1 = true, starsInfo.star2 = true, starsInfo.star3 = true, starsInfo.star4 = false, starsInfo.star5 = false;
                        break;
                    case 4:
                        starsInfo.star1 = true, starsInfo.star2 = true, starsInfo.star3 = true, starsInfo.star4 = true, starsInfo.star5 = false;
                        break;
                    case 5:
                        starsInfo.star1 = true, starsInfo.star2 = true, starsInfo.star3 = true, starsInfo.star4 = true, starsInfo.star5 = true;
                        break;
                    default:
                        ;
                        break;
                }
            }
            if (portrait) {
                portraitInfo.picSource = portrait;
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

exports.loaded = function (args) {
    page = args.object;
    mobile = page.navigationContext.nameOrMobile;
    serviceShowInfo = page.getViewById('serviceShow');

    // serviceShowInfo.bindingContext = serviceInfo;

    var context = page.navigationContext;

    // 添加好友按钮是否显示
    var whetherAddFriends = page.getViewById("whetherAddFriends");
    whetherAddFriends.bindingContext = addFriendsDiaplay;
    // 师傅用户名
    var master_name = page.getViewById("master_name");
    master_name.bindingContext = masterInfo;
    // 评分
    var text_score = page.getViewById("text_score");
    text_score.bindingContext = rankInfo;
    // 头像
    var protraitPic = page.getViewById("portrait");
    protraitPic.bindingContext = portraitInfo;
    // 星星
    var starsCount = page.getViewById("countStars");
    starsCount.bindingContext = starsInfo;

    initData();
    // 星星个数控制

    //师傅用户id
    id = context.id;
};
//添加好友
exports.addFriends = function () {
    var qureyParams = {
        "name": "userWorkerController.userWorkerFriendAdd",
        "args": [{
            "friendId": id
        }]
    };
    try {
        api.call(config.apiUrl, qureyParams).ok((data) => {
            var result = data.result || {};
            var friendId = result.friendId || {};
            if (friendId) {
                var topmost = frameModule.topmost();

                var options = {
                    title: "提示",
                    message: "添加成功"
                };
                dialogs.confirm(options).then((result) => {
                    topmost.goBack();
                });
            } else {
                var options = {
                    title: "提示",
                    message: "添加失败"
                };
                dialogs.confirm(options).then((result) => {});
            }
        }).fail((err) => {
            var options = {
                title: "提示",
                message: err.error
            };
            dialogs.confirm(options).then((result) => {});
        })
    } catch (e) {

    }
}

exports.onBackTap = function () {
    var topmost = frameModule.topmost();
    topmost.goBack();
}

exports.gotoCredentials = function () {
    var topmost = frameModule.topmost();
    topmost.navigate('views/my/driver_message/driver_message');
}

exports.gotoMyCredit = function () {
    var topmost = frameModule.topmost();
    topmost.navigate('views/my/mycredit/mycredit');
}

// exports.addFriends = function(){
//     var options = {
//         title: "提示",
//         message: "添加成功"
//     };
//     dialogs.confirm(options).then((result) => {
//         // result can be true/false/undefined
//         var topmost=frameModule.topmost();
//         // topmost.navigate('views/regLogin/friend_manage/search_results');
//         topmost.goBack();
//     });
// }

exports.shareFriendInfo = function () {
    var SocialShare = require("nativescript-social-share");
    var imageSourceModule = require("image-source");
    // var image = imageSourceModule.fromFile("~/path/to/myImage.jpg");
    // SocialShare.shareImage(image);
    SocialShare.shareText("I love NativeScript!");
}