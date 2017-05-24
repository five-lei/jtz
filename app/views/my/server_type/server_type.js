var frameModule = require("ui/frame");
var color = require("color");
var layout = require("ui/layouts/grid-layout");
var observableModule = require("data/observable");
var Observable = require("data/observable").Observable;
var viewModel = require('./server_type_model');
var observableArrayModule = require("data/observable-array");
var config = require("../../../shared/config");
var api = require('../../../shared/api');

// 选中的服务类型数组
var selectedType;
// 页面加载时创建的ViewModel实例
var saveContent;
var userWokerBasicService = [];
var globePage;
exports.onNavBtnTap = function() {
    var topmost = frameModule.topmost();
    topmost.goBack();

};

//返回事件
function onBackTap(args) {
    frameModule.topmost().goBack();
}

exports.onBackTap = onBackTap

exports.next_btn = function(args) {
var selectedService=args.object.page.bindingContext.serviceList;
    userWokerBasicService=[];
    // 存储选中的服务类型
    // selectedType = saveContent.countServiceType();
    // selectedService = saveContent.countServiceType();
    for (var i = 0; i < selectedService.length; i++) {
        if(selectedService[i].selectCondition==true){
            var type=selectedService[i].selectedType;
            var typeOfService=[];
            for(var j=0;j<type.length;j++){
                if(type[j].selected==true){
                    typeOfService.push({
                    label:type[j].type
                })
            } 
             }
            var serviceName=selectedService[i].serviceName;
            userWokerBasicService.push({
                 typeName:{name:serviceName},
                 typeOfService:typeOfService
            });
       
       
        
        }
    };

   var requestParam={
        name:"masterInfoChangeController.submitInfoChange",
        args:[{userWokerBasicService:userWokerBasicService}]
    }
    api.call(config.apiUrl,requestParam).ok(ok=>{
        // alert("success!");
    var topmost = frameModule.topmost();
    topmost.goBack();
    }).fail(fail=>{

        alert(fail.error)
    });
}

exports.pageLoaded = function(args) {
    globePage = args.object;
    var list = globePage.getViewById('list-view');
    saveContent = new viewModel.ViewModel(globePage);
    // list.bindingContext = saveContent;
}