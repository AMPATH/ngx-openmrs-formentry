// import { CanHide } from '../form-entry/control-hiders-disablers/can-hide';
// import { CanDisable } from '../form-entry/control-hiders-disablers/can-disable';
var ControlRelation = /** @class */ (function () {
    function ControlRelation(control, relatedTo) {
        this._control = control;
        this._relatedTo = relatedTo;
        this._registerForChangesFromRelatedControl();
    }
    Object.defineProperty(ControlRelation.prototype, "control", {
        get: function () {
            return this._control;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlRelation.prototype, "relatedTo", {
        get: function () {
            return this._relatedTo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlRelation.prototype, "lastUpdateValue", {
        get: function () {
            return this._lastUpdateValue;
        },
        enumerable: true,
        configurable: true
    });
    ControlRelation.prototype.updateControlBasedOnRelation = function (newValue) {
        if (newValue !== this._lastUpdateValue) {
            this._lastUpdateValue = newValue;
            if (this._control.updateCalculatedValue) {
                this._control.updateCalculatedValue();
            }
            this._control.updateValueAndValidity();
            if (this._control.updateHiddenState) {
                this._control.updateHiddenState();
            }
            if (this._control.updateDisabledState) {
                this._control.updateDisabledState();
            }
            if (this._control.updateAlert) {
                this._control.updateAlert();
            }
            return true;
        }
        return false;
    };
    ControlRelation.prototype._registerForChangesFromRelatedControl = function () {
        var _this = this;
        this._relatedTo.valueChanges.subscribe(function (value) {
            _this.updateControlBasedOnRelation(value);
        });
    };
    return ControlRelation;
}());
export { ControlRelation };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLDZFQUE2RTtBQUM3RSxtRkFBbUY7QUFFbkY7SUFLSSx5QkFBWSxPQUF3QixFQUFFLFNBQTBCO1FBQzVELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxxQ0FBcUMsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFRCxzQkFBSSxvQ0FBTzthQUFYO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksc0NBQVM7YUFBYjtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDRDQUFlO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7SUFFRCxzREFBNEIsR0FBNUIsVUFBNkIsUUFBYTtRQUN0QyxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztZQUVqQyxJQUFLLElBQUksQ0FBQyxRQUFnQixDQUFDLHFCQUFxQixFQUFFO2dCQUMvQyxJQUFJLENBQUMsUUFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2FBQ2hEO1lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQ3ZDLElBQUssSUFBSSxDQUFDLFFBQWdCLENBQUMsaUJBQWlCLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxRQUFnQixDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDOUM7WUFFRCxJQUFLLElBQUksQ0FBQyxRQUFnQixDQUFDLG1CQUFtQixFQUFFO2dCQUMzQyxJQUFJLENBQUMsUUFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQ2hEO1lBRUQsSUFBSyxJQUFJLENBQUMsUUFBZ0IsQ0FBQyxXQUFXLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxRQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3hDO1lBQ0QsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTywrREFBcUMsR0FBN0M7UUFBQSxpQkFLQztRQUhDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQUs7WUFDM0MsS0FBSSxDQUFDLDRCQUE0QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQXRERCxJQXNEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLy8gaW1wb3J0IHsgQ2FuSGlkZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcbi8vIGltcG9ydCB7IENhbkRpc2FibGUgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XG5cbmV4cG9ydCBjbGFzcyBDb250cm9sUmVsYXRpb24ge1xuICAgIHByaXZhdGUgX2NvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcbiAgICBwcml2YXRlIF9yZWxhdGVkVG86IEFic3RyYWN0Q29udHJvbDtcbiAgICBwcml2YXRlIF9sYXN0VXBkYXRlVmFsdWU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgcmVsYXRlZFRvOiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICAgICAgdGhpcy5fY29udHJvbCA9IGNvbnRyb2w7XG4gICAgICAgIHRoaXMuX3JlbGF0ZWRUbyA9IHJlbGF0ZWRUbztcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJGb3JDaGFuZ2VzRnJvbVJlbGF0ZWRDb250cm9sKCk7XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRyb2woKTogQWJzdHJhY3RDb250cm9sIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2w7XG4gICAgfVxuXG4gICAgZ2V0IHJlbGF0ZWRUbygpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVsYXRlZFRvO1xuICAgIH1cblxuICAgIGdldCBsYXN0VXBkYXRlVmFsdWUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3RVcGRhdGVWYWx1ZTtcbiAgICB9XG5cbiAgICB1cGRhdGVDb250cm9sQmFzZWRPblJlbGF0aW9uKG5ld1ZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl9sYXN0VXBkYXRlVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RVcGRhdGVWYWx1ZSA9IG5ld1ZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUpIHtcbiAgICAgICAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSkge1xuICAgICAgICAgICAgICAgICh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSkge1xuICAgICAgICAgICAgICAgICh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCkge1xuICAgICAgICAgICAgICAgICh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWdpc3RlckZvckNoYW5nZXNGcm9tUmVsYXRlZENvbnRyb2woKSB7XG5cbiAgICAgIHRoaXMuX3JlbGF0ZWRUby52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xCYXNlZE9uUmVsYXRpb24odmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxufVxuIl19