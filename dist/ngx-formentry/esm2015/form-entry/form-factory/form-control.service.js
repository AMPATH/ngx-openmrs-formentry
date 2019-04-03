/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { AfeFormControl, AfeFormArray, AfeFormGroup, AfeControlType } from '../../abstract-controls-extension';
import { QuestionBase } from '../question-models/question-base';
import { ValidationFactory } from '../form-factory/validation.factory';
import { HidersDisablersFactory } from './hiders-disablers.factory';
import { AlertsFactory } from './show-messages.factory';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
export class FormControlService {
    /**
     * @param {?} validationFactory
     * @param {?} hidersDisablersFactory
     * @param {?} alertsFactory
     */
    constructor(validationFactory, hidersDisablersFactory, alertsFactory) {
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
    generateControlModel(questionModel, parentControl, generateChildren, form) {
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
    }
    /**
     * @param {?} question
     * @param {?} generateChildren
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    generateFormGroupModel(question, generateChildren, parentControl, form) {
        /** @type {?} */
        const formGroup = new AfeFormGroup({});
        this.wireHidersDisablers(question, formGroup, form);
        this.wireAlerts(question, formGroup, form);
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, formGroup);
        }
        /** @type {?} */
        const asGroup = (/** @type {?} */ (question));
        if (generateChildren && asGroup && asGroup.questions.length > 0) {
            this._generateFormGroupChildrenModel(asGroup.questions, formGroup, form);
        }
        return formGroup;
    }
    /**
     * @param {?} questions
     * @param {?} parentControl
     * @param {?=} form
     * @return {?}
     */
    _generateFormGroupChildrenModel(questions, parentControl, form) {
        if (questions.length > 0) {
            questions.forEach((/**
             * @param {?} element
             * @return {?}
             */
            element => {
                /** @type {?} */
                const generated = this.generateControlModel(element, parentControl, true, form);
                if (generated !== null) {
                    parentControl.addControl(element.key, generated);
                }
            }));
        }
    }
    /**
     * @param {?} question
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    generateFormArray(question, parentControl, form) {
        /** @type {?} */
        const validators = this.validationFactory.getValidators(question, form);
        /** @type {?} */
        let formArray;
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
    }
    /**
     * @param {?} question
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    generateFormControl(question, parentControl, form) {
        /** @type {?} */
        const value = question.defaultValue || '';
        /** @type {?} */
        const validators = this.validationFactory.getValidators(question, form);
        /** @type {?} */
        const control = new AfeFormControl(value, validators);
        control.uuid = question.key;
        this.wireHidersDisablers(question, control, form);
        this.wireAlerts(question, control, form);
        this.wireCalculator(question, control, (form ? form.dataSourcesContainer.dataSources : null));
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, control);
        }
        return control;
    }
    /**
     * @private
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    wireAlerts(question, control, form) {
        if (question.alert && question.alert !== '') {
            /** @type {?} */
            const alert = this.alertsFactory.getJsExpressionshowAlert(question, control, form);
            control.setAlertFn(alert);
        }
    }
    /**
     * @private
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    wireHidersDisablers(question, control, form) {
        if (question.hide && question.hide !== '') {
            /** @type {?} */
            const hider = this.hidersDisablersFactory.getJsExpressionHider(question, control, form);
            control.setHidingFn(hider);
        }
        if (question.disable && question.disable !== '') {
            /** @type {?} */
            const disable = this.hidersDisablersFactory.getJsExpressionDisabler(question, control, form);
            control.setDisablingFn(disable);
        }
    }
    /**
     * @private
     * @param {?} question
     * @param {?} control
     * @param {?=} dataSource
     * @return {?}
     */
    wireCalculator(question, control, dataSource) {
        if (question.calculateExpression && question.calculateExpression !== '') {
            /** @type {?} */
            const helper = new JsExpressionHelper();
            /** @type {?} */
            const runner = new ExpressionRunner();
            /** @type {?} */
            const runnable = runner.getRunnable(question.calculateExpression, control, helper.helperFunctions, dataSource);
            // this functionality strictly assumes the calculateExpression function has been defined in the JsExpressionHelper class
            control.setCalculatorFn(runnable.run);
        }
    }
}
FormControlService.decorators = [
    { type: Injectable },
];
FormControlService.ctorParameters = () => [
    { type: ValidationFactory },
    { type: HidersDisablersFactory },
    { type: AlertsFactory }
];
if (false) {
    /** @type {?} */
    FormControlService.prototype.controls;
    /** @type {?} */
    FormControlService.prototype.validationFactory;
    /** @type {?} */
    FormControlService.prototype.hidersDisablersFactory;
    /**
     * @type {?}
     * @private
     */
    FormControlService.prototype.alertsFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLWNvbnRyb2wuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUNsRSxNQUFNLG1DQUFtQyxDQUFDO0FBSTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFZLE1BQU0sd0NBQXdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFJckUsTUFBTTs7Ozs7O0lBS0YsWUFBWSxpQkFBb0MsRUFDNUMsc0JBQThDLEVBQVUsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFMeEYsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQU1WLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsc0JBQXNCLENBQUM7SUFDekQsQ0FBQzs7Ozs7Ozs7SUFFRCxvQkFBb0IsQ0FBQyxhQUE0QyxFQUFFLGFBQTJCLEVBQzFGLGdCQUF5QixFQUFFLElBQVc7UUFDdEMsRUFBRSxDQUFDLENBQUMsYUFBYSxZQUFZLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDeEMsRUFBRSxDQUFDLENBQUMsYUFBYSxD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QUFDO1FBQ3BDLENBQUM7SUFDTCxDQUFDOzs7Ozs7OztJQUVPLGNBQWMsQ0FBQyxRQUFzQixFQUN6QyxPQUF1QixFQUFFLFVBQWdCO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsSUFBSSxRQUFRLENBQUMsbUJBQW1CLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzs7a0JBQ2hFLE1BQU0sR0FBdUIsSUFBSSxrQkFBa0IsRUFBRTs7a0JBQ3JELE1BQU0sR0FBcUIsSUFBSSxnQkFBZ0IsRUFBRTs7a0JBQ2pELFFBQVEsR0FBYSxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFDcEUsT0FBTyxFQUNULE1BQU0sQ0FBQyxlQUFlLEVBQ3RCLFVBQVUsQ0FBQztZQUNmLHdIQUF3SDtZQUN4SCxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxDQUFDO0lBRUwsQ0FBQzs7O1lBbklKLFVBQVU7OztZQVJGLGlCQUFpQjtZQUNqQixzQkFBc0I7WUFDdEIsYUFBYTs7OztJQVFsQixzQ0FBYzs7SUFDZCwrQ0FBcUM7O0lBQ3JDLG9EQUErQzs7Ozs7SUFHSywyQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sLCBBZmVGb3JtQXJyYXksIEFmZUZvcm1Hcm91cCwgQWZlQ29udHJvbFR5cGVcclxufSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24nO1xyXG5cclxuaW1wb3J0IHsgTmVzdGVkUXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9uZXN0ZWQtcXVlc3Rpb25zJztcclxuXHJcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcclxuaW1wb3J0IHsgUXVlc3Rpb25Hcm91cCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbic7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25GYWN0b3J5IH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L3ZhbGlkYXRpb24uZmFjdG9yeSc7XHJcbmltcG9ydCB7IEhpZGVyc0Rpc2FibGVyc0ZhY3RvcnkgfSBmcm9tICcuL2hpZGVycy1kaXNhYmxlcnMuZmFjdG9yeSc7XHJcbmltcG9ydCB7IEFsZXJ0c0ZhY3RvcnkgfSBmcm9tICcuL3Nob3ctbWVzc2FnZXMuZmFjdG9yeSc7XHJcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xyXG5pbXBvcnQgeyBFeHByZXNzaW9uUnVubmVyLCBSdW5uYWJsZSB9IGZyb20gJy4uL2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyJztcclxuaW1wb3J0IHsgSnNFeHByZXNzaW9uSGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9qcy1leHByZXNzaW9uLWhlbHBlcic7XHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRm9ybUNvbnRyb2xTZXJ2aWNlIHtcclxuICAgIGNvbnRyb2xzID0gW107XHJcbiAgICB2YWxpZGF0aW9uRmFjdG9yeTogVmFsaWRhdGlvbkZhY3Rvcnk7XHJcbiAgICBoaWRlcnNEaXNhYmxlcnNGYWN0b3J5OiBIaWRlcnNEaXNhYmxlcnNGYWN0b3J5O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHZhbGlkYXRpb25GYWN0b3J5OiBWYWxpZGF0aW9uRmFjdG9yeSxcclxuICAgICAgICBoaWRlcnNEaXNhYmxlcnNGYWN0b3J5OiBIaWRlcnNEaXNhYmxlcnNGYWN0b3J5LCBwcml2YXRlIGFsZXJ0c0ZhY3Rvcnk6IEFsZXJ0c0ZhY3RvcnkpIHtcclxuICAgICAgICB0aGlzLnZhbGlkYXRpb25GYWN0b3J5ID0gdmFsaWRhdGlvbkZhY3Rvcnk7XHJcbiAgICAgICAgdGhpcy5oaWRlcnNEaXNhYmxlcnNGYWN0b3J5ID0gaGlkZXJzRGlzYWJsZXJzRmFjdG9yeTtcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZUNvbnRyb2xNb2RlbChxdWVzdGlvbk1vZGVsOiBRdWVzdGlvbkJhc2UgfCBOZXN0ZWRRdWVzdGlvbiwgcGFyZW50Q29udHJvbDogQWZlRm9ybUdyb3VwLFxyXG4gICAgICAgIGdlbmVyYXRlQ2hpbGRyZW46IGJvb2xlYW4sIGZvcm0/OiBGb3JtKTogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAge1xyXG4gICAgICAgIGlmIChxdWVzdGlvbk1vZGVsIGluc3RhbmNlb2YgUXVlc3Rpb25CYXNlKSB7XHJcbiAgICAgICAgICAgIGlmIChxdWVzdGlvbk1vZGVsLmNvbnRyb2xUeXBlID09PSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlRm9ybUFycmF5KHF1ZXN0aW9uTW9kZWwsIHBhcmVudENvbnRyb2wsIGZvcm0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChxdWVzdGlvbk1vZGVsLmNvbnRyb2xUeXBlID09PSBBZmVDb250cm9sVHlwZS5BZmVGb3JtR3JvdXApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlRm9ybUdyb3VwTW9kZWwocXVlc3Rpb25Nb2RlbCwgZ2VuZXJhdGVDaGlsZHJlbiwgcGFyZW50Q29udHJvbCwgZm9ybSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChxdWVzdGlvbk1vZGVsLmNvbnRyb2xUeXBlID09PSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQ29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVGb3JtQ29udHJvbChxdWVzdGlvbk1vZGVsLCBwYXJlbnRDb250cm9sLCBmb3JtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZUZvcm1Hcm91cE1vZGVsKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGdlbmVyYXRlQ2hpbGRyZW46IGJvb2xlYW4sXHJcbiAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBBZmVGb3JtR3JvdXAge1xyXG4gICAgICAgIGNvbnN0IGZvcm1Hcm91cCA9IG5ldyBBZmVGb3JtR3JvdXAoe30pO1xyXG4gICAgICAgIHRoaXMud2lyZUhpZGVyc0Rpc2FibGVycyhxdWVzdGlvbiwgZm9ybUdyb3VwLCBmb3JtKTtcclxuICAgICAgICB0aGlzLndpcmVBbGVydHMocXVlc3Rpb24sIGZvcm1Hcm91cCwgZm9ybSk7XHJcbiAgICAgICAgaWYgKHBhcmVudENvbnRyb2wgaW5zdGFuY2VvZiBBZmVGb3JtR3JvdXApIHtcclxuICAgICAgICAgICAgcGFyZW50Q29udHJvbC5zZXRDb250cm9sKHF1ZXN0aW9uLmtleSwgZm9ybUdyb3VwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGFzR3JvdXAgPSBxdWVzdGlvbiBhcyBRdWVzdGlvbkdyb3VwO1xyXG5cclxuICAgICAgICBpZiAoZ2VuZXJhdGVDaGlsZHJlbiAmJiBhc0dyb3VwICYmIGFzR3JvdXAucXVlc3Rpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2VuZXJhdGVGb3JtR3JvdXBDaGlsZHJlbk1vZGVsKGFzR3JvdXAucXVlc3Rpb25zLCBmb3JtR3JvdXAsIGZvcm0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1Hcm91cDtcclxuICAgIH1cclxuXHJcbiAgICBfZ2VuZXJhdGVGb3JtR3JvdXBDaGlsZHJlbk1vZGVsKHF1ZXN0aW9uczogUXVlc3Rpb25CYXNlW10sIHBhcmVudENvbnRyb2w6IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pIHtcclxuXHJcbiAgICAgICAgaWYgKHF1ZXN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9ucy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZ2VuZXJhdGVkID0gdGhpcy5nZW5lcmF0ZUNvbnRyb2xNb2RlbChlbGVtZW50LCBwYXJlbnRDb250cm9sLCB0cnVlLCBmb3JtKTtcclxuICAgICAgICAgICAgICAgIGlmIChnZW5lcmF0ZWQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRDb250cm9sLmFkZENvbnRyb2woZWxlbWVudC5rZXksIGdlbmVyYXRlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2VuZXJhdGVGb3JtQXJyYXkocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBBZmVGb3JtQXJyYXkge1xyXG5cclxuICAgICAgICBjb25zdCB2YWxpZGF0b3JzID0gdGhpcy52YWxpZGF0aW9uRmFjdG9yeS5nZXRWYWxpZGF0b3JzKHF1ZXN0aW9uLCBmb3JtKTtcclxuICAgICAgICAgbGV0IGZvcm1BcnJheTogQWZlRm9ybUFycmF5O1xyXG4gICAgICAgICBpZiAodmFsaWRhdG9ycyAmJiB2YWxpZGF0b3JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgIGZvcm1BcnJheSA9IG5ldyBBZmVGb3JtQXJyYXkoW10sIHZhbGlkYXRvcnNbMF0pO1xyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3JtQXJyYXkgPSBuZXcgQWZlRm9ybUFycmF5KFtdKTtcclxuICAgICAgICAgfVxyXG4gICAgICAgIGZvcm1BcnJheS51dWlkID0gcXVlc3Rpb24ua2V5O1xyXG4gICAgICAgIHRoaXMud2lyZUhpZGVyc0Rpc2FibGVycyhxdWVzdGlvbiwgZm9ybUFycmF5LCBmb3JtKTtcclxuICAgICAgICB0aGlzLndpcmVBbGVydHMocXVlc3Rpb24sIGZvcm1BcnJheSwgZm9ybSk7XHJcbiAgICAgICAgaWYgKHBhcmVudENvbnRyb2wgaW5zdGFuY2VvZiBBZmVGb3JtR3JvdXApIHtcclxuICAgICAgICAgICAgcGFyZW50Q29udHJvbC5zZXRDb250cm9sKHF1ZXN0aW9uLmtleSwgZm9ybUFycmF5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVGb3JtQ29udHJvbChxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBwYXJlbnRDb250cm9sPzogQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSk6IEFmZUZvcm1Db250cm9sIHtcclxuXHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBxdWVzdGlvbi5kZWZhdWx0VmFsdWUgfHwgJyc7XHJcbiAgICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IHRoaXMudmFsaWRhdGlvbkZhY3RvcnkuZ2V0VmFsaWRhdG9ycyhxdWVzdGlvbiwgZm9ybSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgQWZlRm9ybUNvbnRyb2wodmFsdWUsIHZhbGlkYXRvcnMpO1xyXG4gICAgICAgIGNvbnRyb2wudXVpZCA9IHF1ZXN0aW9uLmtleTtcclxuICAgICAgICB0aGlzLndpcmVIaWRlcnNEaXNhYmxlcnMocXVlc3Rpb24sIGNvbnRyb2wsIGZvcm0pO1xyXG4gICAgICAgIHRoaXMud2lyZUFsZXJ0cyhxdWVzdGlvbiwgY29udHJvbCwgZm9ybSk7XHJcbiAgICAgICAgdGhpcy53aXJlQ2FsY3VsYXRvcihxdWVzdGlvbiwgY29udHJvbCwgKGZvcm0gPyBmb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzIDogbnVsbCkpO1xyXG5cclxuICAgICAgICBpZiAocGFyZW50Q29udHJvbCBpbnN0YW5jZW9mIEFmZUZvcm1Hcm91cCkge1xyXG4gICAgICAgICAgICBwYXJlbnRDb250cm9sLnNldENvbnRyb2wocXVlc3Rpb24ua2V5LCBjb250cm9sKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb250cm9sO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgd2lyZUFsZXJ0cyhxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxyXG4gICAgICAgIGNvbnRyb2w6IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCB8IEFmZUZvcm1Db250cm9sLCBmb3JtPzogRm9ybSkge1xyXG4gICAgICAgIGlmIChxdWVzdGlvbi5hbGVydCAmJiBxdWVzdGlvbi5hbGVydCAhPT0gJycpIHtcclxuICAgICAgICAgICAgY29uc3QgYWxlcnQgPSB0aGlzLmFsZXJ0c0ZhY3RvcnkuZ2V0SnNFeHByZXNzaW9uc2hvd0FsZXJ0KHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtKTtcclxuICAgICAgICAgICAgY29udHJvbC5zZXRBbGVydEZuKGFsZXJ0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHdpcmVIaWRlcnNEaXNhYmxlcnMocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSxcclxuICAgICAgICBjb250cm9sOiBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAgfCBBZmVGb3JtQ29udHJvbCwgZm9ybT86IEZvcm0pIHtcclxuICAgICAgICBpZiAocXVlc3Rpb24uaGlkZSAmJiBxdWVzdGlvbi5oaWRlICE9PSAnJykge1xyXG4gICAgICAgICAgICBjb25zdCBoaWRlciA9IHRoaXMuaGlkZXJzRGlzYWJsZXJzRmFjdG9yeS5nZXRKc0V4cHJlc3Npb25IaWRlcihxdWVzdGlvbiwgY29udHJvbCwgZm9ybSk7XHJcbiAgICAgICAgICAgIGNvbnRyb2wuc2V0SGlkaW5nRm4oaGlkZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHF1ZXN0aW9uLmRpc2FibGUgJiYgcXVlc3Rpb24uZGlzYWJsZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgY29uc3QgZGlzYWJsZSA9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVyc0Rpc2FibGVyc0ZhY3RvcnkuZ2V0SnNFeHByZXNzaW9uRGlzYWJsZXIocXVlc3Rpb24sIGNvbnRyb2wsIGZvcm0pO1xyXG4gICAgICAgICAgICBjb250cm9sLnNldERpc2FibGluZ0ZuKGRpc2FibGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHdpcmVDYWxjdWxhdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsXHJcbiAgICAgICAgY29udHJvbDogQWZlRm9ybUNvbnRyb2wsIGRhdGFTb3VyY2U/OiBhbnkpIHtcclxuICAgICAgICBpZiAocXVlc3Rpb24uY2FsY3VsYXRlRXhwcmVzc2lvbiAmJiBxdWVzdGlvbi5jYWxjdWxhdGVFeHByZXNzaW9uICE9PSAnJykge1xyXG4gICAgICAgICAgICBjb25zdCBoZWxwZXI6IEpzRXhwcmVzc2lvbkhlbHBlciA9IG5ldyBKc0V4cHJlc3Npb25IZWxwZXIoKTtcclxuICAgICAgICAgICAgY29uc3QgcnVubmVyOiBFeHByZXNzaW9uUnVubmVyID0gbmV3IEV4cHJlc3Npb25SdW5uZXIoKTtcclxuICAgICAgICAgICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID0gcnVubmVyLmdldFJ1bm5hYmxlKHF1ZXN0aW9uLmNhbGN1bGF0ZUV4cHJlc3Npb25cclxuICAgICAgICAgICAgICAgICwgY29udHJvbCxcclxuICAgICAgICAgICAgICAgIGhlbHBlci5oZWxwZXJGdW5jdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBkYXRhU291cmNlKTtcclxuICAgICAgICAgICAgLy8gdGhpcyBmdW5jdGlvbmFsaXR5IHN0cmljdGx5IGFzc3VtZXMgdGhlIGNhbGN1bGF0ZUV4cHJlc3Npb24gZnVuY3Rpb24gaGFzIGJlZW4gZGVmaW5lZCBpbiB0aGUgSnNFeHByZXNzaW9uSGVscGVyIGNsYXNzXHJcbiAgICAgICAgICAgIGNvbnRyb2wuc2V0Q2FsY3VsYXRvckZuKHJ1bm5hYmxlLnJ1bik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIl19