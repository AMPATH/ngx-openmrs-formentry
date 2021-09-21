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
        get: function () {
            return this._uuid;
        },
        set: function (val) {
            this._uuid = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AfeFormArray.prototype, "controlRelations", {
        get: function () {
            return this._controlRelations;
        },
        enumerable: true,
        configurable: true
    });
    AfeFormArray.prototype.hide = function () {
        this.hiderHelper.hideControl(this);
    };
    AfeFormArray.prototype.show = function () {
        this.hiderHelper.showControl(this);
    };
    AfeFormArray.prototype.disable = function (param) {
        _super.prototype.disable.call(this, param);
        _super.prototype.setValue.call(this, []);
    };
    AfeFormArray.prototype.setHidingFn = function (newHider) {
        this.hiderHelper.setHiderForControl(this, newHider);
    };
    AfeFormArray.prototype.clearHidingFns = function () {
        this.hiderHelper.clearHidersForControl(this);
    };
    AfeFormArray.prototype.updateHiddenState = function () {
        this.hiderHelper.evaluateControlHiders(this);
    };
    AfeFormArray.prototype.setDisablingFn = function (newDisabler) {
        this.disablerHelper.setDisablerForControl(this, newDisabler);
    };
    AfeFormArray.prototype.clearDisablingFns = function () {
        this.disablerHelper.clearDisablersForControl(this);
    };
    AfeFormArray.prototype.updateDisabledState = function () {
        this.disablerHelper.evaluateControlDisablers(this);
    };
    AfeFormArray.prototype.setAlertFn = function (newHider) {
        this.AlertHelper.setAlertsForControl(this, newHider);
    };
    AfeFormArray.prototype.clearMessageFns = function () {
        this.AlertHelper.clearAlertsForControl(this);
    };
    AfeFormArray.prototype.updateAlert = function () {
        this.AlertHelper.evaluateControlAlerts(this);
    };
    AfeFormArray.prototype.addValueChangeListener = function (func) {
        this._valueChangeListener = func;
    };
    AfeFormArray.prototype.fireValueChangeListener = function (value) {
        if (this.alerts.length > 0) {
            this.updateAlert();
        }
        if (this._valueChangeListener &&
            typeof this._valueChangeListener === 'function') {
            this._valueChangeListener(value);
        }
    };
    AfeFormArray.prototype.setValue = function (value) {
        _super.prototype.setValue.call(this, value);
    };
    return AfeFormArray;
}(FormArray));
export { AfeFormArray };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tYXJyYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJhYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tYXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBSVYsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQWN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDbkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUV4RjtJQUNVLHdDQUFTO0lBb0JqQixzQkFDRSxRQUEyQixFQUMzQixTQUF1QixFQUN2QixjQUFpQztRQUhuQyxZQUtFLGtCQUFNLFFBQVEsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLFNBWTNDO1FBckJPLGlCQUFXLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFDN0MsaUJBQVcsR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUM3QyxvQkFBYyxHQUFtQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBUTVELEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQ3BELEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXBCLEtBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBSztZQUNoQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsY0FBYyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEtBQUksQ0FB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QUMsQ0FBQztJQUN4QixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBdkhELENBQ1UsU0FBUyxHQXNIbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBGb3JtQXJyYXksXG4gIFZhbGlkYXRvckZuLFxuICBBc3luY1ZhbGlkYXRvckZuLFxuICBBYnN0cmFjdENvbnRyb2xcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb25zIH0gZnJvbSAnLi4vY2hhbmdlLXRyYWNraW5nL2NvbnRyb2wtcmVsYXRpb25zJztcbmltcG9ydCB7IFZhbHVlQ2hhbmdlTGlzdGVuZXIgfSBmcm9tICcuL3ZhbHVlLWNoYW5nZS5saXN0ZW5lcic7XG5pbXBvcnQge1xuICBDYW5IaWRlLFxuICBIaWRlclxufSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4taGlkZSc7XG5pbXBvcnQge1xuICBDYW5HZW5lcmF0ZUFsZXJ0LFxuICBBbGVydFxufSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2Nhbi1nZW5lcmF0ZS1hbGVydCc7XG5pbXBvcnQge1xuICBDYW5EaXNhYmxlLFxuICBEaXNhYmxlclxufSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XG5pbXBvcnQgeyBIaWRlckhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMnO1xuaW1wb3J0IHsgQWxlcnRIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2FsZXJ0LWhlbHBlcnMnO1xuaW1wb3J0IHsgRGlzYWJsZXJIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9kaXNhYmxlci1oZWxwZXInO1xuXG5leHBvcnQgY2xhc3MgQWZlRm9ybUFycmF5XG4gIGV4dGVuZHMgRm9ybUFycmF5XG4gIGltcGxlbWVudHMgQ2FuSGlkZSwgQ2FuRGlzYWJsZSwgQ2FuR2VuZXJhdGVBbGVydCwgVmFsdWVDaGFuZ2VMaXN0ZW5lciB7XG4gIHByaXZhdGUgX2NvbnRyb2xSZWxhdGlvbnM6IENvbnRyb2xSZWxhdGlvbnM7XG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlTGlzdGVuZXI6IGFueTtcbiAgcHJpdmF0ZSBfcHJldmlvdXNWYWx1ZTtcbiAgcHJpdmF0ZSBfdXVpZDogc3RyaW5nO1xuICBwdWJsaWMgcGF0aEZyb21Sb290OiBzdHJpbmc7XG5cbiAgaGlkZGVuOiBmYWxzZTtcbiAgaGlkZXJzOiBIaWRlcltdO1xuXG4gIGFsZXJ0OiBzdHJpbmc7XG4gIGFsZXJ0czogQWxlcnRbXTtcblxuICBkaXNhYmxlcnM6IERpc2FibGVyW107XG5cbiAgcHJpdmF0ZSBoaWRlckhlbHBlcjogSGlkZXJIZWxwZXIgPSBuZXcgSGlkZXJIZWxwZXIoKTtcbiAgcHJpdmF0ZSBBbGVydEhlbHBlcjogQWxlcnRIZWxwZXIgPSBuZXcgQWxlcnRIZWxwZXIoKTtcbiAgcHJpdmF0ZSBkaXNhYmxlckhlbHBlcjogRGlzYWJsZXJIZWxwZXIgPSBuZXcgRGlzYWJsZXJIZWxwZXIoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjb250cm9sczogQWJzdHJhY3RDb250cm9sW10sXG4gICAgdmFsaWRhdG9yPzogVmFsaWRhdG9yRm4sXG4gICAgYXN5bmNWYWxpZGF0b3I/OiBBc3luY1ZhbGlkYXRvckZuXG4gICkge1xuICAgIHN1cGVyKGNvbnRyb2xzLCB2YWxpZGF0b3IsIGFzeW5jVmFsaWRhdG9yKTtcbiAgICB0aGlzLl9jb250cm9sUmVsYXRpb25zID0gbmV3IENvbnRyb2xSZWxhdGlvbnModGhpcyk7XG4gICAgdGhpcy5oaWRlcnMgPSBbXTtcbiAgICB0aGlzLmFsZXJ0cyA9IFtdO1xuICAgIHRoaXMuZGlzYWJsZXJzID0gW107XG5cbiAgICB0aGlzLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICBpZiAodGhpcy5fcHJldmlvdXNWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgdGhpcy5maXJlVmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzVmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldCB1dWlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3V1aWQ7XG4gIH1cbiAgc2V0IHV1aWQodmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl91dWlkID0gdmFsO1xuICB9XG5cbiAgZ2V0IGNvbnRyb2xSZWxhdGlvbnMoKTogQ29udHJvbFJlbGF0aW9ucyB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnM7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMuaGlkZXJIZWxwZXIuaGlkZUNvbnRyb2wodGhpcyk7XG4gIH1cblxuICBzaG93KCkge1xuICAgIHRoaXMuaGlkZXJIZWxwZXIuc2hvd0NvbnRyb2wodGhpcyk7XG4gIH1cblxuICBkaXNhYmxlKHBhcmFtPzogeyBvbmx5U2VsZj86IGJvb2xlYW47IGVtaXRFdmVudD86IGJvb2xlYW4gfSkge1xuICAgIHN1cGVyLmRpc2FibGUocGFyYW0pO1xuICAgIHN1cGVyLnNldFZhbHVlKFtdKTtcbiAgfVxuXG4gIHNldEhpZGluZ0ZuKG5ld0hpZGVyOiBIaWRlcikge1xuICAgIHRoaXMuaGlkZXJIZWxwZXIuc2V0SGlkZXJGb3JDb250cm9sKHRoaXMsIG5ld0hpZGVyKTtcbiAgfVxuXG4gIGNsZWFySGlkaW5nRm5zKCkge1xuICAgIHRoaXMuaGlkZXJIZWxwZXIuY2xlYXJIaWRlcnNGb3JDb250cm9sKHRoaXMpO1xuICB9XG5cbiAgdXBkYXRlSGlkZGVuU3RhdGUoKSB7XG4gICAgdGhpcy5oaWRlckhlbHBlci5ldmFsdWF0ZUNvbnRyb2xIaWRlcnModGhpcyk7XG4gIH1cblxuICBzZXREaXNhYmxpbmdGbihuZXdEaXNhYmxlcjogRGlzYWJsZXIpIHtcbiAgICB0aGlzLmRpc2FibGVySGVscGVyLnNldERpc2FibGVyRm9yQ29udHJvbCh0aGlzLCBuZXdEaXNhYmxlcik7XG4gIH1cblxuICBjbGVhckRpc2FibGluZ0ZucygpIHtcbiAgICB0aGlzLmRpc2FibGVySGVscGVyLmNsZWFyRGlzYWJsZXJzRm9yQ29udHJvbCh0aGlzKTtcbiAgfVxuXG4gIHVwZGF0ZURpc2FibGVkU3RhdGUoKSB7XG4gICAgdGhpcy5kaXNhYmxlckhlbHBlci5ldmFsdWF0ZUNvbnRyb2xEaXNhYmxlcnModGhpcyk7XG4gIH1cblxuICBzZXRBbGVydEZuKG5ld0hpZGVyOiBBbGVydCkge1xuICAgIHRoaXMuQWxlcnRIZWxwZXIuc2V0QWxlcnRzRm9yQ29udHJvbCh0aGlzLCBuZXdIaWRlcik7XG4gIH1cblxuICBjbGVhck1lc3NhZ2VGbnMoKSB7XG4gICAgdGhpcy5BbGVydEhlbHBlci5jbGVhckFsZXJ0c0ZvckNvbnRyb2wodGhpcyk7XG4gIH1cblxuICB1cGRhdGVBbGVydCgpIHtcbiAgICB0aGlzLkFsZXJ0SGVscGVyLmV2YWx1YXRlQ29udHJvbEFsZXJ0cyh0aGlzKTtcbiAgfVxuXG4gIGFkZFZhbHVlQ2hhbmdlTGlzdGVuZXIoZnVuYzogYW55KSB7XG4gICAgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciA9IGZ1bmM7XG4gIH1cblxuICBmaXJlVmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuYWxlcnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMudXBkYXRlQWxlcnQoKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciAmJlxuICAgICAgdHlwZW9mIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIgPT09ICdmdW5jdGlvbidcbiAgICApIHtcbiAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBzdXBlci5zZXRWYWx1ZSh2YWx1ZSk7XG4gIH1cbn1cbiJdfQ==