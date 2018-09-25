/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
function AfeFormArray_tsickle_Closure_declarations() {
    /** @type {?} */
    AfeFormArray.prototype._controlRelations;
    /** @type {?} */
    AfeFormArray.prototype._valueChangeListener;
    /** @type {?} */
    AfeFormArray.prototype._previousValue;
    /** @type {?} */
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
    /** @type {?} */
    AfeFormArray.prototype.hiderHelper;
    /** @type {?} */
    AfeFormArray.prototype.AlertHelper;
    /** @type {?} */
    AfeFormArray.prototype.disablerHelper;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tYXJyYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJhYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tYXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFrRCxNQUFNLGdCQUFnQixDQUFDO0FBRTNGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBS3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNuRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBR3hGLElBQUE7SUFBa0Msd0NBQVM7SUFtQnZDLHNCQUFZLFFBQTJCLEVBQUUsU0FBdUIsRUFBRSxjQUFpQztRQUFuRyxZQUNJLGtCQUFNLFFBQVEsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLFNBWTdDOzRCQWpCa0MsSUFBSSxXQUFXLEVBQUU7NEJBQ2pCLElBQUksV0FBVyxFQUFFOytCQUNYLElBQUksY0FBYyxFQUFFO1FBSXpELEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQ3BELEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXBCLEtBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBSztZQUNoQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsY0FBYyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEMsS0FB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QStHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1BcnJheSwgVmFsaWRhdG9yRm4sIEFzeW5jVmFsaWRhdG9yRm4sIEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnMgfSBmcm9tICcuLi9jaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMnO1xyXG5pbXBvcnQgeyBWYWx1ZUNoYW5nZUxpc3RlbmVyIH0gZnJvbSAnLi92YWx1ZS1jaGFuZ2UubGlzdGVuZXInO1xyXG5pbXBvcnQgeyBDYW5IaWRlLCBIaWRlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcclxuaW1wb3J0IHsgQ2FuR2VuZXJhdGVBbGVydCwgQWxlcnQgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2Nhbi1nZW5lcmF0ZS1hbGVydCc7XHJcbmltcG9ydCB7IENhbkRpc2FibGUsIERpc2FibGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWRpc2FibGUnO1xyXG5pbXBvcnQgeyBIaWRlckhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMnO1xyXG5pbXBvcnQgeyBBbGVydEhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1hbGVydHMvYWxlcnQtaGVscGVycyc7XHJcbmltcG9ydCB7IERpc2FibGVySGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvZGlzYWJsZXItaGVscGVyJztcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQWZlRm9ybUFycmF5IGV4dGVuZHMgRm9ybUFycmF5IGltcGxlbWVudHMgQ2FuSGlkZSwgQ2FuRGlzYWJsZSwgQ2FuR2VuZXJhdGVBbGVydCwgVmFsdWVDaGFuZ2VMaXN0ZW5lciB7XHJcbiAgICBwcml2YXRlIF9jb250cm9sUmVsYXRpb25zOiBDb250cm9sUmVsYXRpb25zO1xyXG4gICAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VMaXN0ZW5lcjogYW55O1xyXG4gICAgcHJpdmF0ZSBfcHJldmlvdXNWYWx1ZTtcclxuICAgIHByaXZhdGUgX3V1aWQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBwYXRoRnJvbVJvb3Q6IHN0cmluZztcclxuXHJcbiAgICBoaWRkZW46IGZhbHNlO1xyXG4gICAgaGlkZXJzOiBIaWRlcltdO1xyXG5cclxuICAgIGFsZXJ0OiBzdHJpbmc7XHJcbiAgICBhbGVydHM6IEFsZXJ0W107XHJcblxyXG4gICAgZGlzYWJsZXJzOiBEaXNhYmxlcltdO1xyXG5cclxuICAgIHByaXZhdGUgaGlkZXJIZWxwZXI6IEhpZGVySGVscGVyID0gbmV3IEhpZGVySGVscGVyKCk7XHJcbiAgICBwcml2YXRlIEFsZXJ0SGVscGVyOiBBbGVydEhlbHBlciA9IG5ldyBBbGVydEhlbHBlcigpO1xyXG4gICAgcHJpdmF0ZSBkaXNhYmxlckhlbHBlcjogRGlzYWJsZXJIZWxwZXIgPSBuZXcgRGlzYWJsZXJIZWxwZXIoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250cm9sczogQWJzdHJhY3RDb250cm9sW10sIHZhbGlkYXRvcj86IFZhbGlkYXRvckZuLCBhc3luY1ZhbGlkYXRvcj86IEFzeW5jVmFsaWRhdG9yRm4pIHtcclxuICAgICAgICBzdXBlcihjb250cm9scywgdmFsaWRhdG9yLCBhc3luY1ZhbGlkYXRvcik7XHJcbiAgICAgICAgdGhpcy5fY29udHJvbFJlbGF0aW9ucyA9IG5ldyBDb250cm9sUmVsYXRpb25zKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGlkZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5hbGVydHMgPSBbXTtcclxuICAgICAgICB0aGlzLmRpc2FibGVycyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5fcHJldmlvdXNWYWx1ZSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5maXJlVmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdXVpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91dWlkO1xyXG4gICAgfVxyXG4gICAgc2V0IHV1aWQodmFsOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl91dWlkID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb250cm9sUmVsYXRpb25zKCk6IENvbnRyb2xSZWxhdGlvbnMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb250cm9sUmVsYXRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5oaWRlQ29udHJvbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuc2hvd0NvbnRyb2wodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZShwYXJhbT86IHsgb25seVNlbGY/OiBib29sZWFuLCBlbWl0RXZlbnQ/OiBib29sZWFuIH0pIHtcclxuICAgICAgICBzdXBlci5kaXNhYmxlKHBhcmFtKTtcclxuICAgICAgICBzdXBlci5zZXRWYWx1ZShbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SGlkaW5nRm4obmV3SGlkZXI6IEhpZGVyKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5zZXRIaWRlckZvckNvbnRyb2wodGhpcywgbmV3SGlkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFySGlkaW5nRm5zKCkge1xyXG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuY2xlYXJIaWRlcnNGb3JDb250cm9sKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUhpZGRlblN0YXRlKCkge1xyXG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuZXZhbHVhdGVDb250cm9sSGlkZXJzKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpc2FibGluZ0ZuKG5ld0Rpc2FibGVyOiBEaXNhYmxlcikge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuc2V0RGlzYWJsZXJGb3JDb250cm9sKHRoaXMsIG5ld0Rpc2FibGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckRpc2FibGluZ0ZucygpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLmNsZWFyRGlzYWJsZXJzRm9yQ29udHJvbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVEaXNhYmxlZFN0YXRlKCkge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuZXZhbHVhdGVDb250cm9sRGlzYWJsZXJzKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEFsZXJ0Rm4obmV3SGlkZXI6IEFsZXJ0KSB7XHJcbiAgICAgICAgdGhpcy5BbGVydEhlbHBlci5zZXRBbGVydHNGb3JDb250cm9sKHRoaXMsIG5ld0hpZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhck1lc3NhZ2VGbnMoKSB7XHJcbiAgICAgICAgdGhpcy5BbGVydEhlbHBlci5jbGVhckFsZXJ0c0ZvckNvbnRyb2wodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgIHVwZGF0ZUFsZXJ0KCkge1xyXG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuZXZhbHVhdGVDb250cm9sQWxlcnRzKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFZhbHVlQ2hhbmdlTGlzdGVuZXIoZnVuYzogYW55KSB7XHJcbiAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIgPSBmdW5jO1xyXG4gICAgfVxyXG5cclxuICAgIGZpcmVWYWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlOiBhbnkpIHtcclxuICAgICAgaWYgKHRoaXMuYWxlcnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUFsZXJ0KCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIgJiYgdHlwZW9mIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldFZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICBzdXBlci5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==