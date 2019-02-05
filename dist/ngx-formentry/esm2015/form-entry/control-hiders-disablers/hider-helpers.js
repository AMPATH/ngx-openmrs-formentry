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
        control.hiddenStatusChanges.next(true);
    }
    /**
     * @param {?} control
     * @return {?}
     */
    showControl(control) {
        control.hidden = false;
        control.hiddenStatusChanges.next(false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXItaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE1BQU07Ozs7O0lBRUssV0FBVyxDQUFDLE9BQWdCO1FBQy9CLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBQ0QsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7OztJQUVNLFdBQVcsQ0FBQyxPQUFnQjtRQUMvQixPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN2QixPQUFPLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7Ozs7OztJQUVNLGtCQUFrQixDQUFDLE9BQWdCLEVBQUUsS0FBWTtRQUNwRCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7OztJQUVNLHFCQUFxQixDQUFDLE9BQWdCO1FBQ3pDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRU0scUJBQXFCLENBQUMsT0FBZ0I7O1lBRXJDLFdBQVcsR0FBRyxLQUFLO1FBQ3ZCLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNCLEtBQUssQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN2QixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztRQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNsQiwwQkFBMEI7UUFDOUIsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRU0saUNBQWlDLENBQUMsT0FBZ0I7UUFDckQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUM1QixPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNuQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYW5IaWRlLCBIaWRlciB9IGZyb20gJy4vY2FuLWhpZGUnO1xuZXhwb3J0IGNsYXNzIEhpZGVySGVscGVyIHtcblxuICAgIHB1YmxpYyBoaWRlQ29udHJvbChjb250cm9sOiBDYW5IaWRlKSB7XG4gICAgICAgIGNvbnRyb2wuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgaWYgKGNvbnRyb2wuZGlzYWJsZSkge1xuICAgICAgICAgICAgY29udHJvbC5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29udHJvbC5oaWRkZW5TdGF0dXNDaGFuZ2VzLm5leHQodHJ1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dDb250cm9sKGNvbnRyb2w6IENhbkhpZGUpIHtcbiAgICAgICAgY29udHJvbC5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgY29udHJvbC5oaWRkZW5TdGF0dXNDaGFuZ2VzLm5leHQoZmFsc2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRIaWRlckZvckNvbnRyb2woY29udHJvbDogQ2FuSGlkZSwgaGlkZXI6IEhpZGVyKSB7XG4gICAgICAgIGNvbnRyb2wuaGlkZXJzLnB1c2goaGlkZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhckhpZGVyc0ZvckNvbnRyb2woY29udHJvbDogQ2FuSGlkZSkge1xuICAgICAgICBjb250cm9sLmhpZGVycy5zcGxpY2UoMCk7XG4gICAgICAgIGNvbnRyb2wuaGlkZGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGV2YWx1YXRlQ29udHJvbEhpZGVycyhjb250cm9sOiBDYW5IaWRlKSB7XG5cbiAgICAgICAgbGV0IGhpZGRlblZhbHVlID0gZmFsc2U7XG4gICAgICAgIGNvbnRyb2wuaGlkZXJzLmZvckVhY2goaGlkZXIgPT4ge1xuICAgICAgICAgICAgaGlkZXIucmVFdmFsdWF0ZUhpZGluZ0V4cHJlc3Npb24oKTtcbiAgICAgICAgICAgIGlmIChoaWRlci50b0hpZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBoaWRkZW5WYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnRyb2wuaGlkZGVuID0gaGlkZGVuVmFsdWU7XG4gICAgICAgIGlmIChjb250cm9sLmhpZGRlbiAmJiBjb250cm9sLmRpc2FibGUpIHtcbiAgICAgICAgICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xuICAgICAgICAgICAgLy8gY29udHJvbC5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRVcFJlRXZhbHVhdGlvbldoZW5WYWx1ZUNoYW5nZXMoY29udHJvbDogQ2FuSGlkZSkge1xuICAgICAgICBpZiAoY29udHJvbC51cGRhdGVIaWRkZW5TdGF0ZSkge1xuICAgICAgICAgICAgY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb250cm9sLnVwZGF0ZUhpZGRlblN0YXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19