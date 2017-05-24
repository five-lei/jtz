var config = require("../shared/config");
var frame = require("ui/frame");
var api=require('../shared/api');
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var visibility  = require("ui/enums");
var apiCollect=require('../view-models/api.collect');
var content = [];

var ViewModel = (function () {
    function ViewModel(id) {
        this.initDataItems(id);
    }
    Object.defineProperty(ViewModel.prototype, "detailList", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    // >> listview-howto-item-selection-events
    ViewModel.prototype.itemSelected = function (args) {
        var page = args.object.page;
        var item = this.detailList.getItem(args.itemIndex);
        var articleOrVideoId = content[args.itemIndex].id;
        var navigationEntry = {
            moduleName: '/views/course/details-article/details-article',
            context: {
                        "articleOrVideoId": articleOrVideoId, 
                     },
        }
        frame.topmost().navigate(navigationEntry);

    };
    
    // << listview-howto-item-selection-events
    ViewModel.prototype.initDataItems = function (id) {
        this._items = new observable_array_1.ObservableArray();
        var qureyParams={
            "name": "articleController.articleFind",
            "args": [{"first":0,"rows":10},{}]
        };
        api.call(config.apiUrl,qureyParams).ok((data)=>{
            var str = JSON.stringify(data.result.content);
            var contentTmp = eval('(' + str + ')');
            content = [];
            if(contentTmp!=null){
                for (var i = 0; i < contentTmp.length; i++){
                    if(this._items.length < 2 && contentTmp[i]['id'] != id){
                        var coltitle = JSON.stringify(contentTmp[i].title);
                        this._items.push(new DataItem(contentTmp[i]['aPicture']['url'], "res://fx","分享", contentTmp[i].title, contentTmp[i].describe, contentTmp[i].collection, contentTmp[i].id));
                        content.push(contentTmp[i]);
                    }
                }
            }
            
        }).fail((err)=>{
            if(err.error){
                alert(err.error);
            }else{
                alert("请联系管理员");
            }
        })
    };
    return ViewModel;
}());
exports.ViewModel = ViewModel;

 function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

var DataItem = (function (_super) {
    __extends(DataItem, _super);
    function DataItem(src,src_share,text_share, detail_title, detail_content, collection, id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.src = src;
        _this.src_share = src_share;
        _this.text_share = text_share;
        _this.detail_title = detail_title;
        _this.detail_content = detail_content;
        _this.collection = collection;
        return _this;
    }
    Object.defineProperty(DataItem.prototype, "id", {
        get: function () {
            return this.get('_id');
        },
        set: function (value) {
            this.set('_id', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "src", {
        get: function () {
            return this.get('_src');
        },
        set: function (value) {
            this.set('_src', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "src_share", {
        get: function () {
            return this.get('_src_share');
        },
        set: function (value) {
            this.set('_src_share', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "text_share", {
        get: function () {
            return this.get('_text_share');
        },
        set: function (value) {
            this.set('_text_share', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "detail_title", {
        get: function () {
            return this.get('_detail_title');
        },
        set: function (value) {
            this.set('_detail_title', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "detail_content", { 
        get: function () {
            return this.get('_detail_content');
        },
        set: function (value) {
            this.set('_detail_content', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "collection", {
        get: function () {
            return this.get('_collection');
        },
        set: function (value) {
            this.set('_collection', value);
        },
        enumerable: true,
        configurable: true
    });

    //收藏
    DataItem.prototype.oncollection = function () {
        var _this = this;
        var collection = this.get("collection");
        var id = this.get("id");
        this.set("collection", !collection);
        this.set("cssClass", !collection ? "friend-favorite-selected" : "friend-favorite-unselected");
        apiCollect.test(id);
        // setTimeout(function () {
        //     _this.set("cssClass", "friend-favorite");
        // }, 600);
    };
    return DataItem;
}(observable_1.Observable));
exports.DataItem = DataItem;
