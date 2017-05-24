/**
 * Created by Administrator on 2017/5/4.
 */
var config = require("../../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var api=require('../../../shared/api');
var config = require("../../../shared/config");
var visibility  = require("ui/enums");
var viewModels = require("./district-select-view-model");
var color = require("color");
// var citySelectArray = new observable_array_1.ObservableArray();
var lv3;
var l3;


var img3;
var label3;

var ViewModel = (function () {
    function ViewModel() {
        this.initDataItems();
    }
    Object.defineProperty(ViewModel.prototype, "cityList", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModel.prototype, "citySelectArray", {
        get: function () {
            return this._citySelectArray;
        },
        enumerable: true,
        configurable: true
    });
    // >> listview-howto-item-selection-events
    ViewModel.prototype.itemSelected = function (args) {
        config.cityflag = true;//判断是否点击市的标识，点击了区选中的条目得清空。
        var page = args.object.page;

        lv3 = page.getViewById("lv3");//区的列表
        l3 = page.getViewById("l3");//区的列表
        img3 = page.getViewById("img3");
        label3 = page.getViewById("label3");
        l3.style.visibility = "visible";//点击市的每个item时区的列表得显示


        config.districtArray=null;
        var item = this.cityList.getItem(args.itemIndex);
        config.cityArray=item.city;
        config.cityId=item.id;
        for (var i = 0; i < this.cityList.length; i++) {
            if(this.cityList.getItem(i) == item){
                this.cityList.getItem(i).selected=true;
            }else{
                this.cityList.getItem(i).selected=false;
            }
        }

        lv3.bindingContext = new viewModels.ViewModel();
    };
    // << listview-howto-item-selection-events
    ViewModel.prototype.initDataItems = function () {
        this._items = new observable_array_1.ObservableArray();
        var codes=config.provinceId;
        api.call(config.apiUrl,{
            name:"commonController.findAreasByParents",
            args:[{code:codes}]
        }).ok(
            data=>{
                console.dump(data);
                data.result.forEach(each=>{
                    this._items.push(new DataItem(each.code, each.name));
                });

            }
        ).fail(data=>{
            alert(data)
        });

    };
    return ViewModel;
}());
exports.ViewModel = ViewModel;

var DataItem = (function (_super) {
    __extends(DataItem, _super);
    function DataItem(id, city) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.city = city;
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
    Object.defineProperty(DataItem.prototype, "city", {
        get: function () {
            return this.get('_city');
        },
        set: function (value) {
            this.set('_city', value);
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
