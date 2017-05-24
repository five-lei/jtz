/**
 * 公共缓存接口
 * Created by giscafer on 2017/3/31.
 */
var cache = require("nativescript-cache");
// 前端假token，防止多次提及表单

var createToken=function(){
    cache.set("request-token","rt_"+new Date().getTime());
};

module.exports=createToken