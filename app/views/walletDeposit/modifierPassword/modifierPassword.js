var frameModule = require("ui/frame");
var view = require("ui/core/view");
var color = require("color");
var visibility = require("ui/enums");
var api = require('../../../shared/api');
var config = require("../../../shared/config");
var dialogsAlert = require("../../../common/dialogsUtil");
var observableModule = require("data/observable");

var textFieldModal = require("ui/text-field");

var globle = require("ui/core/dependency-observable");

var observableArrayModule = require("data/observable-array");
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
var navi;

// 输入的密码字符串
var propertyValue ;

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

    textfieldArray = new observableArrayModule.ObservableArray([firstTextField, secondTextField, thirdTextField, fourthTextField, fifthTextField, sixthTextField]);

    // 把所以输入框内容都清空
    for (var i = 0; i < textfieldArray.length; i++) {
        var textfiled = textfieldArray.getItem(i);
        textfiled.text = "";
    }

    inputText.focus();

    // 安卓端限制输入字符数量
    if (device.os == platformNames.android) {
        var array = [];
        array[0] = new android.text.InputFilter.LengthFilter(6);
        inputText.android.setFilters(array);
        var imm = utils.ad.getInputMethodManager();
        imm.toggleSoftInput(args.object.android, android.view.inputmethod.InputMethodManager.SHOW_FORCED);
    }
    inputText.maxValue = 6;

    inputClick();
    navi = args.object.navigationContext;

};

function inputClick() {

    var bindingContext = new observableModule.Observable({
        textFieldInput: ''
    });
    page.bindingContext = bindingContext;

    bindingContext.on(observableModule.Observable.propertyChangeEvent, function (propertyChangeData) {

        console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);

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

//跳转到确认支付密码页面
exports.jumpConfirmPassword = function () {

    if (propertyValue.length < 6) {
        dialogsAlert.alert("请输入六位数字密码");
    } else {
        if (navi.resetPayPwd != undefined&&navi.resetPayPwd==true) {
            var idNO = navi.idNO;
            var pwd = navi.pwd;
            var navigateEntry = {
                moduleName: "views/walletDeposit/confirmPassword/confirmPassword",
                context: {
                    idNO: idNO,
                    pwd: pwd,
                    resetPayPwd:true,
                    propertyValue:propertyValue
                }
            }
            var topmost = frameModule.topmost();
            topmost.navigate(navigateEntry);
        } else {
            oldPwd = page.navigationContext.oldPayPassword;
            var navigateEntry = {
                moduleName: "views/walletDeposit/confirmPassword/confirmPassword",
                context: {
                    oldPayPassword: oldPwd,
                    payPassword: propertyValue
                }
            }
            var topmost = frameModule.topmost();
            topmost.navigate(navigateEntry);
        }
    };
}


exports.onBackTap = onBackTap;