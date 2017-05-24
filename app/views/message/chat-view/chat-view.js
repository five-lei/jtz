"use strict";
var frameModule = require("ui/frame");
var Timer = require("timer");
var platformModule = require("platform");
var config = require("../../../shared/config");
var TypeUtils = require("utils/types");
var ViewModel = require("./chat-view-model");
var visibility = require("ui/enums");
var camera = require("nativescript-camera");
var api = require('../../../shared/api');
var config = require("../../../shared/config");
var dialogsAlert = require("../../../common/dialogsUtil");
var DatePickerManager = require("nativescript-timedatepicker");
var nstoasts = require("nativescript-toasts");
var moment = require('moment');
var dialogs = require("ui/dialogs");
var topmost = frameModule.topmost();
var visibility = require("ui/enums");
var select = false;
var textfield;
var grid;
var page;
var message_list;
var messageArry = [];
var timeArry = [];
var groupId;
var content;
var message;
var photos;
var timer = null;
var ImageUploadPicker = require("../../../shared/imageUpload").ImageUploadPicker;
var imageUploadPicker = new ImageUploadPicker();
var sendPhoto;
var top_type;
var top_task;
var top_id;
var top_receive;
var top_message;
var top_types;
var top_header;
var contentType;
var taskStatus;
var statusType;

exports.loaded = function (args) {
    page = args.object;
    messageArry = [];
    var context = page.navigationContext;
    var title = page.getViewById("title");
    top_type = page.getViewById("top_type");
    top_task = page.getViewById("top_task");
    top_receive = page.getViewById("top_receive");
    top_message = page.getViewById("top_message");
    top_types = page.getViewById("top_types");
    top_header = page.getViewById("top_header");
    title.text = context.name;
    console.log(context.name);
    groupId = context.groupId;
    grid = page.getViewById("grid");
    message_list = page.getViewById("message_list");
    textfield = page.getViewById("textfield");
    message = textfield.text;
    queryChatMessageDefault(groupId);
    queryTaskInfo(groupId);
    timer = setInterval(function () {
            queryChatMessage(groupId)
        },
        8000)
};

function onNavigatingTo(args) {
    page = args.object;
    sendPhoto = page.getViewById("sendPhoto");
}
exports.onNavigatingTo = onNavigatingTo;

/*返回上一级*/
exports.return = function () {
    frameModule.topmost().goBack();
    select = false;
    clearInterval(timer);
};

exports.addTap = function () {
    textfield.dismissSoftInput();
    if (select == false) {
        grid.style.visibility = "visible";
        select = true;
    } else {
        grid.style.visibility = "collapsed";
        select = false;
    }

};

//输入任务号
exports.TaskTap = function (args) {
    var thisPage = args.object.page;
    thisPage.showModal('/views/message/views/exampleModal', {items: []}, function (TaskId) {
        console.log("TaskId = " + TaskId);
        //queryChatMessage(TaskId)
        if (TaskId != null) {
            submitChatContext("", "", TaskId, groupId);
        }
    });
};

//打开相册
exports.PhotoTap = function (args) {
    imageUploadPicker.selectSingle(args, sendPhoto, null, function (data) {
        console.log("获取图片信息===" + data);
        let fileObj = eval('(' + data + ')');
        photos = fileObj[0].url;
        let fileId = fileObj[0].id;
        console.log("photos : ==> " + photos);
        console.log("fileId : ==> " + fileObj.id);
        if (photos != null) {
            page.focus();
            var time = getTime();
            //messageArry.push({"src":"res://timg", "message":message, "photos":photos, "date":time,"name":"张三丰","isRight":true,"imMessageType":"IMAGE","Type":"","taskId":"","recieve":"","taskType":""});
            //console.log(messageArry);
            //message_list.bindingContext = new ViewModel.ViewModel(messageArry);
            textfield.text = "";
            //message_list.scrollToIndex(messageArry.length - 1);
            try {
                submitChatContext("", fileId, "", groupId);
            } catch (err) {
                console.log("111提交消息失败111");
            }
        } else {
            console.log("----------");

        }
    });
};

