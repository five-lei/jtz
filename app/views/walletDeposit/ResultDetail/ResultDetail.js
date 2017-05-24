var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
function onNavBtnTap(args) {
    frameModule.topmost().goBack();
}

function onNavigatingTo(args) {
    var page = args.object;
    var source = new Observable();

    // 获取当前时间
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    // 月份
    month = ((month >= 1 && month <= 9) ? "0"+month : month);
    //日期
    strDate = ((strDate >= 0 && strDate <= 9) ? "0" + strDate : strDate);

    hours = ((hours >= 0 && hours <= 9) ? "0"+hours : hours);
    minutes = ((minutes >= 0 && minutes <= 9) ? "0"+minutes : minutes);
    seconds = ((seconds >= 0 && seconds <= 9) ? "0" + seconds : seconds);

    // 当前的时间
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + hours + seperator2 + minutes
        + seperator2 + seconds;

    // 3个工作日后

    source.depositeTime = currentdate;
    source.arriveTime = currentdate;

    page.bindingContext = source;
}

exports.onNavBtnTap = onNavBtnTap;
exports.onNavigatingTo = onNavigatingTo;