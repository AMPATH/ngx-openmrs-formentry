/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        let /** @type {?} */ messageValue = '';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvY29udHJvbC1hbGVydHMvYWxlcnQtaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsTUFBTTs7Ozs7SUFFSyxTQUFTLENBQUMsT0FBYztRQUMzQixPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7Ozs7O0lBR25CLFNBQVMsQ0FBQyxPQUFjO1FBQzNCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDOzs7Ozs7O0lBR2xCLG1CQUFtQixDQUFDLE9BQXlCLEVBQUUsS0FBWTtRQUM5RCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7O0lBR3hCLHFCQUFxQixDQUFDLE9BQXlCO1FBQ2xELE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDOzs7Ozs7SUFHaEIscUJBQXFCLENBQUMsT0FBeUI7UUFDbEQscUJBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN0QixPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3QixPQUFPLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUNwQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO2FBQ3ZDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osWUFBWSxHQUFHLEVBQUUsQ0FBQzthQUNyQjtTQUNKLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDOzs7Ozs7Ozs7O0lBTzFCLGlDQUFpQyxDQUFDLE9BQXlCO1FBQzlELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ25DLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN6QixDQUFDLENBQUM7U0FDTjs7Q0FHUiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbkdlbmVyYXRlQWxlcnQsIEFsZXJ0IH0gZnJvbSAnLi9jYW4tZ2VuZXJhdGUtYWxlcnQnO1xyXG5leHBvcnQgY2xhc3MgQWxlcnRIZWxwZXIge1xyXG5cclxuICAgIHB1YmxpYyBoaWRlQWxlcnQoY29udHJvbDogQWxlcnQpIHtcclxuICAgICAgICBjb250cm9sLnNob3duID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dBbGVydChjb250cm9sOiBBbGVydCkge1xyXG4gICAgICAgIGNvbnRyb2wuc2hvd24gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRBbGVydHNGb3JDb250cm9sKGNvbnRyb2w6IENhbkdlbmVyYXRlQWxlcnQsIGFsZXJ0OiBBbGVydCkge1xyXG4gICAgICAgIGNvbnRyb2wuYWxlcnRzLnB1c2goYWxlcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckFsZXJ0c0ZvckNvbnRyb2woY29udHJvbDogQ2FuR2VuZXJhdGVBbGVydCkge1xyXG4gICAgICAgIGNvbnRyb2wuYWxlcnRzLnNwbGljZSgwKTtcclxuICAgICAgICBjb250cm9sLmFsZXJ0ID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV2YWx1YXRlQ29udHJvbEFsZXJ0cyhjb250cm9sOiBDYW5HZW5lcmF0ZUFsZXJ0KSB7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VWYWx1ZSA9ICcnO1xyXG4gICAgICAgIGNvbnRyb2wuYWxlcnRzLmZvckVhY2gobWVzc2FnZSA9PiB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UucmVFdmFsdWF0ZUFsZXJ0RXhwcmVzc2lvbigpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5zaG93biA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVZhbHVlID0gbWVzc2FnZS5hbGVydE1lc3NhZ2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlVmFsdWUgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb250cm9sLmFsZXJ0ID0gbWVzc2FnZVZhbHVlO1xyXG4gICAgICAgIC8vIGlmIChjb250cm9sLm1lc3NhZ2UgJiYgY29udHJvbC5kaXNhYmxlKSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xyXG4gICAgICAgIC8vICAgICAvLyBjb250cm9sLnNldFZhbHVlKG51bGwpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VXBSZUV2YWx1YXRpb25XaGVuVmFsdWVDaGFuZ2VzKGNvbnRyb2w6IENhbkdlbmVyYXRlQWxlcnQpIHtcclxuICAgICAgICBpZiAoY29udHJvbC51cGRhdGVBbGVydCkge1xyXG4gICAgICAgICAgICBjb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbC51cGRhdGVBbGVydCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==