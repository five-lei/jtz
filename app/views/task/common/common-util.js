/**
 * Created by giscafer on 2017/3/27.
 * 公用方法
 * 接口对接请单独写文件再require进来调用，避免代码过多
 */
var color = require("color");
var dialogsModule = require("ui/dialogs");
var DatePickerManager = require("nativescript-timedatepicker");
var phone = require("nativescript-phone");
var frameModule = require("ui/frame");

var navigator = require("../../../common/navigator");
var dialogsUtil = require("../../../common/dialogsUtil");
var moment = require('moment');
var topmost = frameModule.topmost();

var api = require("../../../shared/api");
var config = require("../../../shared/config");
var taskUtil = require("./taskUtil");
var task_view_model = require("../view-model");
var aliSDK = require("nativescript-ali");
var application = require("application");

function CommonUtil() {
}


/**
 * 任务首页segmentBard点击事件处理
 * @param args
 */
CommonUtil.prototype.segmentBarTaskTap = function (args) {
    var oldIndex = args.oldIndex;
    var index = args.newIndex;
    if (oldIndex === index || oldIndex == undefined) return;
    switch (index) {
        case 0:
            topmost.navigate(
                {
                    moduleName: "views/task/index",
                    animated: false,
                    clearHistory: true
                }
            );
            break;
        case 1:
            topmost.navigate(
                {
                    moduleName: "views/task/maintenance-task/maintenance-task",
                    animated: false,
                    clearHistory: true
                }
            );
            break;
        case 2:
            topmost.navigate(
                {
                    moduleName: "views/task/return-task/return-task",
                    animated: false,
                    clearHistory: true
                }
            );
            break;

    }
};
/**
 * 返回按钮
 * @param args
 */
CommonUtil.prototype.onBackTap = function (args) {
    navigator.navigateBack();
}

/**
 * IM聊天
 * @param args
 */
CommonUtil.prototype.tapContactService = function (args) {
    try {
        var object = args.object;
        var taskId = getPropertyOfObj(object, 'taskId');
        var imGroupId;
        var groupTitle;
        console.log('taskId=' + taskId)
        // api.call(config.addIMSession, {"taskId": taskId}).ok((data) => {
        var qureyParams = {
            "name": "IMAppController.masterTaskSession",
            "args": [{"taskId": taskId}]
        };
        api.call(config.apiUrl, qureyParams).ok((data) => {
            var result = data.result || {};
            console.dump(result);
            imGroupId = result.imGroupId;
            groupTitle = result.groupTitle;
            var navigationEntry = {
                moduleName: '/views/message/chat-view/chat-view',
                context: {
                    "name": groupTitle,
                    "groupId": imGroupId
                },
            };
            console.dump(navigationEntry);

            frameModule.topmost().navigate(navigationEntry);
        }).fail((err) => {
            var options = {
                title: "提示",
                message: "聊天接入失败！",
                okButtonText: "确定"
            };
            dialogsModule.alert(options).then(() => {
            });
            console.dump(err);
            console.log("##############api.call  error  end#############");
        });
    } catch (e) {
        alert(e);
    }
};

/**
 * 联系客服（默认电话）
 * @param args
 */
CommonUtil.prototype.callToService = function (args) {
    phone.dial(config.phone, false);
}

/**
 * 打电话给收货人
 * @param args
 */
CommonUtil.prototype.callToConsignee = function (args) {
    var text = args.object.text;
    var callToConsignee = args.object.callToConsignee;
    if (callToConsignee) {
        phone.dial(callToConsignee, false);
    } else if (text) {
        var phoneNumber = text.replace('(', '').replace(')', '')
        phone.dial(phoneNumber, false);
    }

}
/**
 * 电话 label
 * @param args
 */
CommonUtil.prototype.callToDial = function (args) {
    var phoneNumber = null;
    var id = args.object.id;
    var text = args.object.text;
    if (text) {
        //提货电话
        if (id == 'pickupPhone') {
            phoneNumber = text.replace('提货电话：', '');
        } else if (id == 'receivePersonPhone') {//收货电话
            phoneNumber = text.replace('(', '').replace(')', '')
        }
    }
    console.log('phoneNumber' + phoneNumber);
    if (phoneNumber) {
        phone.dial(phoneNumber, false);
    }
};

