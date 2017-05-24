/**
 * Created by Administrator on 2017/4/18.
 */

var topmost = require("ui/frame").topmost;
var Observable = require("data/observable").Observable;
var navigator = require("../../../common/navigator");
var color = require("color");
var viewModel = require('./question-feedback-view-model');
var ImageUploadPicker = require("../../../shared/imageUpload").ImageUploadPicker;
var createToken = require('../../../common/createToken');
var dialogsUtil = require("../../../common/dialogsUtil");
var config = require("../../../shared/config");
var imageUploadPicker = new ImageUploadPicker();

var globePage,
    navigationContext,
    signPicNumber = config.signPicNumber || 6,
    pic_view,
    selectPic = false,
    exception_des_view,
    preNavigationContext;
var models = new viewModel.ViewModel();

/**
 * 页面加载事件
 * @param args
 */
exports.pageLoaded = function (args) {

    createToken();
    globePage = args.object.page;
    pic_view = globePage.getViewById("picture-list-view");  //图片
    var selectedAbnormalType = globePage.getViewById("selectedAbnormalType"); //显示异常类型

    navigationContext = globePage.navigationContext;  //页面传值
    //选择图片禁止重新pageLoaded
    if (selectPic) {
        //选择的异常类型文字
        selectedAbnormalType.text = navigationContext.text;
        return;
    }
    models.init(navigationContext);
    globePage.bindingContext = models.detailList;
    //选择的异常类型文字
    selectedAbnormalType.text = navigationContext.text;
    showDetailPanel(navigationContext.smallType);
    preNavigationContext = navigationContext;

    var importNumber = globePage.getViewById("import_number");
    exception_des_view = globePage.getViewById('exception_des_view');
    if (args.object.android) {
        /*限制输入框输入长度*/
        var fArray = [];
        fArray[0] = new android.text.InputFilter.LengthFilter(120);
        exception_des_view.android.setFilters(fArray);
    } else {
        //TODO ios请看此
    }
    exception_des_view.on("propertyChange", ((args) => {
        var tField = args.object;
        importNumber.text = tField.text.length;
    }));
};
/**
 * 安装货损和物流货损有详细选择面板
 */
function showDetailPanel(smallType) {
    if (smallType == '安装货损') {
        var install_broken_detail = globePage.getViewById("install_broken_detail");
        install_broken_detail.visibility = 'visible';
    } else if (smallType == '物流货损') {
        var logistics_broken_detail = globePage.getViewById("logistics_broken_detail");
        logistics_broken_detail.visibility = 'visible';
    }

}

/**
 * 保存操作
 */
exports.saveHandler = function () {
    selectPic = false;
    var detailInfo = getDetailSelectedInfo(navigationContext.smallType);
    if(detailInfo){
        var describe=globePage.bindingContext.describe;
        globePage.bindingContext.describe=detailInfo+'；补充：'+describe;
    }
    models.save(globePage.bindingContext, navigationContext, function (res, msg) {
        if (res) {
            dialogsUtil.alert("提交成功");
            navigator.navigateBack();
        } else {
            dialogsUtil.alert(msg);
        }
    })
};

/**
 * 返回
 * @param args
 */
exports.onBackTap = function (args) {
    navigator.navigateBack();
};
/**
 * 异常类型选择
 * @param args
 */
exports.tapAbnormalTypeSelect = function (args) {
    var navigationEntry = {
        moduleName: "views/common/abnormal-type-select/abnormal-type-select",
        context: {
            waybillId: navigationContext.waybillId
        }
    };
    topmost().navigate(navigationEntry);
};

/**
 * 删除图片
 * @param args
 */
exports.onPictureDelete = function (args) {
    var result = [], flag = false;
    var pickImgArr = [models.UPLOAD_BTN_IMG];
    var imgId = args.object.imgId;
    var imageItems = globePage.bindingContext.images;
    if (imageItems.length == signPicNumber) {
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
        result = [].concat(imageItems).concat(pickImgArr)
    } else {
        result = [].concat(imageItems)
    }
    globePage.bindingContext.set('images', result)
};
/**
 * 选择图片
 * @param args
 */
exports.onPicTap = function (args) {
    var img = args.object;
    //如果不是上传图标点击事件
    if (img.src && img.src.trim() != 'res://tjtp2x') {
        return;
    }
    selectPic = true;//选择图片禁止重新pageLoaded
    var imageItems = globePage.bindingContext.images;
    var pickImgArr = [imageItems.pop()];
    imageUploadPicker.selectSingle(args, null, null, function (data) {
        var imgData = JSON.parse(data);
        var imageArr = imgData;
        var result = [];
        if (imageItems.length < (signPicNumber - 1)) {
            result = imageItems.concat(imageArr).concat(pickImgArr);
        } else {
            //大于signPicNumber张时，不能上传
            result = imageItems.concat(imageArr)
        }
        globePage.bindingContext.set('images', result)
    });

};
/**
 * 将选中的选型拼成备注保存
 */
function getDetailSelectedInfo(smallType) {
    var info = "", ct = globePage.bindingContext;
    if(smallType!=='安装货损' && smallType!=='物流货损'){
        return info;
    }
    if (smallType == '物流货损') {
        //破损程度
        var damage_extent = "破损程度：";
        if (ct.slight) {
            damage_extent += "轻微";
        } else if (ct.general) {
            damage_extent += "一般";
        } else if (ct.seriousness) {
            damage_extent += "严重";
        }
        //是否可以异常签收
        var abnormal_sign = "是否可以异常签收：";
        if (ct.abnormal_sign_y) {
            abnormal_sign += "是";
        } else if (ct.abnormal_sign_n) {
            abnormal_sign += "否";
        }
        info = damage_extent + " 、 " + abnormal_sign + " 、 ";
    }
    //客服是否接受维修
    var accept_maintenance = "客服是否接受维修：";
    if (ct.accept_maintenance_y) {
        accept_maintenance += "是";
    } else if (ct.accept_maintenance_n) {
        accept_maintenance += "否";
    }
    //是否需要补件
    var rfe = "是否需要补件：";
    if (ct.rfe_y) {
        rfe += "需要";
    } else if (ct.rfe_n) {
        rfe += "不需要";
    }
    //我能否维修
    var maintenance_myself = "我能否维修：";
    if (ct.maintenance_y) {
        maintenance_myself += "能";
    } else if (ct.maintenance_n) {
        maintenance_myself += "不能";
    }

    info += accept_maintenance + " 、 " + rfe + " 、 " + maintenance_myself;

    return info;
}