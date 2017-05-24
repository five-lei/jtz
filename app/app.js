/*
 In NativeScript, the app.js file is the entry point to your application.
 You can use this file to perform app-level initialization, but the primary
 purpose of the file is to pass control to the app’s first module.
 */

require("./bundle-config");
var application = require("application");
var aliSDK = require("nativescript-ali");
var config = require("./shared/config");

application.on(application.launchEvent, function (args) {
    if (args.android) {
		var context = application.android.context;
	    console.log(context);
        //声明定位回调监听器
        var location = com.amap.api.location.AMapLocation;
        console.log(location);
        //var mLocationListener = new com.amap.api.location.AMapLocationListener(location);
        //初始化定位
        var mLocationClient = new com.amap.api.location.AMapLocationClient(context);

        //启动定位
        mLocationClient.startLocation();
        //异步获取定位结果
        var mAMapLocationListener = new com.amap.api.location.AMapLocationListener({
            onLocationChanged: function(location) {
			   //console.log("hellow")
               if (location != null) {
                   if (location.getErrorCode() == 0) {
                       //解析定位结果
                       console.log(location);
                       config.latitude = location.getLatitude();
                       config.longitude = location.getLongitude();
                   }
               }
            }
        });
        console.log(mAMapLocationListener);
        //设置定位回调监听
        mLocationClient.setLocationListener(mAMapLocationListener);

        //调用喵师傅
        aliSDK.initAliSDK(context);
    
        //极光推送
		// var push = cn.jpush.android.api.JPushInterface;
		// console.log(push);
		// push.setDebugMode(true);
		// push.init(context);
		// cn.jpush.android.api.JPushInterface.setDebugMode(true);
        // cn.jpush.android.api.JPushInterface.init(context);
        // For Android applications, args.android is an android.content.Intent class.
        console.log("Launched Android application with the following intent: " + args.android + ".");
    } else if (args.ios !== undefined) {
        // For iOS applications, args.ios is NSDictionary (launchOptions).
        console.log("Launched iOS application with options: " + args.ios);
    }
});
application.start({ moduleName: "views/regLogin/loninview/lonin" });

/*
 Do not place any code after the application has been started as it will not
 be executed on iOS.
 */
