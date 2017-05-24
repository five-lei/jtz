/**
 * Created by Administrator on 2017/4/1.
 */
/**
 * Created by Administrator on 2017/4/1.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var dialogs_1 = require("ui/dialogs");
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
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTJDO0FBQzNDLHNDQUFpQztBQUNqQywyRUFBMkQ7QUFFM0Q7SUFBcUMsbUNBQVU7SUFJN0M7UUFBQSxZQUNFLGlCQUFPLFNBRVI7UUFEQyxLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksNENBQWMsRUFBRSxDQUFDOztJQUM3QyxDQUFDO0lBRU0sMENBQWdCLEdBQXZCO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFLO1lBQ3pDLGVBQUssQ0FBQztnQkFDSixLQUFLLEVBQUUscUJBQXFCO2dCQUM1QixPQUFPLEVBQUUsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJO2dCQUM3QixZQUFZLEVBQUUsSUFBSTthQUNuQixDQUFDLENBQUM7UUFDTCxDQUFDLEVBQUUsVUFBQyxHQUFHO1lBQ0wsZUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sb0RBQTBCLEdBQWpDO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLFNBQVM7WUFDdkQsZUFBSyxDQUFDO2dCQUNKLEtBQUssRUFBRSx3QkFBd0I7Z0JBQy9CLE9BQU8sRUFBRSxTQUFTLEdBQUcsS0FBSyxHQUFHLElBQUk7Z0JBQ2pDLFlBQVksRUFBRSxJQUFJO2FBQ25CLENBQUMsQ0FBQztRQUNMLENBQUMsRUFBRSxVQUFDLEdBQUc7WUFDTCxlQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxtREFBeUIsR0FBaEM7UUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLHVCQUF1QixFQUFFLENBQUMsSUFBSSxDQUNoRDtZQUNFLE9B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QUEyQyxFQUFFLElBQUksQ0FBQyxtRkFBbUY7U0FDdEksQ0FBQyxDQUFDLElBQUksQ0FDTCxVQUFTLE1BQU07WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsK0ZBQStGO1lBQy9GLFVBQVUsQ0FBQztnQkFDVCw2REFBNkQ7Z0JBQzdELGVBQUssQ0FBQztvQkFDSixLQUFLLEVBQUUsYUFBYTtvQkFDcEIsT0FBTyxFQUFFLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSTtvQkFDaEUsWUFBWSxFQUFFLElBQUk7aUJBQ25CLENBQUMsQ0FBQztZQUNMLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNWLENBQUMsRUFDRCxVQUFTLFlBQVk7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBQUEsQ0FBQztJQUNKLHNCQUFDO0FBQUQsQ0FBQyxBQTdIRCxDQUFxQyx1QkFBVSxHQTZIOUM7QUE3SFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHthbGVydH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHtCYXJjb2RlU2Nhbm5lcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhlbGxvV29ybGRNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xyXG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBiYXJjb2RlU2Nhbm5lcjogQmFyY29kZVNjYW5uZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuYmFyY29kZVNjYW5uZXIgPSBuZXcgQmFyY29kZVNjYW5uZXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkb0NoZWNrQXZhaWxhYmxlKCkge1xyXG4gICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5hdmFpbGFibGUoKS50aGVuKChhdmFpbCkgPT4ge1xyXG4gICAgICBhbGVydCh7XHJcbiAgICAgICAgdGl0bGU6IFwiU2Nhbm5pbmcgYXZhaWxhYmxlP1wiLFxyXG4gICAgICAgIG1lc3NhZ2U6IGF2YWlsID8gXCJZRVNcIiA6IFwiTk9cIixcclxuICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxyXG4gICAgICB9KTtcclxuICAgIH0sIChlcnIpID0+IHtcclxuICAgICAgYWxlcnQoZXJyKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRvQ2hlY2tIYXNDYW1lcmFQZXJtaXNzaW9uKCkge1xyXG4gICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5oYXNDYW1lcmFQZXJtaXNzaW9uKCkudGhlbigocGVybWl0dGVkKSA9PiB7XHJcbiAgICAgIGFsZXJ0KHtcclxuICAgICAgICB0aXRsZTogXCJIYXMgQ2FtZXJhIHBlcm1pc3Npb24/XCIsXHJcbiAgICAgICAgbWVzc2FnZTogcGVybWl0dGVkID8gXCJZRVNcIiA6IFwiTk9cIixcclxuICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxyXG4gICAgICB9KTtcclxuICAgIH0sIChlcnIpID0+IHtcclxuICAgICAgYWxlcnQoZXJyKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRvUmVxdWVzdENhbWVyYVBlcm1pc3Npb24oKSB7XHJcbiAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnJlcXVlc3RDYW1lcmFQZXJtaXNzaW9uKCkudGhlbihcclxuICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDYW1lcmEgcGVybWlzc2lvbiByZXF1ZXN0ZWRcIik7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIGRvU2NhbldpdGhCYWNrQ2FtZXJhKCkge1xyXG4gICAgdGhpcy5zY2FuKGZhbHNlLCB0cnVlKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgZG9TY2FuV2l0aEZyb250Q2FtZXJhKCkge1xyXG4gICAgdGhpcy5zY2FuKHRydWUsIGZhbHNlKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgZG9TY2FuV2l0aFRvcmNoKCkge1xyXG4gICAgdGhpcy5zY2FuKGZhbHNlLCB0cnVlLCB0cnVlLCBcInBvcnRyYWl0XCIpO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBkb1NjYW5Qb3J0cmFpdCgpIHtcclxuICAgIHRoaXMuc2NhbihmYWxzZSwgdHJ1ZSwgZmFsc2UsIFwicG9ydHJhaXRcIik7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIGRvU2NhbkxhbmRzY2FwZSgpIHtcclxuICAgIHRoaXMuc2NhbihmYWxzZSwgdHJ1ZSwgZmFsc2UsIFwibGFuZHNjYXBlXCIpO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBkb0NvbnRpbnVvdXNTY2FuKCkge1xyXG4gICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5zY2FuKHtcclxuICAgICAgY29udGludW91c1NjYW5DYWxsYmFjazogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5mb3JtYXQgKyBcIjogXCIgKyByZXN1bHQudGV4dCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBkb0NvbnRpbnVvdXNTY2FuTWF4MygpIHtcclxuICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICBjb25zb2xlLmxvZyhcIi0tIGluIGRvQ29udGludW91c1NjYW5NYXgzLCBjb3VudDogXCIgKyBjb3VudCk7XHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnNjYW4oe1xyXG4gICAgICByZXBvcnREdXBsaWNhdGVzOiBmYWxzZSxcclxuICAgICAgY29udGludW91c1NjYW5DYWxsYmFjazogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LmZvcm1hdCArIFwiOiBcIiArIHJlc3VsdC50ZXh0ICsgXCIgKGNvdW50OiBcIiArIGNvdW50ICsgXCIpXCIpO1xyXG4gICAgICAgIGlmIChjb3VudCA9PT0gMykge1xyXG4gICAgICAgICAgLy8gZnVuaWxseSB0aGlzIGlzIHJlcXVpcmVkIG9uIEFuZHJvaWQgdG8gcmVzZXQgdGhlIGNvdW50ZXIgZm9yIGEgc2Vjb25kIHJ1blxyXG4gICAgICAgICAgY291bnQgPSAwO1xyXG4gICAgICAgICAgc2VsZi5iYXJjb2RlU2Nhbm5lci5zdG9wKCk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhbGVydCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IFwiU2Nhbm5lZCAzIGNvZGVzXCIsXHJcbiAgICAgICAgICAgICAgbWVzc2FnZTogXCJDaGVjayB0aGUgbG9nIGZvciB0aGUgcmVzdWx0c1wiLFxyXG4gICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJTd2VldCFcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBzY2FuKGZyb250OiBib29sZWFuLCBmbGlwOiBib29sZWFuLCB0b3JjaD86IGJvb2xlYW4sIG9yaWVudGF0aW9uPzogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnNjYW4oe1xyXG4gICAgICBmb3JtYXRzOiBcIlFSX0NPREUsIEVBTl8xM1wiLFxyXG4gICAgICBjYW5jZWxMYWJlbDogXCJFWElULiBBbHNvLCB0cnkgdGhlIHZvbHVtZSBidXR0b25zIVwiLCAvLyBpT1Mgb25seSwgZGVmYXVsdCAnQ2xvc2UnXHJcbiAgICAgIG1lc3NhZ2U6IFwiVXNlIHRoZSB2b2x1bWUgYnV0dG9ucyBmb3IgZXh0cmEgbGlnaHRcIiwgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IGlzICdQbGFjZSBhIGJhcmNvZGUgaW5zaWRlIHRoZSB2aWV3ZmluZGVyIHJlY3RhbmdsZSB0byBzY2FuIGl0LidcclxuICAgICAgcHJlZmVyRnJvbnRDYW1lcmE6IGZyb250LCAgICAgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IGZhbHNlXHJcbiAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiBmbGlwLCAgIC8vIGRlZmF1bHQgZmFsc2VcclxuICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0b3JjaCwgICAgICAgLy8gaU9TIG9ubHksIGRlZmF1bHQgZmFsc2VcclxuICAgICAgdG9yY2hPbjogZmFsc2UsICAgICAgICAgICAgICAgLy8gbGF1bmNoIHdpdGggdGhlIGZsYXNobGlnaHQgb24gKGRlZmF1bHQgZmFsc2UpXHJcbiAgICAgIHJlc3VsdERpc3BsYXlEdXJhdGlvbjogNTAwLCAgIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCAxNTAwIChtcyksIHNldCB0byAwIHRvIGRpc2FibGUgZWNob2luZyB0aGUgc2Nhbm5lZCB0ZXh0XHJcbiAgICAgIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvbiwgICAgIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCB1bmRlZmluZWQgKHNlbnNvci1kcml2ZW4gb3JpZW50YXRpb24pLCBvdGhlciBvcHRpb25zOiBwb3J0cmFpdHxsYW5kc2NhcGVcclxuICAgICAgYmVlcE9uU2NhbjogdHJ1ZSwgICAgICAgICAgICAgLy8gUGxheSBvciBTdXBwcmVzcyBiZWVwIG9uIHNjYW4gKGRlZmF1bHQgdHJ1ZSlcclxuICAgICAgb3BlblNldHRpbmdzSWZQZXJtaXNzaW9uV2FzUHJldmlvdXNseURlbmllZDogdHJ1ZSAvLyBPbiBpT1MgeW91IGNhbiBzZW5kIHRoZSB1c2VyIHRvIHRoZSBzZXR0aW5ncyBhcHAgaWYgYWNjZXNzIHdhcyBwcmV2aW91c2x5IGRlbmllZFxyXG4gICAgfSkudGhlbihcclxuICAgICAgZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0gc2Nhbm5lZDogXCIgKyByZXN1bHQudGV4dCk7XHJcbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoaXMgUHJvbWlzZSBpcyBuZXZlciBpbnZva2VkIHdoZW4gYSAnY29udGludW91c1NjYW5DYWxsYmFjaycgZnVuY3Rpb24gaXMgcHJvdmlkZWRcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgLy8gaWYgdGhpcyBhbGVydCBkb2Vzbid0IHNob3cgdXAgcGxlYXNlIHVwZ3JhZGUgdG8ge059IDIuNC4wK1xyXG4gICAgICAgICAgYWxlcnQoe1xyXG4gICAgICAgICAgICB0aXRsZTogXCJTY2FuIHJlc3VsdFwiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkZvcm1hdDogXCIgKyByZXN1bHQuZm9ybWF0ICsgXCIsXFxuVmFsdWU6IFwiICsgcmVzdWx0LnRleHQsXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICB9LFxyXG4gICAgICBmdW5jdGlvbihlcnJvck1lc3NhZ2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHNjYW4uIFwiICsgZXJyb3JNZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9O1xyXG59Il19