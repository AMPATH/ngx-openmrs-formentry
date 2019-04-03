/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
if (false) {
    /**
     * @type {?}
     * @private
     */
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
    /**
     * @type {?}
     * @private
     */
    AfeFormGroup.prototype.hiderHelper;
    /**
     * @type {?}
     * @private
     */
    AfeFormGroup.prototype.disablerHelper;
    /**
     * @type {?}
     * @private
     */
    AfeFormGroup.prototype.AlertHelper;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tZ3JvdXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJhYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFrRCxNQUFNLGdCQUFnQixDQUFDO0FBRTNGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBS3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNuRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDeEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBRXpFO0lBQWtDLHdDQUFTO0lBaUJ2QyxzQkFBWSxRQUE0QyxFQUFFLFNBQXVCLEVBQUUsY0FBaUM7UUFBcEgsWUFDSSxrQkFBTSxRQUFRLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxTQUs3QztRQVZPLGlCQUFXLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFDN0Msb0JBQWMsR0FBbUIsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUN0RCxpQkFBVyxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBSWpELEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQ3BELEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDOztJQUNyQixDQUFDO0lBRUQsc0JBQUksMENBQWdCOzs7O1FBQXBCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTs7OztJQUVELDJCQUFJOzs7SUFBSjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7SUFFRCwyQkFBSTs7O0lBQUo7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7OztJQUVELDhCQUFPOzs7O0lBQVAsVUFBUSxLQUFtRDtRQUN2RCxpQkFBTSxPQUFPLFlBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsaUJBQU0sUUFBUSxZQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRUQsa0NBQVc7Ozs7SUFBWCxVQUFZLFFBQWU7UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7OztJQUVELHFDQUFjOzs7SUFBZDtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7OztJQUVELHdDQUFpQjs7O0lBQWpCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7OztJQUVELHFDQUFjOzs7O0lBQWQsVUFBZSxXQUFxQjtRQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNqRSxDQUFDOzs7O0lBRUQsd0NBQWlCOzs7SUFBakI7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7SUFFRCwwQ0FBbUI7OztJQUFuQjtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7Ozs7SUFFRCxpQ0FBVTs7OztJQUFWLFVBQVcsUUFBZTtRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN6RCxDQUFDOzs7O0lBRUQsc0NBQWU7OztJQUFmO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7O0lBRUEsa0NBQVc7OztJQUFYO1FBQ0csSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7OztJQUNELCtCQUFROzs7O0lBQVIsVUFBUyxLQUFVO1FBQ2YsaUJBQU0sUUFBUSxZQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTCxtQkFBQztBQUFELENBQUMsQUFqRkQsQ0FBa0MsU0FBUyxHQWlGMUM7Ozs7Ozs7SUFoRkcseUNBQTRDOztJQUU1Qyw0QkFBb0I7O0lBQ3BCLG9DQUE0Qjs7SUFFNUIsOEJBQWM7O0lBQ2QsOEJBQWdCOztJQUNoQiw2QkFBYzs7SUFDZCw4QkFBZ0I7O0lBRWhCLGlDQUFzQjs7Ozs7SUFFdEIsbUNBQXFEOzs7OztJQUNyRCxzQ0FBOEQ7Ozs7O0lBQzlELG1DQUFxRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1Hcm91cCwgVmFsaWRhdG9yRm4sIEFzeW5jVmFsaWRhdG9yRm4sIEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnMgfSBmcm9tICcuLi9jaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMnO1xyXG5cclxuaW1wb3J0IHsgQ2FuSGlkZSwgSGlkZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4taGlkZSc7XHJcbmltcG9ydCB7IENhbkRpc2FibGUsIERpc2FibGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWRpc2FibGUnO1xyXG5pbXBvcnQgeyBDYW5HZW5lcmF0ZUFsZXJ0LCBBbGVydCB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1hbGVydHMvY2FuLWdlbmVyYXRlLWFsZXJ0JztcclxuaW1wb3J0IHsgSGlkZXJIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9oaWRlci1oZWxwZXJzJztcclxuaW1wb3J0IHsgRGlzYWJsZXJIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9kaXNhYmxlci1oZWxwZXInO1xyXG5pbXBvcnQgeyBBbGVydEhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1hbGVydHMvYWxlcnQtaGVscGVycyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQWZlRm9ybUdyb3VwIGV4dGVuZHMgRm9ybUdyb3VwIGltcGxlbWVudHMgQ2FuSGlkZSwgQ2FuRGlzYWJsZSAsIENhbkdlbmVyYXRlQWxlcnQge1xyXG4gICAgcHJpdmF0ZSBfY29udHJvbFJlbGF0aW9uczogQ29udHJvbFJlbGF0aW9ucztcclxuXHJcbiAgICBwdWJsaWMgdXVpZDogc3RyaW5nO1xyXG4gICAgcHVibGljIHBhdGhGcm9tUm9vdDogc3RyaW5nO1xyXG5cclxuICAgIGhpZGRlbjogZmFsc2U7XHJcbiAgICBoaWRlcnM6IEhpZGVyW107XHJcbiAgICBhbGVydDogc3RyaW5nO1xyXG4gICAgYWxlcnRzOiBBbGVydFtdO1xyXG5cclxuICAgIGRpc2FibGVyczogRGlzYWJsZXJbXTtcclxuXHJcbiAgICBwcml2YXRlIGhpZGVySGVscGVyOiBIaWRlckhlbHBlciA9IG5ldyBIaWRlckhlbHBlcigpO1xyXG4gICAgcHJpdmF0ZSBkaXNhYmxlckhlbHBlcjogRGlzYWJsZXJIZWxwZXIgPSBuZXcgRGlzYWJsZXJIZWxwZXIoKTtcclxuICAgIHByaXZhdGUgQWxlcnRIZWxwZXI6IEFsZXJ0SGVscGVyID0gbmV3IEFsZXJ0SGVscGVyKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29udHJvbHM6IHsgW2tleTogc3RyaW5nXTogQWJzdHJhY3RDb250cm9sIH0sIHZhbGlkYXRvcj86IFZhbGlkYXRvckZuLCBhc3luY1ZhbGlkYXRvcj86IEFzeW5jVmFsaWRhdG9yRm4pIHtcclxuICAgICAgICBzdXBlcihjb250cm9scywgdmFsaWRhdG9yLCBhc3luY1ZhbGlkYXRvcik7XHJcbiAgICAgICAgdGhpcy5fY29udHJvbFJlbGF0aW9ucyA9IG5ldyBDb250cm9sUmVsYXRpb25zKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGlkZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlcnMgPSBbXTtcclxuICAgICAgICB0aGlzLmFsZXJ0cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb250cm9sUmVsYXRpb25zKCk6IENvbnRyb2xSZWxhdGlvbnMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb250cm9sUmVsYXRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5oaWRlQ29udHJvbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuc2hvd0NvbnRyb2wodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZShwYXJhbT86IHsgb25seVNlbGY/OiBib29sZWFuLCBlbWl0RXZlbnQ/OiBib29sZWFuIH0pIHtcclxuICAgICAgICBzdXBlci5kaXNhYmxlKHBhcmFtKTtcclxuICAgICAgICBzdXBlci5zZXRWYWx1ZSh7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SGlkaW5nRm4obmV3SGlkZXI6IEhpZGVyKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5zZXRIaWRlckZvckNvbnRyb2wodGhpcywgbmV3SGlkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFySGlkaW5nRm5zKCkge1xyXG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuY2xlYXJIaWRlcnNGb3JDb250cm9sKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUhpZGRlblN0YXRlKCkge1xyXG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuZXZhbHVhdGVDb250cm9sSGlkZXJzKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpc2FibGluZ0ZuKG5ld0Rpc2FibGVyOiBEaXNhYmxlcikge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuc2V0RGlzYWJsZXJGb3JDb250cm9sKHRoaXMsIG5ld0Rpc2FibGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckRpc2FibGluZ0ZucygpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLmNsZWFyRGlzYWJsZXJzRm9yQ29udHJvbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVEaXNhYmxlZFN0YXRlKCkge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuZXZhbHVhdGVDb250cm9sRGlzYWJsZXJzKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEFsZXJ0Rm4obmV3SGlkZXI6IEFsZXJ0KSB7XHJcbiAgICAgICAgdGhpcy5BbGVydEhlbHBlci5zZXRBbGVydHNGb3JDb250cm9sKHRoaXMsIG5ld0hpZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhck1lc3NhZ2VGbnMoKSB7XHJcbiAgICAgICAgdGhpcy5BbGVydEhlbHBlci5jbGVhckFsZXJ0c0ZvckNvbnRyb2wodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgIHVwZGF0ZUFsZXJ0KCkge1xyXG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuZXZhbHVhdGVDb250cm9sQWxlcnRzKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgc2V0VmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgICAgIHN1cGVyLnNldFZhbHVlKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19