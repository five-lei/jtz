var config = require("../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var visibility  = require("ui/enums");
var viewModels = require("../view-models/district-list-view-model");
var color = require("color");
var api = require('../shared/api');
// var citySelectArray = new observable_array_1.ObservableArray();
var lv3;
var l3;
var citys;
var districts;

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
        if(config.provinceflag){//如果点击了省，则删除市数组的数据，且flag设置为false；
            this._citySelectArray.splice(0, this._citySelectArray.length);
            config.provinceflag = false;
        }
        var page = args.object.page;
        citys = page.getViewById("citys");//市的Label
        districts = page.getViewById("districts");//区的Label
        lv3 = page.getViewById("lv3");//区的列表
        l3 = page.getViewById("l3");//区的列表
        img3 = page.getViewById("img3");
        label3 = page.getViewById("label3");
        l3.style.visibility = "visible";//点击市的每个item时区的列表得显示
        districts.text = "区0";//点击每个item时区的数据刷新，选中的区就得清0

        config.districtArray=null;
        var item = this.cityList.getItem(args.itemIndex);
        // for (var i = 0; i < this.cityList.length; i++) {
        //     if(this.cityList.getItem(i)==this.cityList.getItem(args.itemIndex)){
        //         this.cityList.getItem(i).selected=true;
        //     }else{
        //         this.cityList.getItem(i).selected=false;
        //     }
        // }
        item.selected = true;
        this._citySelectArray.push(item.id);//增加选中的市到数组中
        console.log(this._citySelectArray);
        citys.text = "市"+this._citySelectArray.length+"、";//显示选中了多少个市
        config.cityArray = this._citySelectArray;
        lv3.bindingContext = new viewModels.ViewModel();
    };
    ViewModel.prototype.itemDeselected = function (args) {
        config.cityflag = true;//判断是否点击市的标识，点击了区选中的条目得清空。
        var page = args.object.page;
        l3.style.visibility = "visible";//取消市的每个item时区的列表得显示
        districts.text = "区0";//取消每个item时，区的数据刷新，选中的区就得清0
        config.districtArray=null;

        var item = this.cityList.getItem(args.itemIndex);
        item.selected = false;
        if(this._citySelectArray.length>0){
            for(var i=0;i<=this._citySelectArray.length;i++){
                if(item.id==this._citySelectArray.getItem(i)){
                    this._citySelectArray.splice(i, 1);
                }
            }
            if(this._citySelectArray.length==0){
                l3.style.visibility = "collapsed";
                lv3.deselectAll();
                // 改变全选的样式
                img3.src="res://ico_check1";
                label3.style.color= new color.Color("#333333");
            }
            console.log(this._citySelectArray.length);
            citys.text = "市"+this._citySelectArray.length+"、";
            config.cityArray = this._citySelectArray;

        }

        console.log(this._citySelectArray);
        lv3.bindingContext = new viewModels.ViewModel();
    };
    // << listview-howto-item-selection-events
    ViewModel.prototype.initDataItems = function () {
        this._items = new observable_array_1.ObservableArray();
        this._citySelectArray = new observable_array_1.ObservableArray();
        var codes="";
        config.provinceArray.forEach(each=>{
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


// function CityListViewModel(items) {
//     var viewModel = new ObservableArray(items);
//     viewModel.load = function() { 
//         return fetch(config.apiRed, {
//             method: "POST",
//             body: JSON.stringify({
//                 "loginAcct":"10002"
//             }),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//         .then(handleErrors)
//         .then(function(response) {

//             return response.json();
//         }).then(function(data) {
//             console.log(JSON.stringify(data));
//             var str = JSON.stringify(data);
//             console.log("str:"+str);
//             var citys = eval('(' + str + ')');
//             for(var i in citys){
//                 console.log(citys[i].userName);
//                 viewModel.push({
//                     city: citys[i].userName      
//                 });
//             }

//         });
//     };

//     viewModel.empty = function() {
//         while (viewModel.length) {
//             viewModel.pop();
//         }
//     };



//     return viewModel;
// }

// function handleErrors(response) {
//     if (!response.ok) {
//         console.log(JSON.stringify(response));
//         throw Error(response.statusText);
//     }
//     return response;
// }

// module.exports = CityListViewModel;