/**
 * 电话 按钮
 */
CommonUtil.prototype.tapCallHandler = function (args, num) {
    var pickupPhone = "";
    var page = args.object.page;
    var grid = args.object.parent.parent;
    //获取当前
    var listId = grid.id.replace('_operate', '');
    var currentTask = page.getViewById(listId);

    var pickupPhoneView = currentTask.getViewById("pickupPhone");
    if (pickupPhoneView) {
        pickupPhone = pickupPhoneView.text.replace('提货电话：', '');
    }

    var receivePersonPhone = currentTask.getViewById("receivePersonPhone").text.replace('(', '').replace(')', '');

    page.showModal('/views/task/modal-page/call-select-modal', {
        "pickupPhone": pickupPhone,
        "receivePersonPhone": receivePersonPhone
    }, function (selectedItem) {
        console.log("selectedItem = " + selectedItem);
    }, false);
};

/**
 * 导航 label
 * @param args
 */
CommonUtil.prototype.tapNavigateByAddr = function (args) {
    var address = null;
    var id = args.object.id;
    var text = args.object.text;
    if (text) {
        //提货电话
        if (id == 'pickupAddress') {
            address = text.replace('提货地址：', '');
        } else if (id == 'receiveAddress') {//收货电话
            address = text.replace('收货地址：', '');
        }
    }

    if (address) {
        //TODO
        console.log('导航address:' + address);
    }
};


/**
 * 导航 按钮
 * @param args
 */
CommonUtil.prototype.tapNavigateHandler = function (args) {
    var page = args.object.page;
    var currentTask, receiveAddress = "", pickupAddress = "";
    //详情页
    if (args.object.detail == 'detail') {
        currentTask = page;
    } else {
        var grid = args.object.parent.parent;
        var listId = grid.id.replace('_operate', '');
        currentTask = page.getViewById(listId);
    }

    //获取当前
    var pickupAddrView = currentTask.getViewById("pickupAddress");
    var receiveAddrView = currentTask.getViewById("receiveAddress");

    if (pickupAddrView) {
        pickupAddress = pickupAddrView.text.replace('提货地址：', '');
    }
    if (receiveAddrView) {
        receiveAddress = receiveAddrView.text.replace('收货地址：', '');
    }

    page.showModal('/views/task/modal-page/addr-select-modal', {
        "pickupAddress": pickupAddress,
        "receiveAddress": receiveAddress
    }, function (selectedItem) {
        console.log("selectedItem = " + selectedItem);
    }, false);
};

/**
 * 给TA
 */
CommonUtil.prototype.tapGTHandler = function (args) {
    var obj = args.object;
    var taskId = getPropertyOfObj(obj, 'taskId');
    var navigationEntry = {
        moduleName: "views/task/friends-list/friends-list",
        //传值：任务ID
        context: {
            taskId: taskId
        },
        animated: true
    };
    topmost.navigate(navigationEntry);
};
/**
 * 问题反馈
 * @param args
 */
CommonUtil.prototype.tapQuestionFeedback = function (args) {
    var obj = args.object;
    var waybillId = getPropertyOfObj(obj, 'waybillId');
    var navigationEntry = {
        moduleName: "views/task/question-feedback/question-feedback",
        context: {"waybillId": waybillId},
        animated: true
    };
    topmost.navigate(navigationEntry);
}


/**
 * 受理按钮事件
 */
