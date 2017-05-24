/**
 * Created by giscafer on 2017/3/15.
 */

var topmost = require("ui/frame").topmost;
var frameModule = require("ui/frame");
var ReceiveTaskModel = require('./receive-task-view-model');
var ImageUploadPicker = require("../../../shared/imageUpload").ImageUploadPicker;
var createToken = require('../../../common/createToken');
var dialogsUtil = require("../../../common/dialogsUtil");
var config = require("../../../shared/config");
var taskUtil = require("../common/taskUtil");
var imageUploadPicker = new ImageUploadPicker()
var model = new ReceiveTaskModel();

var globalPage,
    signPicNumber = config.signPicNumber || 6,
    selectPic = false,
    maxPicture = false,
    navigationContext,
    // curPage,
    list_view;

exports.pageLoaded = function (args) {

    createToken();
    globalPage = args.object.page;
    globalPage.abnormalType = true;
    navigationContext = globalPage.navigationContext;
    //选择图片禁止重新pageLoaded
    if (selectPic) {
        return;
    }
    globalPage.bindingContext = model.init(navigationContext);


    var importNumber = globalPage.getViewById("import_number");
    var input_View = globalPage.getViewById('input_view');
    list_view = globalPage.getViewById('list-view');
    if (args.object.android) {
        /*限制输入框输入长度*/
        var fArray = [];
        fArray[0] = new android.text.InputFilter.LengthFilter(120);
        input_View.android.setFilters(fArray);
    } else {

    }
    input_View && input_View.on("propertyChange", ((args) => {
        var tField = args.object;
        importNumber.text = tField.text.length;
    }));
};

/**
 * 提交签收信息。
 * @param args
 */
exports.signeSubmit = function (args) {
    selectPic = false;
    var page = args.object.page;
    var text = page.getViewById('input_view').text;
    if (!page.abnormalType && !text) {
        dialogsUtil.alert('请输入异常描述！');
        return;
    }
    var context = globalPage.bindingContext;
    //维修签收
    if (navigationContext.maintenance) {
        model.maintenanceSign(context, page.abnormalType, text, function (res, errorMsg) {
            if (res) {
                if (navigationContext.isInDetail == 'yes') {
                    dialogsUtil.alert('签收成功');
                    taskUtil.navigateToAfterMarketTaskDetail("maintenance_finish", context.taskId, "taskMaintenanceReceive");
                } else {
                    var topmost = frameModule.topmost();
                    topmost.navigate(
                        {
                            moduleName: "views/task/maintenance-task/maintenance-task",
                            animated: false,
                            clearHistory: false
                        }
                    );
                }
            } else {
                dialogsUtil.alert(errorMsg);
            }
        });
    } else {
        //新任务签收
        model.submitSign(context, page.abnormalType, text, function (res, errorMsg) {
            if (res) {
                //是否为详情页
                if (navigationContext.isInDetail == 'yes') {
                    dialogsUtil.alert('签收成功');
                    taskUtil.navigateToNewTaskDetail("had_sign_for", context.taskId, "taskIndexReceive");
                } else {
                    dialogsUtil.alert('签收成功');
                    var topmost = frameModule.topmost();
                    topmost.navigate(
                        {
                            moduleName: "views/task/index",
                            animated: false,
                            clearHistory: false
                        }
                    );
                }
            } else {
                dialogsUtil.alert(errorMsg);
            }
        });
    }
};

exports.onBackTap = function (args) {
    selectPic = false;
    var curPage = navigationContext.curPage;
    console.log("curPage:" + curPage);
    if (curPage == "taskIndex") {
        var topmost = frameModule.topmost();
        topmost.navigate(
            {
                moduleName: "views/task/index",
                animated: false,
                clearHistory: false
            }
        );
    } else {
        var topmost = frameModule.topmost();
        topmost.navigate(
            {
                moduleName: "views/task/maintenance-task/maintenance-task",
                animated: false,
                clearHistory: false
            }
        );
    }

};

/**
 * 删除图片
 * @param args
 */
exports.onPictureDelete = function (args) {
    var result = [], flag = false;
    var imgId = args.object.imgId;
    var imageItems = list_view.bindingContext.imageItems;
    var pickImgArr = [model.UPLOAD_BTN_IMG];
    if (imageItems.length == signPicNumber && maxPicture) {
        flag = true;
    }
    //移除元素
    if (imgId) {
        imageItems.forEach(function (item, index) {
            if (item.id == imgId) {
                imageItems.splice(index, 1);
            }
        });
    }
    if (flag) {
        result = [].concat(imageItems).concat(pickImgArr);
        maxPicture = false;
    } else {
        result = [].concat(imageItems)
    }
    list_view.bindingContext.imageItems = result
};
/**
 * 选择图片
 * @param args
 */
exports.onPicTap = function (args) {
    // console.log('onPicSelect');
    var img = args.object;
    //如果不是上传图标点击事件
    if (img.src && img.src.trim() != 'res://tjtp2x') {
        return;
    }
    selectPic = true;
    var imageItems = list_view.bindingContext.imageItems;
    var pickImgArr = [imageItems.pop()];
    imageUploadPicker.selectSingle(args, list_view, null, function (data) {
        var imgData = JSON.parse(data);
        var imageArr = imgData;
        var result = [];
        if (imageItems.length < (signPicNumber - 1)) {
            result = imageItems.concat(imageArr).concat(pickImgArr)
        } else {
            //大于signPicNumber张时，不能上传
            result = imageItems.concat(imageArr);
            maxPicture = true;
        }
        list_view.bindingContext.imageItems = result
    });
};
