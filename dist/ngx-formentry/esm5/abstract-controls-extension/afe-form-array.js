/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FormArray } from '@angular/forms';
import { ControlRelations } from '../change-tracking/control-relations';
import { HiderHelper } from '../form-entry/control-hiders-disablers/hider-helpers';
import { AlertHelper } from '../form-entry/control-alerts/alert-helpers';
import { DisablerHelper } from '../form-entry/control-hiders-disablers/disabler-helper';
var AfeFormArray = /** @class */ (function (_super) {
    tslib_1.__extends(AfeFormArray, _super);
    function AfeFormArray(controls, validator, asyncValidator) {
        var _this = _super.call(this, controls, validator, asyncValidator) || this;
        _this.hiderHelper = new HiderHelper();
        _this.AlertHelper = new AlertHelper();
        _this.disablerHelper = new DisablerHelper();
        _this._controlRelations = new ControlRelations(_this);
        _this.hiders = [];
        _this.alerts = [];
        _this.disablers = [];
        _this.valueChanges.subscribe(function (value) {
            if (_this._previousValue !== value) {
                _this.fireValueChangeListener(value);
                _this._previousValue = value;
            }
        });
        return _this;
    }
    Object.defineProperty(AfeFormArray.prototype, "uuid", {
        get: /**
         * @return {?}
         */
        function () {
            return this._uuid;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._uuid = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AfeFormArray.prototype, "controlRelations", {
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
     * @return {?}
     */
    AfeFormArray.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.hiderHelper.hideControl(this);
    };
    /**
     * @return {?}
     */
    AfeFormArray.prototype.show = /**
     * @return {?}
     */
    function () {
        this.hiderHelper.showControl(this);
    };
    /**
     * @param {?=} param
     * @return {?}
     */
    AfeFormArray.prototype.disable = /**
     * @param {?=} param
     * @return {?}
     */
    function (param) {
        _super.prototype.disable.call(this, param);
        _super.prototype.setValue.call(this, []);
    };
    /**
     * @param {?} newHider
     * @return {?}
     */
    AfeFormArray.prototype.setHidingFn = /**
     * @param {?} newHider
     * @return {?}
     */
    function (newHider) {
        this.hiderHelper.setHiderForControl(this, newHider);
    };
    /**
     * @return {?}
     */
    AfeFormArray.prototype.clearHidingFns = /**
     * @return {?}
     */
    function () {
        this.hiderHelper.clearHidersForControl(this);
    };
    /**
     * @return {?}
     */
    AfeFormArray.prototype.updateHiddenState = /**
     * @return {?}
     */
    function () {
        this.hiderHelper.evaluateControlHiders(this);
    };
    /**
     * @param {?} newDisabler
     * @return {?}
     */
    AfeFormArray.prototype.setDisablingFn = /**
     * @param {?} newDisabler
     * @return {?}
     */
    function (newDisabler) {
        this.disablerHelper.setDisablerForControl(this, newDisabler);
    };
    /**
     * @return {?}
     */
    AfeFormArray.prototype.clearDisablingFns = /**
     * @return {?}
     */
    function () {
        this.disablerHelper.clearDisablersForControl(this);
    };
    /**
     * @return {?}
     */
    AfeFormArray.prototype.updateDisabledState = /**
     * @return {?}
     */
    function () {
        this.disablerHelper.evaluateControlDisablers(this);
    };
    /**
     * @param {?} newHider
     * @return {?}
     */
    AfeFormArray.prototype.setAlertFn = /**
     * @param {?} newHider
     * @return {?}
     */
    function (newHider) {
        this.AlertHelper.setAlertsForControl(this, newHider);
    };
    /**
     * @return {?}
     */
    AfeFormArray.prototype.clearMessageFns = /**
     * @return {?}
     */
    function () {
        this.AlertHelper.clearAlertsForControl(this);
    };
    /**
     * @return {?}
     */
    AfeFormArray.prototype.updateAlert = /**
     * @return {?}
     */
    function () {
        this.AlertHelper.evaluateControlAlerts(this);
    };
    /**
     * @param {?} func
     * @return {?}
     */
    AfeFormArray.prototype.addValueChangeListener = /**
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
    AfeFormArray.prototype.fireValueChangeListener = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.alerts.length > 0) {
            this.updateAlert();
        }
        if (this._valueChangeListener && typeof this._valueChangeListener === 'function') {
            this._valueChangeListener(value);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AfeFormArray.prototype.setValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        _super.prototype.setValue.call(this, value);
    };
    return AfeFormArray;
}(FormArray));
export { AfeFormArray };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tYXJyYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJhYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tYXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFrRCxNQUFNLGdCQUFnQixDQUFDO0FBRTNGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBS3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNuRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBR3hGO0lBQWtDLHdDQUFTO0lBbUJ2QyxzQkFBWSxRQUEyQixFQUFFLFNBQXVCLEVBQUUsY0FBaUM7UUFBbkcsWUFDSSxrQkFBTSxRQUFRLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxTQVk3QztRQWpCTyxpQkFBVyxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQzdDLGlCQUFXLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFDN0Msb0JBQWMsR0FBbUIsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUkxRCxLQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUNwRCxLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVwQixLQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQUs7WUFDaEMsSUFBSSxLQUFJLENBQUMsY0FBYyxLQUFLLEtBQUssRUFBRTtnQkFDakMsS0FBSSxDQUFDLHVCQUF1QixDQUFDLEtB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QUFRLFlBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVMLG1CQUFDO0FBQUQsQ0FBQyxBQS9HRCxDQUFrQyxTQUFTLEdBK0cxQzs7Ozs7OztJQTlHRyx5Q0FBNEM7Ozs7O0lBQzVDLDRDQUFrQzs7Ozs7SUFDbEMsc0NBQXVCOzs7OztJQUN2Qiw2QkFBc0I7O0lBQ3RCLG9DQUE0Qjs7SUFFNUIsOEJBQWM7O0lBQ2QsOEJBQWdCOztJQUVoQiw2QkFBYzs7SUFDZCw4QkFBZ0I7O0lBRWhCLGlDQUFzQjs7Ozs7SUFFdEIsbUNBQXFEOzs7OztJQUNyRCxtQ0FBcUQ7Ozs7O0lBQ3JELHNDQUE4RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1BcnJheSwgVmFsaWRhdG9yRm4sIEFzeW5jVmFsaWRhdG9yRm4sIEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9ucyB9IGZyb20gJy4uL2NoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9ucyc7XG5pbXBvcnQgeyBWYWx1ZUNoYW5nZUxpc3RlbmVyIH0gZnJvbSAnLi92YWx1ZS1jaGFuZ2UubGlzdGVuZXInO1xuaW1wb3J0IHsgQ2FuSGlkZSwgSGlkZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4taGlkZSc7XG5pbXBvcnQgeyBDYW5HZW5lcmF0ZUFsZXJ0LCBBbGVydCB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1hbGVydHMvY2FuLWdlbmVyYXRlLWFsZXJ0JztcbmltcG9ydCB7IENhbkRpc2FibGUsIERpc2FibGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWRpc2FibGUnO1xuaW1wb3J0IHsgSGlkZXJIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9oaWRlci1oZWxwZXJzJztcbmltcG9ydCB7IEFsZXJ0SGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWFsZXJ0cy9hbGVydC1oZWxwZXJzJztcbmltcG9ydCB7IERpc2FibGVySGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvZGlzYWJsZXItaGVscGVyJztcblxuXG5leHBvcnQgY2xhc3MgQWZlRm9ybUFycmF5IGV4dGVuZHMgRm9ybUFycmF5IGltcGxlbWVudHMgQ2FuSGlkZSwgQ2FuRGlzYWJsZSwgQ2FuR2VuZXJhdGVBbGVydCwgVmFsdWVDaGFuZ2VMaXN0ZW5lciB7XG4gICAgcHJpdmF0ZSBfY29udHJvbFJlbGF0aW9uczogQ29udHJvbFJlbGF0aW9ucztcbiAgICBwcml2YXRlIF92YWx1ZUNoYW5nZUxpc3RlbmVyOiBhbnk7XG4gICAgcHJpdmF0ZSBfcHJldmlvdXNWYWx1ZTtcbiAgICBwcml2YXRlIF91dWlkOiBzdHJpbmc7XG4gICAgcHVibGljIHBhdGhGcm9tUm9vdDogc3RyaW5nO1xuXG4gICAgaGlkZGVuOiBmYWxzZTtcbiAgICBoaWRlcnM6IEhpZGVyW107XG5cbiAgICBhbGVydDogc3RyaW5nO1xuICAgIGFsZXJ0czogQWxlcnRbXTtcblxuICAgIGRpc2FibGVyczogRGlzYWJsZXJbXTtcblxuICAgIHByaXZhdGUgaGlkZXJIZWxwZXI6IEhpZGVySGVscGVyID0gbmV3IEhpZGVySGVscGVyKCk7XG4gICAgcHJpdmF0ZSBBbGVydEhlbHBlcjogQWxlcnRIZWxwZXIgPSBuZXcgQWxlcnRIZWxwZXIoKTtcbiAgICBwcml2YXRlIGRpc2FibGVySGVscGVyOiBEaXNhYmxlckhlbHBlciA9IG5ldyBEaXNhYmxlckhlbHBlcigpO1xuXG4gICAgY29uc3RydWN0b3IoY29udHJvbHM6IEFic3RyYWN0Q29udHJvbFtdLCB2YWxpZGF0b3I/OiBWYWxpZGF0b3JGbiwgYXN5bmNWYWxpZGF0b3I/OiBBc3luY1ZhbGlkYXRvckZuKSB7XG4gICAgICAgIHN1cGVyKGNvbnRyb2xzLCB2YWxpZGF0b3IsIGFzeW5jVmFsaWRhdG9yKTtcbiAgICAgICAgdGhpcy5fY29udHJvbFJlbGF0aW9ucyA9IG5ldyBDb250cm9sUmVsYXRpb25zKHRoaXMpO1xuICAgICAgICB0aGlzLmhpZGVycyA9IFtdO1xuICAgICAgICB0aGlzLmFsZXJ0cyA9IFtdO1xuICAgICAgICB0aGlzLmRpc2FibGVycyA9IFtdO1xuXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fcHJldmlvdXNWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZmlyZVZhbHVlQ2hhbmdlTGlzdGVuZXIodmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IHV1aWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3V1aWQ7XG4gICAgfVxuICAgIHNldCB1dWlkKHZhbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3V1aWQgPSB2YWw7XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRyb2xSZWxhdGlvbnMoKTogQ29udHJvbFJlbGF0aW9ucyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250cm9sUmVsYXRpb25zO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuaGlkZUNvbnRyb2wodGhpcyk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5zaG93Q29udHJvbCh0aGlzKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlKHBhcmFtPzogeyBvbmx5U2VsZj86IGJvb2xlYW4sIGVtaXRFdmVudD86IGJvb2xlYW4gfSkge1xuICAgICAgICBzdXBlci5kaXNhYmxlKHBhcmFtKTtcbiAgICAgICAgc3VwZXIuc2V0VmFsdWUoW10pO1xuICAgIH1cblxuICAgIHNldEhpZGluZ0ZuKG5ld0hpZGVyOiBIaWRlcikge1xuICAgICAgICB0aGlzLmhpZGVySGVscGVyLnNldEhpZGVyRm9yQ29udHJvbCh0aGlzLCBuZXdIaWRlcik7XG4gICAgfVxuXG4gICAgY2xlYXJIaWRpbmdGbnMoKSB7XG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuY2xlYXJIaWRlcnNGb3JDb250cm9sKHRoaXMpO1xuICAgIH1cblxuICAgIHVwZGF0ZUhpZGRlblN0YXRlKCkge1xuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmV2YWx1YXRlQ29udHJvbEhpZGVycyh0aGlzKTtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxpbmdGbihuZXdEaXNhYmxlcjogRGlzYWJsZXIpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlckhlbHBlci5zZXREaXNhYmxlckZvckNvbnRyb2wodGhpcywgbmV3RGlzYWJsZXIpO1xuICAgIH1cblxuICAgIGNsZWFyRGlzYWJsaW5nRm5zKCkge1xuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLmNsZWFyRGlzYWJsZXJzRm9yQ29udHJvbCh0aGlzKTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaXNhYmxlZFN0YXRlKCkge1xuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLmV2YWx1YXRlQ29udHJvbERpc2FibGVycyh0aGlzKTtcbiAgICB9XG5cbiAgICBzZXRBbGVydEZuKG5ld0hpZGVyOiBBbGVydCkge1xuICAgICAgICB0aGlzLkFsZXJ0SGVscGVyLnNldEFsZXJ0c0ZvckNvbnRyb2wodGhpcywgbmV3SGlkZXIpO1xuICAgIH1cblxuICAgIGNsZWFyTWVzc2FnZUZucygpIHtcbiAgICAgICAgdGhpcy5BbGVydEhlbHBlci5jbGVhckFsZXJ0c0ZvckNvbnRyb2wodGhpcyk7XG4gICAgfVxuXG4gICAgIHVwZGF0ZUFsZXJ0KCkge1xuICAgICAgICB0aGlzLkFsZXJ0SGVscGVyLmV2YWx1YXRlQ29udHJvbEFsZXJ0cyh0aGlzKTtcbiAgICB9XG5cbiAgICBhZGRWYWx1ZUNoYW5nZUxpc3RlbmVyKGZ1bmM6IGFueSkge1xuICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciA9IGZ1bmM7XG4gICAgfVxuXG4gICAgZmlyZVZhbHVlQ2hhbmdlTGlzdGVuZXIodmFsdWU6IGFueSkge1xuICAgICAgaWYgKHRoaXMuYWxlcnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy51cGRhdGVBbGVydCgpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIgJiYgdHlwZW9mIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0VmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICBzdXBlci5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuXG59XG4iXX0=