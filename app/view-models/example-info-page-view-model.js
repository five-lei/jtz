var observable = require("data/observable");
var ExampleViewModel = (function(_super) {
    __extends(ExampleViewModel, _super);

    function ExampleViewModel(_example) {
        var _this = _super.call(this) || this;
        _this._example = _example;
        return _this;
    }
    Object.defineProperty(ExampleViewModel.prototype, "title", {
        get: function() {
            return this._example.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExampleViewModel.prototype, "info", {
        get: function() {
            return this._example.info;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExampleViewModel.prototype, "image", {
        get: function() {
            return this._example.image;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExampleViewModel.prototype, "isFeatured", {
        get: function() {
            return this._example.isFeatured;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExampleViewModel.prototype, "isNew", {
        get: function() {
            return this._example.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExampleViewModel.prototype, "path", {
        get: function() {
            return this._example.path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExampleViewModel.prototype, "group", {
        get: function() {
            return this._example.group;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExampleViewModel.prototype, "controls", {
        get: function() {
            return this._example.controls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExampleViewModel.prototype, "example", {
        get: function() {
            return this._example;
        },
        enumerable: true,
        configurable: true
    });
    return ExampleViewModel;
}(observable.Observable));
exports.ExampleViewModel = ExampleViewModel;
var ExampleInfoPageViewModel = (function(_super) {
    __extends(ExampleInfoPageViewModel, _super);

    function ExampleInfoPageViewModel(example) {
        var _this = _super.call(this) || this;
        if (!example) {
            throw new Error("Cannot create view model with no example");
        }
        var examplesWrappers = example.group.examples.map(function(e) {
            var exVM = new ExampleViewModel(e);
            if (e === example) {
                _this._currentExample = exVM;
            }
            return exVM;
        });
        _this._examples = examplesWrappers;
        _this._group = example.group;
        return _this;
    }
    Object.defineProperty(ExampleInfoPageViewModel.prototype, "examples", {
        get: function() {
            return this._examples;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExampleInfoPageViewModel.prototype, "group", {
        get: function() {
            return this._group;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExampleInfoPageViewModel.prototype, "currentExample", {
        get: function() {
            return this._currentExample;
        },
        set: function(value) {
            if (value !== this._currentExample) {
                this._currentExample = value;
                this.notifyPropertyChange("currentExample", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    return ExampleInfoPageViewModel;
}(observable.Observable));
exports.ExampleInfoPageViewModel = ExampleInfoPageViewModel;
