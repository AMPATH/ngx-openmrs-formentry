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
        control.hiddenStatusChanges.next(true);
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
        control.hiddenStatusChanges.next(false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXItaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBO0lBQUE7SUFpREEsQ0FBQzs7Ozs7SUEvQ1UsaUNBQVc7Ozs7SUFBbEIsVUFBbUIsT0FBZ0I7UUFDL0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbEIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFDRCxPQUFPLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBRU0saUNBQVc7Ozs7SUFBbEIsVUFBbUIsT0FBZ0I7UUFDL0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDdkIsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7Ozs7SUFFTSx3Q0FBa0I7Ozs7O0lBQXpCLFVBQTBCLE9BQWdCLEVBQUUsS0FBWTtRQUNwRCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7OztJQUVNLDJDQUFxQjs7OztJQUE1QixVQUE2QixPQUFnQjtRQUN6QyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDOzs7OztJQUVNLDJDQUFxQjs7OztJQUE1QixVQUE2QixPQUFnQjs7WUFFckMsV0FBVyxHQUFHLEtBQUs7UUFDdkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO1lBQ3hCLEtBQUssQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN2QixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztRQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNsQiwwQkFBMEI7UUFDOUIsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRU0sdURBQWlDOzs7O0lBQXhDLFVBQXlDLE9BQWdCO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDNUIsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFHO2dCQUMvQixPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBRUwsa0JBQUM7QUFBRCxDQUFDLEFBakRELElBaURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FuSGlkZSwgSGlkZXIgfSBmcm9tICcuL2Nhbi1oaWRlJztcbmV4cG9ydCBjbGFzcyBIaWRlckhlbHBlciB7XG5cbiAgICBwdWJsaWMgaGlkZUNvbnRyb2woY29udHJvbDogQ2FuSGlkZSkge1xuICAgICAgICBjb250cm9sLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIGlmIChjb250cm9sLmRpc2FibGUpIHtcbiAgICAgICAgICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRyb2wuaGlkZGVuU3RhdHVzQ2hhbmdlcy5uZXh0KHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93Q29udHJvbChjb250cm9sOiBDYW5IaWRlKSB7XG4gICAgICAgIGNvbnRyb2wuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIGNvbnRyb2wuaGlkZGVuU3RhdHVzQ2hhbmdlcy5uZXh0KGZhbHNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0SGlkZXJGb3JDb250cm9sKGNvbnRyb2w6IENhbkhpZGUsIGhpZGVyOiBIaWRlcikge1xuICAgICAgICBjb250cm9sLmhpZGVycy5wdXNoKGhpZGVyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJIaWRlcnNGb3JDb250cm9sKGNvbnRyb2w6IENhbkhpZGUpIHtcbiAgICAgICAgY29udHJvbC5oaWRlcnMuc3BsaWNlKDApO1xuICAgICAgICBjb250cm9sLmhpZGRlbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBldmFsdWF0ZUNvbnRyb2xIaWRlcnMoY29udHJvbDogQ2FuSGlkZSkge1xuXG4gICAgICAgIGxldCBoaWRkZW5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICBjb250cm9sLmhpZGVycy5mb3JFYWNoKGhpZGVyID0+IHtcbiAgICAgICAgICAgIGhpZGVyLnJlRXZhbHVhdGVIaWRpbmdFeHByZXNzaW9uKCk7XG4gICAgICAgICAgICBpZiAoaGlkZXIudG9IaWRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaGlkZGVuVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb250cm9sLmhpZGRlbiA9IGhpZGRlblZhbHVlO1xuICAgICAgICBpZiAoY29udHJvbC5oaWRkZW4gJiYgY29udHJvbC5kaXNhYmxlKSB7XG4gICAgICAgICAgICBjb250cm9sLmRpc2FibGUoKTtcbiAgICAgICAgICAgIC8vIGNvbnRyb2wuc2V0VmFsdWUobnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0VXBSZUV2YWx1YXRpb25XaGVuVmFsdWVDaGFuZ2VzKGNvbnRyb2w6IENhbkhpZGUpIHtcbiAgICAgICAgaWYgKGNvbnRyb2wudXBkYXRlSGlkZGVuU3RhdGUpIHtcbiAgICAgICAgICAgIGNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29udHJvbC51cGRhdGVIaWRkZW5TdGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==