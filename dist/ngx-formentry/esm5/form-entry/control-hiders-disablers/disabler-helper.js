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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvZGlzYWJsZXItaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0lBQUE7SUFtQ0EsQ0FBQztJQWxDUSw4Q0FBcUIsR0FBNUIsVUFBNkIsT0FBbUIsRUFBRSxRQUFrQjtRQUNsRSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0saURBQXdCLEdBQS9CLFVBQWdDLE9BQW1CO1FBQ2pELE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU0saURBQXdCLEdBQS9CLFVBQWdDLE9BQW1CO1FBQ2pELElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN0QixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7WUFDOUIsS0FBSyxDQUFDLDZCQUE2QixFQUFFLENBQUM7WUFDdEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ25CLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILG1DQUFtQztRQUVuQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2QsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNuQixDQUFDO0lBQ0gsQ0FBQztJQUVNLDBEQUFpQyxHQUF4QyxVQUF5QyxPQUFtQjtRQUMxRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBRztnQkFDakMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQW5DRCxJQW1DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbkRpc2FibGUsIERpc2FibGVyIH0gZnJvbSAnLi9jYW4tZGlzYWJsZSc7XG5leHBvcnQgY2xhc3MgRGlzYWJsZXJIZWxwZXIge1xuICBwdWJsaWMgc2V0RGlzYWJsZXJGb3JDb250cm9sKGNvbnRyb2w6IENhbkRpc2FibGUsIGRpc2FibGVyOiBEaXNhYmxlcikge1xuICAgIGNvbnRyb2wuZGlzYWJsZXJzLnB1c2goZGlzYWJsZXIpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyRGlzYWJsZXJzRm9yQ29udHJvbChjb250cm9sOiBDYW5EaXNhYmxlKSB7XG4gICAgY29udHJvbC5kaXNhYmxlcnMuc3BsaWNlKDApO1xuICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xuICB9XG5cbiAgcHVibGljIGV2YWx1YXRlQ29udHJvbERpc2FibGVycyhjb250cm9sOiBDYW5EaXNhYmxlKSB7XG4gICAgbGV0IHRvRGlzYWJsZSA9IGZhbHNlO1xuICAgIGNvbnRyb2wuZGlzYWJsZXJzLmZvckVhY2goKGhpZGVyKSA9PiB7XG4gICAgICBoaWRlci5yZUV2YWx1YXRlRGlzYWJsaW5nRXhwcmVzc2lvbigpO1xuICAgICAgaWYgKGhpZGVyLnRvRGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICB0b0Rpc2FibGUgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gY29uc29sZS5sb2coJ0NvbnRyb2wnLCBjb250cm9sKTtcblxuICAgIGlmICh0b0Rpc2FibGUpIHtcbiAgICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250cm9sLmVuYWJsZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRVcFJlRXZhbHVhdGlvbldoZW5WYWx1ZUNoYW5nZXMoY29udHJvbDogQ2FuRGlzYWJsZSkge1xuICAgIGlmIChjb250cm9sLnVwZGF0ZURpc2FibGVkU3RhdGUpIHtcbiAgICAgIGNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsKSA9PiB7XG4gICAgICAgIGNvbnRyb2wudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=