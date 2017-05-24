"use strict";
var viewModel = require("./typePopWindowMode");
var observable_1 = require("data/observable");
var onClose;
var thisPage;
var selectedTypes = [];
var selectedItem = "nimabi";
var dataItems;
var userWokerBasicService = require('../Servicetype/Service_type1');

var nowCheck;

function onShownModally(args) {
    thisPage = args.object;
    onClose = args.closeCallback;
    nowCheck = args.context.nowChecked;
    var datas;
    if (!args.context.dataItems || args.context.dataItems.length == 0) {
        datas = [new viewModel.DataItem(0, "安装"), new viewModel.DataItem(0, "配送")]
    } else {
        datas = args.context.dataItems
    }
    thisPage.bindingContext = new observable_1.Observable({
        // dataItems: args.context.dataItems,
        dataItems: datas,
        selectedItem: null
    });
    dataItems = thisPage.bindingContext.dataItems;

}

exports.onShownModally = onShownModally;
exports.closeModal = function () {
    // var arr=thisPage.bindingContext.dataItems._array;
    // selectedTypes=[];
    // for(var i=0;i<arr.length;i++){
    //         selectedTypes.push({type:arr[i]._type,selected:arr[i].selected})
    // }
    // for (var i = 0; i < dataItems.length; i++) {
    //     if (nowCheck.length != 0 || dataItems[i].selected) {
    //         userWokerBasicService.userWokerBasicServiceInfo().satisfyInfo.satisfy = true;
    //     } else {
    //         userWokerBasicService.userWokerBasicServiceInfo().satisfyInfo.satisfy = false;
    //     }
    // }

    for (var i = 0; i < dataItems.length; i++) {
        if (dataItems[i].selected) {
            userWokerBasicService.userWokerBasicServiceInfo().satisfyInfo.satisfy = true;
        } else {
            if (nowCheck) {
                for (var j = 0; j < nowCheck.length; j++) {
                    if (nowCheck[j].selected) {
                        userWokerBasicService.userWokerBasicServiceInfo().satisfyInfo.satisfy = true;
                    } else {
                        userWokerBasicService.userWokerBasicServiceInfo().satisfyInfo.satisfy = false;
                    }
                }
            }

        }
    }

    selectedItem = "caonima";
    thisPage.bindingContext.set('selectedItem', selectedItem);
    onClose(thisPage.bindingContext.get('dataItems'));
    thisPage.closeModal();
};
exports.itemSelected = function (args) {
    console.log("selected" + args.itemIndex)
    var car_type = dataItems[args.itemIndex].type;
    console.log("car_type" + car_type);
    for (var i = 0; i < dataItems.length; i++) {
        if (dataItems[i] == dataItems[args.itemIndex]) {
            dataItems[i].selected = !dataItems[i].selected;
        }
    }
};
exports.itemDeselected = function (args) {
    console.log("deselected" + args.itemIndex)
    var item = dataItems[args.itemIndex];
    console.log("car_type" + item.type);
    item.selected = !item.selected;
};