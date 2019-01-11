/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FormControl } from '@angular/forms';
import { ControlRelations } from '../change-tracking/control-relations';
import { HiderHelper } from '../form-entry/control-hiders-disablers/hider-helpers';
import { AlertHelper } from '../form-entry/control-alerts/alert-helpers';
import { DisablerHelper } from '../form-entry/control-hiders-disablers/disabler-helper';
import { ExpressionRunner } from '../form-entry/expression-runner/expression-runner';
class AfeFormControl extends FormControl {
    /**
     * @param {?=} formState
     * @param {?=} validator
     * @param {?=} asyncValidator
     */
    constructor(formState, validator, asyncValidator) {
        super(formState, validator, asyncValidator);
        this.hidden = false;
        this.hiderHelper = new HiderHelper();
        this.disablerHelper = new DisablerHelper();
        this.AlertHelper = new AlertHelper();
        this._controlRelations = new ControlRelations(this);
        this.hiders = [];
        this.disablers = [];
        this.alerts = [];
        this.valueChanges.subscribe((value) => {
            if (this._previousValue !== value) {
                this.fireValueChangeListener(value);
                this._previousValue = value;
            }
        });
    }
    /**
     * @return {?}
     */
    get controlRelations() {
        return this._controlRelations;
    }
    /**
     * @param {?=} param
     * @return {?}
     */
    disable(param) {
        super.disable(param);
        super.setValue('');
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
     * @param {?} newHider
     * @return {?}
     */
    setHidingFn(newHider) {
        this.hiderHelper.setHiderForControl(this, newHider);
    }
    /**
     * @param {?} newCalculator
     * @return {?}
     */
    setCalculatorFn(newCalculator) {
        this.calculator = newCalculator;
    }
    /**
     * @return {?}
     */
    updateCalculatedValue() {
        if (this.calculator) {
            /** @type {?} */
            const _val = this.calculator.call(ExpressionRunner, {});
            this.setValue(_val);
        }
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
    AfeFormControl.prototype._controlRelations;
    /**
     * @type {?}
     * @private
     */
    AfeFormControl.prototype._valueChangeListener;
    /**
     * @type {?}
     * @private
     */
    AfeFormControl.prototype._previousValue;
    /** @type {?} */
    AfeFormControl.prototype.uuid;
    /** @type {?} */
    AfeFormControl.prototype.pathFromRoot;
    /** @type {?} */
    AfeFormControl.prototype.hidden;
    /** @type {?} */
    AfeFormControl.prototype.hiders;
    /** @type {?} */
    AfeFormControl.prototype.alert;
    /** @type {?} */
    AfeFormControl.prototype.alerts;
    /** @type {?} */
    AfeFormControl.prototype.calculator;
    /** @type {?} */
    AfeFormControl.prototype.disablers;
    /**
     * @type {?}
     * @private
     */
    AfeFormControl.prototype.hiderHelper;
    /**
     * @type {?}
     * @private
     */
    AfeFormControl.prototype.disablerHelper;
    /**
     * @type {?}
     * @private
     */
    AfeFormControl.prototype.AlertHelper;
}
export { AfeFormControl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImFic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsV0FBVyxFQUF5RCxNQUFNLGdCQUFnQixDQUFDO0FBRXBHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBS3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNuRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBRXhGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBRXJGLE1BQU0sY0FBZSxTQUFRLFdBQVc7Ozs7OztJQWlCcEMsWUFBWSxTQUFlLEVBQUUsU0FBdUUsRUFDaEcsY0FBNkQ7UUFDN0QsS0FBSyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFaaEQsV0FBTSxHQUFHLEtBQUssQ0FBQztRQU9QLGdCQUFXLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFDN0MsbUJBQWMsR0FBbUIsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUN0RCxnQkFBVyxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBSWpELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLEtBQUssRUFBRTtnQkFDL0IsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQzthQUMvQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELElBQUksZ0JBQWdCO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLEtBQW1EO1FBQ3ZELEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2QixDQUFDOzs7O0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsUUFBZTtRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7OztJQUVELGVBQWUsQ0FBQyxhQUF1QjtRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQztJQUNwQyxDQUFDOzs7O0lBRUQscUJBQXFCO1FBQ2pCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTs7a0JBQ1gsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQztZQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQzs7OztJQUVELGNBQWM7UUFDVixJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7SUFFRCxpQkFBaUI7UUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLFdBQXFCO1FBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Ozs7SUFFRCxpQkFBaUI7UUFDYixJQUFJLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7SUFFRCxtQkFBbUI7UUFDZixJQUFJLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLFFBQWU7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDekQsQ0FBQzs7OztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7OztJQUVELHNCQUFzQixDQUFDLElBQVM7UUFDNUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztJQUNyQyxDQUFDOzs7OztJQUVELHVCQUF1QixDQUFDLEtBQVU7UUFDOUIsSUFBSSxJQUFJLENBQUMsb0JBQW9CLElBQUksT0FBTyxJQUFJLENBQUMsb0JBQW9CLEtBQUssVUFBVSxFQUFFO1lBQzlFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLEtBQVU7UUFDZixLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FDSjs7Ozs7O0lBN0dHLDJDQUE0Qzs7Ozs7SUFDNUMsOENBQWtDOzs7OztJQUNsQyx3Q0FBdUI7O0lBQ3ZCLDhCQUFvQjs7SUFDcEIsc0NBQTRCOztJQUU1QixnQ0FBZTs7SUFDZixnQ0FBZ0I7O0lBQ2hCLCtCQUFjOztJQUNkLGdDQUFnQjs7SUFDaEIsb0NBQXFCOztJQUNyQixtQ0FBc0I7Ozs7O0lBRXRCLHFDQUFxRDs7Ozs7SUFDckQsd0NBQThEOzs7OztJQUM5RCxxQ0FBcUQ7O0FBK0Z6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQ29udHJvbCwgVmFsaWRhdG9yRm4sIEFzeW5jVmFsaWRhdG9yRm4sIEFic3RyYWN0Q29udHJvbE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnMgfSBmcm9tICcuLi9jaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMnO1xuaW1wb3J0IHsgVmFsdWVDaGFuZ2VMaXN0ZW5lciB9IGZyb20gJy4vdmFsdWUtY2hhbmdlLmxpc3RlbmVyJztcbmltcG9ydCB7IENhbkhpZGUsIEhpZGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWhpZGUnO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgRGlzYWJsZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XG5pbXBvcnQgeyBDYW5HZW5lcmF0ZUFsZXJ0LCBBbGVydCB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1hbGVydHMvY2FuLWdlbmVyYXRlLWFsZXJ0JztcbmltcG9ydCB7IEhpZGVySGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvaGlkZXItaGVscGVycyc7XG5pbXBvcnQgeyBBbGVydEhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1hbGVydHMvYWxlcnQtaGVscGVycyc7XG5pbXBvcnQgeyBEaXNhYmxlckhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Rpc2FibGVyLWhlbHBlcic7XG5pbXBvcnQgeyBDYW5DYWxjdWxhdGUgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtY2FsY3VsYXRvcnMvY2FuLWNhbGN1bGF0ZSc7XG5pbXBvcnQgeyBFeHByZXNzaW9uUnVubmVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XG5cbmNsYXNzIEFmZUZvcm1Db250cm9sIGV4dGVuZHMgRm9ybUNvbnRyb2wgaW1wbGVtZW50cyBDYW5IaWRlLCBDYW5EaXNhYmxlLCBDYW5DYWxjdWxhdGUsIENhbkdlbmVyYXRlQWxlcnQsIFZhbHVlQ2hhbmdlTGlzdGVuZXIge1xuICAgIHByaXZhdGUgX2NvbnRyb2xSZWxhdGlvbnM6IENvbnRyb2xSZWxhdGlvbnM7XG4gICAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VMaXN0ZW5lcjogYW55O1xuICAgIHByaXZhdGUgX3ByZXZpb3VzVmFsdWU7XG4gICAgcHVibGljIHV1aWQ6IHN0cmluZztcbiAgICBwdWJsaWMgcGF0aEZyb21Sb290OiBzdHJpbmc7XG5cbiAgICBoaWRkZW4gPSBmYWxzZTtcbiAgICBoaWRlcnM6IEhpZGVyW107XG4gICAgYWxlcnQ6IHN0cmluZztcbiAgICBhbGVydHM6IEFsZXJ0W107XG4gICAgY2FsY3VsYXRvcjogRnVuY3Rpb247XG4gICAgZGlzYWJsZXJzOiBEaXNhYmxlcltdO1xuXG4gICAgcHJpdmF0ZSBoaWRlckhlbHBlcjogSGlkZXJIZWxwZXIgPSBuZXcgSGlkZXJIZWxwZXIoKTtcbiAgICBwcml2YXRlIGRpc2FibGVySGVscGVyOiBEaXNhYmxlckhlbHBlciA9IG5ldyBEaXNhYmxlckhlbHBlcigpO1xuICAgIHByaXZhdGUgQWxlcnRIZWxwZXI6IEFsZXJ0SGVscGVyID0gbmV3IEFsZXJ0SGVscGVyKCk7XG4gICAgY29uc3RydWN0b3IoZm9ybVN0YXRlPzogYW55LCB2YWxpZGF0b3I/OiBWYWxpZGF0b3JGbiB8IFZhbGlkYXRvckZuW10gfCBBYnN0cmFjdENvbnRyb2xPcHRpb25zIHwgbnVsbCxcbiAgICAgICAgYXN5bmNWYWxpZGF0b3I/OiBBc3luY1ZhbGlkYXRvckZuIHwgQXN5bmNWYWxpZGF0b3JGbltdIHwgbnVsbCkge1xuICAgICAgICBzdXBlcihmb3JtU3RhdGUsIHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xuICAgICAgICB0aGlzLl9jb250cm9sUmVsYXRpb25zID0gbmV3IENvbnRyb2xSZWxhdGlvbnModGhpcyk7XG4gICAgICAgIHRoaXMuaGlkZXJzID0gW107XG4gICAgICAgIHRoaXMuZGlzYWJsZXJzID0gW107XG4gICAgICAgIHRoaXMuYWxlcnRzID0gW107XG5cbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3ByZXZpb3VzVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlVmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgY29udHJvbFJlbGF0aW9ucygpOiBDb250cm9sUmVsYXRpb25zIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnM7XG4gICAgfVxuXG4gICAgZGlzYWJsZShwYXJhbT86IHsgb25seVNlbGY/OiBib29sZWFuLCBlbWl0RXZlbnQ/OiBib29sZWFuIH0pIHtcbiAgICAgICAgc3VwZXIuZGlzYWJsZShwYXJhbSk7XG4gICAgICAgIHN1cGVyLnNldFZhbHVlKCcnKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmhpZGVDb250cm9sKHRoaXMpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuc2hvd0NvbnRyb2wodGhpcyk7XG4gICAgfVxuXG4gICAgc2V0SGlkaW5nRm4obmV3SGlkZXI6IEhpZGVyKSB7XG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuc2V0SGlkZXJGb3JDb250cm9sKHRoaXMsIG5ld0hpZGVyKTtcbiAgICB9XG5cbiAgICBzZXRDYWxjdWxhdG9yRm4obmV3Q2FsY3VsYXRvcjogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9yID0gbmV3Q2FsY3VsYXRvcjtcbiAgICB9XG5cbiAgICB1cGRhdGVDYWxjdWxhdGVkVmFsdWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhbGN1bGF0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IF92YWwgPSB0aGlzLmNhbGN1bGF0b3IuY2FsbChFeHByZXNzaW9uUnVubmVyLCB7fSk7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKF92YWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJIaWRpbmdGbnMoKSB7XG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuY2xlYXJIaWRlcnNGb3JDb250cm9sKHRoaXMpO1xuICAgIH1cblxuICAgIHVwZGF0ZUhpZGRlblN0YXRlKCkge1xuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmV2YWx1YXRlQ29udHJvbEhpZGVycyh0aGlzKTtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxpbmdGbihuZXdEaXNhYmxlcjogRGlzYWJsZXIpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlckhlbHBlci5zZXREaXNhYmxlckZvckNvbnRyb2wodGhpcywgbmV3RGlzYWJsZXIpO1xuICAgIH1cblxuICAgIGNsZWFyRGlzYWJsaW5nRm5zKCkge1xuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLmNsZWFyRGlzYWJsZXJzRm9yQ29udHJvbCh0aGlzKTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaXNhYmxlZFN0YXRlKCkge1xuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLmV2YWx1YXRlQ29udHJvbERpc2FibGVycyh0aGlzKTtcbiAgICB9XG5cbiAgICBzZXRBbGVydEZuKG5ld0hpZGVyOiBBbGVydCkge1xuICAgICAgICB0aGlzLkFsZXJ0SGVscGVyLnNldEFsZXJ0c0ZvckNvbnRyb2wodGhpcywgbmV3SGlkZXIpO1xuICAgIH1cblxuICAgIGNsZWFyTWVzc2FnZUZucygpIHtcbiAgICAgICAgdGhpcy5BbGVydEhlbHBlci5jbGVhckFsZXJ0c0ZvckNvbnRyb2wodGhpcyk7XG4gICAgfVxuXG4gICAgdXBkYXRlQWxlcnQoKSB7XG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuZXZhbHVhdGVDb250cm9sQWxlcnRzKHRoaXMpO1xuICAgIH1cblxuICAgIGFkZFZhbHVlQ2hhbmdlTGlzdGVuZXIoZnVuYzogYW55KSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIgPSBmdW5jO1xuICAgIH1cblxuICAgIGZpcmVWYWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIgJiYgdHlwZW9mIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0VmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICBzdXBlci5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0IHsgQWZlRm9ybUNvbnRyb2wgfTtcbiJdfQ==