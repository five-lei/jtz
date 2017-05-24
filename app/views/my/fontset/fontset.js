var frame = require("ui/frame");
var color = require("color");

function onBackTap(args) {
    frame.topmost().goBack();
}

function big_btn(args) {
    var page = args.object.page;
    var big = page.getViewById("big");
    big.style.backgroundColor = new color.Color("#FFDEAD");
    big.style.color=new color.Color("orange");
    big.style.borderColor = new color.Color("orange");
    
    var mid = page.getViewById("middle");
    mid.style.backgroundColor = new color.Color("#ffffff");
    mid.style.color=new color.Color("black");
    mid.style.borderColor = new color.Color("#8A8A8A");

    var short = page.getViewById("short");
    short.style.backgroundColor = new color.Color("#ffffff");
    short.style.color=new color.Color("black");
    short.style.borderColor = new color.Color("#8A8A8A");
   
}

function middle_btn(args) {
    var page = args.object.page;
    var big = page.getViewById("big");
    big.style.backgroundColor = new color.Color("#ffffff");
    big.style.color=new color.Color("black");
    big.style.borderColor = new color.Color("#8A8A8A");
    
    var mid = page.getViewById("middle");
    mid.style.backgroundColor = new color.Color("#FFDEAD");
    mid.style.color=new color.Color("orange");
    mid.style.borderColor = new color.Color("orange");

    var short = page.getViewById("short");
    short.style.backgroundColor = new color.Color("#ffffff");
    short.style.color=new color.Color("black");
    short.style.borderColor = new color.Color("#8A8A8A");

}

function short_btn(args) {
    var page = args.object.page;
    var big = page.getViewById("big");
    big.style.backgroundColor = new color.Color("#ffffff");
    big.style.color=new color.Color("black");
    big.style.borderColor = new color.Color("#8A8A8A");
    
    var mid = page.getViewById("middle");
    mid.style.backgroundColor = new color.Color("#ffffff");
    mid.style.color=new color.Color("black");
    mid.style.borderColor = new color.Color("#8A8A8A");

    var short = page.getViewById("short");
    short.style.backgroundColor = new color.Color("#FFDEAD");
    short.style.color=new color.Color("orange");
    short.style.borderColor = new color.Color("orange");
  
}

exports.onBackTap = onBackTap
exports.big_btn = big_btn
exports.middle_btn = middle_btn
exports.short_btn = short_btn;