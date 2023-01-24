// import { CanHide } from '../form-entry/control-hiders-disablers/can-hide';
// import { CanDisable } from '../form-entry/control-hiders-disablers/can-disable';
export class ControlRelation {
    constructor(control, relatedTo) {
        this._control = control;
        this._relatedTo = relatedTo;
        this._registerForChangesFromRelatedControl();
    }
    get control() {
        return this._control;
    }
    get relatedTo() {
        return this._relatedTo;
    }
    get lastUpdateValue() {
        return this._lastUpdateValue;
    }
    updateControlBasedOnRelation(newValue) {
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
    }
    _registerForChangesFromRelatedControl() {
        this._relatedTo.valueChanges.subscribe((value) => {
            this.updateControlBasedOnRelation(value);
        });
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY2hhbmdlLXRyYWNraW5nL2NvbnRyb2wtcmVsYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsNkVBQTZFO0FBQzdFLG1GQUFtRjtBQUVuRixNQUFNO0lBS0osWUFBWSxPQUF3QixFQUFFLFNBQTBCO1FBQzlELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxxQ0FBcUMsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksZUFBZTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQy9CLENBQUM7SUFFRCw0QkFBNEIsQ0FBQyxRQUFhO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7WUFFakMsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLFFBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsUUFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ2pELENBQUM7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDdkMsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLFFBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsUUFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzdDLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBRSxJQUFJLENBQUMsUUFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxRQUFnQixDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDL0MsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFFLElBQUksQ0FBQyxRQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxRQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZDLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU8scUNBQXFDO1FBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLy8gaW1wb3J0IHsgQ2FuSGlkZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcbi8vIGltcG9ydCB7IENhbkRpc2FibGUgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XG5cbmV4cG9ydCBjbGFzcyBDb250cm9sUmVsYXRpb24ge1xuICBwcml2YXRlIF9jb250cm9sOiBBYnN0cmFjdENvbnRyb2w7XG4gIHByaXZhdGUgX3JlbGF0ZWRUbzogQWJzdHJhY3RDb250cm9sO1xuICBwcml2YXRlIF9sYXN0VXBkYXRlVmFsdWU6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIHJlbGF0ZWRUbzogQWJzdHJhY3RDb250cm9sKSB7XG4gICAgdGhpcy5fY29udHJvbCA9IGNvbnRyb2w7XG4gICAgdGhpcy5fcmVsYXRlZFRvID0gcmVsYXRlZFRvO1xuICAgIHRoaXMuX3JlZ2lzdGVyRm9yQ2hhbmdlc0Zyb21SZWxhdGVkQ29udHJvbCgpO1xuICB9XG5cbiAgZ2V0IGNvbnRyb2woKTogQWJzdHJhY3RDb250cm9sIHtcbiAgICByZXR1cm4gdGhpcy5fY29udHJvbDtcbiAgfVxuXG4gIGdldCByZWxhdGVkVG8oKTogQWJzdHJhY3RDb250cm9sIHtcbiAgICByZXR1cm4gdGhpcy5fcmVsYXRlZFRvO1xuICB9XG5cbiAgZ2V0IGxhc3RVcGRhdGVWYWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9sYXN0VXBkYXRlVmFsdWU7XG4gIH1cblxuICB1cGRhdGVDb250cm9sQmFzZWRPblJlbGF0aW9uKG5ld1ZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX2xhc3RVcGRhdGVWYWx1ZSkge1xuICAgICAgdGhpcy5fbGFzdFVwZGF0ZVZhbHVlID0gbmV3VmFsdWU7XG5cbiAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSkge1xuICAgICAgICAodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKSB7XG4gICAgICAgICh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSkge1xuICAgICAgICAodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQpIHtcbiAgICAgICAgKHRoaXMuX2NvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZ2lzdGVyRm9yQ2hhbmdlc0Zyb21SZWxhdGVkQ29udHJvbCgpIHtcbiAgICB0aGlzLl9yZWxhdGVkVG8udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlQ29udHJvbEJhc2VkT25SZWxhdGlvbih2YWx1ZSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==