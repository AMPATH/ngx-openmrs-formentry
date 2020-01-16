var AlertHelper = /** @class */ (function () {
    function AlertHelper() {
    }
    AlertHelper.prototype.hideAlert = function (control) {
        control.shown = false;
    };
    AlertHelper.prototype.showAlert = function (control) {
        control.shown = true;
    };
    AlertHelper.prototype.setAlertsForControl = function (control, alert) {
        control.alerts.push(alert);
    };
    AlertHelper.prototype.clearAlertsForControl = function (control) {
        control.alerts.splice(0);
        control.alert = '';
    };
    AlertHelper.prototype.evaluateControlAlerts = function (control) {
        var messageValue = '';
        control.alerts.forEach(function (message) {
            message.reEvaluateAlertExpression();
            if (message.shown === true) {
                messageValue = message.alertMessage;
            }
            else {
                messageValue = '';
            }
        });
        control.alert = messageValue;
        // if (control.message && control.disable) {
        //     control.disable();
        //     // control.setValue(null);
        // }
    };
    AlertHelper.prototype.setUpReEvaluationWhenValueChanges = function (control) {
        if (control.updateAlert) {
            control.valueChanges.subscribe(function (val) {
                control.updateAlert();
            });
        }
    };
    return AlertHelper;
}());
export { AlertHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9jb250cm9sLWFsZXJ0cy9hbGVydC1oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0lBQUE7SUE2Q0EsQ0FBQztJQTNDVSwrQkFBUyxHQUFoQixVQUFpQixPQUFjO1FBQzNCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFTSwrQkFBUyxHQUFoQixVQUFpQixPQUFjO1FBQzNCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFTSx5Q0FBbUIsR0FBMUIsVUFBMkIsT0FBeUIsRUFBRSxLQUFZO1FBQzlELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTSwyQ0FBcUIsR0FBNUIsVUFBNkIsT0FBeUI7UUFDbEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVNLDJDQUFxQixHQUE1QixVQUE2QixPQUF5QjtRQUNsRCxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQzFCLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1lBQ3BDLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7Z0JBQ3hCLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO2FBQ3ZDO2lCQUFNO2dCQUNILFlBQVksR0FBRyxFQUFFLENBQUM7YUFDckI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO1FBQzdCLDRDQUE0QztRQUM1Qyx5QkFBeUI7UUFDekIsaUNBQWlDO1FBQ2pDLElBQUk7SUFDUixDQUFDO0lBRU0sdURBQWlDLEdBQXhDLFVBQXlDLE9BQXlCO1FBQzlELElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUNyQixPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEdBQUc7Z0JBQy9CLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVMLGtCQUFDO0FBQUQsQ0FBQyxBQTdDRCxJQTZDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbkdlbmVyYXRlQWxlcnQsIEFsZXJ0IH0gZnJvbSAnLi9jYW4tZ2VuZXJhdGUtYWxlcnQnO1xuZXhwb3J0IGNsYXNzIEFsZXJ0SGVscGVyIHtcblxuICAgIHB1YmxpYyBoaWRlQWxlcnQoY29udHJvbDogQWxlcnQpIHtcbiAgICAgICAgY29udHJvbC5zaG93biA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93QWxlcnQoY29udHJvbDogQWxlcnQpIHtcbiAgICAgICAgY29udHJvbC5zaG93biA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEFsZXJ0c0ZvckNvbnRyb2woY29udHJvbDogQ2FuR2VuZXJhdGVBbGVydCwgYWxlcnQ6IEFsZXJ0KSB7XG4gICAgICAgIGNvbnRyb2wuYWxlcnRzLnB1c2goYWxlcnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhckFsZXJ0c0ZvckNvbnRyb2woY29udHJvbDogQ2FuR2VuZXJhdGVBbGVydCkge1xuICAgICAgICBjb250cm9sLmFsZXJ0cy5zcGxpY2UoMCk7XG4gICAgICAgIGNvbnRyb2wuYWxlcnQgPSAnJztcbiAgICB9XG5cbiAgICBwdWJsaWMgZXZhbHVhdGVDb250cm9sQWxlcnRzKGNvbnRyb2w6IENhbkdlbmVyYXRlQWxlcnQpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2VWYWx1ZSA9ICcnO1xuICAgICAgICBjb250cm9sLmFsZXJ0cy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgICAgICAgbWVzc2FnZS5yZUV2YWx1YXRlQWxlcnRFeHByZXNzaW9uKCk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5zaG93biA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VWYWx1ZSA9IG1lc3NhZ2UuYWxlcnRNZXNzYWdlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlVmFsdWUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29udHJvbC5hbGVydCA9IG1lc3NhZ2VWYWx1ZTtcbiAgICAgICAgLy8gaWYgKGNvbnRyb2wubWVzc2FnZSAmJiBjb250cm9sLmRpc2FibGUpIHtcbiAgICAgICAgLy8gICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xuICAgICAgICAvLyAgICAgLy8gY29udHJvbC5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRVcFJlRXZhbHVhdGlvbldoZW5WYWx1ZUNoYW5nZXMoY29udHJvbDogQ2FuR2VuZXJhdGVBbGVydCkge1xuICAgICAgICBpZiAoY29udHJvbC51cGRhdGVBbGVydCkge1xuICAgICAgICAgICAgY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb250cm9sLnVwZGF0ZUFsZXJ0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19