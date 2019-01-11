/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var HiderHelper = /** @class */ (function () {
    function HiderHelper() {
    }
    /**
     * @param {?} control
     * @return {?}
     */
    HiderHelper.prototype.hideControl = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        control.hidden = true;
        if (control.disable) {
            control.disable();
        }
    };
    /**
     * @param {?} control
     * @return {?}
     */
    HiderHelper.prototype.showControl = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        control.hidden = false;
    };
    /**
     * @param {?} control
     * @param {?} hider
     * @return {?}
     */
    HiderHelper.prototype.setHiderForControl = /**
     * @param {?} control
     * @param {?} hider
     * @return {?}
     */
    function (control, hider) {
        control.hiders.push(hider);
    };
    /**
     * @param {?} control
     * @return {?}
     */
    HiderHelper.prototype.clearHidersForControl = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        control.hiders.splice(0);
        control.hidden = false;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    HiderHelper.prototype.evaluateControlHiders = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        /** @type {?} */
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
    /**
     * @param {?} control
     * @return {?}
     */
    HiderHelper.prototype.setUpReEvaluationWhenValueChanges = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        if (control.updateHiddenState) {
            control.valueChanges.subscribe(function (val) {
                control.updateHiddenState();
            });
        }
    };
    return HiderHelper;
}());
export { HiderHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXItaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBO0lBQUE7SUErQ0EsQ0FBQzs7Ozs7SUE3Q1UsaUNBQVc7Ozs7SUFBbEIsVUFBbUIsT0FBZ0I7UUFDL0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7Ozs7O0lBRU0saUNBQVc7Ozs7SUFBbEIsVUFBbUIsT0FBZ0I7UUFDL0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQzs7Ozs7O0lBRU0sd0NBQWtCOzs7OztJQUF6QixVQUEwQixPQUFnQixFQUFFLEtBQVk7UUFDcEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7SUFFTSwyQ0FBcUI7Ozs7SUFBNUIsVUFBNkIsT0FBZ0I7UUFDekMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFTSwyQ0FBcUI7Ozs7SUFBNUIsVUFBNkIsT0FBZ0I7O1lBRXJDLFdBQVcsR0FBRyxLQUFLO1FBQ3ZCLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztZQUN4QixLQUFLLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztZQUNuQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO2dCQUN2QixXQUFXLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztRQUM3QixJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNuQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEIsMEJBQTBCO1NBQzdCO0lBQ0wsQ0FBQzs7Ozs7SUFFTSx1REFBaUM7Ozs7SUFBeEMsVUFBeUMsT0FBZ0I7UUFDckQsSUFBSSxPQUFPLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFHO2dCQUMvQixPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVMLGtCQUFDO0FBQUQsQ0FBQyxBQS9DRCxJQStDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbkhpZGUsIEhpZGVyIH0gZnJvbSAnLi9jYW4taGlkZSc7XG5leHBvcnQgY2xhc3MgSGlkZXJIZWxwZXIge1xuXG4gICAgcHVibGljIGhpZGVDb250cm9sKGNvbnRyb2w6IENhbkhpZGUpIHtcbiAgICAgICAgY29udHJvbC5oaWRkZW4gPSB0cnVlO1xuICAgICAgICBpZiAoY29udHJvbC5kaXNhYmxlKSB7XG4gICAgICAgICAgICBjb250cm9sLmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93Q29udHJvbChjb250cm9sOiBDYW5IaWRlKSB7XG4gICAgICAgIGNvbnRyb2wuaGlkZGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEhpZGVyRm9yQ29udHJvbChjb250cm9sOiBDYW5IaWRlLCBoaWRlcjogSGlkZXIpIHtcbiAgICAgICAgY29udHJvbC5oaWRlcnMucHVzaChoaWRlcik7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFySGlkZXJzRm9yQ29udHJvbChjb250cm9sOiBDYW5IaWRlKSB7XG4gICAgICAgIGNvbnRyb2wuaGlkZXJzLnNwbGljZSgwKTtcbiAgICAgICAgY29udHJvbC5oaWRkZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXZhbHVhdGVDb250cm9sSGlkZXJzKGNvbnRyb2w6IENhbkhpZGUpIHtcblxuICAgICAgICBsZXQgaGlkZGVuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgY29udHJvbC5oaWRlcnMuZm9yRWFjaChoaWRlciA9PiB7XG4gICAgICAgICAgICBoaWRlci5yZUV2YWx1YXRlSGlkaW5nRXhwcmVzc2lvbigpO1xuICAgICAgICAgICAgaWYgKGhpZGVyLnRvSGlkZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGhpZGRlblZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29udHJvbC5oaWRkZW4gPSBoaWRkZW5WYWx1ZTtcbiAgICAgICAgaWYgKGNvbnRyb2wuaGlkZGVuICYmIGNvbnRyb2wuZGlzYWJsZSkge1xuICAgICAgICAgICAgY29udHJvbC5kaXNhYmxlKCk7XG4gICAgICAgICAgICAvLyBjb250cm9sLnNldFZhbHVlKG51bGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldFVwUmVFdmFsdWF0aW9uV2hlblZhbHVlQ2hhbmdlcyhjb250cm9sOiBDYW5IaWRlKSB7XG4gICAgICAgIGlmIChjb250cm9sLnVwZGF0ZUhpZGRlblN0YXRlKSB7XG4gICAgICAgICAgICBjb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wudXBkYXRlSGlkZGVuU3RhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=