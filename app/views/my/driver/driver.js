var frame = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var config = require("../../../shared/config");
var api = require('../../../shared/api');
var cache = require("nativescript-cache");
var page;

function loaded(args) {
    page = args.object;
    queryRealName();
    cache.get('idNoPhotoFront',null);
    cache.get('idNoPhotoBack',null);
    cache.get('idNoPhotoHand',null);
}
var realName;
var idNo

function saveUserIdInfo(realName, idNo) {
    var idNoPhotoFront = cache.get('idNoPhotoFront');
    var idNoPhotoBack = cache.get('idNoPhotoBack');
    var idNoPhotoHand = cache.get('idNoPhotoHand');
    console.log(idNoPhotoFront);
    console.log(idNoPhotoBack);
    //console.log(idNoPhotoHand);
    idNo = page.getViewById("idNo").text;
    realName = page.getViewById("realName").text;
    var requestParam = {
        name: "userController.authentication",
        args: [{
            realName: realName,
            idNo: idNo,
            idNoPhotoFront: idNoPhotoFront,
            idNoPhotoBack: idNoPhotoBack,
            idNoPhotoHand: idNoPhotoHand
        }]
    }
    api.call(config.apiUrl, requestParam).ok(
        data => {
            console.dump(data);
            var idVO = data.result;

            var navigationEntry = {
                moduleName: 'views/my/driver_message/driver_message',
            }
            frame.topmost().navigate(navigationEntry)
        }
    ).fail(
        data => {
            console.log("failed")
            alert(data.error)
        });
}

function queryRealName() {
    var requestParam = {
        name: "userWorkerController.getUserIdInfo",
        args: []
    }
    if (!realName) {
        api.call(config.apiUrl, requestParam).ok(
            data => {
                console.dump(data)
                realName = data.result.realName;
                page.bindingContext = new Observable({
                    realName: realName
                })
            }
        ).fail(
            data => {
                console.log("failed")
                console.dump(data)
            });
    }

}

function onBackTap(args) {
    frame.topmost().goBack();
}

function btn_page(args) {
    // cache.set('idNoPhotoFront',null);
    // cache.set('idNoPhotoBack',null);
    // cache.set('idNoPhotoHand',null);
    var realName = page.getViewById("realName").text;
    // var idNo = page.getViewById("idNo").text;
    saveUserIdInfo(realName, idNo);
}

function onHelp(args) {
    var thisPage = args.object.page;
    thisPage.showModal('/views/my/views/phoneModal', function () {});
}


exports.onBackTap = onBackTap
exports.btn_page = btn_page
exports.onHelp = onHelp
exports.loaded = loaded