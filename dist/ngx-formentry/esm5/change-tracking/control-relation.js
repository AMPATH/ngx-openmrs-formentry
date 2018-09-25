/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ControlRelation = /** @class */ (function () {
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
    };
    /**
     * @return {?}
     */
    ControlRelation.prototype._registerForChangesFromRelatedControl = /**
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
export { ControlRelation };
function ControlRelation_tsickle_Closure_declarations() {
    /** @type {?} */
    ControlRelation.prototype._control;
    /** @type {?} */
    ControlRelation.prototype._relatedTo;
    /** @type {?} */
    ControlRelation.prototype._lastUpdateValue;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFLQSxJQUFBO0lBS0kseUJBQVksT0FBd0IsRUFBRSxTQUEwQjtRQUM1RCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMscUNBQXFDLEVBQUUsQ0FBQztLQUNoRDtJQUVELHNCQUFJLG9DQUFPOzs7O1FBQVg7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN4Qjs7O09BQUE7SUFFRCxzQkFBSSxzQ0FBUzs7OztRQUFiO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDMUI7OztPQUFBO0lBRUQsc0JBQUksNENBQWU7Ozs7UUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1NBQ2hDOzs7T0FBQTs7Ozs7SUFFRCxzREFBNEI7Ozs7SUFBNUIsVUFBNkIsUUFBYTtRQUN0QyxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO1lBRWpDLEVBQUUsQ0FBQyxDQUFDLG1CQUFDLElBQUksQ0FBQyxRQUFlLEVBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELG1CQUFDLElBQUksQ0FBQyxRQUFlLEVBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2FBQ2hEO1lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLG1CQUFDLElBQUksQ0FBQyxRQUFlLEVBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLG1CQUFDLElBQUksQ0FBQyxRQUFlLEVBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzlDO1lBRUQsRUFBRSxDQUFDLENBQUMsbUJBQUMsSUFBSSxDQUFDLFFBQWUsRUFBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztnQkFDN0MsbUJBQUMsSUFBSSxDQUFDLFFBQWUsRUFBQyxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDaEQ7WUFFRCxFQUFFLENBQUMsQ0FBQyxtQkFBQyxJQUFJLENBQUMsUUFBZSxFQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDckMsbUJBQUMsSUFBSSxDQUFDLFFBQWUsRUFBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3hDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNoQjs7OztJQUVPLCtEQUFxQzs7Ozs7UUFFM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBSztZQUMzQyxLQUFJLENBQUMsNEJBQTRCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUMsQ0FBQyxDQUFDOzswQkF6RFQ7SUEyREMsQ0FBQTtBQXRERCwyQkFzREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG4vLyBpbXBvcnQgeyBDYW5IaWRlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWhpZGUnO1xyXG4vLyBpbXBvcnQgeyBDYW5EaXNhYmxlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWRpc2FibGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRyb2xSZWxhdGlvbiB7XHJcbiAgICBwcml2YXRlIF9jb250cm9sOiBBYnN0cmFjdENvbnRyb2w7XHJcbiAgICBwcml2YXRlIF9yZWxhdGVkVG86IEFic3RyYWN0Q29udHJvbDtcclxuICAgIHByaXZhdGUgX2xhc3RVcGRhdGVWYWx1ZTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgcmVsYXRlZFRvOiBBYnN0cmFjdENvbnRyb2wpIHtcclxuICAgICAgICB0aGlzLl9jb250cm9sID0gY29udHJvbDtcclxuICAgICAgICB0aGlzLl9yZWxhdGVkVG8gPSByZWxhdGVkVG87XHJcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJGb3JDaGFuZ2VzRnJvbVJlbGF0ZWRDb250cm9sKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNvbnRyb2woKTogQWJzdHJhY3RDb250cm9sIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29udHJvbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcmVsYXRlZFRvKCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbGF0ZWRUbztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbGFzdFVwZGF0ZVZhbHVlKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3RVcGRhdGVWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDb250cm9sQmFzZWRPblJlbGF0aW9uKG5ld1ZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX2xhc3RVcGRhdGVWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0VXBkYXRlVmFsdWUgPSBuZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlQ2FsY3VsYXRlZFZhbHVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xyXG4gICAgICAgICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQpIHtcclxuICAgICAgICAgICAgICAgICh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3JlZ2lzdGVyRm9yQ2hhbmdlc0Zyb21SZWxhdGVkQ29udHJvbCgpIHtcclxuXHJcbiAgICAgIHRoaXMuX3JlbGF0ZWRUby52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ29udHJvbEJhc2VkT25SZWxhdGlvbih2YWx1ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==