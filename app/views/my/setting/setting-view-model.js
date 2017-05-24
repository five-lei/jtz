/**
 * Created by giscafer on 2017-05-17.
 */

var observable = require("data/observable");
var app = require("application");
var timer = require("timer");
var api = require("../../../shared/api");
var config = require("../../../shared/config");

class SettingModel{
    constructor(){

    }

    /**
     * 退出登录
     * @param cb
     */
    loginOut(cb){
        //查询参数
        var params = {
            "name": "securityController.logout",
            "args": []
        };
        api.call(config.apiUrl, params).ok((json) => {
            cb(true);
        }).fail(function (err) {
            cb(false,err);
        })
    }
}

module.exports=SettingModel;