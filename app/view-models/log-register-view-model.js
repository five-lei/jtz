// var fetchModule = require("fetch");
// var Observable = require("data/observable").Observable;
//
// function Log_Register(info) {
//     info = info || {};
//
//     var viewModel = new Observable({
//         phone: info.phone || "",
//          PassWord: info.PassWord || ""
//     });
//
//     viewModel.login = function() {
//         console.log("phone"+viewModel.get("phone"));
//         console.log("PassWord"+viewModel.get("PassWord"));
//
//
//     };
//
//     return viewModel;
// }
// module.exports=Log_Register;

var config = require("../shared/config");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var dialogs = require("ui/dialogs");
var cache = require("nativescript-cache");
var api = require('../shared/api');

function Log_Register(info) {
    info = info || {};

    var viewModel = new Observable({
        phone: info.phone || cache.get('cacheLoginPhone') || "",
        PassWord: info.PassWord || ""
    });
    //保存最后一次登录手机号

    viewModel.login = function() {
        cache.set('cacheLoginPhone', viewModel.get("phone"));
        return fetchModule.fetch(config.loginUrl, {
                method: "POST",
                body: JSON.stringify({
                    mobile: viewModel.get("phone"),
                    password: viewModel.get("PassWord"),
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(handleErrors);
    };

    viewModel.register = function() {
        return fetchModule.fetch(config.apiUrl + "Users", {
            method: "POST",
            body: JSON.stringify({
                Username: viewModel.get("email"),
                Email: viewModel.get("email"),
                Password: viewModel.get("password")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleErrors);
    };

    viewModel.currentUser = function() {
        try {
            var qureyParams = {
                "name": "userController.currentUser",
                "args": []
            };
            api.call(config.apiUrl, qureyParams).ok((data) => {
                if (data.result) {
                    var hasServiceArea = data.result.hasServiceArea
                    config.ad=hasServiceArea;
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

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        //处理登录失异常
        // var options = {
        //     title: "登录失败",
        //     message: "用户名和密码不匹配"
        // };
        // dialogs.confirm(options).then((result) => {
        //     // result can be true/false/undefined
        //     // console.log(result);
        //     //TODO
        // });
        //错误信息
        console.log(response.statusText);
    } else if (response.ok) {
        var obj = JSON.parse(response._bodyText)
        cache.set('jwt', obj.jwt)
        console.log('登录成功token' + obj.jwt);
    }
    return response;
}

module.exports = Log_Register;