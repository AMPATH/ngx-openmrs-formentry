/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this._relatedTo.valueChanges.subscribe(function (value) {
            _this.updateControlBasedOnRelation(value);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtBOzs7O0lBS0kseUJBQVksT0FBd0IsRUFBRSxTQUEwQjtRQUM1RCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMscUNBQXFDLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRUQsc0JBQUksb0NBQU87Ozs7UUFBWDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksc0NBQVM7Ozs7UUFBYjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNENBQWU7Ozs7UUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pDLENBQUM7OztPQUFBOzs7OztJQUVELHNEQUE0Qjs7OztJQUE1QixVQUE2QixRQUFhO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7WUFFakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsUUFBUSxFQUFPLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUNqRCxDQUFDO1lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQU8sQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDL0MsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxDQUFDLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQU8sQ0FBQyxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDakQsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDckMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsUUFBUSxFQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN6QyxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7OztJQUVPLCtEQUFxQzs7OztJQUE3QztRQUFBLGlCQUtDO1FBSEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBSztZQUMzQyxLQUFJLENBQUMsNEJBQTRCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBdERELElBc0RDOzs7Ozs7Ozs7SUFyREcsbUNBQWtDOzs7OztJQUNsQyxxQ0FBb0M7Ozs7O0lBQ3BDLDJDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLy8gaW1wb3J0IHsgQ2FuSGlkZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcbi8vIGltcG9ydCB7IENhbkRpc2FibGUgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XG5cbmV4cG9ydCBjbGFzcyBDb250cm9sUmVsYXRpb24ge1xuICAgIHByaXZhdGUgX2NvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcbiAgICBwcml2YXRlIF9yZWxhdGVkVG86IEFic3RyYWN0Q29udHJvbDtcbiAgICBwcml2YXRlIF9sYXN0VXBkYXRlVmFsdWU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgcmVsYXRlZFRvOiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICAgICAgdGhpcy5fY29udHJvbCA9IGNvbnRyb2w7XG4gICAgICAgIHRoaXMuX3JlbGF0ZWRUbyA9IHJlbGF0ZWRUbztcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJGb3JDaGFuZ2VzRnJvbVJlbGF0ZWRDb250cm9sKCk7XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRyb2woKTogQWJzdHJhY3RDb250cm9sIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2w7XG4gICAgfVxuXG4gICAgZ2V0IHJlbGF0ZWRUbygpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVsYXRlZFRvO1xuICAgIH1cblxuICAgIGdldCBsYXN0VXBkYXRlVmFsdWUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3RVcGRhdGVWYWx1ZTtcbiAgICB9XG5cbiAgICB1cGRhdGVDb250cm9sQmFzZWRPblJlbGF0aW9uKG5ld1ZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl9sYXN0VXBkYXRlVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RVcGRhdGVWYWx1ZSA9IG5ld1ZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUpIHtcbiAgICAgICAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSkge1xuICAgICAgICAgICAgICAgICh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSkge1xuICAgICAgICAgICAgICAgICh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCkge1xuICAgICAgICAgICAgICAgICh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWdpc3RlckZvckNoYW5nZXNGcm9tUmVsYXRlZENvbnRyb2woKSB7XG5cbiAgICAgIHRoaXMuX3JlbGF0ZWRUby52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xCYXNlZE9uUmVsYXRpb24odmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxufVxuIl19