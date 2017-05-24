/**
 * Created by Administrator on 2017/4/21.
 */
const Observable = require("data/observable").Observable;
class ViewModel {
    constructor() {}

    init(areas) {
        var datailList=[];
        areas.forEach(eachprovince => {
            var citys = [];
            eachprovince.childNodes.forEach(eachcity => {
                var city = {
                    city_name: eachcity.name,
                    district: []
                };
                eachcity.childNodes.forEach(eachdistrict => {
                    var district = {
                        district_name: eachdistrict.name
                    }
                    city.district.push(district);
                });
                citys.push(city);

            });
            var province = {
                province: eachprovince.name,
                city: citys
            }
            datailList.push(province);
        });
        var data = {
            "detailList":datailList,
        }
        return new Observable(data);
    }
}

module.exports = ViewModel;