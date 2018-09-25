/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FormArray } from '@angular/forms';
import { ControlRelations } from '../change-tracking/control-relations';
import { HiderHelper } from '../form-entry/control-hiders-disablers/hider-helpers';
import { AlertHelper } from '../form-entry/control-alerts/alert-helpers';
import { DisablerHelper } from '../form-entry/control-hiders-disablers/disabler-helper';
export class AfeFormArray extends FormArray {
    /**
     * @param {?} controls
     * @param {?=} validator
     * @param {?=} asyncValidator
     */
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
    /**
     * @return {?}
     */
    get uuid() {
        return this._uuid;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set uuid(val) {
        this._uuid = val;
    }
    /**
     * @return {?}
     */
    get controlRelations() {
        return this._controlRelations;
    }
    /**
     * @return {?}
     */
    hide() {
        this.hiderHelper.hideControl(this);
    }
    /**
     * @return {?}
     */
    show() {
        this.hiderHelper.showControl(this);
    }
    /**
     * @param {?=} param
     * @return {?}
     */
    disable(param) {
        super.disable(param);
        super.setValue([]);
    }
    /**
     * @param {?} newHider
     * @return {?}
     */
    setHidingFn(newHider) {
        this.hiderHelper.setHiderForControl(this, newHider);
    }
    /**
     * @return {?}
     */
    clearHidingFns() {
        this.hiderHelper.clearHidersForControl(this);
    }
    /**
     * @return {?}
     */
    updateHiddenState() {
        this.hiderHelper.evaluateControlHiders(this);
    }
    /**
     * @param {?} newDisabler
     * @return {?}
     */
    setDisablingFn(newDisabler) {
        this.disablerHelper.setDisablerForControl(this, newDisabler);
    }
    /**
     * @return {?}
     */
    clearDisablingFns() {
        this.disablerHelper.clearDisablersForControl(this);
    }
    /**
     * @return {?}
     */
    updateDisabledState() {
        this.disablerHelper.evaluateControlDisablers(this);
    }
    /**
     * @param {?} newHider
     * @return {?}
     */
    setAlertFn(newHider) {
        this.AlertHelper.setAlertsForControl(this, newHider);
    }
    /**
     * @return {?}
     */
    clearMessageFns() {
        this.AlertHelper.clearAlertsForControl(this);
    }
    /**
     * @return {?}
     */
    updateAlert() {
        this.AlertHelper.evaluateControlAlerts(this);
    }
    /**
     * @param {?} func
     * @return {?}
     */
    addValueChangeListener(func) {
        this._valueChangeListener = func;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    fireValueChangeListener(value) {
        if (this.alerts.length > 0) {
            this.updateAlert();
        }
        if (this._valueChangeListener && typeof this._valueChangeListener === 'function') {
            this._valueChangeListener(value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setValue(value) {
        super.setValue(value);
    }
}
function AfeFormArray_tsickle_Closure_declarations() {
    /** @type {?} */
    AfeFormArray.prototype._controlRelations;
    /** @type {?} */
    AfeFormArray.prototype._valueChangeListener;
    /** @type {?} */
    AfeFormArray.prototype._previousValue;
    /** @type {?} */
    AfeFormArray.prototype._uuid;
    /** @type {?} */
    AfeFormArray.prototype.pathFromRoot;
    /** @type {?} */
    AfeFormArray.prototype.hidden;
    /** @type {?} */
    AfeFormArray.prototype.hiders;
    /** @type {?} */
    AfeFormArray.prototype.alert;
    /** @type {?} */
    AfeFormArray.prototype.alerts;
    /** @type {?} */
    AfeFormArray.prototype.disablers;
    /** @type {?} */
    AfeFormArray.prototype.hiderHelper;
    /** @type {?} */
    AfeFormArray.prototype.AlertHelper;
    /** @type {?} */
    AfeFormArray.prototype.disablerHelper;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tYXJyYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJhYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tYXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWtELE1BQU0sZ0JBQWdCLENBQUM7QUFFM0YsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFLeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ25GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFHeEYsTUFBTSxtQkFBb0IsU0FBUSxTQUFTOzs7Ozs7SUFtQnZDLFlBQVksUUFBMkIsRUFBRSxTQUF1QixFQUFFLGNBQWlDO1FBQy9GLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDOzJCQUxaLElBQUksV0FBVyxFQUFFOzJCQUNqQixJQUFJLFdBQVcsRUFBRTs4QkFDWCxJQUFJLGNBQWMsRUFBRTtRQUl6RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQzthQUM3QjtTQUNGLENBQUMsQ0FBQztLQUNOOzs7O0lBRUQsSUFBSSxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDckI7Ozs7O0lBQ0QsSUFBSSxJQUFJLENBQUMsR0FBVztRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztLQUNwQjs7OztJQUVELElBQUksZ0JBQWdCO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7S0FDakM7Ozs7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEM7Ozs7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEM7Ozs7O0lBRUQsT0FBTyxDQUFDLEtBQW1EO1FBQ3ZELEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN0Qjs7Ozs7SUFFRCxXQUFXLENBQUMsUUFBZTtRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztLQUN2RDs7OztJQUVELGNBQWM7UUFDVixJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hEOzs7O0lBRUQsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNoRDs7Ozs7SUFFRCxjQUFjLENBQUMsV0FBcUI7UUFDaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7S0FDaEU7Ozs7SUFFRCxpQkFBaUI7UUFDYixJQUFJLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3REOzs7O0lBRUQsbUJBQW1CO1FBQ2YsSUFBSSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0RDs7Ozs7SUFFRCxVQUFVLENBQUMsUUFBZTtRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztLQUN4RDs7OztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hEOzs7O0lBRUEsV0FBVztRQUNSLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDaEQ7Ozs7O0lBRUQsc0JBQXNCLENBQUMsSUFBUztRQUM5QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO0tBQ2xDOzs7OztJQUVELHVCQUF1QixDQUFDLEtBQVU7UUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEI7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLElBQUksT0FBTyxJQUFJLENBQUMsb0JBQW9CLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNqRixJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEM7S0FDRjs7Ozs7SUFFRCxRQUFRLENBQUMsS0FBVTtRQUNmLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDekI7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1BcnJheSwgVmFsaWRhdG9yRm4sIEFzeW5jVmFsaWRhdG9yRm4sIEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnMgfSBmcm9tICcuLi9jaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMnO1xyXG5pbXBvcnQgeyBWYWx1ZUNoYW5nZUxpc3RlbmVyIH0gZnJvbSAnLi92YWx1ZS1jaGFuZ2UubGlzdGVuZXInO1xyXG5pbXBvcnQgeyBDYW5IaWRlLCBIaWRlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcclxuaW1wb3J0IHsgQ2FuR2VuZXJhdGVBbGVydCwgQWxlcnQgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2Nhbi1nZW5lcmF0ZS1hbGVydCc7XHJcbmltcG9ydCB7IENhbkRpc2FibGUsIERpc2FibGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWRpc2FibGUnO1xyXG5pbXBvcnQgeyBIaWRlckhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMnO1xyXG5pbXBvcnQgeyBBbGVydEhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1hbGVydHMvYWxlcnQtaGVscGVycyc7XHJcbmltcG9ydCB7IERpc2FibGVySGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvZGlzYWJsZXItaGVscGVyJztcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQWZlRm9ybUFycmF5IGV4dGVuZHMgRm9ybUFycmF5IGltcGxlbWVudHMgQ2FuSGlkZSwgQ2FuRGlzYWJsZSwgQ2FuR2VuZXJhdGVBbGVydCwgVmFsdWVDaGFuZ2VMaXN0ZW5lciB7XHJcbiAgICBwcml2YXRlIF9jb250cm9sUmVsYXRpb25zOiBDb250cm9sUmVsYXRpb25zO1xyXG4gICAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VMaXN0ZW5lcjogYW55O1xyXG4gICAgcHJpdmF0ZSBfcHJldmlvdXNWYWx1ZTtcclxuICAgIHByaXZhdGUgX3V1aWQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBwYXRoRnJvbVJvb3Q6IHN0cmluZztcclxuXHJcbiAgICBoaWRkZW46IGZhbHNlO1xyXG4gICAgaGlkZXJzOiBIaWRlcltdO1xyXG5cclxuICAgIGFsZXJ0OiBzdHJpbmc7XHJcbiAgICBhbGVydHM6IEFsZXJ0W107XHJcblxyXG4gICAgZGlzYWJsZXJzOiBEaXNhYmxlcltdO1xyXG5cclxuICAgIHByaXZhdGUgaGlkZXJIZWxwZXI6IEhpZGVySGVscGVyID0gbmV3IEhpZGVySGVscGVyKCk7XHJcbiAgICBwcml2YXRlIEFsZXJ0SGVscGVyOiBBbGVydEhlbHBlciA9IG5ldyBBbGVydEhlbHBlcigpO1xyXG4gICAgcHJpdmF0ZSBkaXNhYmxlckhlbHBlcjogRGlzYWJsZXJIZWxwZXIgPSBuZXcgRGlzYWJsZXJIZWxwZXIoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250cm9sczogQWJzdHJhY3RDb250cm9sW10sIHZhbGlkYXRvcj86IFZhbGlkYXRvckZuLCBhc3luY1ZhbGlkYXRvcj86IEFzeW5jVmFsaWRhdG9yRm4pIHtcclxuICAgICAgICBzdXBlcihjb250cm9scywgdmFsaWRhdG9yLCBhc3luY1ZhbGlkYXRvcik7XHJcbiAgICAgICAgdGhpcy5fY29udHJvbFJlbGF0aW9ucyA9IG5ldyBDb250cm9sUmVsYXRpb25zKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGlkZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5hbGVydHMgPSBbXTtcclxuICAgICAgICB0aGlzLmRpc2FibGVycyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5fcHJldmlvdXNWYWx1ZSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5maXJlVmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdXVpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91dWlkO1xyXG4gICAgfVxyXG4gICAgc2V0IHV1aWQodmFsOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl91dWlkID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb250cm9sUmVsYXRpb25zKCk6IENvbnRyb2xSZWxhdGlvbnMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb250cm9sUmVsYXRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5oaWRlQ29udHJvbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuc2hvd0NvbnRyb2wodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZShwYXJhbT86IHsgb25seVNlbGY/OiBib29sZWFuLCBlbWl0RXZlbnQ/OiBib29sZWFuIH0pIHtcclxuICAgICAgICBzdXBlci5kaXNhYmxlKHBhcmFtKTtcclxuICAgICAgICBzdXBlci5zZXRWYWx1ZShbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SGlkaW5nRm4obmV3SGlkZXI6IEhpZGVyKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5zZXRIaWRlckZvckNvbnRyb2wodGhpcywgbmV3SGlkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFySGlkaW5nRm5zKCkge1xyXG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuY2xlYXJIaWRlcnNGb3JDb250cm9sKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUhpZGRlblN0YXRlKCkge1xyXG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuZXZhbHVhdGVDb250cm9sSGlkZXJzKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpc2FibGluZ0ZuKG5ld0Rpc2FibGVyOiBEaXNhYmxlcikge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuc2V0RGlzYWJsZXJGb3JDb250cm9sKHRoaXMsIG5ld0Rpc2FibGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckRpc2FibGluZ0ZucygpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLmNsZWFyRGlzYWJsZXJzRm9yQ29udHJvbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVEaXNhYmxlZFN0YXRlKCkge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuZXZhbHVhdGVDb250cm9sRGlzYWJsZXJzKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEFsZXJ0Rm4obmV3SGlkZXI6IEFsZXJ0KSB7XHJcbiAgICAgICAgdGhpcy5BbGVydEhlbHBlci5zZXRBbGVydHNGb3JDb250cm9sKHRoaXMsIG5ld0hpZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhck1lc3NhZ2VGbnMoKSB7XHJcbiAgICAgICAgdGhpcy5BbGVydEhlbHBlci5jbGVhckFsZXJ0c0ZvckNvbnRyb2wodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgIHVwZGF0ZUFsZXJ0KCkge1xyXG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuZXZhbHVhdGVDb250cm9sQWxlcnRzKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFZhbHVlQ2hhbmdlTGlzdGVuZXIoZnVuYzogYW55KSB7XHJcbiAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIgPSBmdW5jO1xyXG4gICAgfVxyXG5cclxuICAgIGZpcmVWYWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlOiBhbnkpIHtcclxuICAgICAgaWYgKHRoaXMuYWxlcnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUFsZXJ0KCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIgJiYgdHlwZW9mIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldFZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICBzdXBlci5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==