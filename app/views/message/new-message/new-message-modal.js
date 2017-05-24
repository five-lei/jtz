var Observable = require("data/observable").Observable;

var systemText;
var voiceText;
var shakeText;

var state_one;
var state_two;
var state_three;

exports.viewModal = function (args) {
    page = args.object;
    systemText = page.getViewById("system-text");
    voiceText = page.getViewById("voice-text");
    shakeText = page.getViewById("shake-text");

    var viewModal = new Observable();

    // 系统通知
    if (systemText.text == "开启"){
        viewModal.selected = true;
        state_one = true;
    }else{
        viewModal.selected = false;
        state_one = false;
    }

    // 声音
    if (voiceText.text == "开启"){
        viewModal.voiceSelected = true;
        state_two = true;
    }else {
        viewModal.voiceSelected = false;
        state_two = false;
    }

    //震动
    if (shakeText.text == "开启"){
        viewModal.shakeSelected = true;
        state_three = true;
    }else {
        viewModal.shakeSelected = false;
        state_three = false;
    }

    //系统消息通知
    viewModal.iosMessageNoticClick = function () {
        state_one = !state_one;
        if (state_one){
            this.set("selected",true);
            systemText.text = "开启";
        }else{
            this.set("selected",false);
            systemText.text = "关闭";
        }
    }

    // 声音
    viewModal.iosVoiceNoticClick = function () {
        state_two = !state_two;
        if (state_two){
            this.set("voiceSelected",true);
            voiceText.text = "开启";
        }else {
            this.set("voiceSelected",false);
            voiceText.text = "关闭";
        }
    }

    // 震动
    viewModal.iosShakeNoticClick = function () {
        state_three = !state_three;
        if (state_three){
            this.set("shakeSelected",true);
            shakeText.text = "开启";
        }else {
            this.set("shakeSelected",false);
            shakeText.text = "关闭";
        }
    }

    return viewModal;
}