CommonUtil.prototype.tapAcceptTask = function (args) {
    var obj = args.object;
    var page = obj.page;
    var curPage = page.curPage;
    var isInDetail = getPropertyOfObj(obj, 'isInDetail');//详情页
    var taskId = getPropertyOfObj(obj, 'taskId');
    var taskType = getPropertyOfObj(obj, 'taskType');//任务类型标识
    var from = getPropertyOfObj(obj, 'from');
    var options = {
        title: "提示",
        message: "是否确认受理运单？",
        okButtonText: "确认",
        cancelButtonText: "取消",
    };
    dialogsModule.confirm(options).then((result) => {
        //taskType==0 新任务
        if (result && taskType == 0) {
            task_view_model.accept(page, taskId, function (res) {
                if (res) {
                    successHandler(true,curPage);
                } else {
                    //受理失败
                    dialogsUtil.alert("受理失败");
                }
            });
        } else if (result && taskType == "aftermarket") { //维修返货受理
            //查询参数
            var qureyParams = {
                "name": "aftermarketTaskController.acceptance",
                "args": [{"taskId": taskId}]
            };
            api.call(config.apiUrl, qureyParams).ok((data) => {
                successHandler(false,curPage);

            }).fail((err) => {
                dialogsUtil.alert("受理失败");
                console.log(JSON.stringify(err));
            })
        }
    });
    /**
     * 成功回调
     */
    function successHandler(flag,curPage){

        //详情页会自动跳转下一个节点
        if(!flag && isInDetail=='yes'){
            //维修预约节点
            var detailType="maintenance_waiting_appointment";
            if(from && from.indexOf('return_')!==-1){
                //返货提货节点
                detailType="return_waiting_pickup";
            }
            taskUtil.navigateToAfterMarketTaskDetail(detailType,taskId,curPage);
            dialogsUtil.alert("受理成功");

        }else if(flag && isInDetail=='yes'){//新任务预约
            taskUtil.navigateToNewTaskDetail("waiting_appointment",taskId,curPage);
        }else{
            removeByTaskId(page, taskId);
        }
    }
};
/**
 * 取消任务按钮事件
 */
CommonUtil.prototype.tapCancelTask = function (args) {
    var page = args.object.page;
    var curPage = page.curPage;
    var obj = args.object;
    var isInDetail = getPropertyOfObj(obj, 'isInDetail');//是否为详情页
    var taskId = getPropertyOfObj(obj, 'taskId');
    var taskType = getPropertyOfObj(obj, 'taskType');//新任务状态标识
    page.showModal('/views/task/modal-page/cancel-task-modal', {
        "reasonText": "page"
    }, function (flag,reasonText) {
        if(!flag) return;
        if(!reasonText){
            dialogsUtil.alert('请填写取消原因！');
            return;
        }
        console.log("reasonText = " + reasonText);
        if (taskType == 0) {
            task_view_model.cancelDis(taskId, function (res) {
                if (res) {
                    //取消成功
                    if(isInDetail){
                        taskUtil.navigateToNewTaskDetail("cancelled",taskId,curPage);
                    }else{
                        removeByTaskId(page, taskId);
                    }
                } else {
                    dialogsUtil.alert('取消失败！')
                }
            }, reasonText);
        }

    }, false);

};

if (application.android) {
    application.android.on(application.AndroidApplication.activityCreatedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity + ", Bundle: " + args.bundle);
    });

    application.android.on(application.AndroidApplication.activityDestroyedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });

    application.android.on(application.AndroidApplication.activityStartedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });

    application.android.on(application.AndroidApplication.activityPausedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });

    application.android.on(application.AndroidApplication.activityResumedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });

    application.android.on(application.AndroidApplication.activityStoppedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });

    application.android.on(application.AndroidApplication.saveActivityStateEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity + ", Bundle: " + args.bundle);
    });

    application.android.on(application.AndroidApplication.activityResultEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity +
            ", requestCode: " + args.requestCode + ", resultCode: " + args.resultCode + ", Intent: " + args.intent);
    });

    application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
        // Set args.cancel = true to cancel back navigation and do something custom.
    });
}
/**
 * tmaill 喵任务签收
 * @param obj 按钮对象
 * @param taskId 任务ID
 * @param waybillId 运单号
 */      
