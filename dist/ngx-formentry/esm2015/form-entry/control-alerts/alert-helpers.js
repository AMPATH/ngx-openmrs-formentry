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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvY29udHJvbC1hbGVydHMvYWxlcnQtaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsTUFBTTs7Ozs7SUFFSyxTQUFTLENBQUMsT0FBYztRQUMzQixPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDOzs7OztJQUVNLFNBQVMsQ0FBQyxPQUFjO1FBQzNCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7Ozs7OztJQUVNLG1CQUFtQixDQUFDLE9BQXlCLEVBQUUsS0FBWTtRQUM5RCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7OztJQUVNLHFCQUFxQixDQUFDLE9BQXlCO1FBQ2xELE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRU0scUJBQXFCLENBQUMsT0FBeUI7O1lBQzlDLFlBQVksR0FBRyxFQUFFO1FBQ3JCLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzdCLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDekIsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7WUFDeEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDdEIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7UUFDN0IsNENBQTRDO1FBQzVDLHlCQUF5QjtRQUN6QixpQ0FBaUM7UUFDakMsSUFBSTtJQUNSLENBQUM7Ozs7O0lBRU0saUNBQWlDLENBQUMsT0FBeUI7UUFDOUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdEIsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDbkMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbkdlbmVyYXRlQWxlcnQsIEFsZXJ0IH0gZnJvbSAnLi9jYW4tZ2VuZXJhdGUtYWxlcnQnO1xuZXhwb3J0IGNsYXNzIEFsZXJ0SGVscGVyIHtcblxuICAgIHB1YmxpYyBoaWRlQWxlcnQoY29udHJvbDogQWxlcnQpIHtcbiAgICAgICAgY29udHJvbC5zaG93biA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93QWxlcnQoY29udHJvbDogQWxlcnQpIHtcbiAgICAgICAgY29udHJvbC5zaG93biA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEFsZXJ0c0ZvckNvbnRyb2woY29udHJvbDogQ2FuR2VuZXJhdGVBbGVydCwgYWxlcnQ6IEFsZXJ0KSB7XG4gICAgICAgIGNvbnRyb2wuYWxlcnRzLnB1c2goYWxlcnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhckFsZXJ0c0ZvckNvbnRyb2woY29udHJvbDogQ2FuR2VuZXJhdGVBbGVydCkge1xuICAgICAgICBjb250cm9sLmFsZXJ0cy5zcGxpY2UoMCk7XG4gICAgICAgIGNvbnRyb2wuYWxlcnQgPSAnJztcbiAgICB9XG5cbiAgICBwdWJsaWMgZXZhbHVhdGVDb250cm9sQWxlcnRzKGNvbnRyb2w6IENhbkdlbmVyYXRlQWxlcnQpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2VWYWx1ZSA9ICcnO1xuICAgICAgICBjb250cm9sLmFsZXJ0cy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgICAgICAgbWVzc2FnZS5yZUV2YWx1YXRlQWxlcnRFeHByZXNzaW9uKCk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5zaG93biA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VWYWx1ZSA9IG1lc3NhZ2UuYWxlcnRNZXNzYWdlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlVmFsdWUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29udHJvbC5hbGVydCA9IG1lc3NhZ2VWYWx1ZTtcbiAgICAgICAgLy8gaWYgKGNvbnRyb2wubWVzc2FnZSAmJiBjb250cm9sLmRpc2FibGUpIHtcbiAgICAgICAgLy8gICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xuICAgICAgICAvLyAgICAgLy8gY29udHJvbC5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRVcFJlRXZhbHVhdGlvbldoZW5WYWx1ZUNoYW5nZXMoY29udHJvbDogQ2FuR2VuZXJhdGVBbGVydCkge1xuICAgICAgICBpZiAoY29udHJvbC51cGRhdGVBbGVydCkge1xuICAgICAgICAgICAgY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb250cm9sLnVwZGF0ZUFsZXJ0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19