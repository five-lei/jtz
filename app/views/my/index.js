var frame = require("ui/frame");
var visibility = require("ui/enums");
var phone = require("nativescript-phone");
var myPlatform = require("nativescript-platform");
var socialShare = require("nativescript-social-share");
var imageSource = require("image-source");
var config = require("../../shared/config");
var cache = require("nativescript-cache");
var Person = {
    "person_name": "王师傅",
    "real_name": "0",
    "person_type": "0",
    "person_security": "1"
};
var thisPage;
var person_img; //用户头像
var person_real; //是否认证
var person_name; //用户名字
var person_type_img; //用户类型图片
var person_type; //用户类型
var security_y; //有评分
var security_n; //无评分
var BasePage = require('../../shared/BasePage');
var api = require('../../shared/api');
var observable = require("data/observable");
var hasIdentify;//是否认证
var userIdStatus;
var paymentType;//月结或普通
var creditStar;//是否有评分..0代表没有
var creditStarView;//评分
function MyPageIndex() {

}
MyPageIndex.prototype = new BasePage();
MyPageIndex.prototype.constructor = MyPageIndex;

MyPageIndex.prototype.loaded = function (args) {
    var thisPage = args.object.page;
    person_img = thisPage.getViewById("person_img"); //用户头像
    person_real = thisPage.getViewById("person_real"); //是否认证
    person_name = thisPage.getViewById("person_name"); //用户名字
    person_type_img = thisPage.getViewById("person_type_img");
    person_type = thisPage.getViewById("person_type");
    creditStarView = thisPage.getViewById("creditStar");

    security_y = thisPage.getViewById("security_y");
    security_n = thisPage.getViewById("security_n");

    var userInfo = cache.get("userInfo");
    if (userInfo) {
        var info = JSON.parse(userInfo);
        person_img.src = info["portrait"] || "";
        person_name.text = info["realName"] || "";
    }
    personReal();
}
//设置
function personReal() {
    // person_real.text = "zzz";
    api.call(config.apiUrl, {
        name: "userController.queryIfUserIdAuth",
        args: []
    }).ok(data => {
        hasIdentify = data.result.hasIdentify;
        userIdStatus = data.result.userIdStatus;
        paymentType=data.result.paymentType;
        creditStar=data.result.creditStar;//
        creditStarView.text=creditStar;
        console.log("++++++++++++++++++++++");
        console.log(JSON.stringify(data.result));

        if (creditStar == "0") {
            security_n.style.visibility = "visible";
            security_y.style.visibility = "collapsed";
        } else {
            security_n.style.visibility = "collapsed";
            security_y.style.visibility = "visible";
        }
        if(paymentType == "月结"){
            person_type_img.src = "res://yjyh";
            person_type.text = "月结用户";
        }else{
            person_type_img.src = "res://ordinary";
            person_type.text = "普通用户";
        }
        switch (userIdStatus) {
            case 'unauthorized':
                person_real.text = "审核中";
                // person_real.style.visibility = "visible";
                break;
            case 'certified':
                // person_real.style.visibility = "collapsed";
                person_real.text = "已认证";
                break;
            case 'notcert':
                person_real.text = "未实名认证";
                // person_real.style.visibility = "visible";
                break;
            default:
                // person_real.style.visibility = "visible";
                person_real.text = "未实名认证";
        }
    }).fail(failed => {
        console.log("----------erro---------");

    });
}

function onSetTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/setting/setting',
    }
    frame.topmost().navigate(navigationEntry)
}

//意见反馈
function onSuggestTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/suggest/suggest',
    }
    frame.topmost().navigate(navigationEntry)
}

//关于我们  
function onAboutTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/about/about',
    }
    frame.topmost().navigate(navigationEntry)
}

//我的车辆
function onCarTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/mycar/mycar',
    }
    frame.topmost().navigate(navigationEntry)
}

//信用等级
function onCreditTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/mycredit/mycredit',
    }
    frame.topmost().navigate(navigationEntry)
}

//个人信息
function onPersonalTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/presentation/presentation',
        context: {
            "person_security": creditStar,
            "person_type": paymentType,
        },
    }
    frame.topmost().navigate(navigationEntry)
}

//是否认证
function onAttestationTap(args) {
        if(hasIdentify){
             //已认证
            var navigationEntry = {
            moduleName: 'views/my/driver_message/driver_message',
            };
        }else{
            //未认证
            var navigationEntry = {
            moduleName: 'views/my/driver/driver',
            };
        }
        frame.topmost().navigate(navigationEntry)
}

MyPageIndex.prototype.shareImage = function () {
    var image = imageSource.fromFile("~/images/nativescript.jpg");
    socialShare.shareImage(image);
};
//邀请好友
function onShare(args) {
    socialShare.shareText("I love NativeScript!");
}

//我的二维码
function onCodeTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/mycode/mycode',
    }
    frame.topmost().navigate(navigationEntry)
}

//我的钱包
function onMoneyTap(args) {
    var navigationEntry = {
        moduleName: 'views/walletDeposit/myWallet/myWallet',
    }
    frame.topmost().navigate(navigationEntry)
}

//我的好友
function onFriendsList(args) {
    var navigationEntry = {
        moduleName: 'views/regLogin/friend_manage/friend_listview',

    }
    frame.topmost().navigate(navigationEntry)
}

function onToscore(args) {
    if (myPlatform.android) {
        console.log("android");

    } else {
        console.log("ios");

    }
}
//历史任务
function onHistoryTask() {
    var navigationEntry = {
        moduleName: 'views/task/history-task/history-task',
    }
    frame.topmost().navigate(navigationEntry)
}
//联系客服
function onPhone(args) {
    phone.dial(config.phone, false);
}

//我的收藏
function onCollectTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/mycollection/mycollection',
    }
    frame.topmost().navigate(navigationEntry)
}

function onMessage() {
    var navigationEntry = {
        moduleName: 'views/message/message-center/message-center',
    }
    frame.topmost().navigate(navigationEntry)
}
MyPageIndex.prototype.onSetTap = onSetTap
MyPageIndex.prototype.onSuggestTap = onSuggestTap
MyPageIndex.prototype.onAboutTap = onAboutTap
MyPageIndex.prototype.onCarTap = onCarTap
MyPageIndex.prototype.onCreditTap = onCreditTap
MyPageIndex.prototype.onPersonalTap = onPersonalTap
MyPageIndex.prototype.onCodeTap = onCodeTap
MyPageIndex.prototype.onMoneyTap = onMoneyTap;
MyPageIndex.prototype.onToscore = onToscore
MyPageIndex.prototype.onPhone = onPhone;
MyPageIndex.prototype.onFriendsList = onFriendsList;
MyPageIndex.prototype.onCollectTap = onCollectTap;
MyPageIndex.prototype.onHistoryTask = onHistoryTask;
MyPageIndex.prototype.onAttestationTap = onAttestationTap;
MyPageIndex.prototype.onShare = onShare;
MyPageIndex.prototype.onMessage = onMessage;


module.exports = new MyPageIndex()