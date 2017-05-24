var frameModule = require("ui/frame");
var view = require("ui/core/view");
var color = require("color");
var visibility = require("ui/enums");
var dialogsAlert = require("../../../common/dialogsUtil");
var observableModule = require("data/observable");
var nstoasts = require("nativescript-toasts");
var textFieldModal = require("ui/text-field");

var globle = require("ui/core/dependency-observable");

var observableArrayModule = require("data/observable-array");
var api = require('../../../shared/api');
var config = require("../../../shared/config");
var device = require("platform").device;
var platformNames = require("platform").platformNames;
var utils = require("utils/utils");
var page;
var inputText;
var firstTextField;
var secondTextField;
var thirdTextField;
var fourthTextField;
var fifthTextField;
var sixthTextField;

var textfieldArray;

// 输入的密码字符串
var propertyValue;

function onBackTap(args) {
    frameModule.topmost().goBack();
}

// 页面加载时触发此事件
exports.loaded = function (args) {
    propertyValue = "";
    page = args.object;
    firstTextField = view.getViewById(page, "firstTextField");
    secondTextField = view.getViewById(page, "secondTextField");
    thirdTextField = view.getViewById(page, "thirdTextField");
    fourthTextField = view.getViewById(page, "fourthTextField");
    fifthTextField = view.getViewById(page, "fifthTextField");
    sixthTextField = view.getViewById(page, "sixthTextField");

    inputText = view.getViewById(page, "input");

    //inputText.visibility = "collapse";

    // 把 textfield 对象都加入到数组中...
    textfieldArray = new observableArrayModule.ObservableArray([firstTextField, secondTextField, thirdTextField, fourthTextField, fifthTextField, sixthTextField]);

    //把所有的输入框内容清空
    for (var i = 0; i < textfieldArray.length; i++) {
        var textfiled = textfieldArray.getItem(i);
        textfiled.text = "";
    }

    inputText.focus();
    if (device.os == platformNames.android) {
        var array = [];
        array[0] = new android.text.InputFilter.LengthFilter(6);
        inputText.android.setFilters(array);
        var imm = utils.ad.getInputMethodManager();
        imm.toggleSoftInput(args.object.android, android.view.inputmethod.InputMethodManager.SHOW_FORCED);
    }
    inputText.maxValue = 6;

    inputClick();
};

function inputClick() {

    var bindingContext = new observableModule.Observable({
        textFieldInput: ''
    });
    page.bindingContext = bindingContext;

    bindingContext.on(observableModule.Observable.propertyChangeEvent, function (propertyChangeData) {

        // console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);

        var count = propertyChangeData.value.length;
        var arrayLength = textfieldArray.length;


        //  将输入的字符串分割存于数组中
        var arr = propertyChangeData.value.split("");
        var array = new observableArrayModule.ObservableArray(arr);


        for (var i = 0; i < arrayLength; i++) {
            var textfield = textfieldArray.getItem(i);
            if (i < count) {
                textfield.text = array.getItem(i);
            } else {
                textfield.text = '';
            }
        }

        if (count <= 6) {
            propertyValue = propertyChangeData.value;
        } else {
            propertyValue = propertyChangeData.value.substring(0, 6);
        }

    });
}

function comfirmBtnTap() {
    var topmost = frameModule.topmost();
    //后退返回到指定页面
    if (propertyValue.length == 6) {
        // idNO: idNO,
        // pwd: pwd,
        // resetPayPwd:true
        if (page.navigationContext.resetPayPwd != undefined && page.navigationContext.resetPayPwd == true) {
            var idNO = page.navigationContext.idNO;
            var pwd = page.navigationContext.pwd;
            var newPwd1 = page.navigationContext.propertyValue;
            if (propertyValue != newPwd1) {
                dialogsAlert.alert("新密码不一致，请重新输入");
                // 把所以输入框内容都清空
                inputText.text = "";
                for (var i = 0; i < textfieldArray.length; i++) {
                    var textfiled = textfieldArray.getItem(i);
                    textfiled.text = "";
                }
            } else {
                api.call(config.apiUrl, {
                    name: "userWorkerController.checkPayPwd",
                    args: [{
                        idNO: idNO,
                        pwd: pwd
                    }]
                }).ok(
                    data => {
                        api.call(config.apiUrl, {
                            name: "userWorkerController.resetPwd",
                            args: [{
                                pwd: propertyValue
                            }]
                        }).ok(data => {
                            topmost.goBack(topmost.backStack[topmost.backStack.length - 3]);
                            dialogsAlert.alert("重设密码成功");
                        }).fail(fail => {
                            dialogsAlert.alert(fail.error);
                            // 把所以输入框内容都清空
                            inputText.text = "";
                            for (var i = 0; i < textfieldArray.length; i++) {
                                var textfiled = textfieldArray.getItem(i);
                                textfiled.text = "";
                            }
                        });
                    }
                ).fail(fail => {
                    dialogsAlert.alert(fail.error);
                    // 把所以输入框内容都清空
                    inputText.text = "";
                    for (var i = 0; i < textfieldArray.length; i++) {
                        var textfiled = textfieldArray.getItem(i);
                        textfiled.text = "";
                    }
                });
            }

        } else {
            var payPassword = page.navigationContext.payPassword
            if (propertyValue != payPassword) {
                dialogsAlert.alert("新密码不一致，请重新输入");
                inputText.text = "";
                for (var i = 0; i < textfieldArray.length; i++) {
                    var textfiled = textfieldArray.getItem(i);
                    textfiled.text = "";
                }
            } else {
                var oldPayPassword = page.navigationContext.oldPayPassword;
                api.call(config.apiUrl, {
                    name: "userWorkerController.updatePayPwd",
                    args: [{
                        payPassword: propertyValue,
                        oldPayPassword: oldPayPassword
                    }]
                }).ok(
                    data => {
                        topmost.goBack(topmost.backStack[topmost.backStack.length - 3]);
                        var options = {
                            text: "密码修改成功",
                            duration: nstoasts.DURATION.LONG,
                            position: nstoasts.POSITION.CENTER //optional
                        }
                        nstoasts.show(options);

                    }).fail(
                    fail => {
                        dialogsAlert.alert(fail.error)
                        inputText.text = "";
                        for (var i = 0; i < textfieldArray.length; i++) {
                            var textfiled = textfieldArray.getItem(i);
                            textfiled.text = "";
                        }
                    });
            }
            
        }
    } else {
        dialogsAlert.alert("密码长度错误")
    }


}


exports.onBackTap = onBackTap;
exports.comfirmBtnTap = comfirmBtnTap;