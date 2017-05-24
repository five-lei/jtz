/**
 * Created by Administrator on 2017/5/4.
 */
var config = require("../../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var visibility  = require("ui/enums");
var api=require('../../../shared/api');
var config = require("../../../shared/config");
var viewModels = require("./city-select-view-model");
var color = require("color");
var lv2;
var lv3;
var l2;
var l3;

var img2;
var label2;
var img3;
var label3;

var ViewModel = (function () {
    function ViewModel() {
        this.initDataItems();
    }
    Object.defineProperty(ViewModel.prototype, "provinceList", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true,
    });
    // >> listview-howto-item-selection-events
    ViewModel.prototype.itemSelected = function (args) {
        console.log(33333);

        config.provinceflag = true;//判断是否点击省的标识，点击了市选中的条目和区选中的条目得清空。
        var page = args.object.page;


        l2 = page.getViewById("l2");//市的列表
        l3 = page.getViewById("l3");//区的列表
        lv2 = page.getViewById("lv2");//市的列表
        lv3 = page.getViewById("lv3");//区的列表
        l2.style.visibility = "visible";
        l3.style.visibility = "collapsed";

        img2 = page.getViewById("img2");
        img3 = page.getViewById("img3");
        label2 = page.getViewById("label2");
        label3 = page.getViewById("label3");

        config.cityArray=null;  //已选中市
        config.districtArray=null;  //已选中区

        var item = this.provinceList.getItem(args.itemIndex);

        config.provinceArray = item.province; //已选中省
        config.provinceId =item.id;
        console.log(config.provinceId+"config.provinceId");
        for (var i = 0; i < this.provinceList.length; i++) {
            if(this.provinceList.getItem(i) == item){
               this.provinceList.getItem(i).selected=true;
            }else{
               this.provinceList.getItem(i).selected=false;
            }
        }
        lv2.bindingContext = new viewModels.ViewModel();
    };


    // << listview-howto-item-selection-events
    ViewModel.prototype.initDataItems = function () {
        this._items = new observable_array_1.ObservableArray();
        api.call(config.apiUrl,{
            name:"commonController.findAreasByParents",
            args:[{code:"000000000000"}]
        }).ok(
            data=>{
                console.log(data);
                data.result.forEach(each=>{
                    this._items.push(new DataItem(each.code, each.name));
                });

            }
        ).fail(data=>{
            console.log(data)
        });

    };
    return ViewModel;
}());
exports.ViewModel = ViewModel;

var DataItem = (function (_super) {
    __extends(DataItem, _super);
    function DataItem(id, province) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.province = province;
        _this.selected = false;
        return _this;
    }
    Object.defineProperty(DataItem.prototype, "selected", {
        get: function () {
            return this.get('_selected');
        },
        set: function (value) {
            this.set('_selected', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "province", {
        get: function () {
            return this.get('_province');
        },
        set: function (value) {
            this.set('_province', value);
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
    return DataItem;
}(observable_1.Observable));
exports.DataItem = DataItem;