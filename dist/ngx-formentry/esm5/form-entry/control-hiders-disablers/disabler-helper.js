/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ toDisable = false;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvZGlzYWJsZXItaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxJQUFBOzs7Ozs7OztJQUVXLDhDQUFxQjs7Ozs7Y0FBQyxPQUFtQixFQUFFLFFBQWtCO1FBQ2hFLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7SUFHOUIsaURBQXdCOzs7O2NBQUMsT0FBbUI7UUFDL0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDOzs7Ozs7SUFHZixpREFBd0I7Ozs7Y0FBQyxPQUFtQjtRQUMvQyxxQkFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztZQUMzQixLQUFLLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLFNBQVMsR0FBRyxJQUFJLENBQUM7YUFDcEI7U0FDSixDQUFDLENBQUM7O1FBSUgsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNaLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNyQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3BCOzs7Ozs7SUFHRSwwREFBaUM7Ozs7Y0FBQyxPQUFtQjtRQUN4RCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBRztnQkFDL0IsT0FBTyxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDakMsQ0FBQyxDQUFDO1NBQ047O3lCQW5DVDtJQXNDQyxDQUFBO0FBckNELDBCQXFDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbkRpc2FibGUsIERpc2FibGVyIH0gZnJvbSAnLi9jYW4tZGlzYWJsZSc7XHJcbmV4cG9ydCBjbGFzcyBEaXNhYmxlckhlbHBlciB7XHJcblxyXG4gICAgcHVibGljIHNldERpc2FibGVyRm9yQ29udHJvbChjb250cm9sOiBDYW5EaXNhYmxlLCBkaXNhYmxlcjogRGlzYWJsZXIpIHtcclxuICAgICAgICBjb250cm9sLmRpc2FibGVycy5wdXNoKGRpc2FibGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJEaXNhYmxlcnNGb3JDb250cm9sKGNvbnRyb2w6IENhbkRpc2FibGUpIHtcclxuICAgICAgICBjb250cm9sLmRpc2FibGVycy5zcGxpY2UoMCk7XHJcbiAgICAgICAgY29udHJvbC5kaXNhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV2YWx1YXRlQ29udHJvbERpc2FibGVycyhjb250cm9sOiBDYW5EaXNhYmxlKSB7XHJcbiAgICAgICAgbGV0IHRvRGlzYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnRyb2wuZGlzYWJsZXJzLmZvckVhY2goaGlkZXIgPT4ge1xyXG4gICAgICAgICAgICBoaWRlci5yZUV2YWx1YXRlRGlzYWJsaW5nRXhwcmVzc2lvbigpO1xyXG4gICAgICAgICAgICBpZiAoaGlkZXIudG9EaXNhYmxlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0b0Rpc2FibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdDb250cm9sJywgY29udHJvbCk7XHJcblxyXG4gICAgICAgIGlmICh0b0Rpc2FibGUpIHtcclxuICAgICAgICAgICAgY29udHJvbC5kaXNhYmxlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udHJvbC5lbmFibGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFVwUmVFdmFsdWF0aW9uV2hlblZhbHVlQ2hhbmdlcyhjb250cm9sOiBDYW5EaXNhYmxlKSB7XHJcbiAgICAgICAgaWYgKGNvbnRyb2wudXBkYXRlRGlzYWJsZWRTdGF0ZSkge1xyXG4gICAgICAgICAgICBjb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbC51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19