var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var observableArrayModule = require("data/observable-array");
var view = require("ui/core/view");
var color = require("color");
var api = require('../../../shared/api.js');
var config = require('../../../shared/config.js');
var dialogsModule = require("ui/dialogs");

var leftLine;
var centerLine;
var rightLine;
var wtNo;
var page;
var cacheData=[];
var infoArr=[];

function onBackTap(args) {
    frameModule.topmost().goBack();
}

function loaded(args) {
    page = args.object.page;

    leftLine = view.getViewById(page,"leftLine");
    centerLine = view.getViewById(page,"centerLine");
    rightLine = view.getViewById(page,"rightLine");

    leftLine.style.backgroundColor = new color.Color("rgb(255,113,0)");
    centerLine.style.backgroundColor = new color.Color("white");
    rightLine.style.backgroundColor = new color.Color("white");

    var titleNum = view.getViewById(page,"titleNumber");
    /**
     * 获取单号
     */
    wtNo = page.navigationContext && page.navigationContext.wtNo || '';
    if (wtNo != ""){
        titleNum.text = "提现单号: " + wtNo;
    }

    var qureyParams = {
        "name": "commonWalletController.withdrawDetail",
        "args": [{"first": 0, "rows": 10},{"wtno":wtNo}]
    };
    console.log('参数wtno='+wtNo)
    queryData(qureyParams);

}
/** 后台获取数据 */
function queryData(qureyParams) {
    api.call(config.apiUrl, qureyParams).ok((data) => {
        console.log(JSON.stringify(data.result.content))
        var checkData=data.result.content || [];
        console.log('结果 checkData='+checkData.length);
        bindingData(checkData);

    }).fail((err) => {
        console.log(err)
        var options = {
            title: "提示",
            message: "接口请求出错，请查看日记信息",
            okButtonText: "确认"
        };
        dialogsModule.confirm(options).then((result) => {
        });
    })
}


function bindingData(checkData){
    if (cacheData.length){
        cacheData.splice(0,cacheData.length);
    }
    if (infoArr.length){
        infoArr.splice(0,infoArr.length);
    }
    var dispatchTaskMoney=checkData[0].dispatchTaskMoney || 0;
    var repairAndFhreturnMoney = checkData[0].repairAndFhreturnMoney || 0;
    var otherMoney = checkData[0].otherMoney || 0;
    var totalMoney = checkData[0].totalMoney || 0;
    var paidMoney = checkData[0].paidMoney || 0;
    var noPiadMoney = checkData[0].noPiadMoney || 0;
    var withdrawDate = checkData[0].withdrawDate || '';
    var wtno = checkData[0].wtno || '';
    var withdrawState = checkData[0].withdrawState || '';

    for(var i=0;i<checkData.length;i++){
        var temp=checkData[i] || {};
        var obj={
            taskId : temp["taskId"] || '',
            number : temp['taskNo'] || '',
            date : temp['taskDate'] || '',
            account :  temp['taskFee'] || 0,
            taskType : temp['taskType'] || ''
        }
        if(checkData[i].taskType === "调度任务"){
            infoArr.push(obj);
        }
        cacheData.push(obj);
    }

    var bindObj={
        "dispatchTaskMoney":dispatchTaskMoney,
        "repairAndFhreturnMoney":repairAndFhreturnMoney,
        "otherMoney":otherMoney,
        "totalMoney":totalMoney,
        "paidMoney":paidMoney,
        "noPiadMoney":noPiadMoney,
        "withdrawDate":withdrawDate,
        "withdrawState":withdrawState,
        "wtno":wtno,
        "messages":infoArr
    }
    var viewModal = new Observable(bindObj);
    // viewModal.messages = infoArr;
    page.bindingContext = viewModal;

    /*xxx.bindingContext=new Observable({

     });*/
}
// 点击左边的事件
function leftClick() {
    leftLine.style.backgroundColor = new color.Color("rgb(255,113,0)");
    centerLine.style.backgroundColor = new color.Color("white");
    rightLine.style.backgroundColor = new color.Color("white");
    var resultData = [];
    console.log(cacheData[0].taskType);
    for(var i=0;i<cacheData.length;i++){
        if(cacheData[i].taskType === "调度任务"){
            resultData.push(cacheData[i]);
        }
    }
    page.bindingContext.set("messages",resultData);
    // page.bindingContext.set("messages",[]);
}
//点击中间的事件
function centerClick() {
    centerLine.style.backgroundColor = new color.Color("rgb(255,113,0)");
    leftLine.style.backgroundColor = new color.Color("white");
    rightLine.style.backgroundColor = new color.Color("white");

    var resultData = [];
    for(var i=0;i<cacheData.length;i++){
        if(cacheData[i].taskType == "其他"){
            resultData.push(cacheData[i]);
        }
    }

    page.bindingContext.set("messages",resultData);
}
// 点击右边的事件
function rightClick() {
    rightLine.style.backgroundColor = new color.Color("rgb(255,113,0)");
    centerLine.style.backgroundColor = new color.Color("white");
    leftLine.style.backgroundColor = new color.Color("white");
    page.bindingContext.set("messages",[]);
    var resultData = [];
    for(var i=0;i<cacheData.length;i++){
        if(cacheData[i].taskType === "维修任务" || cacheData[i].taskType==="返货任务"){
            resultData.push(cacheData[i]);
        }
    }
    page.bindingContext.set("messages",resultData);
}

exports.itemClick = function (args) {
    var taskId = args.object.taskId;
    console.log("--------------"+taskId);
    var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "views/task/task-detail/task-detail",
        context: {"taskType": "had_sign_for","taskId": taskId},
        animated: true
    };
    topmost.navigate(navigationEntry);
}

exports.leftClick = leftClick;
exports.centerClick = centerClick;
exports.rightClick = rightClick;
exports.loaded = loaded;
exports.onBackTap = onBackTap;