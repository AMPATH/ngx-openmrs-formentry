/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            /** @type {?} */
            var _val = this.calculator.call(ExpressionRunner, {});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImFic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBeUQsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUt4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDbkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUV4RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUVyRjtJQUE2QiwwQ0FBVztJQWlCcEMsd0JBQVksU0FBZSxFQUFFLFNBQXVFLEVBQ2hHLGNBQTZEO1FBRGpFLFlBRUksa0JBQU0sU0FBUyxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsU0FZOUM7UUF4QkQsWUFBTSxHQUFHLEtBQUssQ0FBQztRQU9QLGlCQUFXLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFDN0Msb0JBQWMsR0FBbUIsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUN0RCxpQkFBVyxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBSWpELEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQ3BELEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWpCLEtBQUksQ0FBQyxZQUFZLENBQUMsU0FBUzs7OztRQUFDLFVBQUMs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QUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLElBQUksT0FBTyxJQUFJLENBQUMsb0JBQW9CLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMvRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsaUNBQVE7Ozs7SUFBUixVQUFTLEtBQVU7UUFDZixpQkFBTSxRQUFRLFlBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQTlHRCxDQUE2QixXQUFXLEdBOEd2Qzs7Ozs7O0lBN0dHLDJDQUE0Qzs7Ozs7SUFDNUMsOENBQWtDOzs7OztJQUNsQyx3Q0FBdUI7O0lBQ3ZCLDhCQUFvQjs7SUFDcEIsc0NBQTRCOztJQUU1QixnQ0FBZTs7SUFDZixnQ0FBZ0I7O0lBQ2hCLCtCQUFjOztJQUNkLGdDQUFnQjs7SUFDaEIsb0NBQXFCOztJQUNyQixtQ0FBc0I7Ozs7O0lBRXRCLHFDQUFxRDs7Ozs7SUFDckQsd0NBQThEOzs7OztJQUM5RCxxQ0FBcUQ7O0FBK0Z6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQ29udHJvbCwgVmFsaWRhdG9yRm4sIEFzeW5jVmFsaWRhdG9yRm4sIEFic3RyYWN0Q29udHJvbE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb25zIH0gZnJvbSAnLi4vY2hhbmdlLXRyYWNraW5nL2NvbnRyb2wtcmVsYXRpb25zJztcclxuaW1wb3J0IHsgVmFsdWVDaGFuZ2VMaXN0ZW5lciB9IGZyb20gJy4vdmFsdWUtY2hhbmdlLmxpc3RlbmVyJztcclxuaW1wb3J0IHsgQ2FuSGlkZSwgSGlkZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4taGlkZSc7XHJcbmltcG9ydCB7IENhbkRpc2FibGUsIERpc2FibGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWRpc2FibGUnO1xyXG5pbXBvcnQgeyBDYW5HZW5lcmF0ZUFsZXJ0LCBBbGVydCB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1hbGVydHMvY2FuLWdlbmVyYXRlLWFsZXJ0JztcclxuaW1wb3J0IHsgSGlkZXJIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9oaWRlci1oZWxwZXJzJztcclxuaW1wb3J0IHsgQWxlcnRIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2FsZXJ0LWhlbHBlcnMnO1xyXG5pbXBvcnQgeyBEaXNhYmxlckhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Rpc2FibGVyLWhlbHBlcic7XHJcbmltcG9ydCB7IENhbkNhbGN1bGF0ZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1jYWxjdWxhdG9ycy9jYW4tY2FsY3VsYXRlJztcclxuaW1wb3J0IHsgRXhwcmVzc2lvblJ1bm5lciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xyXG5cclxuY2xhc3MgQWZlRm9ybUNvbnRyb2wgZXh0ZW5kcyBGb3JtQ29udHJvbCBpbXBsZW1lbnRzIENhbkhpZGUsIENhbkRpc2FibGUsIENhbkNhbGN1bGF0ZSwgQ2FuR2VuZXJhdGVBbGVydCwgVmFsdWVDaGFuZ2VMaXN0ZW5lciB7XHJcbiAgICBwcml2YXRlIF9jb250cm9sUmVsYXRpb25zOiBDb250cm9sUmVsYXRpb25zO1xyXG4gICAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VMaXN0ZW5lcjogYW55O1xyXG4gICAgcHJpdmF0ZSBfcHJldmlvdXNWYWx1ZTtcclxuICAgIHB1YmxpYyB1dWlkOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcGF0aEZyb21Sb290OiBzdHJpbmc7XHJcblxyXG4gICAgaGlkZGVuID0gZmFsc2U7XHJcbiAgICBoaWRlcnM6IEhpZGVyW107XHJcbiAgICBhbGVydDogc3RyaW5nO1xyXG4gICAgYWxlcnRzOiBBbGVydFtdO1xyXG4gICAgY2FsY3VsYXRvcjogRnVuY3Rpb247XHJcbiAgICBkaXNhYmxlcnM6IERpc2FibGVyW107XHJcblxyXG4gICAgcHJpdmF0ZSBoaWRlckhlbHBlcjogSGlkZXJIZWxwZXIgPSBuZXcgSGlkZXJIZWxwZXIoKTtcclxuICAgIHByaXZhdGUgZGlzYWJsZXJIZWxwZXI6IERpc2FibGVySGVscGVyID0gbmV3IERpc2FibGVySGVscGVyKCk7XHJcbiAgICBwcml2YXRlIEFsZXJ0SGVscGVyOiBBbGVydEhlbHBlciA9IG5ldyBBbGVydEhlbHBlcigpO1xyXG4gICAgY29uc3RydWN0b3IoZm9ybVN0YXRlPzogYW55LCB2YWxpZGF0b3I/OiBWYWxpZGF0b3JGbiB8IFZhbGlkYXRvckZuW10gfCBBYnN0cmFjdENvbnRyb2xPcHRpb25zIHwgbnVsbCxcclxuICAgICAgICBhc3luY1ZhbGlkYXRvcj86IEFzeW5jVmFsaWRhdG9yRm4gfCBBc3luY1ZhbGlkYXRvckZuW10gfCBudWxsKSB7XHJcbiAgICAgICAgc3VwZXIoZm9ybVN0YXRlLCB2YWxpZGF0b3IsIGFzeW5jVmFsaWRhdG9yKTtcclxuICAgICAgICB0aGlzLl9jb250cm9sUmVsYXRpb25zID0gbmV3IENvbnRyb2xSZWxhdGlvbnModGhpcyk7XHJcbiAgICAgICAgdGhpcy5oaWRlcnMgPSBbXTtcclxuICAgICAgICB0aGlzLmRpc2FibGVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuYWxlcnRzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ByZXZpb3VzVmFsdWUgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVWYWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb250cm9sUmVsYXRpb25zKCk6IENvbnRyb2xSZWxhdGlvbnMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb250cm9sUmVsYXRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGUocGFyYW0/OiB7IG9ubHlTZWxmPzogYm9vbGVhbiwgZW1pdEV2ZW50PzogYm9vbGVhbiB9KSB7XHJcbiAgICAgICAgc3VwZXIuZGlzYWJsZShwYXJhbSk7XHJcbiAgICAgICAgc3VwZXIuc2V0VmFsdWUoJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5oaWRlQ29udHJvbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuc2hvd0NvbnRyb2wodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SGlkaW5nRm4obmV3SGlkZXI6IEhpZGVyKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5zZXRIaWRlckZvckNvbnRyb2wodGhpcywgbmV3SGlkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENhbGN1bGF0b3JGbihuZXdDYWxjdWxhdG9yOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRvciA9IG5ld0NhbGN1bGF0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ2FsY3VsYXRlZFZhbHVlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNhbGN1bGF0b3IpIHtcclxuICAgICAgICAgICAgY29uc3QgX3ZhbCA9IHRoaXMuY2FsY3VsYXRvci5jYWxsKEV4cHJlc3Npb25SdW5uZXIsIHt9KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShfdmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJIaWRpbmdGbnMoKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5jbGVhckhpZGVyc0ZvckNvbnRyb2wodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlSGlkZGVuU3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5ldmFsdWF0ZUNvbnRyb2xIaWRlcnModGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsaW5nRm4obmV3RGlzYWJsZXI6IERpc2FibGVyKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlckhlbHBlci5zZXREaXNhYmxlckZvckNvbnRyb2wodGhpcywgbmV3RGlzYWJsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyRGlzYWJsaW5nRm5zKCkge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuY2xlYXJEaXNhYmxlcnNGb3JDb250cm9sKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZURpc2FibGVkU3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlckhlbHBlci5ldmFsdWF0ZUNvbnRyb2xEaXNhYmxlcnModGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QWxlcnRGbihuZXdIaWRlcjogQWxlcnQpIHtcclxuICAgICAgICB0aGlzLkFsZXJ0SGVscGVyLnNldEFsZXJ0c0ZvckNvbnRyb2wodGhpcywgbmV3SGlkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyTWVzc2FnZUZucygpIHtcclxuICAgICAgICB0aGlzLkFsZXJ0SGVscGVyLmNsZWFyQWxlcnRzRm9yQ29udHJvbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVBbGVydCgpIHtcclxuICAgICAgICB0aGlzLkFsZXJ0SGVscGVyLmV2YWx1YXRlQ29udHJvbEFsZXJ0cyh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRWYWx1ZUNoYW5nZUxpc3RlbmVyKGZ1bmM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIgPSBmdW5jO1xyXG4gICAgfVxyXG5cclxuICAgIGZpcmVWYWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciAmJiB0eXBlb2YgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgICAgIHN1cGVyLnNldFZhbHVlKHZhbHVlKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBBZmVGb3JtQ29udHJvbCB9O1xyXG4iXX0=