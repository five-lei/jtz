/**
 * Created by Administrator on 2017/5/4.
 */
var config = require("../../../shared/config");
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var api=require('../../../shared/api');
var config = require("../../../shared/config");
var viewModels = require("./smalltype-select-view-model");
var color = require("color");
var lv2;
var l2;

var img2;
var label2;
var img3;
var label3;

var ViewModel = (function () {
    function ViewModel() {
        this.initDataItems();
    }
    Object.defineProperty(ViewModel.prototype, "bigTypeList", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true,
    });
    // >> listview-howto-item-selection-events
    ViewModel.prototype.itemSelected = function (args) {
        config.provinceflag = true;//判断是否点击省的标识，点击了市选中的条目和区选中的条目得清空。
        var page = args.object.page;

        l2 = page.getViewById("l2");//市的列表
        lv2 = page.getViewById("lv2");//市的列表
        l2.style.visibility = "visible";

        img2 = page.getViewById("img2");
        img3 = page.getViewById("img3");
        label2 = page.getViewById("label2");
        label3 = page.getViewById("label3");

        config.cityArray=null;  //已选中市
        config.districtArray=null;  //已选中区

        var item = this.bigTypeList.getItem(args.itemIndex);

        config.provinceArray = item.province; //已选中省
        config.provinceId =item.id;
        // console.log(config.provinceId+"config.provinceId");
        for (var i = 0; i < this.bigTypeList.length; i++) {
            if(this.bigTypeList.getItem(i) == item){
               this.bigTypeList.getItem(i).selected=true;
            }else{
               this.bigTypeList.getItem(i).selected=false;
            }
        }
        lv2.bindingContext = new viewModels.ViewModel();
    };


    // << listview-howto-item-selection-events
    ViewModel.prototype.initDataItems = function () {
        this._items = new observable_array_1.ObservableArray();
        api.call(config.apiUrl,{
            name:"abnormalTypeController.abnormalTypeFind",
            args: [{ first: 0, rows: 9999 }, { }]
        }).ok(json => {
                var data=json.result.content || [];
                data.forEach(each=>{
                    this._items.push(new DataItem(each.id, each.name));
                });

            }
        ).fail(function(err){
            console.log(JSON.stringify(err));
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