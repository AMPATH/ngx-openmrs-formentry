var HiderHelper = /** @class */ (function () {
    function HiderHelper() {
    }
    HiderHelper.prototype.hideControl = function (control) {
        control.hidden = true;
        if (control.disable) {
            control.disable();
        }
    };
    HiderHelper.prototype.showControl = function (control) {
        control.hidden = false;
    };
    HiderHelper.prototype.setHiderForControl = function (control, hider) {
        control.hiders.push(hider);
    };
    HiderHelper.prototype.clearHidersForControl = function (control) {
        control.hiders.splice(0);
        control.hidden = false;
    };
    HiderHelper.prototype.evaluateControlHiders = function (control) {
        var hiddenValue = false;
        control.hiders.forEach(function (hider) {
            hider.reEvaluateHidingExpression();
            if (hider.toHide === true) {
                hiddenValue = true;
            }
        });
        control.hidden = hiddenValue;
        if (control.hidden && control.disable) {
            control.disable();
            // control.setValue(null);
        }
    };
    HiderHelper.prototype.setUpReEvaluationWhenValueChanges = function (control) {
        if (control.updateHiddenState) {
            control.valueChanges.subscribe(function (val) {
                control.updateHiddenState();
            });
        }
    };
    return HiderHelper;
}());
export { HiderHelper };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXItaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvaGlkZXItaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtJQUFBO0lBNENBLENBQUM7SUEzQ1EsaUNBQVcsR0FBbEIsVUFBbUIsT0FBZ0I7UUFDakMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLENBQUM7SUFDSCxDQUFDO0lBRU0saUNBQVcsR0FBbEIsVUFBbUIsT0FBZ0I7UUFDakMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVNLHdDQUFrQixHQUF6QixVQUEwQixPQUFnQixFQUFFLEtBQVk7UUFDdEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVNLDJDQUFxQixHQUE1QixVQUE2QixPQUFnQjtRQUMzQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRU0sMkNBQXFCLEdBQTVCLFVBQTZCLE9BQWdCO1FBQzNDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN4QixPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7WUFDM0IsS0FBSyxDQUFDLDBCQUEwQixFQUFFLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdEMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2xCLDBCQUEwQjtRQUM1QixDQUFDO0lBQ0gsQ0FBQztJQUVNLHVEQUFpQyxHQUF4QyxVQUF5QyxPQUFnQjtRQUN2RCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBRztnQkFDakMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQTVDRCxJQTRDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbkhpZGUsIEhpZGVyIH0gZnJvbSAnLi9jYW4taGlkZSc7XG5leHBvcnQgY2xhc3MgSGlkZXJIZWxwZXIge1xuICBwdWJsaWMgaGlkZUNvbnRyb2woY29udHJvbDogQ2FuSGlkZSkge1xuICAgIGNvbnRyb2wuaGlkZGVuID0gdHJ1ZTtcbiAgICBpZiAoY29udHJvbC5kaXNhYmxlKSB7XG4gICAgICBjb250cm9sLmRpc2FibGUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2hvd0NvbnRyb2woY29udHJvbDogQ2FuSGlkZSkge1xuICAgIGNvbnRyb2wuaGlkZGVuID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgc2V0SGlkZXJGb3JDb250cm9sKGNvbnRyb2w6IENhbkhpZGUsIGhpZGVyOiBIaWRlcikge1xuICAgIGNvbnRyb2wuaGlkZXJzLnB1c2goaGlkZXIpO1xuICB9XG5cbiAgcHVibGljIGNsZWFySGlkZXJzRm9yQ29udHJvbChjb250cm9sOiBDYW5IaWRlKSB7XG4gICAgY29udHJvbC5oaWRlcnMuc3BsaWNlKDApO1xuICAgIGNvbnRyb2wuaGlkZGVuID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGVDb250cm9sSGlkZXJzKGNvbnRyb2w6IENhbkhpZGUpIHtcbiAgICBsZXQgaGlkZGVuVmFsdWUgPSBmYWxzZTtcbiAgICBjb250cm9sLmhpZGVycy5mb3JFYWNoKChoaWRlcikgPT4ge1xuICAgICAgaGlkZXIucmVFdmFsdWF0ZUhpZGluZ0V4cHJlc3Npb24oKTtcbiAgICAgIGlmIChoaWRlci50b0hpZGUgPT09IHRydWUpIHtcbiAgICAgICAgaGlkZGVuVmFsdWUgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29udHJvbC5oaWRkZW4gPSBoaWRkZW5WYWx1ZTtcbiAgICBpZiAoY29udHJvbC5oaWRkZW4gJiYgY29udHJvbC5kaXNhYmxlKSB7XG4gICAgICBjb250cm9sLmRpc2FibGUoKTtcbiAgICAgIC8vIGNvbnRyb2wuc2V0VmFsdWUobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldFVwUmVFdmFsdWF0aW9uV2hlblZhbHVlQ2hhbmdlcyhjb250cm9sOiBDYW5IaWRlKSB7XG4gICAgaWYgKGNvbnRyb2wudXBkYXRlSGlkZGVuU3RhdGUpIHtcbiAgICAgIGNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsKSA9PiB7XG4gICAgICAgIGNvbnRyb2wudXBkYXRlSGlkZGVuU3RhdGUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19