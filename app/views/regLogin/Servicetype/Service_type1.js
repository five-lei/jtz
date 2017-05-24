var frameModule = require("ui/frame");
var color = require("color");
var layout = require("ui/layouts/grid-layout");
var observableModule = require("data/observable");
var Observable = require("data/observable").Observable;
var viewModel = require('./service-type-view-model');
var observableArrayModule = require("data/observable-array");
var config = require("../../../shared/config");
var api = require('../../../shared/api');
var satisfyJudge = new Observable({
    satisfy: false
});
// 选中的服务类型数组
var selectedType;
// 页面加载时创建的ViewModel实例
var saveContent;
var userWokerBasicService = [];
var mobile = "13000000000";
var pwd;
exports.next_type = function() {
        var topmost = frameModule.topmost();
        userWokerBasicService = [];
        // 存储选中的服务类型
        selectedService = saveContent.countServiceType();
        if(selectedService.length==0){
            console.log('nnn');
        }
        for (var i = 0; i < selectedService.length; i++) {
            if (selectedService[i].selectCondition == true) {
                var type = selectedService[i].selectedService;
                var typeOfService = [];
                for (var j = 0; j < type.length; j++) {
                    if (type[j].selected == true) {
                        typeOfService.push({
                            label: type[j].type
                        })
                    }
                }
                 var serviceName = selectedService[i].serviceName;
                    userWokerBasicService.push({
                        typeName: { name: serviceName },
                        typeOfService: typeOfService
                    });


            }
        }

        // var requestParam={
        //         name:"userWorkerController.registerUserWorker",
        //         args:[{mobile:mobile,userWokerBasicService:userWokerBasicService}]
        //     }
        // api.call(config.apiUrl,requestParam).ok(
        //         json=>{
        //             var navigationEntry = {
        //                     moduleName: "views/regLogin/Servicetype/Service_type2",
        //                     context: {mobile:mobile},
        //                 };
        //             topmost.navigate(navigationEntry);
        //         }
        //     ).fail(
        //         json=>{
        //             alert("failed");
        //         }
        //     );
        if (userWokerBasicService.length == 0) {
            return;
        }

        var requestParam = {
            name: "masterInfoChangeController.submitInfoChange",
            args: [{
                mobile: mobile,
                userWokerBasicService: userWokerBasicService
            }]
        }
        api.call(config.apiUrl, requestParam).ok(ok => {
            // alert("success!");
            var navigationEntry = {
                moduleName: "views/regLogin/Servicetype/Service_type2",
                context: {
                    mobile: mobile,
                    pwd: pwd
                },
            };
            topmost.navigate(navigationEntry);
            // var topmost = frameModule.topmost();
            // topmost.goBack();
        }).fail(fail => {
            alert(fail.error);
        });
    }
exports.pageLoaded = function(args) {
    var globePage = args.object;
    saveContent = new viewModel.ViewModel(globePage);

    var grayControl = globePage.getViewById("grayControl");
    grayControl.bindingContext = satisfyJudge;

    navi = globePage.navigationContext;
    try {
        if (navi.mobile) {
            mobile = navi.mobile;
            pwd = navi.pwd;
        }
    } catch (e) {}
    
}

exports.userWokerBasicServiceInfo = function(){
    return {'lengthJudge':userWokerBasicService.length,'contentPush':userWokerBasicService,'satisfyInfo':satisfyJudge}
}
