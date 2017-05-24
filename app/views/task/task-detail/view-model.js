/**
 * Created by giscafer on 2017/3/27.
 */
'use strict'
const Observable = require("data/observable").Observable;
var api=require("../../../shared/api");
var config=require("../../../shared/config");
var dialogsUtil = require("../../../common/dialogsUtil");

class ViewModel {
    constructor() {
    }
    getStatus(type){
        var status=1;
        switch (type){
            case "waiting_list":
                status=1;
                break;
            case "waiting_appointment":
                status=2;
                break;
            case "waiting_pickup":
                status=3;
                break;
            case "waiting_sign_for":
                status=4;
                break;
            case "had_sign_for":
                status=5;
                break;
            case "cancelled":
                status=0;
                break;
        }
        return status;
    }

    queryData(page,taskId,type){
        var qureyParams={
            "name": "taskInstallController.findAppTaskDetail",
            "args": [{"taskId":taskId}]
        };
        api.call(config.apiUrl,qureyParams).ok((data)=>{
            console.log(JSON.stringify(data));
            //成功
            var taskDetail=data.result || [];

            var item=this.convertFieldName(taskId,taskDetail,type);
            page.bindingContext=new Observable(item);
        }).fail((err)=>{
            dialogsUtil.alert('查询任务详情失败!');
            console.log(err);
            console.log("查询任务详情失败");
        });
    }

    /**
     *转换绑定数据名称
     */
    convertFieldName(taskId,taskRecord,type){
        var item=null;
        if(typeof taskRecord !=='object') return item;
        type=this.getTaskStatus(taskRecord['taskStatus']);
        item= {
            "id":taskId,
            "taskType": type,
            "orderNumber": taskRecord['waybillId'],
            "acceptTime": taskRecord['acceptRate'],
            "orderTime": taskRecord['appointmentRate'],
            "installTime": taskRecord['installationRate'],
            "status":this.getStatus(type),
            "pickupPhone": taskRecord['tel']||'',
            "pickupNumber": taskRecord['code']||0,
            // "price": "价格",
            "pickupAddress":taskRecord['addr']||'',
            "consignee": taskRecord['consigneeName']||'',
            "consigneePhone": taskRecord['consigneeTel']||'',
            "consigneeAddress": taskRecord['receiveAddress']||'',
            "tmail": taskRecord['tmail'],
            "orderSourceCode": taskRecord['orderSourceCode'], //天猫单号
            "serviceTypeTmall": taskRecord['serviceTypeTmall'], //天猫服务类型
            "sourceType": taskRecord['sourceType'], //订单类型
            //商品信息
            "product": taskRecord['goods']||[],
            //     [
            //     {
            //         "name": "双人布艺沙发",//商品名称
            //         "images": ["res://logo", "https://angular.cn/resources/images/home/joyful-development.png"],//商品图片
            //         "package_num": "2",//包装件数
            //         "install_package_num": "1",//安装件数
            //         "volume": "3"//体积
            //     },
            //     {
            //         "name": "双人布艺沙发",//商品名称
            //         "images": ["res://logo", "https://angular.cn/resources/images/home/joyful-development.png"],//商品图片
            //         "package_num": "2",//包装件数
            //         "install_package_num": "1",//安装件数
            //         "volume": "3"//体积
            //     }
            // ],
            "product_package_num": taskRecord['packingTotalNo']||0,
            "product_install_package_num":taskRecord['installTotalNo']||0,
            "product_total_volume":taskRecord['volumes']||0,
            //费用明细
            "install_fee": taskRecord['installFee']||0,
            "branch_fee": taskRecord['branchFee']||"0",
            "exception_fee":taskRecord['abnormalFee']||"0",
            "total_fee":taskRecord['totalFee']||"0",
            //节点信息
            "node_info": taskRecord['nodeInfos']||[],
            //     [
            //     {
            //         "label": "已提货",
            //         "time": "2017-3-27 15:03:04",
            //     }, {
            //         "label": "审核成功",
            //         "time": "2017-3-27 15:03:04",
            //     }, {
            //         "label": "受理成功",
            //         "time": "2017-3-27 15:03:04",
            //     }, {
            //         "label": "创建订单成功",
            //         "time": "2017-3-27 15:03:04",
            //     }, {
            //         "label": "创建订单成功1",
            //         "time": "2017-3-27 15:03:04",
            //     }, {
            //         "label": "创建订单成功2",
            //         "time": "2017-3-27 15:03:04",
            //     }, {
            //         "label": "创建订单成功3",
            //         "time": "2017-3-27 15:03:04",
            //     }
            // ],
            "exception_info": taskRecord['abnormalInfos']||[],
            //     [
            //     {
            //         "label": "问题反馈（55668855）",
            //         "time": "2017-3-27 15:03:04",
            //     }, {
            //         "label": "问题反馈（55668855）",
            //         "time": "2017-3-27 15:03:04",
            //     }, {
            //         "label": "问题反馈（55668855）",
            //         "time": "2017-3-27 15:03:04",
            //     }, {
            //         "label": "问题反馈（55668855）",
            //         "time": "2017-3-27 15:03:04",
            //     }
            // ],
            "sign_up_images":taskRecord['sign_up_images']||[],
                // [{url: "res://logo"},{url: "res://logo"},{url: "res://logo"},{url: "res://logo"},{url: "res://logo"},{url: "https://angular.cn/resources/images/home/joyful-development.png"}],
            "sign_up_mark": taskRecord['sign_up_mark']||'',
            "sign_up_person": taskRecord['sign_up_person']||'',
            "cancelReason": taskRecord['cancelReason']||''
        };

        return item;
    }
    /**
     * 任务状态
     * @param type
     * @returns {*}
     */
    getTaskStatus(type) {
        var obj = {
            distributionWaitAccept: "waiting_list",
            "已分配": "waiting_list",
            accepted:"waiting_appointment",
            "已受理":"waiting_appointment",
            waiting_pickup: "waiting_pickup",
            "待提货": "waiting_pickup",
            doSign: "had_sign_for",
            "已签收": "had_sign_for",
            waitPickUp: "waiting_sign_for",
            "已提货": "waiting_sign_for",
            invalid: "cancelled"
        }
        return obj[type];
    }
}

module.exports = ViewModel;
// var taskDetail=null;
// exports.findAppTaskDetail=function(taskId,cb){
//     var qureyParams={
//         "name": "taskInstallController.findAppTaskDetail",
//         "args": [{"taskId":taskId}]
//     };
//     api.call(config.apiUrl,qureyParams).ok((data)=>{
//         //成功
//         var taskDetail=data.result.content || [];
//         cb(true);
//
//     }).fail((err)=>{
//         //失败
//         cb(false);
//     });
// };