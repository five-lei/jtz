/**
 * Created by Administrator on 2017/5/18.
 */
var config = require("../../../shared/config");
var observable = require("data/observable");
var observable_array_1 = require("data/observable-array");
var Observable = require("data/observable").Observable;
var builder = require("ui/builder");
var utils = require("utils/utils");
var api = require('../../../shared/api');
class WaterDetailViewModel extends observable.Observable {
    init() {
        var Data = {
            detailList: [
                {
                    "key": "提现账户",
                    "value":"支付宝提现"
                }
            ]
        };
        // this.sysMessageList (page);
        return new Observable(Data);
    }

    queryData(page,sysMsgId) {
        var detailList = new observable_array_1.ObservableArray();
        var qureyParams = {
            "name": "systemMessageController.sysMsgDetails",
            "args": [{"sysMsgId":sysMsgId}]
        };
        try {
            api.call(config.apiUrl,qureyParams)
                .ok((data) => {
                console.log("==============");
                console.dump(data);
                console.log("==============");
                var details = data.result;
                var json = JSON.parse(details.json);
                for (var i = 0; i < json.content.length; i++) {
                    detailList.push({
                        key: json.content[i].key,
                        value: json.content[i].value,
                    });
                }
                page.bindingContext.detailList = detailList;
                console.log("`~~~~~~~~~~~~~~~~~~");
                console.dump(detailList);
                console.log("`~~~~~~~~~~~~~~~~~~");
            }).fail((err) => {
                console.log("fail==============");
            })
        } catch (e) {
            console.log(e);
        }

    }
}
exports.WaterDetailViewModel = WaterDetailViewModel;