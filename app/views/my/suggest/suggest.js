var frame = require("ui/frame");
var color = require("color");
var dialogsModule = require("ui/dialogs");
var utilsModule = require("utils/utils");
var thispage;
var content;
var num;
var phone;
var suggest;
var complaint;
var select= true;

var observableModule = require("data/observable");
var source = new observableModule.Observable();

exports.loaded = function(args) {
    thisPage = args.object;
    content = thisPage.getViewById("content");//输入内容TextField
    num = thisPage.getViewById("num");//字数变化
    phone = thisPage.getViewById("phone");//输入的手机号
    suggest = thisPage.getViewById("suggest");//功能意见按钮
    complaint = thisPage.getViewById("complaint");//业务投诉按钮

    content && content.on("propertyChange", ((args) => {
        console.log(content.text.length);
        num.text = content.text.length;
    }));
    if (args.object.android){
        /*限制输入框输入长度*/
        var fArray = [];
        fArray[0] = new android.text.InputFilter.LengthFilter(120);
        content.android.setFilters(fArray);
    }else{

    }
    content && content.on("propertyChange", ((args) => {
        var tField = args.object;
        num.text = tField.text.length;
    }));
}

//返回事件
function onBackTap(args) {
    content.dismissSoftInput();
    frame.topmost().goBack();
}

//功能意见点击事件
function onSuggestTap(args) {
    select = true;
    suggest.style.backgroundColor = new color.Color("#fff0df");
    suggest.style.color=new color.Color("#fb8901");
    suggest.style.borderColor = new color.Color("#fb8901");
    
    complaint.style.backgroundColor = new color.Color("#eeeeee");
    complaint.style.color=new color.Color("#666666");
    complaint.style.borderColor = new color.Color("#eeeeee");
}

//业务投诉点击事件
function onComplaintTap(args) { 
    select =false;
    suggest.style.backgroundColor = new color.Color("#eeeeee");
    suggest.style.color=new color.Color("#666666");
    suggest.style.borderColor = new color.Color("#eeeeee");
    
    complaint.style.backgroundColor = new color.Color("#fff0df");
    complaint.style.color=new color.Color("#fb8901");
    complaint.style.borderColor = new color.Color("#fb8901");
}

//提交意见反馈
function conmmit(args) { 
    if(content.text==""){
        dialogsModule.alert({
        message: "内容不能为空哦！",
        okButtonText: "OK"
        });
    }else{
        if(select){
        console.log("功能意见");
        }else{
        console.log("业务投诉")
        } 
    }
    
}


exports.onBackTap = onBackTap
exports.onSuggestTap = onSuggestTap
exports.onComplaintTap = onComplaintTap;
exports.conmmit = conmmit;