/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
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
        var /** @type {?} */ runnable = this.expressionRunner.getRunnable(/** @type {?} */ (question.disable), control, this.expressionHelper.helperFunctions, {}, form);
        var /** @type {?} */ disabler = {
            toDisable: false,
            disableWhenExpression: /** @type {?} */ (question.disable),
            reEvaluateDisablingExpression: function () {
                var /** @type {?} */ result = runnable.run();
                disabler.toDisable = result;
            }
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
        var /** @type {?} */ hide = question.hide;
        var /** @type {?} */ value = typeof hide === 'object' ? this.convertHideObjectToString(hide) : /** @type {?} */ (question.hide);
        // check if debugging has been enabled
        var /** @type {?} */ debugEnabled = this._debugModeService.debugEnabled();
        var /** @type {?} */ runnable = this.expressionRunner.getRunnable(value, control, this.expressionHelper.helperFunctions, {}, form);
        var /** @type {?} */ hider = {
            toHide: false,
            hideWhenExpression: value,
            reEvaluateHidingExpression: function () {
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
            var /** @type {?} */ arrayStr = '\'' + hide.value.join('\',\'') + '\'';
            var /** @type {?} */ exp = '!arrayContains([' + arrayStr + '],' + hide.field + ')';
            return exp;
        }
        return '';
    };
    HidersDisablersFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HidersDisablersFactory.ctorParameters = function () { return [
        { type: ExpressionRunner, },
        { type: JsExpressionHelper, },
        { type: DebugModeService, },
    ]; };
    return HidersDisablersFactory;
}());
export { HidersDisablersFactory };
function HidersDisablersFactory_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HidersDisablersFactory.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HidersDisablersFactory.ctorParameters;
    /** @type {?} */
    HidersDisablersFactory.prototype.expressionRunner;
    /** @type {?} */
    HidersDisablersFactory.prototype.expressionHelper;
    /** @type {?} */
    HidersDisablersFactory.prototype._debugModeService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBSXBGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBR3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOztJQUtoRSxnQ0FBb0IsZ0JBQWtDLEVBQzdDLGtCQUNBO1FBRlcscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUM3QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCO1FBQ2hCLHNCQUFpQixHQUFqQixpQkFBaUI7S0FDekI7Ozs7Ozs7SUFFRCx3REFBdUI7Ozs7OztJQUF2QixVQUF3QixRQUFzQixFQUFFLE9BQXFELEVBQ2pHLElBQVc7UUFDWCxxQkFBTSxRQUFRLEdBQ1YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsbUJBQUMsUUFBUSxDQUFDLE9BQWlCLEdBQUUsT0FBTyxFQUNqRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6RCxxQkFBTSxRQUFRLEdBQWE7WUFDdkIsU0FBUyxFQUFFLEtBQUs7WUFDaEIscUJBQXFCLG9CQUFFLFFBQVEsQ0FBQyxPQUFpQixDQUFBO1lBQ2pELDZCQUE2QixFQUFFO2dCQUMzQixxQkFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUM5QixRQUFRLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQzthQUMvQjtTQUNKLENBQUM7UUFDRixNQUFNLENBQUMsUUFBUSxDQUFDO0tBQ25COzs7Ozs7O0lBRUQscURBQW9COzs7Ozs7SUFBcEIsVUFBcUIsUUFBc0IsRUFBRSxPQUFxRCxFQUM5RixJQUFXO1FBRVgscUJBQU0sSUFBSSxHQUFRLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDaEMscUJBQU0sS0FBSyxHQUFXLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsbUJBQUMsUUFBUSxDQUFDLElBQWMsQ0FBQSxDQUFDOztRQUloSCxxQkFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBRTNELHFCQUFNLFFBQVEsR0FBYSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQzNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWpELHFCQUFNLEtBQUssR0FBVTtZQUNqQixNQUFNLEVBQUUsS0FBSztZQUNiLGtCQUFrQixFQUFFLEtBQUs7WUFDekIsMEJBQTBCLEVBQUU7Ozs7Z0JBSXhCLEVBQUUsQ0FBQyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN0QixLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBRTtpQkFDekI7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osS0FBSyxDQUFDLE1BQU0sR0FBSSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7aUJBQ2xDO2FBQ047U0FDSixDQUFDO1FBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNoQjs7Ozs7SUFFRCwwREFBeUI7Ozs7SUFBekIsVUFBMEIsSUFBUztRQUVqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFaEMscUJBQU0sUUFBUSxHQUFXLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDaEUscUJBQU0sR0FBRyxHQUFHLGtCQUFrQixHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDcEUsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNaO1FBRUQsTUFBTSxDQUFDLEVBQUUsQ0FBQztLQUNYOztnQkFoRUosVUFBVTs7OztnQkFURixnQkFBZ0I7Z0JBSWhCLGtCQUFrQjtnQkFHbEIsZ0JBQWdCOztpQ0FaekI7O1NBZWEsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRGlzYWJsZXIgfSBmcm9tICcuLi9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWRpc2FibGUnO1xyXG5pbXBvcnQgeyBIaWRlciB9IGZyb20gJy4uL2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4taGlkZSc7XHJcblxyXG5pbXBvcnQgeyBFeHByZXNzaW9uUnVubmVyLCBSdW5uYWJsZSB9IGZyb20gJy4uL2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyJztcclxuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wsIEFmZUZvcm1BcnJheSwgQWZlRm9ybUdyb3VwXHJcbn0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xyXG5pbXBvcnQgeyBKc0V4cHJlc3Npb25IZWxwZXIgfSBmcm9tICcuLi9oZWxwZXJzL2pzLWV4cHJlc3Npb24taGVscGVyJztcclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XHJcbi8vIEFkZCBhYmlsaXR5IHRvIGRpc3BsYXkgYWxsIGZpZWxkcyBmb3IgZGVidWdnaW5nXHJcbmltcG9ydCB7IERlYnVnTW9kZVNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2RlYnVnLW1vZGUuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIaWRlcnNEaXNhYmxlcnNGYWN0b3J5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4cHJlc3Npb25SdW5uZXI6IEV4cHJlc3Npb25SdW5uZXIsXHJcbiAgICAgcHJpdmF0ZSBleHByZXNzaW9uSGVscGVyOiBKc0V4cHJlc3Npb25IZWxwZXIsXHJcbiAgICAgcHJpdmF0ZSBfZGVidWdNb2RlU2VydmljZTogRGVidWdNb2RlU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIGdldEpzRXhwcmVzc2lvbkRpc2FibGVyKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxyXG4gICAgICAgIGZvcm0/OiBGb3JtKTogRGlzYWJsZXIge1xyXG4gICAgICAgIGNvbnN0IHJ1bm5hYmxlOiBSdW5uYWJsZSA9XHJcbiAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvblJ1bm5lci5nZXRSdW5uYWJsZShxdWVzdGlvbi5kaXNhYmxlIGFzIHN0cmluZywgY29udHJvbCxcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvbkhlbHBlci5oZWxwZXJGdW5jdGlvbnMsIHt9LCBmb3JtKTtcclxuICAgICAgICBjb25zdCBkaXNhYmxlcjogRGlzYWJsZXIgPSB7XHJcbiAgICAgICAgICAgIHRvRGlzYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGRpc2FibGVXaGVuRXhwcmVzc2lvbjogcXVlc3Rpb24uZGlzYWJsZSBhcyBzdHJpbmcsXHJcbiAgICAgICAgICAgIHJlRXZhbHVhdGVEaXNhYmxpbmdFeHByZXNzaW9uOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBydW5uYWJsZS5ydW4oKTtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVyLnRvRGlzYWJsZSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGRpc2FibGVyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEpzRXhwcmVzc2lvbkhpZGVyKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxyXG4gICAgICAgIGZvcm0/OiBGb3JtKTogSGlkZXIge1xyXG5cclxuICAgICAgICBjb25zdCBoaWRlOiBhbnkgPSBxdWVzdGlvbi5oaWRlO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgPSB0eXBlb2YgaGlkZSA9PT0gJ29iamVjdCcgPyB0aGlzLmNvbnZlcnRIaWRlT2JqZWN0VG9TdHJpbmcoaGlkZSkgOiBxdWVzdGlvbi5oaWRlIGFzIHN0cmluZztcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgZGVidWdnaW5nIGhhcyBiZWVuIGVuYWJsZWRcclxuXHJcbiAgICAgICAgY29uc3QgZGVidWdFbmFibGVkID0gdGhpcy5fZGVidWdNb2RlU2VydmljZS5kZWJ1Z0VuYWJsZWQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID0gdGhpcy5leHByZXNzaW9uUnVubmVyLmdldFJ1bm5hYmxlKHZhbHVlLCBjb250cm9sLFxyXG4gICAgICAgIHRoaXMuZXhwcmVzc2lvbkhlbHBlci5oZWxwZXJGdW5jdGlvbnMsIHt9LCBmb3JtKTtcclxuXHJcbiAgICAgICAgY29uc3QgaGlkZXI6IEhpZGVyID0ge1xyXG4gICAgICAgICAgICB0b0hpZGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBoaWRlV2hlbkV4cHJlc3Npb246IHZhbHVlLFxyXG4gICAgICAgICAgICByZUV2YWx1YXRlSGlkaW5nRXhwcmVzc2lvbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgIC8qIGlmIGRlYnVnIGlzIGVuYWJsZWQgdGhlbiBoaWRlcnMgdG8gYmUgZmFsc2VcclxuICAgICAgICAgICAgICAgICBlbHNlIHJ1biB0aGUgbm9ybWFsIGV2ZWx1YXRvciBpLmUgcnVubmFibGUucnVuKClcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlYnVnRW5hYmxlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaGlkZXIudG9IaWRlID0gZmFsc2UgO1xyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaGlkZXIudG9IaWRlID0gIHJ1bm5hYmxlLnJ1bigpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBoaWRlcjtcclxuICAgIH1cclxuXHJcbiAgICBjb252ZXJ0SGlkZU9iamVjdFRvU3RyaW5nKGhpZGU6IGFueSkge1xyXG5cclxuICAgICAgaWYgKGhpZGUudmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cclxuICAgICAgICBjb25zdCBhcnJheVN0cjogc3RyaW5nID0gJ1xcJycgKyBoaWRlLnZhbHVlLmpvaW4oJ1xcJyxcXCcnKSArICdcXCcnO1xyXG4gICAgICAgIGNvbnN0IGV4cCA9ICchYXJyYXlDb250YWlucyhbJyArIGFycmF5U3RyICsgJ10sJyArIGhpZGUuZmllbGQgKyAnKSc7XHJcbiAgICAgICAgcmV0dXJuIGV4cDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==