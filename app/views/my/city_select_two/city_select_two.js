var frame = require("ui/frame");
var config = require("../../../shared/config");
var dialogsModule = require("ui/dialogs");
var visibility = require("ui/enums");
var color = require("color");
var ImageModule = require("ui/image");
var viewModel = require("../../../view-models/city-list-view-model");
var api = require('../../../shared/api');
var page;
var provinces;
var citys;
var districts;

/**第一个listview */
var lv1;
var img1;
var label1;
var flag1 = true;
/**第二个listview */
var lv2;
var l2;
var img2;
var label2;
var flag2 = true;
/**第三个listview */
var lv3;
var img3;
var label3;
var flag3 = true;
var l3;

exports.loaded = function (args) {
    page = args.object;
    provinces = page.getViewById("provinces"); //省的Lable---根据选中的条目来变化
    citys = page.getViewById("citys"); //市的Lable
    districts = page.getViewById("districts"); //区的Lable

    config.cityState = false;

    lv1 = page.getViewById("lv1");
    lv2 = page.getViewById("lv2");
    lv3 = page.getViewById("lv3");

    l1 = page.getViewById("l1");
    l2 = page.getViewById("l2");
    l3 = page.getViewById("l3");

    img1 = page.getViewById("img1");
    img2 = page.getViewById("img2");
    img3 = page.getViewById("img3");

    label1 = page.getViewById("label1");
    label2 = page.getViewById("label2");
    label3 = page.getViewById("label3");
    page.bindingContext = new viewModel.ViewModel();
};

function onBackTap(args) {
    frame.topmost().goBack();
}

function onSelectAllTap1(args) {
    // 每次进来都清空数组里的元素
    var length = page.bindingContext.provinceSelectArray.length;

    lv1.deselectAll();

    for (var i = 0; i < length; i++) {
        page.bindingContext.provinceSelectArray.pop();
    }

    if (flag1) {
        img1.src = "res://x_ssq";
        label1.style.color = new color.Color("orange");
        lv1.selectAll();
        flag1 = false;
    } else {
        var listLength = lv1.items.length;
        for (var i = 0; i < listLength; i++) {
            var item = page.bindingContext.provinceList.getItem(i);
            item.selected = false;
        }
        provinces.text = "已选省" + page.bindingContext.provinceSelectArray.length + "、";
        img1.src = "res://ico_check1";
        label1.style.color = new color.Color("#333333");
        lv1.deselectAll();

        flag1 = true;

        // lv2.bindingContext.cityList.getItem(0).selected = false;
    }
    l2.style.visibility = "collapsed";
    l3.style.visibility = "collapsed";

    // 改变全选的样式
    img2.src = "res://ico_check1";
    label2.style.color = new color.Color("#333333");
    img3.src = "res://ico_check1";
    label3.style.color = new color.Color("#333333");
    // lv2.deselectAll();
    // lv3.deselectAll();
}
exports.onSelectAllTap1 = onSelectAllTap1;

function onSelectAllTap2(args) {
    // 每次进来都清空数组里的元素
    var length = lv2.bindingContext.citySelectArray.length;
    lv2.deselectAll();
    for (var i = 0; i < length; i++) {
        lv2.bindingContext.citySelectArray.pop();
    }
    if (flag2) {
        img2.src = "res://x_ssq";
        label2.style.color = new color.Color("orange");
        lv2.selectAll();
        l3.style.visibility = "collapsed";
        flag2 = false;
    } else {
        var listLength = lv2.items.length;
        for (var i = 0; i < listLength; i++) {
            var item = lv2.bindingContext.cityList.getItem(i);
            item.selected = false;
        }
        citys.text = "市" + lv2.bindingContext.citySelectArray.length + "、";
        img2.src = "res://ico_check1";
        label2.style.color = new color.Color("#333333");
        lv2.deselectAll();
        flag2 = true;
    }
    l3.style.visibility = "collapsed";

    // 改变全选的样式
    img3.src = "res://ico_check1";
    label3.style.color = new color.Color("#333333");
    // lv3.deselectAll();
}
exports.onSelectAllTap2 = onSelectAllTap2;

function onSelectAllTap3(args) {
    // 每次进来都清空数组里的元素
    var length = lv3.bindingContext.districtSelectArray.length;
    lv3.deselectAll();
    for (var i = 0; i < length; i++) {
        lv3.bindingContext.districtSelectArray.pop();
    }

    if (flag3) {
        img3.src = "res://x_ssq";
        label3.style.color = new color.Color("orange");
        lv3.selectAll();
        flag3 = false;
    } else {
        var listLength = lv3.items.length;
        for (var i = 0; i < listLength; i++) {
            var item = lv3.bindingContext.districtList.getItem(i);
            item.selected = false;
        }

        districts.text = "区" + lv3.bindingContext.districtSelectArray.length;
        img3.src = "res://ico_check1";
        label3.style.color = new color.Color("#333333");
        lv3.deselectAll();
        flag3 = true;
    }
}
exports.onSelectAllTap3 = onSelectAllTap3;

function completeTap(args) {
    // dialogsModule.alert({
    // message: "省= "+config.provinceArray+" 市= "+config.cityArray+" 区= "+config.districtArray,
    // okButtonText: "OK"
    // });
    var navigationEntry = {
        moduleName: 'views/my/myset/myset',
        context: {
            "province": config.provinceArray,
            "city": config.cityArray,
            "district": config.districtArray,
        },
        clearHistory: false,
        animated: true
    }
    var requestArr = [];
    var requestAPi = "masterInfoChangeController.submitInfoChange";
    var userWorkerServiceArea = []
    try {
        config.provinceArray._array.forEach(data => {
            requestArr.push(data)
        });
        config.cityArray._array.forEach(data => {
            requestArr.push(data)
        });
        config.districtArray._array.forEach(data => {
            requestArr.push(data)
        });

    } catch (e) {
        console.log(e)
    }


    requestArr.forEach(each => {
        userWorkerServiceArea.push({
            area: {
                code: each
            }
        })
    });

    api.call(config.apiUrl, {
        name: requestAPi,
        args: [{
            "userWorkerServiceArea": userWorkerServiceArea
        }]
    }).ok(data => {
        // alert("success");
    }).fail(data => {
        alert(data.error);
    });
    frame.topmost().navigate(navigationEntry)

}


exports.completeTap = completeTap
exports.onBackTap = onBackTap