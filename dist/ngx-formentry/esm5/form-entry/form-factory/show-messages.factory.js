/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            reEvaluateAlertExpression: (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var result = runnable.run();
                showAlert.shown = result;
            })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvdy1tZXNzYWdlcy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3Rvcnkvc2hvdy1tZXNzYWdlcy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBR3BGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBR3JFO0lBRUksdUJBQW9CLGdCQUFrQyxFQUFVLGdCQUFvQztRQUFoRixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFvQjtJQUNwRyxDQUFDOzs7Ozs7O0lBQ0QsZ0RBQXdCOzs7Ozs7SUFBeEIsVUFBeUIsUUFBc0IsRUFBRSxPQUFxRCxFQUNsRyxJQUFXOztZQUNMLFFBQVEsR0FDVixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxFQUN6RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUM7O1lBQ2xELFNBQVMsR0FBVTtZQUNyQixLQUFLLEVBQUUsS0FBSztZQUNaLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CO1lBQ3ZELFlBQVksRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU87WUFDcEMseUJBQXlCOzs7WUFBRTs7b0JBQ2pCLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFO2dCQUM3QixTQUFTLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztZQUM3QixDQUFDLENBQUE7U0FDSjtRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDckIsQ0FBQzs7Z0JBbkJKLFVBQVU7OztnQkFORixnQkFBZ0I7Z0JBR2hCLGtCQUFrQjs7SUF1QjNCLG9CQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FuQlksYUFBYTs7Ozs7O0lBQ1YseUNBQTBDOzs7OztJQUFFLHlDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEFsZXJ0IH0gZnJvbSAnLi4vY29udHJvbC1hbGVydHMvY2FuLWdlbmVyYXRlLWFsZXJ0JztcclxuXHJcbmltcG9ydCB7IEV4cHJlc3Npb25SdW5uZXIsIFJ1bm5hYmxlIH0gZnJvbSAnLi4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xyXG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCwgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24nO1xyXG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XHJcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4uL2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXInO1xyXG5pbXBvcnQgeyBGb3JtfSBmcm9tICcuL2Zvcm0nO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQWxlcnRzRmFjdG9yeSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4cHJlc3Npb25SdW5uZXI6IEV4cHJlc3Npb25SdW5uZXIsIHByaXZhdGUgZXhwcmVzc2lvbkhlbHBlcjogSnNFeHByZXNzaW9uSGVscGVyKSB7XHJcbiAgICB9XHJcbiAgICBnZXRKc0V4cHJlc3Npb25zaG93QWxlcnQocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXHJcbiAgICAgICAgZm9ybT86IEZvcm0pOiBBbGVydCB7XHJcbiAgICAgICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID1cclxuICAgICAgICAgICAgdGhpcy5leHByZXNzaW9uUnVubmVyLmdldFJ1bm5hYmxlKHF1ZXN0aW9uLmFsZXJ0LmFsZXJ0V2hlbkV4cHJlc3Npb24sIGNvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cHJlc3Npb25IZWxwZXIuaGVscGVyRnVuY3Rpb25zLCB7fSwgZm9ybSk7XHJcbiAgICAgICAgY29uc3Qgc2hvd0FsZXJ0OiBBbGVydCA9IHtcclxuICAgICAgICAgICAgc2hvd246IGZhbHNlLFxyXG4gICAgICAgICAgICBhbGVydFdoZW5FeHByZXNzaW9uOiBxdWVzdGlvbi5hbGVydC5hbGVydFdoZW5FeHByZXNzaW9uLFxyXG4gICAgICAgICAgICBhbGVydE1lc3NhZ2U6IHF1ZXN0aW9uLmFsZXJ0Lm1lc3NhZ2UsXHJcbiAgICAgICAgICAgIHJlRXZhbHVhdGVBbGVydEV4cHJlc3Npb246ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHJ1bm5hYmxlLnJ1bigpO1xyXG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0LnNob3duID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gc2hvd0FsZXJ0O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==