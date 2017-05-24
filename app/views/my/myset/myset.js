var frame = require("ui/frame");
var Observable = require("data/observable").Observable;
var cache = require("nativescript-cache");
var observable_1 = require("data/observable");
var api = require('../../../shared/api');
var config = require("../../../shared/config");

var areaLabel;
var portrait; //用户头像

function onBackTap(args) {
    frame.topmost().goBack();
}

exports.loaded = function (args) {
    page = args.object.page;
    page = args.object.page;
    var portrait = page.getViewById("portrait");
    var userInfo = cache.get("userInfo");
    if (userInfo) { 
        var info = JSON.parse(userInfo);
        portrait.src = info["portrait"];
    }
    "已选省5、市8、区52";
    areaLabel = args.object.getViewById("selectedAreaLabel");
    areaLabel.bindingContext = new observable_1.Observable({
        selectedAreaText: ""
    });
    // queryAreaNum();
}

// function queryAreaNum(){
//     api.call(config.apiUrl,{
//         name:"",
//     }).ok().fail();
// }

function onBackTap(args) {
    frame.topmost().goBack();
}

/**更换头像 */
function onChange(args) {
    var navigationEntry = {
        moduleName: 'views/my/changehead/changehead',
    }
    frame.topmost().navigate(navigationEntry)
}

/**实名认证 */
function onDriverTap(args) {

    api.call(config.apiUrl, {
        name: "userController.queryIfUserIdAuth",
        args: []
    }).ok(data => {
        var whetherAuth = new Observable({
            authState: data.result.hasIdentify
        });
        var navigationEntry = {
            moduleName: 'views/my/driver/driver',
        };
        var navigationEntryAuthed = {
            moduleName: 'views/my/driver_message/driver_message',
        };
        if (whetherAuth.authState) {
            frame.topmost().navigate(navigationEntryAuthed)
        } else {
            frame.topmost().navigate(navigationEntry)
        }
    }).fail(failed => {

    });
    // var navigationEntry = {
    //     moduleName: 'views/my/driver/driver',
    // };
    // var navigationEntryAuthed = {
    //     moduleName: 'views/my/driver_message/driver_message',
    // };
    // if (whetherAuth.authState) {
    //     frame.topmost().navigate(navigationEntryAuthed)
    // } else {
    //     frame.topmost().navigate(navigationEntry)
    // }
}

/**服务地区 */
function onCityTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/city_select_two/city_select_two',
        backstackVisible: false
    }
    frame.topmost().navigate(navigationEntry)
}

/**服务类型 */
function onServiceTypeTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/server_type/server_type',
        context: {
            updateRightNow: true
        }
        // backstackVisible: false
    }
    frame.topmost().navigate(navigationEntry)
}

/**增值服务 */
function onIncrementServiceTap(args) {
    var navigationEntry = {
        moduleName: 'views/my/server_increment/server_increment',
        // backstackVisible: false
    }
    frame.topmost().navigate(navigationEntry)
}

exports.onBackTap = onBackTap
exports.onChange = onChange
exports.onDriverTap = onDriverTap
exports.onCityTap = onCityTap
exports.onServiceTypeTap = onServiceTypeTap
exports.onIncrementServiceTap = onIncrementServiceTap