//点击拍照
exports.CameraTap = function () {
    camera.requestPermissions();
    camera.takePicture()
        .then(function (imageAsset) {
            console.log(imageAsset);
            photos = imageAsset;
            //获取图片本地路径
            var localPath = "";
            if (platformModule.device.os === "Android") {
                localPath = imageAsset.android;
            } else {
                localPath = imageAsset.ios;
            }
            //图片上传
            imageUploadPicker.sendImages(localPath, function (data) {
                console.log("上传图片信息data-----------"+data);
                let fileObj = eval('(' + data + ')');
                photos = fileObj[0].url;
                let fileId = fileObj[0].id;
                console.log("photos : ==> " + photos);
                console.log("fileId : ==> " + fileId);
                if (photos != null) {
                    page.focus();
                    var time = getTime();
                  /*  messageArry.push({
                        "src": "res://timg",
                        "message": message,
                        "photos": photos,
                        "date": time,
                        "name": "张三丰",
                        "isRight": true,
                        "imMessageType": "IMAGE",
                        "Type": "",
                        "taskId": "",
                        "id": "",
                        "recieve": "",
                        "taskType": ""
                    });
                    console.log(messageArry);
                    message_list.bindingContext = new ViewModel.ViewModel(messageArry);*/
                    textfield.text = "";
                    // message_list.scrollToIndex(messageArry.length - 1);
                    try {
                        submitChatContext("", fileId, "", groupId);
                    } catch (err) {
                        console.log("提交消息失败");
                    }
                } else {
                    console.log("++++++++");
                }
            });
           
        }).catch(function (err) {
        console.log("Error -> " + err.message);
        if (err.message.indexOf('does not have permissions') !== -1) {
            var options = {
                title: "提示",
                message: config.appName + "没有访问相机的权限，请前往设置允许访问！",
                okButtonText: "确定"
            };
            dialogs.alert(options).then(() => {});
        }
    });

};

function send() {
    photos = "";
    page.focus();
    var time = getTime();
    var message = textfield.text;
    //messageArry.push({"src":"res://timg", "message":message, "photos":photos, "date":time,"name":"张三丰","isRight":true,"imMessageType":"TEXT","Type":"","taskId":"","receive":"","taskType":""});
    console.log(messageArry);
    //   timeArry.push(time);
    //message_list.bindingContext = new ViewModel.ViewModel(messageArry);
    textfield.text = "";
    if (messageArry != 0) {
        message_list.scrollToIndex(messageArry.length - 1);
    }
    try {
        console.log(message);
        console.log(groupId);
        submitChatContext(message, "", "", groupId);
    } catch (err) {
        console.log(err);
        console.log("提交消息失败");
    }
};
exports.send = send;

function queryChatMessage(groupId) {
    var queryParams = {
        "name": "immessageController.queryChatMessageRedis",
        "args": [{"groupId": groupId}]
    };
    try {
        api.call(config.apiUrl, queryParams).ok((data) => {
            console.log("##############api.call success start#############");
            var str = JSON.stringify(data.result);
            content = eval('(' + str + ')');
            console.info("查询回来的数据: " + JSON.stringify(content));
            //if (messageArry != null) {
            //    messageArry.splice(0, messageArry.length);
            //}
            if (content != null) {
                console.log("数据的长度为：" + content.length);
                for (var i = 0; i < content.length; i++) {
                    console.log("进入循环了");
                    console.log("循环里的数据" + JSON.stringify(content[i]));
                    var image = content[i].portrait || "res://timg";
                    var author = content[i].author;
                    var msgContent = content[i].msgContent;
                    var msgTime = content[i].msgTime;
                    var seat = content[i].seat;
                    var imMessageType = content[i].imMessageType;
                    var imgUrl;
                    var id;
                    var taskId;
                    var Type;
                    var taskType;
                    var receive;
                    var taskStatus;
                    if (imMessageType == "TASK") {
                        console.log("任务消息");
                        var taskObj = JSON.parse(content[i].msgContent);
                        Type = taskObj.taskType;
                        taskId = taskObj.taskId;
                        id = taskObj.id;
                        receive = taskObj.consignee;
                        taskType = taskObj.taskTypeCN;
                        taskStatus = taskObj.taskStatus;
                    }
                    if (imMessageType == "IMAGE") {
                        console.log("图片消息");
                        var imageObj = JSON.parse(content[i].msgContent);
                        imgUrl = imageObj.url;
                    }
                    messageArry.push({
                        "src": image,
                        "message": msgContent,
                        "photos": imgUrl,
                        "date": msgTime,
                        "name": author,
                        "isRight": seat,
                        "imMessageType": imMessageType,
                        "Type": Type,
                        "taskId": taskId,
                        "id": id,
                        "recieve": receive,
                        "taskType": taskType,
                        "taskStatus": taskStatus
                    });
                }
                message_list.bindingContext = new ViewModel.ViewModel(messageArry);
                if (messageArry.length != 0) {
                    message_list.scrollToIndex(messageArry.length - 1);
                }
            }
            console.log("查询消息成功");
            console.log("##############api.call  success  end#############");
        }).fail((err) => {
            console.log("##############api.call error start#############");
            console.log(JSON.stringify(err));
            console.log("查询消息失败");
            console.log("##############api.call  error  end#############");
        })
    } catch (err) {
        console.log(err);
        console.log("查询消息失败");
    }
}

