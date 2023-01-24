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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY2hhbmdlLXRyYWNraW5nL2NvbnRyb2wtcmVsYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsNkVBQTZFO0FBQzdFLG1GQUFtRjtBQUVuRjtJQUtFLHlCQUFZLE9BQXdCLEVBQUUsU0FBMEI7UUFDOUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLHFDQUFxQyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELHNCQUFJLG9DQUFPO2FBQVg7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHNDQUFTO2FBQWI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDRDQUFlO2FBQW5CO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvQixDQUFDOzs7T0FBQTtJQUVELHNEQUE0QixHQUE1QixVQUE2QixRQUFhO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7WUFFakMsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLFFBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsUUFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ2pELENBQUM7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDdkMsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLFFBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsUUFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzdDLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBRSxJQUFJLENBQUMsUUFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxRQUFnQixDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDL0MsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFFLElBQUksQ0FBQyxRQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxRQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZDLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU8sK0RBQXFDLEdBQTdDO1FBQUEsaUJBSUM7UUFIQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFLO1lBQzNDLEtBQUksQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFyREQsSUFxREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8vIGltcG9ydCB7IENhbkhpZGUgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4taGlkZSc7XG4vLyBpbXBvcnQgeyBDYW5EaXNhYmxlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWRpc2FibGUnO1xuXG5leHBvcnQgY2xhc3MgQ29udHJvbFJlbGF0aW9uIHtcbiAgcHJpdmF0ZSBfY29udHJvbDogQWJzdHJhY3RDb250cm9sO1xuICBwcml2YXRlIF9yZWxhdGVkVG86IEFic3RyYWN0Q29udHJvbDtcbiAgcHJpdmF0ZSBfbGFzdFVwZGF0ZVZhbHVlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCByZWxhdGVkVG86IEFic3RyYWN0Q29udHJvbCkge1xuICAgIHRoaXMuX2NvbnRyb2wgPSBjb250cm9sO1xuICAgIHRoaXMuX3JlbGF0ZWRUbyA9IHJlbGF0ZWRUbztcbiAgICB0aGlzLl9yZWdpc3RlckZvckNoYW5nZXNGcm9tUmVsYXRlZENvbnRyb2woKTtcbiAgfVxuXG4gIGdldCBjb250cm9sKCk6IEFic3RyYWN0Q29udHJvbCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRyb2w7XG4gIH1cblxuICBnZXQgcmVsYXRlZFRvKCk6IEFic3RyYWN0Q29udHJvbCB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbGF0ZWRUbztcbiAgfVxuXG4gIGdldCBsYXN0VXBkYXRlVmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fbGFzdFVwZGF0ZVZhbHVlO1xuICB9XG5cbiAgdXBkYXRlQ29udHJvbEJhc2VkT25SZWxhdGlvbihuZXdWYWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl9sYXN0VXBkYXRlVmFsdWUpIHtcbiAgICAgIHRoaXMuX2xhc3RVcGRhdGVWYWx1ZSA9IG5ld1ZhbHVlO1xuXG4gICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUpIHtcbiAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICBpZiAoKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSkge1xuICAgICAgICAodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUpIHtcbiAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KSB7XG4gICAgICAgICh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIF9yZWdpc3RlckZvckNoYW5nZXNGcm9tUmVsYXRlZENvbnRyb2woKSB7XG4gICAgdGhpcy5fcmVsYXRlZFRvLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xCYXNlZE9uUmVsYXRpb24odmFsdWUpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=