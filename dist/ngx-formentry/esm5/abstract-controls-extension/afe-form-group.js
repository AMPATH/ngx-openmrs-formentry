/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FormGroup } from '@angular/forms';
import { ControlRelations } from '../change-tracking/control-relations';
import { HiderHelper } from '../form-entry/control-hiders-disablers/hider-helpers';
import { DisablerHelper } from '../form-entry/control-hiders-disablers/disabler-helper';
import { AlertHelper } from '../form-entry/control-alerts/alert-helpers';
var AfeFormGroup = /** @class */ (function (_super) {
    tslib_1.__extends(AfeFormGroup, _super);
    function AfeFormGroup(controls, validator, asyncValidator) {
        var _this = _super.call(this, controls, validator, asyncValidator) || this;
        _this.hiderHelper = new HiderHelper();
        _this.disablerHelper = new DisablerHelper();
        _this.AlertHelper = new AlertHelper();
        _this._controlRelations = new ControlRelations(_this);
        _this.hiders = [];
        _this.disablers = [];
        _this.alerts = [];
        return _this;
    }
    Object.defineProperty(AfeFormGroup.prototype, "controlRelations", {
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
    AfeFormGroup.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.hiderHelper.hideControl(this);
    };
    /**
     * @return {?}
     */
    AfeFormGroup.prototype.show = /**
     * @return {?}
     */
    function () {
        this.hiderHelper.showControl(this);
    };
    /**
     * @param {?=} param
     * @return {?}
     */
    AfeFormGroup.prototype.disable = /**
     * @param {?=} param
     * @return {?}
     */
    function (param) {
        _super.prototype.disable.call(this, param);
        _super.prototype.setValue.call(this, {});
    };
    /**
     * @param {?} newHider
     * @return {?}
     */
    AfeFormGroup.prototype.setHidingFn = /**
     * @param {?} newHider
     * @return {?}
     */
    function (newHider) {
        this.hiderHelper.setHiderForControl(this, newHider);
    };
    /**
     * @return {?}
     */
    AfeFormGroup.prototype.clearHidingFns = /**
     * @return {?}
     */
    function () {
        this.hiderHelper.clearHidersForControl(this);
    };
    /**
     * @return {?}
     */
    AfeFormGroup.prototype.updateHiddenState = /**
     * @return {?}
     */
    function () {
        this.hiderHelper.evaluateControlHiders(this);
    };
    /**
     * @param {?} newDisabler
     * @return {?}
     */
    AfeFormGroup.prototype.setDisablingFn = /**
     * @param {?} newDisabler
     * @return {?}
     */
    function (newDisabler) {
        this.disablerHelper.setDisablerForControl(this, newDisabler);
    };
    /**
     * @return {?}
     */
    AfeFormGroup.prototype.clearDisablingFns = /**
     * @return {?}
     */
    function () {
        this.disablerHelper.clearDisablersForControl(this);
    };
    /**
     * @return {?}
     */
    AfeFormGroup.prototype.updateDisabledState = /**
     * @return {?}
     */
    function () {
        this.disablerHelper.evaluateControlDisablers(this);
    };
    /**
     * @param {?} newHider
     * @return {?}
     */
    AfeFormGroup.prototype.setAlertFn = /**
     * @param {?} newHider
     * @return {?}
     */
    function (newHider) {
        this.AlertHelper.setAlertsForControl(this, newHider);
    };
    /**
     * @return {?}
     */
    AfeFormGroup.prototype.clearMessageFns = /**
     * @return {?}
     */
    function () {
        this.AlertHelper.clearAlertsForControl(this);
    };
    /**
     * @return {?}
     */
    AfeFormGroup.prototype.updateAlert = /**
     * @return {?}
     */
    function () {
        this.AlertHelper.evaluateControlAlerts(this);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AfeFormGroup.prototype.setValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        _super.prototype.setValue.call(this, value);
    };
    return AfeFormGroup;
}(FormGroup));
export { AfeFormGroup };
function AfeFormGroup_tsickle_Closure_declarations() {
    /** @type {?} */
    AfeFormGroup.prototype._controlRelations;
    /** @type {?} */
    AfeFormGroup.prototype.uuid;
    /** @type {?} */
    AfeFormGroup.prototype.pathFromRoot;
    /** @type {?} */
    AfeFormGroup.prototype.hidden;
    /** @type {?} */
    AfeFormGroup.prototype.hiders;
    /** @type {?} */
    AfeFormGroup.prototype.alert;
    /** @type {?} */
    AfeFormGroup.prototype.alerts;
    /** @type {?} */
    AfeFormGroup.prototype.disablers;
    /** @type {?} */
    AfeFormGroup.prototype.hiderHelper;
    /** @type {?} */
    AfeFormGroup.prototype.disablerHelper;
    /** @type {?} */
    AfeFormGroup.prototype.AlertHelper;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tZ3JvdXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJhYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFrRCxNQUFNLGdCQUFnQixDQUFDO0FBRTNGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBS3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNuRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDeEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBRXpFLElBQUE7SUFBa0Msd0NBQVM7SUFpQnZDLHNCQUFZLFFBQTRDLEVBQUUsU0FBdUIsRUFBRSxjQUFpQztRQUFwSCxZQUNJLGtCQUFNLFFBQVEsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLFNBSzdDOzRCQVZrQyxJQUFJLFdBQVcsRUFBRTsrQkFDWCxJQUFJLGNBQWMsRUFBRTs0QkFDMUIsSUFBSSxXQUFXLEVBQUU7UUFJaEQsS0FBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksZ0JBQWdCLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDcEQsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7O0tBQ3BCO0lBRUQsc0JBQUksMENBQWdCOzs7O1FBQXBCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztTQUNqQzs7O09BQUE7Ozs7SUFFRCwyQkFBSTs7O0lBQUo7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0Qzs7OztJQUVELDJCQUFJOzs7SUFBSjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3RDOzs7OztJQUVELDhCQUFPOzs7O0lBQVAsVUFBUSxLQUFtRDtRQUN2RCxpQkFBTSxPQUFPLFlBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsaUJBQU0sUUFBUSxZQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3RCOzs7OztJQUVELGtDQUFXOzs7O0lBQVgsVUFBWSxRQUFlO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ3ZEOzs7O0lBRUQscUNBQWM7OztJQUFkO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNoRDs7OztJQUVELHdDQUFpQjs7O0lBQWpCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNoRDs7Ozs7SUFFRCxxQ0FBYzs7OztJQUFkLFVBQWUsV0FBcUI7UUFDaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7S0FDaEU7Ozs7SUFFRCx3Q0FBaUI7OztJQUFqQjtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEQ7Ozs7SUFFRCwwQ0FBbUI7OztJQUFuQjtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEQ7Ozs7O0lBRUQsaUNBQVU7Ozs7SUFBVixVQUFXLFFBQWU7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDeEQ7Ozs7SUFFRCxzQ0FBZTs7O0lBQWY7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hEOzs7O0lBRUEsa0NBQVc7OztJQUFYO1FBQ0csSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNoRDs7Ozs7SUFDRCwrQkFBUTs7OztJQUFSLFVBQVMsS0FBVTtRQUNmLGlCQUFNLFFBQVEsWUFBQyxLQUFLLENBQUMsQ0FBQztLQUN6Qjt1QkExRkw7RUFXa0MsU0FBUyxFQWlGMUMsQ0FBQTtBQWpGRCx3QkFpRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtR3JvdXAsIFZhbGlkYXRvckZuLCBBc3luY1ZhbGlkYXRvckZuLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb25zIH0gZnJvbSAnLi4vY2hhbmdlLXRyYWNraW5nL2NvbnRyb2wtcmVsYXRpb25zJztcclxuXHJcbmltcG9ydCB7IENhbkhpZGUsIEhpZGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWhpZGUnO1xyXG5pbXBvcnQgeyBDYW5EaXNhYmxlLCBEaXNhYmxlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1kaXNhYmxlJztcclxuaW1wb3J0IHsgQ2FuR2VuZXJhdGVBbGVydCwgQWxlcnQgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2Nhbi1nZW5lcmF0ZS1hbGVydCc7XHJcbmltcG9ydCB7IEhpZGVySGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvaGlkZXItaGVscGVycyc7XHJcbmltcG9ydCB7IERpc2FibGVySGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvZGlzYWJsZXItaGVscGVyJztcclxuaW1wb3J0IHsgQWxlcnRIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2FsZXJ0LWhlbHBlcnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFmZUZvcm1Hcm91cCBleHRlbmRzIEZvcm1Hcm91cCBpbXBsZW1lbnRzIENhbkhpZGUsIENhbkRpc2FibGUgLCBDYW5HZW5lcmF0ZUFsZXJ0IHtcclxuICAgIHByaXZhdGUgX2NvbnRyb2xSZWxhdGlvbnM6IENvbnRyb2xSZWxhdGlvbnM7XHJcblxyXG4gICAgcHVibGljIHV1aWQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBwYXRoRnJvbVJvb3Q6IHN0cmluZztcclxuXHJcbiAgICBoaWRkZW46IGZhbHNlO1xyXG4gICAgaGlkZXJzOiBIaWRlcltdO1xyXG4gICAgYWxlcnQ6IHN0cmluZztcclxuICAgIGFsZXJ0czogQWxlcnRbXTtcclxuXHJcbiAgICBkaXNhYmxlcnM6IERpc2FibGVyW107XHJcblxyXG4gICAgcHJpdmF0ZSBoaWRlckhlbHBlcjogSGlkZXJIZWxwZXIgPSBuZXcgSGlkZXJIZWxwZXIoKTtcclxuICAgIHByaXZhdGUgZGlzYWJsZXJIZWxwZXI6IERpc2FibGVySGVscGVyID0gbmV3IERpc2FibGVySGVscGVyKCk7XHJcbiAgICBwcml2YXRlIEFsZXJ0SGVscGVyOiBBbGVydEhlbHBlciA9IG5ldyBBbGVydEhlbHBlcigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2xzOiB7IFtrZXk6IHN0cmluZ106IEFic3RyYWN0Q29udHJvbCB9LCB2YWxpZGF0b3I/OiBWYWxpZGF0b3JGbiwgYXN5bmNWYWxpZGF0b3I/OiBBc3luY1ZhbGlkYXRvckZuKSB7XHJcbiAgICAgICAgc3VwZXIoY29udHJvbHMsIHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xyXG4gICAgICAgIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnMgPSBuZXcgQ29udHJvbFJlbGF0aW9ucyh0aGlzKTtcclxuICAgICAgICB0aGlzLmhpZGVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5hbGVydHMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29udHJvbFJlbGF0aW9ucygpOiBDb250cm9sUmVsYXRpb25zIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29udHJvbFJlbGF0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuaGlkZUNvbnRyb2wodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLnNob3dDb250cm9sKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGUocGFyYW0/OiB7IG9ubHlTZWxmPzogYm9vbGVhbiwgZW1pdEV2ZW50PzogYm9vbGVhbiB9KSB7XHJcbiAgICAgICAgc3VwZXIuZGlzYWJsZShwYXJhbSk7XHJcbiAgICAgICAgc3VwZXIuc2V0VmFsdWUoe30pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEhpZGluZ0ZuKG5ld0hpZGVyOiBIaWRlcikge1xyXG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuc2V0SGlkZXJGb3JDb250cm9sKHRoaXMsIG5ld0hpZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckhpZGluZ0ZucygpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmNsZWFySGlkZXJzRm9yQ29udHJvbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVIaWRkZW5TdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmV2YWx1YXRlQ29udHJvbEhpZGVycyh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNhYmxpbmdGbihuZXdEaXNhYmxlcjogRGlzYWJsZXIpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLnNldERpc2FibGVyRm9yQ29udHJvbCh0aGlzLCBuZXdEaXNhYmxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJEaXNhYmxpbmdGbnMoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlckhlbHBlci5jbGVhckRpc2FibGVyc0ZvckNvbnRyb2wodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRGlzYWJsZWRTdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLmV2YWx1YXRlQ29udHJvbERpc2FibGVycyh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBbGVydEZuKG5ld0hpZGVyOiBBbGVydCkge1xyXG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuc2V0QWxlcnRzRm9yQ29udHJvbCh0aGlzLCBuZXdIaWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJNZXNzYWdlRm5zKCkge1xyXG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuY2xlYXJBbGVydHNGb3JDb250cm9sKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgICB1cGRhdGVBbGVydCgpIHtcclxuICAgICAgICB0aGlzLkFsZXJ0SGVscGVyLmV2YWx1YXRlQ29udHJvbEFsZXJ0cyh0aGlzKTtcclxuICAgIH1cclxuICAgIHNldFZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICBzdXBlci5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==