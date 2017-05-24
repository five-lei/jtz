var frame = require("ui/frame")
var page;
var dialogsModule = require("ui/dialogs");

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
};

function onBackTap(args) {
    frame.topmost().goBack();
}

function save(args) {
    var page = args.object.page;
    var tf_Long = page.getViewById("carInsideLong");
    var tf_height = page.getViewById("carInsideHigh");
    var tf_width = page.getViewById("carInsideWidth");
    var tf_space = page.getViewById("carLoadSpace");

    var carInsideLong = tf_Long.text;
    var carInsideHigh = tf_height.text;
    var carInsideWidth = tf_width.text;
    var carLoadSpace = tf_space.text;
    dialogsModule.alert({
    message: "长="+carInsideLong+"宽="+carInsideWidth+"高="+carInsideHigh+"空间="+carInsideLong,
    okButtonText: "OK"
    });
    var navigationEntry = {
        moduleName: 'views/my/add_car/add_car',
        context: {"carInsideLong": carInsideLong, "carInsideHigh": carInsideHigh, "carInsideWidth": carInsideWidth, "carLoadSpace": carLoadSpace,},
        clearHistory: true,
        animated: true
    }
    frame.topmost().navigate(navigationEntry)
}

exports.onBackTap = onBackTap
exports.save = save
