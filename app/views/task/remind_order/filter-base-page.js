var pages = require("ui/page");
var platform = require("platform");
var prof = require("../../../common/profiling");
var builder = require("ui/builder");
var file_system_1 = require("file-system");
var OVERLAY_ELEVATION = 12;
var CURVE = (platform.device.os === platform.platformNames.android) ? new android.view.animation.AccelerateDecelerateInterpolator() : UIViewAnimationCurve.UIViewAnimationCurveEaseInOut;
var ExamplePage = (function (_super) {
    __extends(ExamplePage, _super);
    function ExamplePage() {
        var _this = _super.call(this) || this;
        // TODO: Hides the back button for iOS, check if this can be set in XML or with cross platform API.
        _this.on("navigatingTo", function (args) {
            if (!_this.sidedrawer1) {
                var root = _this.content;
                var originalRootBindingContext = root.bindingContext;
                var menuPath = file_system_1.knownFolders.currentApp().path + "/views/task/remind_order/filter-menu.xml";
                console.log(menuPath+'1');
                var menufragment = builder.load(menuPath, require("./filter-menu"));
                _this.sidedrawer1 = menufragment.getViewById("example-menu-drawer1");
                _this.content = menufragment;
                _this.sidedrawer1.mainContent = root;
                if (root.bindingContext !== originalRootBindingContext) {
                    root.bindingContext = originalRootBindingContext;
                }
                _this.sidedrawer1.drawerContent.bindingContext = _this.navigationContext;
            }

            if (!_this.sidedrawer2) {
                var root = _this.content;
                var originalRootBindingContext = root.bindingContext;
                var menuPath = file_system_1.knownFolders.currentApp().path + "/views/task/remind_order/timer-menu.xml";
                console.log(menuPath+'2');
                var menufragment = builder.load(menuPath, require("./timer-menu"));
                _this.sidedrawer2 = menufragment.getViewById("example-menu-drawer2");
                _this.content = menufragment;
                _this.sidedrawer2.mainContent = root;
                if (root.bindingContext !== originalRootBindingContext) {
                    root.bindingContext = originalRootBindingContext;
                }
                _this.sidedrawer2.drawerContent.bindingContext = _this.navigationContext;
            }

            if (!_this.sidedrawer3) {
                var root = _this.content;
                var originalRootBindingContext = root.bindingContext;
                var menuPath = file_system_1.knownFolders.currentApp().path + "/views/task/remind_order/state-menu.xml";
                console.log(menuPath+'3');
                var menufragment = builder.load(menuPath, require("./state-menu"));
                _this.sidedrawer3 = menufragment.getViewById("example-menu-drawer3");
                _this.content = menufragment;
                _this.sidedrawer3.mainContent = root;
                if (root.bindingContext !== originalRootBindingContext) {
                    root.bindingContext = originalRootBindingContext;
                }
                _this.sidedrawer3.drawerContent.bindingContext = _this.navigationContext;
            }

            
        });
        return _this;
    }
    ExamplePage.prototype.onLoaded = function () {
        var _this = this;
        _super.prototype.onLoaded.call(this);
        // prof.stopCPUProfile("example");
        prof.stop("example");

        var btn1 = this.getViewById("exampleMenuButton1");
        var btn2 = this.getViewById("exampleMenuButton2");
        var btn3 = this.getViewById("exampleMenuButton3");
        btn1.on("tap", function () {
                    // TODO: Toggle instead
                    _this.sidedrawer1.gesturesEnabled = true;
                    _this.sidedrawer1.showDrawer();
        });

        btn2.on("tap", function () {
                    // TODO: Toggle instead
                    _this.sidedrawer2.gesturesEnabled = true;
                    _this.sidedrawer2.showDrawer();
        });

        btn3.on("tap", function () {
                    // TODO: Toggle instead
                    _this.sidedrawer3.gesturesEnabled = true;
                    _this.sidedrawer3.showDrawer();
        });
            
       
    };
    return ExamplePage;
}(pages.Page));
exports.ExamplePage = ExamplePage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS1iYXNlLXBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGFtcGxlLWJhc2UtcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBa0M7QUFRbEMsbUNBQXNDO0FBQ3RDLDBDQUE2QztBQUM3QyxvQ0FBdUM7QUFFdkMsMkNBQXlDO0FBR3pDLElBQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBQzNCLElBQUksS0FBSyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdDQUFnQyxFQUFFLEdBQUcsb0JBQW9CLENBQUMsNkJBQTZCLENBQUM7QUFFekw7SUFBaUMsK0JBQVU7SUFJdkM7UUFBQSxZQUNJLGlCQUFPLFNBa0JWO1FBaEJHLG1HQUFtRztRQUNuRyxLQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxVQUFBLElBQUk7WUFDeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQztnQkFDeEIsSUFBSSwwQkFBMEIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUNyRCxJQUFJLFFBQVEsR0FBRywwQkFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksR0FBRyw0QkFBNEIsQ0FBQztnQkFDN0UsSUFBSSxZQUFZLEdBQVMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDM0UsS0FBSSxDQUFDLFVBQVUsR0FBa0IsWUFBWSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUNqRixLQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztnQkFDNUIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNuQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxLQUFLLDBCQUEwQixDQUFDLENBQUEsQ0FBQztvQkFDcEQsSUFBSSxDQUFDLGNBQWMsR0FBRywwQkFBMEIsQ0FBQztnQkFDckQsQ0FBQztnQkFDRCxLQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDO1lBQzFFLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQzs7SUFDUCxDQUFDO0lBRU0sOEJBQVEsR0FBZjtRQUFBLGlCQWVDO1FBZEcsaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFFakIsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUM5QyxFQUFFLENBQUMsQ0FBTyxJQUFLLENBQUMsRUFBRSxLQUFLLG1CQUFtQixDQUFDLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUU7b0JBQ1gsdUJBQXVCO29CQUN2QixLQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7b0JBQ3ZDLEtBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2pDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQXpDRCxDQUFpQyxLQUFLLENBQUMsSUFBSSxHQXlDMUM7QUF6Q1ksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGFnZXMgPSByZXF1aXJlKFwidWkvcGFnZVwiKTtcclxuaW1wb3J0IGJ1dHRvbk1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9idXR0b25cIik7XHJcbmltcG9ydCBpbWFnZU1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9pbWFnZVwiKTtcclxuaW1wb3J0IGltYWdlU291cmNlTW9kdWxlID0gcmVxdWlyZShcImltYWdlLXNvdXJjZVwiKTtcclxuaW1wb3J0IHV0aWxzID0gcmVxdWlyZShcInV0aWxzL3V0aWxzXCIpO1xyXG5pbXBvcnQgZ3JpZE1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9sYXlvdXRzL2dyaWQtbGF5b3V0XCIpO1xyXG5pbXBvcnQgbmF2aWdhdG9yID0gcmVxdWlyZShcIi4uL2NvbW1vbi9uYXZpZ2F0b3JcIik7XHJcbmltcG9ydCB2aWV3ID0gcmVxdWlyZShcInVpL2NvcmUvdmlld1wiKTtcclxuaW1wb3J0IHBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xyXG5pbXBvcnQgcHJvZiA9IHJlcXVpcmUoXCIuLi9jb21tb24vcHJvZmlsaW5nXCIpO1xyXG5pbXBvcnQgYnVpbGRlciA9IHJlcXVpcmUoXCJ1aS9idWlsZGVyXCIpO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiXHJcbmltcG9ydCB7a25vd25Gb2xkZXJzfSBmcm9tIFwiZmlsZS1zeXN0ZW1cIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vc2lkZWRyYXdlclwiO1xyXG5cclxudmFyIE9WRVJMQVlfRUxFVkFUSU9OID0gMTI7XHJcbnZhciBDVVJWRSA9IChwbGF0Zm9ybS5kZXZpY2Uub3MgPT09IHBsYXRmb3JtLnBsYXRmb3JtTmFtZXMuYW5kcm9pZCkgPyBuZXcgYW5kcm9pZC52aWV3LmFuaW1hdGlvbi5BY2NlbGVyYXRlRGVjZWxlcmF0ZUludGVycG9sYXRvcigpIDogVUlWaWV3QW5pbWF0aW9uQ3VydmUuVUlWaWV3QW5pbWF0aW9uQ3VydmVFYXNlSW5PdXQ7XHJcblxyXG5leHBvcnQgY2xhc3MgRXhhbXBsZVBhZ2UgZXh0ZW5kcyBwYWdlcy5QYWdlIHtcclxuXHJcbiAgICBwcml2YXRlIHNpZGVkcmF3ZXI6IFJhZFNpZGVEcmF3ZXI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IEhpZGVzIHRoZSBiYWNrIGJ1dHRvbiBmb3IgaU9TLCBjaGVjayBpZiB0aGlzIGNhbiBiZSBzZXQgaW4gWE1MIG9yIHdpdGggY3Jvc3MgcGxhdGZvcm0gQVBJLlxyXG4gICAgICAgIHRoaXMub24oXCJuYXZpZ2F0aW5nVG9cIiwgYXJncyA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zaWRlZHJhd2VyKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm9vdCA9IHRoaXMuY29udGVudDtcclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFJvb3RCaW5kaW5nQ29udGV4dCA9IHJvb3QuYmluZGluZ0NvbnRleHQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVudVBhdGggPSBrbm93bkZvbGRlcnMuY3VycmVudEFwcCgpLnBhdGggKyBcIi9leGFtcGxlcy9leGFtcGxlLW1lbnUueG1sXCI7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVudWZyYWdtZW50ID0gPFZpZXc+YnVpbGRlci5sb2FkKG1lbnVQYXRoLCByZXF1aXJlKFwiLi9leGFtcGxlLW1lbnVcIikpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaWRlZHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+bWVudWZyYWdtZW50LmdldFZpZXdCeUlkKFwiZXhhbXBsZS1tZW51LWRyYXdlclwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudCA9IG1lbnVmcmFnbWVudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2lkZWRyYXdlci5tYWluQ29udGVudCA9IHJvb3Q7XHJcbiAgICAgICAgICAgICAgICBpZiAocm9vdC5iaW5kaW5nQ29udGV4dCAhPT0gb3JpZ2luYWxSb290QmluZGluZ0NvbnRleHQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJvb3QuYmluZGluZ0NvbnRleHQgPSBvcmlnaW5hbFJvb3RCaW5kaW5nQ29udGV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2lkZWRyYXdlci5kcmF3ZXJDb250ZW50LmJpbmRpbmdDb250ZXh0ID0gdGhpcy5uYXZpZ2F0aW9uQ29udGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkxvYWRlZCgpIHtcclxuICAgICAgICBzdXBlci5vbkxvYWRlZCgpO1xyXG5cclxuICAgICAgICAvLyBwcm9mLnN0b3BDUFVQcm9maWxlKFwiZXhhbXBsZVwiKTtcclxuICAgICAgICBwcm9mLnN0b3AoXCJleGFtcGxlXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmFjdGlvbkJhci5hY3Rpb25JdGVtcy5nZXRJdGVtcygpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgoPGFueT5pdGVtKS5pZCA9PT0gXCJleGFtcGxlTWVudUJ1dHRvblwiKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm9uKFwidGFwXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBUb2dnbGUgaW5zdGVhZFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2lkZWRyYXdlci5nZXN0dXJlc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2lkZWRyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==