var config = require("../../../shared/config");
var frame = require("ui/frame");
var api=require('../../../shared/api');
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var visibility  = require("ui/enums");
var content=[];
var totalPages = 1;
var articleContent = new observable_array_1.ObservableArray();

var ViewModel = (function () {
    function ViewModel(number, page, more) {
        this.initDataItems(number, page, more);
    }
    Object.defineProperty(ViewModel.prototype, "collectList", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    // >> listview-howto-item-selection-events
    //详情
    ViewModel.prototype.itemSelected = function (args) {
        try{
            var page = args.object.page;
            var item = this.collectList.getItem(args.itemIndex);
            var type = content[args.itemIndex].type;
            var articleOrVideoId = content[args.itemIndex].articleOrVideoId;
            if(type =="video"){
                var navigationEntry = {
                    moduleName: '/views/course/video-details/video-details',
                    context: {
                                "articleOrVideoId": articleOrVideoId,
                             },
                }
                frame.topmost().navigate(navigationEntry);
            }else if(type =="articel"){
                var navigationEntry = {
                    moduleName: '/views/course/details-article/details-article',
                    context: {
                                "articleOrVideoId": articleOrVideoId,
                             },
                }
                frame.topmost().navigate(navigationEntry);
            }
        }catch (e){
            
        }
    };
    
    // << listview-howto-item-selection-events
    //列表
    ViewModel.prototype.initDataItems = function (first, page, more) {
        if(more == true){
            //加载更多
            this._items = articleContent;
            first *= 10;
        }else{
            //加载首页
            this._items = new observable_array_1.ObservableArray();
        }

        var qureyParams={
            "name": "collectionController.collectVideoAndArticle",
            "args": [{"first":first,"rows":10},{}]
        };
        api.call(config.apiUrl,qureyParams).ok((data)=>{
            var str = JSON.stringify(data.result.content);
            var contentTmp = eval('(' + str + ')');
            if(contentTmp!=null){
                for (var i = 0; i < contentTmp.length; i++){
                    var strTags = '';
                    var tag = contentTmp[i].tag || [];
                    for(var j = 0;j<tag.length;j++){
                        strTags  = strTags + tag[j].name;
                    }
                    this._items.push(new DataItem(contentTmp[i].aPicture.url, contentTmp[i].title, contentTmp[i].describe,contentTmp[i].type,strTags));
                    content.push(contentTmp[i]);
                }
                articleContent = this._items;
            }
            totalPages = data.result.totalPages;
            if(page){
                page.getViewById("list-view").notifyPullToRefreshFinished();
                page.notifyLoadOnDemandFinished();
            }
        }).fail((err)=>{
            if(page){
                page.getViewById("list-view").notifyPullToRefreshFinished();
                page.notifyLoadOnDemandFinished();
            }
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
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

var DataItem = (function (_super) {
    __extends(DataItem, _super);
    function DataItem(src, collect_title, collect_content,type,tags) {
        var _this = _super.call(this) || this;
        _this.src = src;
        _this.collect_title = collect_title;
        _this.collect_content = collect_content;
        _this.type = type;
        _this.tags = tags;
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
    Object.defineProperty(DataItem.prototype, "collect_title", {
        get: function () {
            return this.get('_collect_title');
        },
        set: function (value) {
            this.set('_collect_title', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "collect_content", {
        get: function () {
            return this.get('_collect_content');
        },
        set: function (value) {
            this.set('_collect_content', value);
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
    return DataItem;
}(observable_1.Observable));
exports.DataItem = DataItem;
