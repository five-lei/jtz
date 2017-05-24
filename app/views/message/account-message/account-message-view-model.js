/**
 * Created by Administrator on 2017/4/21.
 */

var Observable = require("data/observable").Observable;
var builder = require("ui/builder");
var utils = require("utils/utils");


class SystemMessageViewModel {
    init() {
        var data = {
            "detailList": [
                {   "dataType":"签收时间",
                    "order_number": "555666",
                    "money":"100",
                    "account_type":"任务签收",
                    "feedback_type":"任务签收",
                    "feedback_type_number":"55554456445654",
                    "dataTime":"2016-05-05 11:20",
                    "time":"2017/05/05 11:22:23",
                },
                {   "dataType":"申请时间",
                    "order_number": "666777",
                    "money":"200",
                    "account_type":"余额提现申请",
                    "feedback_type":"转入账户",
                    "feedback_type_number":"948526948@qq.com",
                    "dataTime":"2017/06/05 11:22:23",
                    "time":"2017/06/05 11:22:23",
                },
                {
                    "dataType":"增加时间",
                    "order_number": "777888",
                    "money":"300",
                    "account_type":"运单异常增加费用",
                    "feedback_type":"任务签收",
                    "feedback_type_number":"33333333333333",
                    "dataTime":"2016-07-05 11:20",
                    "time":"2017/07/05 11:22:23",

                },
                {
                    "dataType":"扣款时间",
                    "order_number": "777888",
                    "money":"300",
                    "account_type":"运单异常扣款费用",
                    "feedback_type":"任务签收",
                    "feedback_type_number":"33333333333333",
                    "dataTime":"2016-07-05 11:20",
                    "time":"2017/07/05 11:22:23",

                }
            ]
        };
        return new Observable(data);
    }
}

module.exports = SystemMessageViewModel;
