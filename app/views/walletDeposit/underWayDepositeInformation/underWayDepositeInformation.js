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
    page = args.object;

    leftLine = view.getViewById(page,"leftLine");
    centerLine = view.getViewById(page,"centerLine");
    rightLine = view.getViewById(page,"rightLine");

    leftLine.style.backgroundColor = new color.Color("rgb(255,113,0)");
    centerLine.style.backgroundColor = new color.Color("white");
    rightLine.style.backgroundColor = new color.Color("white");

    wtNo = page.navigationContext && page.navigationContext.wtNo || '';

    var qureyParams = {
        "name": "commonWalletController.withdrawDetail",
        "args": [{"first": 0, "rows": 10},{"wtno":wtNo}]
    };
    console.log('账单Id='+wtNo)
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
        var checkData = [];
        bindingData(checkData);
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
    if (infoArr && infoArr.length){
        infoArr.splice(0,infoArr.length);
    }else{
        infoArr=[];
    }
    var firstRow=checkData[0] || {};
    var dispatchTaskMoney=firstRow.dispatchTaskMoney || 0;
    var repairAndFhreturnMoney = firstRow.repairAndFhreturnMoney || 0;
    var otherMoney = firstRow.otherMoney || 0;
    var totalMoney = firstRow.totalMoney || 0;
    var paidMoney = firstRow.paidMoney || 0;
    var noPiadMoney = firstRow.noPiadMoney || 0;
    var withdrawDate = firstRow.withdrawDate || '';
    var billDate = firstRow.billDate || '';
    var withdrawState = firstRow.withdrawState || '';

    for(var i=0;i<checkData.length;i++){
        var temp=checkData[i] || {};
        var obj={
            taskId : temp['taskId'],
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
        "billDate":billDate,
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
    for(var i=0;i<cacheData.length;i++){
        if(cacheData[i].taskType === "调度任务"){
            resultData.push(cacheData[i]);
        }
    }
    page.bindingContext.set("messages",resultData);
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
    console.log("---------"+taskId);
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