function submitChatContext(msgContext, fileId, taskId, groupId) {
    var queryParams = {
        "name": "immessageController.submitChatContext",
        "args": [{
            "textContext": msgContext,
            "fileId": fileId,
            "taskId": taskId,
            "groupId": groupId
        }]
    };
    console.log(messageArry[messageArry.length - 1]);
    try {
        api.call(config.apiUrl, queryParams).ok((data) => {
            console.log("##############api.call success start#############");
            console.log(JSON.stringify(data));
            console.log("消息提交成功");
            queryChatMessage(groupId);
            console.log("##############api.call  success  end#############");
        }).fail((err) => {
            console.log("##############api.call error start#############");
            console.log(JSON.stringify(err));
            var options = {
                text: "请输入正确的订单号",
                duration: nstoasts.DURATION.LONG,
                position: nstoasts.POSITION.CENTER //optional
            }
            nstoasts.show(options);
            console.log("##############api.call  error  end#############");
        })
    } catch (err) {
        console.log(err);
        console.log("提交消息失败");

    }
}

/**
 * 查询任务信息
 */
function queryTaskInfo(groupId) {

    var queryParams = {
        "name": "immessageController.queryTaskInfo",
        "args": [{
            "groupId": groupId
        }]
    };

    try {
        api.call(config.apiUrl, queryParams).ok((data) => {
            console.log("##############api.call success start#############");
            console.log(JSON.stringify(data));
            var content = data.result;
            console.log("查询到的任务信息：" + content);
            if (content) {
                top_header.style.visibility = "visible";
                if (content.taskType == "dispatchTask") {
                    top_type.text = "新";
                } else if (content.taskType == "repair") {
                    top_type.text = "维";
                } else if (content.taskType == "fhreturn") {
                    top_type.text = "返";
                }
                top_task.text = content.taskId;
                contentType=content.taskType;
                taskStatus=content.taskStatus;
                top_id = content.id;
                top_receive.text = "收货人：" + content.consignee + " -发货人：" + content.shipper;
                top_message.text = content.taskTypeCN;
                top_types.text = content.taskStatusCN;
                console.log("content.taskStatusCN---------------"+content.taskTypeCN);
                console.log("content.taskStatus---------------"+content.taskStatus);
            } else {
                top_header.style.visibility = "collapsed";
            }
            console.log("查询任务信息成功");
            console.log("##############api.call  success  end#############");
        }).fail((err) => {
            console.log("##############api.call error start#############");
            console.log(JSON.stringify(err));
            console.log("查询任务信息失败");
            console.log("##############api.call  error  end#############");
        })
    } catch (err) {
        console.log(err);
        console.log("查询任务信息失败");
    }

}
/**
 * 新任务状态
 * @param type
 * @returns {*}
 */
function getNewTaskStatus(type) {
    var obj = {
        distributionWaitAccept: "waiting_list",
        accepted:"waiting_appointment",
        waiting_pickup: "waiting_pickup",
        doSign: "had_sign_for",
        waitPickUp: "waiting_sign_for",
        invalid: "cancelled"
    };
    return obj[type];
}
/**
 * 维修任务状态
 * @param type
 * @returns {*}
 */
