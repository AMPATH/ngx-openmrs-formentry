/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
var AlertsFactory = /** @class */ (function () {
    function AlertsFactory(expressionRunner, expressionHelper) {
        this.expressionRunner = expressionRunner;
        this.expressionHelper = expressionHelper;
    }
    /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    AlertsFactory.prototype.getJsExpressionshowAlert = /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    function (question, control, form) {
        /** @type {?} */
        var runnable = this.expressionRunner.getRunnable(question.alert.alertWhenExpression, control, this.expressionHelper.helperFunctions, {}, form);
        /** @type {?} */
        var showAlert = {
            shown: false,
            alertWhenExpression: question.alert.alertWhenExpression,
            alertMessage: question.alert.message,
            reEvaluateAlertExpression: function () {
                /** @type {?} */
                var result = runnable.run();
                showAlert.shown = result;
            }
        };
        return showAlert;
    };
    AlertsFactory.decorators = [
        { type: Injectable },
    ];
    AlertsFactory.ctorParameters = function () { return [
        { type: ExpressionRunner },
        { type: JsExpressionHelper }
    ]; };
    return AlertsFactory;
}());
export { AlertsFactory };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AlertsFactory.prototype.expressionRunner;
    /**
     * @type {?}
     * @private
     */
    AlertsFactory.prototype.expressionHelper;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvdy1tZXNzYWdlcy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3Rvcnkvc2hvdy1tZXNzYWdlcy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBR3BGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBR3JFO0lBRUksdUJBQW9CLGdCQUFrQyxFQUFVLGdCQUFvQztRQUFoRixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFvQjtJQUNwRyxDQUFDOzs7Ozs7O0lBQ0QsZ0RBQXdCOzs7Ozs7SUFBeEIsVUFBeUIsUUFBc0IsRUFBRSxPQUFxRCxFQUNsRyxJQUFXOztZQUNMLFFBQVEsR0FDVixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxFQUN6RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUM7O1lBQ2xELFNBQVMsR0FBVTtZQUNyQixLQUFLLEVBQUUsS0FBSztZQUNaLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CO1lBQ3ZELFlBQVksRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU87WUFDcEMseUJBQXlCLEVBQUU7O29CQUNqQixNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRTtnQkFDN0IsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7WUFDN0IsQ0FBQztTQUNKO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNyQixDQUFDOztnQkFuQkosVUFBVTs7O2dCQU5GLGdCQUFnQjtnQkFHaEIsa0JBQWtCOztJQXVCM0Isb0JBQUM7Q0FBQSxBQXBCRCxJQW9CQztTQW5CWSxhQUFhOzs7Ozs7SUFDVix5Q0FBMEM7Ozs7O0lBQUUseUNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbGVydCB9IGZyb20gJy4uL2NvbnRyb2wtYWxlcnRzL2Nhbi1nZW5lcmF0ZS1hbGVydCc7XG5cbmltcG9ydCB7IEV4cHJlc3Npb25SdW5uZXIsIFJ1bm5hYmxlIH0gZnJvbSAnLi4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wsIEFmZUZvcm1BcnJheSwgQWZlRm9ybUdyb3VwIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4uL2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXInO1xuaW1wb3J0IHsgRm9ybX0gZnJvbSAnLi9mb3JtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFsZXJ0c0ZhY3Rvcnkge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZXhwcmVzc2lvblJ1bm5lcjogRXhwcmVzc2lvblJ1bm5lciwgcHJpdmF0ZSBleHByZXNzaW9uSGVscGVyOiBKc0V4cHJlc3Npb25IZWxwZXIpIHtcbiAgICB9XG4gICAgZ2V0SnNFeHByZXNzaW9uc2hvd0FsZXJ0KHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgICAgICBmb3JtPzogRm9ybSk6IEFsZXJ0IHtcbiAgICAgICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID1cbiAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvblJ1bm5lci5nZXRSdW5uYWJsZShxdWVzdGlvbi5hbGVydC5hbGVydFdoZW5FeHByZXNzaW9uLCBjb250cm9sLFxuICAgICAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvbkhlbHBlci5oZWxwZXJGdW5jdGlvbnMsIHt9LCBmb3JtKTtcbiAgICAgICAgY29uc3Qgc2hvd0FsZXJ0OiBBbGVydCA9IHtcbiAgICAgICAgICAgIHNob3duOiBmYWxzZSxcbiAgICAgICAgICAgIGFsZXJ0V2hlbkV4cHJlc3Npb246IHF1ZXN0aW9uLmFsZXJ0LmFsZXJ0V2hlbkV4cHJlc3Npb24sXG4gICAgICAgICAgICBhbGVydE1lc3NhZ2U6IHF1ZXN0aW9uLmFsZXJ0Lm1lc3NhZ2UsXG4gICAgICAgICAgICByZUV2YWx1YXRlQWxlcnRFeHByZXNzaW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcnVubmFibGUucnVuKCk7XG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0LnNob3duID0gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gc2hvd0FsZXJ0O1xuICAgIH1cbn1cbiJdfQ==