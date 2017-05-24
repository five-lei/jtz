var frame = require("ui/frame")
var dialogs = require("ui/dialogs")
var config = require("../../../shared/config");
var api = require('../../../shared/api');
var wait = 60;
var timer = null;
var thisPage;
var code_btn;
var newPhone;
var code;
var options = {
    title: "提示",
    message: "",
    okButtonText: "确认"
};

exports.loaded = function(args) {
    thisPage = args.object.page;
    code_btn = thisPage.getViewById("code_btn");
    newPhone = thisPage.getViewById("newPhone");
    code = thisPage.getViewById("code");
}

function onBackTap(args) {
    frame.topmost().goBack();
    clearTimeout(timer);
    wait = 60;
    code_btn.isEnabled = true;
}

function next_btn(args) {

    if (!code.text) {
        options.message = "请输入验证码";
        dialogs.confirm(options).then((result) => {});
        return;
    }
    try {
        var qureyParams = {
            "name": "userController.updateMobile",
            "args": [{
                validateCode: code.text,
                mobile: newPhone.text
            }],
        };
        api.call(config.apiUrl, qureyParams).ok((data) => {
            thisPage.showModal('/views/my/views/exampleModal', function() {

            });
            clearTimeout(timer);
            wait = 60;
            code_btn.isEnabled = true;
            code_btn.text = "重新获取";
        }).fail((err) => {
            if (err.code) {
                options.message = err.error;
            } else {
                options.message = "系统出错";
            }

            dialogs.confirm(options).then((result) => {});
        });
    } catch (error) {
        // throw error;
    }
}

function help(args) {
    thisPage.showModal('/views/my/views/phoneModal', function() {});
}

function get_code(args) {
    if (wait != 60) {
        return;
    }
    if (!newPhone.text) {
        options.message = "请输入手机号";
        dialogs.confirm(options).then((result) => {});
        return;
    }
    if (!(/^1[34578]\d{9}$/.test(newPhone.text))) {
        options.message = "请输入正确的手机号";
        dialogs.confirm(options).then((result) => {});
        return;
    }
    try {
        var qureyParams = {
            "name": "userController.getValidateCode",
            "args": [{
                validateCodeMobile: newPhone.text
            }],
        };
        api.call(config.apiUrl, qureyParams).ok((data) => {
            changeTime();
        }).fail((err) => {
            if (err.code) {
                options.message = err.error;
            } else {
                options.message = "系统出错,获取失败";
            }
            dialogs.alert(options).then(() => {});
        });
    } catch (error) {}

}

function changeTime() {
    if (wait == 0) {
        code_btn.isEnabled = true;
        code_btn.text = "重新获取";
        wait = 60;
    } else {
        code_btn.isEnabled = false;
        code_btn.text = "重新发送(" + wait + ")";
        wait--;
        timer = setTimeout(function() {
                changeTime()
            },
            1000)
    }
}

exports.onBackTap = onBackTap
exports.next_btn = next_btn;
exports.help = help;
exports.get_code = get_code