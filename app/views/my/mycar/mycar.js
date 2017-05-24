var frame = require("ui/frame")
var viewModel = require("../../../view-models/mycar-list-view-model");
var page;
var carList = new viewModel.ViewModel();

exports.loaded = function(args) { 
    thisPage = args.object;
    thisPage.bindingContext = carList;

    //  while (carList.length) {
    //         carList.pop();
    //  }
   
    // // carList.push(
    // //         { 
    // //              car_type: "粤", 
    // //              car_number: "S66666", 
    // //              car_length: "5.6米",
    // //              car_capacity: "25T",
    // //              car_name: "金杯面包车",
    // //              car_set:true
    // //         },
    // //         { 
    // //             car_type: "湘", 
    // //             car_number: "A88888", 
    // //             car_length: "8.8米",
    // //             car_capacity: "28T",
    // //             car_name: "奔驰面包车",
    // //             car_set:false
    // //        },
    // //        { 
    // //             car_type: "赣", 
    // //             car_number: "C99999", 
    // //             car_length: "7.6米",
    // //             car_capacity: "29T",
    // //             car_name: "奥迪面包车",
    // //             car_set:false
    // //        }
    // //     );

    //  pageData.set("carList", carList);   
    
};
// exports.pullToRefreshInitiated = function(args) {
//     page = args.object;
//     setTimeout(function() {
//         carList.push(
//                 { 
//                     car_id: "4",
//                     car_type: "粤", 
//                     car_number: "S66666", 
//                     car_length: "5.6米",
//                     car_capacity: "25T",
//                     car_name: "金杯面包车",
//                     car_set:true
//                }
//         );
//         page.getViewById("list-view").notifyPullToRefreshFinished();
//     }, 2000);
// };


function onBackTap(args) {
    frame.topmost().goBack();
}

function next_btn(args) {
   var navigationEntry = {
        moduleName: '/views/my/add_car/add_car'
    }
    frame.topmost().navigate(navigationEntry)
}


exports.onBackTap = onBackTap
exports.next_btn = next_btn