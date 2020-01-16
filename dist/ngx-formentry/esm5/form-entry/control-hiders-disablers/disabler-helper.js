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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9kaXNhYmxlci1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7SUFBQTtJQXFDQSxDQUFDO0lBbkNVLDhDQUFxQixHQUE1QixVQUE2QixPQUFtQixFQUFFLFFBQWtCO1FBQ2hFLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxpREFBd0IsR0FBL0IsVUFBZ0MsT0FBbUI7UUFDL0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxpREFBd0IsR0FBL0IsVUFBZ0MsT0FBbUI7UUFDL0MsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztZQUMzQixLQUFLLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztZQUN0QyxJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO2dCQUMxQixTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQ3BCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxtQ0FBbUM7UUFFbkMsSUFBSSxTQUFTLEVBQUU7WUFDWCxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDckI7YUFBTTtZQUNILE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFFTSwwREFBaUMsR0FBeEMsVUFBeUMsT0FBbUI7UUFDeEQsSUFBSSxPQUFPLENBQUMsbUJBQW1CLEVBQUU7WUFDN0IsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFHO2dCQUMvQixPQUFPLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVMLHFCQUFDO0FBQUQsQ0FBQyxBQXJDRCxJQXFDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbkRpc2FibGUsIERpc2FibGVyIH0gZnJvbSAnLi9jYW4tZGlzYWJsZSc7XG5leHBvcnQgY2xhc3MgRGlzYWJsZXJIZWxwZXIge1xuXG4gICAgcHVibGljIHNldERpc2FibGVyRm9yQ29udHJvbChjb250cm9sOiBDYW5EaXNhYmxlLCBkaXNhYmxlcjogRGlzYWJsZXIpIHtcbiAgICAgICAgY29udHJvbC5kaXNhYmxlcnMucHVzaChkaXNhYmxlcik7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyRGlzYWJsZXJzRm9yQ29udHJvbChjb250cm9sOiBDYW5EaXNhYmxlKSB7XG4gICAgICAgIGNvbnRyb2wuZGlzYWJsZXJzLnNwbGljZSgwKTtcbiAgICAgICAgY29udHJvbC5kaXNhYmxlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGV2YWx1YXRlQ29udHJvbERpc2FibGVycyhjb250cm9sOiBDYW5EaXNhYmxlKSB7XG4gICAgICAgIGxldCB0b0Rpc2FibGUgPSBmYWxzZTtcbiAgICAgICAgY29udHJvbC5kaXNhYmxlcnMuZm9yRWFjaChoaWRlciA9PiB7XG4gICAgICAgICAgICBoaWRlci5yZUV2YWx1YXRlRGlzYWJsaW5nRXhwcmVzc2lvbigpO1xuICAgICAgICAgICAgaWYgKGhpZGVyLnRvRGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRvRGlzYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdDb250cm9sJywgY29udHJvbCk7XG5cbiAgICAgICAgaWYgKHRvRGlzYWJsZSkge1xuICAgICAgICAgICAgY29udHJvbC5kaXNhYmxlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250cm9sLmVuYWJsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldFVwUmVFdmFsdWF0aW9uV2hlblZhbHVlQ2hhbmdlcyhjb250cm9sOiBDYW5EaXNhYmxlKSB7XG4gICAgICAgIGlmIChjb250cm9sLnVwZGF0ZURpc2FibGVkU3RhdGUpIHtcbiAgICAgICAgICAgIGNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29udHJvbC51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19