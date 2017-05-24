/**
 * Created by giscafer on 2017/3/29.
 */

var observable = require("data/observable");
var socialShare = require("nativescript-social-share");
var config = require("../../../shared/config");
var api=require('../../../shared/api');
var observable_array_1 = require("data/observable-array");
var apiCollect=require('../../../view-models/api.collect');
var content=[];
var totalPages = 1;
var videoContent = new observable_array_1.ObservableArray();
var frame = require("ui/frame");

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

/*视频教程*/
var allSessions = [
    new Session("灯具安装教程", "res://pic", true ),
    new Session("灯具安装教程", "res://pic", false ),
    new Session("灯具安装教程", "res://pic", true ),
    new Session("灯具安装教程", "res://pic", false ),
    new Session("灯具安装教程", "res://pic", true ),
    new Session("灯具安装教程", "res://pic", false ),
];
var ListViewLayoutsModel = (function (_super) {

    __extends(ListViewLayoutsModel, _super);
    function ListViewLayoutsModel(first, more, page) {
        var _this = _super.call(this) || this;
        // _this._lists = allSessions;
        // _this._isLinearActive = true;
        this.initDataItems(first, more, page);
        return _this;
    }
    Object.defineProperty(ListViewLayoutsModel.prototype, "lists", {
        get: function () {
            return this._lists;
        },
        enumerable: true,
        configurable: true
    });

    //查看视频详情
    ListViewLayoutsModel.prototype.itemSelected = function (args) {
        var page = args.object.page;
        var item = this.detailList.getItem(args.itemIndex);
        var videoId = content[args.itemIndex].id;
        var navigationEntry = {
            moduleName: '/views/course/video-details/video-details',
            context: {
                "videoId": videoId,
            },
        }
        frame.topmost().navigate(navigationEntry);

    };
    /*视频列表请求数据*/
    ListViewLayoutsModel.prototype.initDataItems = function (first, more, page) {
        if(more == true){
            if(first >= totalPages){
                alert("无更多教程");
                if(page){
                    page.getViewById("video-view").notifyPullToRefreshFinished();
                    page.getViewById("video-view").notifyLoadOnDemandFinished();
                }
                return;
            }
            //加载更多
            this._lists = videoContent;
            first *= 2;
        }else{
            //加载首页
            this._lists = new observable_array_1.ObservableArray();
        }


        var qureyParams={
            "name": "videoController.videoPageFind",
            "args": [{"first":first,"rows":2},{"tagName":"家具学院"}]
        };
        api.call(config.apiUrl,qureyParams).ok((data)=>{
            try{
                console.log("进视频方法了");
                var contentTmp = data.result.content||[];
                console.dump(contentTmp);
                if(contentTmp!=null){
                    for (var i = 0; i < contentTmp.length; i++){
                        var coltitle = JSON.stringify(contentTmp[i].title);
                        this._lists.push(new Session(contentTmp[i].title, contentTmp[i].picture,contentTmp[i].collection, contentTmp[i].description,  contentTmp[i].id, contentTmp[i].video,contentTmp[i].views));
                        content.push(contentTmp[i]);
                    }
                    videoContent = this._lists;
                    console.dump(this._lists);
                }
                totalPages = data.result.totalPages;
            }catch (e){

            }
            if(page){
                page.getViewById("video-view").notifyPullToRefreshFinished();
                page.getViewById("video-view").notifyLoadOnDemandFinished();
            }
        }).fail((err)=>{
            console.log("家具学院视频加载失败")
            if(page){
                page.getViewById("video-view").notifyPullToRefreshFinished();
                page.getViewById("video-view").notifyLoadOnDemandFinished();
            }
        });
    };

    return ListViewLayoutsModel;
}(observable.Observable));
exports.ListViewLayoutsModel = ListViewLayoutsModel;