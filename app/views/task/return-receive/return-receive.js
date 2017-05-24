/**
 * Created by giscafer on 2017/3/15.
 */

var topmost = require("ui/frame").topmost;
var ReceiveTaskModel = require('./return-receive-view-model');
var dialogsUtil = require("../../../common/dialogsUtil");
var ImageUploadPicker = require("../../../shared/imageUpload").ImageUploadPicker;
var createToken = require('../../../common/createToken');
var config = require("../../../shared/config");
var taskUtil = require("../common/taskUtil");
var imageUploadPicker = new ImageUploadPicker()
var model = new ReceiveTaskModel();
var taskId =null;

var list_view,
    signPicNumber=config.signPicNumber || 6,
    navigationContext,
    maxPicture = false,
    curPage,
    globalPage;

exports.onNavBtnTap = function (args) {
    taskId =null;
    selectPic = false;
    topmost().navigate(
        {
            moduleName: "views/task/return-task/return-task",
            animated: false,
            clearHistory: false
        }
    );

};

exports.loaded = function (args) {
    createToken();
    globalPage = args.object.page;
    navigationContext = globalPage.navigationContext;
    curPage = navigationContext.curPage;
    if(taskId != navigationContext.taskId) {
        globalPage.bindingContext = model.init(navigationContext);
    }
    taskId = navigationContext.taskId;
    list_view = globalPage.getViewById("list-view");
    // var textfield = globalPage.getViewById("exception-textview");
    // textfield && textfield.on("propertyChange", ((args) => {
    //     var tField = args.object;
    //     console.log(tField.text);
    //
    // }));
};

/**
 * 提交签收信息。
 * @param args
 */
exports.submit = function (args) {
    //签收逻辑
    var context=globalPage.bindingContext;
    model.picUpGoodsEnd(context, function (res, msg) {
        if (res) {
            if(navigationContext.isInDetail=='yes'){
                dialogsUtil.alert('签收成功');
                taskUtil.navigateToAfterMarketTaskDetail("return_finish",context.taskId,"taskReturn");
            }else{
                topmost().goBack();
            }
        } else {
            dialogsUtil.alert(msg)
        }
    });
    taskId =null;
};

/**
 * 删除图片
 * @param args
 */
exports.onPictureDelete = function (args) {
    var result=[],flag=false;
    var imgId=args.object.imgId;
    var imageItems = list_view.bindingContext.imageItems;
    var pickImgArr=[model.UPLOAD_BTN_IMG];
    if(imageItems.length==signPicNumber && maxPicture){
        flag=true;
    }
    //移除元素
    if(imgId){
        imageItems.forEach(function(item,index){
            if(item.id==imgId){
                imageItems.splice(index,1);
            }
        });
    }
    if(flag){
        result=[].concat(imageItems).concat(pickImgArr);
        maxPicture=false;
    }else{
        result=[].concat(imageItems)
    }
    list_view.bindingContext.imageItems =result
};
/**
 * 选择图片
 * @param args
 */
exports.onPicTap = function (args) {
    console.log('onPicSelect');
    var img = args.object;
    //如果不是上传图标点击事件
    if (img.src && img.src.trim() != 'res://tjtp2x') {
        return;
    }
    var imageItems = list_view.bindingContext.imageItems;
    var pickImgArr = [imageItems.pop()];
    imageUploadPicker.selectSingle(args, list_view, null, function (data) {
        var imgData = JSON.parse(data);
        var imageArr = imgData;
        var result=[];
        if(imageItems.length<(signPicNumber-1)){
            result=imageItems.concat(imageArr).concat(pickImgArr);
        }else{
            //大于signPicNumber张时，不能上传
            result=imageItems.concat(imageArr);
            maxPicture=true;
        }
        globalPage.bindingContext.imageItems = result
    });
};
