/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ messageValue = '';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvY29udHJvbC1hbGVydHMvYWxlcnQtaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsSUFBQTs7Ozs7OztJQUVXLCtCQUFTOzs7O2NBQUMsT0FBYztRQUMzQixPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7Ozs7O0lBR25CLCtCQUFTOzs7O2NBQUMsT0FBYztRQUMzQixPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzs7Ozs7OztJQUdsQix5Q0FBbUI7Ozs7O2NBQUMsT0FBeUIsRUFBRSxLQUFZO1FBQzlELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7SUFHeEIsMkNBQXFCOzs7O2NBQUMsT0FBeUI7UUFDbEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Ozs7OztJQUdoQiwyQ0FBcUI7Ozs7Y0FBQyxPQUF5QjtRQUNsRCxxQkFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztZQUMxQixPQUFPLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUNwQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO2FBQ3ZDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osWUFBWSxHQUFHLEVBQUUsQ0FBQzthQUNyQjtTQUNKLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDOzs7Ozs7Ozs7O0lBTzFCLHVEQUFpQzs7OztjQUFDLE9BQXlCO1FBQzlELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBRztnQkFDL0IsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3pCLENBQUMsQ0FBQztTQUNOOztzQkEzQ1Q7SUE4Q0MsQ0FBQTtBQTdDRCx1QkE2Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYW5HZW5lcmF0ZUFsZXJ0LCBBbGVydCB9IGZyb20gJy4vY2FuLWdlbmVyYXRlLWFsZXJ0JztcclxuZXhwb3J0IGNsYXNzIEFsZXJ0SGVscGVyIHtcclxuXHJcbiAgICBwdWJsaWMgaGlkZUFsZXJ0KGNvbnRyb2w6IEFsZXJ0KSB7XHJcbiAgICAgICAgY29udHJvbC5zaG93biA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93QWxlcnQoY29udHJvbDogQWxlcnQpIHtcclxuICAgICAgICBjb250cm9sLnNob3duID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QWxlcnRzRm9yQ29udHJvbChjb250cm9sOiBDYW5HZW5lcmF0ZUFsZXJ0LCBhbGVydDogQWxlcnQpIHtcclxuICAgICAgICBjb250cm9sLmFsZXJ0cy5wdXNoKGFsZXJ0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJBbGVydHNGb3JDb250cm9sKGNvbnRyb2w6IENhbkdlbmVyYXRlQWxlcnQpIHtcclxuICAgICAgICBjb250cm9sLmFsZXJ0cy5zcGxpY2UoMCk7XHJcbiAgICAgICAgY29udHJvbC5hbGVydCA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBldmFsdWF0ZUNvbnRyb2xBbGVydHMoY29udHJvbDogQ2FuR2VuZXJhdGVBbGVydCkge1xyXG4gICAgICAgIGxldCBtZXNzYWdlVmFsdWUgPSAnJztcclxuICAgICAgICBjb250cm9sLmFsZXJ0cy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xyXG4gICAgICAgICAgICBtZXNzYWdlLnJlRXZhbHVhdGVBbGVydEV4cHJlc3Npb24oKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2Uuc2hvd24gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VWYWx1ZSA9IG1lc3NhZ2UuYWxlcnRNZXNzYWdlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29udHJvbC5hbGVydCA9IG1lc3NhZ2VWYWx1ZTtcclxuICAgICAgICAvLyBpZiAoY29udHJvbC5tZXNzYWdlICYmIGNvbnRyb2wuZGlzYWJsZSkge1xyXG4gICAgICAgIC8vICAgICBjb250cm9sLmRpc2FibGUoKTtcclxuICAgICAgICAvLyAgICAgLy8gY29udHJvbC5zZXRWYWx1ZShudWxsKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFVwUmVFdmFsdWF0aW9uV2hlblZhbHVlQ2hhbmdlcyhjb250cm9sOiBDYW5HZW5lcmF0ZUFsZXJ0KSB7XHJcbiAgICAgICAgaWYgKGNvbnRyb2wudXBkYXRlQWxlcnQpIHtcclxuICAgICAgICAgICAgY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2wudXBkYXRlQWxlcnQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=