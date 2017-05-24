
'use strict';

var observable = require('data/observable');
var dialogs = require("ui/dialogs");
var api = require("../../../shared/api");
var config = require("../../../shared/config");

class ReceiveTaskModel extends observable.Observable {


    constructor() {
        super();
        this.data = null;
        this.UPLOAD_BTN_IMG = {url: 'res://tjtp2x'};
    }

    init(obj) {
        var viewModel = new observable.Observable({
            "taskId": obj.taskId,//任务ID
            "logisticsName":'',//物流公司名称
            "logisticsBill": '',  //物流单号
            "tel":'',    //物流公司电话
            "arrivePayMoney":'',  //到付金额
            "imageItems": [this.UPLOAD_BTN_IMG],   //签收图片，数组，里边存放图片id
        });

        return viewModel;
    }

    replaceStrShow(obj) {
        return (obj === undefined || obj === "null" || obj === "Null" || obj === "NULL" || obj === "" || obj === null) ? "" : obj;
    }

    /**
     * 提货完成（签收）
     * @param context
     * @param cb
     */
    picUpGoodsEnd(context, cb) {
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
        var qureyParams = {
            "name": "aftermarketTaskController.picUpGoodsEnd",
            "args": [{
                "taskId": context.taskId,//任务ID
                "logisticsName": context.logisticsName,//物流公司名称
                "logisticsBill":  context.logisticsBill,  //物流单号
                "tel":  context.tel,    //物流公司电话
                "arrivePayMoney":   context.arrivePayMoney,  //到付金额
                "picUpImgs": files.join(","),   //签收图片，逗号隔开字符串，里边存放图片id
            }]
        };
        console.dump(qureyParams)
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
            console.log("##############api.call error start#############");
            console.log(JSON.stringify(err));
        })
    }

    /**
     * AftermarketTaskController.repairEnd维修完成
     * AftermarketTaskController.picUpGoodsEnd提货完成
     */
}

module.exports = ReceiveTaskModel;

