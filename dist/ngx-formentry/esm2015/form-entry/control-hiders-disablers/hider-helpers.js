/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        let /** @type {?} */ hiddenValue = false;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXItaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE1BQU07Ozs7O0lBRUssV0FBVyxDQUFDLE9BQWdCO1FBQy9CLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNyQjs7Ozs7O0lBR0UsV0FBVyxDQUFDLE9BQWdCO1FBQy9CLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOzs7Ozs7O0lBR3BCLGtCQUFrQixDQUFDLE9BQWdCLEVBQUUsS0FBWTtRQUNwRCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7O0lBR3hCLHFCQUFxQixDQUFDLE9BQWdCO1FBQ3pDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOzs7Ozs7SUFHcEIscUJBQXFCLENBQUMsT0FBZ0I7UUFFekMscUJBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN4QixPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzQixLQUFLLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztZQUNuQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLFdBQVcsR0FBRyxJQUFJLENBQUM7YUFDdEI7U0FDSixDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztRQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7U0FFckI7Ozs7OztJQUdFLGlDQUFpQyxDQUFDLE9BQWdCO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDNUIsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDbkMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDL0IsQ0FBQyxDQUFDO1NBQ047O0NBR1IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYW5IaWRlLCBIaWRlciB9IGZyb20gJy4vY2FuLWhpZGUnO1xyXG5leHBvcnQgY2xhc3MgSGlkZXJIZWxwZXIge1xyXG5cclxuICAgIHB1YmxpYyBoaWRlQ29udHJvbChjb250cm9sOiBDYW5IaWRlKSB7XHJcbiAgICAgICAgY29udHJvbC5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIGlmIChjb250cm9sLmRpc2FibGUpIHtcclxuICAgICAgICAgICAgY29udHJvbC5kaXNhYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93Q29udHJvbChjb250cm9sOiBDYW5IaWRlKSB7XHJcbiAgICAgICAgY29udHJvbC5oaWRkZW4gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0SGlkZXJGb3JDb250cm9sKGNvbnRyb2w6IENhbkhpZGUsIGhpZGVyOiBIaWRlcikge1xyXG4gICAgICAgIGNvbnRyb2wuaGlkZXJzLnB1c2goaGlkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckhpZGVyc0ZvckNvbnRyb2woY29udHJvbDogQ2FuSGlkZSkge1xyXG4gICAgICAgIGNvbnRyb2wuaGlkZXJzLnNwbGljZSgwKTtcclxuICAgICAgICBjb250cm9sLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBldmFsdWF0ZUNvbnRyb2xIaWRlcnMoY29udHJvbDogQ2FuSGlkZSkge1xyXG5cclxuICAgICAgICBsZXQgaGlkZGVuVmFsdWUgPSBmYWxzZTtcclxuICAgICAgICBjb250cm9sLmhpZGVycy5mb3JFYWNoKGhpZGVyID0+IHtcclxuICAgICAgICAgICAgaGlkZXIucmVFdmFsdWF0ZUhpZGluZ0V4cHJlc3Npb24oKTtcclxuICAgICAgICAgICAgaWYgKGhpZGVyLnRvSGlkZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgaGlkZGVuVmFsdWUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnRyb2wuaGlkZGVuID0gaGlkZGVuVmFsdWU7XHJcbiAgICAgICAgaWYgKGNvbnRyb2wuaGlkZGVuICYmIGNvbnRyb2wuZGlzYWJsZSkge1xyXG4gICAgICAgICAgICBjb250cm9sLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgLy8gY29udHJvbC5zZXRWYWx1ZShudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFVwUmVFdmFsdWF0aW9uV2hlblZhbHVlQ2hhbmdlcyhjb250cm9sOiBDYW5IaWRlKSB7XHJcbiAgICAgICAgaWYgKGNvbnRyb2wudXBkYXRlSGlkZGVuU3RhdGUpIHtcclxuICAgICAgICAgICAgY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2wudXBkYXRlSGlkZGVuU3RhdGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=