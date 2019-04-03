/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class DisablerHelper {
    /**
     * @param {?} control
     * @param {?} disabler
     * @return {?}
     */
    setDisablerForControl(control, disabler) {
        control.disablers.push(disabler);
    }
    /**
     * @param {?} control
     * @return {?}
     */
    clearDisablersForControl(control) {
        control.disablers.splice(0);
        control.disable();
    }
    /**
     * @param {?} control
     * @return {?}
     */
    evaluateControlDisablers(control) {
        /** @type {?} */
        let toDisable = false;
        control.disablers.forEach((/**
         * @param {?} hider
         * @return {?}
         */
        hider => {
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
    }
    /**
     * @param {?} control
     * @return {?}
     */
    setUpReEvaluationWhenValueChanges(control) {
        if (control.updateDisabledState) {
            control.valueChanges.subscribe((/**
             * @param {?} val
             * @return {?}
             */
            (val) => {
                control.updateDisabledState();
            }));
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvZGlzYWJsZXItaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxNQUFNOzs7Ozs7SUFFSyxxQkFBcUIsQ0FBQyxPQUFtQixFQUFFLFFBQWtCO1FBQ2hFLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7O0lBRU0sd0JBQXdCLENBQUMsT0FBbUI7UUFDL0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBRU0sd0JBQXdCLENBQUMsT0FBbUI7O1lBQzNDLFNBQVMsR0FBRyxLQUFLO1FBQ3JCLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlCLEtBQUssQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsU0FBUyxHQUFHLElBQUksQ0FBQztZQUNyQixDQUFDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFFSCxtQ0FBbUM7UUFFbkMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNaLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRU0saUNBQWlDLENBQUMsT0FBbUI7UUFDeEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUM5QixPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVM7Ozs7WUFBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNuQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUNsQyxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYW5EaXNhYmxlLCBEaXNhYmxlciB9IGZyb20gJy4vY2FuLWRpc2FibGUnO1xyXG5leHBvcnQgY2xhc3MgRGlzYWJsZXJIZWxwZXIge1xyXG5cclxuICAgIHB1YmxpYyBzZXREaXNhYmxlckZvckNvbnRyb2woY29udHJvbDogQ2FuRGlzYWJsZSwgZGlzYWJsZXI6IERpc2FibGVyKSB7XHJcbiAgICAgICAgY29udHJvbC5kaXNhYmxlcnMucHVzaChkaXNhYmxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyRGlzYWJsZXJzRm9yQ29udHJvbChjb250cm9sOiBDYW5EaXNhYmxlKSB7XHJcbiAgICAgICAgY29udHJvbC5kaXNhYmxlcnMuc3BsaWNlKDApO1xyXG4gICAgICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBldmFsdWF0ZUNvbnRyb2xEaXNhYmxlcnMoY29udHJvbDogQ2FuRGlzYWJsZSkge1xyXG4gICAgICAgIGxldCB0b0Rpc2FibGUgPSBmYWxzZTtcclxuICAgICAgICBjb250cm9sLmRpc2FibGVycy5mb3JFYWNoKGhpZGVyID0+IHtcclxuICAgICAgICAgICAgaGlkZXIucmVFdmFsdWF0ZURpc2FibGluZ0V4cHJlc3Npb24oKTtcclxuICAgICAgICAgICAgaWYgKGhpZGVyLnRvRGlzYWJsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdG9EaXNhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnQ29udHJvbCcsIGNvbnRyb2wpO1xyXG5cclxuICAgICAgICBpZiAodG9EaXNhYmxlKSB7XHJcbiAgICAgICAgICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnRyb2wuZW5hYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRVcFJlRXZhbHVhdGlvbldoZW5WYWx1ZUNoYW5nZXMoY29udHJvbDogQ2FuRGlzYWJsZSkge1xyXG4gICAgICAgIGlmIChjb250cm9sLnVwZGF0ZURpc2FibGVkU3RhdGUpIHtcclxuICAgICAgICAgICAgY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2wudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==