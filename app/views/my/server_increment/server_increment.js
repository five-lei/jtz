var frameModule = require("ui/frame");
var color = require("color");
var layout = require("ui/layouts/grid-layout");
var viewModel = require('./server_increment_model');
var Observable = require("data/observable").Observable;
var config = require("../../../shared/config");
var api = require('../../../shared/api');

// 选中的维修服务类型数组
var repairTypeArr;
// 选中的养护服务类型数组
var maintainTypeArr;
// 页面加载时创建的ViewModel实例
var saveRepair;
// 页面加载时创建的MaintainViewModel实例
var saveMaintain;

exports.onNavBtnTap = function () {
    var topmost = frameModule.topmost();
    topmost.goBack();
};

//返回事件
function onBackTap(args) {
    frameModule.topmost().goBack();
}

exports.onBackTap = onBackTap

exports.next_btn = function () {
    // 存储选中的维修类型
    repairTypeArr = saveRepair.countServiceType();
    // 存储选中的养护类型
    var maintainTypes = page.getViewById("maintainTypes");
    saveMaintain=maintainTypes.bindingContext;
    maintainTypeArr = saveMaintain.countServiceType();
    var userWokerIncrementService = [];
    var maintainService = {};
    if (maintainTypeArr[0] && maintainTypeArr[0]._selectCondition == true) {
        maintainService = {
            type: "masterReturnGoods",
            label: "返货"
        }
    }
    for (var i = 0; i < repairTypeArr.length; i++) {
        console.log('维修类型:' + repairTypeArr[i]['_serviceType']);
        userWokerIncrementService.push({
            repairService: {
                label: repairTypeArr[i]['_serviceType']
            },
            maintainService: maintainService
        })

    }


    var topmost = frameModule.topmost();
    topmost.goBack();

    var requestParam = {
        name: "masterInfoChangeController.submitInfoChange",
        args: [{
            userWokerIncrementService: userWokerIncrementService
        }]
    }
    api.call(config.apiUrl, requestParam).ok(ok => {
        console.log("success!")
    }).fail(fail => {
        alert(fail.error)
    });
};
var page
exports.pageLoaded = function (args) {
    page = args.object;
    var repairTypes = page.getViewById("repairTypes");
    queryLast();
    // saveRepair = new viewModel.ViewModel(page,lastObj);
    // // repairTypes.bindingContext = saveRepair;

    // var maintainTypes = page.getViewById("maintainTypes");
    // saveMaintain = new viewModel.MaintainViewModel();
    // maintainTypes.bindingContext = saveMaintain;
    // var ifReturn = saveRepair.getIfReturn;

}

function queryLast() {
    api.call(config.apiUrl, {
        name: "userWorkerController.listIncrementModifyService",
        args: []
    }).ok(data => {
        var incrementResp = data.result;
        saveRepair = new viewModel.ViewModel(page, incrementResp);
        // repairTypes.bindingContext = saveRepair;
        var ifReturn = saveRepair.getIfReturn();
        // var maintainTypes = page.getViewById("maintainTypes");
        // saveMaintain = new viewModel.MaintainViewModel(page,ifReturn);
        // maintainTypes.bindingContext = saveMaintain;
        
        // saveMaintain.maintainList[0].selectCondition=ifReturn;
    }).fail(fail => {
        alert(fail.error)
    })

}