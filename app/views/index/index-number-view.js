/**
 * Created by Administrator on 2017/4/27.
 */
var observable_1 = require("data/observable");
var config = require('../../shared/config');
var api=require('../../shared/api');
var cache = require("nativescript-cache");


var content = null;
var waitJieDan;//待接单
var finish;//已完成
var chaoshi;//超时单
var fanhuo;//返货
var weixiu;//维修
var wenti;//问题
var waitQianShou;//待签收
var waitYuYue;//待预约

var ViewModel = (function (page) {
    function ViewModel(page) {
        this.initDataItems(page);
    }


    ViewModel.prototype.initDataItems = function (page) {
        var checkSourse = new observable_1.Observable();
        // 顶部余额的数据请求
        var qureyParams = {
            "name": "commonWalletController.currentUserMoneyCount",
            "args": []
        };
        api.call(config.apiUrl, qureyParams).ok((data) => {
            content = data.result.content;
            console.log("*****************");
            console.log(JSON.stringify(data.result));
            console.log("*****************");
            var dataCheck = data.result;

            var realName = dataCheck.realName || "";
            //缓存姓名
            cache.set('realName',realName);

            var sumMoney = dataCheck.sumMoney || 0;
            var completeTask = dataCheck.completeTask || 0;
            var dayIncome = dataCheck.dayIncome || 0;

            checkSourse.realName = realName;
            checkSourse.sumMoney = sumMoney;
            checkSourse.completeTask = completeTask;
            checkSourse.dayIncome = dayIncome;

            page.bindingContext = checkSourse;
        }).fail((err) =>{
            console.log(err);
        });


        // 九宫格里的数据请求
        var task_list = page.getViewById("task_list");
        var task_list_sourse = new observable_1.Observable();
        var qureyParams={
                "name": "taskStatusController.findTaskStatusCollects",
                //"args": [{"first":0,"rows":2},{}]
                "args": []
            };
            api.call(config.apiUrl,qureyParams).ok((data)=>{
                try{
                    // console.log("##############api.call success start#############");
                    // console.log(JSON.stringify(data));
                    // console.log("##############api.call  success  end#############");
                    waitJieDan = data.result[0] &&  data.result[0].statusCount || 0;
                    waitYuYue = data.result[1] && data.result[1].statusCount || 0;
                    waitQianShou = data.result[2] && data.result[2].statusCount || 0;
                    wenti= data.result[3] && data.result[3].statusCount || 0;
                    chaoshi = data.result[4] && data.result[4].statusCount || 0;
                    fanhuo = data.result[5] && data.result[5].statusCount || 0;
                    weixiu = data.result[6] && data.result[6].statusCount || 0;
                    finish= data.result[7] && data.result[7].statusCount || 0;

                    task_list_sourse.waitJieDan = waitJieDan;
                    task_list_sourse.finish = finish;
                    task_list_sourse.waitYuYue = waitYuYue;
                    task_list_sourse.waitQianShou = waitQianShou;
                    task_list_sourse.wenti = wenti;
                    task_list_sourse.chaoshi = chaoshi;
                    task_list_sourse.fanhuo = fanhuo;
                    task_list_sourse.weixiu = weixiu;
                    console.dump(task_list_sourse);
                    task_list.bindingContext = task_list_sourse;

                }catch(e){

                }

            }).fail((err)=>{
                console.log(err)
            })
    };
    return ViewModel;
}());
exports.ViewModel = ViewModel;


