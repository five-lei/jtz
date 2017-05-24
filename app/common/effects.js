var color_1 = require("color");

function loadedGuard(args, cb) {
    return function() {
        if (args.android || args.ios) {
            return cb.apply(this, arguments);
        }
        return undefined;
    };
}
exports.loadedGuard = loadedGuard;

function grayTouch(args) {
    var viewObject = args.object;
    switch (args.action) {
        case "up":
            if (!(--viewObject.gesturePoints)) {
                viewObject.animate({
                    // Get gray fast!
                    backgroundColor: new color_1.Color(0xFFEEEEEE),
                    duration: 1
                }).then(loadedGuard(viewObject, function() {
                    return viewObject.animate({
                        backgroundColor: new color_1.Color(0xFFFFFFFF),
                        duration: 300
                    });
                }));
            }
            break;
        case "down":
            viewObject.gesturePoints = (viewObject.gesturePoints || 0) + 1;
            viewObject.backgroundColor = new color_1.Color(0xFFEEEEEE);
            break;
        case "cancel":
            viewObject.gesturePoints = 0;
            viewObject.animate({
                backgroundColor: new color_1.Color(0xFFFFFFFF),
                duration: 300
            });
            break;
    }
}
exports.grayTouch = grayTouch;
