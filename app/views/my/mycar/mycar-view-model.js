var observable_1 = require("data/observable");
var ListViewLayoutsModel = (function (_super) {
    __extends(ListViewLayoutsModel, _super);
    function ListViewLayoutsModel() {
        var _this = _super.call(this) || this;
        _this._pictures = [
            { "title": "A Quick Snack Burger", "author": "Nice to Meat You", "photo": "main1", "category": "mains" },
            { "title": "Chilli Meat Bites", "author": "Nice to Meat You", "photo": "main2", "category": "mains" },
            { "title": "Your Favourite Ribs", "author": "Nice to Meat You", "photo": "main3", "category": "mains" },
            { "title": "Burger at the Max", "author": "Burger Queen", "photo": "main4", "category": "mains" },
            { "title": "Special Burger with Fries", "author": "Burger Queen", "photo": "main5", "category": "mains" },
            { "title": "Everybody's Dream Hotdog", "author": "Prince Burger", "photo": "main6", "category": "mains" },
            { "title": "Quinoa Balls", "author": "ReFresh", "photo": "main7", "category": "mains" },
            { "title": "Bruschetta with Cheese", "author": "Sandwiches and More", "photo": "main8", "category": "mains" },
            { "title": "Quick Toast with Bacon", "author": "Sandwiches and More", "photo": "main9", "category": "mains" },
            { "title": "Special Steak with Fries", "author": "Nice to Meat You", "photo": "main10", "category": "mains" },
            { "title": "Hotdog for Two", "author": "Prince Burger", "photo": "main11", "category": "mains" },
            { "title": "Bruschetta with Salmon Fish", "author": "Ron's Fishery", "photo": "main12", "category": "mains" },
            { "title": "Chief's Steak", "author": "Nice to Meat You", "photo": "main13", "category": "mains" },
        ];
        _this._isLinearActive = true;
        return _this;
    }
    Object.defineProperty(ListViewLayoutsModel.prototype, "pictures", {
        get: function () {
            return this._pictures;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewLayoutsModel.prototype, "isLinearActive", {
        get: function () {
            return this._isLinearActive;
        },
        set: function (value) {
            this._isLinearActive = value;
            this.notifyPropertyChange("isLinearActive", value);
        },
        enumerable: true,
        configurable: true
    });
    return ListViewLayoutsModel;
}(observable_1.Observable));
exports.ListViewLayoutsModel = ListViewLayoutsModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0cy12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGF5b3V0cy12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhDQUE2QztBQUU3QztJQUEwQyx3Q0FBVTtJQWlEaEQ7UUFBQSxZQUNGLGlCQUFPLFNBRVA7UUFsRFUsZUFBUyxHQUFHO1lBQ3RCLEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUU7WUFDM0csRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRTtZQUNuRyxFQUFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFO1lBQy9HLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFO1lBQ2pHLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRTtZQUM5RixFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRTtZQUN6RyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFO1lBQzFHLEVBQUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUU7WUFDcEgsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRTtZQUM5RyxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFO1lBQy9HLEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUU7WUFDakgsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUU7WUFDekcsRUFBRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRTtZQUN2SCxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTtZQUMvRixFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFO1lBQ3hHLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFO1lBQ2xHLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7WUFDNUcsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7WUFDN0YsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTtZQUNyRyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7WUFDekYsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTtZQUN0RyxFQUFFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFO1lBQ2xILEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFO1lBQzFGLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFO1lBQ3JHLEVBQUUsT0FBTyxFQUFFLCtCQUErQixFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7WUFDbkgsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtZQUNsSCxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO1lBQ3BILEVBQUUsT0FBTyxFQUFFLHNDQUFzQyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7WUFDakksRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7WUFDMUcsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO1lBQ3ZHLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtZQUM5RixFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFO1lBQ3hHLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUU7WUFDckcsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRTtZQUN2RyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRTtZQUNqRyxFQUFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRTtZQUN6RyxFQUFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRTtZQUN6RyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUU7WUFDdkYsRUFBRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRTtZQUM3RyxFQUFFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFO1lBQzdHLEVBQUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUU7WUFDN0csRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUU7WUFDaEcsRUFBRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUU7WUFDN0csRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUU7U0FDbEcsQ0FBQztRQUlLLEtBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDOztJQUNuQyxDQUFDO0lBRUQsc0JBQVcsMENBQVE7YUFBbkI7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGdEQUFjO2FBQXpCO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDN0IsQ0FBQzthQUVELFVBQTBCLEtBQWM7WUFDdkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFELENBQUM7OztPQUxBO0lBTUYsMkJBQUM7QUFBRCxDQUFDLEFBbEVELENBQTBDLHVCQUFVLEdBa0VuRDtBQWxFWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcblxuZXhwb3J0IGNsYXNzIExpc3RWaWV3TGF5b3V0c01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZXtcbiAgICBwcml2YXRlIF9pc0xpbmVhckFjdGl2ZTogYm9vbGVhbjtcbiAgICBwcml2YXRlIF9waWN0dXJlcyA9IFtcblx0XHR7IFwidGl0bGVcIjogXCJEcmllZCBNZWF0IHdpdGggU3BpY2VzXCIsIFwiYXV0aG9yXCI6IFwiTmljZSB0byBNZWF0IFlvdVwiLCBcInBob3RvXCI6IFwicGFsZW8xXCIsIFwiY2F0ZWdvcnlcIjogXCJwYWxlb1wiIH0sXG5cdFx0eyBcInRpdGxlXCI6IFwiR29sZGVuIENoaWNrZW5cIiwgXCJhdXRob3JcIjogXCJDaGlja2VuJ3MgSGVhdmVuXCIsIFwicGhvdG9cIjogXCJwYWxlbzJcIiwgXCJjYXRlZ29yeVwiOiBcInBhbGVvXCIgfSxcblx0XHR7IFwidGl0bGVcIjogXCJQb3JrIFN0ZWFrIHdpdGggVmVnZXRhYmxlc1wiLCBcImF1dGhvclwiOiBcIk5pY2UgdG8gTWVhdCBZb3VcIiwgXCJwaG90b1wiOiBcInBhbGVvM1wiLCBcImNhdGVnb3J5XCI6IFwicGFsZW9cIiB9LFxuXHRcdHsgXCJ0aXRsZVwiOiBcIkxhbWIgQ290bGV0c1wiLCBcImF1dGhvclwiOiBcIk5pY2UgdG8gTWVhdCBZb3VcIiwgXCJwaG90b1wiOiBcInBhbGVvNFwiLCBcImNhdGVnb3J5XCI6IFwicGFsZW9cIiB9LFxuXHRcdHsgXCJ0aXRsZVwiOiBcIlNhbG1vbiBTdGVha1wiLCBcImF1dGhvclwiOiBcIlJvbidzIEZpc2hlcnlcIiwgXCJwaG90b1wiOiBcInBhbGVvNVwiLCBcImNhdGVnb3J5XCI6IFwicGFsZW9cIiB9LFxuXHRcdHsgXCJ0aXRsZVwiOiBcIlRoZXNlIFJvbGxzLi5cIiwgXCJhdXRob3JcIjogXCJMZSBCYWtlcnkgZGUgVHJldmlcIiwgXCJwaG90b1wiOiBcImRlc3NlcnQxXCIsIFwiY2F0ZWdvcnlcIjogXCJkZXNzZXJ0c1wiIH0sXG5cdFx0eyBcInRpdGxlXCI6IFwiQ2hvY29sYXRlIENha2VcIiwgXCJhdXRob3JcIjogXCJUaGUgU3dlZXRlc3QgVGhpbmdcIiwgXCJwaG90b1wiOiBcImRlc3NlcnQyXCIsIFwiY2F0ZWdvcnlcIjogXCJkZXNzZXJ0c1wiIH0sXG5cdFx0eyBcInRpdGxlXCI6IFwiUmFpbmJvdyBDaG9jb2xhdGUgUHVkZGluZ1wiLCBcImF1dGhvclwiOiBcIlN3ZWV0IGFuZCBTd2VldGVyXCIsIFwicGhvdG9cIjogXCJkZXNzZXJ0M1wiLCBcImNhdGVnb3J5XCI6IFwiZGVzc2VydHNcIiB9LFxuXHRcdHsgXCJ0aXRsZVwiOiBcIkljZS1jcmVhbSBTYW5kd2ljaFwiLCBcImF1dGhvclwiOiBcIlRoZSBTd2VldGVzdCBUaGluZ1wiLCBcInBob3RvXCI6IFwiZGVzc2VydDRcIiwgXCJjYXRlZ29yeVwiOiBcImRlc3NlcnRzXCIgfSxcblx0XHR7IFwidGl0bGVcIjogXCJMZSBNYWNhcm9ucyBkZSBMeW9uXCIsIFwiYXV0aG9yXCI6IFwiTGUgQmFrZXJ5IGRlIFRyZXZpXCIsIFwicGhvdG9cIjogXCJkZXNzZXJ0NVwiLCBcImNhdGVnb3J5XCI6IFwiZGVzc2VydHNcIiB9LFxuXHRcdHsgXCJ0aXRsZVwiOiBcIkxlIFRpcmFtaXN1IGRlIFRyZXZpc29cIiwgXCJhdXRob3JcIjogXCJTd2VldCBhbmQgU3dlZXRlclwiLCBcInBob3RvXCI6IFwiZGVzc2VydDZcIiwgXCJjYXRlZ29yeVwiOiBcImRlc3NlcnRzXCIgfSxcblx0XHR7IFwidGl0bGVcIjogXCJDcmVtZSBDYXJhbWVsXCIsIFwiYXV0aG9yXCI6IFwiVGhlIFN3ZWV0ZXN0IFRoaW5nXCIsIFwicGhvdG9cIjogXCJkZXNzZXJ0N1wiLCBcImNhdGVnb3J5XCI6IFwiZGVzc2VydHNcIiB9LFxuXHRcdHsgXCJ0aXRsZVwiOiBcIkJlIEZpdCwgQmUgSGVhbHRoeSBGcnVpdCBNaXhcIiwgXCJhdXRob3JcIjogXCJTd2VldCBhbmQgU3dlZXRlclwiLCBcInBob3RvXCI6IFwiZGVzc2VydDhcIiwgXCJjYXRlZ29yeVwiOiBcImRlc3NlcnRzXCIgfSxcblx0XHR7IFwidGl0bGVcIjogXCJDZXlsb24gVGVhXCIsIFwiYXV0aG9yXCI6IFwiVGhlIEhlYWx0aHkgQmFyXCIsIFwicGhvdG9cIjogXCJkcmluazFcIiwgXCJjYXRlZ29yeVwiOiBcImRyaW5rc1wiIH0sXG5cdFx0eyBcInRpdGxlXCI6IFwiT3JhbmdlIEp1aWNlLCBGcmVzaFwiLCBcImF1dGhvclwiOiBcIlRoZSBIZWFsdGh5IEJhclwiLCBcInBob3RvXCI6IFwiZHJpbmsyXCIsIFwiY2F0ZWdvcnlcIjogXCJkcmlua3NcIiB9LFxuXHRcdHsgXCJ0aXRsZVwiOiBcIkEgR2xhc3Mgb2YgV2luZVwiLCBcImF1dGhvclwiOiBcIlRvbmlnaHQncyBCYXJcIiwgXCJwaG90b1wiOiBcImRyaW5rM1wiLCBcImNhdGVnb3J5XCI6IFwiZHJpbmtzXCIgfSxcblx0XHR7IFwidGl0bGVcIjogXCJCYXJpc3RhJ3MgTWFzdGVycGllY2VcIiwgXCJhdXRob3JcIjogXCJUaGUgQ2FmZSBOZWFyIFlvdVwiLCBcInBob3RvXCI6IFwiZHJpbms0XCIsIFwiY2F0ZWdvcnlcIjogXCJkcmlua3NcIiB9LFxuXHRcdHsgXCJ0aXRsZVwiOiBcIkNvZmZlZVwiLCBcImF1dGhvclwiOiBcIlN3ZWV0IGFuZCBTd2VldGVyXCIsIFwicGhvdG9cIjogXCJkcmluazVcIiwgXCJjYXRlZ29yeVwiOiBcImRyaW5rc1wiIH0sXG5cdFx0eyBcInRpdGxlXCI6IFwiV2F0ZXJtZWxvbiBEcmVhbVwiLCBcImF1dGhvclwiOiBcIlRoZSBIZWFsdGh5IEJhclwiLCBcInBob3RvXCI6IFwiZHJpbms2XCIsIFwiY2F0ZWdvcnlcIjogXCJkcmlua3NcIiB9LFxuXHRcdHsgXCJ0aXRsZVwiOiBcIk1vaml0b1wiLCBcImF1dGhvclwiOiBcIlRvbmlnaHQncyBCYXJcIiwgXCJwaG90b1wiOiBcImRyaW5rN1wiLCBcImNhdGVnb3J5XCI6IFwiZHJpbmtzXCIgfSxcblx0XHR7IFwidGl0bGVcIjogXCJSYXNwYmVycnkgU21vb3RoaWVcIiwgXCJhdXRob3JcIjogXCJUaGUgSGVhbGh5IEJhclwiLCBcInBob3RvXCI6IFwiZHJpbms4XCIsIFwiY2F0ZWdvcnlcIjogXCJkcmlua3NcIiB9LFxuXHRcdHsgXCJ0aXRsZVwiOiBcIlNtb290aWUgKERpZmZlcmVudCBGbGF2b3JzKVwiLCBcImF1dGhvclwiOiBcIlN3ZWV0IGFuZCBTd2VldGVyXCIsIFwicGhvdG9cIjogXCJkcmluazlcIiwgXCJjYXRlZ29yeVwiOiBcImRyaW5rc1wiIH0sXG5cdFx0eyBcInRpdGxlXCI6IFwiU29kYVwiLCBcImF1dGhvclwiOiBcIlRoZSBIZWFsdGh5IEJhclwiLCBcInBob3RvXCI6IFwiZHJpbmsxMFwiLCBcImNhdGVnb3J5XCI6IFwiZHJpbmtzXCIgfSxcblx0XHR7IFwidGl0bGVcIjogXCJMZW1vbiBJY2UgVGVhXCIsIFwiYXV0aG9yXCI6IFwiU3dlZXQgYW5kIFN3ZWV0ZXJcIiwgXCJwaG90b1wiOiBcImRyaW5rMTFcIiwgXCJjYXRlZ29yeVwiOiBcImRyaW5rc1wiIH0sXG5cdFx0eyBcInRpdGxlXCI6IFwiQ3J5c3RhbCBXYXRlciB3aXRoIEFsbW9uZCBPaWxcIiwgXCJhdXRob3JcIjogXCJUaGUgSGVhbHRoeSBCYXJcIiwgXCJwaG90b1wiOiBcImRyaW5rMTJcIiwgXCJjYXRlZ29yeVwiOiBcImRyaW5rc1wiIH0sXG5cdFx0eyBcInRpdGxlXCI6IFwiVGhlIEZyZXNoIFNhbmR3aWNoXCIsIFwiYXV0aG9yXCI6IFwiU2FuZHdpY2hlcyBhbmQgTW9yZVwiLCBcInBob3RvXCI6IFwiYnJlYWtmYXN0MVwiLCBcImNhdGVnb3J5XCI6IFwiYnJlYWtmYXN0XCIgfSxcblx0XHR7IFwidGl0bGVcIjogXCJUaGUgSGVhbHRoeSBTYW5kd2ljaFwiLCBcImF1dGhvclwiOiBcIlNhbmR3aWNoZXMgYW5kIE1vcmVcIiwgXCJwaG90b1wiOiBcImJyZWFrZmFzdDJcIiwgXCJjYXRlZ29yeVwiOiBcImJyZWFrZmFzdFwiIH0sXG5cdFx0eyBcInRpdGxlXCI6IFwiQ3Jpc3B5IENoaWNrZW4gd2l0aCBBdm9jYWRvIFNhbmR3aWNoXCIsIFwiYXV0aG9yXCI6IFwiQ2hpY2tlbidzIEhlYXZlblwiLCBcInBob3RvXCI6IFwiYnJlYWtmYXN0M1wiLCBcImNhdGVnb3J5XCI6IFwiYnJlYWtmYXN0XCIgfSxcblx0XHR7IFwidGl0bGVcIjogXCJCZWVmIFNhbmR3aWNoXCIsIFwiYXV0aG9yXCI6IFwiTmljZSB0byBNZWF0IFlvdVwiLCBcInBob3RvXCI6IFwiYnJlYWtmYXN0NFwiLCBcImNhdGVnb3J5XCI6IFwiYnJlYWtmYXN0XCIgfSxcblx0XHR7IFwidGl0bGVcIjogXCJUdW5hIFNhbmR3aWNoXCIsIFwiYXV0aG9yXCI6IFwiUm9uJ3MgRmlzaGVyeVwiLCBcInBob3RvXCI6IFwiYnJlYWtmYXN0NVwiLCBcImNhdGVnb3J5XCI6IFwiYnJlYWtmYXN0XCIgfSxcblx0XHR7IFwidGl0bGVcIjogXCJGcnVpdCBDYWtlXCIsIFwiYXV0aG9yXCI6IFwiUmVGcmVzaFwiLCBcInBob3RvXCI6IFwiYnJlYWtmYXN0NlwiLCBcImNhdGVnb3J5XCI6IFwiYnJlYWtmYXN0XCIgfSxcblx0XHR7IFwidGl0bGVcIjogXCJBIFF1aWNrIFNuYWNrIEJ1cmdlclwiLCBcImF1dGhvclwiOiBcIk5pY2UgdG8gTWVhdCBZb3VcIiwgXCJwaG90b1wiOiBcIm1haW4xXCIsIFwiY2F0ZWdvcnlcIjogXCJtYWluc1wiIH0sXG5cdFx0eyBcInRpdGxlXCI6IFwiQ2hpbGxpIE1lYXQgQml0ZXNcIiwgXCJhdXRob3JcIjogXCJOaWNlIHRvIE1lYXQgWW91XCIsIFwicGhvdG9cIjogXCJtYWluMlwiLCBcImNhdGVnb3J5XCI6IFwibWFpbnNcIiB9LFxuXHRcdHsgXCJ0aXRsZVwiOiBcIllvdXIgRmF2b3VyaXRlIFJpYnNcIiwgXCJhdXRob3JcIjogXCJOaWNlIHRvIE1lYXQgWW91XCIsIFwicGhvdG9cIjogXCJtYWluM1wiLCBcImNhdGVnb3J5XCI6IFwibWFpbnNcIiB9LFxuXHRcdHsgXCJ0aXRsZVwiOiBcIkJ1cmdlciBhdCB0aGUgTWF4XCIsIFwiYXV0aG9yXCI6IFwiQnVyZ2VyIFF1ZWVuXCIsIFwicGhvdG9cIjogXCJtYWluNFwiLCBcImNhdGVnb3J5XCI6IFwibWFpbnNcIiB9LFxuXHRcdHsgXCJ0aXRsZVwiOiBcIlNwZWNpYWwgQnVyZ2VyIHdpdGggRnJpZXNcIiwgXCJhdXRob3JcIjogXCJCdXJnZXIgUXVlZW5cIiwgXCJwaG90b1wiOiBcIm1haW41XCIsIFwiY2F0ZWdvcnlcIjogXCJtYWluc1wiIH0sXG5cdFx0eyBcInRpdGxlXCI6IFwiRXZlcnlib2R5J3MgRHJlYW0gSG90ZG9nXCIsIFwiYXV0aG9yXCI6IFwiUHJpbmNlIEJ1cmdlclwiLCBcInBob3RvXCI6IFwibWFpbjZcIiwgXCJjYXRlZ29yeVwiOiBcIm1haW5zXCIgfSxcblx0XHR7IFwidGl0bGVcIjogXCJRdWlub2EgQmFsbHNcIiwgXCJhdXRob3JcIjogXCJSZUZyZXNoXCIsIFwicGhvdG9cIjogXCJtYWluN1wiLCBcImNhdGVnb3J5XCI6IFwibWFpbnNcIiB9LFxuXHRcdHsgXCJ0aXRsZVwiOiBcIkJydXNjaGV0dGEgd2l0aCBDaGVlc2VcIiwgXCJhdXRob3JcIjogXCJTYW5kd2ljaGVzIGFuZCBNb3JlXCIsIFwicGhvdG9cIjogXCJtYWluOFwiLCBcImNhdGVnb3J5XCI6IFwibWFpbnNcIiB9LFxuXHRcdHsgXCJ0aXRsZVwiOiBcIlF1aWNrIFRvYXN0IHdpdGggQmFjb25cIiwgXCJhdXRob3JcIjogXCJTYW5kd2ljaGVzIGFuZCBNb3JlXCIsIFwicGhvdG9cIjogXCJtYWluOVwiLCBcImNhdGVnb3J5XCI6IFwibWFpbnNcIiB9LFxuXHRcdHsgXCJ0aXRsZVwiOiBcIlNwZWNpYWwgU3RlYWsgd2l0aCBGcmllc1wiLCBcImF1dGhvclwiOiBcIk5pY2UgdG8gTWVhdCBZb3VcIiwgXCJwaG90b1wiOiBcIm1haW4xMFwiLCBcImNhdGVnb3J5XCI6IFwibWFpbnNcIiB9LFxuXHRcdHsgXCJ0aXRsZVwiOiBcIkhvdGRvZyBmb3IgVHdvXCIsIFwiYXV0aG9yXCI6IFwiUHJpbmNlIEJ1cmdlclwiLCBcInBob3RvXCI6IFwibWFpbjExXCIsIFwiY2F0ZWdvcnlcIjogXCJtYWluc1wiIH0sXG5cdFx0eyBcInRpdGxlXCI6IFwiQnJ1c2NoZXR0YSB3aXRoIFNhbG1vbiBGaXNoXCIsIFwiYXV0aG9yXCI6IFwiUm9uJ3MgRmlzaGVyeVwiLCBcInBob3RvXCI6IFwibWFpbjEyXCIsIFwiY2F0ZWdvcnlcIjogXCJtYWluc1wiIH0sXG5cdFx0eyBcInRpdGxlXCI6IFwiQ2hpZWYncyBTdGVha1wiLCBcImF1dGhvclwiOiBcIk5pY2UgdG8gTWVhdCBZb3VcIiwgXCJwaG90b1wiOiBcIm1haW4xM1wiLCBcImNhdGVnb3J5XCI6IFwibWFpbnNcIiB9LFxuXHRdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcbiAgICAgICAgdGhpcy5faXNMaW5lYXJBY3RpdmUgPSB0cnVlO1xuXHR9XG5cblx0cHVibGljIGdldCBwaWN0dXJlcygpOiBBcnJheTxhbnk+IHtcblx0XHRyZXR1cm4gdGhpcy5fcGljdHVyZXM7XG5cdH1cblx0XG5cdHB1YmxpYyBnZXQgaXNMaW5lYXJBY3RpdmUoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX2lzTGluZWFyQWN0aXZlO1xuXHR9XG5cdFxuXHRwdWJsaWMgc2V0IGlzTGluZWFyQWN0aXZlKHZhbHVlOiBib29sZWFuKSB7XG5cdFx0dGhpcy5faXNMaW5lYXJBY3RpdmUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZShcImlzTGluZWFyQWN0aXZlXCIsIHZhbHVlKTtcblx0fVxufSJdfQ==