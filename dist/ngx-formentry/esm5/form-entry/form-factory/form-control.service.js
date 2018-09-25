/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { AfeFormControl, AfeFormArray, AfeFormGroup, AfeControlType } from '../../abstract-controls-extension';
import { QuestionBase } from '../question-models/question-base';
import { ValidationFactory } from '../form-factory/validation.factory';
import { HidersDisablersFactory } from './hiders-disablers.factory';
import { AlertsFactory } from './show-messages.factory';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
var FormControlService = /** @class */ (function () {
    function FormControlService(validationFactory, hidersDisablersFactory, alertsFactory) {
        this.alertsFactory = alertsFactory;
        this.controls = [];
        this.validationFactory = validationFactory;
        this.hidersDisablersFactory = hidersDisablersFactory;
    }
    /**
     * @param {?} questionModel
     * @param {?} parentControl
     * @param {?} generateChildren
     * @param {?=} form
     * @return {?}
     */
    FormControlService.prototype.generateControlModel = /**
     * @param {?} questionModel
     * @param {?} parentControl
     * @param {?} generateChildren
     * @param {?=} form
     * @return {?}
     */
    function (questionModel, parentControl, generateChildren, form) {
        if (questionModel instanceof QuestionBase) {
            if (questionModel.controlType === AfeControlType.AfeFormArray) {
                return this.generateFormArray(questionModel, parentControl, form);
            }
            if (questionModel.controlType === AfeControlType.AfeFormGroup) {
                return this.generateFormGroupModel(questionModel, generateChildren, parentControl, form);
            }
            if (questionModel.controlType === AfeControlType.AfeFormControl) {
                return this.generateFormControl(questionModel, parentControl, form);
            }
        }
        return null;
    };
    /**
     * @param {?} question
     * @param {?} generateChildren
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    FormControlService.prototype.generateFormGroupModel = /**
     * @param {?} question
     * @param {?} generateChildren
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    function (question, generateChildren, parentControl, form) {
        var /** @type {?} */ formGroup = new AfeFormGroup({});
        this.wireHidersDisablers(question, formGroup, form);
        this.wireAlerts(question, formGroup, form);
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, formGroup);
        }
        var /** @type {?} */ asGroup = /** @type {?} */ (question);
        if (generateChildren && asGroup && asGroup.questions.length > 0) {
            this._generateFormGroupChildrenModel(asGroup.questions, formGroup, form);
        }
        return formGroup;
    };
    /**
     * @param {?} questions
     * @param {?} parentControl
     * @param {?=} form
     * @return {?}
     */
    FormControlService.prototype._generateFormGroupChildrenModel = /**
     * @param {?} questions
     * @param {?} parentControl
     * @param {?=} form
     * @return {?}
     */
    function (questions, parentControl, form) {
        var _this = this;
        if (questions.length > 0) {
            questions.forEach(function (element) {
                var /** @type {?} */ generated = _this.generateControlModel(element, parentControl, true, form);
                if (generated !== null) {
                    parentControl.addControl(element.key, generated);
                }
            });
        }
    };
    /**
     * @param {?} question
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    FormControlService.prototype.generateFormArray = /**
     * @param {?} question
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    function (question, parentControl, form) {
        var /** @type {?} */ validators = this.validationFactory.getValidators(question, form);
        var /** @type {?} */ formArray;
        if (validators && validators.length > 0) {
            formArray = new AfeFormArray([], validators[0]);
        }
        else {
            formArray = new AfeFormArray([]);
        }
        formArray.uuid = question.key;
        this.wireHidersDisablers(question, formArray, form);
        this.wireAlerts(question, formArray, form);
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, formArray);
        }
        return formArray;
    };
    /**
     * @param {?} question
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    FormControlService.prototype.generateFormControl = /**
     * @param {?} question
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    function (question, parentControl, form) {
        var /** @type {?} */ value = question.defaultValue || '';
        var /** @type {?} */ validators = this.validationFactory.getValidators(question, form);
        var /** @type {?} */ control = new AfeFormControl(value, validators);
        control.uuid = question.key;
        this.wireHidersDisablers(question, control, form);
        this.wireAlerts(question, control, form);
        this.wireCalculator(question, control, (form ? form.dataSourcesContainer.dataSources : null));
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, control);
        }
        return control;
    };
    /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    FormControlService.prototype.wireAlerts = /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    function (question, control, form) {
        if (question.alert && question.alert !== '') {
            var /** @type {?} */ alert_1 = this.alertsFactory.getJsExpressionshowAlert(question, control, form);
            control.setAlertFn(alert_1);
        }
    };
    /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    FormControlService.prototype.wireHidersDisablers = /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    function (question, control, form) {
        if (question.hide && question.hide !== '') {
            var /** @type {?} */ hider = this.hidersDisablersFactory.getJsExpressionHider(question, control, form);
            control.setHidingFn(hider);
        }
        if (question.disable && question.disable !== '') {
            var /** @type {?} */ disable = this.hidersDisablersFactory.getJsExpressionDisabler(question, control, form);
            control.setDisablingFn(disable);
        }
    };
    /**
     * @param {?} question
     * @param {?} control
     * @param {?=} dataSource
     * @return {?}
     */
    FormControlService.prototype.wireCalculator = /**
     * @param {?} question
     * @param {?} control
     * @param {?=} dataSource
     * @return {?}
     */
    function (question, control, dataSource) {
        if (question.calculateExpression && question.calculateExpression !== '') {
            var /** @type {?} */ helper = new JsExpressionHelper();
            var /** @type {?} */ runner = new ExpressionRunner();
            var /** @type {?} */ runnable = runner.getRunnable(question.calculateExpression, control, helper.helperFunctions, dataSource);
            // this functionality strictly assumes the calculateExpression function has been defined in the JsExpressionHelper class
            control.setCalculatorFn(runnable.run);
        }
    };
    FormControlService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FormControlService.ctorParameters = function () { return [
        { type: ValidationFactory, },
        { type: HidersDisablersFactory, },
        { type: AlertsFactory, },
    ]; };
    return FormControlService;
}());
export { FormControlService };
function FormControlService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormControlService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormControlService.ctorParameters;
    /** @type {?} */
    FormControlService.prototype.controls;
    /** @type {?} */
    FormControlService.prototype.validationFactory;
    /** @type {?} */
    FormControlService.prototype.hidersDisablersFactory;
    /** @type {?} */
    FormControlService.prototype.alertsFactory;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLWNvbnRyb2wuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUNsRSxNQUFNLG1DQUFtQyxDQUFDO0FBSTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFZLE1BQU0sd0NBQXdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7O0lBU2pFLDRCQUFZLGlCQUFvQyxFQUM1QyxzQkFBOEMsRUFBVSxhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTt3QkFMN0UsRUFBRTtRQU1ULElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsc0JBQXNCLENBQUM7S0FDeEQ7Ozs7Ozs7O0lBRUQsaURBQW9COzs7Ozs7O0lBQXBCLFVBQXFCLGFBQTRDLEVBQUUsYUFBMkIsRUFDMUYsZ0JBQXlCLEVBQUUsSUFBVztRQUN0QyxFQUFFLENBQUMsQ0FBQyxhQUFhLFlBQVksWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN4QyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsV0FBVyxLQUFLLGNBQWMs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akYsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNuQzs7Ozs7Ozs7SUFHRywyQ0FBYzs7Ozs7O2NBQUMsUUFBc0IsRUFDekMsT0FBdUIsRUFBRSxVQUFnQjtRQUN6QyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLElBQUksUUFBUSxDQUFDLG1CQUFtQixLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEUscUJBQU0sTUFBTSxHQUF1QixJQUFJLGtCQUFrQixFQUFFLENBQUM7WUFDNUQscUJBQU0sTUFBTSxHQUFxQixJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDeEQscUJBQU0sUUFBUSxHQUFhLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUNwRSxPQUFPLEVBQ1QsTUFBTSxDQUFDLGVBQWUsRUFDdEIsVUFBVSxDQUFDLENBQUM7O1lBRWhCLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pDOzs7Z0JBaklSLFVBQVU7Ozs7Z0JBUkYsaUJBQWlCO2dCQUNqQixzQkFBc0I7Z0JBQ3RCLGFBQWE7OzZCQVp0Qjs7U0FtQmEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCwgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXAsIEFmZUNvbnRyb2xUeXBlXHJcbn0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcclxuXHJcbmltcG9ydCB7IE5lc3RlZFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvbmVzdGVkLXF1ZXN0aW9ucyc7XHJcblxyXG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XHJcbmltcG9ydCB7IFF1ZXN0aW9uR3JvdXAgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZ3JvdXAtcXVlc3Rpb24nO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uRmFjdG9yeSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS92YWxpZGF0aW9uLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBIaWRlcnNEaXNhYmxlcnNGYWN0b3J5IH0gZnJvbSAnLi9oaWRlcnMtZGlzYWJsZXJzLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBBbGVydHNGYWN0b3J5IH0gZnJvbSAnLi9zaG93LW1lc3NhZ2VzLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcclxuaW1wb3J0IHsgRXhwcmVzc2lvblJ1bm5lciwgUnVubmFibGUgfSBmcm9tICcuLi9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XHJcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4uL2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXInO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZvcm1Db250cm9sU2VydmljZSB7XHJcbiAgICBjb250cm9scyA9IFtdO1xyXG4gICAgdmFsaWRhdGlvbkZhY3Rvcnk6IFZhbGlkYXRpb25GYWN0b3J5O1xyXG4gICAgaGlkZXJzRGlzYWJsZXJzRmFjdG9yeTogSGlkZXJzRGlzYWJsZXJzRmFjdG9yeTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih2YWxpZGF0aW9uRmFjdG9yeTogVmFsaWRhdGlvbkZhY3RvcnksXHJcbiAgICAgICAgaGlkZXJzRGlzYWJsZXJzRmFjdG9yeTogSGlkZXJzRGlzYWJsZXJzRmFjdG9yeSwgcHJpdmF0ZSBhbGVydHNGYWN0b3J5OiBBbGVydHNGYWN0b3J5KSB7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRmFjdG9yeSA9IHZhbGlkYXRpb25GYWN0b3J5O1xyXG4gICAgICAgIHRoaXMuaGlkZXJzRGlzYWJsZXJzRmFjdG9yeSA9IGhpZGVyc0Rpc2FibGVyc0ZhY3Rvcnk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVDb250cm9sTW9kZWwocXVlc3Rpb25Nb2RlbDogUXVlc3Rpb25CYXNlIHwgTmVzdGVkUXVlc3Rpb24sIHBhcmVudENvbnRyb2w6IEFmZUZvcm1Hcm91cCxcclxuICAgICAgICBnZW5lcmF0ZUNoaWxkcmVuOiBib29sZWFuLCBmb3JtPzogRm9ybSk6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHtcclxuICAgICAgICBpZiAocXVlc3Rpb25Nb2RlbCBpbnN0YW5jZW9mIFF1ZXN0aW9uQmFzZSkge1xyXG4gICAgICAgICAgICBpZiAocXVlc3Rpb25Nb2RlbC5jb250cm9sVHlwZSA9PT0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUZvcm1BcnJheShxdWVzdGlvbk1vZGVsLCBwYXJlbnRDb250cm9sLCBmb3JtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocXVlc3Rpb25Nb2RlbC5jb250cm9sVHlwZSA9PT0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUZvcm1Hcm91cE1vZGVsKHF1ZXN0aW9uTW9kZWwsIGdlbmVyYXRlQ2hpbGRyZW4sIHBhcmVudENvbnRyb2wsIGZvcm0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocXVlc3Rpb25Nb2RlbC5jb250cm9sVHlwZSA9PT0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUNvbnRyb2wpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlRm9ybUNvbnRyb2wocXVlc3Rpb25Nb2RlbCwgcGFyZW50Q29udHJvbCwgZm9ybSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVGb3JtR3JvdXBNb2RlbChxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBnZW5lcmF0ZUNoaWxkcmVuOiBib29sZWFuLFxyXG4gICAgICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtKTogQWZlRm9ybUdyb3VwIHtcclxuICAgICAgICBjb25zdCBmb3JtR3JvdXAgPSBuZXcgQWZlRm9ybUdyb3VwKHt9KTtcclxuICAgICAgICB0aGlzLndpcmVIaWRlcnNEaXNhYmxlcnMocXVlc3Rpb24sIGZvcm1Hcm91cCwgZm9ybSk7XHJcbiAgICAgICAgdGhpcy53aXJlQWxlcnRzKHF1ZXN0aW9uLCBmb3JtR3JvdXAsIGZvcm0pO1xyXG4gICAgICAgIGlmIChwYXJlbnRDb250cm9sIGluc3RhbmNlb2YgQWZlRm9ybUdyb3VwKSB7XHJcbiAgICAgICAgICAgIHBhcmVudENvbnRyb2wuc2V0Q29udHJvbChxdWVzdGlvbi5rZXksIGZvcm1Hcm91cCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhc0dyb3VwID0gcXVlc3Rpb24gYXMgUXVlc3Rpb25Hcm91cDtcclxuXHJcbiAgICAgICAgaWYgKGdlbmVyYXRlQ2hpbGRyZW4gJiYgYXNHcm91cCAmJiBhc0dyb3VwLnF1ZXN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dlbmVyYXRlRm9ybUdyb3VwQ2hpbGRyZW5Nb2RlbChhc0dyb3VwLnF1ZXN0aW9ucywgZm9ybUdyb3VwLCBmb3JtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtR3JvdXA7XHJcbiAgICB9XHJcblxyXG4gICAgX2dlbmVyYXRlRm9ybUdyb3VwQ2hpbGRyZW5Nb2RlbChxdWVzdGlvbnM6IFF1ZXN0aW9uQmFzZVtdLCBwYXJlbnRDb250cm9sOiBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtKSB7XHJcblxyXG4gICAgICAgIGlmIChxdWVzdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBxdWVzdGlvbnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRlZCA9IHRoaXMuZ2VuZXJhdGVDb250cm9sTW9kZWwoZWxlbWVudCwgcGFyZW50Q29udHJvbCwgdHJ1ZSwgZm9ybSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2VuZXJhdGVkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udHJvbC5hZGRDb250cm9sKGVsZW1lbnQua2V5LCBnZW5lcmF0ZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdlbmVyYXRlRm9ybUFycmF5KHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtKTogQWZlRm9ybUFycmF5IHtcclxuXHJcbiAgICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IHRoaXMudmFsaWRhdGlvbkZhY3RvcnkuZ2V0VmFsaWRhdG9ycyhxdWVzdGlvbiwgZm9ybSk7XHJcbiAgICAgICAgIGxldCBmb3JtQXJyYXk6IEFmZUZvcm1BcnJheTtcclxuICAgICAgICAgaWYgKHZhbGlkYXRvcnMgJiYgdmFsaWRhdG9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICBmb3JtQXJyYXkgPSBuZXcgQWZlRm9ybUFycmF5KFtdLCB2YWxpZGF0b3JzWzBdKTtcclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9ybUFycmF5ID0gbmV3IEFmZUZvcm1BcnJheShbXSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICBmb3JtQXJyYXkudXVpZCA9IHF1ZXN0aW9uLmtleTtcclxuICAgICAgICB0aGlzLndpcmVIaWRlcnNEaXNhYmxlcnMocXVlc3Rpb24sIGZvcm1BcnJheSwgZm9ybSk7XHJcbiAgICAgICAgdGhpcy53aXJlQWxlcnRzKHF1ZXN0aW9uLCBmb3JtQXJyYXksIGZvcm0pO1xyXG4gICAgICAgIGlmIChwYXJlbnRDb250cm9sIGluc3RhbmNlb2YgQWZlRm9ybUdyb3VwKSB7XHJcbiAgICAgICAgICAgIHBhcmVudENvbnRyb2wuc2V0Q29udHJvbChxdWVzdGlvbi5rZXksIGZvcm1BcnJheSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZm9ybUFycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlRm9ybUNvbnRyb2wocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBBZmVGb3JtQ29udHJvbCB7XHJcblxyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gcXVlc3Rpb24uZGVmYXVsdFZhbHVlIHx8ICcnO1xyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRvcnMgPSB0aGlzLnZhbGlkYXRpb25GYWN0b3J5LmdldFZhbGlkYXRvcnMocXVlc3Rpb24sIGZvcm0pO1xyXG5cclxuICAgICAgICBjb25zdCBjb250cm9sID0gbmV3IEFmZUZvcm1Db250cm9sKHZhbHVlLCB2YWxpZGF0b3JzKTtcclxuICAgICAgICBjb250cm9sLnV1aWQgPSBxdWVzdGlvbi5rZXk7XHJcbiAgICAgICAgdGhpcy53aXJlSGlkZXJzRGlzYWJsZXJzKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtKTtcclxuICAgICAgICB0aGlzLndpcmVBbGVydHMocXVlc3Rpb24sIGNvbnRyb2wsIGZvcm0pO1xyXG4gICAgICAgIHRoaXMud2lyZUNhbGN1bGF0b3IocXVlc3Rpb24sIGNvbnRyb2wsIChmb3JtID8gZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcyA6IG51bGwpKTtcclxuXHJcbiAgICAgICAgaWYgKHBhcmVudENvbnRyb2wgaW5zdGFuY2VvZiBBZmVGb3JtR3JvdXApIHtcclxuICAgICAgICAgICAgcGFyZW50Q29udHJvbC5zZXRDb250cm9sKHF1ZXN0aW9uLmtleSwgY29udHJvbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29udHJvbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHdpcmVBbGVydHMocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSxcclxuICAgICAgICBjb250cm9sOiBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAgfCBBZmVGb3JtQ29udHJvbCwgZm9ybT86IEZvcm0pIHtcclxuICAgICAgICBpZiAocXVlc3Rpb24uYWxlcnQgJiYgcXVlc3Rpb24uYWxlcnQgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFsZXJ0ID0gdGhpcy5hbGVydHNGYWN0b3J5LmdldEpzRXhwcmVzc2lvbnNob3dBbGVydChxdWVzdGlvbiwgY29udHJvbCwgZm9ybSk7XHJcbiAgICAgICAgICAgIGNvbnRyb2wuc2V0QWxlcnRGbihhbGVydCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB3aXJlSGlkZXJzRGlzYWJsZXJzKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsXHJcbiAgICAgICAgY29udHJvbDogQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHwgQWZlRm9ybUNvbnRyb2wsIGZvcm0/OiBGb3JtKSB7XHJcbiAgICAgICAgaWYgKHF1ZXN0aW9uLmhpZGUgJiYgcXVlc3Rpb24uaGlkZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgY29uc3QgaGlkZXIgPSB0aGlzLmhpZGVyc0Rpc2FibGVyc0ZhY3RvcnkuZ2V0SnNFeHByZXNzaW9uSGlkZXIocXVlc3Rpb24sIGNvbnRyb2wsIGZvcm0pO1xyXG4gICAgICAgICAgICBjb250cm9sLnNldEhpZGluZ0ZuKGhpZGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChxdWVzdGlvbi5kaXNhYmxlICYmIHF1ZXN0aW9uLmRpc2FibGUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpc2FibGUgPVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlcnNEaXNhYmxlcnNGYWN0b3J5LmdldEpzRXhwcmVzc2lvbkRpc2FibGVyKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtKTtcclxuICAgICAgICAgICAgY29udHJvbC5zZXREaXNhYmxpbmdGbihkaXNhYmxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB3aXJlQ2FsY3VsYXRvcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxyXG4gICAgICAgIGNvbnRyb2w6IEFmZUZvcm1Db250cm9sLCBkYXRhU291cmNlPzogYW55KSB7XHJcbiAgICAgICAgaWYgKHF1ZXN0aW9uLmNhbGN1bGF0ZUV4cHJlc3Npb24gJiYgcXVlc3Rpb24uY2FsY3VsYXRlRXhwcmVzc2lvbiAhPT0gJycpIHtcclxuICAgICAgICAgICAgY29uc3QgaGVscGVyOiBKc0V4cHJlc3Npb25IZWxwZXIgPSBuZXcgSnNFeHByZXNzaW9uSGVscGVyKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJ1bm5lcjogRXhwcmVzc2lvblJ1bm5lciA9IG5ldyBFeHByZXNzaW9uUnVubmVyKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJ1bm5hYmxlOiBSdW5uYWJsZSA9IHJ1bm5lci5nZXRSdW5uYWJsZShxdWVzdGlvbi5jYWxjdWxhdGVFeHByZXNzaW9uXHJcbiAgICAgICAgICAgICAgICAsIGNvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICBoZWxwZXIuaGVscGVyRnVuY3Rpb25zLFxyXG4gICAgICAgICAgICAgICAgZGF0YVNvdXJjZSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMgZnVuY3Rpb25hbGl0eSBzdHJpY3RseSBhc3N1bWVzIHRoZSBjYWxjdWxhdGVFeHByZXNzaW9uIGZ1bmN0aW9uIGhhcyBiZWVuIGRlZmluZWQgaW4gdGhlIEpzRXhwcmVzc2lvbkhlbHBlciBjbGFzc1xyXG4gICAgICAgICAgICBjb250cm9sLnNldENhbGN1bGF0b3JGbihydW5uYWJsZS5ydW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==