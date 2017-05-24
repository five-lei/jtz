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
            "waiting_list": "res://xin2x",
            "waiting_sign_for": "res://qian2x",
            "waiting_pickup": "res://tihuo2x",
            "waiting_appointment": "res://yu2x",
            "had_sign_for": "res://yiancheng",
            "cancelled": "res://xin_qu"
        };
        var args = Array.prototype.slice.call(arguments);
        var type = args[0] ? args[0] : 'all';
        var imgObj = taskTypeImages;
        var taskList = [
            {
                "id": "11",
                "status": "waiting_list",
                "statusImage": imgObj["waiting_list"],
                "orderNumber": "1ZT324835",
                "price": "500.00",
                "company": "一智通供应链管理有限公司",
                "datetime": "2017/03/10 13:39",
                "address": "广州市白云区新市路口",
                "receivePersonName": "张三",
                "receivePersonPhone": "15626270808",
                "pickupAddress": "广州市白云区新市路口",//提货地址
                "pickupPhone": "15126270897",
                "pickupNumber": "775566",//提货码
                "packCount": "2",
                "packVolume": "3",
                "floor": "6 无电梯",
                "appointmentTime": '54',
                "dealTime": "10"
            }, {
                "id": "22",
                "status": "waiting_list",
                "statusImage": imgObj["waiting_list"],
                "orderNumber": "1ZT324835",
                "price": "500.00",
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
                "id": "33",
                "status": "waiting_pickup",
                "statusImage": imgObj["waiting_pickup"],
                "orderNumber": "1ZT324835",
                "price": "400.00",
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
                "id": "44",
                "status": "waiting_sign_for",
                "statusImage": imgObj["waiting_sign_for"],
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
                "id": "55",
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
                "id": "66",
                "status": "had_sign_for",
                "statusImage": imgObj["had_sign_for"],
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
                "id": "77",
                "status": "cancelled",
                "statusImage": imgObj["cancelled"],
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
            }
        ];
        if (type === 'all') {
            return taskList;
        }
        var result = taskList.filter((item) => {
            return item.status === type;
        })
        return result;

    }

    init() {
        var data = {
            "allTasks": this.getTaskList(),
            "waiting_list": this.getTaskList("waiting_list"),
            "waiting_sign_for": this.getTaskList("waiting_sign_for"),
            "waiting_pickup": this.getTaskList("waiting_pickup"),
            "waiting_appointment": this.getTaskList("waiting_appointment"),
            "had_sign_for": this.getTaskList("had_sign_for"),
            "cancelled": this.getTaskList("cancelled"),
        };
        return new Observable(data);
    }
}

module.exports = TaskDataModel;
