var DisablerHelper = /** @class */ (function () {
    function DisablerHelper() {
    }
    DisablerHelper.prototype.setDisablerForControl = function (control, disabler) {
        control.disablers.push(disabler);
    };
    DisablerHelper.prototype.clearDisablersForControl = function (control) {
        control.disablers.splice(0);
        control.disable();
    };
    DisablerHelper.prototype.evaluateControlDisablers = function (control) {
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
    DisablerHelper.prototype.setUpReEvaluationWhenValueChanges = function (control) {
        if (control.updateDisabledState) {
            control.valueChanges.subscribe(function (val) {
                control.updateDisabledState();
            });
        }
    };
    return DisablerHelper;
}());
export { DisablerHelper };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9kaXNhYmxlci1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7SUFBQTtJQW1DQSxDQUFDO0lBbENRLDhDQUFxQixHQUE1QixVQUE2QixPQUFtQixFQUFFLFFBQWtCO1FBQ2xFLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSxpREFBd0IsR0FBL0IsVUFBZ0MsT0FBbUI7UUFDakQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTSxpREFBd0IsR0FBL0IsVUFBZ0MsT0FBbUI7UUFDakQsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztZQUM5QixLQUFLLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDbkIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsbUNBQW1DO1FBRW5DLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZCxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25CLENBQUM7SUFDSCxDQUFDO0lBRU0sMERBQWlDLEdBQXhDLFVBQXlDLE9BQW1CO1FBQzFELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDaEMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFHO2dCQUNqQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBbkNELElBbUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FuRGlzYWJsZSwgRGlzYWJsZXIgfSBmcm9tICcuL2Nhbi1kaXNhYmxlJztcbmV4cG9ydCBjbGFzcyBEaXNhYmxlckhlbHBlciB7XG4gIHB1YmxpYyBzZXREaXNhYmxlckZvckNvbnRyb2woY29udHJvbDogQ2FuRGlzYWJsZSwgZGlzYWJsZXI6IERpc2FibGVyKSB7XG4gICAgY29udHJvbC5kaXNhYmxlcnMucHVzaChkaXNhYmxlcik7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJEaXNhYmxlcnNGb3JDb250cm9sKGNvbnRyb2w6IENhbkRpc2FibGUpIHtcbiAgICBjb250cm9sLmRpc2FibGVycy5zcGxpY2UoMCk7XG4gICAgY29udHJvbC5kaXNhYmxlKCk7XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGVDb250cm9sRGlzYWJsZXJzKGNvbnRyb2w6IENhbkRpc2FibGUpIHtcbiAgICBsZXQgdG9EaXNhYmxlID0gZmFsc2U7XG4gICAgY29udHJvbC5kaXNhYmxlcnMuZm9yRWFjaCgoaGlkZXIpID0+IHtcbiAgICAgIGhpZGVyLnJlRXZhbHVhdGVEaXNhYmxpbmdFeHByZXNzaW9uKCk7XG4gICAgICBpZiAoaGlkZXIudG9EaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICAgIHRvRGlzYWJsZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBjb25zb2xlLmxvZygnQ29udHJvbCcsIGNvbnRyb2wpO1xuXG4gICAgaWYgKHRvRGlzYWJsZSkge1xuICAgICAgY29udHJvbC5kaXNhYmxlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRyb2wuZW5hYmxlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldFVwUmVFdmFsdWF0aW9uV2hlblZhbHVlQ2hhbmdlcyhjb250cm9sOiBDYW5EaXNhYmxlKSB7XG4gICAgaWYgKGNvbnRyb2wudXBkYXRlRGlzYWJsZWRTdGF0ZSkge1xuICAgICAgY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWwpID0+IHtcbiAgICAgICAgY29udHJvbC51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==