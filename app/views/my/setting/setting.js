var frame = require("ui/frame")
var SettingModel=require('./setting-view-model');
var application = require("application");
var dialogsUtil = require("../../../common/dialogsUtil");
var cache = require("nativescript-cache");

var models=new SettingModel();

application.android.on(application.AndroidApplication.activityResultEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity +
            ", requestCode: " + args.requestCode + ", resultCode: " + args.resultCode + ", Intent: " + args.intent);         
    });

function onBackTap(args) {
    frame.topmost().goBack();
}

/**个人设置 */
function onMyset(args) {
    var navigationEntry = {
        moduleName: 'views/my/myset/myset',
    }
    frame.topmost().navigate(navigationEntry)
}

/**账户安全 */
function onSecurity(args) {
    var navigationEntry = {
        moduleName: 'views/my/security/security',
    }
    frame.topmost().navigate(navigationEntry)
}

/**字体字号 */
function onFontset(args) {
    var navigationEntry = {
        moduleName: 'views/my/fontset/fontset',
    }
    frame.topmost().navigate(navigationEntry)
}

/**退出登录 */
function onExitLogin(args) {
    models.loginOut(function(flag){
        if(flag){
            cache.delete('jwt');
            var navigationEntry = {
                moduleName: 'views/regLogin/loninview/lonin',
                animated: false,
                clearHistory: true

            }
            frame.topmost().navigate(navigationEntry)
        }else{
            dialogsUtil.alert('退出失败！');
        }
    });
}

/** 消息通知*/
function onMessage(args) {
    var navigationEntry = {
        moduleName: 'views/message/new-message/new-message',
    }
    frame.topmost().navigate(navigationEntry)
}


// function onTap(args) {
//     aliSDK.sign(application.android.foregroundActivity, "1111", "1440661399625855", "tpid", 2, 9999);
// }
  
// function onMap(args) {
//     var context = application.android.context;
//     try {  
//         var info = context.getPackageManager().getApplicationInfo("com.baidu.BaiduMap",  
//                     android.content.pm.PackageManager.GET_UNINSTALLED_PACKAGES);
//         //移动APP调起Android百度地图 
//         var Intent = android.content.Intent;
//         var intent = Intent.getIntent("intent://map/direction?origin=latlng:23.176245,113.348407|name:我的位置&destination=广东省广州市天河区车陂&src=yourCompanyName|yourAppName#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end");    
//         application.android.foregroundActivity.startActivity(intent); //启动调用 
//      } catch (e) {  
//         console.log(e); 
//         alert("需要安装百度地图app才能使用导航!");
//     }                                      
     
// }

//exports.onMap = onMap
//exports.onTap = onTap
exports.onBackTap = onBackTap
exports.onMyset = onMyset
exports.onSecurity = onSecurity
exports.onFontset = onFontset
exports.onExitLogin=onExitLogin
exports.onMessage=onMessage;