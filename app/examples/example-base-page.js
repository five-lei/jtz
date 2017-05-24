var pages = require("ui/page");
var platform = require("platform");
var prof = require("../common/profiling");
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
            if (!_this.sidedrawer) {
                var root = _this.content;
                var originalRootBindingContext = root.bindingContext;
                var menuPath = file_system_1.knownFolders.currentApp().path + "/examples/example-menu.xml";
                var menufragment = builder.load(menuPath, require("./example-menu"));
                _this.sidedrawer = menufragment.getViewById("example-menu-drawer");
                _this.content = menufragment;
                _this.sidedrawer.mainContent = root;
                if (root.bindingContext !== originalRootBindingContext) {
                    root.bindingContext = originalRootBindingContext;
                }
                _this.sidedrawer.drawerContent.bindingContext = _this.navigationContext;
            }
        });
        return _this;
    }
    ExamplePage.prototype.onLoaded = function () {
        var _this = this;
        _super.prototype.onLoaded.call(this);
        // prof.stopCPUProfile("example");
        prof.stop("example");
        this.actionBar.actionItems.getItems().forEach(function (item) {
            if (item.id === "exampleMenuButton") {
                item.on("tap", function () {
                    // TODO: Toggle instead
                    _this.sidedrawer.gesturesEnabled = true;
                    _this.sidedrawer.showDrawer();
                });
            }
        });
    };
    return ExamplePage;
}(pages.Page));
exports.ExamplePage = ExamplePage;
