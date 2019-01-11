/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class AlertHelper {
    /**
     * @param {?} control
     * @return {?}
     */
    hideAlert(control) {
        control.shown = false;
    }
    /**
     * @param {?} control
     * @return {?}
     */
    showAlert(control) {
        control.shown = true;
    }
    /**
     * @param {?} control
     * @param {?} alert
     * @return {?}
     */
    setAlertsForControl(control, alert) {
        control.alerts.push(alert);
    }
    /**
     * @param {?} control
     * @return {?}
     */
    clearAlertsForControl(control) {
        control.alerts.splice(0);
        control.alert = '';
    }
    /**
     * @param {?} control
     * @return {?}
     */
    evaluateControlAlerts(control) {
        /** @type {?} */
        let messageValue = '';
        control.alerts.forEach(message => {
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
    }
    /**
     * @param {?} control
     * @return {?}
     */
    setUpReEvaluationWhenValueChanges(control) {
        if (control.updateAlert) {
            control.valueChanges.subscribe((val) => {
                control.updateAlert();
            });
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvY29udHJvbC1hbGVydHMvYWxlcnQtaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsTUFBTSxPQUFPLFdBQVc7Ozs7O0lBRWIsU0FBUyxDQUFDLE9BQWM7UUFDM0IsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFTSxTQUFTLENBQUMsT0FBYztRQUMzQixPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDOzs7Ozs7SUFFTSxtQkFBbUIsQ0FBQyxPQUF5QixFQUFFLEtBQVk7UUFDOUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7SUFFTSxxQkFBcUIsQ0FBQyxPQUF5QjtRQUNsRCxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVNLHFCQUFxQixDQUFDLE9BQXlCOztZQUM5QyxZQUFZLEdBQUcsRUFBRTtRQUNyQixPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3QixPQUFPLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUNwQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO2dCQUN4QixZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQzthQUN2QztpQkFBTTtnQkFDSCxZQUFZLEdBQUcsRUFBRSxDQUFDO2FBQ3JCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztRQUM3Qiw0Q0FBNEM7UUFDNUMseUJBQXlCO1FBQ3pCLGlDQUFpQztRQUNqQyxJQUFJO0lBQ1IsQ0FBQzs7Ozs7SUFFTSxpQ0FBaUMsQ0FBQyxPQUF5QjtRQUM5RCxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDckIsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDbkMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYW5HZW5lcmF0ZUFsZXJ0LCBBbGVydCB9IGZyb20gJy4vY2FuLWdlbmVyYXRlLWFsZXJ0JztcbmV4cG9ydCBjbGFzcyBBbGVydEhlbHBlciB7XG5cbiAgICBwdWJsaWMgaGlkZUFsZXJ0KGNvbnRyb2w6IEFsZXJ0KSB7XG4gICAgICAgIGNvbnRyb2wuc2hvd24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0FsZXJ0KGNvbnRyb2w6IEFsZXJ0KSB7XG4gICAgICAgIGNvbnRyb2wuc2hvd24gPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRBbGVydHNGb3JDb250cm9sKGNvbnRyb2w6IENhbkdlbmVyYXRlQWxlcnQsIGFsZXJ0OiBBbGVydCkge1xuICAgICAgICBjb250cm9sLmFsZXJ0cy5wdXNoKGFsZXJ0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJBbGVydHNGb3JDb250cm9sKGNvbnRyb2w6IENhbkdlbmVyYXRlQWxlcnQpIHtcbiAgICAgICAgY29udHJvbC5hbGVydHMuc3BsaWNlKDApO1xuICAgICAgICBjb250cm9sLmFsZXJ0ID0gJyc7XG4gICAgfVxuXG4gICAgcHVibGljIGV2YWx1YXRlQ29udHJvbEFsZXJ0cyhjb250cm9sOiBDYW5HZW5lcmF0ZUFsZXJ0KSB7XG4gICAgICAgIGxldCBtZXNzYWdlVmFsdWUgPSAnJztcbiAgICAgICAgY29udHJvbC5hbGVydHMuZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgICAgICAgIG1lc3NhZ2UucmVFdmFsdWF0ZUFsZXJ0RXhwcmVzc2lvbigpO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2Uuc2hvd24gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlVmFsdWUgPSBtZXNzYWdlLmFsZXJ0TWVzc2FnZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZVZhbHVlID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnRyb2wuYWxlcnQgPSBtZXNzYWdlVmFsdWU7XG4gICAgICAgIC8vIGlmIChjb250cm9sLm1lc3NhZ2UgJiYgY29udHJvbC5kaXNhYmxlKSB7XG4gICAgICAgIC8vICAgICBjb250cm9sLmRpc2FibGUoKTtcbiAgICAgICAgLy8gICAgIC8vIGNvbnRyb2wuc2V0VmFsdWUobnVsbCk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0VXBSZUV2YWx1YXRpb25XaGVuVmFsdWVDaGFuZ2VzKGNvbnRyb2w6IENhbkdlbmVyYXRlQWxlcnQpIHtcbiAgICAgICAgaWYgKGNvbnRyb2wudXBkYXRlQWxlcnQpIHtcbiAgICAgICAgICAgIGNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29udHJvbC51cGRhdGVBbGVydCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==