var config = require("../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var Observable = require("data/observable").Observable;


function AddCarViewModel(info,num,weight,carInsideLong, carInsideHigh,carInsideWidth,carLoadSpace) {
    info = info || {};

    // You can add properties to observables on creation
    var viewModel = new Observable({
        carNum: info.carNum || "",
        carLoadWeight: info.carLoadWeight || ""
    });
    viewModel.add = function() { 
        return fetch(config.courseArticle, {
            method: "POST",
            body: JSON.stringify({
                "name": "粤"+num,
                "carType": "van",
                "carLong": 0,
                "carLoadWeight": weight,
                "carInsideLong": carInsideLong,
                "carInsideWidth":carInsideWidth,
                "carInsideHigh": carInsideHigh,
                "carLoadSpace": carLoadSpace,
                "carCert": "",
                "carHeadPhoto": "",
                "carBodyPhoto": "",
                "carRearPhoto": "",
            }),
            headers: {
                "Authorization": "Bearer " + config.token,
                "Content-Type": "application/json"
            }
        })
        .then(handleErrors)
        .then(function(response) {

            return response.json();
        }).then(function(data) {
            console.log(JSON.stringify(data));
            var str = JSON.stringify(data);
            var cars = eval('(' + str + ')');
        });
    };

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = AddCarViewModel;