/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        control.disablers.forEach((/**
         * @param {?} hider
         * @return {?}
         */
        function (hider) {
            hider.reEvaluateDisablingExpression();
            if (hider.toDisable === true) {
                toDisable = true;
            }
        }));
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
            control.valueChanges.subscribe((/**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                control.updateDisabledState();
            }));
        }
    };
    return DisablerHelper;
}());
export { DisablerHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvZGlzYWJsZXItaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQTtJQUFBO0lBcUNBLENBQUM7Ozs7OztJQW5DVSw4Q0FBcUI7Ozs7O0lBQTVCLFVBQTZCLE9BQW1CLEVBQUUsUUFBa0I7UUFDaEUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7SUFFTSxpREFBd0I7Ozs7SUFBL0IsVUFBZ0MsT0FBbUI7UUFDL0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBRU0saURBQXdCOzs7O0lBQS9CLFVBQWdDLE9BQW1COztZQUMzQyxTQUFTLEdBQUcsS0FBSztRQUNyQixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLEtBQUs7WUFDM0IsS0FBSyxDQUFDLDZCQUE2QixFQUFFLENBQUM7WUFDdEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUVILG1DQUFtQztRQUVuQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ1osT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTSwwREFBaUM7Ozs7SUFBeEMsVUFBeUMsT0FBbUI7UUFDeEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUM5QixPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFDLEdBQUc7Z0JBQy9CLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQ2xDLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFFTCxxQkFBQztBQUFELENBQUMsQUFyQ0QsSUFxQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYW5EaXNhYmxlLCBEaXNhYmxlciB9IGZyb20gJy4vY2FuLWRpc2FibGUnO1xuZXhwb3J0IGNsYXNzIERpc2FibGVySGVscGVyIHtcblxuICAgIHB1YmxpYyBzZXREaXNhYmxlckZvckNvbnRyb2woY29udHJvbDogQ2FuRGlzYWJsZSwgZGlzYWJsZXI6IERpc2FibGVyKSB7XG4gICAgICAgIGNvbnRyb2wuZGlzYWJsZXJzLnB1c2goZGlzYWJsZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhckRpc2FibGVyc0ZvckNvbnRyb2woY29udHJvbDogQ2FuRGlzYWJsZSkge1xuICAgICAgICBjb250cm9sLmRpc2FibGVycy5zcGxpY2UoMCk7XG4gICAgICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBldmFsdWF0ZUNvbnRyb2xEaXNhYmxlcnMoY29udHJvbDogQ2FuRGlzYWJsZSkge1xuICAgICAgICBsZXQgdG9EaXNhYmxlID0gZmFsc2U7XG4gICAgICAgIGNvbnRyb2wuZGlzYWJsZXJzLmZvckVhY2goaGlkZXIgPT4ge1xuICAgICAgICAgICAgaGlkZXIucmVFdmFsdWF0ZURpc2FibGluZ0V4cHJlc3Npb24oKTtcbiAgICAgICAgICAgIGlmIChoaWRlci50b0Rpc2FibGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0b0Rpc2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnQ29udHJvbCcsIGNvbnRyb2wpO1xuXG4gICAgICAgIGlmICh0b0Rpc2FibGUpIHtcbiAgICAgICAgICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udHJvbC5lbmFibGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRVcFJlRXZhbHVhdGlvbldoZW5WYWx1ZUNoYW5nZXMoY29udHJvbDogQ2FuRGlzYWJsZSkge1xuICAgICAgICBpZiAoY29udHJvbC51cGRhdGVEaXNhYmxlZFN0YXRlKSB7XG4gICAgICAgICAgICBjb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==