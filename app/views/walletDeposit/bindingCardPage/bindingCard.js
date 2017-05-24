var frameModule = require("ui/frame");
var view = require("ui/core/view");
var cache = require("nativescript-cache");
var color = require("color");
var api = require('../../../shared/api');
var config = require("../../../shared/config");
var dialogsAlert = require("../../../common/dialogsUtil");

var observableModule = require("data/observable");
var myPlatform = require( "nativescript-platform" );

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
var count;
var textfieldArray;
var isOldPasswordExist;
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

    var actionBarTitle = view.getViewById(page, "actionBarTitle");
    var welcomeTitle = view.getViewById(page, "welcomeTitle");
    inputText = view.getViewById(page, "input");

    isOldPasswordExist = page.navigationContext.isOldPasswordExist;

    //   判断是要验证支付密码还是设置支付密码
    if (isOldPasswordExist) {   // 有支付密码
        if (myPlatform.android) {
            actionBarTitle.text = "验证支付密码";
        }else{
            actionBarTitle.title = "验证支付密码";
        }
        welcomeTitle.text = "请验证支付密码";
    }else {   // 没有支付密码
        if (myPlatform.android) {
            actionBarTitle.text = "设置支付密码";
        }else{
            actionBarTitle.title = "设置支付密码";
        }
        welcomeTitle.text = "请设置支付密码";
    }

    textfieldArray = new observableArrayModule.ObservableArray([firstTextField, secondTextField, thirdTextField, fourthTextField, fifthTextField, sixthTextField]);
    // 把所以输入框内容都清空
    for (var i = 0; i < textfieldArray.length; i++) {
        var textfiled = textfieldArray.getItem(i);
        textfiled.text = "";
    }

    inputText.focus();
    //  inputText.visibility = "collapse";
    if (device.os == platformNames.android) {
        var array = [];
        array[0] = new android.text.InputFilter.LengthFilter(6);
        inputText.android.setFilters(array);
        var imm = utils.ad.getInputMethodManager();
        imm.toggleSoftInput(args.object.android, android.view.inputmethod.InputMethodManager.SHOW_FORCED);
    }
    inputClick();
};


function inputClick() {
    var bindingContext = new observableModule.Observable();
    page.bindingContext = bindingContext;

    bindingContext.on(observableModule.Observable.propertyChangeEvent, function (propertyChangeData) {

        console.log("LL" + propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);

        count = propertyChangeData.value.length;
        if (count <= 6) {
            propertyValue = propertyChangeData.value;
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
        } else {
            propertyValue = propertyChangeData.value.substring(0, 6);
        }

    });

}

exports.jumpBindindCardPage = function (args) {
    if (device.os == platformNames.android) {
        // var imm = utils.ad.getInputMethodManager();
        utils.ad.dismissSoftInput();
    }
    if (propertyValue.length < 6) {
        dialogsAlert.alert("请输入六位数字密码");
    } else {
        if (isOldPasswordExist) {  //
            checkPayPwd(propertyValue);
        } else {
            setPayPwd(propertyValue);
        }
    }
};

// 判断是否绑定过银行卡
function checkPayPwd(propertyValue) {
    api.call(config.apiUrl, {
        name: "userWorkerController.checkPwd",
        args: [{oldPayPassword: propertyValue}]
    }).ok(data => {
        var vUserWorker = data.result;
        var topmost = frameModule.topmost();
        console.dump(vUserWorker);
        if (vUserWorker.hasBankCard == true) {
            //跳转到显示银行卡
            topmost.navigate("views/walletDeposit/bankCard/bankCard")
        } else if (vUserWorker.hasBankCard == false) {
            //跳转到绑定银行卡
            topmost.navigate("views/walletDeposit/setBindingPage/bindingPage")
        } else {
            console.log("查询是否有银行卡失败");
        }
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

// 跳转到确认支付密码页面
function setPayPwd(propertyValue) {
    var topmost = frameModule.topmost();
    // topmost.navigate("views/walletDeposit/setBindingPage/bindingPage")

    var navigationEntry={
        moduleName:"views/walletDeposit/setConfirmPassword/setConfirmPassword",
        context:{
            password:propertyValue
        }
    }
    // topmost.navigate("views/walletDeposit/bindingCardPage/bindingCard");
    topmost.navigate(navigationEntry);

}

exports.inputClick = inputClick;
exports.onBackTap = onBackTap;