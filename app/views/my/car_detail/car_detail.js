var frame = require("ui/frame");
var phone = require( "nativescript-phone" );
var car_id;
var car_type;
var car_number;
var car_length;
var car_capacity;
var car_name;
var car_set;

exports.loaded = function(args) { 
    var page = args.object.page;
    car_id=page.navigationContext.car_id;//车辆ID
    car_type=page.navigationContext.car_type;//车辆省份
    car_number=page.navigationContext.car_number;//车牌号码
    car_length=page.navigationContext.car_length;//车辆长度
    car_capacity=page.navigationContext.car_capacity;//车辆可载重量
    car_name=page.navigationContext.car_name;//车辆名称
    car_set=page.navigationContext.car_set;//车辆认证情况
    
    var type = page.getViewById("type");
    type.text = car_type;
    var number = page.getViewById("number");
    number.text = car_number;
    var length = page.getViewById("length"); 
    length.text = car_length;
    var set1 = page.getViewById("set1");
    var set2 = page.getViewById("set2");
    var set3 = page.getViewById("set3");
    var set4 = page.getViewById("set4");
    if(car_set==true){
        set1.text = "待审核";
        set2.text = "待审核";
        set3.text = "待审核";
        set4.text = "待审核";
    }else{
        set1.text = "已认证";
        set2.text = "已认证";
        set3.text = "已认证";
        set4.text = "已认证";
    }

};
function onBackTap(args) {
    frame.topmost().goBack();
}

//点击客服
function onPhone(args) {
    phone.dial("4006-006-111",false);
}

//重新上传图片
function ResetTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/car_photo/car_photo',
    }
    frame.topmost().navigate(navigationEntry)
}


exports.onBackTap = onBackTap
exports.onPhone = onPhone
exports.ResetTap = ResetTap