function getRepairTaskStatus(type) {
    var obj = {
        distributionWaitAccept: "maintenance_waiting_list",
        accepted: "maintenance_waiting_appointment",
        waitAppointment: "maintenance_waiting_sign_for",
        doSign: "maintenance_finish"
    };
    return obj[type];
}
/**
 * 返货任务状态
 * @param type
 * @returns {*}
 */
function getReturnTaskStatus(type) {
    var obj = {
        distributionWaitAccept: "return_waiting_list",
        accepted:"return_waiting_pickup",
        waitPickUp: "return_waiting_sign_for",
        doSign: "return_finish"
    };
    return obj[type];
}

//跳转运单详情页
exports.toDetail= function () {
    console.log("top_id------------"+top_id);
    if (contentType != "dispatchTask") {
        
        if(contentType == "repair") {
            statusType = getRepairTaskStatus(taskStatus);
        }else{
            statusType = getReturnTaskStatus(taskStatus);
        }
        if(!statusType){
            dialogsAlert.alert("该任务已作废,无法查看");
        }else {
            var navigationEntry = {
                moduleName: '/views/task/return-detail/return-detail',
                context: {
                    "taskType": statusType,
                    "taskId": top_id
                },
            };
            frameModule.topmost().navigate(navigationEntry);
        }
    } else {
        statusType = getNewTaskStatus(taskStatus);
        var navigationEntry = {
            moduleName: '/views/task/task-detail/task-detail',
            context: {
                "taskType": statusType,
                "taskId": top_id
            },
        };
        frameModule.topmost().navigate(navigationEntry);
    }
};

/**
 * 打开im聊天窗口，默认查询50条历史消息
 */
function queryChatMessageDefault(groupId) {
    var queryParams = {
        "name": "immessageController.queryChatMessageDefault",
        "args": [{"groupId": groupId}]
    };
    try {
        api.call(config.apiUrl, queryParams).ok((data) => {
            console.log("##############api.call success start#############");
            var str = JSON.stringify(data.result);
            content = eval('(' + str + ')');
            console.info("查询回来的数据: " + JSON.stringify(content));
            if (content != null) {
                console.log("数据的长度为：" + content.length);
                for (var i = 0; i < content.length; i++) {
                    console.log("进入循环了");
                    console.log("循环里的数据" + JSON.stringify(content[i]));
                    var image = content[i].portrait || "res://timg";
                    var author = content[i].author;
                    var msgContent = content[i].msgContent;
                    var msgTime = content[i].msgTime;
                    var seat = content[i].seat;
                    var imMessageType = content[i].imMessageType;
                    var imgUrl;
                    var id;
                    var taskId;
                    var Type;
                    var taskType;
                    var receive;
                    var taskStatus;
                    if (imMessageType == "TASK") {
                        console.log("任务消息");
                        var taskObj = JSON.parse(content[i].msgContent);
                        Type = taskObj.taskType;
                        taskId = taskObj.taskId;
                        id = taskObj.id;
                        receive = taskObj.consignee;
                        taskType = taskObj.taskTypeCN;
                        taskStatus = taskObj.taskStatus;
                    }
                    if (imMessageType == "IMAGE") {
                        console.log("图片消息");
                        var imageObj = JSON.parse(content[i].msgContent);
                        imgUrl = imageObj.url;
                    }
                    messageArry.push({
                        "src": image,
                        "message": msgContent,
                        "photos": imgUrl,
                        "date": msgTime,
                        "name": author,
                        "isRight": seat,
                        "imMessageType": imMessageType,
                        "Type": Type,
                        "taskId": taskId,
                        "id": id,
                        "recieve": receive,
                        "taskType": taskType,
                        "taskStatus": taskStatus
                    });
                }
                message_list.bindingContext = new ViewModel.ViewModel(messageArry);
                if (messageArry.length != 0) {
                    message_list.scrollToIndex(messageArry.length - 1);
                }
            }
            console.log("查询消息成功");
            console.log("##############api.call  success  end#############");
        }).fail((err) => {
            console.log("##############api.call error start#############");
            console.log(JSON.stringify(err));
            console.log("查询消息失败");
            console.log("##############api.call  error  end#############");
        })
    } catch (err) {
        console.log(err);
        console.log("查询消息失败");
    }
}

