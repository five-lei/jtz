/**
 * Created by Administrator on 2017/4/21.
 */
var config = require("../../../shared/config");
var observable = require("data/observable");
var observable_array_1 = require("data/observable-array");
var Observable = require("data/observable").Observable;
var builder = require("ui/builder");
var utils = require("utils/utils");
var api = require('../../../shared/api');
class SystemMessageViewModel extends observable.Observable {
    init() {
        var Data= {
            detailList: [
            ]};
        // this.sysMessageList (page);
        return new Observable(Data);
    }

    queryData(page,dateTime){
        if(!dateTime){
            dateTime = null;
        }
        var msgData={
            detailList: []
        };
            var qureyParams = {
            "name": "systemMessageController.sysMsgList",
            "args": [{"first":0,"rows":1000},{"beginDate":null,"endDate":null,"day":dateTime}]
        };

         try{
            api.call(config.apiUrl,qureyParams).ok((data) => {
            var sysMessageLists = data.result.content;

            for(var i = 0;i<sysMessageLists.length;i++){
                msgData.detailList.push({
                    id:"",
                    time:"",
                    orderTitle: "",
                    text:"",
                    onekey:"",
                    onevalue:"",
                    twokey:"",
                    twovalue:"",
                });
                console.dump(sysMessageLists[i]);
                msgData.detailList[i].id=sysMessageLists[i].sysMsgId;
                var json=JSON.parse(sysMessageLists[i].json);
                msgData.detailList[i].orderTitle=json.title;
                msgData.detailList[i].text=json.text;
                //分配任务时显示的内容
                if(json.msgType=="taskDistribution"){
                    for (var x = 0 ;x<json.content.length;x++){
                        if(json.content[x].key=="任务单号"){
                            msgData.detailList[i].onekey=json.content[x].key;
                            msgData.detailList[i].onevalue=json.content[x].value;
                        }
                        if(json.content[x].key=="分配时间"){
                            msgData.detailList[i].twokey=json.content[x].key;
                            msgData.detailList[i].twovalue=json.content[x].value;
                            msgData.detailList[i].time=json.content[x].value;
                        }

                    }
                }
            }
            page.bindingContext.detailList = msgData.detailList;
        }).fail((err) => {
            console.log("fail==============");
        })
         }catch (e){
                console.log(e);
         }

     }
}
exports.SystemMessageViewModel = SystemMessageViewModel;
