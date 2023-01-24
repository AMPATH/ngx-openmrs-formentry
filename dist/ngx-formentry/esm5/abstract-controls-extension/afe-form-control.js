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
        get: function () {
            return this._controlRelations;
        },
        enumerable: true,
        configurable: true
    });
    AfeFormControl.prototype.disable = function (param) {
        _super.prototype.disable.call(this, param);
        _super.prototype.setValue.call(this, '');
    };
    AfeFormControl.prototype.hide = function () {
        this.hiderHelper.hideControl(this);
    };
    AfeFormControl.prototype.show = function () {
        this.hiderHelper.showControl(this);
    };
    AfeFormControl.prototype.setHidingFn = function (newHider) {
        this.hiderHelper.setHiderForControl(this, newHider);
    };
    AfeFormControl.prototype.setCalculatorFn = function (newCalculator) {
        this.calculator = newCalculator;
    };
    AfeFormControl.prototype.updateCalculatedValue = function () {
        if (this.calculator) {
            var _val = this.calculator.call(ExpressionRunner, {});
            this.setValue(_val);
        }
    };
    AfeFormControl.prototype.clearHidingFns = function () {
        this.hiderHelper.clearHidersForControl(this);
    };
    AfeFormControl.prototype.updateHiddenState = function () {
        this.hiderHelper.evaluateControlHiders(this);
    };
    AfeFormControl.prototype.setDisablingFn = function (newDisabler) {
        this.disablerHelper.setDisablerForControl(this, newDisabler);
    };
    AfeFormControl.prototype.clearDisablingFns = function () {
        this.disablerHelper.clearDisablersForControl(this);
    };
    AfeFormControl.prototype.updateDisabledState = function () {
        this.disablerHelper.evaluateControlDisablers(this);
    };
    AfeFormControl.prototype.setAlertFn = function (newHider) {
        this.AlertHelper.setAlertsForControl(this, newHider);
    };
    AfeFormControl.prototype.clearMessageFns = function () {
        this.AlertHelper.clearAlertsForControl(this);
    };
    AfeFormControl.prototype.updateAlert = function () {
        this.AlertHelper.evaluateControlAlerts(this);
    };
    AfeFormControl.prototype.addValueChangeListener = function (func) {
        this._valueChangeListener = func;
    };
    AfeFormControl.prototype.fireValueChangeListener = function (value) {
        if (this._valueChangeListener &&
            typeof this._valueChangeListener === 'function') {
            this._valueChangeListener(value);
        }
    };
    AfeFormControl.prototype.setValue = function (value) {
        _super.prototype.setValue.call(this, value);
    };
    return AfeFormControl;
}(FormControl));
export { AfeFormControl };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxXQUFXLEVBSVosTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQWN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDbkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUV4RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUVyRjtJQUNVLDBDQUFXO0lBdUJuQix3QkFDRSxTQUFlLEVBQ2YsU0FBdUUsRUFDdkUsY0FBNkQ7UUFIL0QsWUFLRSxrQkFBTSxTQUFTLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxTQVk1QztRQTNCRCxZQUFNLEdBQUcsS0FBSyxDQUFDO1FBT1AsaUJBQVcsR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUM3QyxvQkFBYyxHQUFtQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ3RELGlCQUFXLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFPbkQsS0FBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksZ0JBQWdCLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDcEQsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFakIsS0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMs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QztZQUNELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxDQUFDO0lBQ0gsQ0FBQztJQUVELGlDQUFRLEdBQVIsVUFBUyxLQUFVO1FBQ2pCLGlCQUFNLFFBQVEsWUFBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBM0hELENBQ1UsV0FBVyxHQTBIcEI7QUFDRCxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBGb3JtQ29udHJvbCxcbiAgVmFsaWRhdG9yRm4sXG4gIEFzeW5jVmFsaWRhdG9yRm4sXG4gIEFic3RyYWN0Q29udHJvbE9wdGlvbnNcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb25zIH0gZnJvbSAnLi4vY2hhbmdlLXRyYWNraW5nL2NvbnRyb2wtcmVsYXRpb25zJztcbmltcG9ydCB7IFZhbHVlQ2hhbmdlTGlzdGVuZXIgfSBmcm9tICcuL3ZhbHVlLWNoYW5nZS5saXN0ZW5lcic7XG5pbXBvcnQge1xuICBDYW5IaWRlLFxuICBIaWRlclxufSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4taGlkZSc7XG5pbXBvcnQge1xuICBDYW5EaXNhYmxlLFxuICBEaXNhYmxlclxufSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XG5pbXBvcnQge1xuICBDYW5HZW5lcmF0ZUFsZXJ0LFxuICBBbGVydFxufSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2Nhbi1nZW5lcmF0ZS1hbGVydCc7XG5pbXBvcnQgeyBIaWRlckhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMnO1xuaW1wb3J0IHsgQWxlcnRIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2FsZXJ0LWhlbHBlcnMnO1xuaW1wb3J0IHsgRGlzYWJsZXJIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9kaXNhYmxlci1oZWxwZXInO1xuaW1wb3J0IHsgQ2FuQ2FsY3VsYXRlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWNhbGN1bGF0b3JzL2Nhbi1jYWxjdWxhdGUnO1xuaW1wb3J0IHsgRXhwcmVzc2lvblJ1bm5lciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xuXG5jbGFzcyBBZmVGb3JtQ29udHJvbFxuICBleHRlbmRzIEZvcm1Db250cm9sXG4gIGltcGxlbWVudHNcbiAgICBDYW5IaWRlLFxuICAgIENhbkRpc2FibGUsXG4gICAgQ2FuQ2FsY3VsYXRlLFxuICAgIENhbkdlbmVyYXRlQWxlcnQsXG4gICAgVmFsdWVDaGFuZ2VMaXN0ZW5lciB7XG4gIHByaXZhdGUgX2NvbnRyb2xSZWxhdGlvbnM6IENvbnRyb2xSZWxhdGlvbnM7XG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlTGlzdGVuZXI6IGFueTtcbiAgcHJpdmF0ZSBfcHJldmlvdXNWYWx1ZTtcbiAgcHVibGljIHV1aWQ6IHN0cmluZztcbiAgcHVibGljIHBhdGhGcm9tUm9vdDogc3RyaW5nO1xuXG4gIGhpZGRlbiA9IGZhbHNlO1xuICBoaWRlcnM6IEhpZGVyW107XG4gIGFsZXJ0OiBzdHJpbmc7XG4gIGFsZXJ0czogQWxlcnRbXTtcbiAgY2FsY3VsYXRvcjogRnVuY3Rpb247XG4gIGRpc2FibGVyczogRGlzYWJsZXJbXTtcblxuICBwcml2YXRlIGhpZGVySGVscGVyOiBIaWRlckhlbHBlciA9IG5ldyBIaWRlckhlbHBlcigpO1xuICBwcml2YXRlIGRpc2FibGVySGVscGVyOiBEaXNhYmxlckhlbHBlciA9IG5ldyBEaXNhYmxlckhlbHBlcigpO1xuICBwcml2YXRlIEFsZXJ0SGVscGVyOiBBbGVydEhlbHBlciA9IG5ldyBBbGVydEhlbHBlcigpO1xuICBjb25zdHJ1Y3RvcihcbiAgICBmb3JtU3RhdGU/OiBhbnksXG4gICAgdmFsaWRhdG9yPzogVmFsaWRhdG9yRm4gfCBWYWxpZGF0b3JGbltdIHwgQWJzdHJhY3RDb250cm9sT3B0aW9ucyB8IG51bGwsXG4gICAgYXN5bmNWYWxpZGF0b3I/OiBBc3luY1ZhbGlkYXRvckZuIHwgQXN5bmNWYWxpZGF0b3JGbltdIHwgbnVsbFxuICApIHtcbiAgICBzdXBlcihmb3JtU3RhdGUsIHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xuICAgIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnMgPSBuZXcgQ29udHJvbFJlbGF0aW9ucyh0aGlzKTtcbiAgICB0aGlzLmhpZGVycyA9IFtdO1xuICAgIHRoaXMuZGlzYWJsZXJzID0gW107XG4gICAgdGhpcy5hbGVydHMgPSBbXTtcblxuICAgIHRoaXMudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgIGlmICh0aGlzLl9wcmV2aW91c1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICB0aGlzLmZpcmVWYWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fcHJldmlvdXNWYWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGNvbnRyb2xSZWxhdGlvbnMoKTogQ29udHJvbFJlbGF0aW9ucyB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnM7XG4gIH1cblxuICBkaXNhYmxlKHBhcmFtPzogeyBvbmx5U2VsZj86IGJvb2xlYW47IGVtaXRFdmVudD86IGJvb2xlYW4gfSkge1xuICAgIHN1cGVyLmRpc2FibGUocGFyYW0pO1xuICAgIHN1cGVyLnNldFZhbHVlKCcnKTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5oaWRlckhlbHBlci5oaWRlQ29udHJvbCh0aGlzKTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgdGhpcy5oaWRlckhlbHBlci5zaG93Q29udHJvbCh0aGlzKTtcbiAgfVxuXG4gIHNldEhpZGluZ0ZuKG5ld0hpZGVyOiBIaWRlcikge1xuICAgIHRoaXMuaGlkZXJIZWxwZXIuc2V0SGlkZXJGb3JDb250cm9sKHRoaXMsIG5ld0hpZGVyKTtcbiAgfVxuXG4gIHNldENhbGN1bGF0b3JGbihuZXdDYWxjdWxhdG9yOiBGdW5jdGlvbikge1xuICAgIHRoaXMuY2FsY3VsYXRvciA9IG5ld0NhbGN1bGF0b3I7XG4gIH1cblxuICB1cGRhdGVDYWxjdWxhdGVkVmFsdWUoKSB7XG4gICAgaWYgKHRoaXMuY2FsY3VsYXRvcikge1xuICAgICAgY29uc3QgX3ZhbCA9IHRoaXMuY2FsY3VsYXRvci5jYWxsKEV4cHJlc3Npb25SdW5uZXIsIHt9KTtcbiAgICAgIHRoaXMuc2V0VmFsdWUoX3ZhbCk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXJIaWRpbmdGbnMoKSB7XG4gICAgdGhpcy5oaWRlckhlbHBlci5jbGVhckhpZGVyc0ZvckNvbnRyb2wodGhpcyk7XG4gIH1cblxuICB1cGRhdGVIaWRkZW5TdGF0ZSgpIHtcbiAgICB0aGlzLmhpZGVySGVscGVyLmV2YWx1YXRlQ29udHJvbEhpZGVycyh0aGlzKTtcbiAgfVxuXG4gIHNldERpc2FibGluZ0ZuKG5ld0Rpc2FibGVyOiBEaXNhYmxlcikge1xuICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuc2V0RGlzYWJsZXJGb3JDb250cm9sKHRoaXMsIG5ld0Rpc2FibGVyKTtcbiAgfVxuXG4gIGNsZWFyRGlzYWJsaW5nRm5zKCkge1xuICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuY2xlYXJEaXNhYmxlcnNGb3JDb250cm9sKHRoaXMpO1xuICB9XG5cbiAgdXBkYXRlRGlzYWJsZWRTdGF0ZSgpIHtcbiAgICB0aGlzLmRpc2FibGVySGVscGVyLmV2YWx1YXRlQ29udHJvbERpc2FibGVycyh0aGlzKTtcbiAgfVxuXG4gIHNldEFsZXJ0Rm4obmV3SGlkZXI6IEFsZXJ0KSB7XG4gICAgdGhpcy5BbGVydEhlbHBlci5zZXRBbGVydHNGb3JDb250cm9sKHRoaXMsIG5ld0hpZGVyKTtcbiAgfVxuXG4gIGNsZWFyTWVzc2FnZUZucygpIHtcbiAgICB0aGlzLkFsZXJ0SGVscGVyLmNsZWFyQWxlcnRzRm9yQ29udHJvbCh0aGlzKTtcbiAgfVxuXG4gIHVwZGF0ZUFsZXJ0KCkge1xuICAgIHRoaXMuQWxlcnRIZWxwZXIuZXZhbHVhdGVDb250cm9sQWxlcnRzKHRoaXMpO1xuICB9XG5cbiAgYWRkVmFsdWVDaGFuZ2VMaXN0ZW5lcihmdW5jOiBhbnkpIHtcbiAgICB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyID0gZnVuYztcbiAgfVxuXG4gIGZpcmVWYWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyICYmXG4gICAgICB0eXBlb2YgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICkge1xuICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0VmFsdWUodmFsdWU6IGFueSkge1xuICAgIHN1cGVyLnNldFZhbHVlKHZhbHVlKTtcbiAgfVxufVxuZXhwb3J0IHsgQWZlRm9ybUNvbnRyb2wgfTtcbiJdfQ==