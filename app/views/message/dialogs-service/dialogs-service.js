/**
 * Created by Administrator on 2017/4/14.
 */

var phone = require( "nativescript-phone" );

var config = require("../../../shared/config");
/*联系客服*/
function onPhone() {
    phone.dial(config.phone,false);
}
exports.onPhone=onPhone;
