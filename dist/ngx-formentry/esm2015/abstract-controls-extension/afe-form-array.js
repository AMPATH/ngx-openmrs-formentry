import { FormArray } from '@angular/forms';
import { ControlRelations } from '../change-tracking/control-relations';
import { HiderHelper } from '../form-entry/control-hiders-disablers/hider-helpers';
import { AlertHelper } from '../form-entry/control-alerts/alert-helpers';
import { DisablerHelper } from '../form-entry/control-hiders-disablers/disabler-helper';
export class AfeFormArray extends FormArray {
    constructor(controls, validator, asyncValidator) {
        super(controls, validator, asyncValidator);
        this.hiderHelper = new HiderHelper();
        this.AlertHelper = new AlertHelper();
        this.disablerHelper = new DisablerHelper();
        this._controlRelations = new ControlRelations(this);
        this.hiders = [];
        this.alerts = [];
        this.disablers = [];
        this.valueChanges.subscribe((value) => {
            if (this._previousValue !== value) {
                this.fireValueChangeListener(value);
                this._previousValue = value;
            }
        });
    }
    get uuid() {
        return this._uuid;
    }
    set uuid(val) {
        this._uuid = val;
    }
    get controlRelations() {
        return this._controlRelations;
    }
    hide() {
        this.hiderHelper.hideControl(this);
    }
    show() {
        this.hiderHelper.showControl(this);
    }
    disable(param) {
        super.disable(param);
        super.setValue([]);
    }
    setHidingFn(newHider) {
        this.hiderHelper.setHiderForControl(this, newHider);
    }
    clearHidingFns() {
        this.hiderHelper.clearHidersForControl(this);
    }
    updateHiddenState() {
        this.hiderHelper.evaluateControlHiders(this);
    }
    setDisablingFn(newDisabler) {
        this.disablerHelper.setDisablerForControl(this, newDisabler);
    }
    clearDisablingFns() {
        this.disablerHelper.clearDisablersForControl(this);
    }
    updateDisabledState() {
        this.disablerHelper.evaluateControlDisablers(this);
    }
    setAlertFn(newHider) {
        this.AlertHelper.setAlertsForControl(this, newHider);
    }
    clearMessageFns() {
        this.AlertHelper.clearAlertsForControl(this);
    }
    updateAlert() {
        this.AlertHelper.evaluateControlAlerts(this);
    }
    addValueChangeListener(func) {
        this._valueChangeListener = func;
    }
    fireValueChangeListener(value) {
        if (this.alerts.length > 0) {
            this.updateAlert();
        }
        if (this._valueChangeListener &&
            typeof this._valueChangeListener === 'function') {
            this._valueChangeListener(value);
        }
    }
    setValue(value) {
        super.setValue(value);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tYXJyYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJhYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tYXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFJVixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBY3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNuRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBRXhGLE1BQU0sbUJBQ0osU0FBUSxTQUFTO0lBb0JqQixZQUNFLFFBQTJCLEVBQzNCLFNBQXVCLEVBQ3ZCLGNBQWlDO1FBRWpDLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBVHJDLGdCQUFXLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFDN0MsZ0JBQVcsR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUM3QyxtQkFBYyxHQUFtQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBUTVELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDcEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFD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LFxuICBBc3luY1ZhbGlkYXRvckZuLFxuICBBYnN0cmFjdENvbnRyb2xcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb25zIH0gZnJvbSAnLi4vY2hhbmdlLXRyYWNraW5nL2NvbnRyb2wtcmVsYXRpb25zJztcbmltcG9ydCB7IFZhbHVlQ2hhbmdlTGlzdGVuZXIgfSBmcm9tICcuL3ZhbHVlLWNoYW5nZS5saXN0ZW5lcic7XG5pbXBvcnQge1xuICBDYW5IaWRlLFxuICBIaWRlclxufSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4taGlkZSc7XG5pbXBvcnQge1xuICBDYW5HZW5lcmF0ZUFsZXJ0LFxuICBBbGVydFxufSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2Nhbi1nZW5lcmF0ZS1hbGVydCc7XG5pbXBvcnQge1xuICBDYW5EaXNhYmxlLFxuICBEaXNhYmxlclxufSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XG5pbXBvcnQgeyBIaWRlckhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMnO1xuaW1wb3J0IHsgQWxlcnRIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2FsZXJ0LWhlbHBlcnMnO1xuaW1wb3J0IHsgRGlzYWJsZXJIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9kaXNhYmxlci1oZWxwZXInO1xuXG5leHBvcnQgY2xhc3MgQWZlRm9ybUFycmF5XG4gIGV4dGVuZHMgRm9ybUFycmF5XG4gIGltcGxlbWVudHMgQ2FuSGlkZSwgQ2FuRGlzYWJsZSwgQ2FuR2VuZXJhdGVBbGVydCwgVmFsdWVDaGFuZ2VMaXN0ZW5lciB7XG4gIHByaXZhdGUgX2NvbnRyb2xSZWxhdGlvbnM6IENvbnRyb2xSZWxhdGlvbnM7XG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlTGlzdGVuZXI6IGFueTtcbiAgcHJpdmF0ZSBfcHJldmlvdXNWYWx1ZTtcbiAgcHJpdmF0ZSBfdXVpZDogc3RyaW5nO1xuICBwdWJsaWMgcGF0aEZyb21Sb290OiBzdHJpbmc7XG5cbiAgaGlkZGVuOiBmYWxzZTtcbiAgaGlkZXJzOiBIaWRlcltdO1xuXG4gIGFsZXJ0OiBzdHJpbmc7XG4gIGFsZXJ0czogQWxlcnRbXTtcblxuICBkaXNhYmxlcnM6IERpc2FibGVyW107XG5cbiAgcHJpdmF0ZSBoaWRlckhlbHBlcjogSGlkZXJIZWxwZXIgPSBuZXcgSGlkZXJIZWxwZXIoKTtcbiAgcHJpdmF0ZSBBbGVydEhlbHBlcjogQWxlcnRIZWxwZXIgPSBuZXcgQWxlcnRIZWxwZXIoKTtcbiAgcHJpdmF0ZSBkaXNhYmxlckhlbHBlcjogRGlzYWJsZXJIZWxwZXIgPSBuZXcgRGlzYWJsZXJIZWxwZXIoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjb250cm9sczogQWJzdHJhY3RDb250cm9sW10sXG4gICAgdmFsaWRhdG9yPzogVmFsaWRhdG9yRm4sXG4gICAgYXN5bmNWYWxpZGF0b3I/OiBBc3luY1ZhbGlkYXRvckZuXG4gICkge1xuICAgIHN1cGVyKGNvbnRyb2xzLCB2YWxpZGF0b3IsIGFzeW5jVmFsaWRhdG9yKTtcbiAgICB0aGlzLl9jb250cm9sUmVsYXRpb25zID0gbmV3IENvbnRyb2xSZWxhdGlvbnModGhpcyk7XG4gICAgdGhpcy5oaWRlcnMgPSBbXTtcbiAgICB0aGlzLmFsZXJ0cyA9IFtdO1xuICAgIHRoaXMuZGlzYWJsZXJzID0gW107XG5cbiAgICB0aGlzLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICBpZiAodGhpcy5fcHJldmlvdXNWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgdGhpcy5maXJlVmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzVmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldCB1dWlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3V1aWQ7XG4gIH1cbiAgc2V0IHV1aWQodmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl91dWlkID0gdmFsO1xuICB9XG5cbiAgZ2V0IGNvbnRyb2xSZWxhdGlvbnMoKTogQ29udHJvbFJlbGF0aW9ucyB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnM7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMuaGlkZXJIZWxwZXIuaGlkZUNvbnRyb2wodGhpcyk7XG4gIH1cblxuICBzaG93KCkge1xuICAgIHRoaXMuaGlkZXJIZWxwZXIuc2hvd0NvbnRyb2wodGhpcyk7XG4gIH1cblxuICBkaXNhYmxlKHBhcmFtPzogeyBvbmx5U2VsZj86IGJvb2xlYW47IGVtaXRFdmVudD86IGJvb2xlYW4gfSkge1xuICAgIHN1cGVyLmRpc2FibGUocGFyYW0pO1xuICAgIHN1cGVyLnNldFZhbHVlKFtdKTtcbiAgfVxuXG4gIHNldEhpZGluZ0ZuKG5ld0hpZGVyOiBIaWRlcikge1xuICAgIHRoaXMuaGlkZXJIZWxwZXIuc2V0SGlkZXJGb3JDb250cm9sKHRoaXMsIG5ld0hpZGVyKTtcbiAgfVxuXG4gIGNsZWFySGlkaW5nRm5zKCkge1xuICAgIHRoaXMuaGlkZXJIZWxwZXIuY2xlYXJIaWRlcnNGb3JDb250cm9sKHRoaXMpO1xuICB9XG5cbiAgdXBkYXRlSGlkZGVuU3RhdGUoKSB7XG4gICAgdGhpcy5oaWRlckhlbHBlci5ldmFsdWF0ZUNvbnRyb2xIaWRlcnModGhpcyk7XG4gIH1cblxuICBzZXREaXNhYmxpbmdGbihuZXdEaXNhYmxlcjogRGlzYWJsZXIpIHtcbiAgICB0aGlzLmRpc2FibGVySGVscGVyLnNldERpc2FibGVyRm9yQ29udHJvbCh0aGlzLCBuZXdEaXNhYmxlcik7XG4gIH1cblxuICBjbGVhckRpc2FibGluZ0ZucygpIHtcbiAgICB0aGlzLmRpc2FibGVySGVscGVyLmNsZWFyRGlzYWJsZXJzRm9yQ29udHJvbCh0aGlzKTtcbiAgfVxuXG4gIHVwZGF0ZURpc2FibGVkU3RhdGUoKSB7XG4gICAgdGhpcy5kaXNhYmxlckhlbHBlci5ldmFsdWF0ZUNvbnRyb2xEaXNhYmxlcnModGhpcyk7XG4gIH1cblxuICBzZXRBbGVydEZuKG5ld0hpZGVyOiBBbGVydCkge1xuICAgIHRoaXMuQWxlcnRIZWxwZXIuc2V0QWxlcnRzRm9yQ29udHJvbCh0aGlzLCBuZXdIaWRlcik7XG4gIH1cblxuICBjbGVhck1lc3NhZ2VGbnMoKSB7XG4gICAgdGhpcy5BbGVydEhlbHBlci5jbGVhckFsZXJ0c0ZvckNvbnRyb2wodGhpcyk7XG4gIH1cblxuICB1cGRhdGVBbGVydCgpIHtcbiAgICB0aGlzLkFsZXJ0SGVscGVyLmV2YWx1YXRlQ29udHJvbEFsZXJ0cyh0aGlzKTtcbiAgfVxuXG4gIGFkZFZhbHVlQ2hhbmdlTGlzdGVuZXIoZnVuYzogYW55KSB7XG4gICAgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciA9IGZ1bmM7XG4gIH1cblxuICBmaXJlVmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuYWxlcnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMudXBkYXRlQWxlcnQoKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciAmJlxuICAgICAgdHlwZW9mIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIgPT09ICdmdW5jdGlvbidcbiAgICApIHtcbiAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBzdXBlci5zZXRWYWx1ZSh2YWx1ZSk7XG4gIH1cbn1cbiJdfQ==