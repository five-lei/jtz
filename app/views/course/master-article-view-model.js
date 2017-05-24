/**
 * Created by Administrator on 2017/4/15.
 */
var config = require("../../shared/config");
var frame = require("ui/frame");
var api=require('../../shared/api');
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var visibility  = require("ui/enums");
var socialShare = require("nativescript-social-share");
var apiCollect=require('../../view-models/api.collect');
var content=[];
//文章列表
var ViewModel = (function () {
    function ViewModel() {
        this.initDataItems();
    }
    //热推文章
    Object.defineProperty(ViewModel.prototype, "detailList", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });


    // << listview-howto-item-selection-events
    //热推文章查询
    ViewModel.prototype.initDataItems = function () {
        this._items = new observable_array_1.ObservableArray();
        var qureyParams={
            "name": "articleController.articleFind",
            "args": [{"first":0,"rows":2},{"tagName":"热推文章"}]
        };
        api.call(config.apiUrl,qureyParams).ok((data)=>{
            var str = JSON.stringify(data.result.content);
            content = eval('(' + str + ')');
            console.dump(content);
            if(content!=null){
                for (var i = 0; i < content.length; i++){
                    var coltitle = JSON.stringify(content[i].title);
                    this._items.push(new DataItem(content[i]['aPicture']['url'], "res://fx","分享", content[i].title, content[i].describe, content[i].collection,content[i].id));
                }
            }
        }).fail((err)=>{
            if(err.error){
                alert(err.error);
                console.dump(err)
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
DataItem.prototype.onShare =function () {
    socialShare.shareText("I love NativeScript!");
};
return DataItem;
}(observable_1.Observable));
exports.DataItem = DataItem;



/*视频教程*/
var Session = (function (_super) {
    __extends(Session, _super);
    function Session(title,image,isFavourite,cssClass,videoId,video,views) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.image = image;
        _this.isFavourite = isFavourite;
        _this.cssClass = cssClass;
        _this.videoId = videoId;
        _this.video = video;
        _this.view = views;
        _this.cssClass = "friend-favorite";
        return _this;
    }
    Object.defineProperty(Session.prototype, "title", {
        get: function () {
            return this.get('_title');
        },
        set: function (value) {
            this.set('_title', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "image", {
        get: function () {
            return this.get('_image');
        },
        set: function (value) {
            this.set('_image', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "isFavourite", {
        get: function () {
            return this.get('_isFavourite');
        },
        set: function (value) {
            this.set('_isFavourite', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "video", {
        get: function () {
            return this.get('_video');
        },
        set: function (value) {
            this.set('_video', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "videoId", {
        get: function () {
            return this.get('_videoId');
        },
        set: function (value) {
            this.set('_videoId', value);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Session.prototype, "view", {
        get: function () {
            return this.get('_view');
        },
        set: function (value) {
            this.set('_view', value);
        },
        enumerable: true,
        configurable: true
    });
    //视频收藏接口
    Session.prototype.toggleFavourite = function () {
        var _this = this;
        var favourite = this.get("isFavourite");
        var id = this.get("videoId");
        apiCollect.videoColl(id);
        this.set("isFavourite", !favourite);
        this.set("cssClass", !favourite ? "friend-favorite-selected" : "friend-favorite-unselected");
        setTimeout(function () {
            _this.set("cssClass", "friend-favorite");
        }, 600);
    };
    /*分享*/
    Session.prototype.videoShare =function () {
        socialShare.shareText("I love NativeScript!");
    }

    return Session;
}(observable_1.Observable));
exports.Session = Session;

/*视频教程*/
var VideoListViewModel = (function (_super) {

    __extends(VideoListViewModel, _super);
    function VideoListViewModel() {
        var _this = _super.call(this) || this;
        this.initDataItems();
        return _this;
    }
    Object.defineProperty(VideoListViewModel.prototype, "lists", {
        get: function () {
            return this._lists;
        },
        enumerable: true,
        configurable: true
    });
    //查看视频详情
    VideoListViewModel.prototype.itemSelected = function (args) {
        var page = args.object.page;
        var item = this.detailList.getItem(args.itemIndex);
        var videoId = content[args.itemIndex].id;
        console.log("----------id==============")
        console.log(videoId)
        console.log("----------id==============")
        var navigationEntry = {
            moduleName: '/views/course/video-details/video-details',
            context: {
                "videoId": videoId,
            },
        }
        frame.topmost().navigate(navigationEntry);

    };
    /*视频列表请求数据*/
    VideoListViewModel.prototype.initDataItems = function () {
        this._lists = new observable_array_1.ObservableArray();
        var qureyParams={
            "name": "videoController.videoPageFind",
            "args": [{"first":0,"rows":2},{"tagName":"热门教程"}]
        };
        api.call(config.apiUrl,qureyParams).ok((data)=>{
            try{
                console.log("进视频列表方法了");
                var contentTmp = data.result.content||[];
                console.dump(contentTmp);
                if(contentTmp!=null){
                    for (var i = 0; i < contentTmp.length; i++){
                        this._lists.push(new Session(contentTmp[i].title, contentTmp[i].picture,contentTmp[i].collection, contentTmp[i].description,  contentTmp[i].id, contentTmp[i].video,contentTmp[i].views));
                        content.push(contentTmp[i]);
                    }
                }
            }catch (e){

            }

        }).fail((err)=>{
            console.log("热门视频加载失败");
        });
    };
    return VideoListViewModel;
}(observable_1.Observable));
exports.VideoListViewModel = VideoListViewModel;