"use strict";
var frameModule = require("ui/frame");
var Timer = require("timer");
var config = require("../../../shared/config");
var TypeUtils = require("utils/types");
var visibility = require("ui/enums");
var camera = require("nativescript-camera");
var api = require('../../../shared/api');
var config = require("../../../shared/config");
var DatePickerManager = require("nativescript-timedatepicker");
var listViewModule = require("nativescript-telerik-ui-pro/listview");
var ViewModel = require("./history-message-model");
var topmost = frameModule.topmost();
var moment = require('moment');
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
var searchDate;
var pageIndex = 0;
var preSearchDate;

exports.loaded = function (args) {
    page = args.object;
    messageArry = [];
    var context = page.navigationContext;
    console.log(context.time);
    groupId = context.groupId;
    searchDate = context.time;
    grid = page.getViewById("grid");
    message_list = page.getViewById("message_list");
    textfield = page.getViewById("textfield");
    console.log(searchDate);
    queryChatHistory(page,pageIndex, searchDate);
};


/*返回上一级*/
exports.return = function () {
    frameModule.topmost().goBack();
    select = false;
};


/**
 * 查询历史消息
 * @param pageIndex
 * @param searchDate
 */
function queryChatHistory(page,pageIndex,searchDate) {
    preSearchDate = searchDate;
    console.log("preSearchDate-------------"+preSearchDate);
    //第一页重新设置自动按需加载
    if (pageIndex == 0) {
        message_list.loadOnDemandMode = listViewModule.ListViewLoadOnDemandMode[listViewModule.ListViewLoadOnDemandMode.Auto];
    }
    //当前查询分页*rows
    var curPageIndex = pageIndex * 5;
    console.log("curPageIndex-------------"+curPageIndex);
    var queryParams = {
        "name": "immessageController.queryChatMessage",
        "args": [{"first": curPageIndex, "rows": 5}, {"date": searchDate, "groupId": groupId}]
    };
    try {
        api.call(config.apiUrl, queryParams).ok((data) => {
            console.log("##############api.call success start#############");
            console.log(data);
            var str = JSON.stringify(data);
            console.log(str);
            //content = eval('(' + str + ')');
            content = data.result.content;
            //总记录数
            var totalElements = data.result.totalElements;
            console.log("this content is---------" + content);
            console.info("查询回来的数据:---------- " + JSON.stringify(content));
            if (content != null) {
                console.log("数据的长度为：" + content.length);
                for (var i = 0; i < content.length; i++) {
                    console.log("进入循环了");
                    console.log("循环里的历史数据" + JSON.stringify(content[i]));
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
                console.log(JSON.stringify(messageArry));
                console.log("message_list.bindingContext-----------"+message_list.bindingContext);
            }
            console.log("page.bindingContext.length------"+page.bindingContext.length);
            //停止刷新
            listViewFinished(message_list);
            //当查询所有记录数后，取消按需加载
            if (page.bindingContext.length >= totalElements) {
                message_list.loadOnDemandMode = listViewModule.ListViewLoadOnDemandMode[listViewModule.ListViewLoadOnDemandMode.None];
                return;
            }
            
            console.log("查询历史消息成功");
            console.log("##############api.call  success  end#############");
        }).fail((err) => {
            console.log("##############api.call error start#############");
            console.log(JSON.stringify(err));
            console.log("查询历史消息失败");
            console.log("##############api.call  error  end#############");
        })
    } catch (err) {
        console.log(err);
        console.log("查询历史消息失败");
    }
}

/**
 * 加载更多
 * @param args
 */
function onLoadMoreItemsRequested(args) {
    pageIndex++;
    var page = args.object.page;
    loadGalleryFragment(page, pageIndex, searchDate);
}
exports.onLoadMoreItemsRequested = onLoadMoreItemsRequested;


/**
 * 结束加载
 * @param list_view
 */
function listViewFinished(list_view) {
    var page = list_view.page;
    page.bindingContext.loading = false;
    list_view.notifyLoadOnDemandFinished();
    list_view.notifyPullToRefreshFinished();
}


/**
 * 刷新
 * @param args
 * @param searchDate
 */
/*function pullToRefreshInitiated(args, searchDate) {
    pageIndex = 0;
    var page = args.object.page;
    //page.bindingContext.length = 0;
    loadGalleryFragment(page, pageIndex,searchDate);
}*/
//exports.pullToRefreshInitiated = pullToRefreshInitiated;


/**
 *
 * @param page
 * @param searchDate
 * @param index 分页
 */
function loadGalleryFragment(page,pageIndex, searchDate) {
    if (searchDate != preSearchDate) {//清空数据
        pageIndex = 0;//第一页
        //page.bindingContext.length = 0;
    }
    preSearchDate = searchDate;//存储当前日期
    
    queryChatHistory(page, pageIndex,searchDate);
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
        /*var navigationEntry = {
         moduleName: 'views/message/history-message/history-message',
         context: {
         "time": dateTime,
         "groupId": groupId
         },
         };
         topmost.navigate(navigationEntry);*/
        messageArry = [];
        queryChatHistory(dateTime);
    });
}
function showDateDialog(cb) {
    
    var mCallback = function (result) {
        if (result && cb) {
            cb(result);
        }
    };
    DatePickerManager.init(mCallback, null, null);
    
    DatePickerManager.showDatePickerDialog();
    
}
