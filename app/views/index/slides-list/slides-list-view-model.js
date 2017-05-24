/**
 * Created by Administrator on 2017/4/15.
 */

const Observable = require("data/observable").Observable;


class ViewModel {
    init() {
        var data = {
            src:"https://github.com/",
        };
        return new Observable(data);
    }
}

module.exports = ViewModel;