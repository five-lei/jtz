var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var observableArrayModule = require("data/observable-array");
var viewModal = require("./depositeApplyCheck-modal");
var api = require('../../../shared/api.js');
var config = require('../../../shared/config.js');
var dialogsModule = require("ui/dialogs");
var page;

function onBackTap(args) {
    frameModule.topmost().goBack();
}
exports.onNavigatingTo = function (args) {
    page = args.object;
    page.bindingContext = new viewModal.viewModal(page);

}
//跳转到历史提现记录页面
exports.jumpDepositeRecord = function() {

    var topmost = frameModule.topmost();

    topmost.navigate("views/walletDeposit/historyDepositeRecord/historyDepositeRecord");

};

//跳转到账单详情页面
exports.jumpCheckDetail = function(args) {
    /** 页面传参*/
    var wtNo=args.object.wtNo;

    var topmost = frameModule.topmost();

    var navigationEntry = {
        moduleName: "views/walletDeposit/checkDetail/checkDetail",
        context: {
            "wtNo": wtNo
        },
        animated: true
    };
    topmost.navigate(navigationEntry);
};

// 提现申请的按钮点击事件
function depositeApplyBtn(args) {

    var totalWaybill = args.object.totalWaybill;
    console.log("^^^^^^^^^"+totalWaybill);

    if (totalWaybill == 0){
        var options = {
            title : "提示",
            message : "余额为 0 不能提现",
            okButtonText : "确定"
        };
        dialogsModule.confirm(options).then((result) => {});
        return;
    }


    var qureyParams = {
        "name": "commonWalletController.withdrawApply",
        "args": [{}]
    };
    /** 后台请求 提现申请*/
    api.call(config.apiUrl, qureyParams).ok((data) => {
        console.log("##############api.call success start#############");
        console.log("^^^^^"+JSON.stringify(data));
        var topmost = frameModule.topmost();
        topmost.navigate("views/walletDeposit/ResultDetail/ResultDetail");
    }).fail((err) => {
        console.log(err)
        var options = {
            title: "提示",
            message: err.error,
            okButtonText: "确认"
        };
        dialogsModule.confirm(options).then((result) => {
        });
    })
}
exports.depositeApplyBtn = depositeApplyBtn;

exports.onBackTap = onBackTap;

// listView加载数据时调用
// exports.onItemLoading = function (args) {
//     var stateLabel = args.view._subViews[0]._subViews[2];
//     if (stateLabel.text == "已提现"){
//         stateLabel.style.color = "dimgray";
//     }else {
//         stateLabel.style.color = "#4193d3";
//     }
// }