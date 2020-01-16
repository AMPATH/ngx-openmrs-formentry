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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXItaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvaGlkZXItaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtJQUFBO0lBK0NBLENBQUM7SUE3Q1UsaUNBQVcsR0FBbEIsVUFBbUIsT0FBZ0I7UUFDL0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFFTSxpQ0FBVyxHQUFsQixVQUFtQixPQUFnQjtRQUMvQixPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRU0sd0NBQWtCLEdBQXpCLFVBQTBCLE9BQWdCLEVBQUUsS0FBWTtRQUNwRCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU0sMkNBQXFCLEdBQTVCLFVBQTZCLE9BQWdCO1FBQ3pDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFTSwyQ0FBcUIsR0FBNUIsVUFBNkIsT0FBZ0I7UUFFekMsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztZQUN4QixLQUFLLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztZQUNuQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO2dCQUN2QixXQUFXLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztRQUM3QixJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNuQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEIsMEJBQTBCO1NBQzdCO0lBQ0wsQ0FBQztJQUVNLHVEQUFpQyxHQUF4QyxVQUF5QyxPQUFnQjtRQUNyRCxJQUFJLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTtZQUMzQixPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEdBQUc7Z0JBQy9CLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUwsa0JBQUM7QUFBRCxDQUFDLEFBL0NELElBK0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FuSGlkZSwgSGlkZXIgfSBmcm9tICcuL2Nhbi1oaWRlJztcbmV4cG9ydCBjbGFzcyBIaWRlckhlbHBlciB7XG5cbiAgICBwdWJsaWMgaGlkZUNvbnRyb2woY29udHJvbDogQ2FuSGlkZSkge1xuICAgICAgICBjb250cm9sLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIGlmIChjb250cm9sLmRpc2FibGUpIHtcbiAgICAgICAgICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dDb250cm9sKGNvbnRyb2w6IENhbkhpZGUpIHtcbiAgICAgICAgY29udHJvbC5oaWRkZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0SGlkZXJGb3JDb250cm9sKGNvbnRyb2w6IENhbkhpZGUsIGhpZGVyOiBIaWRlcikge1xuICAgICAgICBjb250cm9sLmhpZGVycy5wdXNoKGhpZGVyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJIaWRlcnNGb3JDb250cm9sKGNvbnRyb2w6IENhbkhpZGUpIHtcbiAgICAgICAgY29udHJvbC5oaWRlcnMuc3BsaWNlKDApO1xuICAgICAgICBjb250cm9sLmhpZGRlbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBldmFsdWF0ZUNvbnRyb2xIaWRlcnMoY29udHJvbDogQ2FuSGlkZSkge1xuXG4gICAgICAgIGxldCBoaWRkZW5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICBjb250cm9sLmhpZGVycy5mb3JFYWNoKGhpZGVyID0+IHtcbiAgICAgICAgICAgIGhpZGVyLnJlRXZhbHVhdGVIaWRpbmdFeHByZXNzaW9uKCk7XG4gICAgICAgICAgICBpZiAoaGlkZXIudG9IaWRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaGlkZGVuVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb250cm9sLmhpZGRlbiA9IGhpZGRlblZhbHVlO1xuICAgICAgICBpZiAoY29udHJvbC5oaWRkZW4gJiYgY29udHJvbC5kaXNhYmxlKSB7XG4gICAgICAgICAgICBjb250cm9sLmRpc2FibGUoKTtcbiAgICAgICAgICAgIC8vIGNvbnRyb2wuc2V0VmFsdWUobnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0VXBSZUV2YWx1YXRpb25XaGVuVmFsdWVDaGFuZ2VzKGNvbnRyb2w6IENhbkhpZGUpIHtcbiAgICAgICAgaWYgKGNvbnRyb2wudXBkYXRlSGlkZGVuU3RhdGUpIHtcbiAgICAgICAgICAgIGNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29udHJvbC51cGRhdGVIaWRkZW5TdGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==