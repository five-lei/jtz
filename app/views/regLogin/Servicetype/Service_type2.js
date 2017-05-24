var frameModule = require("ui/frame");
var color = require("color");
var layout = require("ui/layouts/grid-layout");
var viewModel = require('./service-type2-view-model');
var Observable = require("data/observable").Observable;
var config = require("../../../shared/config");
var api = require('../../../shared/api');
var fetchModule = require("fetch");
var cache = require("nativescript-cache");
// 选中的服务类型数组
var selectedType;
// 页面加载时创建的ViewModel实例
var saveContent;
//测试专用初始值
var mobile = "13000000000";

// 选中的服务类型数组
var selectedType;
// 页面加载时创建的ViewModel实例
var saveContent;

function Next_Home() {


    // 存储选中的维修类型
    selectedType = saveContent.countServiceType();
    returnService = saveContent.getReuturnSelected();
    var userWokerIncrementService = [];
    for (var i = 0; i < selectedType.length; i++) {
        console.log(selectedType[i]['_serviceType']);
        userWokerIncrementService.push({
            repairService: {
                label: selectedType[i]['_serviceType']
            },
            maintainService: {
                label: returnService
            }
        })
    }
    // 是否支持返货选择状态 info.selectState
    console.log(info.selectState);
    // var requestParam={
    //     name:"userWorkerController.registerUserWorker",
    //     args:[{userWokerIncrementService:userWokerIncrementService,mobile:mobile}]
    // }
    // saveService(requestParam,ok=>{
    //     var topmost = frameModule.topmost();
    //     topmost.navigate("views/index/index");
    // },fail=>{
    //     alert(fail.result)
    // })
    if (userWokerIncrementService.length == 0) {
        return;
    }

    var requestParam = {
        name: "masterInfoChangeController.submitInfoChange",
        args: [{
            mobile: mobile,
            userWokerIncrementService: userWokerIncrementService
        }]
    }
    api.call(config.apiUrl, requestParam).ok(ok => {
        // alert("success!");
        fetchModule.fetch(config.loginUrl, {
                method: "POST",
                body: JSON.stringify({
                    mobile: mobile,
                    password: pwd
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if (!response.ok) {
                    //处理登录失异常
                    var options = {
                        title: "登录失败",
                        message: "用户名和密码不匹配"
                    };
                    dialogs.confirm(options).then((result) => {
                        // result can be true/false/undefined
                        // console.log(result);
                        //TODO
                    });
                    //错误信息
                    console.log(response.statusText);
                } else if (response.ok) {
                    var topmost = frameModule.topmost();
                    topmost.navigate("views/index/index");
                    var obj = JSON.parse(response._bodyText)
                    cache.set('jwt', obj.jwt)
                    console.log('登录成功token' + obj.jwt);
                    getCurrentUserInfo();
                }
            });

        
    }).fail(fail => {
        alert(fail.error)
    });
}

function getCurrentUserInfo (){
    try {
            var qureyParams = {
                "name": "userController.currentUser",
                "args": []
            };
            api.call(config.apiUrl, qureyParams).ok((data) => {
                if (data.result) {
                    var userInfo = {
                        id: data.result.id,
                        mobile: data.result.mobile,
                        realName: data.result.realName,
                        portrait: data.result.portrait[0] || ""
                    };
                    cache.set('userInfo', JSON.stringify(userInfo));
                }
            }).fail((err) => {
                // if (err.code) {

                // } else {
                //     options.message = "系统出错,获取失败";
                // }
                // dialogs.alert(options).then(() => {});
                console.log("系统出错,获取当前用户信息失败" + JSON.stringify(err));
            });
        } catch (error) {}
    }



function saveService(requestParam, ok, fail) {
    api.call(config.apiUrl, requestParam).ok(
        json => {
            ok()
        }
    ).fail(
        json => {
            fail()
        }
    );
}

exports.Next_Home = Next_Home;

// exports.Grid_style = function(args) {
//     var thisPage = args.object.page;
//     thisPage.showModal('/views/regLogin/views/typePopWindow', { items: [] }, function (selectedItem) {
//         console.log("selectedItem = " + selectedItem);
//         // thisPage.bindingContext.set('selectedItem', selectedItem);
//     });
// }
var userWokerBasicService;
var pwd;
exports.pageLoaded = function(args) {
    var globePage = args.object;
    saveContent = new viewModel.ViewModel(globePage);
    var returnGoods = globePage.getViewById("returnGoods");
    returnGoods.bindingContext = info;
    navi = globePage.navigationContext;
    // userWokerBasicService=navi.userWokerBasicService;
    try {
        if (navi.mobile != undefined) {
            mobile = navi.mobile;
            pwd = navi.pwd;
        }
    } catch (e) {}
    
}

var info = new Observable({
    selectState: false
});

exports.onSelectedImitate = function() {
    info.selectState = !info.selectState;
    saveContent.onReturnSelected();
}

exports.skip = function () {
    var topmost = frameModule.topmost();
    topmost.navigate("views/index/index");
}