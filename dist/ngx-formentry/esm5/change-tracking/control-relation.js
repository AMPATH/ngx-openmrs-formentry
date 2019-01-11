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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtBOzs7O0lBS0kseUJBQVksT0FBd0IsRUFBRSxTQUEwQjtRQUM1RCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMscUNBQXFDLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRUQsc0JBQUksb0NBQU87Ozs7UUFBWDtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHNDQUFTOzs7O1FBQWI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw0Q0FBZTs7OztRQUFuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pDLENBQUM7OztPQUFBOzs7OztJQUVELHNEQUE0Qjs7OztJQUE1QixVQUE2QixRQUFhO1FBQ3RDLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUNwQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO1lBRWpDLElBQUksQ0FBQyxtQkFBQSxJQUFJLENBQUMsUUFBUSxFQUFPLENBQUMsQ0FBQyxxQkFBcUIsRUFBRTtnQkFDaEQsQ0FBQyxtQkFBQSxJQUFJLENBQUMsUUFBUSxFQUFPLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2FBQ2hEO1lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxtQkFBQSxJQUFJLENBQUMsUUFBUSxFQUFPLENBQUMsQ0FBQyxpQkFBaUIsRUFBRTtnQkFDMUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsUUFBUSxFQUFPLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzlDO1lBRUQsSUFBSSxDQUFDLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQU8sQ0FBQyxDQUFDLG1CQUFtQixFQUFFO2dCQUM1QyxDQUFDLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQU8sQ0FBQyxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDaEQ7WUFFRCxJQUFJLENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMsV0FBVyxFQUFFO2dCQUNwQyxDQUFDLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3hDO1lBQ0QsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7O0lBRU8sK0RBQXFDOzs7O0lBQTdDO1FBQUEsaUJBS0M7UUFIQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFLO1lBQzNDLEtBQUksQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUF0REQsSUFzREM7Ozs7Ozs7OztJQXJERyxtQ0FBa0M7Ozs7O0lBQ2xDLHFDQUFvQzs7Ozs7SUFDcEMsMkNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vLyBpbXBvcnQgeyBDYW5IaWRlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWhpZGUnO1xuLy8gaW1wb3J0IHsgQ2FuRGlzYWJsZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1kaXNhYmxlJztcblxuZXhwb3J0IGNsYXNzIENvbnRyb2xSZWxhdGlvbiB7XG4gICAgcHJpdmF0ZSBfY29udHJvbDogQWJzdHJhY3RDb250cm9sO1xuICAgIHByaXZhdGUgX3JlbGF0ZWRUbzogQWJzdHJhY3RDb250cm9sO1xuICAgIHByaXZhdGUgX2xhc3RVcGRhdGVWYWx1ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCByZWxhdGVkVG86IEFic3RyYWN0Q29udHJvbCkge1xuICAgICAgICB0aGlzLl9jb250cm9sID0gY29udHJvbDtcbiAgICAgICAgdGhpcy5fcmVsYXRlZFRvID0gcmVsYXRlZFRvO1xuICAgICAgICB0aGlzLl9yZWdpc3RlckZvckNoYW5nZXNGcm9tUmVsYXRlZENvbnRyb2woKTtcbiAgICB9XG5cbiAgICBnZXQgY29udHJvbCgpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udHJvbDtcbiAgICB9XG5cbiAgICBnZXQgcmVsYXRlZFRvKCk6IEFic3RyYWN0Q29udHJvbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWxhdGVkVG87XG4gICAgfVxuXG4gICAgZ2V0IGxhc3RVcGRhdGVWYWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFzdFVwZGF0ZVZhbHVlO1xuICAgIH1cblxuICAgIHVwZGF0ZUNvbnRyb2xCYXNlZE9uUmVsYXRpb24obmV3VmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX2xhc3RVcGRhdGVWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFVwZGF0ZVZhbHVlID0gbmV3VmFsdWU7XG5cbiAgICAgICAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSkge1xuICAgICAgICAgICAgICAodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKSB7XG4gICAgICAgICAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KSB7XG4gICAgICAgICAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlZ2lzdGVyRm9yQ2hhbmdlc0Zyb21SZWxhdGVkQ29udHJvbCgpIHtcblxuICAgICAgdGhpcy5fcmVsYXRlZFRvLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlQ29udHJvbEJhc2VkT25SZWxhdGlvbih2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG59XG4iXX0=