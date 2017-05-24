/**
 * Created by giscafer on 2017/4/8.
 */

'use strict'
var cache = require("nativescript-cache");
var config=require('./config');


/**
 * @params url  接口请求地址
 * @params queryParams 参数对象
 *  eg:queryParams={
 *      "loginAcct":"10002"
 *  }
 * @returns {{ok: (function(*)), fail: (function(*))}}
 *
 * //sample
 * api.call(url,queryParams).ok(function(data){
 *   //成功
 *   console.log(data)
 *
 * }).fail(function(err){
 *  //失败
 *  console.log(err);
 * });
 */
function call() {

    if (arguments.length < 1) {
        console.log("At least one argument for $rpc call ");
        return;
    }
    var args = Array.prototype.slice.call(arguments);
    var url = args[0];
    //请求参数
    var queryParams = args[1];
    // 定义Http头
    var headers = {
        "Content-Type": "application/json"
    };
    // 从缓存中获取登录令牌
    var jwt = cache.get("jwt");
    if (jwt) {
        headers["Authorization"] = "Bearer " + jwt;
    }
    else {
        headers["Authorization"] = "Bearer anonymous.anonymous";
    }

    queryParams['token']=cache.get("request-token");
    var requestInit = {
        method: "POST",
        body: JSON.stringify(queryParams),
        headers: headers
    }
    // 定义处理器
    var handlers = {};
    // 请求服务器
    fetch(url, requestInit).then(function (response) {
        return response.json();
    }).then(function (json) {
        var ok = handlers["ok"];
        var fail = handlers["fail"];
        if (json["error"]) {
            if (fail instanceof Function) {
                fail(json);
            }
        }
        else {
            if (ok instanceof Function) {
                ok(json);
            }
        }
    }).catch(function (error) {
        var fail = handlers["fail"];
        if (fail instanceof Function) {
            fail(error);
        }
    });

    // 拟态返回器
    var result = {
        ok: fn => {
            handlers["ok"] = fn;
            return result;
        },
        fail: fn => {
            handlers["fail"] = fn;
            return result;
        }
    };
    return result;
}

exports.call = call;