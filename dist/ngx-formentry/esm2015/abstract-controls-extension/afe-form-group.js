/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FormGroup } from '@angular/forms';
import { ControlRelations } from '../change-tracking/control-relations';
import { HiderHelper } from '../form-entry/control-hiders-disablers/hider-helpers';
import { DisablerHelper } from '../form-entry/control-hiders-disablers/disabler-helper';
import { AlertHelper } from '../form-entry/control-alerts/alert-helpers';
export class AfeFormGroup extends FormGroup {
    /**
     * @param {?} controls
     * @param {?=} validator
     * @param {?=} asyncValidator
     */
    constructor(controls, validator, asyncValidator) {
        super(controls, validator, asyncValidator);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tZ3JvdXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJhYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWtELE1BQU0sZ0JBQWdCLENBQUM7QUFFM0YsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFLeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ25GLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUN4RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFFekUsTUFBTSxtQkFBb0IsU0FBUSxTQUFTOzs7Ozs7SUFpQnZDLFlBQVksUUFBNEMsRUFBRSxTQUF1QixFQUFFLGNBQWlDO1FBQ2hILEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBTHZDLGdCQUFXLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFDN0MsbUJBQWMsR0FBbUIsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUN0RCxnQkFBVyxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBSWpELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7SUFFRCxJQUFJLGdCQUFnQjtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7OztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxLQUFtRDtRQUN2RCxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsUUFBZTtRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7O0lBRUQsY0FBYztRQUNWLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7OztJQUVELGlCQUFpQjtRQUNiLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Ozs7SUFFRCxjQUFjLENBQUMsV0FBcUI7UUFDaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDakUsQ0FBQzs7OztJQUVELGlCQUFpQjtRQUNiLElBQUksQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7OztJQUVELG1CQUFtQjtRQUNmLElBQUksQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsUUFBZTtRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN6RCxDQUFDOzs7O0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7OztJQUVBLFdBQVc7UUFDUixJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7O0lBQ0QsUUFBUSxDQUFDLEtBQVU7UUFDZixLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FFSjs7Ozs7O0lBaEZHLHlDQUE0Qzs7SUFFNUMsNEJBQW9COztJQUNwQixvQ0FBNEI7O0lBRTVCLDhCQUFjOztJQUNkLDhCQUFnQjs7SUFDaEIsNkJBQWM7O0lBQ2QsOEJBQWdCOztJQUVoQixpQ0FBc0I7Ozs7O0lBRXRCLG1DQUFxRDs7Ozs7SUFDckQsc0NBQThEOzs7OztJQUM5RCxtQ0FBcUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtR3JvdXAsIFZhbGlkYXRvckZuLCBBc3luY1ZhbGlkYXRvckZuLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb25zIH0gZnJvbSAnLi4vY2hhbmdlLXRyYWNraW5nL2NvbnRyb2wtcmVsYXRpb25zJztcclxuXHJcbmltcG9ydCB7IENhbkhpZGUsIEhpZGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWhpZGUnO1xyXG5pbXBvcnQgeyBDYW5EaXNhYmxlLCBEaXNhYmxlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1kaXNhYmxlJztcclxuaW1wb3J0IHsgQ2FuR2VuZXJhdGVBbGVydCwgQWxlcnQgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2Nhbi1nZW5lcmF0ZS1hbGVydCc7XHJcbmltcG9ydCB7IEhpZGVySGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvaGlkZXItaGVscGVycyc7XHJcbmltcG9ydCB7IERpc2FibGVySGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvZGlzYWJsZXItaGVscGVyJztcclxuaW1wb3J0IHsgQWxlcnRIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2FsZXJ0LWhlbHBlcnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFmZUZvcm1Hcm91cCBleHRlbmRzIEZvcm1Hcm91cCBpbXBsZW1lbnRzIENhbkhpZGUsIENhbkRpc2FibGUgLCBDYW5HZW5lcmF0ZUFsZXJ0IHtcclxuICAgIHByaXZhdGUgX2NvbnRyb2xSZWxhdGlvbnM6IENvbnRyb2xSZWxhdGlvbnM7XHJcblxyXG4gICAgcHVibGljIHV1aWQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBwYXRoRnJvbVJvb3Q6IHN0cmluZztcclxuXHJcbiAgICBoaWRkZW46IGZhbHNlO1xyXG4gICAgaGlkZXJzOiBIaWRlcltdO1xyXG4gICAgYWxlcnQ6IHN0cmluZztcclxuICAgIGFsZXJ0czogQWxlcnRbXTtcclxuXHJcbiAgICBkaXNhYmxlcnM6IERpc2FibGVyW107XHJcblxyXG4gICAgcHJpdmF0ZSBoaWRlckhlbHBlcjogSGlkZXJIZWxwZXIgPSBuZXcgSGlkZXJIZWxwZXIoKTtcclxuICAgIHByaXZhdGUgZGlzYWJsZXJIZWxwZXI6IERpc2FibGVySGVscGVyID0gbmV3IERpc2FibGVySGVscGVyKCk7XHJcbiAgICBwcml2YXRlIEFsZXJ0SGVscGVyOiBBbGVydEhlbHBlciA9IG5ldyBBbGVydEhlbHBlcigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2xzOiB7IFtrZXk6IHN0cmluZ106IEFic3RyYWN0Q29udHJvbCB9LCB2YWxpZGF0b3I/OiBWYWxpZGF0b3JGbiwgYXN5bmNWYWxpZGF0b3I/OiBBc3luY1ZhbGlkYXRvckZuKSB7XHJcbiAgICAgICAgc3VwZXIoY29udHJvbHMsIHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xyXG4gICAgICAgIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnMgPSBuZXcgQ29udHJvbFJlbGF0aW9ucyh0aGlzKTtcclxuICAgICAgICB0aGlzLmhpZGVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5hbGVydHMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29udHJvbFJlbGF0aW9ucygpOiBDb250cm9sUmVsYXRpb25zIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29udHJvbFJlbGF0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuaGlkZUNvbnRyb2wodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLnNob3dDb250cm9sKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGUocGFyYW0/OiB7IG9ubHlTZWxmPzogYm9vbGVhbiwgZW1pdEV2ZW50PzogYm9vbGVhbiB9KSB7XHJcbiAgICAgICAgc3VwZXIuZGlzYWJsZShwYXJhbSk7XHJcbiAgICAgICAgc3VwZXIuc2V0VmFsdWUoe30pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEhpZGluZ0ZuKG5ld0hpZGVyOiBIaWRlcikge1xyXG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuc2V0SGlkZXJGb3JDb250cm9sKHRoaXMsIG5ld0hpZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckhpZGluZ0ZucygpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmNsZWFySGlkZXJzRm9yQ29udHJvbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVIaWRkZW5TdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmV2YWx1YXRlQ29udHJvbEhpZGVycyh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNhYmxpbmdGbihuZXdEaXNhYmxlcjogRGlzYWJsZXIpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLnNldERpc2FibGVyRm9yQ29udHJvbCh0aGlzLCBuZXdEaXNhYmxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJEaXNhYmxpbmdGbnMoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlckhlbHBlci5jbGVhckRpc2FibGVyc0ZvckNvbnRyb2wodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRGlzYWJsZWRTdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLmV2YWx1YXRlQ29udHJvbERpc2FibGVycyh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBbGVydEZuKG5ld0hpZGVyOiBBbGVydCkge1xyXG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuc2V0QWxlcnRzRm9yQ29udHJvbCh0aGlzLCBuZXdIaWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJNZXNzYWdlRm5zKCkge1xyXG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuY2xlYXJBbGVydHNGb3JDb250cm9sKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgICB1cGRhdGVBbGVydCgpIHtcclxuICAgICAgICB0aGlzLkFsZXJ0SGVscGVyLmV2YWx1YXRlQ29udHJvbEFsZXJ0cyh0aGlzKTtcclxuICAgIH1cclxuICAgIHNldFZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICBzdXBlci5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==