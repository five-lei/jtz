var pages = require("ui/page");
var platform = require("platform");
var prof = require("../../../common/profiling");
var builder = require("ui/builder");
var file_system_1 = require("file-system");
var isAndroid = platform.device.os === platform.platformNames.android;

var TaskMainPage = (function (_super) {
    __extends(TaskMainPage, _super);
    function TaskMainPage() {
        var _this = _super.call(this) || this;
        // TODO: Hides the back button for iOS, check if this can be set in XML or with cross platform API.
        _this.on("navigatingTo", function (args) {
            if (!_this.sidedrawer) {
                var root = _this.content;
                var originalRootBindingContext = root.bindingContext;
                var menuPath = file_system_1.knownFolders.currentApp().path + "/views/task/taskSpec/filter-options.xml";
                var menufragment = builder.load(menuPath, require("./filter-options"));
                _this.sidedrawer = menufragment.getViewById("filter-options-drawer");
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
    TaskMainPage.prototype.tapOrderTask = function () {
        console.log('tapOrderTask')
    }
    TaskMainPage.prototype.onLoaded = function (args) {
        var _this = this;
        var page=_this.page;
        _super.prototype.onLoaded.call(this);
        // prof.stopCPUProfile("example");
        prof.stop("example");
        var filterButton=page.getViewById( "filterMenuButton");
        //android
        if(isAndroid){
            filterButton.on("tap", function () {
                // TODO: Toggle instead
                _this.sidedrawer.gesturesEnabled = true;
                _this.sidedrawer.showDrawer();
            });
        }else{
            //ios
            filterButton.on("tap", function () {
                // TODO: Toggle instead
                _this.sidedrawer.gesturesEnabled = true;
                _this.sidedrawer.showDrawer();
            });
        }


    };
    return TaskMainPage;
}(pages.Page));
exports.TaskMainPage = TaskMainPage;
