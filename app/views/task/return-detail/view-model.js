/**
 * Created by giscafer on 2017/3/27.
 */
'use strict'
const Observable = require("data/observable").Observable;
var api = require("../../../shared/api");
var config = require("../../../shared/config");


class ViewModel {
    constructor() {
    }

    getTaskStatus(type) {
        var status = 1;
        switch (type) {
            case "return_waiting_list":
                status = 1;
                break;
            case "maintenance_waiting_list":
                status = 1;
                break;
            case "return_waiting_pickup":
                status = 2;
                break;
            case "maintenance_waiting_appointment":
                status = 2;
                break;
            case "return_waiting_sign_for":
                status = 3;
                break;
            case "maintenance_waiting_sign_for":
                status = 3;
                break;
            case "return_finish":
                status = 4;
                break;
            case "maintenance_finish":
                status = 4;
                break;
        }
        return status;
    }


    /**
     * 任务详情查询
     * @param type 类型
     */
    queryData(page, taskId, type) {
        var _this = this;

        if (type.indexOf('maintenance_') !== -1) {
            //维修详情参数
            var qureyParam1 = {
                "name": "aftermarketTaskController.getRepairTaskInfo",
                "args": [{"taskId": taskId}]
            }
            api.call(config.apiUrl, qureyParam1).ok((data) => {
                // console.log(JSON.stringify(data));
                var taskRecord = data.result || {};
                var task = _this.convertRepairFieldName(taskRecord, type, taskId);
                page.bindingContext = new Observable(task);

            }).fail((err) => {
                console.log("##############api.call error start#############");
            })
        } else {
            //返货详情参数
            var qureyParams = {
                "name": "aftermarketTaskController.getReturnTaskInfo",
                "args": [{"taskId": taskId}]
            };
            api.call(config.apiUrl, qureyParams).ok((data) => {

                console.log(JSON.stringify(data));

                var taskRecord = data.result || {};
                var task = _this.convertReturnFieldName(taskRecord, type, taskId);
                page.bindingContext = new Observable(task);
                console.log('-----------------')
            }).fail((err) => {
                console.log("##############api.call error start#############");
            })

        }

    }

    /**
     *转换绑定数据名称 (返货）
     */
    convertReturnFieldName(taskRecord, type, taskId) {
        var item = null;
        if (typeof taskRecord !== 'object') return item;

        item = {
            "id": taskId,
            "taskType": type,
            "waybillId": taskRecord['waybillId'] || "",//运单号
            "orderNumber": taskRecord['title'] || "",//任务号
            "status": this.getTaskStatus(type),
            "pickupPhone": taskRecord['picUpManMobile'] || '',
            "pickupNumber": taskRecord['pickUpCode'] || '',
            "price": taskRecord['returnMoney'] || '',
            "pickupAddress": taskRecord['picAddr'] || '',
            "consignee": taskRecord['consigneeName'] || '',
            "consigneePhone": taskRecord['consigneeMobile'] || '',
            "consigneeAddress": taskRecord['consigneeAddr'] || '',

            //商品信息
            "product": taskRecord['taskReturnDetails'] || '',

            /*返回货件数信息统计*/
            "product_package_num": taskRecord['totalPieces'] || 0,
            "product_total_volume": taskRecord['totalVolumes'] || 0,

            /*指定物流信息*/
            "appoint_logistics": taskRecord['logisticsRealName'] || '',
            "appoint_logistics_num": taskRecord['logisticsTel'] || '',

            //费用明细
            "return_fee": taskRecord['returnMoney'] || 0,
            "total_fee": taskRecord['returnMoney'] || 0,

            //节点信息
            "node_info": taskRecord['taskLogs'] || [],

            //异常信息
            "exception_info": taskRecord['abnormalInfos'] || [],

            /*物流信息*/
            "logistics_company": taskRecord['logisticsRealName'] || '',
            "logistics_number": taskRecord['logisticsBill'] || '',
            "logistics_tel": taskRecord['logisticsTel'] || '',
            "pay": taskRecord['arrivePayMoney'] || '',
            "sign_up_images": taskRecord['signImgPathApp'] || []

        };

        return item;
    }

