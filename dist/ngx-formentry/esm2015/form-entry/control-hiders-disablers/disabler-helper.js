/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        control.disablers.forEach(hider => {
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
    }
    /**
     * @param {?} control
     * @return {?}
     */
    setUpReEvaluationWhenValueChanges(control) {
        if (control.updateDisabledState) {
            control.valueChanges.subscribe((val) => {
                control.updateDisabledState();
            });
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvZGlzYWJsZXItaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxNQUFNLE9BQU8sY0FBYzs7Ozs7O0lBRWhCLHFCQUFxQixDQUFDLE9BQW1CLEVBQUUsUUFBa0I7UUFDaEUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7SUFFTSx3QkFBd0IsQ0FBQyxPQUFtQjtRQUMvQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFFTSx3QkFBd0IsQ0FBQyxPQUFtQjs7WUFDM0MsU0FBUyxHQUFHLEtBQUs7UUFDckIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDOUIsS0FBSyxDQUFDLDZCQUE2QixFQUFFLENBQUM7WUFDdEMsSUFBSSxLQUFLLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtnQkFDMUIsU0FBUyxHQUFHLElBQUksQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsbUNBQW1DO1FBRW5DLElBQUksU0FBUyxFQUFFO1lBQ1gsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3JCO2FBQU07WUFDSCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDcEI7SUFDTCxDQUFDOzs7OztJQUVNLGlDQUFpQyxDQUFDLE9BQW1CO1FBQ3hELElBQUksT0FBTyxDQUFDLG1CQUFtQixFQUFFO1lBQzdCLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ25DLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYW5EaXNhYmxlLCBEaXNhYmxlciB9IGZyb20gJy4vY2FuLWRpc2FibGUnO1xuZXhwb3J0IGNsYXNzIERpc2FibGVySGVscGVyIHtcblxuICAgIHB1YmxpYyBzZXREaXNhYmxlckZvckNvbnRyb2woY29udHJvbDogQ2FuRGlzYWJsZSwgZGlzYWJsZXI6IERpc2FibGVyKSB7XG4gICAgICAgIGNvbnRyb2wuZGlzYWJsZXJzLnB1c2goZGlzYWJsZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhckRpc2FibGVyc0ZvckNvbnRyb2woY29udHJvbDogQ2FuRGlzYWJsZSkge1xuICAgICAgICBjb250cm9sLmRpc2FibGVycy5zcGxpY2UoMCk7XG4gICAgICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBldmFsdWF0ZUNvbnRyb2xEaXNhYmxlcnMoY29udHJvbDogQ2FuRGlzYWJsZSkge1xuICAgICAgICBsZXQgdG9EaXNhYmxlID0gZmFsc2U7XG4gICAgICAgIGNvbnRyb2wuZGlzYWJsZXJzLmZvckVhY2goaGlkZXIgPT4ge1xuICAgICAgICAgICAgaGlkZXIucmVFdmFsdWF0ZURpc2FibGluZ0V4cHJlc3Npb24oKTtcbiAgICAgICAgICAgIGlmIChoaWRlci50b0Rpc2FibGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0b0Rpc2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnQ29udHJvbCcsIGNvbnRyb2wpO1xuXG4gICAgICAgIGlmICh0b0Rpc2FibGUpIHtcbiAgICAgICAgICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udHJvbC5lbmFibGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRVcFJlRXZhbHVhdGlvbldoZW5WYWx1ZUNoYW5nZXMoY29udHJvbDogQ2FuRGlzYWJsZSkge1xuICAgICAgICBpZiAoY29udHJvbC51cGRhdGVEaXNhYmxlZFN0YXRlKSB7XG4gICAgICAgICAgICBjb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==