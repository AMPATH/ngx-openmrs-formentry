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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvY29udHJvbC1hbGVydHMvYWxlcnQtaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtJQUFBO0lBMkNBLENBQUM7SUExQ1EsK0JBQVMsR0FBaEIsVUFBaUIsT0FBYztRQUM3QixPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBRU0sK0JBQVMsR0FBaEIsVUFBaUIsT0FBYztRQUM3QixPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRU0seUNBQW1CLEdBQTFCLFVBQTJCLE9BQXlCLEVBQUUsS0FBWTtRQUNoRSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU0sMkNBQXFCLEdBQTVCLFVBQTZCLE9BQXlCO1FBQ3BELE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSwyQ0FBcUIsR0FBNUIsVUFBNkIsT0FBeUI7UUFDcEQsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztZQUM3QixPQUFPLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUNwQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1lBQ3RDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO1FBQzdCLDRDQUE0QztRQUM1Qyx5QkFBeUI7UUFDekIsaUNBQWlDO1FBQ2pDLElBQUk7SUFDTixDQUFDO0lBRU0sdURBQWlDLEdBQXhDLFVBQXlDLE9BQXlCO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBRztnQkFDakMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUEzQ0QsSUEyQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYW5HZW5lcmF0ZUFsZXJ0LCBBbGVydCB9IGZyb20gJy4vY2FuLWdlbmVyYXRlLWFsZXJ0JztcbmV4cG9ydCBjbGFzcyBBbGVydEhlbHBlciB7XG4gIHB1YmxpYyBoaWRlQWxlcnQoY29udHJvbDogQWxlcnQpIHtcbiAgICBjb250cm9sLnNob3duID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgc2hvd0FsZXJ0KGNvbnRyb2w6IEFsZXJ0KSB7XG4gICAgY29udHJvbC5zaG93biA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgc2V0QWxlcnRzRm9yQ29udHJvbChjb250cm9sOiBDYW5HZW5lcmF0ZUFsZXJ0LCBhbGVydDogQWxlcnQpIHtcbiAgICBjb250cm9sLmFsZXJ0cy5wdXNoKGFsZXJ0KTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhckFsZXJ0c0ZvckNvbnRyb2woY29udHJvbDogQ2FuR2VuZXJhdGVBbGVydCkge1xuICAgIGNvbnRyb2wuYWxlcnRzLnNwbGljZSgwKTtcbiAgICBjb250cm9sLmFsZXJ0ID0gJyc7XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGVDb250cm9sQWxlcnRzKGNvbnRyb2w6IENhbkdlbmVyYXRlQWxlcnQpIHtcbiAgICBsZXQgbWVzc2FnZVZhbHVlID0gJyc7XG4gICAgY29udHJvbC5hbGVydHMuZm9yRWFjaCgobWVzc2FnZSkgPT4ge1xuICAgICAgbWVzc2FnZS5yZUV2YWx1YXRlQWxlcnRFeHByZXNzaW9uKCk7XG4gICAgICBpZiAobWVzc2FnZS5zaG93biA9PT0gdHJ1ZSkge1xuICAgICAgICBtZXNzYWdlVmFsdWUgPSBtZXNzYWdlLmFsZXJ0TWVzc2FnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2VWYWx1ZSA9ICcnO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29udHJvbC5hbGVydCA9IG1lc3NhZ2VWYWx1ZTtcbiAgICAvLyBpZiAoY29udHJvbC5tZXNzYWdlICYmIGNvbnRyb2wuZGlzYWJsZSkge1xuICAgIC8vICAgICBjb250cm9sLmRpc2FibGUoKTtcbiAgICAvLyAgICAgLy8gY29udHJvbC5zZXRWYWx1ZShudWxsKTtcbiAgICAvLyB9XG4gIH1cblxuICBwdWJsaWMgc2V0VXBSZUV2YWx1YXRpb25XaGVuVmFsdWVDaGFuZ2VzKGNvbnRyb2w6IENhbkdlbmVyYXRlQWxlcnQpIHtcbiAgICBpZiAoY29udHJvbC51cGRhdGVBbGVydCkge1xuICAgICAgY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWwpID0+IHtcbiAgICAgICAgY29udHJvbC51cGRhdGVBbGVydCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=