function tapTmallReceiveTask(obj,taskId,waybillId) {
    var orderSourceCode=getPropertyOfObj(obj,'orderSourceCode'); //天猫订单单号
    var serviceTypeTmall=getPropertyOfObj(obj,'serviceTypeTmall'); //天猫服务类型编码
    var sourceType=getPropertyOfObj(obj,'sourceType'); //订单类型（天猫、极有家）
    //var serviceType=getPropertyOfObj(obj,'serviceType'); //运单服务类型
    var serviceType = "0";
    //判断服务类型
    switch(sourceType){
       case "tmallhome":
        if (serviceTypeTmall=="homebranchservice" && serviceTypeTmall=="hometrunckandbranchandinstallservice") {
				serviceType = "0";
		}
        break;

       case "tmallbuilding":
        if (serviceTypeTmall=="Bathroombranchservice" || serviceTypeTmall=="floorbranchservice") {
				serviceType = "2";
		} else if (serviceTypeTmall=="Bathroominstallservice" || serviceTypeTmall=="floorinstallservice") {
				serviceType = "3";
		}else {

		}
        break;

        case "tmalljiyoujia": 
        if (serviceTypeTmall=="hometrunckandbranchandinstallservice"){
				serviceType = "11";
		} else if (serviceTypeTmall=="Bathroombranchservice") {
				serviceType = "12";
		}else {

		}
        break;
    }
    //内部订单号
    var outerId = waybillId;
    //天猫父订单号，校验必须存在
    var orderIds = orderSourceCode;

    console.log("serviceTypeTmall: "+serviceTypeTmall);
    console.log("sourceType: "+sourceType);
    console.log("orderIds: "+orderIds);
    console.log("serviceType: "+serviceType);
    console.log("outerId: "+outerId);
    //服务商标识2460294756  注意，别改动
    var tpid = "2460294756";
    //是否需要已setResult(RESULT_OK, intent)返回
    var requestCode = 8888;
    aliSDK.sign(application.android.foregroundActivity, outerId, orderIds, tpid, parseInt(serviceType), requestCode);
};


/**
 * 新任务签收按钮事件
 */
CommonUtil.prototype.tapReceiveTask = function (args) {
    var obj = args.object;
    var curPage = getPropertyOfObj(obj, 'curPage');
    var tmail = getPropertyOfObj(obj, 'tmail');
    var from = getPropertyOfObj(obj, 'from');
    var isInDetail = getPropertyOfObj(obj, 'isInDetail');//是否为详情页
    var waybillId = getPropertyOfObj(obj, 'waybillId');
    var taskId = getPropertyOfObj(obj, 'taskId');

    if (tmail) {
        //喵订单签收
        tapTmallReceiveTask(obj, taskId, waybillId);
        return;
    }

    var receivePersonName = getPropertyOfObj(obj, 'receivePersonName');
    var receivePersonPhone = getPropertyOfObj(obj, 'receivePersonPhone');
    var navigationEntry = {
        moduleName: "views/task/receive-task/receive-task",
        context: {
            "taskId": taskId,
            "waybillId": waybillId,
            "isInDetail": isInDetail,
            "receivePersonName": receivePersonName,
            "receivePersonPhone": receivePersonPhone,
            "curPage":curPage,
        },
        animated: true
    };
    if (from && from.indexOf('return_') !== -1) {
        //返货签收
        navigationEntry['moduleName'] = "views/task/return-receive/return-receive";
    } else if (from && from.indexOf('maintenance_') !== -1) {

        navigationEntry['context']['maintenance'] = true;
        navigationEntry['context']['installFee'] = obj.parent.installFee || "";
        navigationEntry['context']['appointmentTime'] = obj.parent.appointmentTime || "";
        navigationEntry['context']['userWorkerId'] = obj.parent.userWorkerId || "";
    }
    // console.dump(navigationEntry)
    topmost.navigate(navigationEntry);
};

/**
 * 预约处理
 */
