var frame = require("ui/frame")
var dialogs = require("ui/dialogs")
var config = require("../../../shared/config");
var api = require('../../../shared/api');

var page;
var oldPwd;
var newPwd;
var againPwd;
var options = {
    title: "提示",
    message: "",
    okButtonText: "确认"
};
exports.loaded = (args) => {
    page = args.object.page;
    oldPwd = page.getViewById("oldPwd");
    newPwd = page.getViewById("newPwd");
    againPwd = page.getViewById("againPwd");
}

function onBackTap(args) {
    frame.topmost().goBack();
}

function help(args) {
    var thisPage = args.object.page;
    thisPage.showModal('/views/my/views/phoneModal', function() {});
}

function next_btn(args) {
    if (!oldPwd.text) {
        options.message = "请输入原始密码";
        dialogs.confirm(options).then((result) => {});
        return;
    } else if (!(/[a-zA-Z\d]{6,20}$/.test(oldPwd.text))) {
        options.message = "原始密码输入不正确";
        dialogs.confirm(options).then((result) => {});
        return;
    } else if (!newPwd.text) {
        options.message = "请输入新密码";
        dialogs.confirm(options).then((result) => {});
        return;
    } else if (!againPwd.text) {
        options.message = "请确认新密码";
        dialogs.confirm(options).then((result) => {});
        return;
    } else if (newPwd.text.length < 6 || newPwd.text.length > 20) {

        options.message = "请输入6-20位密码";
        dialogs.alert(options).then(() => {});
        return false;
    } else if (!(/[a-zA-Z\d]{6,20}$/.test(newPwd.text))) {

        options.message = "密码只能包含数字和字母";
        dialogs.alert(options).then(() => {});
        return false;
    } else if (newPwd.text != againPwd.text) {
        options.message = "两次输入密码不一致";
        dialogs.confirm(options).then((result) => {});
        return;
    } else if (oldPwd.text == newPwd.text) {
        options.message = "新旧密码不能一样";
        dialogs.confirm(options).then((result) => {});
        return;
    } else {
        console.log(config.token);
        try {
            var qureyParams = {
                "name": "userController.updatePwd",
                "args": [{ pwd: newPwd.text, oldPwd: oldPwd.text }],
            };
            api.call(config.apiUrl, qureyParams).ok((data) => {
                var navigationEntry = {
                    moduleName: 'views/regLogin/loninview/lonin',
                    clearHistory: true,
                }
                frame.topmost().navigate(navigationEntry)
            }).fail((err) => {
                options.message = "修改失败";
                dialogs.alert(options).then(() => {});
            })
        } catch (error) {}
    }

}



exports.onBackTap = onBackTap
exports.help = help
exports.next_btn = next_btn