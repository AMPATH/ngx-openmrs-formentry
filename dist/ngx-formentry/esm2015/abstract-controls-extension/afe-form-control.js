/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FormControl } from '@angular/forms';
import { ControlRelations } from '../change-tracking/control-relations';
import { HiderHelper } from '../form-entry/control-hiders-disablers/hider-helpers';
import { AlertHelper } from '../form-entry/control-alerts/alert-helpers';
import { DisablerHelper } from '../form-entry/control-hiders-disablers/disabler-helper';
import { ExpressionRunner } from '../form-entry/expression-runner/expression-runner';
class AfeFormControl extends FormControl {
    /**
     * @param {?=} formState
     * @param {?=} validator
     * @param {?=} asyncValidator
     */
    constructor(formState, validator, asyncValidator) {
        super(formState, validator, asyncValidator);
        this.hidden = false;
        this.hiderHelper = new HiderHelper();
        this.disablerHelper = new DisablerHelper();
        this.AlertHelper = new AlertHelper();
        this._controlRelations = new ControlRelations(this);
        this.hiders = [];
        this.disablers = [];
        this.alerts = [];
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
    get controlRelations() {
        return this._controlRelations;
    }
    /**
     * @param {?=} param
     * @return {?}
     */
    disable(param) {
        super.disable(param);
        super.setValue('');
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
     * @param {?} newHider
     * @return {?}
     */
    setHidingFn(newHider) {
        this.hiderHelper.setHiderForControl(this, newHider);
    }
    /**
     * @param {?} newCalculator
     * @return {?}
     */
    setCalculatorFn(newCalculator) {
        this.calculator = newCalculator;
    }
    /**
     * @return {?}
     */
    updateCalculatedValue() {
        if (this.calculator) {
            const /** @type {?} */ _val = this.calculator.call(ExpressionRunner, {});
            this.setValue(_val);
        }
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
function AfeFormControl_tsickle_Closure_declarations() {
    /** @type {?} */
    AfeFormControl.prototype._controlRelations;
    /** @type {?} */
    AfeFormControl.prototype._valueChangeListener;
    /** @type {?} */
    AfeFormControl.prototype._previousValue;
    /** @type {?} */
    AfeFormControl.prototype.uuid;
    /** @type {?} */
    AfeFormControl.prototype.pathFromRoot;
    /** @type {?} */
    AfeFormControl.prototype.hidden;
    /** @type {?} */
    AfeFormControl.prototype.hiders;
    /** @type {?} */
    AfeFormControl.prototype.alert;
    /** @type {?} */
    AfeFormControl.prototype.alerts;
    /** @type {?} */
    AfeFormControl.prototype.calculator;
    /** @type {?} */
    AfeFormControl.prototype.disablers;
    /** @type {?} */
    AfeFormControl.prototype.hiderHelper;
    /** @type {?} */
    AfeFormControl.prototype.disablerHelper;
    /** @type {?} */
    AfeFormControl.prototype.AlertHelper;
}
export { AfeFormControl };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImFic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsV0FBVyxFQUF5RCxNQUFNLGdCQUFnQixDQUFDO0FBRXBHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBS3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNuRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBRXhGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBRXJGLG9CQUFxQixTQUFRLFdBQVc7Ozs7OztJQWlCcEMsWUFBWSxTQUFlLEVBQUUsU0FBdUUsRUFDaEcsY0FBNkQ7UUFDN0QsS0FBSyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7c0JBWnZDLEtBQUs7MkJBT3FCLElBQUksV0FBVyxFQUFFOzhCQUNYLElBQUksY0FBYyxFQUFFOzJCQUMxQixJQUFJLFdBQVcsRUFBRTtRQUloRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEtBQUssS0FB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b250ZW50IjpbImltcG9ydCB7IEZvcm1Db250cm9sLCBWYWxpZGF0b3JGbiwgQXN5bmNWYWxpZGF0b3JGbiwgQWJzdHJhY3RDb250cm9sT3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnMgfSBmcm9tICcuLi9jaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMnO1xyXG5pbXBvcnQgeyBWYWx1ZUNoYW5nZUxpc3RlbmVyIH0gZnJvbSAnLi92YWx1ZS1jaGFuZ2UubGlzdGVuZXInO1xyXG5pbXBvcnQgeyBDYW5IaWRlLCBIaWRlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcclxuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgRGlzYWJsZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XHJcbmltcG9ydCB7IENhbkdlbmVyYXRlQWxlcnQsIEFsZXJ0IH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWFsZXJ0cy9jYW4tZ2VuZXJhdGUtYWxlcnQnO1xyXG5pbXBvcnQgeyBIaWRlckhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMnO1xyXG5pbXBvcnQgeyBBbGVydEhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1hbGVydHMvYWxlcnQtaGVscGVycyc7XHJcbmltcG9ydCB7IERpc2FibGVySGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvZGlzYWJsZXItaGVscGVyJztcclxuaW1wb3J0IHsgQ2FuQ2FsY3VsYXRlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWNhbGN1bGF0b3JzL2Nhbi1jYWxjdWxhdGUnO1xyXG5pbXBvcnQgeyBFeHByZXNzaW9uUnVubmVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XHJcblxyXG5jbGFzcyBBZmVGb3JtQ29udHJvbCBleHRlbmRzIEZvcm1Db250cm9sIGltcGxlbWVudHMgQ2FuSGlkZSwgQ2FuRGlzYWJsZSwgQ2FuQ2FsY3VsYXRlLCBDYW5HZW5lcmF0ZUFsZXJ0LCBWYWx1ZUNoYW5nZUxpc3RlbmVyIHtcclxuICAgIHByaXZhdGUgX2NvbnRyb2xSZWxhdGlvbnM6IENvbnRyb2xSZWxhdGlvbnM7XHJcbiAgICBwcml2YXRlIF92YWx1ZUNoYW5nZUxpc3RlbmVyOiBhbnk7XHJcbiAgICBwcml2YXRlIF9wcmV2aW91c1ZhbHVlO1xyXG4gICAgcHVibGljIHV1aWQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBwYXRoRnJvbVJvb3Q6IHN0cmluZztcclxuXHJcbiAgICBoaWRkZW4gPSBmYWxzZTtcclxuICAgIGhpZGVyczogSGlkZXJbXTtcclxuICAgIGFsZXJ0OiBzdHJpbmc7XHJcbiAgICBhbGVydHM6IEFsZXJ0W107XHJcbiAgICBjYWxjdWxhdG9yOiBGdW5jdGlvbjtcclxuICAgIGRpc2FibGVyczogRGlzYWJsZXJbXTtcclxuXHJcbiAgICBwcml2YXRlIGhpZGVySGVscGVyOiBIaWRlckhlbHBlciA9IG5ldyBIaWRlckhlbHBlcigpO1xyXG4gICAgcHJpdmF0ZSBkaXNhYmxlckhlbHBlcjogRGlzYWJsZXJIZWxwZXIgPSBuZXcgRGlzYWJsZXJIZWxwZXIoKTtcclxuICAgIHByaXZhdGUgQWxlcnRIZWxwZXI6IEFsZXJ0SGVscGVyID0gbmV3IEFsZXJ0SGVscGVyKCk7XHJcbiAgICBjb25zdHJ1Y3Rvcihmb3JtU3RhdGU/OiBhbnksIHZhbGlkYXRvcj86IFZhbGlkYXRvckZuIHwgVmFsaWRhdG9yRm5bXSB8IEFic3RyYWN0Q29udHJvbE9wdGlvbnMgfCBudWxsLFxyXG4gICAgICAgIGFzeW5jVmFsaWRhdG9yPzogQXN5bmNWYWxpZGF0b3JGbiB8IEFzeW5jVmFsaWRhdG9yRm5bXSB8IG51bGwpIHtcclxuICAgICAgICBzdXBlcihmb3JtU3RhdGUsIHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xyXG4gICAgICAgIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnMgPSBuZXcgQ29udHJvbFJlbGF0aW9ucyh0aGlzKTtcclxuICAgICAgICB0aGlzLmhpZGVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5hbGVydHMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcHJldmlvdXNWYWx1ZSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZVZhbHVlQ2hhbmdlTGlzdGVuZXIodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNvbnRyb2xSZWxhdGlvbnMoKTogQ29udHJvbFJlbGF0aW9ucyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZShwYXJhbT86IHsgb25seVNlbGY/OiBib29sZWFuLCBlbWl0RXZlbnQ/OiBib29sZWFuIH0pIHtcclxuICAgICAgICBzdXBlci5kaXNhYmxlKHBhcmFtKTtcclxuICAgICAgICBzdXBlci5zZXRWYWx1ZSgnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmhpZGVDb250cm9sKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5zaG93Q29udHJvbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRIaWRpbmdGbihuZXdIaWRlcjogSGlkZXIpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLnNldEhpZGVyRm9yQ29udHJvbCh0aGlzLCBuZXdIaWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2FsY3VsYXRvckZuKG5ld0NhbGN1bGF0b3I6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9yID0gbmV3Q2FsY3VsYXRvcjtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDYWxjdWxhdGVkVmFsdWUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FsY3VsYXRvcikge1xyXG4gICAgICAgICAgICBjb25zdCBfdmFsID0gdGhpcy5jYWxjdWxhdG9yLmNhbGwoRXhwcmVzc2lvblJ1bm5lciwge30pO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKF92YWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGVhckhpZGluZ0ZucygpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmNsZWFySGlkZXJzRm9yQ29udHJvbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVIaWRkZW5TdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmV2YWx1YXRlQ29udHJvbEhpZGVycyh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNhYmxpbmdGbihuZXdEaXNhYmxlcjogRGlzYWJsZXIpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLnNldERpc2FibGVyRm9yQ29udHJvbCh0aGlzLCBuZXdEaXNhYmxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJEaXNhYmxpbmdGbnMoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlckhlbHBlci5jbGVhckRpc2FibGVyc0ZvckNvbnRyb2wodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRGlzYWJsZWRTdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLmV2YWx1YXRlQ29udHJvbERpc2FibGVycyh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBbGVydEZuKG5ld0hpZGVyOiBBbGVydCkge1xyXG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuc2V0QWxlcnRzRm9yQ29udHJvbCh0aGlzLCBuZXdIaWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJNZXNzYWdlRm5zKCkge1xyXG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuY2xlYXJBbGVydHNGb3JDb250cm9sKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUFsZXJ0KCkge1xyXG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuZXZhbHVhdGVDb250cm9sQWxlcnRzKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFZhbHVlQ2hhbmdlTGlzdGVuZXIoZnVuYzogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciA9IGZ1bmM7XHJcbiAgICB9XHJcblxyXG4gICAgZmlyZVZhbHVlQ2hhbmdlTGlzdGVuZXIodmFsdWU6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyICYmIHR5cGVvZiB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgc3VwZXIuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IEFmZUZvcm1Db250cm9sIH07XHJcbiJdfQ==