CommonUtil.prototype.tapOrderTask = function (args) {
    var obj = args.object;
    var page = obj.page;
    var curPage = page.curPage;
    var isInDetail = getPropertyOfObj(obj, 'isInDetail');
    var from = getPropertyOfObj(obj, 'from');
    var taskId = getPropertyOfObj(obj, 'taskId');
    var taskType = getPropertyOfObj(obj, 'taskType');//新任务状态标识
    //获取预约时间
    showDateDialog((date) => {
        var scheduleMoment = moment(date, "DD MM YYYY HH:mm z");
        var scheduleJS = scheduleMoment.toDate();
        var dateTime = moment(scheduleJS).format('YYYY-MM-DD HH:mm:ss');
        var nowDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        if(nowDate>=dateTime){
            dialogsUtil.alert('预约时间必须大于当前时间！');
            return;
        }
        console.log('预约选择时间'+dateTime)

        if (from != undefined && from.indexOf('maintenance_')!==-1) { //来自维修任务
            var qureyParams = {
                "name": "aftermarketTaskController.reservation",
                "args": [{"taskId": taskId, "appointmentTime": dateTime}]
            };
            api.call(config.apiUrl, qureyParams).ok((data) => {
                //预约成功
                successHandler(false,curPage);
            }).fail((err) => {
                dialogsUtil.alert("预约失败");
                console.log(JSON.stringify(err));
            });
        } else {
            //新任务预约
            if (taskType == 0) {
                task_view_model.appointment(taskId, function (res) {
                    if (res) {
                        //预约成功
                        successHandler(true,curPage);
                    } else {
                        //预约失败
                        dialogsUtil.alert("预约失败");
                    }
                }, dateTime);
            }

        }
    });

    /**
     * 成功回调
     * @param flag=true为新任务
     */
    function successHandler(flag,curPage){
        var detailType="maintenance_waiting_sign_for";
        //详情页会自动跳转下一个节点
        if(!flag && isInDetail=='yes'){
            //维修预约节点
            detailType="maintenance_waiting_sign_for";
            if(from && from.indexOf('return_')!==-1){
                //返货提货节点
                detailType="return_waiting_sign_for";
            }
            taskUtil.navigateToAfterMarketTaskDetail(detailType,taskId,curPage);
        }else if(flag && isInDetail=='yes'){
            //新任务提货
            taskUtil.navigateToNewTaskDetail("waiting_pickup",taskId,curPage);
        }else{
            removeByTaskId(page, taskId);
            return;
        }
        dialogsUtil.alert("预约成功");
    }
};

/**
 * 提货处理
 */
CommonUtil.prototype.tapPickTask = function (args) {
    var obj = args.object;
    var page = obj.page;
    var curPage = page.curPage;
    var isInDetail =getPropertyOfObj(obj, 'isInDetail');
    var from =getPropertyOfObj(obj, 'from');
    var taskId =getPropertyOfObj(obj, 'taskId');
    var taskType = getPropertyOfObj(obj, 'taskType');//新任务状态标识
    var options = {
        title: "提示",
        message: "是否确认提货？",
        okButtonText: "确认",
        cancelButtonText: "取消",
    };
    dialogsModule.confirm(options).then((result) => {
        // result can be true/false/undefined
        //新任务提货
        if (taskType == 0) {
            task_view_model.pickUp(taskId, function (res,errorMsg) {
                if (res) {
                    //提货成功
                    successHandler(true,curPage);
                } else {
                    //提货失败
                    dialogsUtil.alert(errorMsg);
                }
            });
        } else if (taskType == 'aftermarket') {  //返货提货
            var qureyParams = {
                "name": "aftermarketTaskController.picUpGoods",
                "args": [{"taskId": taskId}]
            };
            api.call(config.apiUrl, qureyParams).ok((data) => {
                successHandler(false,curPage);
            }).fail((err) => {
                var errorMsg="提货失败";
                if(err.code){
                    errorMsg=err.error;
                }
                dialogsUtil.alert(errorMsg);
                console.log(JSON.stringify(err));
            });
        }
    });

    /**
     * 成功回调
     * @param flag=true为新任务
     */
    function successHandler(flag,curPage){
        var detailType="waiting_sign_for";
        //详情页会自动跳转下一个节点
        if(!flag && isInDetail=='yes'){
            //维修预约节点
            detailType="maintenance_waiting_sign_for";
            if(from && from.indexOf('return_')!==-1){
                //返货提货节点
                detailType="return_waiting_sign_for";
            }
            taskUtil.navigateToAfterMarketTaskDetail(detailType,taskId,curPage);

        }else if(flag && isInDetail=='yes'){//新任务提货
            if(from==='waiting_appointment'){
                //如果是预约详情直接提货，还是刷新到预约页面
                detailType="waiting_appointment";
            }else{
                detailType="waiting_sign_for";
            }
            taskUtil.navigateToNewTaskDetail(detailType,taskId,curPage);
        }else{
            removeByTaskId(page, taskId);
            return;
        }
        dialogsUtil.alert("提货成功！");
    }
};
/**
 * 任务置顶
 * @param args
 */
