var config = require("../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var visibility  = require("ui/enums");
var api = require('../shared/api');
// var selectarray = new observable_array_1.ObservableArray();
var districts;
var citys;


var ViewModel = (function () {
    function ViewModel() {
        this.initDataItems();
    }
    Object.defineProperty(ViewModel.prototype, "districtList", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModel.prototype, "districtSelectArray", {
        get: function () {
            return this._districtSelectArray;
        },
        enumerable: true,
        configurable: true
    });
    // >> listview-howto-item-selection-events
    ViewModel.prototype.itemSelected = function (args) {
        if(config.provinceflag||config.cityflag){
            this._districtSelectArray.splice(0, this._districtSelectArray.length);
            config.cityflag = false;
        }
        var page = args.object.page;
        districts = page.getViewById("districts");
        var item = this.districtList.getItem(args.itemIndex);
        // for (var i = 0; i < this.districtList.length; i++) {
        //     if(this.districtList.getItem(i)==this.districtList.getItem(args.itemIndex)){
        //         this.districtList.getItem(i).selected=true;
        //     }else{
        //         this.districtList.getItem(i).selected=false;
        //     }
        // }
        item.selected = true;
        this._districtSelectArray.push(item.id);
        console.log(this._districtSelectArray );
        districts.text = "区"+this._districtSelectArray.length;
        config.districtArray = this._districtSelectArray;
    };
    ViewModel.prototype.itemDeselected = function (args) {
        var item = this.districtList.getItem(args.itemIndex);
        item.selected = false;
        if(this._districtSelectArray.length>0){
            for(var i=0;i<=this._districtSelectArray.length;i++){
                if(item.id==this._districtSelectArray.getItem(i)){
                    this._districtSelectArray.splice(i, 1);
                }
            }
            if(this._districtSelectArray.length==0){
            }
            console.log(this._districtSelectArray.length);
            districts.text = "区"+this._districtSelectArray.length;
            config.districtArray = this._districtSelectArray;
        }
        console.log(this._districtSelectArray);
    };
    // << listview-howto-item-selection-events
    ViewModel.prototype.initDataItems = function () {

        this._items = new observable_array_1.ObservableArray();
        this._districtSelectArray = new observable_array_1.ObservableArray();
        // if(citys!=null){
        //     for (var i = 0; i < citys.length; i++){
        //         console.log(JSON.stringify(citys[i].userName));
        //         city = JSON.stringify(citys[i].userName);
        //         this._items.push(new DataItem(i, citys[i].userName));
        //     }

        // }
        var codes="";
        config.cityArray.forEach(each=>{
            if(codes!=""){
                codes=codes+","+each
            }else{
                codes=each
            }
            
        });
        api.call(config.apiUrl,{
            name:"commonController.findAreasByParents",
            args:[{code:codes}]
        }).ok(
            data=>{
                console.log(data);
                data.result.forEach(each=>{
                    this._items.push(new DataItem(each.code, each.name));
                });
                
            }
        ).fail(data=>{
            alert(data)
        });
            // this._items.push(
            //                new DataItem(1, "广州市"),
            //                new DataItem(2, "东莞市"),
            //                new DataItem(3, "潮汕市"),
            //                new DataItem(4, "惠州市"),
            //                new DataItem(5, "韶关市"),
            //                new DataItem(6, "清远市"),
            //                new DataItem(7, "汕尾市"),
            //                new DataItem(8, "佛山市"),
            //                new DataItem(9, "虎门市"),
            //                new DataItem(10, "中山市"),
            //                new DataItem(11, "肇庆市"),
            //                new DataItem(12, "珠海市")
            //                );
        
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
    function DataItem(id, district) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.district = district;
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
    Object.defineProperty(DataItem.prototype, "district", {
        get: function () {
            return this.get('_district');
        },
        set: function (value) {
            this.set('_district', value);
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
