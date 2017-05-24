var frameModule = require("ui/frame");

var color = require("color");

var visibility = require("ui/enums");

var view = require("ui/core/view");

var viewModal = require("./depositeCheckDetail-modal");

var noDepositeCheckInfo;
var completeDepositeCheckInfo;
var api = require('../../../shared/api.js');
var config = require('../../../shared/config.js');
var dialogsModule = require("ui/dialogs");

var Observable = require("data/observable").Observable;


var wtNo;

function onBackTap(args) {
    frameModule.topmost().goBack();
}

exports.loaded = function (args) {
    console.log('ssssssssssssssss')
    var page = args.object.page;
    page.bindingContext = viewModal.viewModal(page);

    noDepositeCheckInfo = view.getViewById(page,"noDepositeCheckInfo"); // 未提现账单的详细信息
    noDepositeCheckInfo.bindingContext = new Observable({
        "depositeInfoList":[]
    });
    noDepositeCheckInfo.bindingContext = viewModal.noDepositeCheckModal(page);
    completeDepositeCheckInfo = view.getViewById(page,"completeDepositeCheckInfo"); // 已提现账单的详细信息
    completeDepositeCheckInfo.bindingContext = viewModal.depositeCheckModal(page);
}


// 已提现的点击事件
function completeDepositeTap(args) {
    var send = args.object;
    var parent = send.parent;

    var noDepositeLabel = view.getViewById(parent,"noDeposite") // 未提现 Label
    var completeDepositeLabel = view.getViewById(parent,"completeDeposite") //已提现 Label

    noDepositeCheckInfo.style.visibility = "collapse";
    completeDepositeCheckInfo.style.visibility = "visible";

    noDepositeLabel.style.backgroundColor = new color.Color("#fef1e2");
    completeDepositeLabel.style.backgroundColor = new color.Color("white");
}

// 未提现的点击事件
function noDepositeTap(args) {
    var send = args.object;
    var parent = send.parent;
    var superParent = parent.parent;

    var noDepositeLabel = view.getViewById(parent,"noDeposite")
    var completeDepositeLabel = view.getViewById(parent,"completeDeposite")


    noDepositeCheckInfo.style.visibility = "visible";
    completeDepositeCheckInfo.style.visibility = "collapse";

    noDepositeLabel.style.backgroundColor = new color.Color("white");
    completeDepositeLabel.style.backgroundColor = new color.Color("#fef1e2");
}


// 未提现的查看详情按钮点击事件
function noDepositeLookDetail(args){
    console.log("@@@@@"+args.object.typeID);
    var topmost = frameModule.topmost();
    wtNo = args.object.typeID;
    var navigationEntry = {
        moduleName: "views/walletDeposit/noDepositeInformatiion/noDepositeInformatiion",
        context: {
            "wtNo": wtNo
        },
        animated: true
    };
    topmost.navigate(navigationEntry);
}

// 提现中的查看详情按钮点击事件
function underWayDepositeInformation(args){
    /** 页面传参 */
    var topmost = frameModule.topmost();
    wtNo = args.object.typeID;
    console.log(wtNo);
    var navigationEntry = {
        moduleName: "views/walletDeposit/underWayDepositeInformation/underWayDepositeInformation",
        context: {
            "wtNo": wtNo
        },
        animated: true
    };
    topmost.navigate(navigationEntry);
}

// 已提现账单的信息
function completeDepositeInformation() {
    var topmost = frameModule.topmost();

    topmost.navigate("views/walletDeposit/depositeRecordListView/depositeRecordListView");
}

// 提现申请的按钮点击事件
function depositeApplyBtn() {
    var topmost = frameModule.topmost();

    var qureyParams = {
        "name": "commonWalletController.withdrawApply",
        "args": [{}]
    };
    /** 后台请求 提现申请*/
    api.call(config.apiUrl, qureyParams).ok((data) => {
        console.log("##############api.call success start#############");
        console.log(JSON.stringify(data));
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


exports.onBackTap = onBackTap;
exports.completeDepositeTap = completeDepositeTap;
exports.noDepositeTap = noDepositeTap;
exports.noDepositeLookDetail = noDepositeLookDetail;
exports.underWayDepositeInformation = underWayDepositeInformation;
exports.completeDepositeInformation = completeDepositeInformation;
exports.depositeApplyBtn = depositeApplyBtn;