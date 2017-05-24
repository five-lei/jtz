var frameModule=require("ui/frame");
var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var page;
var nameOrMobile;
var topmost=frameModule.topmost();
var ViewModel = require("./message-search-list-view-model");


exports.loaded = function(args) {
    page = args.object;
    var context = page.navigationContext;
    nameOrMobile = page.getViewById("nameOrMobile");
    nameOrMobile.hint = context.name;
    var type = context.type;
    nameOrMobile.on("propertyChange", ((args) => {
        var nameOrMobile_text =nameOrMobile.text;
        console.log(nameOrMobile.text.length);
        if(nameOrMobile.text.length==0){
            console.log("null");
            page.bindingContext = new ViewModel.ViewModel(nameOrMobile_text); 
        }else{
            console.log("have");
            page.bindingContext = new ViewModel.ViewModel(type,nameOrMobile_text);;
        }
    }));
};
  

exports.onBackTap=function(){

   topmost.goBack();
};
function Search_Result(args) {
    //var topmost=frameModule.topmost();
    // var navigationEntry = {
    //     moduleName: "views/message/message-search-results/message-search-results",
    //     context: {
    //         "nameOrMobile": nameOrMobile_text
    //     },
    // };
    // topmost.navigate(navigationEntry);

}
exports.Search_Result=Search_Result;
