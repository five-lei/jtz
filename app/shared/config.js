
// const baseUrl="http://192.168.1.74:12000";
// const baseUrl="http://119.23.150.232:11009";
//const baseUrl="http://10.0.3.2:12000";
//const baseUrl="http://192.168.1.10:5003";
// const baseUrl="http://192.168.1.51:12000";

/**
 * 准生产地址
 */
const baseUrl="http://119.23.150.232:11009";

module.exports = {
    appName: '家装通',
    ad: 'true',
    signPicNumber:6,//签收图片数量
    phone: "4006-006-111",
    apiUrl:baseUrl+"/api.do",
    loginUrl: baseUrl+"/login",
    uploadUrl: baseUrl+"/upload",
    appUploadImage: baseUrl+"/appUploadImage",
    registerValidateCode:baseUrl+"/userWorker"+"getRegisterValidateCode",
    localHost_list: baseUrl+"/queryTaskStatus/findTaskStatusCollects",
    collect: baseUrl+"/article/articleCollection",
    apiRed: "http://120.76.247.73:11020/old/im/queryUserInfoByloginAcct",
    addcar: "http://192.168.1.47:12000/car/add-car",
    addIMSession:baseUrl+"/imApp/masterTaskSession",
};