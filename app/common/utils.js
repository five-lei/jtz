/**
 * Created by giscafer on 2017-05-08.
 */

/**
 * 数组去重
 * @param arr
 * @return Array
 */
exports.uniq=function(arr){
    var result=[];
    var obj={};
    if(!arr) return result;

    for(var i=0;i<arr.length;i++){
        var temp=arr[i];
        if(temp!='' && obj[temp]!=1){
            obj[temp]=1;
            result.push(temp);
        }
    }
    console.dump(result)
    return result;
};