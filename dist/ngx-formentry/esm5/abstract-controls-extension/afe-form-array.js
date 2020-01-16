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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tYXJyYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImFic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1hcnJheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBa0QsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUt4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDbkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUd4RjtJQUFrQyx3Q0FBUztJQW1CdkMsc0JBQVksUUFBMkIsRUFBRSxTQUF1QixFQUFFLGNBQWlDO1FBQW5HLFlBQ0ksa0JBQU0sUUFBUSxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsU0FZN0M7UUFqQk8saUJBQVcsR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUM3QyxpQkFBVyxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQzdDLG9CQUFjLEdBQW1CLElBQUksY0FBYyxFQUFFLENBQUM7UUFJMUQsS0FBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksZ0JBQWdCLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDcEQsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFcEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFLO1lBQ2hDLElBQUksS0FBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLEVBQUU7Z0JBQ2pDLEtBQUksQ0FBQyx1QkFB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Q29udGVudCI6WyJpbXBvcnQgeyBGb3JtQXJyYXksIFZhbGlkYXRvckZuLCBBc3luY1ZhbGlkYXRvckZuLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnMgfSBmcm9tICcuLi9jaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMnO1xuaW1wb3J0IHsgVmFsdWVDaGFuZ2VMaXN0ZW5lciB9IGZyb20gJy4vdmFsdWUtY2hhbmdlLmxpc3RlbmVyJztcbmltcG9ydCB7IENhbkhpZGUsIEhpZGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWhpZGUnO1xuaW1wb3J0IHsgQ2FuR2VuZXJhdGVBbGVydCwgQWxlcnQgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2Nhbi1nZW5lcmF0ZS1hbGVydCc7XG5pbXBvcnQgeyBDYW5EaXNhYmxlLCBEaXNhYmxlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1kaXNhYmxlJztcbmltcG9ydCB7IEhpZGVySGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvaGlkZXItaGVscGVycyc7XG5pbXBvcnQgeyBBbGVydEhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1hbGVydHMvYWxlcnQtaGVscGVycyc7XG5pbXBvcnQgeyBEaXNhYmxlckhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Rpc2FibGVyLWhlbHBlcic7XG5cblxuZXhwb3J0IGNsYXNzIEFmZUZvcm1BcnJheSBleHRlbmRzIEZvcm1BcnJheSBpbXBsZW1lbnRzIENhbkhpZGUsIENhbkRpc2FibGUsIENhbkdlbmVyYXRlQWxlcnQsIFZhbHVlQ2hhbmdlTGlzdGVuZXIge1xuICAgIHByaXZhdGUgX2NvbnRyb2xSZWxhdGlvbnM6IENvbnRyb2xSZWxhdGlvbnM7XG4gICAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VMaXN0ZW5lcjogYW55O1xuICAgIHByaXZhdGUgX3ByZXZpb3VzVmFsdWU7XG4gICAgcHJpdmF0ZSBfdXVpZDogc3RyaW5nO1xuICAgIHB1YmxpYyBwYXRoRnJvbVJvb3Q6IHN0cmluZztcblxuICAgIGhpZGRlbjogZmFsc2U7XG4gICAgaGlkZXJzOiBIaWRlcltdO1xuXG4gICAgYWxlcnQ6IHN0cmluZztcbiAgICBhbGVydHM6IEFsZXJ0W107XG5cbiAgICBkaXNhYmxlcnM6IERpc2FibGVyW107XG5cbiAgICBwcml2YXRlIGhpZGVySGVscGVyOiBIaWRlckhlbHBlciA9IG5ldyBIaWRlckhlbHBlcigpO1xuICAgIHByaXZhdGUgQWxlcnRIZWxwZXI6IEFsZXJ0SGVscGVyID0gbmV3IEFsZXJ0SGVscGVyKCk7XG4gICAgcHJpdmF0ZSBkaXNhYmxlckhlbHBlcjogRGlzYWJsZXJIZWxwZXIgPSBuZXcgRGlzYWJsZXJIZWxwZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2xzOiBBYnN0cmFjdENvbnRyb2xbXSwgdmFsaWRhdG9yPzogVmFsaWRhdG9yRm4sIGFzeW5jVmFsaWRhdG9yPzogQXN5bmNWYWxpZGF0b3JGbikge1xuICAgICAgICBzdXBlcihjb250cm9scywgdmFsaWRhdG9yLCBhc3luY1ZhbGlkYXRvcik7XG4gICAgICAgIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnMgPSBuZXcgQ29udHJvbFJlbGF0aW9ucyh0aGlzKTtcbiAgICAgICAgdGhpcy5oaWRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5hbGVydHMgPSBbXTtcbiAgICAgICAgdGhpcy5kaXNhYmxlcnMgPSBbXTtcblxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX3ByZXZpb3VzVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmZpcmVWYWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCB1dWlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl91dWlkO1xuICAgIH1cbiAgICBzZXQgdXVpZCh2YWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLl91dWlkID0gdmFsO1xuICAgIH1cblxuICAgIGdldCBjb250cm9sUmVsYXRpb25zKCk6IENvbnRyb2xSZWxhdGlvbnMge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udHJvbFJlbGF0aW9ucztcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmhpZGVDb250cm9sKHRoaXMpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuc2hvd0NvbnRyb2wodGhpcyk7XG4gICAgfVxuXG4gICAgZGlzYWJsZShwYXJhbT86IHsgb25seVNlbGY/OiBib29sZWFuLCBlbWl0RXZlbnQ/OiBib29sZWFuIH0pIHtcbiAgICAgICAgc3VwZXIuZGlzYWJsZShwYXJhbSk7XG4gICAgICAgIHN1cGVyLnNldFZhbHVlKFtdKTtcbiAgICB9XG5cbiAgICBzZXRIaWRpbmdGbihuZXdIaWRlcjogSGlkZXIpIHtcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5zZXRIaWRlckZvckNvbnRyb2wodGhpcywgbmV3SGlkZXIpO1xuICAgIH1cblxuICAgIGNsZWFySGlkaW5nRm5zKCkge1xuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmNsZWFySGlkZXJzRm9yQ29udHJvbCh0aGlzKTtcbiAgICB9XG5cbiAgICB1cGRhdGVIaWRkZW5TdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5ldmFsdWF0ZUNvbnRyb2xIaWRlcnModGhpcyk7XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsaW5nRm4obmV3RGlzYWJsZXI6IERpc2FibGVyKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuc2V0RGlzYWJsZXJGb3JDb250cm9sKHRoaXMsIG5ld0Rpc2FibGVyKTtcbiAgICB9XG5cbiAgICBjbGVhckRpc2FibGluZ0ZucygpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlckhlbHBlci5jbGVhckRpc2FibGVyc0ZvckNvbnRyb2wodGhpcyk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGlzYWJsZWRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlckhlbHBlci5ldmFsdWF0ZUNvbnRyb2xEaXNhYmxlcnModGhpcyk7XG4gICAgfVxuXG4gICAgc2V0QWxlcnRGbihuZXdIaWRlcjogQWxlcnQpIHtcbiAgICAgICAgdGhpcy5BbGVydEhlbHBlci5zZXRBbGVydHNGb3JDb250cm9sKHRoaXMsIG5ld0hpZGVyKTtcbiAgICB9XG5cbiAgICBjbGVhck1lc3NhZ2VGbnMoKSB7XG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuY2xlYXJBbGVydHNGb3JDb250cm9sKHRoaXMpO1xuICAgIH1cblxuICAgICB1cGRhdGVBbGVydCgpIHtcbiAgICAgICAgdGhpcy5BbGVydEhlbHBlci5ldmFsdWF0ZUNvbnRyb2xBbGVydHModGhpcyk7XG4gICAgfVxuXG4gICAgYWRkVmFsdWVDaGFuZ2VMaXN0ZW5lcihmdW5jOiBhbnkpIHtcbiAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIgPSBmdW5jO1xuICAgIH1cblxuICAgIGZpcmVWYWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlOiBhbnkpIHtcbiAgICAgIGlmICh0aGlzLmFsZXJ0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMudXBkYXRlQWxlcnQoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyICYmIHR5cGVvZiB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIodmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNldFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgc3VwZXIuc2V0VmFsdWUodmFsdWUpO1xuICAgIH1cblxufVxuIl19