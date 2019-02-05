/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FormControl } from '@angular/forms';
import { ControlRelations } from '../change-tracking/control-relations';
import { HiderHelper } from '../form-entry/control-hiders-disablers/hider-helpers';
import { AlertHelper } from '../form-entry/control-alerts/alert-helpers';
import { DisablerHelper } from '../form-entry/control-hiders-disablers/disabler-helper';
import { ExpressionRunner } from '../form-entry/expression-runner/expression-runner';
import { Subject } from 'rxjs';
var AfeFormControl = /** @class */ (function (_super) {
    tslib_1.__extends(AfeFormControl, _super);
    function AfeFormControl(formState, validator, asyncValidator) {
        var _this = _super.call(this, formState, validator, asyncValidator) || this;
        _this.hiddenStatusChanges = new Subject();
        _this.disabledStatusChanges = new Subject();
        _this.touchedStatusChanges = new Subject();
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
        this.disabledStatusChanges.next(true);
    };
    /**
     * @param {?=} param
     * @return {?}
     */
    AfeFormControl.prototype.enable = /**
     * @param {?=} param
     * @return {?}
     */
    function (param) {
        _super.prototype.enable.call(this, param);
        this.disabledStatusChanges.next(false);
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
     * @param {?=} opts
     * @return {?}
     */
    AfeFormControl.prototype.markAsTouched = /**
     * @param {?=} opts
     * @return {?}
     */
    function (opts) {
        if (opts === void 0) { opts = {}; }
        _super.prototype.markAsTouched.call(this, opts);
        this.touchedStatusChanges.next(true);
    };
    /**
     * @param {?=} opts
     * @return {?}
     */
    AfeFormControl.prototype.markAsUntouched = /**
     * @param {?=} opts
     * @return {?}
     */
    function (opts) {
        if (opts === void 0) { opts = {}; }
        _super.prototype.markAsUntouched.call(this, opts);
        this.touchedStatusChanges.next(false);
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
    AfeFormControl.prototype.hiddenStatusChanges;
    /** @type {?} */
    AfeFormControl.prototype.disabledStatusChanges;
    /** @type {?} */
    AfeFormControl.prototype.touchedStatusChanges;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImFic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBeUQsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUt4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDbkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUV4RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUNyRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRy9CO0lBQTZCLDBDQUFXO0lBb0JwQyx3QkFBWSxTQUFlLEVBQUUsU0FBdUUsRUFDaEcsY0FBNkQ7UUFEakUsWUFFSSxrQkFBTSxTQUFTLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxTQVk5QztRQTVCTSx5QkFBbUIsR0FBcUIsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQUMvRCwyQkFBcUIsR0FBcUIsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQUNqRSwwQkFBb0IsR0FBcUIsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQUV2RSxZQUFNLEdBQUcsS0FBSyxDQUFDO1FBT1AsaUJBQVcsR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUM3QyxvQkFBYyxHQUFtQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ3RELGlCQUFXLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFJakQsS0FBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksZ0JBQWdCLENBQUMsS0FBSSxDQUFD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QUQsQ0FBQyxBQWpJRCxDQUE2QixXQUFXLEdBaUl2Qzs7Ozs7O0lBaElHLDJDQUE0Qzs7Ozs7SUFDNUMsOENBQWtDOzs7OztJQUNsQyx3Q0FBdUI7O0lBQ3ZCLDhCQUFvQjs7SUFDcEIsc0NBQTRCOztJQUM1Qiw2Q0FBc0U7O0lBQ3RFLCtDQUF3RTs7SUFDeEUsOENBQXVFOztJQUV2RSxnQ0FBZTs7SUFDZixnQ0FBZ0I7O0lBQ2hCLCtCQUFjOztJQUNkLGdDQUFnQjs7SUFDaEIsb0NBQXFCOztJQUNyQixtQ0FBc0I7Ozs7O0lBRXRCLHFDQUFxRDs7Ozs7SUFDckQsd0NBQThEOzs7OztJQUM5RCxxQ0FBcUQ7O0FBK0d6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQ29udHJvbCwgVmFsaWRhdG9yRm4sIEFzeW5jVmFsaWRhdG9yRm4sIEFic3RyYWN0Q29udHJvbE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnMgfSBmcm9tICcuLi9jaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMnO1xuaW1wb3J0IHsgVmFsdWVDaGFuZ2VMaXN0ZW5lciB9IGZyb20gJy4vdmFsdWUtY2hhbmdlLmxpc3RlbmVyJztcbmltcG9ydCB7IENhbkhpZGUsIEhpZGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWhpZGUnO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgRGlzYWJsZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XG5pbXBvcnQgeyBDYW5HZW5lcmF0ZUFsZXJ0LCBBbGVydCB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1hbGVydHMvY2FuLWdlbmVyYXRlLWFsZXJ0JztcbmltcG9ydCB7IEhpZGVySGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvaGlkZXItaGVscGVycyc7XG5pbXBvcnQgeyBBbGVydEhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1hbGVydHMvYWxlcnQtaGVscGVycyc7XG5pbXBvcnQgeyBEaXNhYmxlckhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Rpc2FibGVyLWhlbHBlcic7XG5pbXBvcnQgeyBDYW5DYWxjdWxhdGUgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtY2FsY3VsYXRvcnMvY2FuLWNhbGN1bGF0ZSc7XG5pbXBvcnQgeyBFeHByZXNzaW9uUnVubmVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUb3VjaGFibGUgfSBmcm9tICcuL3RvdWNoYWJsZSc7XG5cbmNsYXNzIEFmZUZvcm1Db250cm9sIGV4dGVuZHMgRm9ybUNvbnRyb2wgaW1wbGVtZW50cyBDYW5IaWRlLCBDYW5EaXNhYmxlLCBUb3VjaGFibGUsIENhbkNhbGN1bGF0ZSwgQ2FuR2VuZXJhdGVBbGVydCwgVmFsdWVDaGFuZ2VMaXN0ZW5lciB7XG4gICAgcHJpdmF0ZSBfY29udHJvbFJlbGF0aW9uczogQ29udHJvbFJlbGF0aW9ucztcbiAgICBwcml2YXRlIF92YWx1ZUNoYW5nZUxpc3RlbmVyOiBhbnk7XG4gICAgcHJpdmF0ZSBfcHJldmlvdXNWYWx1ZTtcbiAgICBwdWJsaWMgdXVpZDogc3RyaW5nO1xuICAgIHB1YmxpYyBwYXRoRnJvbVJvb3Q6IHN0cmluZztcbiAgICBwdWJsaWMgaGlkZGVuU3RhdHVzQ2hhbmdlczogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gICAgcHVibGljIGRpc2FibGVkU3RhdHVzQ2hhbmdlczogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gICAgcHVibGljIHRvdWNoZWRTdGF0dXNDaGFuZ2VzOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAgIGhpZGRlbiA9IGZhbHNlO1xuICAgIGhpZGVyczogSGlkZXJbXTtcbiAgICBhbGVydDogc3RyaW5nO1xuICAgIGFsZXJ0czogQWxlcnRbXTtcbiAgICBjYWxjdWxhdG9yOiBGdW5jdGlvbjtcbiAgICBkaXNhYmxlcnM6IERpc2FibGVyW107XG5cbiAgICBwcml2YXRlIGhpZGVySGVscGVyOiBIaWRlckhlbHBlciA9IG5ldyBIaWRlckhlbHBlcigpO1xuICAgIHByaXZhdGUgZGlzYWJsZXJIZWxwZXI6IERpc2FibGVySGVscGVyID0gbmV3IERpc2FibGVySGVscGVyKCk7XG4gICAgcHJpdmF0ZSBBbGVydEhlbHBlcjogQWxlcnRIZWxwZXIgPSBuZXcgQWxlcnRIZWxwZXIoKTtcbiAgICBjb25zdHJ1Y3Rvcihmb3JtU3RhdGU/OiBhbnksIHZhbGlkYXRvcj86IFZhbGlkYXRvckZuIHwgVmFsaWRhdG9yRm5bXSB8IEFic3RyYWN0Q29udHJvbE9wdGlvbnMgfCBudWxsLFxuICAgICAgICBhc3luY1ZhbGlkYXRvcj86IEFzeW5jVmFsaWRhdG9yRm4gfCBBc3luY1ZhbGlkYXRvckZuW10gfCBudWxsKSB7XG4gICAgICAgIHN1cGVyKGZvcm1TdGF0ZSwgdmFsaWRhdG9yLCBhc3luY1ZhbGlkYXRvcik7XG4gICAgICAgIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnMgPSBuZXcgQ29udHJvbFJlbGF0aW9ucyh0aGlzKTtcbiAgICAgICAgdGhpcy5oaWRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5kaXNhYmxlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5hbGVydHMgPSBbXTtcblxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcHJldmlvdXNWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVWYWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcmV2aW91c1ZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBjb250cm9sUmVsYXRpb25zKCk6IENvbnRyb2xSZWxhdGlvbnMge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udHJvbFJlbGF0aW9ucztcbiAgICB9XG5cbiAgICBkaXNhYmxlKHBhcmFtPzogeyBvbmx5U2VsZj86IGJvb2xlYW4sIGVtaXRFdmVudD86IGJvb2xlYW4gfSkge1xuICAgICAgICBzdXBlci5kaXNhYmxlKHBhcmFtKTtcbiAgICAgICAgc3VwZXIuc2V0VmFsdWUoJycpO1xuICAgICAgICB0aGlzLmRpc2FibGVkU3RhdHVzQ2hhbmdlcy5uZXh0KHRydWUpO1xuICAgIH1cblxuICAgIGVuYWJsZShwYXJhbT86IHsgb25seVNlbGY/OiBib29sZWFuLCBlbWl0RXZlbnQ/OiBib29sZWFuIH0pIHtcbiAgICAgICAgc3VwZXIuZW5hYmxlKHBhcmFtKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlZFN0YXR1c0NoYW5nZXMubmV4dChmYWxzZSk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5oaWRlQ29udHJvbCh0aGlzKTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLmhpZGVySGVscGVyLnNob3dDb250cm9sKHRoaXMpO1xuICAgIH1cblxuICAgIG1hcmtBc1RvdWNoZWQob3B0czogeyBvbmx5U2VsZj86IGJvb2xlYW47IH0gPSB7fSk6IHZvaWQge1xuICAgICAgICBzdXBlci5tYXJrQXNUb3VjaGVkKG9wdHMpO1xuICAgICAgICB0aGlzLnRvdWNoZWRTdGF0dXNDaGFuZ2VzLm5leHQodHJ1ZSk7XG4gICAgfVxuXG4gICAgbWFya0FzVW50b3VjaGVkKG9wdHM6IHsgb25seVNlbGY/OiBib29sZWFuOyB9ID0ge30pOiB2b2lkIHtcbiAgICAgICAgc3VwZXIubWFya0FzVW50b3VjaGVkKG9wdHMpO1xuICAgICAgICB0aGlzLnRvdWNoZWRTdGF0dXNDaGFuZ2VzLm5leHQoZmFsc2UpO1xuICAgIH1cblxuICAgIHNldEhpZGluZ0ZuKG5ld0hpZGVyOiBIaWRlcikge1xuICAgICAgICB0aGlzLmhpZGVySGVscGVyLnNldEhpZGVyRm9yQ29udHJvbCh0aGlzLCBuZXdIaWRlcik7XG4gICAgfVxuXG4gICAgc2V0Q2FsY3VsYXRvckZuKG5ld0NhbGN1bGF0b3I6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRvciA9IG5ld0NhbGN1bGF0b3I7XG4gICAgfVxuXG4gICAgdXBkYXRlQ2FsY3VsYXRlZFZhbHVlKCkge1xuICAgICAgICBpZiAodGhpcy5jYWxjdWxhdG9yKSB7XG4gICAgICAgICAgICBjb25zdCBfdmFsID0gdGhpcy5jYWxjdWxhdG9yLmNhbGwoRXhwcmVzc2lvblJ1bm5lciwge30pO1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShfdmFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFySGlkaW5nRm5zKCkge1xuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmNsZWFySGlkZXJzRm9yQ29udHJvbCh0aGlzKTtcbiAgICB9XG5cbiAgICB1cGRhdGVIaWRkZW5TdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5ldmFsdWF0ZUNvbnRyb2xIaWRlcnModGhpcyk7XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsaW5nRm4obmV3RGlzYWJsZXI6IERpc2FibGVyKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuc2V0RGlzYWJsZXJGb3JDb250cm9sKHRoaXMsIG5ld0Rpc2FibGVyKTtcbiAgICB9XG5cbiAgICBjbGVhckRpc2FibGluZ0ZucygpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlckhlbHBlci5jbGVhckRpc2FibGVyc0ZvckNvbnRyb2wodGhpcyk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGlzYWJsZWRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlckhlbHBlci5ldmFsdWF0ZUNvbnRyb2xEaXNhYmxlcnModGhpcyk7XG4gICAgfVxuXG4gICAgc2V0QWxlcnRGbihuZXdIaWRlcjogQWxlcnQpIHtcbiAgICAgICAgdGhpcy5BbGVydEhlbHBlci5zZXRBbGVydHNGb3JDb250cm9sKHRoaXMsIG5ld0hpZGVyKTtcbiAgICB9XG5cbiAgICBjbGVhck1lc3NhZ2VGbnMoKSB7XG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuY2xlYXJBbGVydHNGb3JDb250cm9sKHRoaXMpO1xuICAgIH1cblxuICAgIHVwZGF0ZUFsZXJ0KCkge1xuICAgICAgICB0aGlzLkFsZXJ0SGVscGVyLmV2YWx1YXRlQ29udHJvbEFsZXJ0cyh0aGlzKTtcbiAgICB9XG5cbiAgICBhZGRWYWx1ZUNoYW5nZUxpc3RlbmVyKGZ1bmM6IGFueSkge1xuICAgICAgICB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyID0gZnVuYztcbiAgICB9XG5cbiAgICBmaXJlVmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyICYmIHR5cGVvZiB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgc3VwZXIuc2V0VmFsdWUodmFsdWUpO1xuICAgIH1cbn1cbmV4cG9ydCB7IEFmZUZvcm1Db250cm9sIH07XG4iXX0=