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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBSXBGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOztBQUdyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVwRTtJQUdJLGdDQUFvQixnQkFBa0MsRUFDN0MsZ0JBQW9DLEVBQ3BDLGlCQUFtQztRQUZ4QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzdDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0I7UUFDcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtJQUM1QyxDQUFDOzs7Ozs7O0lBRUQsd0RBQXVCOzs7Ozs7SUFBdkIsVUFBd0IsUUFBc0IsRUFBRSxPQUFxRCxFQUNqRyxJQUFXOztZQUNMLFFBQVEsR0FDVixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLG1CQUFBLFFBQVEsQ0FBQyxPQUFPLEVBQVUsRUFBRSxPQUFPLEVBQ2pFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQzs7WUFDbEQsUUFBUSxHQUFhO1lBQ3ZCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLHFCQUFxQixFQUFFLG1CQUFBLFFBQVEsQ0FBQyxPQUFPLEVBQVU7WUFDakQsNkJBQTZCOzs7WUFBRTs7b0JBQ3JCLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFO2dCQUM3QixRQUFRLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztZQUNoQyxDQUFDLENBQUE7U0FDSjtRQUNELE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDcEIsQ0FBQzs7Ozs7OztJQUVELHFEQUFvQjs7Ozs7O0lBQXBCLFVBQXFCLFFBQXNCLEVBQUUsT0FBcUQsRUFDOUYsSUFBVzs7WUFFTCxJQUFJLEdBQVEsUUFBUSxDQUFDLElBQUk7O1lBQ3pCLEtBQUssR0FBVyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQUEsUUFBUSxDQUFDLElBQUksRUFBVTs7O1lBSXpHLFlBQVksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFOztZQUVwRCxRQUFRLEdBQWEsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUMzRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUM7O1lBRTFDLEtBQUssR0FBVTtZQUNqQixNQUFNLEVBQUUsS0FBSztZQUNiLGtCQUFrQixFQUFFLEtBQUs7WUFDekIsMEJBQTBCOzs7WUFBRTtnQkFDdkI7O2tCQUVFO2dCQUNILEVBQUUsQ0FBQyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN0QixLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBRTtnQkFDMUIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixLQUFLLENBQUMsTUFBTSxHQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDbkMsQ0FBQztZQUNQLENBQUMsQ0FBQTtTQUNKO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7OztJQUVELDBEQUF5Qjs7OztJQUF6QixVQUEwQixJQUFTO1FBRWpDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQzs7Z0JBRTFCLFFBQVEsR0FBVyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSTs7Z0JBQ3pELEdBQUcsR0FBRyxrQkFBa0IsR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRztZQUNuRSxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2IsQ0FBQztRQUVELE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDWixDQUFDOztnQkFoRUosVUFBVTs7O2dCQVRGLGdCQUFnQjtnQkFJaEIsa0JBQWtCO2dCQUdsQixnQkFBZ0I7O0lBbUV6Qiw2QkFBQztDQUFBLEFBakVELElBaUVDO1NBaEVZLHNCQUFzQjs7Ozs7O0lBRW5CLGtEQUEwQzs7Ozs7SUFDckQsa0RBQTRDOzs7OztJQUM1QyxtREFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEaXNhYmxlciB9IGZyb20gJy4uL2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XHJcbmltcG9ydCB7IEhpZGVyIH0gZnJvbSAnLi4vY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcclxuXHJcbmltcG9ydCB7IEV4cHJlc3Npb25SdW5uZXIsIFJ1bm5hYmxlIH0gZnJvbSAnLi4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xyXG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCwgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXBcclxufSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24nO1xyXG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XHJcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4uL2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXInO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcclxuLy8gQWRkIGFiaWxpdHkgdG8gZGlzcGxheSBhbGwgZmllbGRzIGZvciBkZWJ1Z2dpbmdcclxuaW1wb3J0IHsgRGVidWdNb2RlU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvZGVidWctbW9kZS5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEhpZGVyc0Rpc2FibGVyc0ZhY3Rvcnkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZXhwcmVzc2lvblJ1bm5lcjogRXhwcmVzc2lvblJ1bm5lcixcclxuICAgICBwcml2YXRlIGV4cHJlc3Npb25IZWxwZXI6IEpzRXhwcmVzc2lvbkhlbHBlcixcclxuICAgICBwcml2YXRlIF9kZWJ1Z01vZGVTZXJ2aWNlOiBEZWJ1Z01vZGVTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SnNFeHByZXNzaW9uRGlzYWJsZXIocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXHJcbiAgICAgICAgZm9ybT86IEZvcm0pOiBEaXNhYmxlciB7XHJcbiAgICAgICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID1cclxuICAgICAgICAgICAgdGhpcy5leHByZXNzaW9uUnVubmVyLmdldFJ1bm5hYmxlKHF1ZXN0aW9uLmRpc2FibGUgYXMgc3RyaW5nLCBjb250cm9sLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5leHByZXNzaW9uSGVscGVyLmhlbHBlckZ1bmN0aW9ucywge30sIGZvcm0pO1xyXG4gICAgICAgIGNvbnN0IGRpc2FibGVyOiBEaXNhYmxlciA9IHtcclxuICAgICAgICAgICAgdG9EaXNhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgZGlzYWJsZVdoZW5FeHByZXNzaW9uOiBxdWVzdGlvbi5kaXNhYmxlIGFzIHN0cmluZyxcclxuICAgICAgICAgICAgcmVFdmFsdWF0ZURpc2FibGluZ0V4cHJlc3Npb246ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHJ1bm5hYmxlLnJ1bigpO1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZXIudG9EaXNhYmxlID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gZGlzYWJsZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SnNFeHByZXNzaW9uSGlkZXIocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXHJcbiAgICAgICAgZm9ybT86IEZvcm0pOiBIaWRlciB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhpZGU6IGFueSA9IHF1ZXN0aW9uLmhpZGU7XHJcbiAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHR5cGVvZiBoaWRlID09PSAnb2JqZWN0JyA/IHRoaXMuY29udmVydEhpZGVPYmplY3RUb1N0cmluZyhoaWRlKSA6IHF1ZXN0aW9uLmhpZGUgYXMgc3RyaW5nO1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiBkZWJ1Z2dpbmcgaGFzIGJlZW4gZW5hYmxlZFxyXG5cclxuICAgICAgICBjb25zdCBkZWJ1Z0VuYWJsZWQgPSB0aGlzLl9kZWJ1Z01vZGVTZXJ2aWNlLmRlYnVnRW5hYmxlZCgpO1xyXG5cclxuICAgICAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPSB0aGlzLmV4cHJlc3Npb25SdW5uZXIuZ2V0UnVubmFibGUodmFsdWUsIGNvbnRyb2wsXHJcbiAgICAgICAgdGhpcy5leHByZXNzaW9uSGVscGVyLmhlbHBlckZ1bmN0aW9ucywge30sIGZvcm0pO1xyXG5cclxuICAgICAgICBjb25zdCBoaWRlcjogSGlkZXIgPSB7XHJcbiAgICAgICAgICAgIHRvSGlkZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGhpZGVXaGVuRXhwcmVzc2lvbjogdmFsdWUsXHJcbiAgICAgICAgICAgIHJlRXZhbHVhdGVIaWRpbmdFeHByZXNzaW9uOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgLyogaWYgZGVidWcgaXMgZW5hYmxlZCB0aGVuIGhpZGVycyB0byBiZSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgIGVsc2UgcnVuIHRoZSBub3JtYWwgZXZlbHVhdG9yIGkuZSBydW5uYWJsZS5ydW4oKVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBpZiAoZGVidWdFbmFibGVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBoaWRlci50b0hpZGUgPSBmYWxzZSA7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBoaWRlci50b0hpZGUgPSAgcnVubmFibGUucnVuKCk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGhpZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnZlcnRIaWRlT2JqZWN0VG9TdHJpbmcoaGlkZTogYW55KSB7XHJcblxyXG4gICAgICBpZiAoaGlkZS52YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGFycmF5U3RyOiBzdHJpbmcgPSAnXFwnJyArIGhpZGUudmFsdWUuam9pbignXFwnLFxcJycpICsgJ1xcJyc7XHJcbiAgICAgICAgY29uc3QgZXhwID0gJyFhcnJheUNvbnRhaW5zKFsnICsgYXJyYXlTdHIgKyAnXSwnICsgaGlkZS5maWVsZCArICcpJztcclxuICAgICAgICByZXR1cm4gZXhwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbn1cclxuIl19