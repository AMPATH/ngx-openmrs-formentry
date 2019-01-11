/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// import { CanHide } from '../form-entry/control-hiders-disablers/can-hide';
// import { CanDisable } from '../form-entry/control-hiders-disablers/can-disable';
export class ControlRelation {
    /**
     * @param {?} control
     * @param {?} relatedTo
     */
    constructor(control, relatedTo) {
        this._control = control;
        this._relatedTo = relatedTo;
        this._registerForChangesFromRelatedControl();
    }
    /**
     * @return {?}
     */
    get control() {
        return this._control;
    }
    /**
     * @return {?}
     */
    get relatedTo() {
        return this._relatedTo;
    }
    /**
     * @return {?}
     */
    get lastUpdateValue() {
        return this._lastUpdateValue;
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    updateControlBasedOnRelation(newValue) {
        if (newValue !== this._lastUpdateValue) {
            this._lastUpdateValue = newValue;
            if (((/** @type {?} */ (this._control))).updateCalculatedValue) {
                ((/** @type {?} */ (this._control))).updateCalculatedValue();
            }
            this._control.updateValueAndValidity();
            if (((/** @type {?} */ (this._control))).updateHiddenState) {
                ((/** @type {?} */ (this._control))).updateHiddenState();
            }
            if (((/** @type {?} */ (this._control))).updateDisabledState) {
                ((/** @type {?} */ (this._control))).updateDisabledState();
            }
            if (((/** @type {?} */ (this._control))).updateAlert) {
                ((/** @type {?} */ (this._control))).updateAlert();
            }
            return true;
        }
        return false;
    }
    /**
     * @private
     * @return {?}
     */
    _registerForChangesFromRelatedControl() {
        this._relatedTo.valueChanges.subscribe((value) => {
            this.updateControlBasedOnRelation(value);
        });
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ControlRelation.prototype._control;
    /**
     * @type {?}
     * @private
     */
    ControlRelation.prototype._relatedTo;
    /**
     * @type {?}
     * @private
     */
    ControlRelation.prototype._lastUpdateValue;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtBLE1BQU0sT0FBTyxlQUFlOzs7OztJQUt4QixZQUFZLE9BQXdCLEVBQUUsU0FBMEI7UUFDNUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLHFDQUFxQyxFQUFFLENBQUM7SUFDakQsQ0FBQzs7OztJQUVELElBQUksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCxJQUFJLGVBQWU7UUFDZixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVELDRCQUE0QixDQUFDLFFBQWE7UUFDdEMsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7WUFFakMsSUFBSSxDQUFDLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQU8sQ0FBQyxDQUFDLHFCQUFxQixFQUFFO2dCQUNoRCxDQUFDLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQU8sQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUM7YUFDaEQ7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQU8sQ0FBQyxDQUFDLGlCQUFpQixFQUFFO2dCQUMxQyxDQUFDLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQU8sQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDOUM7WUFFRCxJQUFJLENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzVDLENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUNoRDtZQUVELElBQUksQ0FBQyxtQkFBQSxJQUFJLENBQUMsUUFBUSxFQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BDLENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDeEM7WUFDRCxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7SUFFTyxxQ0FBcUM7UUFFM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNKOzs7Ozs7SUFyREcsbUNBQWtDOzs7OztJQUNsQyxxQ0FBb0M7Ozs7O0lBQ3BDLDJDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLy8gaW1wb3J0IHsgQ2FuSGlkZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcbi8vIGltcG9ydCB7IENhbkRpc2FibGUgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XG5cbmV4cG9ydCBjbGFzcyBDb250cm9sUmVsYXRpb24ge1xuICAgIHByaXZhdGUgX2NvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcbiAgICBwcml2YXRlIF9yZWxhdGVkVG86IEFic3RyYWN0Q29udHJvbDtcbiAgICBwcml2YXRlIF9sYXN0VXBkYXRlVmFsdWU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgcmVsYXRlZFRvOiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICAgICAgdGhpcy5fY29udHJvbCA9IGNvbnRyb2w7XG4gICAgICAgIHRoaXMuX3JlbGF0ZWRUbyA9IHJlbGF0ZWRUbztcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJGb3JDaGFuZ2VzRnJvbVJlbGF0ZWRDb250cm9sKCk7XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRyb2woKTogQWJzdHJhY3RDb250cm9sIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2w7XG4gICAgfVxuXG4gICAgZ2V0IHJlbGF0ZWRUbygpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVsYXRlZFRvO1xuICAgIH1cblxuICAgIGdldCBsYXN0VXBkYXRlVmFsdWUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3RVcGRhdGVWYWx1ZTtcbiAgICB9XG5cbiAgICB1cGRhdGVDb250cm9sQmFzZWRPblJlbGF0aW9uKG5ld1ZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl9sYXN0VXBkYXRlVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RVcGRhdGVWYWx1ZSA9IG5ld1ZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUpIHtcbiAgICAgICAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSkge1xuICAgICAgICAgICAgICAgICh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSkge1xuICAgICAgICAgICAgICAgICh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCkge1xuICAgICAgICAgICAgICAgICh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWdpc3RlckZvckNoYW5nZXNGcm9tUmVsYXRlZENvbnRyb2woKSB7XG5cbiAgICAgIHRoaXMuX3JlbGF0ZWRUby52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xCYXNlZE9uUmVsYXRpb24odmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxufVxuIl19