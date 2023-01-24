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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9jb250cm9sLWFsZXJ0cy9hbGVydC1oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0lBQUE7SUEyQ0EsQ0FBQztJQTFDUSwrQkFBUyxHQUFoQixVQUFpQixPQUFjO1FBQzdCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFFTSwrQkFBUyxHQUFoQixVQUFpQixPQUFjO1FBQzdCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSx5Q0FBbUIsR0FBMUIsVUFBMkIsT0FBeUIsRUFBRSxLQUFZO1FBQ2hFLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTSwyQ0FBcUIsR0FBNUIsVUFBNkIsT0FBeUI7UUFDcEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVNLDJDQUFxQixHQUE1QixVQUE2QixPQUF5QjtRQUNwRCxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPO1lBQzdCLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7WUFDdEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDcEIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7UUFDN0IsNENBQTRDO1FBQzVDLHlCQUF5QjtRQUN6QixpQ0FBaUM7UUFDakMsSUFBSTtJQUNOLENBQUM7SUFFTSx1REFBaUMsR0FBeEMsVUFBeUMsT0FBeUI7UUFDaEUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDeEIsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFHO2dCQUNqQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQTNDRCxJQTJDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbkdlbmVyYXRlQWxlcnQsIEFsZXJ0IH0gZnJvbSAnLi9jYW4tZ2VuZXJhdGUtYWxlcnQnO1xuZXhwb3J0IGNsYXNzIEFsZXJ0SGVscGVyIHtcbiAgcHVibGljIGhpZGVBbGVydChjb250cm9sOiBBbGVydCkge1xuICAgIGNvbnRyb2wuc2hvd24gPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93QWxlcnQoY29udHJvbDogQWxlcnQpIHtcbiAgICBjb250cm9sLnNob3duID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRBbGVydHNGb3JDb250cm9sKGNvbnRyb2w6IENhbkdlbmVyYXRlQWxlcnQsIGFsZXJ0OiBBbGVydCkge1xuICAgIGNvbnRyb2wuYWxlcnRzLnB1c2goYWxlcnQpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyQWxlcnRzRm9yQ29udHJvbChjb250cm9sOiBDYW5HZW5lcmF0ZUFsZXJ0KSB7XG4gICAgY29udHJvbC5hbGVydHMuc3BsaWNlKDApO1xuICAgIGNvbnRyb2wuYWxlcnQgPSAnJztcbiAgfVxuXG4gIHB1YmxpYyBldmFsdWF0ZUNvbnRyb2xBbGVydHMoY29udHJvbDogQ2FuR2VuZXJhdGVBbGVydCkge1xuICAgIGxldCBtZXNzYWdlVmFsdWUgPSAnJztcbiAgICBjb250cm9sLmFsZXJ0cy5mb3JFYWNoKChtZXNzYWdlKSA9PiB7XG4gICAgICBtZXNzYWdlLnJlRXZhbHVhdGVBbGVydEV4cHJlc3Npb24oKTtcbiAgICAgIGlmIChtZXNzYWdlLnNob3duID09PSB0cnVlKSB7XG4gICAgICAgIG1lc3NhZ2VWYWx1ZSA9IG1lc3NhZ2UuYWxlcnRNZXNzYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZVZhbHVlID0gJyc7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb250cm9sLmFsZXJ0ID0gbWVzc2FnZVZhbHVlO1xuICAgIC8vIGlmIChjb250cm9sLm1lc3NhZ2UgJiYgY29udHJvbC5kaXNhYmxlKSB7XG4gICAgLy8gICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xuICAgIC8vICAgICAvLyBjb250cm9sLnNldFZhbHVlKG51bGwpO1xuICAgIC8vIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRVcFJlRXZhbHVhdGlvbldoZW5WYWx1ZUNoYW5nZXMoY29udHJvbDogQ2FuR2VuZXJhdGVBbGVydCkge1xuICAgIGlmIChjb250cm9sLnVwZGF0ZUFsZXJ0KSB7XG4gICAgICBjb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbCkgPT4ge1xuICAgICAgICBjb250cm9sLnVwZGF0ZUFsZXJ0KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==