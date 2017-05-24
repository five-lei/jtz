var frame = require("ui/frame");
var phone = require( "nativescript-phone" );
var dialogsModule = require("ui/dialogs");
var config = require("../../../shared/config");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var AddCarViewModel = require("../../../view-models/add-car-view-model");
var adcar = new AddCarViewModel();

var num = null;//车牌号
var weight = null;//可载重货
var carInsideLong=null;//车辆内长
var carInsideHigh=null;//车辆内高
var carInsideWidth=null;//车辆内宽
var carLoadSpace=null;//车辆空间
var context=null;


exports.loaded = function(args) {
    var page = args.object.page;
    context = page.navigationContext;
    if(config.one!=null){
    var car_ty = page.getViewById("car_ty");//获取车牌号textfield
    car_ty.text = config.one;
    console.log(config.one);
    }
    if (page.ios) {
        var navigationBar = frame.topmost().ios.controller.navigationBar;
        navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    }


    page.bindingContext = adcar;
};

//返回事件
function onBackTap(args) {
    frame.topmost().goBack();
}

//点击客服
function onPhone(args) {
    phone.dial("4006-006-111",false);
}

//选择载货空间
function onCargoTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/car_space/car_space',
    }
    frame.topmost().navigate(navigationEntry)
}

//选择车辆类型
function onType(args) {
    var thisPage = args.object.page;
    thisPage.showModal('/views/my/views/car_type_modal', function (selectedItem) {
        console.log("selectedItem = " + selectedItem);
        thisPage.bindingContext.set('selectedItem', selectedItem);
    });
}

//选择车长
function onlength(args) {
    var thisPage = args.object.page;
    var fullsreen = true;
    thisPage.showModal('/views/my/views/imageModal', function (selectedItem) {
        console.log("selectedItem = " + selectedItem);
        thisPage.bindingContext.set('selectedItem', selectedItem);
    },fullsreen);
}

//车辆上传照片
function onCarphotoTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/car_photo/car_photo',
    }
    frame.topmost().navigate(navigationEntry)
}

//提交增加车辆的请求
function commit(args) {
    var page = args.object.page;
    var carNum = page.getViewById("carNum");//获取车牌号textfield
    var carLoadWeight = page.getViewById("carLoadWeight");//获取可载重货textfield
    num = carNum.text;//车牌号
    weight = carLoadWeight.text;//可载重货
    if(context==null||num==""||weight==""){//如果有一项为空则提示
        dialogsModule.alert({
        message: "请认真填完认证信息",
        okButtonText: "OK"
        });
    }else{//否则调取接口
        carInsideLong=page.navigationContext.carInsideLong;//载货空间内长
        carInsideHigh=page.navigationContext.carInsideHigh;//载货空间内高
        carInsideWidth=page.navigationContext.carInsideWidth;//载货空间内宽
        carLoadSpace=page.navigationContext.carLoadSpace;//载货空间内空间
        adcar.add(num,weight,carInsideLong, carInsideHigh,carInsideWidth,carLoadSpace)
        .catch(function(error) {
            console.log(error);
            dialogsModule.alert({
                message: "增加车辆失败",
                okButtonText: "OK"
            });
            return Promise.reject();
        })
        .then(function() {
            frame.topmost().navigate("views/my/mycar/mycar");
        });
    }
    
    console.log("num = " + num,"weight = " + weight,"carInsideLong="+carInsideLong,"carInsideHigh="+carInsideHigh,"carInsideWidth="+carInsideWidth,"carLoadSpace="+carLoadSpace);
    
}


exports.onBackTap = onBackTap
exports.onPhone = onPhone
exports.onCargoTap = onCargoTap
exports.onlength = onlength
exports.onType = onType
exports.onCarphotoTap = onCarphotoTap
exports.commit = commit;