/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AlertHelper = /** @class */ (function () {
    function AlertHelper() {
    }
    /**
     * @param {?} control
     * @return {?}
     */
    AlertHelper.prototype.hideAlert = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        control.shown = false;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    AlertHelper.prototype.showAlert = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        control.shown = true;
    };
    /**
     * @param {?} control
     * @param {?} alert
     * @return {?}
     */
    AlertHelper.prototype.setAlertsForControl = /**
     * @param {?} control
     * @param {?} alert
     * @return {?}
     */
    function (control, alert) {
        control.alerts.push(alert);
    };
    /**
     * @param {?} control
     * @return {?}
     */
    AlertHelper.prototype.clearAlertsForControl = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        control.alerts.splice(0);
        control.alert = '';
    };
    /**
     * @param {?} control
     * @return {?}
     */
    AlertHelper.prototype.evaluateControlAlerts = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        /** @type {?} */
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
    /**
     * @param {?} control
     * @return {?}
     */
    AlertHelper.prototype.setUpReEvaluationWhenValueChanges = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        if (control.updateAlert) {
            control.valueChanges.subscribe(function (val) {
                control.updateAlert();
            });
        }
    };
    return AlertHelper;
}());
export { AlertHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvY29udHJvbC1hbGVydHMvYWxlcnQtaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0E7SUFBQTtJQTZDQSxDQUFDOzs7OztJQTNDVSwrQkFBUzs7OztJQUFoQixVQUFpQixPQUFjO1FBQzNCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRU0sK0JBQVM7Ozs7SUFBaEIsVUFBaUIsT0FBYztRQUMzQixPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDOzs7Ozs7SUFFTSx5Q0FBbUI7Ozs7O0lBQTFCLFVBQTJCLE9BQXlCLEVBQUUsS0FBWTtRQUM5RCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7OztJQUVNLDJDQUFxQjs7OztJQUE1QixVQUE2QixPQUF5QjtRQUNsRCxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVNLDJDQUFxQjs7OztJQUE1QixVQUE2QixPQUF5Qjs7WUFDOUMsWUFBWSxHQUFHLEVBQUU7UUFDckIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQzFCLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDekIsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7WUFDeEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDdEIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7UUFDN0IsNENBQTRDO1FBQzVDLHlCQUF5QjtRQUN6QixpQ0FBaUM7UUFDakMsSUFBSTtJQUNSLENBQUM7Ozs7O0lBRU0sdURBQWlDOzs7O0lBQXhDLFVBQXlDLE9BQXlCO1FBQzlELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBRztnQkFDL0IsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFFTCxrQkFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYW5HZW5lcmF0ZUFsZXJ0LCBBbGVydCB9IGZyb20gJy4vY2FuLWdlbmVyYXRlLWFsZXJ0JztcbmV4cG9ydCBjbGFzcyBBbGVydEhlbHBlciB7XG5cbiAgICBwdWJsaWMgaGlkZUFsZXJ0KGNvbnRyb2w6IEFsZXJ0KSB7XG4gICAgICAgIGNvbnRyb2wuc2hvd24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0FsZXJ0KGNvbnRyb2w6IEFsZXJ0KSB7XG4gICAgICAgIGNvbnRyb2wuc2hvd24gPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRBbGVydHNGb3JDb250cm9sKGNvbnRyb2w6IENhbkdlbmVyYXRlQWxlcnQsIGFsZXJ0OiBBbGVydCkge1xuICAgICAgICBjb250cm9sLmFsZXJ0cy5wdXNoKGFsZXJ0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJBbGVydHNGb3JDb250cm9sKGNvbnRyb2w6IENhbkdlbmVyYXRlQWxlcnQpIHtcbiAgICAgICAgY29udHJvbC5hbGVydHMuc3BsaWNlKDApO1xuICAgICAgICBjb250cm9sLmFsZXJ0ID0gJyc7XG4gICAgfVxuXG4gICAgcHVibGljIGV2YWx1YXRlQ29udHJvbEFsZXJ0cyhjb250cm9sOiBDYW5HZW5lcmF0ZUFsZXJ0KSB7XG4gICAgICAgIGxldCBtZXNzYWdlVmFsdWUgPSAnJztcbiAgICAgICAgY29udHJvbC5hbGVydHMuZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgICAgICAgIG1lc3NhZ2UucmVFdmFsdWF0ZUFsZXJ0RXhwcmVzc2lvbigpO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2Uuc2hvd24gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlVmFsdWUgPSBtZXNzYWdlLmFsZXJ0TWVzc2FnZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZVZhbHVlID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnRyb2wuYWxlcnQgPSBtZXNzYWdlVmFsdWU7XG4gICAgICAgIC8vIGlmIChjb250cm9sLm1lc3NhZ2UgJiYgY29udHJvbC5kaXNhYmxlKSB7XG4gICAgICAgIC8vICAgICBjb250cm9sLmRpc2FibGUoKTtcbiAgICAgICAgLy8gICAgIC8vIGNvbnRyb2wuc2V0VmFsdWUobnVsbCk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0VXBSZUV2YWx1YXRpb25XaGVuVmFsdWVDaGFuZ2VzKGNvbnRyb2w6IENhbkdlbmVyYXRlQWxlcnQpIHtcbiAgICAgICAgaWYgKGNvbnRyb2wudXBkYXRlQWxlcnQpIHtcbiAgICAgICAgICAgIGNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29udHJvbC51cGRhdGVBbGVydCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==