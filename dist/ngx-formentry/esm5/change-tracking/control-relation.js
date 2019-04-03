/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// import { CanHide } from '../form-entry/control-hiders-disablers/can-hide';
// import { CanDisable } from '../form-entry/control-hiders-disablers/can-disable';
var 
// import { CanHide } from '../form-entry/control-hiders-disablers/can-hide';
// import { CanDisable } from '../form-entry/control-hiders-disablers/can-disable';
ControlRelation = /** @class */ (function () {
    function ControlRelation(control, relatedTo) {
        this._control = control;
        this._relatedTo = relatedTo;
        this._registerForChangesFromRelatedControl();
    }
    Object.defineProperty(ControlRelation.prototype, "control", {
        get: /**
         * @return {?}
         */
        function () {
            return this._control;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlRelation.prototype, "relatedTo", {
        get: /**
         * @return {?}
         */
        function () {
            return this._relatedTo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlRelation.prototype, "lastUpdateValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this._lastUpdateValue;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} newValue
     * @return {?}
     */
    ControlRelation.prototype.updateControlBasedOnRelation = /**
     * @param {?} newValue
     * @return {?}
     */
    function (newValue) {
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
    };
    /**
     * @private
     * @return {?}
     */
    ControlRelation.prototype._registerForChangesFromRelatedControl = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._relatedTo.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _this.updateControlBasedOnRelation(value);
        }));
    };
    return ControlRelation;
}());
// import { CanHide } from '../form-entry/control-hiders-disablers/can-hide';
// import { CanDisable } from '../form-entry/control-hiders-disablers/can-disable';
export { ControlRelation };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtBOzs7O0lBS0kseUJBQVksT0FBd0IsRUFBRSxTQUEwQjtRQUM1RCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMscUNBQXFDLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRUQsc0JBQUksb0NBQU87Ozs7UUFBWDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksc0NBQVM7Ozs7UUFBYjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNENBQWU7Ozs7UUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pDLENBQUM7OztPQUFBOzs7OztJQUVELHNEQUE0Qjs7OztJQUE1QixVQUE2QixRQUFhO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7WUFFakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsUUFBUSxFQUFPLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUNqRCxDQUFDO1lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQU8sQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDL0MsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxDQUFDLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQU8sQ0FBQyxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDakQsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDckMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsUUFBUSxFQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN6QyxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7OztJQUVPLCtEQUFxQzs7OztJQUE3QztRQUFBLGlCQUtDO1FBSEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsS0FBSztZQUMzQyxLQUFJLENBQUMsNEJBQTRCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBdERELElBc0RDOzs7Ozs7Ozs7SUFyREcsbUNBQWtDOzs7OztJQUNsQyxxQ0FBb0M7Ozs7O0lBQ3BDLDJDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbi8vIGltcG9ydCB7IENhbkhpZGUgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4taGlkZSc7XHJcbi8vIGltcG9ydCB7IENhbkRpc2FibGUgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udHJvbFJlbGF0aW9uIHtcclxuICAgIHByaXZhdGUgX2NvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcclxuICAgIHByaXZhdGUgX3JlbGF0ZWRUbzogQWJzdHJhY3RDb250cm9sO1xyXG4gICAgcHJpdmF0ZSBfbGFzdFVwZGF0ZVZhbHVlOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCByZWxhdGVkVG86IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRyb2wgPSBjb250cm9sO1xyXG4gICAgICAgIHRoaXMuX3JlbGF0ZWRUbyA9IHJlbGF0ZWRUbztcclxuICAgICAgICB0aGlzLl9yZWdpc3RlckZvckNoYW5nZXNGcm9tUmVsYXRlZENvbnRyb2woKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29udHJvbCgpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb250cm9sO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByZWxhdGVkVG8oKTogQWJzdHJhY3RDb250cm9sIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVsYXRlZFRvO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsYXN0VXBkYXRlVmFsdWUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGFzdFVwZGF0ZVZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNvbnRyb2xCYXNlZE9uUmVsYXRpb24obmV3VmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5fbGFzdFVwZGF0ZVZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RVcGRhdGVWYWx1ZSA9IG5ld1ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlQ2FsY3VsYXRlZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XHJcbiAgICAgICAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCkge1xyXG4gICAgICAgICAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcmVnaXN0ZXJGb3JDaGFuZ2VzRnJvbVJlbGF0ZWRDb250cm9sKCkge1xyXG5cclxuICAgICAgdGhpcy5fcmVsYXRlZFRvLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb250cm9sQmFzZWRPblJlbGF0aW9uKHZhbHVlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19