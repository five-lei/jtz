var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var api = require('../../../shared/api');
var config = require("../../../shared/config");
var phone = require("nativescript-phone");
var cache = require("nativescript-cache");
var mobile;
// 帮助提示信息
exports.dialForHelp = function() {
    phone.dial(config.phone, false);
    console.log(config.phone);
}

var realName;
var refereePhone;
var page;
var pwd;
var navi;
var options = {
    title: "提示",
    message: "",
    okButtonText: "确认"
};
var myPortrait;

exports.onBackTap = function() {
    var topmost = frameModule.topmost();
    topmost.goBack();
}

exports.loaded = function(args) {
        page = args.object;
        realName = page.getViewById("realName");

        try {
            navi = page.navigationContext;
            mobile = navi.info;
            pwd = navi.pwd;
            refereePhone = page.getViewById("refereePhone");
            //放置头像的元素
            myPortrait = page.getViewById("portrait");
            myPortrait_ios = page.getViewById("myPortrait_ios");
        } catch (e) {
            console.log(e);
        }

    var userInfo = cache.get("userInfo");
    if (userInfo) {
        var info = JSON.parse(userInfo);
        myPortrait.src = info["portrait"];
    }

    }
    //完成完成注册跳到选择样式页面
var topmost = frameModule.topmost();

function Complete_Regist() {
    console.log(realName.text);
    console.log("sssssss");
    console.log(realName.text);
    if (!realName.text) {
        options.message = "请输入真实姓名";
        dialogsModule.confirm(options).then((result) => {});
        return;
    }
    try {
        if (!realName.text) {
            options.message = "请输入姓名";
            dialogsModule.confirm(options).then((result) => {});
            return;
        } else if (!(/^([A-Za-z]|[\u4E00-\u9FA5])+$/.test(realName.text))) {
            options.message = "姓名只能包含汉字和字母";
            dialogsModule.confirm(options).then((result) => {});
            return;
        } else if (refereePhone.text) {
            if (!(/^1[34578]\d{9}$/.test(refereePhone.text))) {
                options.message = "请输入正确的手机号码";
                dialogsModule.confirm(options).then((result) => {});
            }
            return;
        } else {
            // topmost.navigate("views/regLogin/Servicetype/Service_type1");
        }
        console.log(realName.text);
        console.log("sssssss");

    } catch (e) {

    }


    var requestParam = {
        "name": "userWorkerController.setUserRealName",
        "args": [{
            "mobile": mobile,
            "realName": realName.text
        }],
    };
    api.call(config.apiUrl, requestParam).ok((json) => {

    }).fail((json) => {

    });
    console.dump(navi);
    var navigationEntry = {
        moduleName: "views/regLogin/Servicetype/Service_type1",
        context: {
            mobile: mobile,
            pwd: pwd
        },
    };
    topmost.navigate(navigationEntry);
    // topmost.navigate("views/regLogin/Servicetype/Service_type1");
}

/**更换头像 */
function addHeadPortrait(args) {
    var navigationEntry = {
        moduleName: 'views/my/changehead/changehead',
        context: {
            mobile: mobile
        }
    }
    frameModule.topmost().navigate(navigationEntry);
}
exports.addHeadPortrait = addHeadPortrait;

exports.Complete_Regist = Complete_Regist;

// 已有账号登录
exports.goto_login = function() {
    topmost.navigate("views/regLogin/loninview/lonin");
}