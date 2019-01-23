/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            reEvaluateDisablingExpression: () => {
                /** @type {?} */
                const result = runnable.run();
                disabler.toDisable = result;
            }
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
            reEvaluateHidingExpression: () => {
                /* if debug is enabled then hiders to be false
                else run the normal eveluator i.e runnable.run()
                */
                if (debugEnabled === true) {
                    hider.toHide = false;
                }
                else {
                    hider.toHide = runnable.run();
                }
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBSXBGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOztBQUdyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUdwRSxNQUFNOzs7Ozs7SUFFRixZQUFvQixnQkFBa0MsRUFDN0MsZ0JBQW9DLEVBQ3BDLGlCQUFtQztRQUZ4QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzdDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0I7UUFDcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtJQUM1QyxDQUFDOzs7Ozs7O0lBRUQsdUJBQXVCLENBQUMsUUFBc0IsRUFBRSxPQUFxRCxFQUNqRyxJQUFXOztjQUNMLFFBQVEsR0FDVixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLG1CQUFBLFFBQVEsQ0FBQyxPQUFPLEVBQVUsRUFBRSxPQUFPLEVBQ2pFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQzs7Y0FDbEQsUUFBUSxHQUFhO1lBQ3ZCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLHFCQUFxQixFQUFFLG1CQUFBLFFBQVEsQ0FBQyxPQUFPLEVBQVU7WUFDakQsNkJBQTZCLEVBQUUsR0FBRyxFQUFFOztzQkFDMUIsTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUU7Z0JBQzdCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBQ2hDLENBQUM7U0FDSjtRQUNELE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDcEIsQ0FBQzs7Ozs7OztJQUVELG9CQUFvQixDQUFDLFFBQXNCLEVBQUUsT0FBcUQsRUFDOUYsSUFBVzs7Y0FFTCxJQUFJLEdBQVEsUUFBUSxDQUFDLElBQUk7O2NBQ3pCLEtBQUssR0FBVyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQUEsUUFBUSxDQUFDLElBQUksRUFBVTs7O2NBSXpHLFlBQVksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFOztjQUVwRCxRQUFRLEdBQWEsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUMzRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUM7O2NBRTFDLEtBQUssR0FBVTtZQUNqQixNQUFNLEVBQUUsS0FBSztZQUNiLGtCQUFrQixFQUFFLEtBQUs7WUFDekIsMEJBQTBCLEVBQUUsR0FBRyxFQUFFO2dCQUM1Qjs7a0JBRUU7Z0JBQ0gsRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFFO2dCQUMxQixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEtBQUssQ0FBQyxNQUFNLEdBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNuQyxDQUFDO1lBQ1AsQ0FBQztTQUNKO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7OztJQUVELHlCQUF5QixDQUFDLElBQVM7UUFFakMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDOztrQkFFMUIsUUFBUSxHQUFXLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJOztrQkFDekQsR0FBRyxHQUFHLGtCQUFrQixHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHO1lBQ25FLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDYixDQUFDO1FBRUQsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNaLENBQUM7OztZQWhFSixVQUFVOzs7WUFURixnQkFBZ0I7WUFJaEIsa0JBQWtCO1lBR2xCLGdCQUFnQjs7Ozs7OztJQUtULGtEQUEwQzs7Ozs7SUFDckQsa0RBQTRDOzs7OztJQUM1QyxtREFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERpc2FibGVyIH0gZnJvbSAnLi4vY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1kaXNhYmxlJztcbmltcG9ydCB7IEhpZGVyIH0gZnJvbSAnLi4vY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcblxuaW1wb3J0IHsgRXhwcmVzc2lvblJ1bm5lciwgUnVubmFibGUgfSBmcm9tICcuLi9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCwgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXBcbn0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4uL2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXInO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XG4vLyBBZGQgYWJpbGl0eSB0byBkaXNwbGF5IGFsbCBmaWVsZHMgZm9yIGRlYnVnZ2luZ1xuaW1wb3J0IHsgRGVidWdNb2RlU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvZGVidWctbW9kZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhpZGVyc0Rpc2FibGVyc0ZhY3Rvcnkge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBleHByZXNzaW9uUnVubmVyOiBFeHByZXNzaW9uUnVubmVyLFxuICAgICBwcml2YXRlIGV4cHJlc3Npb25IZWxwZXI6IEpzRXhwcmVzc2lvbkhlbHBlcixcbiAgICAgcHJpdmF0ZSBfZGVidWdNb2RlU2VydmljZTogRGVidWdNb2RlU2VydmljZSkge1xuICAgIH1cblxuICAgIGdldEpzRXhwcmVzc2lvbkRpc2FibGVyKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgICAgICBmb3JtPzogRm9ybSk6IERpc2FibGVyIHtcbiAgICAgICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID1cbiAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvblJ1bm5lci5nZXRSdW5uYWJsZShxdWVzdGlvbi5kaXNhYmxlIGFzIHN0cmluZywgY29udHJvbCxcbiAgICAgICAgICAgICAgICB0aGlzLmV4cHJlc3Npb25IZWxwZXIuaGVscGVyRnVuY3Rpb25zLCB7fSwgZm9ybSk7XG4gICAgICAgIGNvbnN0IGRpc2FibGVyOiBEaXNhYmxlciA9IHtcbiAgICAgICAgICAgIHRvRGlzYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBkaXNhYmxlV2hlbkV4cHJlc3Npb246IHF1ZXN0aW9uLmRpc2FibGUgYXMgc3RyaW5nLFxuICAgICAgICAgICAgcmVFdmFsdWF0ZURpc2FibGluZ0V4cHJlc3Npb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBydW5uYWJsZS5ydW4oKTtcbiAgICAgICAgICAgICAgICBkaXNhYmxlci50b0Rpc2FibGUgPSByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBkaXNhYmxlcjtcbiAgICB9XG5cbiAgICBnZXRKc0V4cHJlc3Npb25IaWRlcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICAgICAgZm9ybT86IEZvcm0pOiBIaWRlciB7XG5cbiAgICAgICAgY29uc3QgaGlkZTogYW55ID0gcXVlc3Rpb24uaGlkZTtcbiAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHR5cGVvZiBoaWRlID09PSAnb2JqZWN0JyA/IHRoaXMuY29udmVydEhpZGVPYmplY3RUb1N0cmluZyhoaWRlKSA6IHF1ZXN0aW9uLmhpZGUgYXMgc3RyaW5nO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGRlYnVnZ2luZyBoYXMgYmVlbiBlbmFibGVkXG5cbiAgICAgICAgY29uc3QgZGVidWdFbmFibGVkID0gdGhpcy5fZGVidWdNb2RlU2VydmljZS5kZWJ1Z0VuYWJsZWQoKTtcblxuICAgICAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPSB0aGlzLmV4cHJlc3Npb25SdW5uZXIuZ2V0UnVubmFibGUodmFsdWUsIGNvbnRyb2wsXG4gICAgICAgIHRoaXMuZXhwcmVzc2lvbkhlbHBlci5oZWxwZXJGdW5jdGlvbnMsIHt9LCBmb3JtKTtcblxuICAgICAgICBjb25zdCBoaWRlcjogSGlkZXIgPSB7XG4gICAgICAgICAgICB0b0hpZGU6IGZhbHNlLFxuICAgICAgICAgICAgaGlkZVdoZW5FeHByZXNzaW9uOiB2YWx1ZSxcbiAgICAgICAgICAgIHJlRXZhbHVhdGVIaWRpbmdFeHByZXNzaW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgIC8qIGlmIGRlYnVnIGlzIGVuYWJsZWQgdGhlbiBoaWRlcnMgdG8gYmUgZmFsc2VcbiAgICAgICAgICAgICAgICAgZWxzZSBydW4gdGhlIG5vcm1hbCBldmVsdWF0b3IgaS5lIHJ1bm5hYmxlLnJ1bigpXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKGRlYnVnRW5hYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGhpZGVyLnRvSGlkZSA9IGZhbHNlIDtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgaGlkZXIudG9IaWRlID0gIHJ1bm5hYmxlLnJ1bigpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gaGlkZXI7XG4gICAgfVxuXG4gICAgY29udmVydEhpZGVPYmplY3RUb1N0cmluZyhoaWRlOiBhbnkpIHtcblxuICAgICAgaWYgKGhpZGUudmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuXG4gICAgICAgIGNvbnN0IGFycmF5U3RyOiBzdHJpbmcgPSAnXFwnJyArIGhpZGUudmFsdWUuam9pbignXFwnLFxcJycpICsgJ1xcJyc7XG4gICAgICAgIGNvbnN0IGV4cCA9ICchYXJyYXlDb250YWlucyhbJyArIGFycmF5U3RyICsgJ10sJyArIGhpZGUuZmllbGQgKyAnKSc7XG4gICAgICAgIHJldHVybiBleHA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnJztcbiAgICB9XG59XG4iXX0=