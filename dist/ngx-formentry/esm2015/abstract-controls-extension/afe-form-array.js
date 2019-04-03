/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            if (this._previousValue !== value) {
                this.fireValueChangeListener(value);
                this._previousValue = value;
            }
        }));
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    AfeFormArray.prototype._controlRelations;
    /**
     * @type {?}
     * @private
     */
    AfeFormArray.prototype._valueChangeListener;
    /**
     * @type {?}
     * @private
     */
    AfeFormArray.prototype._previousValue;
    /**
     * @type {?}
     * @private
     */
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
    /**
     * @type {?}
     * @private
     */
    AfeFormArray.prototype.hiderHelper;
    /**
     * @type {?}
     * @private
     */
    AfeFormArray.prototype.AlertHelper;
    /**
     * @type {?}
     * @private
     */
    AfeFormArray.prototype.disablerHelper;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tYXJyYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJhYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tYXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWtELE1BQU0sZ0JBQWdCLENBQUM7QUFFM0YsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFLeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ25GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFHeEYsTUFBTSxtQkFBb0IsU0FBUSxTQUFTOzs7Ozs7SUFtQnZDLFlBQVksUUFBMkIsRUFBRSxTQUF1QixFQUFFLGNBQWlDO1FBQy9GLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBTHZDLGdCQUFXLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFDN0MsZ0JBQVcsR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUM3QyxtQkFBYyxHQUFtQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBSTFELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUzs7OztRQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDcEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLENB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QzFCLENBQUM7Q0FFSjs7Ozs7O0lBOUdHLHlDQUE0Qzs7Ozs7SUFDNUMsNENBQWtDOzs7OztJQUNsQyxzQ0FBdUI7Ozs7O0lBQ3ZCLDZCQUFzQjs7SUFDdEIsb0NBQTRCOztJQUU1Qiw4QkFBYzs7SUFDZCw4QkFBZ0I7O0lBRWhCLDZCQUFjOztJQUNkLDhCQUFnQjs7SUFFaEIsaUNBQXNCOzs7OztJQUV0QixtQ0FBcUQ7Ozs7O0lBQ3JELG1DQUFxRDs7Ozs7SUFDckQsc0NBQThEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUFycmF5LCBWYWxpZGF0b3JGbiwgQXN5bmNWYWxpZGF0b3JGbiwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9ucyB9IGZyb20gJy4uL2NoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9ucyc7XHJcbmltcG9ydCB7IFZhbHVlQ2hhbmdlTGlzdGVuZXIgfSBmcm9tICcuL3ZhbHVlLWNoYW5nZS5saXN0ZW5lcic7XHJcbmltcG9ydCB7IENhbkhpZGUsIEhpZGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWhpZGUnO1xyXG5pbXBvcnQgeyBDYW5HZW5lcmF0ZUFsZXJ0LCBBbGVydCB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1hbGVydHMvY2FuLWdlbmVyYXRlLWFsZXJ0JztcclxuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgRGlzYWJsZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XHJcbmltcG9ydCB7IEhpZGVySGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvaGlkZXItaGVscGVycyc7XHJcbmltcG9ydCB7IEFsZXJ0SGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWFsZXJ0cy9hbGVydC1oZWxwZXJzJztcclxuaW1wb3J0IHsgRGlzYWJsZXJIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9kaXNhYmxlci1oZWxwZXInO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBBZmVGb3JtQXJyYXkgZXh0ZW5kcyBGb3JtQXJyYXkgaW1wbGVtZW50cyBDYW5IaWRlLCBDYW5EaXNhYmxlLCBDYW5HZW5lcmF0ZUFsZXJ0LCBWYWx1ZUNoYW5nZUxpc3RlbmVyIHtcclxuICAgIHByaXZhdGUgX2NvbnRyb2xSZWxhdGlvbnM6IENvbnRyb2xSZWxhdGlvbnM7XHJcbiAgICBwcml2YXRlIF92YWx1ZUNoYW5nZUxpc3RlbmVyOiBhbnk7XHJcbiAgICBwcml2YXRlIF9wcmV2aW91c1ZhbHVlO1xyXG4gICAgcHJpdmF0ZSBfdXVpZDogc3RyaW5nO1xyXG4gICAgcHVibGljIHBhdGhGcm9tUm9vdDogc3RyaW5nO1xyXG5cclxuICAgIGhpZGRlbjogZmFsc2U7XHJcbiAgICBoaWRlcnM6IEhpZGVyW107XHJcblxyXG4gICAgYWxlcnQ6IHN0cmluZztcclxuICAgIGFsZXJ0czogQWxlcnRbXTtcclxuXHJcbiAgICBkaXNhYmxlcnM6IERpc2FibGVyW107XHJcblxyXG4gICAgcHJpdmF0ZSBoaWRlckhlbHBlcjogSGlkZXJIZWxwZXIgPSBuZXcgSGlkZXJIZWxwZXIoKTtcclxuICAgIHByaXZhdGUgQWxlcnRIZWxwZXI6IEFsZXJ0SGVscGVyID0gbmV3IEFsZXJ0SGVscGVyKCk7XHJcbiAgICBwcml2YXRlIGRpc2FibGVySGVscGVyOiBEaXNhYmxlckhlbHBlciA9IG5ldyBEaXNhYmxlckhlbHBlcigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2xzOiBBYnN0cmFjdENvbnRyb2xbXSwgdmFsaWRhdG9yPzogVmFsaWRhdG9yRm4sIGFzeW5jVmFsaWRhdG9yPzogQXN5bmNWYWxpZGF0b3JGbikge1xyXG4gICAgICAgIHN1cGVyKGNvbnRyb2xzLCB2YWxpZGF0b3IsIGFzeW5jVmFsaWRhdG9yKTtcclxuICAgICAgICB0aGlzLl9jb250cm9sUmVsYXRpb25zID0gbmV3IENvbnRyb2xSZWxhdGlvbnModGhpcyk7XHJcbiAgICAgICAgdGhpcy5oaWRlcnMgPSBbXTtcclxuICAgICAgICB0aGlzLmFsZXJ0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZXJzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLl9wcmV2aW91c1ZhbHVlICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZpcmVWYWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1dWlkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3V1aWQ7XHJcbiAgICB9XHJcbiAgICBzZXQgdXVpZCh2YWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3V1aWQgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNvbnRyb2xSZWxhdGlvbnMoKTogQ29udHJvbFJlbGF0aW9ucyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmhpZGVDb250cm9sKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5zaG93Q29udHJvbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlKHBhcmFtPzogeyBvbmx5U2VsZj86IGJvb2xlYW4sIGVtaXRFdmVudD86IGJvb2xlYW4gfSkge1xyXG4gICAgICAgIHN1cGVyLmRpc2FibGUocGFyYW0pO1xyXG4gICAgICAgIHN1cGVyLnNldFZhbHVlKFtdKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRIaWRpbmdGbihuZXdIaWRlcjogSGlkZXIpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLnNldEhpZGVyRm9yQ29udHJvbCh0aGlzLCBuZXdIaWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJIaWRpbmdGbnMoKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5jbGVhckhpZGVyc0ZvckNvbnRyb2wodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlSGlkZGVuU3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5ldmFsdWF0ZUNvbnRyb2xIaWRlcnModGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsaW5nRm4obmV3RGlzYWJsZXI6IERpc2FibGVyKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlckhlbHBlci5zZXREaXNhYmxlckZvckNvbnRyb2wodGhpcywgbmV3RGlzYWJsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyRGlzYWJsaW5nRm5zKCkge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuY2xlYXJEaXNhYmxlcnNGb3JDb250cm9sKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZURpc2FibGVkU3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlckhlbHBlci5ldmFsdWF0ZUNvbnRyb2xEaXNhYmxlcnModGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QWxlcnRGbihuZXdIaWRlcjogQWxlcnQpIHtcclxuICAgICAgICB0aGlzLkFsZXJ0SGVscGVyLnNldEFsZXJ0c0ZvckNvbnRyb2wodGhpcywgbmV3SGlkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyTWVzc2FnZUZucygpIHtcclxuICAgICAgICB0aGlzLkFsZXJ0SGVscGVyLmNsZWFyQWxlcnRzRm9yQ29udHJvbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAgdXBkYXRlQWxlcnQoKSB7XHJcbiAgICAgICAgdGhpcy5BbGVydEhlbHBlci5ldmFsdWF0ZUNvbnRyb2xBbGVydHModGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVmFsdWVDaGFuZ2VMaXN0ZW5lcihmdW5jOiBhbnkpIHtcclxuICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciA9IGZ1bmM7XHJcbiAgICB9XHJcblxyXG4gICAgZmlyZVZhbHVlQ2hhbmdlTGlzdGVuZXIodmFsdWU6IGFueSkge1xyXG4gICAgICBpZiAodGhpcy5hbGVydHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlQWxlcnQoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciAmJiB0eXBlb2YgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgICAgIHN1cGVyLnNldFZhbHVlKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19