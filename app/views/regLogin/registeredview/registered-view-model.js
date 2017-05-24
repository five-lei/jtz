var config = require("../../../shared/config");
var api = require('../../../shared/api');
var fetchModule = require("fetch");

var ViewModel = (function () {
    function ViewModel(data) {
    }

    ViewModel.prototype.getValidateCode = function (mobile, ok, fail) {
        try {
            var qureyParams = {
                "name": "userWorkerController.getRegisterValidateCode",
                "args": [{ mobile: mobile }],
                     };
            var validateCode = "";
            api.call(config.apiUrl, qureyParams).ok((data) => {
                ok();
            }).fail((err) => {
                fail(err);
            })
        } catch (error) {
            fail();
            // throw error;
        }
    };

    ViewModel.prototype.checkValidateCode = function (data, callback, fail) {
        try {
            var qureyParams = {
                "name": "userController.checkValidateCode",
                "args": [data],
                 
            };
            api.call(config.apiUrl, qureyParams).ok((data) => {
                callback(data);
            }).fail((err) => {
                if (err.code) {
                    fail(err);
                }
                console.log(JSON.stringify(err));

            })
        } catch (error) {
        }
    }

    ViewModel.prototype.saveUserInfo = function (data, ok, fail) {
        try {
            var qureyParams = {
                "name": "userController.updatePwd",
                "args": [data]
            };
            api.call(config.apiUrl, qureyParams).ok((data) => {
                ok();
            }).fail((err) => {
                if (err.code) {
                    fail(err);
                }
                console.log(JSON.stringify(err));
            })
        } catch (error) {
        }
    }
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
