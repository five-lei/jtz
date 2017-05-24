/**
 * Created by Administrator on 2017/3/30.
 */
var socialShare = require("nativescript-social-share");
var config = require("../../../shared/config");
var frame = require("ui/frame");
var api=require('../../../shared/api');
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var visibility  = require("ui/enums");
var apiCollect=require('../../../view-models/api.collect');
var content=[];
var totalPages = 1;
var articleContent = new observable_array_1.ObservableArray();
/*文章教程*/
var DataItem = (function (_super) {
    __extends(DataItem, _super);
    function DataItem(src,src_share,text_share, detail_title, detail_content, collection,id) {
        var _this = _super.call(this) || this;
        _this.src = src;
        _this.id = id;
        _this.src_share = src_share;
        _this.text_share = text_share;
        _this.detail_title = detail_title;
        _this.detail_content = detail_content;
        _this.collection = collection;
        _this.cssClass = "friend-favorite";
        return _this;
    }
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
    //收藏
    DataItem.prototype.oncollection = function () {
        var _this = this;
        var collection = this.get("collection");
        var id = this.get("id");
        apiCollect.test(id);
        this.set("collection", !collection);
        this.set("cssClass", !collection ? "friend-favorite-selected" : "friend-favorite-unselected");
        setTimeout(function () {
            _this.set("cssClass", "friend-favorite");
        }, 600);
    };
    /*分享*/
    DataItem.prototype.onShare =function (){
        socialShare.shareText("I love NativeScript!");
    };
    return DataItem;
}(observable_1.Observable));
exports.DataItem = DataItem;

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

var articleListViewModel = (function (_super) {
    function articleListViewModel(first, more, page) {
        this.initDataItems(first, more, page);
    }
    Object.defineProperty(articleListViewModel.prototype, "detailList", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    //文章详情
    articleListViewModel.prototype.itemSelected = function (args) {
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
    /*网络请求数据*///查询文章
    articleListViewModel.prototype.initDataItems = function (first, more, page) {
        if(more == true){
            // if(first >= totalPages){
            //     alert("无更多教程");
            //     if(page){
            //         page.getViewById("list-view").notifyPullToRefreshFinished();
            //         page.notifyLoadOnDemandFinished();
            //     }
            //     return;
            // }
            //加载更多
            this._items = articleContent;
            first *= 10;
        }else{
            //加载首页
            this._items = new observable_array_1.ObservableArray();
            // content = [];
        }
        var qureyParams={
            "name": "articleController.articleFind",
            "args": [{"first":first,"rows":10},{}]
        };
        api.call(config.apiUrl,qureyParams).ok((data)=>{
            try{
                var str = JSON.stringify(data.result.content);
                var contentTmp = eval('(' + str + ')');
                if(contentTmp != null){
                    for (var i = 0; i < contentTmp.length; i++){
                        var coltitle = JSON.stringify(contentTmp[i].title);
                        this._items.push(new DataItem(contentTmp[i]['aPicture']['url'], "res://fx","分享", contentTmp[i].title, contentTmp[i].describe, contentTmp[i].collection,contentTmp[i].id));
                        content.push(contentTmp[i]);
                    }
                    articleContent = this._items;
                }
                totalPages = data.result.totalPages;
            }catch (e){

            }
            if(page){
                page.getViewById("list-view").notifyPullToRefreshFinished();
                page.notifyLoadOnDemandFinished();
            }
        }).fail((err)=>{
            console.log(err)
            if(page){
                page.getViewById("list-view").notifyPullToRefreshFinished();
                page.notifyLoadOnDemandFinished();
            }
        });
    };
    return articleListViewModel;
}());
exports.articleListViewModel = articleListViewModel;