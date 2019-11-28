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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvY29udHJvbC1hbGVydHMvYWxlcnQtaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtJQUFBO0lBNkNBLENBQUM7SUEzQ1UsK0JBQVMsR0FBaEIsVUFBaUIsT0FBYztRQUMzQixPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBRU0sK0JBQVMsR0FBaEIsVUFBaUIsT0FBYztRQUMzQixPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRU0seUNBQW1CLEdBQTFCLFVBQTJCLE9BQXlCLEVBQUUsS0FBWTtRQUM5RCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU0sMkNBQXFCLEdBQTVCLFVBQTZCLE9BQXlCO1FBQ2xELE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSwyQ0FBcUIsR0FBNUIsVUFBNkIsT0FBeUI7UUFDbEQsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztZQUMxQixPQUFPLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUNwQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO2dCQUN4QixZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQzthQUN2QztpQkFBTTtnQkFDSCxZQUFZLEdBQUcsRUFBRSxDQUFDO2FBQ3JCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztRQUM3Qiw0Q0FBNEM7UUFDNUMseUJBQXlCO1FBQ3pCLGlDQUFpQztRQUNqQyxJQUFJO0lBQ1IsQ0FBQztJQUVNLHVEQUFpQyxHQUF4QyxVQUF5QyxPQUF5QjtRQUM5RCxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDckIsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFHO2dCQUMvQixPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFTCxrQkFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYW5HZW5lcmF0ZUFsZXJ0LCBBbGVydCB9IGZyb20gJy4vY2FuLWdlbmVyYXRlLWFsZXJ0JztcbmV4cG9ydCBjbGFzcyBBbGVydEhlbHBlciB7XG5cbiAgICBwdWJsaWMgaGlkZUFsZXJ0KGNvbnRyb2w6IEFsZXJ0KSB7XG4gICAgICAgIGNvbnRyb2wuc2hvd24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0FsZXJ0KGNvbnRyb2w6IEFsZXJ0KSB7XG4gICAgICAgIGNvbnRyb2wuc2hvd24gPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRBbGVydHNGb3JDb250cm9sKGNvbnRyb2w6IENhbkdlbmVyYXRlQWxlcnQsIGFsZXJ0OiBBbGVydCkge1xuICAgICAgICBjb250cm9sLmFsZXJ0cy5wdXNoKGFsZXJ0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJBbGVydHNGb3JDb250cm9sKGNvbnRyb2w6IENhbkdlbmVyYXRlQWxlcnQpIHtcbiAgICAgICAgY29udHJvbC5hbGVydHMuc3BsaWNlKDApO1xuICAgICAgICBjb250cm9sLmFsZXJ0ID0gJyc7XG4gICAgfVxuXG4gICAgcHVibGljIGV2YWx1YXRlQ29udHJvbEFsZXJ0cyhjb250cm9sOiBDYW5HZW5lcmF0ZUFsZXJ0KSB7XG4gICAgICAgIGxldCBtZXNzYWdlVmFsdWUgPSAnJztcbiAgICAgICAgY29udHJvbC5hbGVydHMuZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgICAgICAgIG1lc3NhZ2UucmVFdmFsdWF0ZUFsZXJ0RXhwcmVzc2lvbigpO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2Uuc2hvd24gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlVmFsdWUgPSBtZXNzYWdlLmFsZXJ0TWVzc2FnZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZVZhbHVlID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnRyb2wuYWxlcnQgPSBtZXNzYWdlVmFsdWU7XG4gICAgICAgIC8vIGlmIChjb250cm9sLm1lc3NhZ2UgJiYgY29udHJvbC5kaXNhYmxlKSB7XG4gICAgICAgIC8vICAgICBjb250cm9sLmRpc2FibGUoKTtcbiAgICAgICAgLy8gICAgIC8vIGNvbnRyb2wuc2V0VmFsdWUobnVsbCk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0VXBSZUV2YWx1YXRpb25XaGVuVmFsdWVDaGFuZ2VzKGNvbnRyb2w6IENhbkdlbmVyYXRlQWxlcnQpIHtcbiAgICAgICAgaWYgKGNvbnRyb2wudXBkYXRlQWxlcnQpIHtcbiAgICAgICAgICAgIGNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29udHJvbC51cGRhdGVBbGVydCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==