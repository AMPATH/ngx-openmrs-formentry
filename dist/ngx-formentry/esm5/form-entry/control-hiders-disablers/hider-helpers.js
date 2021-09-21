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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXItaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7SUFBQTtJQTRDQSxDQUFDO0lBM0NRLGlDQUFXLEdBQWxCLFVBQW1CLE9BQWdCO1FBQ2pDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNwQixDQUFDO0lBQ0gsQ0FBQztJQUVNLGlDQUFXLEdBQWxCLFVBQW1CLE9BQWdCO1FBQ2pDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFTSx3Q0FBa0IsR0FBekIsVUFBMEIsT0FBZ0IsRUFBRSxLQUFZO1FBQ3RELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTSwyQ0FBcUIsR0FBNUIsVUFBNkIsT0FBZ0I7UUFDM0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVNLDJDQUFxQixHQUE1QixVQUE2QixPQUFnQjtRQUMzQyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDeEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO1lBQzNCLEtBQUssQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsV0FBVyxHQUFHLElBQUksQ0FBQztZQUNyQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztRQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNsQiwwQkFBMEI7UUFDNUIsQ0FBQztJQUNILENBQUM7SUFFTSx1REFBaUMsR0FBeEMsVUFBeUMsT0FBZ0I7UUFDdkQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUM5QixPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEdBQUc7Z0JBQ2pDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUE1Q0QsSUE0Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYW5IaWRlLCBIaWRlciB9IGZyb20gJy4vY2FuLWhpZGUnO1xuZXhwb3J0IGNsYXNzIEhpZGVySGVscGVyIHtcbiAgcHVibGljIGhpZGVDb250cm9sKGNvbnRyb2w6IENhbkhpZGUpIHtcbiAgICBjb250cm9sLmhpZGRlbiA9IHRydWU7XG4gICAgaWYgKGNvbnRyb2wuZGlzYWJsZSkge1xuICAgICAgY29udHJvbC5kaXNhYmxlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNob3dDb250cm9sKGNvbnRyb2w6IENhbkhpZGUpIHtcbiAgICBjb250cm9sLmhpZGRlbiA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHNldEhpZGVyRm9yQ29udHJvbChjb250cm9sOiBDYW5IaWRlLCBoaWRlcjogSGlkZXIpIHtcbiAgICBjb250cm9sLmhpZGVycy5wdXNoKGhpZGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhckhpZGVyc0ZvckNvbnRyb2woY29udHJvbDogQ2FuSGlkZSkge1xuICAgIGNvbnRyb2wuaGlkZXJzLnNwbGljZSgwKTtcbiAgICBjb250cm9sLmhpZGRlbiA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGV2YWx1YXRlQ29udHJvbEhpZGVycyhjb250cm9sOiBDYW5IaWRlKSB7XG4gICAgbGV0IGhpZGRlblZhbHVlID0gZmFsc2U7XG4gICAgY29udHJvbC5oaWRlcnMuZm9yRWFjaCgoaGlkZXIpID0+IHtcbiAgICAgIGhpZGVyLnJlRXZhbHVhdGVIaWRpbmdFeHByZXNzaW9uKCk7XG4gICAgICBpZiAoaGlkZXIudG9IaWRlID09PSB0cnVlKSB7XG4gICAgICAgIGhpZGRlblZhbHVlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnRyb2wuaGlkZGVuID0gaGlkZGVuVmFsdWU7XG4gICAgaWYgKGNvbnRyb2wuaGlkZGVuICYmIGNvbnRyb2wuZGlzYWJsZSkge1xuICAgICAgY29udHJvbC5kaXNhYmxlKCk7XG4gICAgICAvLyBjb250cm9sLnNldFZhbHVlKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRVcFJlRXZhbHVhdGlvbldoZW5WYWx1ZUNoYW5nZXMoY29udHJvbDogQ2FuSGlkZSkge1xuICAgIGlmIChjb250cm9sLnVwZGF0ZUhpZGRlblN0YXRlKSB7XG4gICAgICBjb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbCkgPT4ge1xuICAgICAgICBjb250cm9sLnVwZGF0ZUhpZGRlblN0YXRlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==