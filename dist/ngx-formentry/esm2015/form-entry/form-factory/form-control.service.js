/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            questions.forEach(element => {
                /** @type {?} */
                const generated = this.generateControlModel(element, parentControl, true, form);
                if (generated !== null) {
                    parentControl.addControl(element.key, generated);
                }
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLWNvbnRyb2wuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUNsRSxNQUFNLG1DQUFtQyxDQUFDO0FBSTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFZLE1BQU0sd0NBQXdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFJckUsTUFBTTs7Ozs7O0lBS0YsWUFBWSxpQkFBb0MsRUFDNUMsc0JBQThDLEVBQVUsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFMeEYsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQU1WLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsc0JBQXNCLENBQUM7SUFDekQsQ0FBQzs7Ozs7Ozs7SUFFRCxvQkFBb0IsQ0FBQyxhQUE0QyxFQUFFLGFBQTJCLEVBQzFGLGdCQUF5QixFQUFFLElBQVc7UUFDdEMsRUFBRSxDQUFDLENBQUMsYUFBYSxZQUFZLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDeEMsRUFBRSxDQUFDLENBQUMsYUFBYSxD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O1FBQ3BDLENBQUM7SUFDTCxDQUFDOzs7Ozs7OztJQUVPLGNBQWMsQ0FBQyxRQUFzQixFQUN6QyxPQUF1QixFQUFFLFVBQWdCO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsSUFBSSxRQUFRLENBQUMsbUJBQW1CLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzs7a0JBQ2hFLE1BQU0sR0FBdUIsSUFBSSxrQkFBa0IsRUFBRTs7a0JBQ3JELE1BQU0sR0FBcUIsSUFBSSxnQkFBZ0IsRUFBRTs7a0JBQ2pELFFBQVEsR0FBYSxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFDcEUsT0FBTyxFQUNULE1BQU0sQ0FBQyxlQUFlLEVBQ3RCLFVBQVUsQ0FBQztZQUNmLHdIQUF3SDtZQUN4SCxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxDQUFDO0lBRUwsQ0FBQzs7O1lBbklKLFVBQVU7OztZQVJGLGlCQUFpQjtZQUNqQixzQkFBc0I7WUFDdEIsYUFBYTs7OztJQVFsQixzQ0FBYzs7SUFDZCwrQ0FBcUM7O0lBQ3JDLG9EQUErQzs7Ozs7SUFHSywyQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEFmZUZvcm1Db250cm9sLCBBZmVGb3JtQXJyYXksIEFmZUZvcm1Hcm91cCwgQWZlQ29udHJvbFR5cGVcbn0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcblxuaW1wb3J0IHsgTmVzdGVkUXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9uZXN0ZWQtcXVlc3Rpb25zJztcblxuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25Hcm91cCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbic7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRmFjdG9yeSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS92YWxpZGF0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgSGlkZXJzRGlzYWJsZXJzRmFjdG9yeSB9IGZyb20gJy4vaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5JztcbmltcG9ydCB7IEFsZXJ0c0ZhY3RvcnkgfSBmcm9tICcuL3Nob3ctbWVzc2FnZXMuZmFjdG9yeSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcbmltcG9ydCB7IEV4cHJlc3Npb25SdW5uZXIsIFJ1bm5hYmxlIH0gZnJvbSAnLi4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uSGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9qcy1leHByZXNzaW9uLWhlbHBlcic7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1Db250cm9sU2VydmljZSB7XG4gICAgY29udHJvbHMgPSBbXTtcbiAgICB2YWxpZGF0aW9uRmFjdG9yeTogVmFsaWRhdGlvbkZhY3Rvcnk7XG4gICAgaGlkZXJzRGlzYWJsZXJzRmFjdG9yeTogSGlkZXJzRGlzYWJsZXJzRmFjdG9yeTtcblxuICAgIGNvbnN0cnVjdG9yKHZhbGlkYXRpb25GYWN0b3J5OiBWYWxpZGF0aW9uRmFjdG9yeSxcbiAgICAgICAgaGlkZXJzRGlzYWJsZXJzRmFjdG9yeTogSGlkZXJzRGlzYWJsZXJzRmFjdG9yeSwgcHJpdmF0ZSBhbGVydHNGYWN0b3J5OiBBbGVydHNGYWN0b3J5KSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkZhY3RvcnkgPSB2YWxpZGF0aW9uRmFjdG9yeTtcbiAgICAgICAgdGhpcy5oaWRlcnNEaXNhYmxlcnNGYWN0b3J5ID0gaGlkZXJzRGlzYWJsZXJzRmFjdG9yeTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUNvbnRyb2xNb2RlbChxdWVzdGlvbk1vZGVsOiBRdWVzdGlvbkJhc2UgfCBOZXN0ZWRRdWVzdGlvbiwgcGFyZW50Q29udHJvbDogQWZlRm9ybUdyb3VwLFxuICAgICAgICBnZW5lcmF0ZUNoaWxkcmVuOiBib29sZWFuLCBmb3JtPzogRm9ybSk6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHtcbiAgICAgICAgaWYgKHF1ZXN0aW9uTW9kZWwgaW5zdGFuY2VvZiBRdWVzdGlvbkJhc2UpIHtcbiAgICAgICAgICAgIGlmIChxdWVzdGlvbk1vZGVsLmNvbnRyb2xUeXBlID09PSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQXJyYXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUZvcm1BcnJheShxdWVzdGlvbk1vZGVsLCBwYXJlbnRDb250cm9sLCBmb3JtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChxdWVzdGlvbk1vZGVsLmNvbnRyb2xUeXBlID09PSBBZmVDb250cm9sVHlwZS5BZmVGb3JtR3JvdXApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUZvcm1Hcm91cE1vZGVsKHF1ZXN0aW9uTW9kZWwsIGdlbmVyYXRlQ2hpbGRyZW4sIHBhcmVudENvbnRyb2wsIGZvcm0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocXVlc3Rpb25Nb2RlbC5jb250cm9sVHlwZSA9PT0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUZvcm1Db250cm9sKHF1ZXN0aW9uTW9kZWwsIHBhcmVudENvbnRyb2wsIGZvcm0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGdlbmVyYXRlRm9ybUdyb3VwTW9kZWwocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgZ2VuZXJhdGVDaGlsZHJlbjogYm9vbGVhbixcbiAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBBZmVGb3JtR3JvdXAge1xuICAgICAgICBjb25zdCBmb3JtR3JvdXAgPSBuZXcgQWZlRm9ybUdyb3VwKHt9KTtcbiAgICAgICAgdGhpcy53aXJlSGlkZXJzRGlzYWJsZXJzKHF1ZXN0aW9uLCBmb3JtR3JvdXAsIGZvcm0pO1xuICAgICAgICB0aGlzLndpcmVBbGVydHMocXVlc3Rpb24sIGZvcm1Hcm91cCwgZm9ybSk7XG4gICAgICAgIGlmIChwYXJlbnRDb250cm9sIGluc3RhbmNlb2YgQWZlRm9ybUdyb3VwKSB7XG4gICAgICAgICAgICBwYXJlbnRDb250cm9sLnNldENvbnRyb2wocXVlc3Rpb24ua2V5LCBmb3JtR3JvdXApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXNHcm91cCA9IHF1ZXN0aW9uIGFzIFF1ZXN0aW9uR3JvdXA7XG5cbiAgICAgICAgaWYgKGdlbmVyYXRlQ2hpbGRyZW4gJiYgYXNHcm91cCAmJiBhc0dyb3VwLnF1ZXN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZUZvcm1Hcm91cENoaWxkcmVuTW9kZWwoYXNHcm91cC5xdWVzdGlvbnMsIGZvcm1Hcm91cCwgZm9ybSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybUdyb3VwO1xuICAgIH1cblxuICAgIF9nZW5lcmF0ZUZvcm1Hcm91cENoaWxkcmVuTW9kZWwocXVlc3Rpb25zOiBRdWVzdGlvbkJhc2VbXSwgcGFyZW50Q29udHJvbDogQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSkge1xuXG4gICAgICAgIGlmIChxdWVzdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcXVlc3Rpb25zLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ2VuZXJhdGVkID0gdGhpcy5nZW5lcmF0ZUNvbnRyb2xNb2RlbChlbGVtZW50LCBwYXJlbnRDb250cm9sLCB0cnVlLCBmb3JtKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2VuZXJhdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRyb2wuYWRkQ29udHJvbChlbGVtZW50LmtleSwgZ2VuZXJhdGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZ2VuZXJhdGVGb3JtQXJyYXkocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBBZmVGb3JtQXJyYXkge1xuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRvcnMgPSB0aGlzLnZhbGlkYXRpb25GYWN0b3J5LmdldFZhbGlkYXRvcnMocXVlc3Rpb24sIGZvcm0pO1xuICAgICAgICAgbGV0IGZvcm1BcnJheTogQWZlRm9ybUFycmF5O1xuICAgICAgICAgaWYgKHZhbGlkYXRvcnMgJiYgdmFsaWRhdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgZm9ybUFycmF5ID0gbmV3IEFmZUZvcm1BcnJheShbXSwgdmFsaWRhdG9yc1swXSk7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9ybUFycmF5ID0gbmV3IEFmZUZvcm1BcnJheShbXSk7XG4gICAgICAgICB9XG4gICAgICAgIGZvcm1BcnJheS51dWlkID0gcXVlc3Rpb24ua2V5O1xuICAgICAgICB0aGlzLndpcmVIaWRlcnNEaXNhYmxlcnMocXVlc3Rpb24sIGZvcm1BcnJheSwgZm9ybSk7XG4gICAgICAgIHRoaXMud2lyZUFsZXJ0cyhxdWVzdGlvbiwgZm9ybUFycmF5LCBmb3JtKTtcbiAgICAgICAgaWYgKHBhcmVudENvbnRyb2wgaW5zdGFuY2VvZiBBZmVGb3JtR3JvdXApIHtcbiAgICAgICAgICAgIHBhcmVudENvbnRyb2wuc2V0Q29udHJvbChxdWVzdGlvbi5rZXksIGZvcm1BcnJheSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybUFycmF5O1xuICAgIH1cblxuICAgIGdlbmVyYXRlRm9ybUNvbnRyb2wocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBBZmVGb3JtQ29udHJvbCB7XG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSBxdWVzdGlvbi5kZWZhdWx0VmFsdWUgfHwgJyc7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRvcnMgPSB0aGlzLnZhbGlkYXRpb25GYWN0b3J5LmdldFZhbGlkYXRvcnMocXVlc3Rpb24sIGZvcm0pO1xuXG4gICAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgQWZlRm9ybUNvbnRyb2wodmFsdWUsIHZhbGlkYXRvcnMpO1xuICAgICAgICBjb250cm9sLnV1aWQgPSBxdWVzdGlvbi5rZXk7XG4gICAgICAgIHRoaXMud2lyZUhpZGVyc0Rpc2FibGVycyhxdWVzdGlvbiwgY29udHJvbCwgZm9ybSk7XG4gICAgICAgIHRoaXMud2lyZUFsZXJ0cyhxdWVzdGlvbiwgY29udHJvbCwgZm9ybSk7XG4gICAgICAgIHRoaXMud2lyZUNhbGN1bGF0b3IocXVlc3Rpb24sIGNvbnRyb2wsIChmb3JtID8gZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcyA6IG51bGwpKTtcblxuICAgICAgICBpZiAocGFyZW50Q29udHJvbCBpbnN0YW5jZW9mIEFmZUZvcm1Hcm91cCkge1xuICAgICAgICAgICAgcGFyZW50Q29udHJvbC5zZXRDb250cm9sKHF1ZXN0aW9uLmtleSwgY29udHJvbCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29udHJvbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHdpcmVBbGVydHMocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSxcbiAgICAgICAgY29udHJvbDogQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHwgQWZlRm9ybUNvbnRyb2wsIGZvcm0/OiBGb3JtKSB7XG4gICAgICAgIGlmIChxdWVzdGlvbi5hbGVydCAmJiBxdWVzdGlvbi5hbGVydCAhPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnN0IGFsZXJ0ID0gdGhpcy5hbGVydHNGYWN0b3J5LmdldEpzRXhwcmVzc2lvbnNob3dBbGVydChxdWVzdGlvbiwgY29udHJvbCwgZm9ybSk7XG4gICAgICAgICAgICBjb250cm9sLnNldEFsZXJ0Rm4oYWxlcnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgd2lyZUhpZGVyc0Rpc2FibGVycyhxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxuICAgICAgICBjb250cm9sOiBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAgfCBBZmVGb3JtQ29udHJvbCwgZm9ybT86IEZvcm0pIHtcbiAgICAgICAgaWYgKHF1ZXN0aW9uLmhpZGUgJiYgcXVlc3Rpb24uaGlkZSAhPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnN0IGhpZGVyID0gdGhpcy5oaWRlcnNEaXNhYmxlcnNGYWN0b3J5LmdldEpzRXhwcmVzc2lvbkhpZGVyKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtKTtcbiAgICAgICAgICAgIGNvbnRyb2wuc2V0SGlkaW5nRm4oaGlkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHF1ZXN0aW9uLmRpc2FibGUgJiYgcXVlc3Rpb24uZGlzYWJsZSAhPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpc2FibGUgPVxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZXJzRGlzYWJsZXJzRmFjdG9yeS5nZXRKc0V4cHJlc3Npb25EaXNhYmxlcihxdWVzdGlvbiwgY29udHJvbCwgZm9ybSk7XG4gICAgICAgICAgICBjb250cm9sLnNldERpc2FibGluZ0ZuKGRpc2FibGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3aXJlQ2FsY3VsYXRvcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxuICAgICAgICBjb250cm9sOiBBZmVGb3JtQ29udHJvbCwgZGF0YVNvdXJjZT86IGFueSkge1xuICAgICAgICBpZiAocXVlc3Rpb24uY2FsY3VsYXRlRXhwcmVzc2lvbiAmJiBxdWVzdGlvbi5jYWxjdWxhdGVFeHByZXNzaW9uICE9PSAnJykge1xuICAgICAgICAgICAgY29uc3QgaGVscGVyOiBKc0V4cHJlc3Npb25IZWxwZXIgPSBuZXcgSnNFeHByZXNzaW9uSGVscGVyKCk7XG4gICAgICAgICAgICBjb25zdCBydW5uZXI6IEV4cHJlc3Npb25SdW5uZXIgPSBuZXcgRXhwcmVzc2lvblJ1bm5lcigpO1xuICAgICAgICAgICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID0gcnVubmVyLmdldFJ1bm5hYmxlKHF1ZXN0aW9uLmNhbGN1bGF0ZUV4cHJlc3Npb25cbiAgICAgICAgICAgICAgICAsIGNvbnRyb2wsXG4gICAgICAgICAgICAgICAgaGVscGVyLmhlbHBlckZ1bmN0aW9ucyxcbiAgICAgICAgICAgICAgICBkYXRhU291cmNlKTtcbiAgICAgICAgICAgIC8vIHRoaXMgZnVuY3Rpb25hbGl0eSBzdHJpY3RseSBhc3N1bWVzIHRoZSBjYWxjdWxhdGVFeHByZXNzaW9uIGZ1bmN0aW9uIGhhcyBiZWVuIGRlZmluZWQgaW4gdGhlIEpzRXhwcmVzc2lvbkhlbHBlciBjbGFzc1xuICAgICAgICAgICAgY29udHJvbC5zZXRDYWxjdWxhdG9yRm4ocnVubmFibGUucnVuKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iXX0=