CommonUtil.prototype.tapTopHandler = function (args) {
    var obj = args.object;
    var taskId = getPropertyOfObj(obj, 'taskId');
    console.log(obj)
    var qureyParams = {
        "name": "taskInstallController.top",
        "args": [{"taskId": taskId}]
    };
    console.log('tapTopHandler 置顶')
    api.call(config.apiUrl, qureyParams).ok((data) => {
        //置顶成功
        dialogsUtil.alert('置顶成功!')
    }).fail((err) => {
        dialogsUtil.alert('置顶失败!')
    });
};
/**
 * 删除按钮事件
 */
CommonUtil.prototype.tapDeleteTask = function (args) {
    var page = args.object.page;
    var waybillId = getPropertyOfObj(obj, 'waybillId');
    var currentTaskList = page.bindingContext.currentTaskList;
    //前端删除
    // page.bindingContext.currentTaskList = _.dropRightWhile(currentTaskList, {'waybillId': waybillId});
    //TODO
    //此处需要调用接口删除
    console.log('TODO 此处需要调用接口删除');
};


/**
 * 展开详情信息
 * @param args
 */
CommonUtil.prototype.toggleCollapsePanel = function (args) {
    var currentTask = null;
    var obj = args.object;
    var globalPage = obj.page;
    var id = obj.id.replace('_toggle', '');
    if (id.indexOf('collapse-widget-') !== -1) {
        currentTask = obj.parent;
    } else {
        currentTask = globalPage.getViewById(id);
    }
    var collapseWidget_down = currentTask.getViewById("collapse-widget-down");
    var collapseWidget_up = currentTask.getViewById("collapse-widget-up");
    var collapseInfoPanel = currentTask.getViewById("collapseInfoPanel");
    //通过更改visibility属性折叠
    if (collapseInfoPanel.visibility !== 'collapse') {
        collapseInfoPanel.visibility = "collapse";
        collapseWidget_down.visibility = "visible";
        if (collapseWidget_up) {
            collapseWidget_up.visibility = "collapse";
        }
    } else {
        collapseInfoPanel.visibility = "visible";
        collapseWidget_down.visibility = "collapse";
        if (collapseWidget_up) {
            collapseWidget_up.visibility = "visible";
        }
    }
};


function showDateDialog(cb) {

    var mCallback2 = function (result) {
        if (result && cb) {
            console.log("the time is " + result);
            cb(result);
        }
    };

    var mCallback = function (result) {
        if (result) {
            DatePickerManager.registerCallback(mCallback2);
            DatePickerManager.showTimePickerDialog();
        }
    };

    DatePickerManager.init(mCallback, null, null, '完成');

    var minDate = new Date();
    DatePickerManager.setMinDate(minDate);

    DatePickerManager.showDatePickerDialog();

}
/**
 * 动态移除listItem
 * @param page
 * @param taskId
 */
function removeByTaskId(page, taskId) {
    var taskList = page.bindingContext.currentTaskList || [];
    taskList.forEach(function (item, index) {
        if (item.id === taskId) {
            taskList.splice(index, 1);
        }
    });
    page.bindingContext.set('currentTaskList', taskList);
}
/**
 * 获取对象属性
 * @param obj
 * @param attr
 */
function getPropertyOfObj(obj, attr) {
    var property = obj[attr];
    if (property == "undefined" || property == undefined) {
        var p = obj.parent;
        property = p[attr];
    }
    if (property == "undefined" || property == undefined) {
        var pp = obj.parent.parent;
        property = pp[attr];
        if (typeof property == 'object') {
            property = '';
        }
    }
    return property || '';
}
module.exports = CommonUtil;