/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ hiddenValue = false;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXItaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLElBQUE7Ozs7Ozs7SUFFVyxpQ0FBVzs7OztjQUFDLE9BQWdCO1FBQy9CLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNyQjs7Ozs7O0lBR0UsaUNBQVc7Ozs7Y0FBQyxPQUFnQjtRQUMvQixPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs7Ozs7OztJQUdwQix3Q0FBa0I7Ozs7O2NBQUMsT0FBZ0IsRUFBRSxLQUFZO1FBQ3BELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7SUFHeEIsMkNBQXFCOzs7O2NBQUMsT0FBZ0I7UUFDekMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Ozs7OztJQUdwQiwyQ0FBcUI7Ozs7Y0FBQyxPQUFnQjtRQUV6QyxxQkFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztZQUN4QixLQUFLLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztZQUNuQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLFdBQVcsR0FBRyxJQUFJLENBQUM7YUFDdEI7U0FDSixDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztRQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7U0FFckI7Ozs7OztJQUdFLHVEQUFpQzs7OztjQUFDLE9BQWdCO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDNUIsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFHO2dCQUMvQixPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUMvQixDQUFDLENBQUM7U0FDTjs7c0JBN0NUO0lBZ0RDLENBQUE7QUEvQ0QsdUJBK0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FuSGlkZSwgSGlkZXIgfSBmcm9tICcuL2Nhbi1oaWRlJztcclxuZXhwb3J0IGNsYXNzIEhpZGVySGVscGVyIHtcclxuXHJcbiAgICBwdWJsaWMgaGlkZUNvbnRyb2woY29udHJvbDogQ2FuSGlkZSkge1xyXG4gICAgICAgIGNvbnRyb2wuaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICBpZiAoY29udHJvbC5kaXNhYmxlKSB7XHJcbiAgICAgICAgICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0NvbnRyb2woY29udHJvbDogQ2FuSGlkZSkge1xyXG4gICAgICAgIGNvbnRyb2wuaGlkZGVuID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEhpZGVyRm9yQ29udHJvbChjb250cm9sOiBDYW5IaWRlLCBoaWRlcjogSGlkZXIpIHtcclxuICAgICAgICBjb250cm9sLmhpZGVycy5wdXNoKGhpZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJIaWRlcnNGb3JDb250cm9sKGNvbnRyb2w6IENhbkhpZGUpIHtcclxuICAgICAgICBjb250cm9sLmhpZGVycy5zcGxpY2UoMCk7XHJcbiAgICAgICAgY29udHJvbC5oaWRkZW4gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXZhbHVhdGVDb250cm9sSGlkZXJzKGNvbnRyb2w6IENhbkhpZGUpIHtcclxuXHJcbiAgICAgICAgbGV0IGhpZGRlblZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgY29udHJvbC5oaWRlcnMuZm9yRWFjaChoaWRlciA9PiB7XHJcbiAgICAgICAgICAgIGhpZGVyLnJlRXZhbHVhdGVIaWRpbmdFeHByZXNzaW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChoaWRlci50b0hpZGUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGhpZGRlblZhbHVlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb250cm9sLmhpZGRlbiA9IGhpZGRlblZhbHVlO1xyXG4gICAgICAgIGlmIChjb250cm9sLmhpZGRlbiAmJiBjb250cm9sLmRpc2FibGUpIHtcclxuICAgICAgICAgICAgY29udHJvbC5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnRyb2wuc2V0VmFsdWUobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRVcFJlRXZhbHVhdGlvbldoZW5WYWx1ZUNoYW5nZXMoY29udHJvbDogQ2FuSGlkZSkge1xyXG4gICAgICAgIGlmIChjb250cm9sLnVwZGF0ZUhpZGRlblN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sLnVwZGF0ZUhpZGRlblN0YXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19