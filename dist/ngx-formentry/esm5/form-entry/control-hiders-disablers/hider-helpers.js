/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        control.hiders.forEach((/**
         * @param {?} hider
         * @return {?}
         */
        function (hider) {
            hider.reEvaluateHidingExpression();
            if (hider.toHide === true) {
                hiddenValue = true;
            }
        }));
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
            control.valueChanges.subscribe((/**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                control.updateHiddenState();
            }));
        }
    };
    return HiderHelper;
}());
export { HiderHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXItaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBO0lBQUE7SUErQ0EsQ0FBQzs7Ozs7SUE3Q1UsaUNBQVc7Ozs7SUFBbEIsVUFBbUIsT0FBZ0I7UUFDL0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbEIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3RCLENBQUM7SUFDTCxDQUFDOzs7OztJQUVNLGlDQUFXOzs7O0lBQWxCLFVBQW1CLE9BQWdCO1FBQy9CLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7Ozs7OztJQUVNLHdDQUFrQjs7Ozs7SUFBekIsVUFBMEIsT0FBZ0IsRUFBRSxLQUFZO1FBQ3BELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRU0sMkNBQXFCOzs7O0lBQTVCLFVBQTZCLE9BQWdCO1FBQ3pDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRU0sMkNBQXFCOzs7O0lBQTVCLFVBQTZCLE9BQWdCOztZQUVyQyxXQUFXLEdBQUcsS0FBSztRQUN2QixPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLEtBQUs7WUFDeEIsS0FBSyxDQUFDLDBCQUEwQixFQUFFLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDcEMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2xCLDBCQUEwQjtRQUM5QixDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTSx1REFBaUM7Ozs7SUFBeEMsVUFBeUMsT0FBZ0I7UUFDckQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUM1QixPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFDLEdBQUc7Z0JBQy9CLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ2hDLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFFTCxrQkFBQztBQUFELENBQUMsQUEvQ0QsSUErQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYW5IaWRlLCBIaWRlciB9IGZyb20gJy4vY2FuLWhpZGUnO1xuZXhwb3J0IGNsYXNzIEhpZGVySGVscGVyIHtcblxuICAgIHB1YmxpYyBoaWRlQ29udHJvbChjb250cm9sOiBDYW5IaWRlKSB7XG4gICAgICAgIGNvbnRyb2wuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgaWYgKGNvbnRyb2wuZGlzYWJsZSkge1xuICAgICAgICAgICAgY29udHJvbC5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0NvbnRyb2woY29udHJvbDogQ2FuSGlkZSkge1xuICAgICAgICBjb250cm9sLmhpZGRlbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRIaWRlckZvckNvbnRyb2woY29udHJvbDogQ2FuSGlkZSwgaGlkZXI6IEhpZGVyKSB7XG4gICAgICAgIGNvbnRyb2wuaGlkZXJzLnB1c2goaGlkZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhckhpZGVyc0ZvckNvbnRyb2woY29udHJvbDogQ2FuSGlkZSkge1xuICAgICAgICBjb250cm9sLmhpZGVycy5zcGxpY2UoMCk7XG4gICAgICAgIGNvbnRyb2wuaGlkZGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGV2YWx1YXRlQ29udHJvbEhpZGVycyhjb250cm9sOiBDYW5IaWRlKSB7XG5cbiAgICAgICAgbGV0IGhpZGRlblZhbHVlID0gZmFsc2U7XG4gICAgICAgIGNvbnRyb2wuaGlkZXJzLmZvckVhY2goaGlkZXIgPT4ge1xuICAgICAgICAgICAgaGlkZXIucmVFdmFsdWF0ZUhpZGluZ0V4cHJlc3Npb24oKTtcbiAgICAgICAgICAgIGlmIChoaWRlci50b0hpZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBoaWRkZW5WYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnRyb2wuaGlkZGVuID0gaGlkZGVuVmFsdWU7XG4gICAgICAgIGlmIChjb250cm9sLmhpZGRlbiAmJiBjb250cm9sLmRpc2FibGUpIHtcbiAgICAgICAgICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xuICAgICAgICAgICAgLy8gY29udHJvbC5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRVcFJlRXZhbHVhdGlvbldoZW5WYWx1ZUNoYW5nZXMoY29udHJvbDogQ2FuSGlkZSkge1xuICAgICAgICBpZiAoY29udHJvbC51cGRhdGVIaWRkZW5TdGF0ZSkge1xuICAgICAgICAgICAgY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb250cm9sLnVwZGF0ZUhpZGRlblN0YXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19