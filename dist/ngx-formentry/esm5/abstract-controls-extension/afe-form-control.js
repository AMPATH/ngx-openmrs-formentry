/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FormControl } from '@angular/forms';
import { ControlRelations } from '../change-tracking/control-relations';
import { HiderHelper } from '../form-entry/control-hiders-disablers/hider-helpers';
import { AlertHelper } from '../form-entry/control-alerts/alert-helpers';
import { DisablerHelper } from '../form-entry/control-hiders-disablers/disabler-helper';
import { ExpressionRunner } from '../form-entry/expression-runner/expression-runner';
var AfeFormControl = /** @class */ (function (_super) {
    tslib_1.__extends(AfeFormControl, _super);
    function AfeFormControl(formState, validator, asyncValidator) {
        var _this = _super.call(this, formState, validator, asyncValidator) || this;
        _this.hidden = false;
        _this.hiderHelper = new HiderHelper();
        _this.disablerHelper = new DisablerHelper();
        _this.AlertHelper = new AlertHelper();
        _this._controlRelations = new ControlRelations(_this);
        _this.hiders = [];
        _this.disablers = [];
        _this.alerts = [];
        _this.valueChanges.subscribe(function (value) {
            if (_this._previousValue !== value) {
                _this.fireValueChangeListener(value);
                _this._previousValue = value;
            }
        });
        return _this;
    }
    Object.defineProperty(AfeFormControl.prototype, "controlRelations", {
        get: /**
         * @return {?}
         */
        function () {
            return this._controlRelations;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} param
     * @return {?}
     */
    AfeFormControl.prototype.disable = /**
     * @param {?=} param
     * @return {?}
     */
    function (param) {
        _super.prototype.disable.call(this, param);
        _super.prototype.setValue.call(this, '');
    };
    /**
     * @return {?}
     */
    AfeFormControl.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.hiderHelper.hideControl(this);
    };
    /**
     * @return {?}
     */
    AfeFormControl.prototype.show = /**
     * @return {?}
     */
    function () {
        this.hiderHelper.showControl(this);
    };
    /**
     * @param {?} newHider
     * @return {?}
     */
    AfeFormControl.prototype.setHidingFn = /**
     * @param {?} newHider
     * @return {?}
     */
    function (newHider) {
        this.hiderHelper.setHiderForControl(this, newHider);
    };
    /**
     * @param {?} newCalculator
     * @return {?}
     */
    AfeFormControl.prototype.setCalculatorFn = /**
     * @param {?} newCalculator
     * @return {?}
     */
    function (newCalculator) {
        this.calculator = newCalculator;
    };
    /**
     * @return {?}
     */
    AfeFormControl.prototype.updateCalculatedValue = /**
     * @return {?}
     */
    function () {
        if (this.calculator) {
            var /** @type {?} */ _val = this.calculator.call(ExpressionRunner, {});
            this.setValue(_val);
        }
    };
    /**
     * @return {?}
     */
    AfeFormControl.prototype.clearHidingFns = /**
     * @return {?}
     */
    function () {
        this.hiderHelper.clearHidersForControl(this);
    };
    /**
     * @return {?}
     */
    AfeFormControl.prototype.updateHiddenState = /**
     * @return {?}
     */
    function () {
        this.hiderHelper.evaluateControlHiders(this);
    };
    /**
     * @param {?} newDisabler
     * @return {?}
     */
    AfeFormControl.prototype.setDisablingFn = /**
     * @param {?} newDisabler
     * @return {?}
     */
    function (newDisabler) {
        this.disablerHelper.setDisablerForControl(this, newDisabler);
    };
    /**
     * @return {?}
     */
    AfeFormControl.prototype.clearDisablingFns = /**
     * @return {?}
     */
    function () {
        this.disablerHelper.clearDisablersForControl(this);
    };
    /**
     * @return {?}
     */
    AfeFormControl.prototype.updateDisabledState = /**
     * @return {?}
     */
    function () {
        this.disablerHelper.evaluateControlDisablers(this);
    };
    /**
     * @param {?} newHider
     * @return {?}
     */
    AfeFormControl.prototype.setAlertFn = /**
     * @param {?} newHider
     * @return {?}
     */
    function (newHider) {
        this.AlertHelper.setAlertsForControl(this, newHider);
    };
    /**
     * @return {?}
     */
    AfeFormControl.prototype.clearMessageFns = /**
     * @return {?}
     */
    function () {
        this.AlertHelper.clearAlertsForControl(this);
    };
    /**
     * @return {?}
     */
    AfeFormControl.prototype.updateAlert = /**
     * @return {?}
     */
    function () {
        this.AlertHelper.evaluateControlAlerts(this);
    };
    /**
     * @param {?} func
     * @return {?}
     */
    AfeFormControl.prototype.addValueChangeListener = /**
     * @param {?} func
     * @return {?}
     */
    function (func) {
        this._valueChangeListener = func;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AfeFormControl.prototype.fireValueChangeListener = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this._valueChangeListener && typeof this._valueChangeListener === 'function') {
            this._valueChangeListener(value);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AfeFormControl.prototype.setValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        _super.prototype.setValue.call(this, value);
    };
    return AfeFormControl;
}(FormControl));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImFic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBeUQsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUt4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDbkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUV4RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUVyRixJQUFBO0lBQTZCLDBDQUFXO0lBaUJwQyx3QkFBWSxTQUFlLEVBQUUsU0FBdUUsRUFDaEcsY0FBNkQ7UUFEakUsWUFFSSxrQkFBTSxTQUFTLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxTQVk5Qzt1QkF4QlEsS0FBSzs0QkFPcUIsSUFBSSxXQUFXLEVBQUU7K0JBQ1gsSUFBSSxjQUFjLEVBQUU7NEJBQzFCLElBQUksV0FBVyxFQUFFO1FBSWhELEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQ3BELEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWpCLEtBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBSztZQUM5QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsY0FBYyxLQUFLLEtBQUssQ0FBQyxDQUFD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UTs7OztJQUFSLFVBQVMsS0FBVTtRQUNmLGlCQUFNLFFBQVEsWUFBQyxLQUFLLENBQUMsQ0FBQztLQUN6Qjt5QkExSEw7RUFhNkIsV0FBVyxFQThHdkMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNELE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1Db250cm9sLCBWYWxpZGF0b3JGbiwgQXN5bmNWYWxpZGF0b3JGbiwgQWJzdHJhY3RDb250cm9sT3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnMgfSBmcm9tICcuLi9jaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMnO1xyXG5pbXBvcnQgeyBWYWx1ZUNoYW5nZUxpc3RlbmVyIH0gZnJvbSAnLi92YWx1ZS1jaGFuZ2UubGlzdGVuZXInO1xyXG5pbXBvcnQgeyBDYW5IaWRlLCBIaWRlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcclxuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgRGlzYWJsZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XHJcbmltcG9ydCB7IENhbkdlbmVyYXRlQWxlcnQsIEFsZXJ0IH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWFsZXJ0cy9jYW4tZ2VuZXJhdGUtYWxlcnQnO1xyXG5pbXBvcnQgeyBIaWRlckhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMnO1xyXG5pbXBvcnQgeyBBbGVydEhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1hbGVydHMvYWxlcnQtaGVscGVycyc7XHJcbmltcG9ydCB7IERpc2FibGVySGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvZGlzYWJsZXItaGVscGVyJztcclxuaW1wb3J0IHsgQ2FuQ2FsY3VsYXRlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWNhbGN1bGF0b3JzL2Nhbi1jYWxjdWxhdGUnO1xyXG5pbXBvcnQgeyBFeHByZXNzaW9uUnVubmVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XHJcblxyXG5jbGFzcyBBZmVGb3JtQ29udHJvbCBleHRlbmRzIEZvcm1Db250cm9sIGltcGxlbWVudHMgQ2FuSGlkZSwgQ2FuRGlzYWJsZSwgQ2FuQ2FsY3VsYXRlLCBDYW5HZW5lcmF0ZUFsZXJ0LCBWYWx1ZUNoYW5nZUxpc3RlbmVyIHtcclxuICAgIHByaXZhdGUgX2NvbnRyb2xSZWxhdGlvbnM6IENvbnRyb2xSZWxhdGlvbnM7XHJcbiAgICBwcml2YXRlIF92YWx1ZUNoYW5nZUxpc3RlbmVyOiBhbnk7XHJcbiAgICBwcml2YXRlIF9wcmV2aW91c1ZhbHVlO1xyXG4gICAgcHVibGljIHV1aWQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBwYXRoRnJvbVJvb3Q6IHN0cmluZztcclxuXHJcbiAgICBoaWRkZW4gPSBmYWxzZTtcclxuICAgIGhpZGVyczogSGlkZXJbXTtcclxuICAgIGFsZXJ0OiBzdHJpbmc7XHJcbiAgICBhbGVydHM6IEFsZXJ0W107XHJcbiAgICBjYWxjdWxhdG9yOiBGdW5jdGlvbjtcclxuICAgIGRpc2FibGVyczogRGlzYWJsZXJbXTtcclxuXHJcbiAgICBwcml2YXRlIGhpZGVySGVscGVyOiBIaWRlckhlbHBlciA9IG5ldyBIaWRlckhlbHBlcigpO1xyXG4gICAgcHJpdmF0ZSBkaXNhYmxlckhlbHBlcjogRGlzYWJsZXJIZWxwZXIgPSBuZXcgRGlzYWJsZXJIZWxwZXIoKTtcclxuICAgIHByaXZhdGUgQWxlcnRIZWxwZXI6IEFsZXJ0SGVscGVyID0gbmV3IEFsZXJ0SGVscGVyKCk7XHJcbiAgICBjb25zdHJ1Y3Rvcihmb3JtU3RhdGU/OiBhbnksIHZhbGlkYXRvcj86IFZhbGlkYXRvckZuIHwgVmFsaWRhdG9yRm5bXSB8IEFic3RyYWN0Q29udHJvbE9wdGlvbnMgfCBudWxsLFxyXG4gICAgICAgIGFzeW5jVmFsaWRhdG9yPzogQXN5bmNWYWxpZGF0b3JGbiB8IEFzeW5jVmFsaWRhdG9yRm5bXSB8IG51bGwpIHtcclxuICAgICAgICBzdXBlcihmb3JtU3RhdGUsIHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xyXG4gICAgICAgIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnMgPSBuZXcgQ29udHJvbFJlbGF0aW9ucyh0aGlzKTtcclxuICAgICAgICB0aGlzLmhpZGVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5hbGVydHMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcHJldmlvdXNWYWx1ZSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZVZhbHVlQ2hhbmdlTGlzdGVuZXIodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNvbnRyb2xSZWxhdGlvbnMoKTogQ29udHJvbFJlbGF0aW9ucyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZShwYXJhbT86IHsgb25seVNlbGY/OiBib29sZWFuLCBlbWl0RXZlbnQ/OiBib29sZWFuIH0pIHtcclxuICAgICAgICBzdXBlci5kaXNhYmxlKHBhcmFtKTtcclxuICAgICAgICBzdXBlci5zZXRWYWx1ZSgnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmhpZGVDb250cm9sKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5zaG93Q29udHJvbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRIaWRpbmdGbihuZXdIaWRlcjogSGlkZXIpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLnNldEhpZGVyRm9yQ29udHJvbCh0aGlzLCBuZXdIaWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2FsY3VsYXRvckZuKG5ld0NhbGN1bGF0b3I6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9yID0gbmV3Q2FsY3VsYXRvcjtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDYWxjdWxhdGVkVmFsdWUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FsY3VsYXRvcikge1xyXG4gICAgICAgICAgICBjb25zdCBfdmFsID0gdGhpcy5jYWxjdWxhdG9yLmNhbGwoRXhwcmVzc2lvblJ1bm5lciwge30pO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKF92YWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGVhckhpZGluZ0ZucygpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmNsZWFySGlkZXJzRm9yQ29udHJvbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVIaWRkZW5TdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmV2YWx1YXRlQ29udHJvbEhpZGVycyh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNhYmxpbmdGbihuZXdEaXNhYmxlcjogRGlzYWJsZXIpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLnNldERpc2FibGVyRm9yQ29udHJvbCh0aGlzLCBuZXdEaXNhYmxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJEaXNhYmxpbmdGbnMoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlckhlbHBlci5jbGVhckRpc2FibGVyc0ZvckNvbnRyb2wodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRGlzYWJsZWRTdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLmV2YWx1YXRlQ29udHJvbERpc2FibGVycyh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBbGVydEZuKG5ld0hpZGVyOiBBbGVydCkge1xyXG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuc2V0QWxlcnRzRm9yQ29udHJvbCh0aGlzLCBuZXdIaWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJNZXNzYWdlRm5zKCkge1xyXG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuY2xlYXJBbGVydHNGb3JDb250cm9sKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUFsZXJ0KCkge1xyXG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuZXZhbHVhdGVDb250cm9sQWxlcnRzKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFZhbHVlQ2hhbmdlTGlzdGVuZXIoZnVuYzogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciA9IGZ1bmM7XHJcbiAgICB9XHJcblxyXG4gICAgZmlyZVZhbHVlQ2hhbmdlTGlzdGVuZXIodmFsdWU6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyICYmIHR5cGVvZiB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgc3VwZXIuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IEFmZUZvcm1Db250cm9sIH07XHJcbiJdfQ==