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
        if (this._valueChangeListener && typeof this._valueChangeListener === 'function') {
            this._valueChangeListener(value);
        }
    };
    AfeFormArray.prototype.setValue = function (value) {
        _super.prototype.setValue.call(this, value);
    };
    return AfeFormArray;
}(FormArray));
export { AfeFormArray };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tYXJyYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJhYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tYXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWtELE1BQU0sZ0JBQWdCLENBQUM7QUFFM0YsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFLeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ25GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFHeEY7SUFBa0Msd0NBQVM7SUFtQnZDLHNCQUFZLFFBQTJCLEVBQUUsU0FBdUIsRUFBRSxjQUFpQztRQUFuRyxZQUNJLGtCQUFNLFFBQVEsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLFNBWTdDO1FBakJPLGlCQUFXLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFDN0MsaUJBQVcsR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUM3QyxvQkFBYyxHQUFtQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBSTFELEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQ3BELEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXBCLEtBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBSztZQUNoQyxJQUFJLEtBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxFQUFFO2dCQUNqQyxLQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxD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b3J0IHsgRm9ybUFycmF5LCBWYWxpZGF0b3JGbiwgQXN5bmNWYWxpZGF0b3JGbiwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb25zIH0gZnJvbSAnLi4vY2hhbmdlLXRyYWNraW5nL2NvbnRyb2wtcmVsYXRpb25zJztcbmltcG9ydCB7IFZhbHVlQ2hhbmdlTGlzdGVuZXIgfSBmcm9tICcuL3ZhbHVlLWNoYW5nZS5saXN0ZW5lcic7XG5pbXBvcnQgeyBDYW5IaWRlLCBIaWRlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcbmltcG9ydCB7IENhbkdlbmVyYXRlQWxlcnQsIEFsZXJ0IH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWFsZXJ0cy9jYW4tZ2VuZXJhdGUtYWxlcnQnO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgRGlzYWJsZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XG5pbXBvcnQgeyBIaWRlckhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMnO1xuaW1wb3J0IHsgQWxlcnRIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2FsZXJ0LWhlbHBlcnMnO1xuaW1wb3J0IHsgRGlzYWJsZXJIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9kaXNhYmxlci1oZWxwZXInO1xuXG5cbmV4cG9ydCBjbGFzcyBBZmVGb3JtQXJyYXkgZXh0ZW5kcyBGb3JtQXJyYXkgaW1wbGVtZW50cyBDYW5IaWRlLCBDYW5EaXNhYmxlLCBDYW5HZW5lcmF0ZUFsZXJ0LCBWYWx1ZUNoYW5nZUxpc3RlbmVyIHtcbiAgICBwcml2YXRlIF9jb250cm9sUmVsYXRpb25zOiBDb250cm9sUmVsYXRpb25zO1xuICAgIHByaXZhdGUgX3ZhbHVlQ2hhbmdlTGlzdGVuZXI6IGFueTtcbiAgICBwcml2YXRlIF9wcmV2aW91c1ZhbHVlO1xuICAgIHByaXZhdGUgX3V1aWQ6IHN0cmluZztcbiAgICBwdWJsaWMgcGF0aEZyb21Sb290OiBzdHJpbmc7XG5cbiAgICBoaWRkZW46IGZhbHNlO1xuICAgIGhpZGVyczogSGlkZXJbXTtcblxuICAgIGFsZXJ0OiBzdHJpbmc7XG4gICAgYWxlcnRzOiBBbGVydFtdO1xuXG4gICAgZGlzYWJsZXJzOiBEaXNhYmxlcltdO1xuXG4gICAgcHJpdmF0ZSBoaWRlckhlbHBlcjogSGlkZXJIZWxwZXIgPSBuZXcgSGlkZXJIZWxwZXIoKTtcbiAgICBwcml2YXRlIEFsZXJ0SGVscGVyOiBBbGVydEhlbHBlciA9IG5ldyBBbGVydEhlbHBlcigpO1xuICAgIHByaXZhdGUgZGlzYWJsZXJIZWxwZXI6IERpc2FibGVySGVscGVyID0gbmV3IERpc2FibGVySGVscGVyKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250cm9sczogQWJzdHJhY3RDb250cm9sW10sIHZhbGlkYXRvcj86IFZhbGlkYXRvckZuLCBhc3luY1ZhbGlkYXRvcj86IEFzeW5jVmFsaWRhdG9yRm4pIHtcbiAgICAgICAgc3VwZXIoY29udHJvbHMsIHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xuICAgICAgICB0aGlzLl9jb250cm9sUmVsYXRpb25zID0gbmV3IENvbnRyb2xSZWxhdGlvbnModGhpcyk7XG4gICAgICAgIHRoaXMuaGlkZXJzID0gW107XG4gICAgICAgIHRoaXMuYWxlcnRzID0gW107XG4gICAgICAgIHRoaXMuZGlzYWJsZXJzID0gW107XG5cbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9wcmV2aW91c1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5maXJlVmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLl9wcmV2aW91c1ZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgdXVpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXVpZDtcbiAgICB9XG4gICAgc2V0IHV1aWQodmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fdXVpZCA9IHZhbDtcbiAgICB9XG5cbiAgICBnZXQgY29udHJvbFJlbGF0aW9ucygpOiBDb250cm9sUmVsYXRpb25zIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnM7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5oaWRlQ29udHJvbCh0aGlzKTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLmhpZGVySGVscGVyLnNob3dDb250cm9sKHRoaXMpO1xuICAgIH1cblxuICAgIGRpc2FibGUocGFyYW0/OiB7IG9ubHlTZWxmPzogYm9vbGVhbiwgZW1pdEV2ZW50PzogYm9vbGVhbiB9KSB7XG4gICAgICAgIHN1cGVyLmRpc2FibGUocGFyYW0pO1xuICAgICAgICBzdXBlci5zZXRWYWx1ZShbXSk7XG4gICAgfVxuXG4gICAgc2V0SGlkaW5nRm4obmV3SGlkZXI6IEhpZGVyKSB7XG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuc2V0SGlkZXJGb3JDb250cm9sKHRoaXMsIG5ld0hpZGVyKTtcbiAgICB9XG5cbiAgICBjbGVhckhpZGluZ0ZucygpIHtcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5jbGVhckhpZGVyc0ZvckNvbnRyb2wodGhpcyk7XG4gICAgfVxuXG4gICAgdXBkYXRlSGlkZGVuU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuZXZhbHVhdGVDb250cm9sSGlkZXJzKHRoaXMpO1xuICAgIH1cblxuICAgIHNldERpc2FibGluZ0ZuKG5ld0Rpc2FibGVyOiBEaXNhYmxlcikge1xuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLnNldERpc2FibGVyRm9yQ29udHJvbCh0aGlzLCBuZXdEaXNhYmxlcik7XG4gICAgfVxuXG4gICAgY2xlYXJEaXNhYmxpbmdGbnMoKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuY2xlYXJEaXNhYmxlcnNGb3JDb250cm9sKHRoaXMpO1xuICAgIH1cblxuICAgIHVwZGF0ZURpc2FibGVkU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuZXZhbHVhdGVDb250cm9sRGlzYWJsZXJzKHRoaXMpO1xuICAgIH1cblxuICAgIHNldEFsZXJ0Rm4obmV3SGlkZXI6IEFsZXJ0KSB7XG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuc2V0QWxlcnRzRm9yQ29udHJvbCh0aGlzLCBuZXdIaWRlcik7XG4gICAgfVxuXG4gICAgY2xlYXJNZXNzYWdlRm5zKCkge1xuICAgICAgICB0aGlzLkFsZXJ0SGVscGVyLmNsZWFyQWxlcnRzRm9yQ29udHJvbCh0aGlzKTtcbiAgICB9XG5cbiAgICAgdXBkYXRlQWxlcnQoKSB7XG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuZXZhbHVhdGVDb250cm9sQWxlcnRzKHRoaXMpO1xuICAgIH1cblxuICAgIGFkZFZhbHVlQ2hhbmdlTGlzdGVuZXIoZnVuYzogYW55KSB7XG4gICAgICB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyID0gZnVuYztcbiAgICB9XG5cbiAgICBmaXJlVmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZTogYW55KSB7XG4gICAgICBpZiAodGhpcy5hbGVydHMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUFsZXJ0KCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciAmJiB0eXBlb2YgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHN1cGVyLnNldFZhbHVlKHZhbHVlKTtcbiAgICB9XG5cbn1cbiJdfQ==