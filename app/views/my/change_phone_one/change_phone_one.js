var frame = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var fetchModule = require("fetch");
var config = require("../../../shared/config");
var cache = require("nativescript-cache");
var text_psd;

exports.loaded = function(args) {
    var page = args.object.page;
    text_psd = page.getViewById("text_psd");
}

function onBackTap(args) {
    frame.topmost().goBack();
}

function help(args) {
    var thisPage = args.object.page;
    thisPage.showModal('/views/my/views/phoneModal', function() {});
}

function next_btn(args) {
    if (text_psd.text == "") {
        dialogsModule.alert({
            message: "请输入正确的登录密码！",
            okButtonText: "确定"
        });
    } else {
        fetchModule.fetch(config.loginUrl, {
            method: "POST",
            body: JSON.stringify({
                mobile: cache.get('cacheLoginPhone') || "",
                password: text_psd.text,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                var navigationEntry = {
                    moduleName: 'views/my/change_phone_two/change_phone_two'
                }
                frame.topmost().navigate(navigationEntry)
            } else {
                var options = {
                    title: "提示",
                    message: "密码不匹配"
                };
                dialogsModule.alert(options);
                //错误信息
                console.log(res.statusText);
            }
        });

    }

}

exports.onBackTap = onBackTap
exports.next_btn = next_btn
exports.help = help