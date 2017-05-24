/**
 * Created by Administrator on 2017/4/18.
 */
/**
 * Created by giscafer on 2017/3/29.
 */
var ObservableArray = require("data/observable-array");
var observable_1 = require("data/observable");
var dialogs = require("ui/dialogs");
var api = require("../../../shared/api");
var config = require("../../../shared/config");
var cache = require("nativescript-cache");


var ViewModel = (function () {
    function ViewModel() {
        this.UPLOAD_BTN_IMG = {url: 'res://tjtp2x'};
    }

    Object.defineProperty(ViewModel.prototype, "detailList", {
        get: function () {
            return this._item;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 保存异常登记
     * @param context
     */
    ViewModel.prototype.save = function (context, navigationContext, cb) {
        var files = [], userInfo;
        var imageItems = context.images || [];
        imageItems.forEach(function (item) {
            if (item.id) {
                files.push(item.id);
            }
        });
        //缓存中获取用户信息
        var userInfoStr = cache.get("userInfo");
        if (userInfoStr) {
            userInfo = JSON.parse(userInfoStr);
        }
        var params = {
            "name": "abnormalController.abnormalEdit",
            "args": [{
                "waybillId": context.waybillId, //运单号
                "bAbnormalTypeID": navigationContext.bigTypeId, //异常大类ID
                "abnormalTypeID": navigationContext.smallTypeId, //异常小类ID
                "describe": context.describe,
                "feedBackPhone": userInfo.mobile || '',
                "feedbackMan": userInfo.realName || '',
                "source": "app",
                "fileInfos": files,
            }]
        };
        console.dump(params)

        api.call(config.apiUrl, params).ok((data) => {
            console.log("===success result：" + JSON.stringify(data));
            if (typeof cb === 'function') {
                cb(true);
            }
        }).fail((err) => {
            var errMsg = '提交失败！';
            if (typeof cb === 'function') {
                if (err.code) {
                    errMsg = err.error;
                }
                cb(false, errMsg);
            }
            console.log(JSON.stringify(err));

        })
    };
    /**
     * 初始化
     */
    ViewModel.prototype.init = function (obj) {
        this._item = new ObservableArray.ObservableArray();
        var obj = {
            images: [this.UPLOAD_BTN_IMG],
            waybillId: obj.waybillId || '',
            describe: ""
        };
        this._item = new DataItem(obj);
    };
    return ViewModel;
}());
exports.ViewModel = ViewModel;

var DataItem = (function (_super) {
    __extends(DataItem, _super);
    function DataItem(obj) {
        var _this = _super.call(this) || this;
        _this.waybillId = obj.waybillId;
        _this.datetime = obj.datetime;
        _this.consignee = obj.consignee;
        _this.consigneePhone = obj.consigneePhone;
        _this.slight = obj.slight;
        _this.general = obj.general;
        _this.describe = obj.describe;
        _this.images = obj.images;
        _this.seriousness = obj.seriousness;
        _this.abnormal_sign_y = obj.abnormal_sign_y;
        _this.abnormal_sign_n = obj.abnormal_sign_n;
        _this.accept_maintenance_y = obj.accept_maintenance_y;
        _this.accept_maintenance_n = obj.accept_maintenance_n || false;
        _this.rfe_y = obj.rfe_y || false;
        _this.rfe_n = obj.rfe_n || false;
        _this.maintenance_y = obj.maintenance_y || false;
        _this.maintenance_n = obj.maintenance_n || false;
        return _this;
    }

    Object.defineProperty(DataItem.prototype, "images", {
        get: function () {
            return this.get('_images');
        },
        set: function (value) {
            this.set('_images', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "describe", {
        get: function () {
            return this.get('_describe');
        },
        set: function (value) {
            this.set('_describe', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "waybillId", {
        get: function () {
            return this.get('_waybillId');
        },
        set: function (value) {
            this.set('_waybillId', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "datetime", {
        get: function () {
            return this.get('_datetime');
        },
        set: function (value) {
            this.set('_datetime', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "consignee", {
        get: function () {
            return this.get('_consignee');
        },
        set: function (value) {
            this.set('_consignee', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "consigneePhone", {
        get: function () {
            return this.get('_consigneePhone');
        },
        set: function (value) {
            this.set('_consigneePhone', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "slight", {
        get: function () {
            return this.get('_slight');
        },
        set: function (value) {
            this.set('_slight', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "general", {
        get: function () {
            return this.get('_general');
        },
        set: function (value) {
            this.set('_general', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "seriousness", {
        get: function () {
            return this.get('_seriousness');
        },
        set: function (value) {
            this.set('_seriousness', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "abnormal_sign_y", {
        get: function () {
            return this.get('_abnormal_sign_y');
        },
        set: function (value) {
            this.set('_abnormal_sign_y', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "abnormal_sign_n", {
        get: function () {
            return this.get('_abnormal_sign_n');
        },
        set: function (value) {
            this.set('_abnormal_sign_n', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "accept_maintenance_y", {
        get: function () {
            return this.get('_accept_maintenance_y');
        },
        set: function (value) {
            this.set('_accept_maintenance_y', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "accept_maintenance_n", {
        get: function () {
            return this.get('_accept_maintenance_n');
        },
        set: function (value) {
            this.set('_accept_maintenance_n', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "rfe_y", {
        get: function () {
            return this.get('_rfe_y');
        },
        set: function (value) {
            this.set('_rfe_y', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "rfe_n", {
        get: function () {
            return this.get('_rfe_n');
        },
        set: function (value) {
            this.set('_rfe_n', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "maintenance_y", {
        get: function () {
            return this.get('_maintenance_y');
        },
        set: function (value) {
            this.set('_maintenance_y', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "maintenance_n", {
        get: function () {
            return this.get('_maintenance_n');
        },
        set: function (value) {
            this.set('_maintenance_n', value);
        },
        enumerable: true,
        configurable: true
    });
    /*选择轻微*/
    DataItem.prototype.slightSelected = function () {
        var slight = this.get("slight");
        var general = this.get("general");
        var seriousness = this.get("seriousness");
        this.set("slight", !slight);
        this.set("general", false);
        this.set("seriousness", false);
    };
    /*选择一般*/
    DataItem.prototype.generalSelected = function () {
        var slight = this.get("slight");
        var general = this.get("general");
        var seriousness = this.get("seriousness");
        this.set("slight", false);
        this.set("general", !general);
        this.set("seriousness", false);
    };
    /*选择严重*/
    DataItem.prototype.seriousnessSelected = function () {
        var slight = this.get("slight");
        var general = this.get("general");
        var seriousness = this.get("seriousness");
        this.set("slight", false);
        this.set("general", false);
        this.set("seriousness", !seriousness);
    };
    /*异常签收*/
    DataItem.prototype.abnormalYesSelected = function () {
        var abnormal_sign_y = this.get("abnormal_sign_y");
        var abnormal_sign_n = this.get("abnormal_sign_n");
        this.set("abnormal_sign_n", false);
        this.set("abnormal_sign_y", !abnormal_sign_y);
    };
    /*不异常签收*/
    DataItem.prototype.abnormalNoSelected = function () {
        var abnormal_sign_y = this.get("abnormal_sign_y");
        var abnormal_sign_n = this.get("abnormal_sign_n");
        this.set("abnormal_sign_n", !abnormal_sign_n);
        this.set("abnormal_sign_y", false);
    };
    /*接受维修*/
    DataItem.prototype.acceptMaintenanceYesSelected = function () {
        var accept_maintenance_y = this.get("accept_maintenance_y");
        var accept_maintenance_n = this.get("accept_maintenance_n");
        this.set("accept_maintenance_y", !accept_maintenance_y);
        this.set("accept_maintenance_n", false);
    };
    /*不接受维修*/
    DataItem.prototype.acceptMaintenanceNoSelected = function () {
        var accept_maintenance_y = this.get("accept_maintenance_y");
        var accept_maintenance_n = this.get("accept_maintenance_n");
        this.set("accept_maintenance_y", false);
        this.set("accept_maintenance_n", !accept_maintenance_n);
    };
    /*补货*/
    DataItem.prototype.rfeYesSelected = function () {
        var rfe_y = this.get("rfe_y");
        var rfe_n = this.get("rfe_n");
        this.set("rfe_n", false);
        this.set("rfe_y", !rfe_y);
    };
    /*不补货*/
    DataItem.prototype.rfeNoSelected = function () {
        var rfe_y = this.get("rfe_y");
        var rfe_n = this.get("rfe_n");
        this.set("rfe_y", false);
        this.set("rfe_n", !rfe_n);
    };
    /*能维修*/
    DataItem.prototype.maintenanceYesSelected = function () {
        var maintenance_y = this.get("maintenance_y");
        var maintenance_n = this.get("maintenance_n");
        this.set("maintenance_n", false);
        this.set("maintenance_y", !maintenance_y);
    };
    /*不能维修*/
    DataItem.prototype.maintenanceNoSelected = function () {
        var maintenance_y = this.get("maintenance_y");
        var maintenance_n = this.get("maintenance_n");
        this.set("maintenance_y", false);
        this.set("maintenance_n", !maintenance_n);
    };
    return DataItem;
}(observable_1.Observable));
exports.DataItem = DataItem;