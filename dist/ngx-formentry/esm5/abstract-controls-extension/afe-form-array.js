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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tYXJyYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImFic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1hcnJheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFJVixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBY3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNuRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBRXhGO0lBQ1Usd0NBQVM7SUFvQmpCLHNCQUNFLFFBQTJCLEVBQzNCLFNBQXVCLEVBQ3ZCLGNBQWlDO1FBSG5DLFlBS0Usa0JBQU0sUUFBUSxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsU0FZM0M7UUFyQk8saUJBQVcsR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUM3QyxpQkFBVyxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQzdDLG9CQUFjLEdBQW1CLElBQUksY0FBYyxFQUFFLENBQUM7UUFRNUQsS0FBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksZ0JBQWdCLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDcEQsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFcEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFLO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztn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USxZQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUF2SEQsQ0FDVSxTQUFTLEdBc0hsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEZvcm1BcnJheSxcbiAgVmFsaWRhdG9yRm4sXG4gIEFzeW5jVmFsaWRhdG9yRm4sXG4gIEFic3RyYWN0Q29udHJvbFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnMgfSBmcm9tICcuLi9jaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMnO1xuaW1wb3J0IHsgVmFsdWVDaGFuZ2VMaXN0ZW5lciB9IGZyb20gJy4vdmFsdWUtY2hhbmdlLmxpc3RlbmVyJztcbmltcG9ydCB7XG4gIENhbkhpZGUsXG4gIEhpZGVyXG59IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcbmltcG9ydCB7XG4gIENhbkdlbmVyYXRlQWxlcnQsXG4gIEFsZXJ0XG59IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1hbGVydHMvY2FuLWdlbmVyYXRlLWFsZXJ0JztcbmltcG9ydCB7XG4gIENhbkRpc2FibGUsXG4gIERpc2FibGVyXG59IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1kaXNhYmxlJztcbmltcG9ydCB7IEhpZGVySGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvaGlkZXItaGVscGVycyc7XG5pbXBvcnQgeyBBbGVydEhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1hbGVydHMvYWxlcnQtaGVscGVycyc7XG5pbXBvcnQgeyBEaXNhYmxlckhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Rpc2FibGVyLWhlbHBlcic7XG5cbmV4cG9ydCBjbGFzcyBBZmVGb3JtQXJyYXlcbiAgZXh0ZW5kcyBGb3JtQXJyYXlcbiAgaW1wbGVtZW50cyBDYW5IaWRlLCBDYW5EaXNhYmxlLCBDYW5HZW5lcmF0ZUFsZXJ0LCBWYWx1ZUNoYW5nZUxpc3RlbmVyIHtcbiAgcHJpdmF0ZSBfY29udHJvbFJlbGF0aW9uczogQ29udHJvbFJlbGF0aW9ucztcbiAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VMaXN0ZW5lcjogYW55O1xuICBwcml2YXRlIF9wcmV2aW91c1ZhbHVlO1xuICBwcml2YXRlIF91dWlkOiBzdHJpbmc7XG4gIHB1YmxpYyBwYXRoRnJvbVJvb3Q6IHN0cmluZztcblxuICBoaWRkZW46IGZhbHNlO1xuICBoaWRlcnM6IEhpZGVyW107XG5cbiAgYWxlcnQ6IHN0cmluZztcbiAgYWxlcnRzOiBBbGVydFtdO1xuXG4gIGRpc2FibGVyczogRGlzYWJsZXJbXTtcblxuICBwcml2YXRlIGhpZGVySGVscGVyOiBIaWRlckhlbHBlciA9IG5ldyBIaWRlckhlbHBlcigpO1xuICBwcml2YXRlIEFsZXJ0SGVscGVyOiBBbGVydEhlbHBlciA9IG5ldyBBbGVydEhlbHBlcigpO1xuICBwcml2YXRlIGRpc2FibGVySGVscGVyOiBEaXNhYmxlckhlbHBlciA9IG5ldyBEaXNhYmxlckhlbHBlcigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNvbnRyb2xzOiBBYnN0cmFjdENvbnRyb2xbXSxcbiAgICB2YWxpZGF0b3I/OiBWYWxpZGF0b3JGbixcbiAgICBhc3luY1ZhbGlkYXRvcj86IEFzeW5jVmFsaWRhdG9yRm5cbiAgKSB7XG4gICAgc3VwZXIoY29udHJvbHMsIHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xuICAgIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnMgPSBuZXcgQ29udHJvbFJlbGF0aW9ucyh0aGlzKTtcbiAgICB0aGlzLmhpZGVycyA9IFtdO1xuICAgIHRoaXMuYWxlcnRzID0gW107XG4gICAgdGhpcy5kaXNhYmxlcnMgPSBbXTtcblxuICAgIHRoaXMudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgIGlmICh0aGlzLl9wcmV2aW91c1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICB0aGlzLmZpcmVWYWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fcHJldmlvdXNWYWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHV1aWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdXVpZDtcbiAgfVxuICBzZXQgdXVpZCh2YWw6IHN0cmluZykge1xuICAgIHRoaXMuX3V1aWQgPSB2YWw7XG4gIH1cblxuICBnZXQgY29udHJvbFJlbGF0aW9ucygpOiBDb250cm9sUmVsYXRpb25zIHtcbiAgICByZXR1cm4gdGhpcy5fY29udHJvbFJlbGF0aW9ucztcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5oaWRlckhlbHBlci5oaWRlQ29udHJvbCh0aGlzKTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgdGhpcy5oaWRlckhlbHBlci5zaG93Q29udHJvbCh0aGlzKTtcbiAgfVxuXG4gIGRpc2FibGUocGFyYW0/OiB7IG9ubHlTZWxmPzogYm9vbGVhbjsgZW1pdEV2ZW50PzogYm9vbGVhbiB9KSB7XG4gICAgc3VwZXIuZGlzYWJsZShwYXJhbSk7XG4gICAgc3VwZXIuc2V0VmFsdWUoW10pO1xuICB9XG5cbiAgc2V0SGlkaW5nRm4obmV3SGlkZXI6IEhpZGVyKSB7XG4gICAgdGhpcy5oaWRlckhlbHBlci5zZXRIaWRlckZvckNvbnRyb2wodGhpcywgbmV3SGlkZXIpO1xuICB9XG5cbiAgY2xlYXJIaWRpbmdGbnMoKSB7XG4gICAgdGhpcy5oaWRlckhlbHBlci5jbGVhckhpZGVyc0ZvckNvbnRyb2wodGhpcyk7XG4gIH1cblxuICB1cGRhdGVIaWRkZW5TdGF0ZSgpIHtcbiAgICB0aGlzLmhpZGVySGVscGVyLmV2YWx1YXRlQ29udHJvbEhpZGVycyh0aGlzKTtcbiAgfVxuXG4gIHNldERpc2FibGluZ0ZuKG5ld0Rpc2FibGVyOiBEaXNhYmxlcikge1xuICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuc2V0RGlzYWJsZXJGb3JDb250cm9sKHRoaXMsIG5ld0Rpc2FibGVyKTtcbiAgfVxuXG4gIGNsZWFyRGlzYWJsaW5nRm5zKCkge1xuICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuY2xlYXJEaXNhYmxlcnNGb3JDb250cm9sKHRoaXMpO1xuICB9XG5cbiAgdXBkYXRlRGlzYWJsZWRTdGF0ZSgpIHtcbiAgICB0aGlzLmRpc2FibGVySGVscGVyLmV2YWx1YXRlQ29udHJvbERpc2FibGVycyh0aGlzKTtcbiAgfVxuXG4gIHNldEFsZXJ0Rm4obmV3SGlkZXI6IEFsZXJ0KSB7XG4gICAgdGhpcy5BbGVydEhlbHBlci5zZXRBbGVydHNGb3JDb250cm9sKHRoaXMsIG5ld0hpZGVyKTtcbiAgfVxuXG4gIGNsZWFyTWVzc2FnZUZucygpIHtcbiAgICB0aGlzLkFsZXJ0SGVscGVyLmNsZWFyQWxlcnRzRm9yQ29udHJvbCh0aGlzKTtcbiAgfVxuXG4gIHVwZGF0ZUFsZXJ0KCkge1xuICAgIHRoaXMuQWxlcnRIZWxwZXIuZXZhbHVhdGVDb250cm9sQWxlcnRzKHRoaXMpO1xuICB9XG5cbiAgYWRkVmFsdWVDaGFuZ2VMaXN0ZW5lcihmdW5jOiBhbnkpIHtcbiAgICB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyID0gZnVuYztcbiAgfVxuXG4gIGZpcmVWYWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5hbGVydHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy51cGRhdGVBbGVydCgpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyICYmXG4gICAgICB0eXBlb2YgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICkge1xuICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0VmFsdWUodmFsdWU6IGFueSkge1xuICAgIHN1cGVyLnNldFZhbHVlKHZhbHVlKTtcbiAgfVxufVxuIl19