/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FormArray } from '@angular/forms';
import { ControlRelations } from '../change-tracking/control-relations';
import { HiderHelper } from '../form-entry/control-hiders-disablers/hider-helpers';
import { AlertHelper } from '../form-entry/control-alerts/alert-helpers';
import { DisablerHelper } from '../form-entry/control-hiders-disablers/disabler-helper';
export class AfeFormArray extends FormArray {
    /**
     * @param {?} controls
     * @param {?=} validator
     * @param {?=} asyncValidator
     */
    constructor(controls, validator, asyncValidator) {
        super(controls, validator, asyncValidator);
        this.hiderHelper = new HiderHelper();
        this.AlertHelper = new AlertHelper();
        this.disablerHelper = new DisablerHelper();
        this._controlRelations = new ControlRelations(this);
        this.hiders = [];
        this.alerts = [];
        this.disablers = [];
        this.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            if (this._previousValue !== value) {
                this.fireValueChangeListener(value);
                this._previousValue = value;
            }
        }));
    }
    /**
     * @return {?}
     */
    get uuid() {
        return this._uuid;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set uuid(val) {
        this._uuid = val;
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
        super.setValue([]);
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
     * @param {?} func
     * @return {?}
     */
    addValueChangeListener(func) {
        this._valueChangeListener = func;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    fireValueChangeListener(value) {
        if (this.alerts.length > 0) {
            this.updateAlert();
        }
        if (this._valueChangeListener && typeof this._valueChangeListener === 'function') {
            this._valueChangeListener(value);
        }
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
    AfeFormArray.prototype._controlRelations;
    /**
     * @type {?}
     * @private
     */
    AfeFormArray.prototype._valueChangeListener;
    /**
     * @type {?}
     * @private
     */
    AfeFormArray.prototype._previousValue;
    /**
     * @type {?}
     * @private
     */
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
    /**
     * @type {?}
     * @private
     */
    AfeFormArray.prototype.hiderHelper;
    /**
     * @type {?}
     * @private
     */
    AfeFormArray.prototype.AlertHelper;
    /**
     * @type {?}
     * @private
     */
    AfeFormArray.prototype.disablerHelper;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tYXJyYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJhYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tYXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWtELE1BQU0sZ0JBQWdCLENBQUM7QUFFM0YsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFLeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ25GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFHeEYsTUFBTSxtQkFBb0IsU0FBUSxTQUFTOzs7Ozs7SUFtQnZDLFlBQVksUUFBMkIsRUFBRSxTQUF1QixFQUFFLGNBQWlDO1FBQy9GLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBTHZDLGdCQUFXLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFDN0MsZ0JBQVcsR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUM3QyxtQkFBYyxHQUFtQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBSTFELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUzs7OztRQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDcEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLENB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QzFCLENBQUM7Q0FFSjs7Ozs7O0lBOUdHLHlDQUE0Qzs7Ozs7SUFDNUMsNENBQWtDOzs7OztJQUNsQyxzQ0FBdUI7Ozs7O0lBQ3ZCLDZCQUFzQjs7SUFDdEIsb0NBQTRCOztJQUU1Qiw4QkFBYzs7SUFDZCw4QkFBZ0I7O0lBRWhCLDZCQUFjOztJQUNkLDhCQUFnQjs7SUFFaEIsaUNBQXNCOzs7OztJQUV0QixtQ0FBcUQ7Ozs7O0lBQ3JELG1DQUFxRDs7Ozs7SUFDckQsc0NBQThEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUFycmF5LCBWYWxpZGF0b3JGbiwgQXN5bmNWYWxpZGF0b3JGbiwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb25zIH0gZnJvbSAnLi4vY2hhbmdlLXRyYWNraW5nL2NvbnRyb2wtcmVsYXRpb25zJztcbmltcG9ydCB7IFZhbHVlQ2hhbmdlTGlzdGVuZXIgfSBmcm9tICcuL3ZhbHVlLWNoYW5nZS5saXN0ZW5lcic7XG5pbXBvcnQgeyBDYW5IaWRlLCBIaWRlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcbmltcG9ydCB7IENhbkdlbmVyYXRlQWxlcnQsIEFsZXJ0IH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWFsZXJ0cy9jYW4tZ2VuZXJhdGUtYWxlcnQnO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgRGlzYWJsZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XG5pbXBvcnQgeyBIaWRlckhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2hpZGVyLWhlbHBlcnMnO1xuaW1wb3J0IHsgQWxlcnRIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtYWxlcnRzL2FsZXJ0LWhlbHBlcnMnO1xuaW1wb3J0IHsgRGlzYWJsZXJIZWxwZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9kaXNhYmxlci1oZWxwZXInO1xuXG5cbmV4cG9ydCBjbGFzcyBBZmVGb3JtQXJyYXkgZXh0ZW5kcyBGb3JtQXJyYXkgaW1wbGVtZW50cyBDYW5IaWRlLCBDYW5EaXNhYmxlLCBDYW5HZW5lcmF0ZUFsZXJ0LCBWYWx1ZUNoYW5nZUxpc3RlbmVyIHtcbiAgICBwcml2YXRlIF9jb250cm9sUmVsYXRpb25zOiBDb250cm9sUmVsYXRpb25zO1xuICAgIHByaXZhdGUgX3ZhbHVlQ2hhbmdlTGlzdGVuZXI6IGFueTtcbiAgICBwcml2YXRlIF9wcmV2aW91c1ZhbHVlO1xuICAgIHByaXZhdGUgX3V1aWQ6IHN0cmluZztcbiAgICBwdWJsaWMgcGF0aEZyb21Sb290OiBzdHJpbmc7XG5cbiAgICBoaWRkZW46IGZhbHNlO1xuICAgIGhpZGVyczogSGlkZXJbXTtcblxuICAgIGFsZXJ0OiBzdHJpbmc7XG4gICAgYWxlcnRzOiBBbGVydFtdO1xuXG4gICAgZGlzYWJsZXJzOiBEaXNhYmxlcltdO1xuXG4gICAgcHJpdmF0ZSBoaWRlckhlbHBlcjogSGlkZXJIZWxwZXIgPSBuZXcgSGlkZXJIZWxwZXIoKTtcbiAgICBwcml2YXRlIEFsZXJ0SGVscGVyOiBBbGVydEhlbHBlciA9IG5ldyBBbGVydEhlbHBlcigpO1xuICAgIHByaXZhdGUgZGlzYWJsZXJIZWxwZXI6IERpc2FibGVySGVscGVyID0gbmV3IERpc2FibGVySGVscGVyKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250cm9sczogQWJzdHJhY3RDb250cm9sW10sIHZhbGlkYXRvcj86IFZhbGlkYXRvckZuLCBhc3luY1ZhbGlkYXRvcj86IEFzeW5jVmFsaWRhdG9yRm4pIHtcbiAgICAgICAgc3VwZXIoY29udHJvbHMsIHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xuICAgICAgICB0aGlzLl9jb250cm9sUmVsYXRpb25zID0gbmV3IENvbnRyb2xSZWxhdGlvbnModGhpcyk7XG4gICAgICAgIHRoaXMuaGlkZXJzID0gW107XG4gICAgICAgIHRoaXMuYWxlcnRzID0gW107XG4gICAgICAgIHRoaXMuZGlzYWJsZXJzID0gW107XG5cbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9wcmV2aW91c1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5maXJlVmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLl9wcmV2aW91c1ZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgdXVpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXVpZDtcbiAgICB9XG4gICAgc2V0IHV1aWQodmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fdXVpZCA9IHZhbDtcbiAgICB9XG5cbiAgICBnZXQgY29udHJvbFJlbGF0aW9ucygpOiBDb250cm9sUmVsYXRpb25zIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnM7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5oaWRlQ29udHJvbCh0aGlzKTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLmhpZGVySGVscGVyLnNob3dDb250cm9sKHRoaXMpO1xuICAgIH1cblxuICAgIGRpc2FibGUocGFyYW0/OiB7IG9ubHlTZWxmPzogYm9vbGVhbiwgZW1pdEV2ZW50PzogYm9vbGVhbiB9KSB7XG4gICAgICAgIHN1cGVyLmRpc2FibGUocGFyYW0pO1xuICAgICAgICBzdXBlci5zZXRWYWx1ZShbXSk7XG4gICAgfVxuXG4gICAgc2V0SGlkaW5nRm4obmV3SGlkZXI6IEhpZGVyKSB7XG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuc2V0SGlkZXJGb3JDb250cm9sKHRoaXMsIG5ld0hpZGVyKTtcbiAgICB9XG5cbiAgICBjbGVhckhpZGluZ0ZucygpIHtcbiAgICAgICAgdGhpcy5oaWRlckhlbHBlci5jbGVhckhpZGVyc0ZvckNvbnRyb2wodGhpcyk7XG4gICAgfVxuXG4gICAgdXBkYXRlSGlkZGVuU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuZXZhbHVhdGVDb250cm9sSGlkZXJzKHRoaXMpO1xuICAgIH1cblxuICAgIHNldERpc2FibGluZ0ZuKG5ld0Rpc2FibGVyOiBEaXNhYmxlcikge1xuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLnNldERpc2FibGVyRm9yQ29udHJvbCh0aGlzLCBuZXdEaXNhYmxlcik7XG4gICAgfVxuXG4gICAgY2xlYXJEaXNhYmxpbmdGbnMoKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuY2xlYXJEaXNhYmxlcnNGb3JDb250cm9sKHRoaXMpO1xuICAgIH1cblxuICAgIHVwZGF0ZURpc2FibGVkU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZXJIZWxwZXIuZXZhbHVhdGVDb250cm9sRGlzYWJsZXJzKHRoaXMpO1xuICAgIH1cblxuICAgIHNldEFsZXJ0Rm4obmV3SGlkZXI6IEFsZXJ0KSB7XG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuc2V0QWxlcnRzRm9yQ29udHJvbCh0aGlzLCBuZXdIaWRlcik7XG4gICAgfVxuXG4gICAgY2xlYXJNZXNzYWdlRm5zKCkge1xuICAgICAgICB0aGlzLkFsZXJ0SGVscGVyLmNsZWFyQWxlcnRzRm9yQ29udHJvbCh0aGlzKTtcbiAgICB9XG5cbiAgICAgdXBkYXRlQWxlcnQoKSB7XG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuZXZhbHVhdGVDb250cm9sQWxlcnRzKHRoaXMpO1xuICAgIH1cblxuICAgIGFkZFZhbHVlQ2hhbmdlTGlzdGVuZXIoZnVuYzogYW55KSB7XG4gICAgICB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyID0gZnVuYztcbiAgICB9XG5cbiAgICBmaXJlVmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZTogYW55KSB7XG4gICAgICBpZiAodGhpcy5hbGVydHMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUFsZXJ0KCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciAmJiB0eXBlb2YgdGhpcy5fdmFsdWVDaGFuZ2VMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl92YWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHN1cGVyLnNldFZhbHVlKHZhbHVlKTtcbiAgICB9XG5cbn1cbiJdfQ==