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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY2hhbmdlLXRyYWNraW5nL2NvbnRyb2wtcmVsYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsNkVBQTZFO0FBQzdFLG1GQUFtRjtBQUVuRjtJQUtJLHlCQUFZLE9BQXdCLEVBQUUsU0FBMEI7UUFDNUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLHFDQUFxQyxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVELHNCQUFJLG9DQUFPO2FBQVg7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxzQ0FBUzthQUFiO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNENBQWU7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqQyxDQUFDOzs7T0FBQTtJQUVELHNEQUE0QixHQUE1QixVQUE2QixRQUFhO1FBQ3RDLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUNwQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO1lBRWpDLElBQUssSUFBSSxDQUFDLFFBQWdCLENBQUMscUJBQXFCLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxRQUFnQixDQUFDLHFCQUFxQixFQUFFLENBQUM7YUFDaEQ7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDdkMsSUFBSyxJQUFJLENBQUMsUUFBZ0IsQ0FBQyxpQkFBaUIsRUFBRTtnQkFDekMsSUFBSSxDQUFDLFFBQWdCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUM5QztZQUVELElBQUssSUFBSSxDQUFDLFFBQWdCLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxRQUFnQixDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDaEQ7WUFFRCxJQUFLLElBQUksQ0FBQyxRQUFnQixDQUFDLFdBQVcsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFFBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDeEM7WUFDRCxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVPLCtEQUFxQyxHQUE3QztRQUFBLGlCQUtDO1FBSEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBSztZQUMzQyxLQUFJLENBQUMsNEJBQTRCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBdERELElBc0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vLyBpbXBvcnQgeyBDYW5IaWRlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWhpZGUnO1xuLy8gaW1wb3J0IHsgQ2FuRGlzYWJsZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1kaXNhYmxlJztcblxuZXhwb3J0IGNsYXNzIENvbnRyb2xSZWxhdGlvbiB7XG4gICAgcHJpdmF0ZSBfY29udHJvbDogQWJzdHJhY3RDb250cm9sO1xuICAgIHByaXZhdGUgX3JlbGF0ZWRUbzogQWJzdHJhY3RDb250cm9sO1xuICAgIHByaXZhdGUgX2xhc3RVcGRhdGVWYWx1ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCByZWxhdGVkVG86IEFic3RyYWN0Q29udHJvbCkge1xuICAgICAgICB0aGlzLl9jb250cm9sID0gY29udHJvbDtcbiAgICAgICAgdGhpcy5fcmVsYXRlZFRvID0gcmVsYXRlZFRvO1xuICAgICAgICB0aGlzLl9yZWdpc3RlckZvckNoYW5nZXNGcm9tUmVsYXRlZENvbnRyb2woKTtcbiAgICB9XG5cbiAgICBnZXQgY29udHJvbCgpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udHJvbDtcbiAgICB9XG5cbiAgICBnZXQgcmVsYXRlZFRvKCk6IEFic3RyYWN0Q29udHJvbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWxhdGVkVG87XG4gICAgfVxuXG4gICAgZ2V0IGxhc3RVcGRhdGVWYWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFzdFVwZGF0ZVZhbHVlO1xuICAgIH1cblxuICAgIHVwZGF0ZUNvbnRyb2xCYXNlZE9uUmVsYXRpb24obmV3VmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX2xhc3RVcGRhdGVWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFVwZGF0ZVZhbHVlID0gbmV3VmFsdWU7XG5cbiAgICAgICAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSkge1xuICAgICAgICAgICAgICAodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKSB7XG4gICAgICAgICAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KSB7XG4gICAgICAgICAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlZ2lzdGVyRm9yQ2hhbmdlc0Zyb21SZWxhdGVkQ29udHJvbCgpIHtcblxuICAgICAgdGhpcy5fcmVsYXRlZFRvLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlQ29udHJvbEJhc2VkT25SZWxhdGlvbih2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG59XG4iXX0=