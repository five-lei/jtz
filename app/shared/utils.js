/**
 * 工具方法
 * Created by giscafer on 2017-05-09.
 */

/**
 * 根据本地图片获取图片名称
 * @param fileUri
 */
exports.extractImageName=function (fileUri) {
    var pattern = /[^/]*$/;
    var imageName = fileUri.match(pattern);

    return imageName;
}