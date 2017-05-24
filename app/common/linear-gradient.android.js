var common = require("./linear-gradient-common");
global.moduleMerge(common, exports);
function drawBackground(view, colors, orientation) {
    var nativeView = view._nativeView;
    if (!nativeView) {
        throw new Error("Native view is not created yet!");
    }
    var backgroundDrawable = nativeView.getBackground();
    if (!(backgroundDrawable instanceof android.graphics.drawable.GradientDrawable)) {
        backgroundDrawable = new android.graphics.drawable.GradientDrawable();
        nativeView.setBackgroundDrawable(backgroundDrawable);
    }
    var LINEAR_GRADIENT = 0;
    var nativeColors = new Array();
    colors.forEach(function (color) {
        nativeColors.push(color.android);
    });
    backgroundDrawable.setColors(nativeColors);
    backgroundDrawable.setGradientType(LINEAR_GRADIENT);
    var androidOrientation = getAndroidOrientation(orientation);
    if (androidOrientation) {
        backgroundDrawable.setOrientation(androidOrientation);
    }
}
exports.drawBackground = drawBackground;
function getAndroidOrientation(orientation) {
    switch (orientation) {
        case common.Orientation.TopLeft_BottomRight:
            return android.graphics.drawable.GradientDrawable.Orientation.TL_BR;
        case common.Orientation.Left_Right:
            return android.graphics.drawable.GradientDrawable.Orientation.LEFT_RIGHT;
        case common.Orientation.BottomLeft_TopRight:
            return android.graphics.drawable.GradientDrawable.Orientation.BL_TR;
        case common.Orientation.Bottom_Top:
            return android.graphics.drawable.GradientDrawable.Orientation.BOTTOM_TOP;
        case common.Orientation.BottomRight_TopLeft:
            return android.graphics.drawable.GradientDrawable.Orientation.BR_TL;
        case common.Orientation.Right_Left:
            return android.graphics.drawable.GradientDrawable.Orientation.RIGHT_LEFT;
        case common.Orientation.TopRight_BottomLeft:
            return android.graphics.drawable.GradientDrawable.Orientation.TR_BL;
        case common.Orientation.Top_Bottom:
            return android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM;
    }
}
