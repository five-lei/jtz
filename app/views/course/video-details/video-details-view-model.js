/**
 * Created by Administrator on 2017/4/17.
 */
var config = require("../../../shared/config");
var frame = require("ui/frame");
var api=require('../../../shared/api');
var fetchModule = require("fetch");
var Observable=require('data/observable').Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var observable = require("data/observable");
var visibility  = require("ui/enums");
var socialShare = require("nativescript-social-share");
var apiCollect=require('../../../view-models/api.collect');
var content=null;
/*文章列表*/
var ViewModel = (function () {
    function ViewModel() {

        this.initDataItems();
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
        console.log(JSON.stringify(content[args.itemIndex].id));
        var navigationEntry = {
            moduleName: '/views/course/details-article/details-article',
            context: {
                "articleOrVideoId": articleOrVideoId,
            },
        }
        frame.topmost().navigate(navigationEntry);

    };

    // << listview-howto-item-selection-events
    ViewModel.prototype.initDataItems = function () {

        this._items = new observable_array_1.ObservableArray();
        var qureyParams={
            "name": "articleController.articleFind",
            "args": [{"first":0,"rows":2},{"tagName":"热推文章"}]
        };
        api.call(config.apiUrl,qureyParams).ok((data)=>{
            var content=data.result && data.result['content'] || [];

            console.dump(content);

            for (var i = 0; i < content.length; i++){
                this._items.push(new DataItem(content[i]["aPicture"]["url"], "res://fx","分享", content[i].title, content[i].describe, content[i].collection,content[i].id));
            }
        }).fail((err)=>{
            console.log("##############api.call error start#############");
            console.log(err)
            console.log("##############api.call  error  end#############");
        });
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
        var id =this.get("id");
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

/*视频教程*/
var Session = (function (_super) {
    __extends(Session, _super);
    function Session(title,image,isFavourite,cssClass,id,video,views) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.image = image;
        _this.isFavourite = isFavourite;
        _this.cssClass = cssClass;
        _this.videoId = id;
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
}(observable.Observable));
exports.Session = Session;


//获取视频列表
var VideoListViewModel = (function (_super) {

    __extends(VideoListViewModel, _super);
    function VideoListViewModel() {
        var _this = _super.call(this) || this;
        // _this._lists = allSessions;
        // _this._isLinearActive = true;
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
        var navigationEntry = {
            moduleName: '/views/course/video-details/video-details',
            context: {
                "videoId": videoId,
            },
        }
        console.log(videoId);
        frame.topmost().navigate(navigationEntry);
    };
    /*视频列表请求数据*/
    VideoListViewModel.prototype.initDataItems = function () {
        this._lists = new observable_array_1.ObservableArray();
        var qureyParams={
            "name": "videoController.videoPageFind",
            "args": [{"first":0,"rows":2},{}]
        };
        api.call(config.apiUrl,qureyParams).ok((data)=>{
            try{
                var videoLists = data.result.content||[];
                console.dump(videoLists);
                if(videoLists!=null){
                    for (var i = 0; i < videoLists.length; i++){
                        this._lists.push(new Session(videoLists[i].title, videoLists[i].picture,videoLists[i].collection, videoLists[i].description,  videoLists[i].videoId, videoLists[i].videoPath,videoLists[i].views));
                        content.push(videoLists[i]);
                        console.dump(this._lists);
                    }
                }
            }catch (e){

            }
        }).fail((err)=>{
            console.dump(err);
        });
    };
    return VideoListViewModel;
}(observable.Observable));
exports.VideoListViewModel = VideoListViewModel;

/*
    请求视频详情数据
 */
var SessionData = (function (_super) {
    __extends(SessionData, _super);
    function SessionData(title,image,id,video,views,description,isFavourite,cssClass) {
        var _this = _super.call(this) || this;
        _this.videoTitle = title;
        _this.image = image;
        _this.description = description;
        _this.id = id;
        _this.videoPath = video;
        _this.views = views;
        _this.isFavourite = isFavourite;
        _this.cssClass = cssClass;
        _this.cssClass = "friend-favorite";
        return _this;
    }
    Object.defineProperty(SessionData.prototype, "videoTitle", {
        get: function () {
            return this.get('_videoTitle');
        },
        set: function (value) {
            this.set('_videoTitle', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SessionData.prototype, "image", {
        get: function () {
            return this.get('_image');
        },
        set: function (value) {
            this.set('_image', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SessionData.prototype, "description", {
        get: function () {
            return this.get('_description');
        },
        set: function (value) {
            this.set('_description', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SessionData.prototype, "id", {
        get: function () {
            return this.get('_id');
        },
        set: function (value) {
            this.set('_id', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SessionData.prototype, "videoPath", {
        get: function () {
            return this.get('_videoPath');
        },
        set: function (value) {
            this.set('_videoPath', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SessionData.prototype, "views", {
        get: function () {
            return this.get('_views');
        },
        set: function (value) {
            this.set('_views', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SessionData.prototype, "isFavourite", {
        get: function () {
            return this.get('_isFavourite');
        },
        set: function (value) {
            this.set('_isFavourite', value);
        },
        enumerable: true,
        configurable: true
    });

    //视频收藏接口
    SessionData.prototype.toggleFavourite = function () {
        console.log(333333);
        var _this = this;
        var favourite = this.get("isFavourite");
        console.log("favourite:"+favourite);
         var id = this.get("id");
         apiCollect.videoColl(id);
        this.set("isFavourite", !favourite);
        this.set("cssClass", !favourite ? "friend-favorite-selected" : "friend-favorite-unselected");
        setTimeout(function () {
            _this.set("cssClass", "friend-favorite");
        }, 600);
    };
    /*分享*/
    SessionData.prototype.videoShare =function () {
        socialShare.shareText("I love NativeScript!");
    }

    return SessionData;
}(observable.Observable));
exports.SessionData = SessionData;

var videoPlayModel = (function (_super) {

    __extends(videoPlayModel, _super);
    function videoPlayModel(page,id) {
        var _this = _super.call(this) || this;
        this.initDataItems(page,id);
        return _this;
    }
    Object.defineProperty(videoPlayModel.prototype, "detail", {
        get: function () {
            return this._lists;
        },
        enumerable: true,
        configurable: true
    });
    /*视频详情向后端请求数据*/
    videoPlayModel.prototype.initDataItems = function (page,id) {
        var qureyParams={
            "name": "videoController.videoDetails",
            "args": [{"videoId":id}]
        };
        api.call(config.apiUrl,qureyParams).ok((data)=>{
            console.log("进入查询视频详情");
            try{
                var videoDet = data.result|| {};
                var vedioObj = new SessionData(videoDet.title, videoDet.picturePath,videoDet.videoId, videoDet.videoPath, videoDet.views,videoDet.description,videoDet.collection);
                console.dump(vedioObj) ;
                page.bindingContext = vedioObj;
                //设置视频播放次数
                var qureyParam={
                    "name": "videoController.viewPlayNumber",
                    "args": [{"videoId":id,"views":videoDet.views}]
                };
                api.call(config.apiUrl,qureyParam).ok((data)=> {
                    console.log("进入视频播放次数");
                    var vedioNum = data.result.views;
                    page.bindingContext.views = vedioNum;
                })
            }catch (e){

            }
        }).fail((err)=>{
            console.dump(err);
        });
    };
    return videoPlayModel;
}(observable.Observable));
exports.videoPlayModel = videoPlayModel;

