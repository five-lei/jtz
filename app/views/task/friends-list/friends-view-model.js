var observable = require("data/observable");
var api=require("../../../shared/api");
var config=require("../../../shared/config");

//选中的好友
var selectedPerson=null;
var Session = (function (_super) {
    __extends(Session, _super);
    function Session(id,name, number, image, isFavourite, cssClass) {
        var _this = _super.call(this) || this;
        //好友ID
        _this.firendId = id;
        _this.name = name;
        _this.image = image;
        _this.number = number;
        _this.isFavourite = isFavourite;
        _this.cssClass = cssClass;
        _this.cssClass = "friend-favorite";
        return _this;
    }

    Session.prototype.toggleFavourite = function () {
        var _this = this;
        var favourite = this.get("isFavourite");
        this.set("isFavourite", !favourite);
        // this.set("cssClass", !favourite ? "friend-favorite-selected" : "friend-favorite-unselected");
     /*   setTimeout(function () {
            _this.set("cssClass", "friend-favorite");
        }, 600);*/

        //选中的好友
        if(this.get("isFavourite")){
            selectedPerson=this;
        }
    };
    return Session;
}(observable.Observable));
exports.Session = Session;

//导出选中的好友
function getSelectedPerson(){
    return selectedPerson;
}
exports.getSelectedPerson = getSelectedPerson;

/**
 *转给好友逻辑
 * @param taskId
 * @param cb {Function} 回调方法
 */
exports.gtFinishHandler=function(taskId,cb){

    var queryParams={
        "name": "taskInstallController.forwardFriend",
        "args": [{"taskId":taskId,"friendId":selectedPerson.firendId}]
    };
    console.dump(queryParams)
    api.call(config.apiUrl,queryParams).ok((data)=>{

        cb(true);
        //给好友成功
    }).fail((err)=>{
        //给好友失败
        if(err.code){
            cb(false,err.error);
        }else{
            cb(false);
        }
    });
}

//TODO 初始化
function init(){
    var data = {
        "friends": []
    };
    return new observable.Observable(data);
}
exports.init = init;

var allSessions=[];
var ListViewLayoutsModel = (function (_super) {
    __extends(ListViewLayoutsModel, _super);

    function ListViewLayoutsModel(page) {
        var _this = _super.call(this) || this;
        queryFriendsList(page);//查询朋友列表
        _this._friends = allSessions;
        _this._isLinearActive = true;
        return _this;
    }


    /**
     * 查询朋友列表
     */
    function queryFriendsList(page){

        var qureyParams={
            "name": "taskInstallController.queryFriend",
            "args": [{"first":0,"rows":10}]
        };
        api.call(config.apiUrl,qureyParams).ok((data)=>{
            // console.log(JSON.stringify(data));
            // 将数据给变量_friends，结构参考allSessions

            allSessions=[];
            var friendList=data.result.content || [];
            friendList.forEach(function(item){
                var task=new Session(item['id'], item['realName'], item['mobile'], "res://yilogo", false)|| [];
                if(task){
                    // allSessions.addItem(task);
                    allSessions.push(task);
                }
            });
            page.bindingContext.friends=allSessions;
            // this._friends=allSessions;
        }).fail((err)=>{
            console.log(JSON.stringify(err));
        })

    }

    // convertFieldList(data){
    //     var item=null;
    //     if(typeof taskRecord !=='object') return item;
    //
    //    return new Session("张三", '15110195478', "res://yilogo", true)
    // };



    Object.defineProperty(ListViewLayoutsModel.prototype, "friends", {
        get: function () {
            return this._friends;
        },
        enumerable: true,
        configurable: true
    });
    return ListViewLayoutsModel;
}(observable.Observable));
exports.ListViewLayoutsModel = ListViewLayoutsModel;
