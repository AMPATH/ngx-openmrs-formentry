/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        _this.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (_this._previousValue !== value) {
                _this.fireValueChangeListener(value);
                _this._previousValue = value;
            }
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tYXJyYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJhYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tYXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFrRCxNQUFNLGdCQUFnQixDQUFDO0FBRTNGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBS3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNuRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBR3hGO0lBQWtDLHdDQUFTO0lBbUJ2QyxzQkFBWSxRQUEyQixFQUFFLFNBQXVCLEVBQUUsY0FBaUM7UUFBbkcsWUFDSSxrQkFBTSxRQUFRLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxTQVk3QztRQWpCTyxpQkFBVyxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQzdDLGlCQUFXLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFDN0Msb0JBQWMsR0FBbUIsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUkxRCxLQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUNwRCxLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVwQixLQUFJLENBQUMsWUFBWSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLEtBQUs7WUFDaEMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxL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QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUM7SUFDSCxDQUFDOzs7OztJQUVELCtCQUFROzs7O0lBQVIsVUFBUyxLQUFVO1FBQ2YsaUJBQU0sUUFBUSxZQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTCxtQkFBQztBQUFELENBQUMsQUEvR0QsQ0FBa0MsU0FBUyxHQStHMUM7Ozs7Ozs7SUE5R0cseUNBQTRDOzs7OztJQUM1Qyw0Q0FBa0M7Ozs7O0lBQ2xDLHNDQUF1Qjs7Ozs7SUFDdkIsNkJBQXNCOztJQUN0QixvQ0FBNEI7O0lBRTVCLDhCQUFjOztJQUNkLDhCQUFnQjs7SUFFaEIsNkJBQWM7O0lBQ2QsOEJBQWdCOztJQUVoQixpQ0FBc0I7Ozs7O0lBRXRCLG1DQUFxRDs7Ozs7SUFDckQsbUNBQXFEOzs7OztJQUNyRCxzQ0FBOEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQXJyYXksIFZhbGlkYXRvckZuLCBBc3luY1ZhbGlkYXRvckZuLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb25zIH0gZnJvbSAnLi4vY2hhbmdlLXRyYWNraW5nL2NvbnRyb2wtcmVsYXRpb25zJztcclxuaW1wb3J0IHsgVmFsdWVDaGFuZ2VMaXN0ZW5lciB9IGZyb20gJy4vdmFsdWUtY2hhbmdlLmxpc3RlbmVyJztcclxuaW1wb3J0IHsgQ2FuSGlkZSwgSGlkZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4taGlkZSc7XHJcbmltcG9ydCB7IENhbkdlbmVyYXRlQWxlcnQsIEFsZXJ0IH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWFsZXJ0cy9jYW4tZ2VuZXJhdGUtYWxlcnQnO1xyXG5pbXBvcnQgeyBDYW5EaXNhYmxlLCBEaXNhYmxlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1kaXNhYmxlJztcclxuaW1wb3J0IHsgSGlkZXJIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9oaWRlci1oZWxwZXJzJztcclxuaW1wb3J0IHsgQWxlcnRIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2FsZXJ0LWhlbHBlcnMnO1xyXG5pbXBvcnQgeyBEaXNhYmxlckhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Rpc2FibGVyLWhlbHBlcic7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEFmZUZvcm1BcnJheSBleHRlbmRzIEZvcm1BcnJheSBpbXBsZW1lbnRzIENhbkhpZGUsIENhbkRpc2FibGUsIENhbkdlbmVyYXRlQWxlcnQsIFZhbHVlQ2hhbmdlTGlzdGVuZXIge1xyXG4gICAgcHJpdmF0ZSBfY29udHJvbFJlbGF0aW9uczogQ29udHJvbFJlbGF0aW9ucztcclxuICAgIHByaXZhdGUgX3ZhbHVlQ2hhbmdlTGlzdGVuZXI6IGFueTtcclxuICAgIHByaXZhdGUgX3ByZXZpb3VzVmFsdWU7XHJcbiAgICBwcml2YXRlIF91dWlkOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcGF0aEZyb21Sb290OiBzdHJpbmc7XHJcblxyXG4gICAgaGlkZGVuOiBmYWxzZTtcclxuICAgIGhpZGVyczogSGlkZXJbXTtcclxuXHJcbiAgICBhbGVydDogc3RyaW5nO1xyXG4gICAgYWxlcnRzOiBBbGVydFtdO1xyXG5cclxuICAgIGRpc2FibGVyczogRGlzYWJsZXJbXTtcclxuXHJcbiAgICBwcml2YXRlIGhpZGVySGVscGVyOiBIaWRlckhlbHBlciA9IG5ldyBIaWRlckhlbHBlcigpO1xyXG4gICAgcHJpdmF0ZSBBbGVydEhlbHBlcjogQWxlcnRIZWxwZXIgPSBuZXcgQWxlcnRIZWxwZXIoKTtcclxuICAgIHByaXZhdGUgZGlzYWJsZXJIZWxwZXI6IERpc2FibGVySGVscGVyID0gbmV3IERpc2FibGVySGVscGVyKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29udHJvbHM6IEFic3RyYWN0Q29udHJvbFtdLCB2YWxpZGF0b3I/OiBWYWxpZGF0b3JGbiwgYXN5bmNWYWxpZGF0b3I/OiBBc3luY1ZhbGlkYXRvckZuKSB7XHJcbiAgICAgICAgc3VwZXIoY29udHJvbHMsIHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xyXG4gICAgICAgIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnMgPSBuZXcgQ29udHJvbFJlbGF0aW9ucyh0aGlzKTtcclxuICAgICAgICB0aGlzLmhpZGVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuYWxlcnRzID0gW107XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlcnMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuX3ByZXZpb3VzVmFsdWUgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyZVZhbHVlQ2hhbmdlTGlzdGVuZXIodmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9wcmV2aW91c1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHV1aWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXVpZDtcclxuICAgIH1cclxuICAgIHNldCB1dWlkKHZhbDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fdXVpZCA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29udHJvbFJlbGF0aW9ucygpOiBDb250cm9sUmVsYXRpb25zIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29udHJvbFJlbGF0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuaGlkZUNvbnRyb2wodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLnNob3dDb250cm9sKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGUocGFyYW0/OiB7IG9ubHlTZWxmPzogYm9vbGVhbiwgZW1pdEV2ZW50PzogYm9vbGVhbiB9KSB7XHJcbiAgICAgICAgc3VwZXIuZGlzYWJsZShwYXJhbSk7XHJcbiAgICAgICAgc3VwZXIuc2V0VmFsdWUoW10pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEhpZGluZ0ZuKG5ld0hpZGVyOiBIaWRlcikge1xyXG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuc2V0SGlkZXJGb3JDb250cm9sKHRoaXMsIG5ld0hpZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckhpZGluZ0ZucygpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmNsZWFySGlkZXJzRm9yQ29udHJvbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVIaWRkZW5TdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmV2YWx1YXRlQ29udHJvbEhpZGVycyh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNhYmxpbmdGbihuZXdEaXNhYmxlcjogRGlzYWJsZXIpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLnNldERpc2FibGVyRm9yQ29udHJvbCh0aGlzLCBuZXdEaXNhYmxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJEaXNhYmxpbmdGbnMoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlckhlbHBlci5jbGVhckRpc2FibGVyc0ZvckNvbnRyb2wodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRGlzYWJsZWRTdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLmV2YWx1YXRlQ29udHJvbERpc2FibGVycyh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBbGVydEZuKG5ld0hpZGVyOiBBbGVydCkge1xyXG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuc2V0QWxlcnRzRm9yQ29udHJvbCh0aGlzLCBuZXdIaWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJNZXNzYWdlRm5zKCkge1xyXG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuY2xlYXJBbGVydHNGb3JDb250cm9sKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgICB1cGRhdGVBbGVydCgpIHtcclxuICAgICAgICB0aGlzLkFsZXJ0SGVscGVyLmV2YWx1YXRlQ29udHJvbEFsZXJ0cyh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRWYWx1ZUNoYW5nZUxpc3RlbmVyKGZ1bmM6IGFueSkge1xyXG4gICAgICB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyID0gZnVuYztcclxuICAgIH1cclxuXHJcbiAgICBmaXJlVmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZTogYW55KSB7XHJcbiAgICAgIGlmICh0aGlzLmFsZXJ0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVBbGVydCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyICYmIHR5cGVvZiB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgc3VwZXIuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=