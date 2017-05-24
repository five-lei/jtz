var pages = require("ui/page");
var platform = require("platform");
var prof = require("../../../common/profiling");
var builder = require("ui/builder");
var file_system_1 = require("file-system");

var clickState;
var WaybillTypeSelectedPage = (function (_super) {
    __extends(WaybillTypeSelectedPage, _super);
    function WaybillTypeSelectedPage() {
        var _this = _super.call(this) || this;
        // TODO: Hides the back button for iOS, check if this can be set in XML or with cross platform API.
        _this.on("navigatingTo", function (args) {
            if (!_this.sidedrawer) {
                var root = _this.content;
                var originalRootBindingContext = root.bindingContext;
                var menuPath = file_system_1.knownFolders.currentApp().path + "/views/task/history-task-filter/filter-type-options.xml";
                var menufragment = builder.load(menuPath, require("./filter-type-options"));
                _this.sidedrawer = menufragment.getViewById("filter-type-drawer");
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
    WaybillTypeSelectedPage.prototype.onLoaded = function () {
        var _this = this;
        var page=_this.page;
        _super.prototype.onLoaded.call(this);
        prof.stop("example");
        var filterButton=page.getViewById("waybill_type");
        filterButton.on("tap", function () {
            clickState = 1;
            _this.sidedrawer.gesturesEnabled = true;
            _this.sidedrawer.showDrawer();
        });

    };
    return WaybillTypeSelectedPage;
}(pages.Page));
exports.WaybillTypeSelectedPage = WaybillTypeSelectedPage;
