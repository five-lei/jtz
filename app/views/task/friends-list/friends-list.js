/**
 * Created by Administrator on 2017/3/21.
 */
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var view_model = require("./friends-view-model");
var api = require("../../../shared/api");
var config = require("../../../shared/config");
var createToken = require('../../../common/createToken');
var dialogsUtil = require("../../../common/dialogsUtil");


//任务ID
var taskId = null;

function pageNavigatingTo(args) {
    createToken();
    var page = args.object;
    //任务ID、初始化
    taskId = page.navigationContext.taskId;
    page.bindingContext = new view_model.init();
    new view_model.ListViewLayoutsModel(page);
}
exports.pageNavigatingTo = pageNavigatingTo;
function toggleFavourite(args) {
    var session = args.view.bindingContext;
    var page = args.object.page;
    var friends = page.bindingContext.friends;
    var arr=friends.filter(function (item) {
        return item.isFavourite
    });
    if(arr.length && !session.isFavourite){
        dialogsUtil.alert('只能选择一个好友！');
        return;
    }
    session.toggleFavourite();
}
exports.toggleFavourite = toggleFavourite;


function gtFinishHandler(args) {

    //转给好友，点击完成
    view_model.gtFinishHandler(taskId, function (res,msg) {

        if (res) {
            topmost.goBack();
           /* dialogsUtil.alert('操作成功',function(){
                topmost.goBack();
            });*/
        } else {
            dialogsUtil.alert((msg || '给TA失败'),function(){
                // topmost.goBack();
            });
        }

    })

}
exports.gtFinishHandler = gtFinishHandler;

function goBack(args) {
    topmost.goBack();
}
exports.goBack = goBack;
