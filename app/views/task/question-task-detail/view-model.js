/**
 * Created by giscafer on 2017/3/29.
 */

'use strict'
const Observable = require("data/observable").Observable;
var api = require('../../../shared/api');
var config = require("../../../shared/config");

class ViewModel {
    constructor(type) {
        this.type = type;
    }

    init(page,matterRecordId) {
        var data = {
            "orderNumber": "1ZT324835",//运单号
            "datetime": "2017/3/17 14:28:37",
            "consignee": "赵云",//收货人
            "consigneePhone": "1371533162",
            "questionStatus": "待处理",
            "questionType": "损货 - 物流破损",
            "exceptionNumber": "55668877",//异常单号
            "description": "WebAssembly 是除了 JavaScript 以外，另一种可以在网页中运行的编程语言。过去如果你想在浏览器中运行代码来对网页中各种元素进行控制，只有 JavaScript 这一种选择",
            "images": [{
                "url1": 'res://logo',"url2": 'res://logo',"url3": 'res://logo',"url4": 'res://logo',
            }, {
                "url1": 'res://logo'
            }],
            "remark": "这里是备注信息惺惺惜惺惺",
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
            ]
        };
        this.getMatterInfo(page,matterRecordId);
        // return new Observable(matterRecord);
    }
    getMatterInfo(page,matterRecordId){
        var qureyParams = {
            "name": "matterRecordController.matterRecordInfoFind",
            "args": [{"id":matterRecordId}]
        };
        api.call(config.apiUrl,qureyParams).ok((data) => {
            try{
                var matterRecord=data.result;
                console.dump(matterRecord);
                page.bindingContext=matterRecord;
            }catch(e){

            }
        }).fail((err) => {
            console.log("fail======question-detail========");
        })
    }

}

module.exports = ViewModel;