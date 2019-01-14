/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            /** @type {?} */
            const _val = this.calculator.call(ExpressionRunner, {});
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    AfeFormControl.prototype._controlRelations;
    /**
     * @type {?}
     * @private
     */
    AfeFormControl.prototype._valueChangeListener;
    /**
     * @type {?}
     * @private
     */
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
    /**
     * @type {?}
     * @private
     */
    AfeFormControl.prototype.hiderHelper;
    /**
     * @type {?}
     * @private
     */
    AfeFormControl.prototype.disablerHelper;
    /**
     * @type {?}
     * @private
     */
    AfeFormControl.prototype.AlertHelper;
}
export { AfeFormControl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImFic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsV0FBVyxFQUF5RCxNQUFNLGdCQUFnQixDQUFDO0FBRXBHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBS3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNuRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBRXhGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBRXJGLG9CQUFxQixTQUFRLFdBQVc7Ozs7OztJQWlCcEMsWUFBWSxTQUFlLEVBQUUsU0FBdUUsRUFDaEcsY0FBNkQ7UUFDN0QsS0FBSyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFaaEQsV0FBTSxHQUFHLEtBQUssQ0FBQztRQU9QLGdCQUFXLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFDN0MsbUJBQWMsR0FBbUIsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUN0RCxnQkFBVyxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBSWpELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENB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QyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsS0FBVTtRQUNmLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUNKOzs7Ozs7SUE3R0csMkNBQTRDOzs7OztJQUM1Qyw4Q0FBa0M7Ozs7O0lBQ2xDLHdDQUF1Qjs7SUFDdkIsOEJBQW9COztJQUNwQixzQ0FBNEI7O0lBRTVCLGdDQUFlOztJQUNmLGdDQUFnQjs7SUFDaEIsK0JBQWM7O0lBQ2QsZ0NBQWdCOztJQUNoQixvQ0FBcUI7O0lBQ3JCLG1DQUFzQjs7Ozs7SUFFdEIscUNBQXFEOzs7OztJQUNyRCx3Q0FBOEQ7Ozs7O0lBQzlELHFDQUFxRDs7QUErRnpELE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1Db250cm9sLCBWYWxpZGF0b3JGbiwgQXN5bmNWYWxpZGF0b3JGbiwgQWJzdHJhY3RDb250cm9sT3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9ucyB9IGZyb20gJy4uL2NoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9ucyc7XG5pbXBvcnQgeyBWYWx1ZUNoYW5nZUxpc3RlbmVyIH0gZnJvbSAnLi92YWx1ZS1jaGFuZ2UubGlzdGVuZXInO1xuaW1wb3J0IHsgQ2FuSGlkZSwgSGlkZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4taGlkZSc7XG5pbXBvcnQgeyBDYW5EaXNhYmxlLCBEaXNhYmxlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1kaXNhYmxlJztcbmltcG9ydCB7IENhbkdlbmVyYXRlQWxlcnQsIEFsZXJ0IH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWFsZXJ0cy9jYW4tZ2VuZXJhdGUtYWxlcnQnO1xuaW1wb3J0IHsgSGlkZXJIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9oaWRlci1oZWxwZXJzJztcbmltcG9ydCB7IEFsZXJ0SGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWFsZXJ0cy9hbGVydC1oZWxwZXJzJztcbmltcG9ydCB7IERpc2FibGVySGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvZGlzYWJsZXItaGVscGVyJztcbmltcG9ydCB7IENhbkNhbGN1bGF0ZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1jYWxjdWxhdG9ycy9jYW4tY2FsY3VsYXRlJztcbmltcG9ydCB7IEV4cHJlc3Npb25SdW5uZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyJztcblxuY2xhc3MgQWZlRm9ybUNvbnRyb2wgZXh0ZW5kcyBGb3JtQ29udHJvbCBpbXBsZW1lbnRzIENhbkhpZGUsIENhbkRpc2FibGUsIENhbkNhbGN1bGF0ZSwgQ2FuR2VuZXJhdGVBbGVydCwgVmFsdWVDaGFuZ2VMaXN0ZW5lciB7XG4gICAgcHJpdmF0ZSBfY29udHJvbFJlbGF0aW9uczogQ29udHJvbFJlbGF0aW9ucztcbiAgICBwcml2YXRlIF92YWx1ZUNoYW5nZUxpc3RlbmVyOiBhbnk7XG4gICAgcHJpdmF0ZSBfcHJldmlvdXNWYWx1ZTtcbiAgICBwdWJsaWMgdXVpZDogc3RyaW5nO1xuICAgIHB1YmxpYyBwYXRoRnJvbVJvb3Q6IHN0cmluZztcblxuICAgIGhpZGRlbiA9IGZhbHNlO1xuICAgIGhpZGVyczogSGlkZXJbXTtcbiAgICBhbGVydDogc3RyaW5nO1xuICAgIGFsZXJ0czogQWxlcnRbXTtcbiAgICBjYWxjdWxhdG9yOiBGdW5jdGlvbjtcbiAgICBkaXNhYmxlcnM6IERpc2FibGVyW107XG5cbiAgICBwcml2YXRlIGhpZGVySGVscGVyOiBIaWRlckhlbHBlciA9IG5ldyBIaWRlckhlbHBlcigpO1xuICAgIHByaXZhdGUgZGlzYWJsZXJIZWxwZXI6IERpc2FibGVySGVscGVyID0gbmV3IERpc2FibGVySGVscGVyKCk7XG4gICAgcHJpdmF0ZSBBbGVydEhlbHBlcjogQWxlcnRIZWxwZXIgPSBuZXcgQWxlcnRIZWxwZXIoKTtcbiAgICBjb25zdHJ1Y3Rvcihmb3JtU3RhdGU/OiBhbnksIHZhbGlkYXRvcj86IFZhbGlkYXRvckZuIHwgVmFsaWRhdG9yRm5bXSB8IEFic3RyYWN0Q29udHJvbE9wdGlvbnMgfCBudWxsLFxuICAgICAgICBhc3luY1ZhbGlkYXRvcj86IEFzeW5jVmFsaWRhdG9yRm4gfCBBc3luY1ZhbGlkYXRvckZuW10gfCBudWxsKSB7XG4gICAgICAgIHN1cGVyKGZvcm1TdGF0ZSwgdmFsaWRhdG9yLCBhc3luY1ZhbGlkYXRvcik7XG4gICAgICAgIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnMgPSBuZXcgQ29udHJvbFJlbGF0aW9ucyh0aGlzKTtcbiAgICAgICAgdGhpcy5oaWRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5kaXNhYmxlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5hbGVydHMgPSBbXTtcblxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcHJldmlvdXNWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVWYWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcmV2aW91c1ZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBjb250cm9sUmVsYXRpb25zKCk6IENvbnRyb2xSZWxhdGlvbnMge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udHJvbFJlbGF0aW9ucztcbiAgICB9XG5cbiAgICBkaXNhYmxlKHBhcmFtPzogeyBvbmx5U2VsZj86IGJvb2xlYW4sIGVtaXRFdmVudD86IGJvb2xlYW4gfSkge1xuICAgICAgICBzdXBlci5kaXNhYmxlKHBhcmFtKTtcbiAgICAgICAgc3VwZXIuc2V0VmFsdWUoJycpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuaGlkZUNvbnRyb2wodGhpcyk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5zaG93Q29udHJvbCh0aGlzKTtcbiAgICB9XG5cbiAgICBzZXRIaWRpbmdGbihuZXdIaWRlcjogSGlkZXIpIHtcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5zZXRIaWRlckZvckNvbnRyb2wodGhpcywgbmV3SGlkZXIpO1xuICAgIH1cblxuICAgIHNldENhbGN1bGF0b3JGbihuZXdDYWxjdWxhdG9yOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLmNhbGN1bGF0b3IgPSBuZXdDYWxjdWxhdG9yO1xuICAgIH1cblxuICAgIHVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FsY3VsYXRvcikge1xuICAgICAgICAgICAgY29uc3QgX3ZhbCA9IHRoaXMuY2FsY3VsYXRvci5jYWxsKEV4cHJlc3Npb25SdW5uZXIsIHt9KTtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoX3ZhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhckhpZGluZ0ZucygpIHtcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5jbGVhckhpZGVyc0ZvckNvbnRyb2wodGhpcyk7XG4gICAgfVxuXG4gICAgdXBkYXRlSGlkZGVuU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuZXZhbHVhdGVDb250cm9sSGlkZXJzKHRoaXMpO1xuICAgIH1cblxuICAgIHNldERpc2FibGluZ0ZuKG5ld0Rpc2FibGVyOiBEaXNhYmxlcikge1xuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLnNldERpc2FibGVyRm9yQ29udHJvbCh0aGlzLCBuZXdEaXNhYmxlcik7XG4gICAgfVxuXG4gICAgY2xlYXJEaXNhYmxpbmdGbnMoKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuY2xlYXJEaXNhYmxlcnNGb3JDb250cm9sKHRoaXMpO1xuICAgIH1cblxuICAgIHVwZGF0ZURpc2FibGVkU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuZXZhbHVhdGVDb250cm9sRGlzYWJsZXJzKHRoaXMpO1xuICAgIH1cblxuICAgIHNldEFsZXJ0Rm4obmV3SGlkZXI6IEFsZXJ0KSB7XG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuc2V0QWxlcnRzRm9yQ29udHJvbCh0aGlzLCBuZXdIaWRlcik7XG4gICAgfVxuXG4gICAgY2xlYXJNZXNzYWdlRm5zKCkge1xuICAgICAgICB0aGlzLkFsZXJ0SGVscGVyLmNsZWFyQWxlcnRzRm9yQ29udHJvbCh0aGlzKTtcbiAgICB9XG5cbiAgICB1cGRhdGVBbGVydCgpIHtcbiAgICAgICAgdGhpcy5BbGVydEhlbHBlci5ldmFsdWF0ZUNvbnRyb2xBbGVydHModGhpcyk7XG4gICAgfVxuXG4gICAgYWRkVmFsdWVDaGFuZ2VMaXN0ZW5lcihmdW5jOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciA9IGZ1bmM7XG4gICAgfVxuXG4gICAgZmlyZVZhbHVlQ2hhbmdlTGlzdGVuZXIodmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciAmJiB0eXBlb2YgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHN1cGVyLnNldFZhbHVlKHZhbHVlKTtcbiAgICB9XG59XG5leHBvcnQgeyBBZmVGb3JtQ29udHJvbCB9O1xuIl19