/**
 * Created by Administrator on 2017/3/28.
 */
"use strict";

var topmost = require("ui/frame").topmost;

var apiTest=require('../../test/api.test');

var TestPage = function() {};

// Place any code you want to run when the home page loads here.
TestPage.prototype.contentLoaded = function() {};

TestPage.prototype.onGoBackTap=function(){
    topmost().goBack()
};
TestPage.prototype.tapHistoryTask=function(){
    topmost().navigate("views/task/history-task/history-task");
};
TestPage.prototype.tapQuestionDetail=function(){
    topmost().navigate("views/task/question-task-detail/question-task-detail");
};
TestPage.prototype.tapExample=function(){
    topmost().navigate("examples/layouts/layouts-example");
};
TestPage.prototype.tapRegLogin=function(){
    topmost().navigate("views/regLogin/loninview/lonin");
};
TestPage.prototype.tapMessage= function(args){
    topmost().navigate("views/message/message-center/message-center");
};
TestPage.prototype.tapFriendsList= function(args){
    topmost().navigate("views/task/friendsList/friendsList");
};
TestPage.prototype.historyTaskFilter= function(args){
    topmost().navigate("views/task/history-task-filter/history-task-filter");
}

TestPage.prototype.test= function(args){
    apiTest.test();
}
/**更换头像 */
TestPage.prototype.changehead= function(args) {
    var navigationEntry = {
        moduleName: 'views/my/changehead/changehead',
    }
    topmost().navigate(navigationEntry)
}
module.exports = new TestPage();
