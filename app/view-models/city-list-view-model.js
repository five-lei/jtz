var config = require("../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var visibility  = require("ui/enums");
var viewModels = require("../view-models/citys-list-view-model");
var api = require('../shared/api');
var color = require("color");
// var provinceSelectArray = new observable_array_1.ObservableArray();
var lv2;
var lv3;
var l2;
var l3;
var provinces;
var citys;
var districts;

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
    Object.defineProperty(ViewModel.prototype, "provinceSelectArray", {
        get: function () {
            return this._provinceSelectArray;
        },
        set: function (value) {
            this.set('_provinceSelectArray', value);
        },
        enumerable: true,
        configurable: true,
    });
    Object.defineProperty(ViewModel.prototype, "responseData", {
        get: function () {
            return this._responseData;
        },
        set: function (value) {
            this.set('_responseData', value);
        },
        enumerable: true,
        configurable: true,
    });
    // >> listview-howto-item-selection-events
    ViewModel.prototype.itemSelected = function (args) {

        config.provinceflag = true;//判断是否点击省的标识，点击了市选中的条目和区选中的条目得清空。
        var page = args.object.page;
        provinces = page.getViewById("provinces");//省的Lable---根据选中的条目来变化
        citys = page.getViewById("citys");//市的Lable
        districts = page.getViewById("districts");//区的Lable

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

        config.cityArray=null;
        config.districtArray=null;
        citys.text = "市0、";
        districts.text = "区0";

        var item = this.provinceList.getItem(args.itemIndex);
        // for (var i = 0; i < this.provinceList.length; i++) {
        //     if(this.provinceList.getItem(i)==this.provinceList.getItem(args.itemIndex)){
        //         this.provinceList.getItem(i).selected=true;
        //     }else{
        //         this.provinceList.getItem(i).selected=false;
        //     }
        // }

        item.selected = true;
        this._provinceSelectArray.push(item.id);
        provinces.text = "已选省"+this._provinceSelectArray.length+"、";
        config.provinceArray = this._provinceSelectArray;
        console.log(this._provinceSelectArray);
        lv2.bindingContext = new viewModels.ViewModel();
    };
    ViewModel.prototype.itemDeselected = function (args) {

        config.provinceflag = true;//判断是否点击省的标识，点击了市选中的条目和区选中的条目得清空。
        // var page = args.object.page;
        var item = this.provinceList.getItem(args.itemIndex);
        item.selected = false;
        l2.style.visibility = "visible";
        l3.style.visibility = "collapsed";

        config.cityArray=null;
        config.districtArray=null;
        citys.text = "市0、";
        districts.text = "区0";

        if(this._provinceSelectArray.length>0){//循环遍历取消了那个省则数组去掉对应的
            for(var i=0;i<=this._provinceSelectArray.length;i++){
                if(item.id==this._provinceSelectArray.getItem(i)){
                    this._provinceSelectArray.splice(i, 1);
                }
            }
            if(this._provinceSelectArray.length==0){//当选中的省全部取消时，右边的市和区都得隐藏，且选中的区和市清0；
                l2.style.visibility = "collapsed";
                l3.style.visibility = "collapsed";
                lv2.deselectAll();
                lv3.deselectAll();

                // 改变全选的样式
                img2.src="res://ico_check1";
                label2.style.color= new color.Color("#333333");
                img3.src="res://ico_check1";
                label3.style.color= new color.Color("#333333");
            }
            console.log(this._provinceSelectArray.length);
            provinces.text = "已选省"+this._provinceSelectArray.length+"、";
            config.provinceArray = this._provinceSelectArray;
        }
        console.log(this._provinceSelectArray);
        lv2.bindingContext = new viewModels.ViewModel();
    };
    // << listview-howto-item-selection-events
    ViewModel.prototype.initDataItems = function () {
        this._items = new observable_array_1.ObservableArray();
        this._provinceSelectArray = new observable_array_1.ObservableArray();
        this._items = new observable_array_1.ObservableArray();
        this._provinceSelectArray = new observable_array_1.ObservableArray();
        var that = this;
        // var requestParam = {
        //     name: "commonController.queryAreaTree",
        //     args: [{
        //         data: ""
        //     }]
        // }
        // api.call(config.apiUrl,requestParam).ok(
        //     data=>{
        //         console.log(data);
        //         that._responseData=data.result;
        //         that._responseData.forEach(each=>{
        //             this._items.push(new DataItem(each.data,each.label));
        //         });
                
        //     }
        // ).fail();
        // var codes="";
        // config.provinceArray.forEach(each=>{
        //     if(codes!=""){
        //         codes=codes+","+each
        //     }else{
        //         codes=each
        //     }
            
        // });
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
            alert(data)
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