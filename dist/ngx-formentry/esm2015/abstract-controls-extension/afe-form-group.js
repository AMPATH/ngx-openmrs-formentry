/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FormGroup } from '@angular/forms';
import { ControlRelations } from '../change-tracking/control-relations';
import { HiderHelper } from '../form-entry/control-hiders-disablers/hider-helpers';
import { DisablerHelper } from '../form-entry/control-hiders-disablers/disabler-helper';
import { AlertHelper } from '../form-entry/control-alerts/alert-helpers';
import { Subject } from 'rxjs';
export class AfeFormGroup extends FormGroup {
    /**
     * @param {?} controls
     * @param {?=} validator
     * @param {?=} asyncValidator
     */
    constructor(controls, validator, asyncValidator) {
        super(controls, validator, asyncValidator);
        this.hiddenStatusChanges = new Subject();
        this.disabledStatusChanges = new Subject();
        this.touchedStatusChanges = new Subject();
        this.hiderHelper = new HiderHelper();
        this.disablerHelper = new DisablerHelper();
        this.AlertHelper = new AlertHelper();
        this._controlRelations = new ControlRelations(this);
        this.hiders = [];
        this.disablers = [];
        this.alerts = [];
    }
    /**
     * @return {?}
     */
    get controlRelations() {
        return this._controlRelations;
    }
    /**
     * @return {?}
     */
    hide() {
        this.hiderHelper.hideControl(this);
    }
    /**
     * @return {?}
     */
    show() {
        this.hiderHelper.showControl(this);
    }
    /**
     * @param {?=} param
     * @return {?}
     */
    disable(param) {
        super.disable(param);
        super.setValue({});
        this.disabledStatusChanges.next(true);
    }
    /**
     * @param {?=} param
     * @return {?}
     */
    enable(param) {
        super.enable(param);
        this.disabledStatusChanges.next(false);
    }
    /**
     * @param {?=} opts
     * @return {?}
     */
    markAsTouched(opts = {}) {
        super.markAsTouched(opts);
        this.touchedStatusChanges.next(true);
    }
    /**
     * @param {?=} opts
     * @return {?}
     */
    markAsUntouched(opts = {}) {
        super.markAsUntouched(opts);
        this.touchedStatusChanges.next(false);
    }
    /**
     * @param {?} newHider
     * @return {?}
     */
    setHidingFn(newHider) {
        this.hiderHelper.setHiderForControl(this, newHider);
    }
    /**
     * @return {?}
     */
    clearHidingFns() {
        this.hiderHelper.clearHidersForControl(this);
    }
    /**
     * @return {?}
     */
    updateHiddenState() {
        this.hiderHelper.evaluateControlHiders(this);
    }
    /**
     * @param {?} newDisabler
     * @return {?}
     */
    setDisablingFn(newDisabler) {
        this.disablerHelper.setDisablerForControl(this, newDisabler);
    }
    /**
     * @return {?}
     */
    clearDisablingFns() {
        this.disablerHelper.clearDisablersForControl(this);
    }
    /**
     * @return {?}
     */
    updateDisabledState() {
        this.disablerHelper.evaluateControlDisablers(this);
    }
    /**
     * @param {?} newHider
     * @return {?}
     */
    setAlertFn(newHider) {
        this.AlertHelper.setAlertsForControl(this, newHider);
    }
    /**
     * @return {?}
     */
    clearMessageFns() {
        this.AlertHelper.clearAlertsForControl(this);
    }
    /**
     * @return {?}
     */
    updateAlert() {
        this.AlertHelper.evaluateControlAlerts(this);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setValue(value) {
        super.setValue(value);
    }
}
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
    AfeFormGroup.prototype.hiddenStatusChanges;
    /** @type {?} */
    AfeFormGroup.prototype.disabledStatusChanges;
    /** @type {?} */
    AfeFormGroup.prototype.touchedStatusChanges;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tZ3JvdXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJhYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWtELE1BQU0sZ0JBQWdCLENBQUM7QUFFM0YsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFLeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ25GLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUN4RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDekUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUcvQixNQUFNLG1CQUFvQixTQUFRLFNBQVM7Ozs7OztJQW9CdkMsWUFBWSxRQUE0QyxFQUFFLFNBQXVCLEVBQUUsY0FBaUM7UUFDaEgsS0FBSyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFoQnhDLHdCQUFtQixHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO1FBQy9ELDBCQUFxQixHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO1FBQ2pFLHlCQUFvQixHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO1FBUy9ELGdCQUFXLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFDN0MsbUJBQWMsR0FBbUIsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUN0RCxnQkFBVyxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBSWpELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFT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Qjs7SUFDaEIsNkJBQWM7O0lBQ2QsOEJBQWdCOztJQUVoQixpQ0FBc0I7Ozs7O0lBRXRCLG1DQUFxRDs7Ozs7SUFDckQsc0NBQThEOzs7OztJQUM5RCxtQ0FBcUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtR3JvdXAsIFZhbGlkYXRvckZuLCBBc3luY1ZhbGlkYXRvckZuLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnMgfSBmcm9tICcuLi9jaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMnO1xuXG5pbXBvcnQgeyBDYW5IaWRlLCBIaWRlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcbmltcG9ydCB7IENhbkRpc2FibGUsIERpc2FibGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWRpc2FibGUnO1xuaW1wb3J0IHsgQ2FuR2VuZXJhdGVBbGVydCwgQWxlcnQgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2Nhbi1nZW5lcmF0ZS1hbGVydCc7XG5pbXBvcnQgeyBIaWRlckhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMnO1xuaW1wb3J0IHsgRGlzYWJsZXJIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9kaXNhYmxlci1oZWxwZXInO1xuaW1wb3J0IHsgQWxlcnRIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2FsZXJ0LWhlbHBlcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVG91Y2hhYmxlIH0gZnJvbSAnLi90b3VjaGFibGUnO1xuXG5leHBvcnQgY2xhc3MgQWZlRm9ybUdyb3VwIGV4dGVuZHMgRm9ybUdyb3VwIGltcGxlbWVudHMgQ2FuSGlkZSwgQ2FuRGlzYWJsZSwgVG91Y2hhYmxlLCBDYW5HZW5lcmF0ZUFsZXJ0IHtcbiAgICBwcml2YXRlIF9jb250cm9sUmVsYXRpb25zOiBDb250cm9sUmVsYXRpb25zO1xuXG4gICAgcHVibGljIHV1aWQ6IHN0cmluZztcbiAgICBwdWJsaWMgcGF0aEZyb21Sb290OiBzdHJpbmc7XG4gICAgcHVibGljIGhpZGRlblN0YXR1c0NoYW5nZXM6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICAgIHB1YmxpYyBkaXNhYmxlZFN0YXR1c0NoYW5nZXM6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICAgIHB1YmxpYyB0b3VjaGVkU3RhdHVzQ2hhbmdlczogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgICBoaWRkZW46IGZhbHNlO1xuICAgIGhpZGVyczogSGlkZXJbXTtcbiAgICBhbGVydDogc3RyaW5nO1xuICAgIGFsZXJ0czogQWxlcnRbXTtcblxuICAgIGRpc2FibGVyczogRGlzYWJsZXJbXTtcblxuICAgIHByaXZhdGUgaGlkZXJIZWxwZXI6IEhpZGVySGVscGVyID0gbmV3IEhpZGVySGVscGVyKCk7XG4gICAgcHJpdmF0ZSBkaXNhYmxlckhlbHBlcjogRGlzYWJsZXJIZWxwZXIgPSBuZXcgRGlzYWJsZXJIZWxwZXIoKTtcbiAgICBwcml2YXRlIEFsZXJ0SGVscGVyOiBBbGVydEhlbHBlciA9IG5ldyBBbGVydEhlbHBlcigpO1xuXG4gICAgY29uc3RydWN0b3IoY29udHJvbHM6IHsgW2tleTogc3RyaW5nXTogQWJzdHJhY3RDb250cm9sIH0sIHZhbGlkYXRvcj86IFZhbGlkYXRvckZuLCBhc3luY1ZhbGlkYXRvcj86IEFzeW5jVmFsaWRhdG9yRm4pIHtcbiAgICAgICAgc3VwZXIoY29udHJvbHMsIHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xuICAgICAgICB0aGlzLl9jb250cm9sUmVsYXRpb25zID0gbmV3IENvbnRyb2xSZWxhdGlvbnModGhpcyk7XG4gICAgICAgIHRoaXMuaGlkZXJzID0gW107XG4gICAgICAgIHRoaXMuZGlzYWJsZXJzID0gW107XG4gICAgICAgIHRoaXMuYWxlcnRzID0gW107XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRyb2xSZWxhdGlvbnMoKTogQ29udHJvbFJlbGF0aW9ucyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250cm9sUmVsYXRpb25zO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuaGlkZUNvbnRyb2wodGhpcyk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5zaG93Q29udHJvbCh0aGlzKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlKHBhcmFtPzogeyBvbmx5U2VsZj86IGJvb2xlYW4sIGVtaXRFdmVudD86IGJvb2xlYW4gfSkge1xuICAgICAgICBzdXBlci5kaXNhYmxlKHBhcmFtKTtcbiAgICAgICAgc3VwZXIuc2V0VmFsdWUoe30pO1xuICAgICAgICB0aGlzLmRpc2FibGVkU3RhdHVzQ2hhbmdlcy5uZXh0KHRydWUpO1xuICAgIH1cblxuICAgIGVuYWJsZShwYXJhbT86IHsgb25seVNlbGY/OiBib29sZWFuLCBlbWl0RXZlbnQ/OiBib29sZWFuIH0pIHtcbiAgICAgICAgc3VwZXIuZW5hYmxlKHBhcmFtKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlZFN0YXR1c0NoYW5nZXMubmV4dChmYWxzZSk7XG4gICAgfVxuXG4gICAgbWFya0FzVG91Y2hlZChvcHRzOiB7IG9ubHlTZWxmPzogYm9vbGVhbjsgfSA9IHt9KTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm1hcmtBc1RvdWNoZWQob3B0cyk7XG4gICAgICAgIHRoaXMudG91Y2hlZFN0YXR1c0NoYW5nZXMubmV4dCh0cnVlKTtcbiAgICB9XG5cbiAgICBtYXJrQXNVbnRvdWNoZWQob3B0czogeyBvbmx5U2VsZj86IGJvb2xlYW47IH0gPSB7fSk6IHZvaWQge1xuICAgICAgICBzdXBlci5tYXJrQXNVbnRvdWNoZWQob3B0cyk7XG4gICAgICAgIHRoaXMudG91Y2hlZFN0YXR1c0NoYW5nZXMubmV4dChmYWxzZSk7XG4gICAgfVxuXG4gICAgc2V0SGlkaW5nRm4obmV3SGlkZXI6IEhpZGVyKSB7XG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuc2V0SGlkZXJGb3JDb250cm9sKHRoaXMsIG5ld0hpZGVyKTtcbiAgICB9XG5cbiAgICBjbGVhckhpZGluZ0ZucygpIHtcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5jbGVhckhpZGVyc0ZvckNvbnRyb2wodGhpcyk7XG4gICAgfVxuXG4gICAgdXBkYXRlSGlkZGVuU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuZXZhbHVhdGVDb250cm9sSGlkZXJzKHRoaXMpO1xuICAgIH1cblxuICAgIHNldERpc2FibGluZ0ZuKG5ld0Rpc2FibGVyOiBEaXNhYmxlcikge1xuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLnNldERpc2FibGVyRm9yQ29udHJvbCh0aGlzLCBuZXdEaXNhYmxlcik7XG4gICAgfVxuXG4gICAgY2xlYXJEaXNhYmxpbmdGbnMoKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuY2xlYXJEaXNhYmxlcnNGb3JDb250cm9sKHRoaXMpO1xuICAgIH1cblxuICAgIHVwZGF0ZURpc2FibGVkU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuZXZhbHVhdGVDb250cm9sRGlzYWJsZXJzKHRoaXMpO1xuICAgIH1cblxuICAgIHNldEFsZXJ0Rm4obmV3SGlkZXI6IEFsZXJ0KSB7XG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuc2V0QWxlcnRzRm9yQ29udHJvbCh0aGlzLCBuZXdIaWRlcik7XG4gICAgfVxuXG4gICAgY2xlYXJNZXNzYWdlRm5zKCkge1xuICAgICAgICB0aGlzLkFsZXJ0SGVscGVyLmNsZWFyQWxlcnRzRm9yQ29udHJvbCh0aGlzKTtcbiAgICB9XG5cbiAgICAgdXBkYXRlQWxlcnQoKSB7XG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuZXZhbHVhdGVDb250cm9sQWxlcnRzKHRoaXMpO1xuICAgIH1cbiAgICBzZXRWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHN1cGVyLnNldFZhbHVlKHZhbHVlKTtcbiAgICB9XG5cbn1cbiJdfQ==