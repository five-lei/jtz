var config = require("../../../shared/config");
var frame = require("ui/frame");
var api=require('../../../shared/api');
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var visibility  = require("ui/enums");
var content=null;

var ViewModel = (function () {
    function ViewModel(type,nameOrMobile_text) {
        this.initDataItems(type,nameOrMobile_text);
    }
    Object.defineProperty(ViewModel.prototype, "messageList", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    // >> listview-howto-item-selection-events

    ViewModel.prototype.itemSelected = function (args) {
        var page = args.object;
        var item = this.messageList.getItem(args.itemIndex);
        console.log(item.name);
        console.log(content[args.itemIndex].groupId);
        var navigationEntry = {
                moduleName: '/views/message/chat-view/chat-view',
                context: {
                            "name": item.name,
                            "groupId":content[args.itemIndex].groupId,
                         },
            }
        frame.topmost().navigate(navigationEntry);
    };
    
    // << listview-howto-item-selection-events
    ViewModel.prototype.initDataItems = function (type,nameOrMobile_text) {
        try {
            this._items = new observable_array_1.ObservableArray();
            console.log(type);
            console.log(nameOrMobile_text);
            if(type=="task"){
            //任务消息列表
                var qureyParams={
                "name": "IMAppController.appTaskMessageList",
                "args": [{"first":0,"rows":10},{"keyword":nameOrMobile_text,"day":null}]
            };
                api.call(config.apiUrl,qureyParams).ok((data)=>{
                console.log("##############api.call success start#############");
                console.log(JSON.stringify(data));
                console.log("##############api.call  success  end#############");
                var str = JSON.stringify(data.result.content);
                content = eval('(' + str + ')');
                console.log(JSON.stringify(data.result.content[0]));
            if(content!=null){
                console.log(content.length);
                for (var i = 0; i < content.length; i++){
                    console.log(JSON.stringify(content[i]));
                    var image = "";
                    var groupId = content[i].groupId;
                    var type = content[i].taskType;
                    var title = content[i].groupTitle +"("+ content[i].consignee+")";
                    var date = content[i].scopeCreateDate;
                    var num =content[i].num;
                    var con = "";
                    if(content[i].content){
                        con = content[i].content;
                    }
                    console.log(groupId);
                    this._items.push(new DataItem(image,type,title,date,con,num));
                }
            }
                }).fail((err)=>{
                console.log("##############api.call error start#############");
                console.log(err);
                console.log("##############api.call  error  end#############");
            });
            }else if(type=="kefu"){
            //客服消息列表
                var qureyParams={
                    "name": "IMAppController.appServiceMessageList",
                    "args": [{"first":0,"rows":10},{"keyword":nameOrMobile_text,"day":null}]
                };
                api.call(config.apiUrl,qureyParams).ok((data)=>{
                    console.log("##############api.call success start#############");
                    console.log(JSON.stringify(data));
                    console.log("##############api.call  success  end#############");
                    var str = JSON.stringify(data.result.content);
                    content = eval('(' + str + ')');
                    console.log(JSON.stringify(data.result.content[0]));
                    if(content!=null){
                        console.log(content.length);
                        for (var i = 0; i < content.length; i++){
                            console.log(JSON.stringify(content[i]));
                            var image = content[i].portrait;
                            var groupId = content[i].groupId;
                            var type = "";
                            var title = content[i].mobile +"("+ content[i].nickName+")";
                            var date = "";
                            var num =content[i].num;
                            var con = "";
                            if(content[i].content){
                                con = content[i].content;
                            }
                            console.log(groupId);
                            this._items.push(new DataItem(image,type,title,date,con,num));
                        }
                    }
                }).fail((err)=>{
                    console.log("##############api.call error start#############");
                    console.log(err);
                    console.log("##############api.call  error  end#############");
                });
            }
        }catch(e){

        }
    };
    return ViewModel;
}());
exports.ViewModel = ViewModel;

 function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

var DataItem = (function (_super) {
    __extends(DataItem, _super);
    function DataItem(image,type, name, time,content, num) {
        var _this = _super.call(this) || this;
        _this.image = image;
        _this.type = type;
        _this.name = name;
        _this.time = time;
        _this.content = content;
        _this.num = num;
        return _this;
    }
    Object.defineProperty(DataItem.prototype, "image", {
        get: function () {
            return this.get('_image');
        },
        set: function (value) {
            this.set('_image', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "type", {
        get: function () {
            return this.get('_type');
        },
        set: function (value) {
            this.set('_type', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "name", {
        get: function () {
            return this.get('_name');
        },
        set: function (value) {
            this.set('_name', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "time", {
        get: function () {
            return this.get('_time');
        },
        set: function (value) {
            this.set('_time', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "content", {
        get: function () {
            return this.get('_content');
        },
        set: function (value) {
            this.set('_content', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "num", {
        get: function () {
            return this.get('_num');
        },
        set: function (value) {
            this.set('_num', value);
        },
        enumerable: true,
        configurable: true
    });
    return DataItem;
}(observable_1.Observable));
exports.DataItem = DataItem;
