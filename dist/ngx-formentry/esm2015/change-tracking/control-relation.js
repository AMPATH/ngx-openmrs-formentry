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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtBLE1BQU07Ozs7O0lBS0YsWUFBWSxPQUF3QixFQUFFLFNBQTBCO1FBQzVELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxxQ0FBcUMsRUFBRSxDQUFDO0lBQ2pELENBQUM7Ozs7SUFFRCxJQUFJLE9BQU87UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQzs7OztJQUVELElBQUksZUFBZTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDakMsQ0FBQzs7Ozs7SUFFRCw0QkFBNEIsQ0FBQyxRQUFhO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7WUFFakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsUUFBUSxFQUFPLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUNqRCxDQUFDO1lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQU8sQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDL0MsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxDQUFDLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQU8sQ0FBQyxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDakQsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDckMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsUUFBUSxFQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN6QyxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7OztJQUVPLHFDQUFxQztRQUUzQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0o7Ozs7OztJQXJERyxtQ0FBa0M7Ozs7O0lBQ2xDLHFDQUFvQzs7Ozs7SUFDcEMsMkNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuLy8gaW1wb3J0IHsgQ2FuSGlkZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcclxuLy8gaW1wb3J0IHsgQ2FuRGlzYWJsZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1kaXNhYmxlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cm9sUmVsYXRpb24ge1xyXG4gICAgcHJpdmF0ZSBfY29udHJvbDogQWJzdHJhY3RDb250cm9sO1xyXG4gICAgcHJpdmF0ZSBfcmVsYXRlZFRvOiBBYnN0cmFjdENvbnRyb2w7XHJcbiAgICBwcml2YXRlIF9sYXN0VXBkYXRlVmFsdWU6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIHJlbGF0ZWRUbzogQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICAgICAgdGhpcy5fY29udHJvbCA9IGNvbnRyb2w7XHJcbiAgICAgICAgdGhpcy5fcmVsYXRlZFRvID0gcmVsYXRlZFRvO1xyXG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyRm9yQ2hhbmdlc0Zyb21SZWxhdGVkQ29udHJvbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb250cm9sKCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2w7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJlbGF0ZWRUbygpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWxhdGVkVG87XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxhc3RVcGRhdGVWYWx1ZSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYXN0VXBkYXRlVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ29udHJvbEJhc2VkT25SZWxhdGlvbihuZXdWYWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl9sYXN0VXBkYXRlVmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGFzdFVwZGF0ZVZhbHVlID0gbmV3VmFsdWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcclxuICAgICAgICAgICAgaWYgKCh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9yZWdpc3RlckZvckNoYW5nZXNGcm9tUmVsYXRlZENvbnRyb2woKSB7XHJcblxyXG4gICAgICB0aGlzLl9yZWxhdGVkVG8udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWUpID0+IHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xCYXNlZE9uUmVsYXRpb24odmFsdWUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=