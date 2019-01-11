/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DisablerHelper = /** @class */ (function () {
    function DisablerHelper() {
    }
    /**
     * @param {?} control
     * @param {?} disabler
     * @return {?}
     */
    DisablerHelper.prototype.setDisablerForControl = /**
     * @param {?} control
     * @param {?} disabler
     * @return {?}
     */
    function (control, disabler) {
        control.disablers.push(disabler);
    };
    /**
     * @param {?} control
     * @return {?}
     */
    DisablerHelper.prototype.clearDisablersForControl = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        control.disablers.splice(0);
        control.disable();
    };
    /**
     * @param {?} control
     * @return {?}
     */
    DisablerHelper.prototype.evaluateControlDisablers = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        /** @type {?} */
        var toDisable = false;
        control.disablers.forEach(function (hider) {
            hider.reEvaluateDisablingExpression();
            if (hider.toDisable === true) {
                toDisable = true;
            }
        });
        // console.log('Control', control);
        if (toDisable) {
            control.disable();
        }
        else {
            control.enable();
        }
    };
    /**
     * @param {?} control
     * @return {?}
     */
    DisablerHelper.prototype.setUpReEvaluationWhenValueChanges = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        if (control.updateDisabledState) {
            control.valueChanges.subscribe(function (val) {
                control.updateDisabledState();
            });
        }
    };
    return DisablerHelper;
}());
export { DisablerHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvZGlzYWJsZXItaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQTtJQUFBO0lBcUNBLENBQUM7Ozs7OztJQW5DVSw4Q0FBcUI7Ozs7O0lBQTVCLFVBQTZCLE9BQW1CLEVBQUUsUUFBa0I7UUFDaEUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7SUFFTSxpREFBd0I7Ozs7SUFBL0IsVUFBZ0MsT0FBbUI7UUFDL0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBRU0saURBQXdCOzs7O0lBQS9CLFVBQWdDLE9BQW1COztZQUMzQyxTQUFTLEdBQUcsS0FBSztRQUNyQixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7WUFDM0IsS0FBSyxDQUFDLDZCQUE2QixFQUFFLENBQUM7WUFDdEMsSUFBSSxLQUFLLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtnQkFDMUIsU0FBUyxHQUFHLElBQUksQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsbUNBQW1DO1FBRW5DLElBQUksU0FBUyxFQUFFO1lBQ1gsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3JCO2FBQU07WUFDSCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDcEI7SUFDTCxDQUFDOzs7OztJQUVNLDBEQUFpQzs7OztJQUF4QyxVQUF5QyxPQUFtQjtRQUN4RCxJQUFJLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRTtZQUM3QixPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEdBQUc7Z0JBQy9CLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUwscUJBQUM7QUFBRCxDQUFDLEFBckNELElBcUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FuRGlzYWJsZSwgRGlzYWJsZXIgfSBmcm9tICcuL2Nhbi1kaXNhYmxlJztcbmV4cG9ydCBjbGFzcyBEaXNhYmxlckhlbHBlciB7XG5cbiAgICBwdWJsaWMgc2V0RGlzYWJsZXJGb3JDb250cm9sKGNvbnRyb2w6IENhbkRpc2FibGUsIGRpc2FibGVyOiBEaXNhYmxlcikge1xuICAgICAgICBjb250cm9sLmRpc2FibGVycy5wdXNoKGRpc2FibGVyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJEaXNhYmxlcnNGb3JDb250cm9sKGNvbnRyb2w6IENhbkRpc2FibGUpIHtcbiAgICAgICAgY29udHJvbC5kaXNhYmxlcnMuc3BsaWNlKDApO1xuICAgICAgICBjb250cm9sLmRpc2FibGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXZhbHVhdGVDb250cm9sRGlzYWJsZXJzKGNvbnRyb2w6IENhbkRpc2FibGUpIHtcbiAgICAgICAgbGV0IHRvRGlzYWJsZSA9IGZhbHNlO1xuICAgICAgICBjb250cm9sLmRpc2FibGVycy5mb3JFYWNoKGhpZGVyID0+IHtcbiAgICAgICAgICAgIGhpZGVyLnJlRXZhbHVhdGVEaXNhYmxpbmdFeHByZXNzaW9uKCk7XG4gICAgICAgICAgICBpZiAoaGlkZXIudG9EaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdG9EaXNhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0NvbnRyb2wnLCBjb250cm9sKTtcblxuICAgICAgICBpZiAodG9EaXNhYmxlKSB7XG4gICAgICAgICAgICBjb250cm9sLmRpc2FibGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRyb2wuZW5hYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0VXBSZUV2YWx1YXRpb25XaGVuVmFsdWVDaGFuZ2VzKGNvbnRyb2w6IENhbkRpc2FibGUpIHtcbiAgICAgICAgaWYgKGNvbnRyb2wudXBkYXRlRGlzYWJsZWRTdGF0ZSkge1xuICAgICAgICAgICAgY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb250cm9sLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=