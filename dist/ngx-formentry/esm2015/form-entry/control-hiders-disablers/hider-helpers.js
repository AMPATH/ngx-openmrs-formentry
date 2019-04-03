/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        control.hiders.forEach((/**
         * @param {?} hider
         * @return {?}
         */
        hider => {
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
    }
    /**
     * @param {?} control
     * @return {?}
     */
    setUpReEvaluationWhenValueChanges(control) {
        if (control.updateHiddenState) {
            control.valueChanges.subscribe((/**
             * @param {?} val
             * @return {?}
             */
            (val) => {
                control.updateHiddenState();
            }));
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXItaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE1BQU07Ozs7O0lBRUssV0FBVyxDQUFDLE9BQWdCO1FBQy9CLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QixDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTSxXQUFXLENBQUMsT0FBZ0I7UUFDL0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQzs7Ozs7O0lBRU0sa0JBQWtCLENBQUMsT0FBZ0IsRUFBRSxLQUFZO1FBQ3BELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRU0scUJBQXFCLENBQUMsT0FBZ0I7UUFDekMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFTSxxQkFBcUIsQ0FBQyxPQUFnQjs7WUFFckMsV0FBVyxHQUFHLEtBQUs7UUFDdkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0IsS0FBSyxDQUFDLDBCQUEwQixFQUFFLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDcEMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2xCLDBCQUEwQjtRQUM5QixDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTSxpQ0FBaUMsQ0FBQyxPQUFnQjtRQUNyRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUzs7OztZQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ25DLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ2hDLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbkhpZGUsIEhpZGVyIH0gZnJvbSAnLi9jYW4taGlkZSc7XHJcbmV4cG9ydCBjbGFzcyBIaWRlckhlbHBlciB7XHJcblxyXG4gICAgcHVibGljIGhpZGVDb250cm9sKGNvbnRyb2w6IENhbkhpZGUpIHtcclxuICAgICAgICBjb250cm9sLmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgaWYgKGNvbnRyb2wuZGlzYWJsZSkge1xyXG4gICAgICAgICAgICBjb250cm9sLmRpc2FibGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dDb250cm9sKGNvbnRyb2w6IENhbkhpZGUpIHtcclxuICAgICAgICBjb250cm9sLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRIaWRlckZvckNvbnRyb2woY29udHJvbDogQ2FuSGlkZSwgaGlkZXI6IEhpZGVyKSB7XHJcbiAgICAgICAgY29udHJvbC5oaWRlcnMucHVzaChoaWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFySGlkZXJzRm9yQ29udHJvbChjb250cm9sOiBDYW5IaWRlKSB7XHJcbiAgICAgICAgY29udHJvbC5oaWRlcnMuc3BsaWNlKDApO1xyXG4gICAgICAgIGNvbnRyb2wuaGlkZGVuID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV2YWx1YXRlQ29udHJvbEhpZGVycyhjb250cm9sOiBDYW5IaWRlKSB7XHJcblxyXG4gICAgICAgIGxldCBoaWRkZW5WYWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnRyb2wuaGlkZXJzLmZvckVhY2goaGlkZXIgPT4ge1xyXG4gICAgICAgICAgICBoaWRlci5yZUV2YWx1YXRlSGlkaW5nRXhwcmVzc2lvbigpO1xyXG4gICAgICAgICAgICBpZiAoaGlkZXIudG9IaWRlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBoaWRkZW5WYWx1ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29udHJvbC5oaWRkZW4gPSBoaWRkZW5WYWx1ZTtcclxuICAgICAgICBpZiAoY29udHJvbC5oaWRkZW4gJiYgY29udHJvbC5kaXNhYmxlKSB7XHJcbiAgICAgICAgICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xyXG4gICAgICAgICAgICAvLyBjb250cm9sLnNldFZhbHVlKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VXBSZUV2YWx1YXRpb25XaGVuVmFsdWVDaGFuZ2VzKGNvbnRyb2w6IENhbkhpZGUpIHtcclxuICAgICAgICBpZiAoY29udHJvbC51cGRhdGVIaWRkZW5TdGF0ZSkge1xyXG4gICAgICAgICAgICBjb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbC51cGRhdGVIaWRkZW5TdGF0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==