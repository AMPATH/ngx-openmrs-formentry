/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
            if ((/** @type {?} */ (this._control)).updateCalculatedValue) {
                (/** @type {?} */ (this._control)).updateCalculatedValue();
            }
            this._control.updateValueAndValidity();
            if ((/** @type {?} */ (this._control)).updateHiddenState) {
                (/** @type {?} */ (this._control)).updateHiddenState();
            }
            if ((/** @type {?} */ (this._control)).updateDisabledState) {
                (/** @type {?} */ (this._control)).updateDisabledState();
            }
            if ((/** @type {?} */ (this._control)).updateAlert) {
                (/** @type {?} */ (this._control)).updateAlert();
            }
            return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    _registerForChangesFromRelatedControl() {
        this._relatedTo.valueChanges.subscribe((value) => {
            this.updateControlBasedOnRelation(value);
        });
    }
}
function ControlRelation_tsickle_Closure_declarations() {
    /** @type {?} */
    ControlRelation.prototype._control;
    /** @type {?} */
    ControlRelation.prototype._relatedTo;
    /** @type {?} */
    ControlRelation.prototype._lastUpdateValue;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFLQSxNQUFNOzs7OztJQUtGLFlBQVksT0FBd0IsRUFBRSxTQUEwQjtRQUM1RCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMscUNBQXFDLEVBQUUsQ0FBQztLQUNoRDs7OztJQUVELElBQUksT0FBTztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3hCOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7S0FDMUI7Ozs7SUFFRCxJQUFJLGVBQWU7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0tBQ2hDOzs7OztJQUVELDRCQUE0QixDQUFDLFFBQWE7UUFDdEMsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztZQUVqQyxFQUFFLENBQUMsQ0FBQyxtQkFBQyxJQUFJLENBQUMsUUFBZSxFQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxtQkFBQyxJQUFJLENBQUMsUUFBZSxFQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQzthQUNoRDtZQUVELElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUN2QyxFQUFFLENBQUMsQ0FBQyxtQkFBQyxJQUFJLENBQUMsUUFBZSxFQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxtQkFBQyxJQUFJLENBQUMsUUFBZSxFQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUM5QztZQUVELEVBQUUsQ0FBQyxDQUFDLG1CQUFDLElBQUksQ0FBQyxRQUFlLEVBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLG1CQUFDLElBQUksQ0FBQyxRQUFlLEVBQUMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQ2hEO1lBRUQsRUFBRSxDQUFDLENBQUMsbUJBQUMsSUFBSSxDQUFDLFFBQWUsRUFBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLG1CQUFDLElBQUksQ0FBQyxRQUFlLEVBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN4QztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDaEI7Ozs7SUFFTyxxQ0FBcUM7UUFFM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFDLENBQUMsQ0FBQzs7Q0FFUiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbi8vIGltcG9ydCB7IENhbkhpZGUgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4taGlkZSc7XHJcbi8vIGltcG9ydCB7IENhbkRpc2FibGUgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udHJvbFJlbGF0aW9uIHtcclxuICAgIHByaXZhdGUgX2NvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcclxuICAgIHByaXZhdGUgX3JlbGF0ZWRUbzogQWJzdHJhY3RDb250cm9sO1xyXG4gICAgcHJpdmF0ZSBfbGFzdFVwZGF0ZVZhbHVlOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCByZWxhdGVkVG86IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRyb2wgPSBjb250cm9sO1xyXG4gICAgICAgIHRoaXMuX3JlbGF0ZWRUbyA9IHJlbGF0ZWRUbztcclxuICAgICAgICB0aGlzLl9yZWdpc3RlckZvckNoYW5nZXNGcm9tUmVsYXRlZENvbnRyb2woKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29udHJvbCgpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb250cm9sO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByZWxhdGVkVG8oKTogQWJzdHJhY3RDb250cm9sIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVsYXRlZFRvO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsYXN0VXBkYXRlVmFsdWUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGFzdFVwZGF0ZVZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNvbnRyb2xCYXNlZE9uUmVsYXRpb24obmV3VmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5fbGFzdFVwZGF0ZVZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RVcGRhdGVWYWx1ZSA9IG5ld1ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlQ2FsY3VsYXRlZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XHJcbiAgICAgICAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCkge1xyXG4gICAgICAgICAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcmVnaXN0ZXJGb3JDaGFuZ2VzRnJvbVJlbGF0ZWRDb250cm9sKCkge1xyXG5cclxuICAgICAgdGhpcy5fcmVsYXRlZFRvLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb250cm9sQmFzZWRPblJlbGF0aW9uKHZhbHVlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19