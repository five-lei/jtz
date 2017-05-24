/**
 * Created by giscafer on 2017/4/13.
 */


'use strict';

var observable = require('data/observable');
var dialogs = require("ui/dialogs");
var api = require("../../../shared/api");
var config = require("../../../shared/config");
var dialogsUtil = require("../../../common/dialogsUtil");
var cache = require("nativescript-cache");


class ReceiveTaskModel extends observable.Observable {


    constructor() {
        super();
        this.data = null;
        this.UPLOAD_BTN_IMG = {url: 'res://tjtp2x'};
    }

    init(obj) {
        var viewModel = new observable.Observable(this.getData(obj));

        return viewModel;
    }

    replaceStrShow(obj) {
        return (obj === undefined || obj === "null" || obj === "Null" || obj === "NULL" || obj === "" || obj === null) ? "" : obj;
    }

    /**
     * 测试数据
     * @returns {*}
     */
    getData(obj) {
        if (obj === undefined) {
            return;
        }
       var data = {
            // "taskType":this.type,
            "taskId":obj.taskId,
            "waybillId": this.replaceStrShow(obj.waybillId),//运单号
            "installFee":obj.installFee || 0,//剩余时效
            "receivePersonName": obj.receivePersonName || [],//收货人
            "receivePersonPhone": this.replaceStrShow(obj.receivePersonPhone),//收货人电话
            "imageItems": [this.UPLOAD_BTN_IMG]
            ,
            "abnormal_description": "异常描述描述",
            "sign_up_person": cache.get('realName') || ''
        };
        return data
    }

    onPictureDelete() {
        /* this.getData().imageItems.slice(0, 1);
         console.log(this.getData().imageItems.length)*/
    }

    /**
     * 新任务签收
     * @param context
     * @param abnormalType 异常类型
     * @param exceptDes 描述信息
     * @param cb 回调
     */
    submitSign(context, abnormalType, exceptDes, cb) {
        if (context === undefined) {
            return;
        }
        console.log("-------abnormalType:" + abnormalType);
        var files=[];
        var imageItems=context.imageItems || [];
        imageItems.forEach(function(item){
           if(item.id){
               files.push(item.id);
           }
        });
        var qureyParams = {
            "name": "taskInstallController.sign",
            "args": [{
                "taskId": context.taskId,//任务ID
                "signer": context.sign_up_person,//签收人
                "signStatus": abnormalType?"normal":"notNormal",//签收类型：notNormal("异常签收")、normal("正常签收")
                "describe": this.replaceStrShow(exceptDes),//描述
                "files": files,   //签收图片，数组，里边存放图片id
            }]
        };
        api.call(config.apiUrl, qureyParams).ok((data) => {
            console.log("===success result：" + JSON.stringify(data));

            if (typeof cb === 'function') {
                cb(true);
            }
        }).fail((err) => {
            var errorMsg=err.error;
            if(!err.code){
                errorMsg="签收失败！"
            }
            cb(false,errorMsg);
            console.log(JSON.stringify(err));
        })
    }

    /**
     * 维修任务签收
     * AftermarketTaskController.repairEnd维修完成
     */
    maintenanceSign(context, abnormalType, repairedDescription, cb){
        if (context === undefined) {
            return;
        }
        var files=[];
        var imageItems=context.imageItems || [];
        imageItems.forEach(function(item){
            if(item.id){
                files.push(item.id);
            }
        });
        var queryParams = {
            "name": "aftermarketTaskController.repairEnd",
            "args": [{
                "taskId": context.taskId,//任务ID
                "appointmentTime": context.appointmentTime,//预约时间
                "reason": context.reason,//取消分配原因
                "userWorkerId": context.userWorkerId,//分配师傅id
                "distributionFee": context.distributionFee, //分配师傅费用
                "taskFeeType": context.taskFeeType, //费用类型
                "normalSign":abnormalType,//true正常签收，或者异常签收false
                "repairedDescription": repairedDescription, //维修完成描述
                "repairedImges": files.join(","),    //图片 多张图片以英文逗号隔开。
            }]
        };
        console.dump(queryParams)
        api.call(config.apiUrl, queryParams).ok((data) => {
            if (typeof cb === 'function') {
                cb(true);
            }
        }).fail((err) => {
            var errorMsg=err.error;
            if(!err.code){
                errorMsg="签收失败！"
            }
            cb(false,errorMsg);
            console.log(JSON.stringify(err));
        })
    }
}

module.exports = ReceiveTaskModel;

