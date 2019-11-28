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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvZGlzYWJsZXItaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0lBQUE7SUFxQ0EsQ0FBQztJQW5DVSw4Q0FBcUIsR0FBNUIsVUFBNkIsT0FBbUIsRUFBRSxRQUFrQjtRQUNoRSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0saURBQXdCLEdBQS9CLFVBQWdDLE9BQW1CO1FBQy9DLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU0saURBQXdCLEdBQS9CLFVBQWdDLE9BQW1CO1FBQy9DLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN0QixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7WUFDM0IsS0FBSyxDQUFDLDZCQUE2QixFQUFFLENBQUM7WUFDdEMsSUFBSSxLQUFLLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtnQkFDMUIsU0FBUyxHQUFHLElBQUksQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsbUNBQW1DO1FBRW5DLElBQUksU0FBUyxFQUFFO1lBQ1gsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3JCO2FBQU07WUFDSCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRU0sMERBQWlDLEdBQXhDLFVBQXlDLE9BQW1CO1FBQ3hELElBQUksT0FBTyxDQUFDLG1CQUFtQixFQUFFO1lBQzdCLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBRztnQkFDL0IsT0FBTyxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFTCxxQkFBQztBQUFELENBQUMsQUFyQ0QsSUFxQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYW5EaXNhYmxlLCBEaXNhYmxlciB9IGZyb20gJy4vY2FuLWRpc2FibGUnO1xuZXhwb3J0IGNsYXNzIERpc2FibGVySGVscGVyIHtcblxuICAgIHB1YmxpYyBzZXREaXNhYmxlckZvckNvbnRyb2woY29udHJvbDogQ2FuRGlzYWJsZSwgZGlzYWJsZXI6IERpc2FibGVyKSB7XG4gICAgICAgIGNvbnRyb2wuZGlzYWJsZXJzLnB1c2goZGlzYWJsZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhckRpc2FibGVyc0ZvckNvbnRyb2woY29udHJvbDogQ2FuRGlzYWJsZSkge1xuICAgICAgICBjb250cm9sLmRpc2FibGVycy5zcGxpY2UoMCk7XG4gICAgICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBldmFsdWF0ZUNvbnRyb2xEaXNhYmxlcnMoY29udHJvbDogQ2FuRGlzYWJsZSkge1xuICAgICAgICBsZXQgdG9EaXNhYmxlID0gZmFsc2U7XG4gICAgICAgIGNvbnRyb2wuZGlzYWJsZXJzLmZvckVhY2goaGlkZXIgPT4ge1xuICAgICAgICAgICAgaGlkZXIucmVFdmFsdWF0ZURpc2FibGluZ0V4cHJlc3Npb24oKTtcbiAgICAgICAgICAgIGlmIChoaWRlci50b0Rpc2FibGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0b0Rpc2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnQ29udHJvbCcsIGNvbnRyb2wpO1xuXG4gICAgICAgIGlmICh0b0Rpc2FibGUpIHtcbiAgICAgICAgICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udHJvbC5lbmFibGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRVcFJlRXZhbHVhdGlvbldoZW5WYWx1ZUNoYW5nZXMoY29udHJvbDogQ2FuRGlzYWJsZSkge1xuICAgICAgICBpZiAoY29udHJvbC51cGRhdGVEaXNhYmxlZFN0YXRlKSB7XG4gICAgICAgICAgICBjb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==