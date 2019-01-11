/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class HiderHelper {
    /**
     * @param {?} control
     * @return {?}
     */
    hideControl(control) {
        control.hidden = true;
        if (control.disable) {
            control.disable();
        }
    }
    /**
     * @param {?} control
     * @return {?}
     */
    showControl(control) {
        control.hidden = false;
    }
    /**
     * @param {?} control
     * @param {?} hider
     * @return {?}
     */
    setHiderForControl(control, hider) {
        control.hiders.push(hider);
    }
    /**
     * @param {?} control
     * @return {?}
     */
    clearHidersForControl(control) {
        control.hiders.splice(0);
        control.hidden = false;
    }
    /**
     * @param {?} control
     * @return {?}
     */
    evaluateControlHiders(control) {
        /** @type {?} */
        let hiddenValue = false;
        control.hiders.forEach(hider => {
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
    }
    /**
     * @param {?} control
     * @return {?}
     */
    setUpReEvaluationWhenValueChanges(control) {
        if (control.updateHiddenState) {
            control.valueChanges.subscribe((val) => {
                control.updateHiddenState();
            });
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXItaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE1BQU0sT0FBTyxXQUFXOzs7OztJQUViLFdBQVcsQ0FBQyxPQUFnQjtRQUMvQixPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQzs7Ozs7SUFFTSxXQUFXLENBQUMsT0FBZ0I7UUFDL0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQzs7Ozs7O0lBRU0sa0JBQWtCLENBQUMsT0FBZ0IsRUFBRSxLQUFZO1FBQ3BELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRU0scUJBQXFCLENBQUMsT0FBZ0I7UUFDekMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFTSxxQkFBcUIsQ0FBQyxPQUFnQjs7WUFFckMsV0FBVyxHQUFHLEtBQUs7UUFDdkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0IsS0FBSyxDQUFDLDBCQUEwQixFQUFFLENBQUM7WUFDbkMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtnQkFDdkIsV0FBVyxHQUFHLElBQUksQ0FBQzthQUN0QjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7UUFDN0IsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDbkMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2xCLDBCQUEwQjtTQUM3QjtJQUNMLENBQUM7Ozs7O0lBRU0saUNBQWlDLENBQUMsT0FBZ0I7UUFDckQsSUFBSSxPQUFPLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDbkMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbkhpZGUsIEhpZGVyIH0gZnJvbSAnLi9jYW4taGlkZSc7XG5leHBvcnQgY2xhc3MgSGlkZXJIZWxwZXIge1xuXG4gICAgcHVibGljIGhpZGVDb250cm9sKGNvbnRyb2w6IENhbkhpZGUpIHtcbiAgICAgICAgY29udHJvbC5oaWRkZW4gPSB0cnVlO1xuICAgICAgICBpZiAoY29udHJvbC5kaXNhYmxlKSB7XG4gICAgICAgICAgICBjb250cm9sLmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93Q29udHJvbChjb250cm9sOiBDYW5IaWRlKSB7XG4gICAgICAgIGNvbnRyb2wuaGlkZGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEhpZGVyRm9yQ29udHJvbChjb250cm9sOiBDYW5IaWRlLCBoaWRlcjogSGlkZXIpIHtcbiAgICAgICAgY29udHJvbC5oaWRlcnMucHVzaChoaWRlcik7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFySGlkZXJzRm9yQ29udHJvbChjb250cm9sOiBDYW5IaWRlKSB7XG4gICAgICAgIGNvbnRyb2wuaGlkZXJzLnNwbGljZSgwKTtcbiAgICAgICAgY29udHJvbC5oaWRkZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXZhbHVhdGVDb250cm9sSGlkZXJzKGNvbnRyb2w6IENhbkhpZGUpIHtcblxuICAgICAgICBsZXQgaGlkZGVuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgY29udHJvbC5oaWRlcnMuZm9yRWFjaChoaWRlciA9PiB7XG4gICAgICAgICAgICBoaWRlci5yZUV2YWx1YXRlSGlkaW5nRXhwcmVzc2lvbigpO1xuICAgICAgICAgICAgaWYgKGhpZGVyLnRvSGlkZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGhpZGRlblZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29udHJvbC5oaWRkZW4gPSBoaWRkZW5WYWx1ZTtcbiAgICAgICAgaWYgKGNvbnRyb2wuaGlkZGVuICYmIGNvbnRyb2wuZGlzYWJsZSkge1xuICAgICAgICAgICAgY29udHJvbC5kaXNhYmxlKCk7XG4gICAgICAgICAgICAvLyBjb250cm9sLnNldFZhbHVlKG51bGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldFVwUmVFdmFsdWF0aW9uV2hlblZhbHVlQ2hhbmdlcyhjb250cm9sOiBDYW5IaWRlKSB7XG4gICAgICAgIGlmIChjb250cm9sLnVwZGF0ZUhpZGRlblN0YXRlKSB7XG4gICAgICAgICAgICBjb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wudXBkYXRlSGlkZGVuU3RhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=