    /**
     *转换绑定数据名称(维修）
     */
    convertRepairFieldName(taskRecord, type, taskId) {
        var item = null;
        if (typeof taskRecord !== 'object') return item;

        item = {
            "id": taskId,
            "taskType": type,
            "waybillId": taskRecord['waybillId'] || "",//运单号
            "orderNumber": taskRecord['title'] || "",//任务号
            "status": this.getTaskStatus(type),
            //配送信息
            "consignee": taskRecord['consigneeName'] || '',   //收货人
            "consigneePhone": taskRecord['consigneeMobile'] || '',  //收货人电话
            "consigneeAddress": taskRecord['consigneeAddr'] || '',  //收货人地址

            //任务信息 （商品信息，商品出现状况描述）
            "products": taskRecord['goodsNames'] || '',
            /*"handleMethod":taskRecord['remark']||"",    //app 维修的商品的处理方式*/
            "abnor_imgs": taskRecord['abnormalImgsApp'] || '',
            //备注
            "remark": taskRecord['remark'] || "",    //

            //费用明细
            "return_fee": taskRecord['masterFee'] || 0,   //维修费用
            "total_fee": taskRecord['masterFee'] || 0,    //总费用

            //节点信息
            "node_info": taskRecord['taskLogs'] || '',

            //异常信息
            "exception_info": taskRecord['abnormalInfos'] || '',

            //维修完成信息
            "sign_up_images": taskRecord['signImgsPathApp'] || '',//图片
            //维修完成文字描述
            "finish_remark": taskRecord['describe'] || ""


        };
        console.log('===================');
        console.log(JSON.stringify(item));
        console.log('===================');
        return item;
    }

    /**
     * 初始化数据
     */
    init(page, taskId, type) {
        /* var data = {
         "currentTaskList": [],
         "barTypes": this.getBarTypes()
         };*/
        this.queryData(page, taskId, type);
        // return new Observable(data);
    }


   /* init1() {
        var data = {
            "taskType": this.type,
            "orderNumber": "1ZT324835",
            "acceptTime": "9:08",
            "orderTime": "19:08",
            "installTime": "19:08",
            "status": this.getTaskStatus(this.type),
            "pickupPhone": "1357235142",
            "pickupNumber": "55667788",
            "price": "300.00",
            "pickupAddress": "广州市天河区陶庄路碧水街道",
            "consignee": "赵云",
            "consigneePhone": "1371533162",
            "consigneeAddress": "广州市天河区陶庄路碧水街道四急花城230室",
            //商品信息
            "product": [
                {
                    "name": "双人布艺沙发",//商品名称
                    "images": ["res://logo", "https://angular.cn/resources/images/home/joyful-development.png"],//商品图片
                    "package_num": "2",//包装件数
                    "install_package_num": "1",//安装件数
                    "volume": "3"//体积
                },
                {
                    "name": "双人布艺沙发",//商品名称
                    "images": ["res://logo", "https://angular.cn/resources/images/home/joyful-development.png"],//商品图片
                    "package_num": "2",//包装件数
                    "install_package_num": "1",//安装件数
                    "volume": "3"//体积
                }
            ],

            /!*返回货件数信息*!/
            "product_package_num": 2,
            "product_install_package_num": 2,
            "product_total_volume": 6,

            /!*指定物流信息*!/
            "appoint_logistics": "顺丰",
            "appoint_logistics_num": 555666,

            //费用明细
            "return_fee": "50.00",
            "total_fee": "150.00",
            //节点信息
            "node_info": [
                {
                    "label": "已提货",
                    "time": "2017-3-27 15:03:04",
                }, {
                    "label": "审核成功",
                    "time": "2017-3-27 15:03:04",
                }, {
                    "label": "受理成功",
                    "time": "2017-3-27 15:03:04",
                }, {
                    "label": "创建订单成功",
                    "time": "2017-3-27 15:03:04",
                }, {
                    "label": "创建订单成功1",
                    "time": "2017-3-27 15:03:04",
                }, {
                    "label": "创建订单成功2",
                    "time": "2017-3-27 15:03:04",
                }, {
                    "label": "创建订单成功3",
                    "time": "2017-3-27 15:03:04",
                }
            ],
            "exception_info": [
                {
                    "label": "问题反馈（55668855）",
                    "time": "2017-3-27 15:03:04",
                }, {
                    "label": "问题反馈（55668855）",
                    "time": "2017-3-27 15:03:04",
                }, {
                    "label": "问题反馈（55668855）",
                    "time": "2017-3-27 15:03:04",
                }, {
                    "label": "问题反馈（55668855）",
                    "time": "2017-3-27 15:03:04",
                }
            ],
            /!*物流信息*!/
            "logistics_company": "顺丰",
            "logistics_number": "265625526",
            "logistics_tel": "7819022",
            "pay": "50.25",
            "sign_up_images": [
                {
                    url1: "res://logo",
                    url2: "res://logo",
                    url3: "res://logo",
                    url4: "https://angular.cn/resources/images/home/joyful-development.png"
                },
                {url1: "res://logo", url2: "res://logo"}],
        };
        return new Observable(data);
    }*/
}

module.exports = ViewModel;
