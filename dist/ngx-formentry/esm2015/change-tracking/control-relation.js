/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this._relatedTo.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            this.updateControlBasedOnRelation(value);
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtBLE1BQU07Ozs7O0lBS0YsWUFBWSxPQUF3QixFQUFFLFNBQTBCO1FBQzVELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxxQ0FBcUMsRUFBRSxDQUFDO0lBQ2pELENBQUM7Ozs7SUFFRCxJQUFJLE9BQU87UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQzs7OztJQUVELElBQUksZUFBZTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDakMsQ0FBQzs7Ozs7SUFFRCw0QkFBNEIsQ0FBQyxRQUFhO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7WUFFakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsUUFBUSxFQUFPLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUNqRCxDQUFDO1lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQU8sQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDL0MsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxDQUFDLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQU8sQ0FBQyxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDakQsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDckMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsUUFBUSxFQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN6QyxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7OztJQUVPLHFDQUFxQztRQUUzQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0o7Ozs7OztJQXJERyxtQ0FBa0M7Ozs7O0lBQ2xDLHFDQUFvQzs7Ozs7SUFDcEMsMkNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vLyBpbXBvcnQgeyBDYW5IaWRlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWhpZGUnO1xuLy8gaW1wb3J0IHsgQ2FuRGlzYWJsZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1kaXNhYmxlJztcblxuZXhwb3J0IGNsYXNzIENvbnRyb2xSZWxhdGlvbiB7XG4gICAgcHJpdmF0ZSBfY29udHJvbDogQWJzdHJhY3RDb250cm9sO1xuICAgIHByaXZhdGUgX3JlbGF0ZWRUbzogQWJzdHJhY3RDb250cm9sO1xuICAgIHByaXZhdGUgX2xhc3RVcGRhdGVWYWx1ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCByZWxhdGVkVG86IEFic3RyYWN0Q29udHJvbCkge1xuICAgICAgICB0aGlzLl9jb250cm9sID0gY29udHJvbDtcbiAgICAgICAgdGhpcy5fcmVsYXRlZFRvID0gcmVsYXRlZFRvO1xuICAgICAgICB0aGlzLl9yZWdpc3RlckZvckNoYW5nZXNGcm9tUmVsYXRlZENvbnRyb2woKTtcbiAgICB9XG5cbiAgICBnZXQgY29udHJvbCgpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udHJvbDtcbiAgICB9XG5cbiAgICBnZXQgcmVsYXRlZFRvKCk6IEFic3RyYWN0Q29udHJvbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWxhdGVkVG87XG4gICAgfVxuXG4gICAgZ2V0IGxhc3RVcGRhdGVWYWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFzdFVwZGF0ZVZhbHVlO1xuICAgIH1cblxuICAgIHVwZGF0ZUNvbnRyb2xCYXNlZE9uUmVsYXRpb24obmV3VmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX2xhc3RVcGRhdGVWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFVwZGF0ZVZhbHVlID0gbmV3VmFsdWU7XG5cbiAgICAgICAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSkge1xuICAgICAgICAgICAgICAodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKSB7XG4gICAgICAgICAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KSB7XG4gICAgICAgICAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlZ2lzdGVyRm9yQ2hhbmdlc0Zyb21SZWxhdGVkQ29udHJvbCgpIHtcblxuICAgICAgdGhpcy5fcmVsYXRlZFRvLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlQ29udHJvbEJhc2VkT25SZWxhdGlvbih2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG59XG4iXX0=