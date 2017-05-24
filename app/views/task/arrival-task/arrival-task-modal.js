'use strict'

var Observable = require("data/observable").Observable;
var builder = require("ui/builder");
var utils = require("utils/utils");


class TaskDataModel {
    constructor() {
    }

    /**
     *
     * @param type 类型
     * @returns {*}
     */
    getTaskList() {
        var taskTypeImages = {
            "waiting_appointment": "res://xin2x",
        };
        var args = Array.prototype.slice.call(arguments);
        var type = args[0] ? args[0] : 'all';
        var imgObj = taskTypeImages;
        var taskList = [
            {
                "status": "waiting_appointment",
                "statusImage": imgObj["waiting_appointment"],
                "orderNumber": "1ZT324835",
                "price": "300.00",
                "company": "一智通供应链管理有限公司",
                "datetime": "2017/03/10 13:39",
                "address": "广州市白云区新市路口",
                "receivePersonName": "胡歌",
                "receivePersonPhone": "15626270808",
                "pickupAddress": "广州市白云区新市路口",//提货地址
                "pickupPhone": "15626270808",
                "pickupNumber": "775566",//提货码
                "packCount": "2",
                "packVolume": "3",
                "floor": "6 无电梯",
                "appointmentTime": '54',
                "dealTime": "10"
            },
            {
                "status": "waiting_appointment",
                "statusImage": imgObj["waiting_appointment"],
                "orderNumber": "1ZT324835",
                "price": "300.00",
                "company": "一智通供应链管理有限公司",
                "datetime": "2017/03/10 13:39",
                "address": "广州市白云区新市路口",
                "receivePersonName": "胡歌",
                "receivePersonPhone": "15626270808",
                "pickupAddress": "广州市白云区新市路口",//提货地址
                "pickupPhone": "15626270808",
                "pickupNumber": "775566",//提货码
                "packCount": "2",
                "packVolume": "3",
                "floor": "6 无电梯",
                "appointmentTime": '54',
                "dealTime": "10"
            },
            {
                "status": "waiting_appointment",
                "statusImage": imgObj["waiting_appointment"],
                "orderNumber": "1ZT324835",
                "price": "300.00",
                "company": "一智通供应链管理有限公司",
                "datetime": "2017/03/10 13:39",
                "address": "广州市白云区新市路口",
                "receivePersonName": "胡歌",
                "receivePersonPhone": "15626270808",
                "pickupAddress": "广州市白云区新市路口",//提货地址
                "pickupPhone": "15626270808",
                "pickupNumber": "775566",//提货码
                "packCount": "2",
                "packVolume": "3",
                "floor": "6 无电梯",
                "appointmentTime": '54',
                "dealTime": "10"
            },
        ];
        var result = taskList.filter((item) => {
            return item.status === type;
        })
        return result;
    }

    init() {
        var data = {
            "waiting_appointment": this.getTaskList("waiting_appointment"),
        };
        return new Observable(data);
    }
}

module.exports = TaskDataModel;
