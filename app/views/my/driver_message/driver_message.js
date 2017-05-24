var frame = require("ui/frame")
var Observable = require("data/observable").Observable;
var config = require("../../../shared/config");
var api = require('../../../shared/api');

function onBackTap(args) {
    frame.topmost().goBack();
}

function onHelp(args) {
    var thisPage = args.object.page;
    thisPage.showModal('/views/my/views/phoneModal', function () {});
}

var page;
var realName;
var idNo;
var idNoPhotoFront;
var idNoPhotoBack;
var idNoPhotoHand;
var userIdStatus;
function loaded(args) {
    page = args.object;
    getUserIdInfo();

}

function getUserIdInfo() {
    var requestParam = {
        name: "userController.queryUserIdeInfo",
        args: []
    }
    api.call(config.apiUrl, requestParam).ok((data)=>{
            console.log(data);
            realName = data.result.realName;
            idNo = data.result.idNo;
            idNoPhotoFront=data.result.idNoPhotoFront;
            idNoPhotoBack=data.result.idNoPhotoBack;
            idNoPhotoHand=data.result.idNoPhotoHand;
            userIdStatus=data.result.userIdStatus;
            console.log(idNoPhotoFront);
            if("unauthorized"==userIdStatus){
                userIdStatus="实名信息审核中，如需修改请拨打400客服热线"
            }else if("certified"==userIdStatus){
                userIdStatus="已认证不可修改，如需修改请拨打400客服热线"
            }
            try{
                page.bindingContext = new Observable({
                realName: realName,
                idNo: idNo,
                idNoPhotoFront:idNoPhotoFront,
                idNoPhotoBack:idNoPhotoBack,
                idNoPhotoHand:idNoPhotoHand,
                userIdStatus:userIdStatus
                })
            }catch(e){

            }
            
        }).fail ((err) => {
            console.log(err);

        })
    
}


exports.onBackTap = onBackTap
exports.onHelp = onHelp
exports.loaded = loaded