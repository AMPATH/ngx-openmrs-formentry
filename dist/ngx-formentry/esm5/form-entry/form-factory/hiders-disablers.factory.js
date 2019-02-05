/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
// Add ability to display all fields for debugging
import { DebugModeService } from './../services/debug-mode.service';
var HidersDisablersFactory = /** @class */ (function () {
    function HidersDisablersFactory(expressionRunner, expressionHelper, _debugModeService) {
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
    HidersDisablersFactory.prototype.getJsExpressionDisabler = /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    function (question, control, form) {
        /** @type {?} */
        var runnable = this.expressionRunner.getRunnable((/** @type {?} */ (question.disable)), control, this.expressionHelper.helperFunctions, {}, form);
        /** @type {?} */
        var disabler = {
            toDisable: false,
            disableWhenExpression: (/** @type {?} */ (question.disable)),
            reEvaluateDisablingExpression: (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var result = runnable.run();
                disabler.toDisable = result;
            })
        };
        return disabler;
    };
    /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    HidersDisablersFactory.prototype.getJsExpressionHider = /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    function (question, control, form) {
        /** @type {?} */
        var hide = question.hide;
        /** @type {?} */
        var value = typeof hide === 'object' ? this.convertHideObjectToString(hide) : (/** @type {?} */ (question.hide));
        // check if debugging has been enabled
        /** @type {?} */
        var debugEnabled = this._debugModeService.debugEnabled();
        /** @type {?} */
        var runnable = this.expressionRunner.getRunnable(value, control, this.expressionHelper.helperFunctions, {}, form);
        /** @type {?} */
        var hider = {
            toHide: false,
            hideWhenExpression: value,
            reEvaluateHidingExpression: (/**
             * @return {?}
             */
            function () {
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
    };
    /**
     * @param {?} hide
     * @return {?}
     */
    HidersDisablersFactory.prototype.convertHideObjectToString = /**
     * @param {?} hide
     * @return {?}
     */
    function (hide) {
        if (hide.value instanceof Array) {
            /** @type {?} */
            var arrayStr = '\'' + hide.value.join('\',\'') + '\'';
            /** @type {?} */
            var exp = '!arrayContains([' + arrayStr + '],' + hide.field + ')';
            return exp;
        }
        return '';
    };
    HidersDisablersFactory.decorators = [
        { type: Injectable },
    ];
    HidersDisablersFactory.ctorParameters = function () { return [
        { type: ExpressionRunner },
        { type: JsExpressionHelper },
        { type: DebugModeService }
    ]; };
    return HidersDisablersFactory;
}());
export { HidersDisablersFactory };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBSXBGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOztBQUdyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVwRTtJQUdJLGdDQUFvQixnQkFBa0MsRUFDN0MsZ0JBQW9DLEVBQ3BDLGlCQUFtQztRQUZ4QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzdDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0I7UUFDcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtJQUM1QyxDQUFDOzs7Ozs7O0lBRUQsd0RBQXVCOzs7Ozs7SUFBdkIsVUFBd0IsUUFBc0IsRUFBRSxPQUFxRCxFQUNqRyxJQUFXOztZQUNMLFFBQVEsR0FDVixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLG1CQUFBLFFBQVEsQ0FBQyxPQUFPLEVBQVUsRUFBRSxPQUFPLEVBQ2pFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQzs7WUFDbEQsUUFBUSxHQUFhO1lBQ3ZCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLHFCQUFxQixFQUFFLG1CQUFBLFFBQVEsQ0FBQyxPQUFPLEVBQVU7WUFDakQsNkJBQTZCOzs7WUFBRTs7b0JBQ3JCLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFO2dCQUM3QixRQUFRLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztZQUNoQyxDQUFDLENBQUE7U0FDSjtRQUNELE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDcEIsQ0FBQzs7Ozs7OztJQUVELHFEQUFvQjs7Ozs7O0lBQXBCLFVBQXFCLFFBQXNCLEVBQUUsT0FBcUQsRUFDOUYsSUFBVzs7WUFFTCxJQUFJLEdBQVEsUUFBUSxDQUFDLElBQUk7O1lBQ3pCLEtBQUssR0FBVyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQUEsUUFBUSxDQUFDLElBQUksRUFBVTs7O1lBSXpHLFlBQVksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFOztZQUVwRCxRQUFRLEdBQWEsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUMzRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUM7O1lBRTFDLEtBQUssR0FBVTtZQUNqQixNQUFNLEVBQUUsS0FBSztZQUNiLGtCQUFrQixFQUFFLEtBQUs7WUFDekIsMEJBQTBCOzs7WUFBRTtnQkFDdkI7O2tCQUVFO2dCQUNILEVBQUUsQ0FBQyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN0QixLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBRTtnQkFDMUIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixLQUFLLENBQUMsTUFBTSxHQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDbkMsQ0FBQztZQUNQLENBQUMsQ0FBQTtTQUNKO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7OztJQUVELDBEQUF5Qjs7OztJQUF6QixVQUEwQixJQUFTO1FBRWpDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQzs7Z0JBRTFCLFFBQVEsR0FBVyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSTs7Z0JBQ3pELEdBQUcsR0FBRyxrQkFBa0IsR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRztZQUNuRSxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2IsQ0FBQztRQUVELE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDWixDQUFDOztnQkFoRUosVUFBVTs7O2dCQVRGLGdCQUFnQjtnQkFJaEIsa0JBQWtCO2dCQUdsQixnQkFBZ0I7O0lBbUV6Qiw2QkFBQztDQUFBLEFBakVELElBaUVDO1NBaEVZLHNCQUFzQjs7Ozs7O0lBRW5CLGtEQUEwQzs7Ozs7SUFDckQsa0RBQTRDOzs7OztJQUM1QyxtREFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERpc2FibGVyIH0gZnJvbSAnLi4vY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1kaXNhYmxlJztcbmltcG9ydCB7IEhpZGVyIH0gZnJvbSAnLi4vY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcblxuaW1wb3J0IHsgRXhwcmVzc2lvblJ1bm5lciwgUnVubmFibGUgfSBmcm9tICcuLi9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCwgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXBcbn0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4uL2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXInO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XG4vLyBBZGQgYWJpbGl0eSB0byBkaXNwbGF5IGFsbCBmaWVsZHMgZm9yIGRlYnVnZ2luZ1xuaW1wb3J0IHsgRGVidWdNb2RlU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvZGVidWctbW9kZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhpZGVyc0Rpc2FibGVyc0ZhY3Rvcnkge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBleHByZXNzaW9uUnVubmVyOiBFeHByZXNzaW9uUnVubmVyLFxuICAgICBwcml2YXRlIGV4cHJlc3Npb25IZWxwZXI6IEpzRXhwcmVzc2lvbkhlbHBlcixcbiAgICAgcHJpdmF0ZSBfZGVidWdNb2RlU2VydmljZTogRGVidWdNb2RlU2VydmljZSkge1xuICAgIH1cblxuICAgIGdldEpzRXhwcmVzc2lvbkRpc2FibGVyKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgICAgICBmb3JtPzogRm9ybSk6IERpc2FibGVyIHtcbiAgICAgICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID1cbiAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvblJ1bm5lci5nZXRSdW5uYWJsZShxdWVzdGlvbi5kaXNhYmxlIGFzIHN0cmluZywgY29udHJvbCxcbiAgICAgICAgICAgICAgICB0aGlzLmV4cHJlc3Npb25IZWxwZXIuaGVscGVyRnVuY3Rpb25zLCB7fSwgZm9ybSk7XG4gICAgICAgIGNvbnN0IGRpc2FibGVyOiBEaXNhYmxlciA9IHtcbiAgICAgICAgICAgIHRvRGlzYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBkaXNhYmxlV2hlbkV4cHJlc3Npb246IHF1ZXN0aW9uLmRpc2FibGUgYXMgc3RyaW5nLFxuICAgICAgICAgICAgcmVFdmFsdWF0ZURpc2FibGluZ0V4cHJlc3Npb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBydW5uYWJsZS5ydW4oKTtcbiAgICAgICAgICAgICAgICBkaXNhYmxlci50b0Rpc2FibGUgPSByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBkaXNhYmxlcjtcbiAgICB9XG5cbiAgICBnZXRKc0V4cHJlc3Npb25IaWRlcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICAgICAgZm9ybT86IEZvcm0pOiBIaWRlciB7XG5cbiAgICAgICAgY29uc3QgaGlkZTogYW55ID0gcXVlc3Rpb24uaGlkZTtcbiAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHR5cGVvZiBoaWRlID09PSAnb2JqZWN0JyA/IHRoaXMuY29udmVydEhpZGVPYmplY3RUb1N0cmluZyhoaWRlKSA6IHF1ZXN0aW9uLmhpZGUgYXMgc3RyaW5nO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGRlYnVnZ2luZyBoYXMgYmVlbiBlbmFibGVkXG5cbiAgICAgICAgY29uc3QgZGVidWdFbmFibGVkID0gdGhpcy5fZGVidWdNb2RlU2VydmljZS5kZWJ1Z0VuYWJsZWQoKTtcblxuICAgICAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPSB0aGlzLmV4cHJlc3Npb25SdW5uZXIuZ2V0UnVubmFibGUodmFsdWUsIGNvbnRyb2wsXG4gICAgICAgIHRoaXMuZXhwcmVzc2lvbkhlbHBlci5oZWxwZXJGdW5jdGlvbnMsIHt9LCBmb3JtKTtcblxuICAgICAgICBjb25zdCBoaWRlcjogSGlkZXIgPSB7XG4gICAgICAgICAgICB0b0hpZGU6IGZhbHNlLFxuICAgICAgICAgICAgaGlkZVdoZW5FeHByZXNzaW9uOiB2YWx1ZSxcbiAgICAgICAgICAgIHJlRXZhbHVhdGVIaWRpbmdFeHByZXNzaW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgIC8qIGlmIGRlYnVnIGlzIGVuYWJsZWQgdGhlbiBoaWRlcnMgdG8gYmUgZmFsc2VcbiAgICAgICAgICAgICAgICAgZWxzZSBydW4gdGhlIG5vcm1hbCBldmVsdWF0b3IgaS5lIHJ1bm5hYmxlLnJ1bigpXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKGRlYnVnRW5hYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGhpZGVyLnRvSGlkZSA9IGZhbHNlIDtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgaGlkZXIudG9IaWRlID0gIHJ1bm5hYmxlLnJ1bigpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gaGlkZXI7XG4gICAgfVxuXG4gICAgY29udmVydEhpZGVPYmplY3RUb1N0cmluZyhoaWRlOiBhbnkpIHtcblxuICAgICAgaWYgKGhpZGUudmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuXG4gICAgICAgIGNvbnN0IGFycmF5U3RyOiBzdHJpbmcgPSAnXFwnJyArIGhpZGUudmFsdWUuam9pbignXFwnLFxcJycpICsgJ1xcJyc7XG4gICAgICAgIGNvbnN0IGV4cCA9ICchYXJyYXlDb250YWlucyhbJyArIGFycmF5U3RyICsgJ10sJyArIGhpZGUuZmllbGQgKyAnKSc7XG4gICAgICAgIHJldHVybiBleHA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnJztcbiAgICB9XG59XG4iXX0=