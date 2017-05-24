/**
 * Created by Administrator on 2017/4/1.
 */
/**
 * Created by Administrator on 2017/4/1.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable = require("data/observable");
var api=require('../../shared/api');
var dialogs_1 = require("ui/dialogs");
var config = require("../../shared/config");
/*二维码*/
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");

var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.barcodeScanner = new nativescript_barcodescanner_1.BarcodeScanner();

        return _this;
    }

    HelloWorldModel.prototype.doCheckAvailable = function () {
        this.barcodeScanner.available().then(function (avail) {
            dialogs_1.alert({
                title: "Scanning available?",
                message: avail ? "YES" : "NO",
                okButtonText: "OK"
            });
        }, function (err) {
            dialogs_1.alert(err);
        });
    };
    HelloWorldModel.prototype.doCheckHasCameraPermission = function () {
        this.barcodeScanner.hasCameraPermission().then(function (permitted) {
            dialogs_1.alert({
                title: "Has Camera permission?",
                message: permitted ? "YES" : "NO",
                okButtonText: "OK"
            });
        }, function (err) {
            dialogs_1.alert(err);
        });
    };
    HelloWorldModel.prototype.doRequestCameraPermission = function () {
        this.barcodeScanner.requestCameraPermission().then(function () {
            console.log("Camera permission requested");
        });
    };
    ;
    HelloWorldModel.prototype.doScanWithBackCamera = function () {
        this.scan(false, true);
    };
    ;
    HelloWorldModel.prototype.doScanWithFrontCamera = function () {
        this.scan(true, false);
    };
    ;
    HelloWorldModel.prototype.doScanWithTorch = function () {
        this.scan(false, true, true, "portrait");
    };
    ;
    HelloWorldModel.prototype.doScanPortrait = function () {
        this.scan(false, true, false, "portrait");
    };
    ;
    HelloWorldModel.prototype.doScanLandscape = function () {
        this.scan(false, true, false, "landscape");
    };
    ;
    HelloWorldModel.prototype.doContinuousScan = function () {
        this.barcodeScanner.scan({
            continuousScanCallback: function (result) {
                console.log(result.format + ": " + result.text);
            }
        });
    };
    ;
    HelloWorldModel.prototype.doContinuousScanMax3 = function () {
        var count = 0;
        console.log("-- in doContinuousScanMax3, count: " + count);
        var self = this;
        this.barcodeScanner.scan({
            reportDuplicates: false,
            continuousScanCallback: function (result) {
                count++;
                console.log(result.format + ": " + result.text + " (count: " + count + ")");
                if (count === 3) {
                    // funilly this is required on Android to reset the counter for a second run
                    count = 0;
                    self.barcodeScanner.stop();
                    setTimeout(function () {
                        dialogs_1.alert({
                            title: "Scanned 3 codes",
                            message: "Check the log for the results",
                            okButtonText: "Sweet!"
                        });
                    }, 1000);
                }
            }
        });
    };
    ;
    HelloWorldModel.prototype.scan = function (front, flip, torch, orientation) {
        this.barcodeScanner.scan({
            formats: "QR_CODE, EAN_13",
            cancelLabel: "EXIT. Also, try the volume buttons!",
            message: "请将条码置于取景框内扫描",
            preferFrontCamera: front,
            showFlipCameraButton: flip,
            showTorchButton: torch,
            torchOn: false,
            resultDisplayDuration: 500,
            orientation: orientation,
            beepOnScan: true,
            openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
        }).then(function (result) {
            console.log("--- scanned: " + result.text);
            // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
            setTimeout(function () {
                // if this alert doesn't show up please upgrade to {N} 2.4.0+
                dialogs_1.alert({
                    title: "Scan result",
                    message: "Format: " + result.format + ",\nValue: " + result.text,
                    okButtonText: "OK"
                });
            }, 500);
        }, function (errorMessage) {
            console.log("No scan. " + errorMessage);
        });
    };
    ;
    return HelloWorldModel;
}(observable.Observable));
exports.HelloWorldModel = HelloWorldModel;