function createAnswer(msg) {
    if (/(\s*)([0-9]+)(\.?)([0-9]*)(\s*)([\+|\-|\*|\/])(\s*)([0-9]+)(\.?)([0-9]*)/i.test(msg)) {
        var result;
        eval("result = " + msg + ";");
        return result;
    }
    else if (checkForAllTerms(getLettersAndDigitsOnly(msg), "how", "are", "you")) {
        return "Fine!";
    }
    else if (checkForAllTerms(getLettersAndDigitsOnly(msg), "what", "time", "is", "it")) {
        return getTime();
    }
    else if (checkForAllTerms(getLettersAndDigitsOnly(msg), "hi")) {
        return "Hi! How are you?";
    }
    else if (checkForAllTerms(getLettersAndDigitsOnly(msg), "fine")) {
        return "Cool!";
    }
    return 'You said: "' + msg + '"';
}
function getSimilarity(left, right) {
    if (left === right) {
        return 1;
    }
    if (TypeUtils.isNullOrUndefined(left) ||
        TypeUtils.isNullOrUndefined(right)) {
        return 0;
    }
    left = left.toLowerCase().trim();
    right = right.toLowerCase().trim();
    var distance = 0;
    if (left !== right) {
        var matrix = new Array(left.length + 1);
        for (var i = 0; i < matrix.length; i++) {
            matrix[i] = new Array(right.length + 1);
            for (var ii = 0; ii < matrix[i].length; ii++) {
                matrix[i][ii] = 0;
            }
        }
        for (var i = 0; i <= left.length; i++) {
            matrix[i][0] = i;
        }
        for (var j = 0; j <= right.length; j++) {
            matrix[0][j] = j;
        }
        for (var i = 0; i < left.length; i++) {
            for (var j = 0; j < right.length; j++) {
                if (left[i] === right[j]) {
                    matrix[i + 1][j + 1] = matrix[i][j];
                }
                else {
                    matrix[i + 1][j + 1] = Math.min(matrix[i][j + 1] + 1, matrix[i + 1][j] + 1);
                    matrix[i + 1][j + 1] = Math.min(matrix[i + 1][j + 1], matrix[i][j] + 1);
                }
            }
            distance = matrix[left.length][right.length];
        }
    }
    return 1.0 - distance / Math.max(left.length, right.length);
}
function checkForAllTerms(str) {
    var terms = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        terms[_i - 1] = arguments[_i];
    }
    var parts = str.split(" ");
    for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        if (p.trim() === "") {
            continue;
        }
        var found = false;
        for (var ii = 0; ii < terms.length; ii++) {
            var t = terms[ii];
            if (getSimilarity(p, t) >= 0.5) {
                found = true;
                break;
            }
        }
        if (!found) {
            return false;
        }
    }
    return true;
}
function getLettersAndDigitsOnly(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        if (/[a-zA-Z0-9]/i.test(str[i])) {
            result += str[i];
        }
        else if (/[\s]/i.test(str[i])) {
            result += " ";
        }
    }
    return result;
}
function getTime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var hour2 = date.getHours() + 12;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + hour2 + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}
exports.onFiltrate = function (args) {
    showDateDialog((date) => {
        var scheduleMoment = moment(date, "DD MM YYYY");
        var scheduleJS = scheduleMoment.toDate();
        var dateTime = moment(scheduleJS).format('YYYY-MM-DD');
        var navigationEntry = {
            moduleName: 'views/message/history-message/history-message',
            context: {
                "time": dateTime,
                "groupId": groupId
            },
        };
        topmost.navigate(navigationEntry);
        //queryChatHistory(dateTime);
    });
};
function showDateDialog(cb) {

    var mCallback = function (result) {
        if (result && cb) {
            cb(result);
        }
    };
    DatePickerManager.init(mCallback, null, null);

    DatePickerManager.showDatePickerDialog();

}
