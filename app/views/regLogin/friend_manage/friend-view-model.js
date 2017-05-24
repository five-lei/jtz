/**
 * Created by admin on 2017/4/27.
 */
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var config = require("../../../shared/config");
var api=require('../../../shared/api');

class FriendViewModel {
    constructor() {
    }


    //查询好友
    getFriendList(page,listView) {
        console.log('getFriendList')
        var qureyParams = {
            "name": "userWorkerController.userWorkerSearch",
            "args": [{"first": 0, "rows": 1000}, {"myFriend": true}]
        };
        api.call(config.apiUrl, qureyParams).ok((data) => {
            var result = data.result || {};
            var content = result.content || [];

            page.bindingContext.groceryList=content;
           if(listView){
               listView.notifyPullToRefreshFinished();
           }
        }).fail((err) => {
            if(listView){
                listView.notifyPullToRefreshFinished();
            }
        })
    }
}

module.exports=FriendViewModel;