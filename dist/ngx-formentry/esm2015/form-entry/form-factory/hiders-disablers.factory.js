/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
// Add ability to display all fields for debugging
import { DebugModeService } from './../services/debug-mode.service';
export class HidersDisablersFactory {
    /**
     * @param {?} expressionRunner
     * @param {?} expressionHelper
     * @param {?} _debugModeService
     */
    constructor(expressionRunner, expressionHelper, _debugModeService) {
        this.expressionRunner = expressionRunner;
        this.expressionHelper = expressionHelper;
        this._debugModeService = _debugModeService;
    }
    /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    getJsExpressionDisabler(question, control, form) {
        /** @type {?} */
        const runnable = this.expressionRunner.getRunnable((/** @type {?} */ (question.disable)), control, this.expressionHelper.helperFunctions, {}, form);
        /** @type {?} */
        const disabler = {
            toDisable: false,
            disableWhenExpression: (/** @type {?} */ (question.disable)),
            reEvaluateDisablingExpression: (/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const result = runnable.run();
                disabler.toDisable = result;
            })
        };
        return disabler;
    }
    /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    getJsExpressionHider(question, control, form) {
        /** @type {?} */
        const hide = question.hide;
        /** @type {?} */
        const value = typeof hide === 'object' ? this.convertHideObjectToString(hide) : (/** @type {?} */ (question.hide));
        // check if debugging has been enabled
        /** @type {?} */
        const debugEnabled = this._debugModeService.debugEnabled();
        /** @type {?} */
        const runnable = this.expressionRunner.getRunnable(value, control, this.expressionHelper.helperFunctions, {}, form);
        /** @type {?} */
        const hider = {
            toHide: false,
            hideWhenExpression: value,
            reEvaluateHidingExpression: (/**
             * @return {?}
             */
            () => {
                /* if debug is enabled then hiders to be false
                else run the normal eveluator i.e runnable.run()
                */
                if (debugEnabled === true) {
                    hider.toHide = false;
                }
                else {
                    hider.toHide = runnable.run();
                }
            })
        };
        return hider;
    }
    /**
     * @param {?} hide
     * @return {?}
     */
    convertHideObjectToString(hide) {
        if (hide.value instanceof Array) {
            /** @type {?} */
            const arrayStr = '\'' + hide.value.join('\',\'') + '\'';
            /** @type {?} */
            const exp = '!arrayContains([' + arrayStr + '],' + hide.field + ')';
            return exp;
        }
        return '';
    }
}
HidersDisablersFactory.decorators = [
    { type: Injectable },
];
HidersDisablersFactory.ctorParameters = () => [
    { type: ExpressionRunner },
    { type: JsExpressionHelper },
    { type: DebugModeService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    HidersDisablersFactory.prototype.expressionRunner;
    /**
     * @type {?}
     * @private
     */
    HidersDisablersFactory.prototype.expressionHelper;
    /**
     * @type {?}
     * @private
     */
    HidersDisablersFactory.prototype._debugModeService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBSXBGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOztBQUdyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUdwRSxNQUFNOzs7Ozs7SUFFRixZQUFvQixnQkFBa0MsRUFDN0MsZ0JBQW9DLEVBQ3BDLGlCQUFtQztRQUZ4QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzdDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0I7UUFDcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtJQUM1QyxDQUFDOzs7Ozs7O0lBRUQsdUJBQXVCLENBQUMsUUFBc0IsRUFBRSxPQUFxRCxFQUNqRyxJQUFXOztjQUNMLFFBQVEsR0FDVixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLG1CQUFBLFFBQVEsQ0FBQyxPQUFPLEVBQVUsRUFBRSxPQUFPLEVBQ2pFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQzs7Y0FDbEQsUUFBUSxHQUFhO1lBQ3ZCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLHFCQUFxQixFQUFFLG1CQUFBLFFBQVEsQ0FBQyxPQUFPLEVBQVU7WUFDakQsNkJBQTZCOzs7WUFBRSxHQUFHLEVBQUU7O3NCQUMxQixNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRTtnQkFDN0IsUUFBUSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7WUFDaEMsQ0FBQyxDQUFBO1NBQ0o7UUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ3BCLENBQUM7Ozs7Ozs7SUFFRCxvQkFBb0IsQ0FBQyxRQUFzQixFQUFFLE9BQXFELEVBQzlGLElBQVc7O2NBRUwsSUFBSSxHQUFRLFFBQVEsQ0FBQyxJQUFJOztjQUN6QixLQUFLLEdBQVcsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQVU7OztjQUl6RyxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRTs7Y0FFcEQsUUFBUSxHQUFhLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFDM0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDOztjQUUxQyxLQUFLLEdBQVU7WUFDakIsTUFBTSxFQUFFLEtBQUs7WUFDYixrQkFBa0IsRUFBRSxLQUFLO1lBQ3pCLDBCQUEwQjs7O1lBQUUsR0FBRyxFQUFFO2dCQUM1Qjs7a0JBRUU7Z0JBQ0gsRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFFO2dCQUMxQixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEtBQUssQ0FBQyxNQUFNLEdBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNuQyxDQUFDO1lBQ1AsQ0FBQyxDQUFBO1NBQ0o7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7O0lBRUQseUJBQXlCLENBQUMsSUFBUztRQUVqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7O2tCQUUxQixRQUFRLEdBQVcsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUk7O2tCQUN6RCxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUc7WUFDbkUsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNiLENBQUM7UUFFRCxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ1osQ0FBQzs7O1lBaEVKLFVBQVU7OztZQVRGLGdCQUFnQjtZQUloQixrQkFBa0I7WUFHbEIsZ0JBQWdCOzs7Ozs7O0lBS1Qsa0RBQTBDOzs7OztJQUNyRCxrREFBNEM7Ozs7O0lBQzVDLG1EQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IERpc2FibGVyIH0gZnJvbSAnLi4vY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1kaXNhYmxlJztcclxuaW1wb3J0IHsgSGlkZXIgfSBmcm9tICcuLi9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWhpZGUnO1xyXG5cclxuaW1wb3J0IHsgRXhwcmVzc2lvblJ1bm5lciwgUnVubmFibGUgfSBmcm9tICcuLi9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XHJcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sLCBBZmVGb3JtQXJyYXksIEFmZUZvcm1Hcm91cFxyXG59IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XHJcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcclxuaW1wb3J0IHsgSnNFeHByZXNzaW9uSGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9qcy1leHByZXNzaW9uLWhlbHBlcic7XHJcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xyXG4vLyBBZGQgYWJpbGl0eSB0byBkaXNwbGF5IGFsbCBmaWVsZHMgZm9yIGRlYnVnZ2luZ1xyXG5pbXBvcnQgeyBEZWJ1Z01vZGVTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSGlkZXJzRGlzYWJsZXJzRmFjdG9yeSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBleHByZXNzaW9uUnVubmVyOiBFeHByZXNzaW9uUnVubmVyLFxyXG4gICAgIHByaXZhdGUgZXhwcmVzc2lvbkhlbHBlcjogSnNFeHByZXNzaW9uSGVscGVyLFxyXG4gICAgIHByaXZhdGUgX2RlYnVnTW9kZVNlcnZpY2U6IERlYnVnTW9kZVNlcnZpY2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBnZXRKc0V4cHJlc3Npb25EaXNhYmxlcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcclxuICAgICAgICBmb3JtPzogRm9ybSk6IERpc2FibGVyIHtcclxuICAgICAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPVxyXG4gICAgICAgICAgICB0aGlzLmV4cHJlc3Npb25SdW5uZXIuZ2V0UnVubmFibGUocXVlc3Rpb24uZGlzYWJsZSBhcyBzdHJpbmcsIGNvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cHJlc3Npb25IZWxwZXIuaGVscGVyRnVuY3Rpb25zLCB7fSwgZm9ybSk7XHJcbiAgICAgICAgY29uc3QgZGlzYWJsZXI6IERpc2FibGVyID0ge1xyXG4gICAgICAgICAgICB0b0Rpc2FibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBkaXNhYmxlV2hlbkV4cHJlc3Npb246IHF1ZXN0aW9uLmRpc2FibGUgYXMgc3RyaW5nLFxyXG4gICAgICAgICAgICByZUV2YWx1YXRlRGlzYWJsaW5nRXhwcmVzc2lvbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcnVubmFibGUucnVuKCk7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlci50b0Rpc2FibGUgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBkaXNhYmxlcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRKc0V4cHJlc3Npb25IaWRlcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcclxuICAgICAgICBmb3JtPzogRm9ybSk6IEhpZGVyIHtcclxuXHJcbiAgICAgICAgY29uc3QgaGlkZTogYW55ID0gcXVlc3Rpb24uaGlkZTtcclxuICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdHlwZW9mIGhpZGUgPT09ICdvYmplY3QnID8gdGhpcy5jb252ZXJ0SGlkZU9iamVjdFRvU3RyaW5nKGhpZGUpIDogcXVlc3Rpb24uaGlkZSBhcyBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIGRlYnVnZ2luZyBoYXMgYmVlbiBlbmFibGVkXHJcblxyXG4gICAgICAgIGNvbnN0IGRlYnVnRW5hYmxlZCA9IHRoaXMuX2RlYnVnTW9kZVNlcnZpY2UuZGVidWdFbmFibGVkKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJ1bm5hYmxlOiBSdW5uYWJsZSA9IHRoaXMuZXhwcmVzc2lvblJ1bm5lci5nZXRSdW5uYWJsZSh2YWx1ZSwgY29udHJvbCxcclxuICAgICAgICB0aGlzLmV4cHJlc3Npb25IZWxwZXIuaGVscGVyRnVuY3Rpb25zLCB7fSwgZm9ybSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGhpZGVyOiBIaWRlciA9IHtcclxuICAgICAgICAgICAgdG9IaWRlOiBmYWxzZSxcclxuICAgICAgICAgICAgaGlkZVdoZW5FeHByZXNzaW9uOiB2YWx1ZSxcclxuICAgICAgICAgICAgcmVFdmFsdWF0ZUhpZGluZ0V4cHJlc3Npb246ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAvKiBpZiBkZWJ1ZyBpcyBlbmFibGVkIHRoZW4gaGlkZXJzIHRvIGJlIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgZWxzZSBydW4gdGhlIG5vcm1hbCBldmVsdWF0b3IgaS5lIHJ1bm5hYmxlLnJ1bigpXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGlmIChkZWJ1Z0VuYWJsZWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGhpZGVyLnRvSGlkZSA9IGZhbHNlIDtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGhpZGVyLnRvSGlkZSA9ICBydW5uYWJsZS5ydW4oKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gaGlkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgY29udmVydEhpZGVPYmplY3RUb1N0cmluZyhoaWRlOiBhbnkpIHtcclxuXHJcbiAgICAgIGlmIChoaWRlLnZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHJcbiAgICAgICAgY29uc3QgYXJyYXlTdHI6IHN0cmluZyA9ICdcXCcnICsgaGlkZS52YWx1ZS5qb2luKCdcXCcsXFwnJykgKyAnXFwnJztcclxuICAgICAgICBjb25zdCBleHAgPSAnIWFycmF5Q29udGFpbnMoWycgKyBhcnJheVN0ciArICddLCcgKyBoaWRlLmZpZWxkICsgJyknO1xyXG4gICAgICAgIHJldHVybiBleHA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxufVxyXG4iXX0=